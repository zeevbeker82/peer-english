"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ADV_READING_TEXTS,
  ADV_READING_TOTAL,
  ADV_READING_CAT_META,
  ADV_READING_XP,
  getTextsByCategory,
  type AdvReadingCat,
  type AdvReadingText,
  type QuestionType,
} from "@/lib/content/advanced-readings";
import {
  getAllRecords,
  getCompletedCount,
  saveQuizResult,
  markWritten,
  type ReadingRecord,
} from "@/lib/storage/advanced-reading";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { speak, stopSpeaking } from "@/lib/audio/tts";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Phase = "home" | "reading" | "quiz" | "results";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<QuestionType, string> = {
  fact:      "עובדה",
  inference: "הסקה",
  critical:  "חשיבה ביקורתית",
};
const TYPE_COLORS: Record<QuestionType, string> = {
  fact:      "bg-blue-100 text-blue-700",
  inference: "bg-purple-100 text-purple-700",
  critical:  "bg-amber-100 text-amber-700",
};

function ScoreBadge({ score, total }: { score: number; total: number }) {
  const pct    = Math.round((score / total) * 100);
  const color  = pct === 100 ? "text-green-600" : pct >= 60 ? "text-yellow-600" : "text-red-500";
  return (
    <span className={`font-extrabold text-sm ${color}`}>{score}/{total}</span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Reading Phase
// ─────────────────────────────────────────────────────────────────────────────

function ReadingView({
  text,
  onBack,
  onStartQuiz,
}: {
  text: AdvReadingText;
  onBack: () => void;
  onStartQuiz: () => void;
}) {
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [vocabOpen,    setVocabOpen]    = useState(false);

  function toggleTTS() {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speak(text.body.replace(/\n/g, " "));
      // Reset flag after estimated reading time
      const words    = text.body.split(" ").length;
      const ms       = (words / 2.5) * 1000; // ~2.5 words/sec TTS
      setTimeout(() => setIsPlaying(false), ms + 500);
    }
  }

  const meta = ADV_READING_CAT_META[text.cat];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-24">
      {/* ── Nav ── */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
        <button
          onClick={() => { stopSpeaking(); setIsPlaying(false); onBack(); }}
          className="text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100"
          aria-label="חזרה"
        >⬅</button>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-gray-800 text-sm truncate">{text.title}</p>
          <p className="text-xs text-gray-400">{meta.icon} {meta.label_he}</p>
        </div>
        <button
          onClick={toggleTTS}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold transition shadow-sm
            ${isPlaying ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"}`}
          aria-label="האזן"
        >
          {isPlaying ? "⏹ עצור" : "🔊 האזן"}
        </button>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-4 w-full">

        {/* ── Text body ── */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5" dir="ltr">
          <h2 className="font-extrabold text-xl text-gray-900 mb-4 text-center leading-tight">
            {text.title}
          </h2>
          {text.body.split("\n\n").map((para, i) => (
            <p key={i} className="text-gray-700 text-[15px] leading-relaxed mb-3 last:mb-0">
              {para}
            </p>
          ))}
        </div>

        {/* ── Vocabulary ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setVocabOpen((o) => !o)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-right"
          >
            <span className="font-extrabold text-gray-700">📖 מילון — מילים קשות</span>
            <span className="text-gray-400 text-lg">{vocabOpen ? "▲" : "▼"}</span>
          </button>

          {vocabOpen && (
            <div className="grid grid-cols-2 gap-2 px-4 pb-4" dir="rtl">
              {text.vocab.map((v, i) => (
                <div
                  key={i}
                  className="bg-indigo-50 rounded-2xl p-2.5 flex flex-col gap-0.5"
                >
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => speak(v.word)}
                      className="text-indigo-400 hover:text-indigo-600 text-sm"
                      aria-label="הגה"
                    >🔊</button>
                    <span className="font-extrabold text-indigo-700 text-sm" dir="ltr">{v.word}</span>
                  </div>
                  <span className="text-gray-600 text-xs">{v.he}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Tip ── */}
        <div className="bg-amber-50 rounded-2xl p-3 text-sm text-amber-700" dir="rtl">
          <span className="font-bold">💡 טיפ:</span> קרא את הטקסט טוב לפני שמתחיל לענות על השאלות. אפשר גם ללחוץ 🔊 כדי לשמוע.
        </div>

        {/* ── Start quiz button ── */}
        <button
          onClick={onStartQuiz}
          className="w-full py-4 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          📝 התחל חידון — 8 שאלות
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Quiz Phase
// ─────────────────────────────────────────────────────────────────────────────

function QuizView({
  text,
  onDone,
}: {
  text: AdvReadingText;
  onDone: (answers: number[]) => void;
}) {
  const [qIdx,       setQIdx]       = useState(0);
  const [selected,   setSelected]   = useState<number | null>(null);
  const [confirmed,  setConfirmed]  = useState(false);
  const [allAnswers, setAllAnswers] = useState<number[]>([]);
  const [showText,   setShowText]   = useState(false);

  const q    = text.questions[qIdx];
  const total = text.questions.length;

  function confirm() {
    if (selected === null) return;
    setConfirmed(true);
  }

  function next() {
    const answers = [...allAnswers, selected!];
    if (qIdx + 1 >= total) {
      onDone(answers);
    } else {
      setAllAnswers(answers);
      setQIdx((i) => i + 1);
      setSelected(null);
      setConfirmed(false);
      setShowText(false);
    }
  }

  const isCorrect  = confirmed && selected === q.answer;
  const isWrong    = confirmed && selected !== q.answer;
  const optLetters = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-24">
      {/* ── Nav ── */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-extrabold text-sm">
          {qIdx + 1}
        </div>
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((qIdx + 1) / total) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-gray-500 font-bold">{qIdx + 1}/{total}</span>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-4 w-full">

        {/* ── Question type badge ── */}
        <div className="flex items-center gap-2" dir="rtl">
          <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${TYPE_COLORS[q.type]}`}>
            {TYPE_LABELS[q.type]}
          </span>
          <span className="text-xs text-gray-400">שאלה {qIdx + 1} מתוך {total}</span>
        </div>

        {/* ── Question ── */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4" dir="ltr">
          <p className="font-extrabold text-gray-800 text-base leading-snug">{q.q}</p>
        </div>

        {/* ── Options ── */}
        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            let style = "bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400";
            if (confirmed) {
              if (i === q.answer)       style = "bg-green-50 border-2 border-green-500 text-green-800";
              else if (i === selected)  style = "bg-red-50 border-2 border-red-400 text-red-700";
              else                      style = "bg-gray-50 border-2 border-gray-200 text-gray-400 opacity-60";
            } else if (i === selected) {
              style = "bg-indigo-50 border-2 border-indigo-500 text-indigo-800";
            }

            return (
              <button
                key={i}
                onClick={() => !confirmed && setSelected(i)}
                disabled={confirmed}
                className={`w-full rounded-2xl px-4 py-3 text-left font-medium transition-all ${style}`}
                dir="ltr"
              >
                <span className="font-extrabold mr-2">{optLetters[i]}.</span>
                {opt}
                {confirmed && i === q.answer && <span className="float-right">✅</span>}
                {confirmed && i === selected && i !== q.answer && <span className="float-right">❌</span>}
              </button>
            );
          })}
        </div>

        {/* ── Feedback ── */}
        {confirmed && (
          <div className={`rounded-2xl p-4 ${isCorrect ? "bg-green-50 border-2 border-green-200" : "bg-orange-50 border-2 border-orange-200"}`} dir="rtl">
            <p className="font-extrabold text-sm">
              {isCorrect
                ? `✅ כל הכבוד! +${ADV_READING_XP.per_correct} נקודות`
                : `❌ התשובה הנכונה: ${optLetters[q.answer]}. ${q.options[q.answer]}`}
            </p>
          </div>
        )}

        {/* ── Peek at text ── */}
        {!confirmed && (
          <button
            onClick={() => setShowText((s) => !s)}
            className="text-xs text-indigo-500 underline w-full text-center"
          >
            {showText ? "הסתר טקסט ▲" : "📄 חזור לטקסט לעיון ▼"}
          </button>
        )}
        {showText && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed max-h-40 overflow-y-auto" dir="ltr">
            {text.body.split("\n\n").map((p, i) => <p key={i} className="mb-2">{p}</p>)}
          </div>
        )}

        {/* ── Actions ── */}
        {!confirmed ? (
          <button
            onClick={confirm}
            disabled={selected === null}
            className="w-full py-3.5 rounded-3xl bg-indigo-600 text-white font-extrabold text-base disabled:opacity-40 hover:bg-indigo-700 transition shadow-md"
          >
            בדוק תשובה
          </button>
        ) : (
          <button
            onClick={next}
            className="w-full py-3.5 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-base hover:opacity-90 transition shadow-md"
          >
            {qIdx + 1 < total ? "השאלה הבאה ←" : "📊 לתוצאות"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Results Phase
// ─────────────────────────────────────────────────────────────────────────────

function ResultsView({
  text,
  answers,
  xpEarned,
  onBack,
  onRetry,
  alreadyWritten,
  onSubmitWriting,
}: {
  text: AdvReadingText;
  answers: number[];
  xpEarned: number;
  onBack: () => void;
  onRetry: () => void;
  alreadyWritten: boolean;
  onSubmitWriting: () => void;
}) {
  const score       = answers.filter((a, i) => a === text.questions[i].answer).length;
  const total       = text.questions.length;
  const pct         = Math.round((score / total) * 100);
  const emoji       = score === total ? "🏆" : score >= 6 ? "⭐" : score >= 4 ? "💪" : "📚";
  const msg         = score === total ? "מושלם! כל התשובות נכונות!"
                    : score >= 6 ? "עבודה מצוינת!"
                    : score >= 4 ? "טוב! נסה שוב לשפר"
                    : "תרגל עוד קצת ואתה שם!";
  const optLetters  = ["A", "B", "C", "D"];
  const [writing,   setWriting]   = useState("");
  const [submitted, setSubmitted] = useState(alreadyWritten);

  function handleSubmitWriting() {
    if (writing.trim().length < 10) return;
    onSubmitWriting();
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-24">
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
        <button onClick={onBack}
          className="text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100">⬅</button>
        <p className="font-extrabold text-gray-800 flex-1 truncate">{text.title}</p>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-4 w-full">

        {/* ── Score card ── */}
        <div className="bg-gradient-to-l from-indigo-700 to-purple-700 rounded-3xl p-5 text-white text-center shadow-xl">
          <p className="text-6xl mb-2">{emoji}</p>
          <p className="font-extrabold text-xl mb-1">{msg}</p>
          <p className="text-5xl font-extrabold mt-2">{score}<span className="text-2xl text-white/70">/{total}</span></p>
          <div className="w-full bg-white/20 rounded-full h-3 mt-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${pct === 100 ? "bg-green-300" : pct >= 60 ? "bg-yellow-300" : "bg-red-400"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-white/70 text-sm mt-2">+{xpEarned} נקודות XP</p>
        </div>

        {/* ── Q&A Review ── */}
        <div>
          <h3 className="font-extrabold text-gray-700 mb-2 text-sm" dir="rtl">📋 סיכום התשובות</h3>
          <div className="space-y-2">
            {text.questions.map((q, i) => {
              const correct = answers[i] === q.answer;
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-3 border-2 ${correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                >
                  <div className="flex items-start gap-2 mb-1" dir="ltr">
                    <span>{correct ? "✅" : "❌"}</span>
                    <p className="text-xs font-bold text-gray-700 flex-1">{q.q}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${TYPE_COLORS[q.type]}`}>{TYPE_LABELS[q.type]}</span>
                  </div>
                  {!correct && (
                    <div className="text-xs text-red-700 mt-1" dir="ltr">
                      <span className="text-red-400">תשובה נכונה: </span>
                      <strong>{optLetters[q.answer]}. {q.options[q.answer]}</strong>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Writing prompt ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-800 mb-2 flex items-center gap-2" dir="rtl">
            ✍️ שאלת כתיבה
          </h3>
          <p className="text-gray-600 text-sm mb-3 italic" dir="ltr">{text.writing_prompt}</p>
          {!submitted ? (
            <>
              <textarea
                value={writing}
                onChange={(e) => setWriting(e.target.value)}
                placeholder="Write your answer here in English... (at least 3 sentences)"
                dir="ltr"
                rows={4}
                className="w-full border-2 border-indigo-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 resize-none"
              />
              <button
                onClick={handleSubmitWriting}
                disabled={writing.trim().length < 10}
                className="mt-2 w-full py-2.5 rounded-2xl bg-indigo-600 text-white font-extrabold text-sm disabled:opacity-40 hover:bg-indigo-700 transition"
              >
                שלח תשובה ✓
              </button>
            </>
          ) : (
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <p className="text-green-700 font-bold">✅ כל הכבוד! הכתיבה הושלמה!</p>
            </div>
          )}
        </div>

        {/* ── Buttons ── */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onRetry}
            className="py-3 rounded-2xl bg-white border-2 border-indigo-300 text-indigo-700 font-extrabold hover:bg-indigo-50 transition"
          >
            🔄 נסה שוב
          </button>
          <button
            onClick={onBack}
            className="py-3 rounded-2xl bg-indigo-600 text-white font-extrabold hover:bg-indigo-700 transition"
          >
            📚 לרשימה
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AdvancedReadingPage() {
  const { addPoints }      = useProgress();
  const { checkAndUnlock } = useAchievements();

  const [phase,       setPhase]       = useState<Phase>("home");
  const [activeText,  setActiveText]  = useState<AdvReadingText | null>(null);
  const [answers,     setAnswers]     = useState<number[]>([]);
  const [xpEarned,    setXpEarned]    = useState(0);
  const [records,     setRecords]     = useState<Record<string, ReadingRecord>>({});
  const [completedN,  setCompletedN]  = useState(0);

  useEffect(() => {
    const r = getAllRecords();
    setRecords(r);
    setCompletedN(Object.values(r).filter((v) => v.completed).length);
  }, []);

  function openText(text: AdvReadingText) {
    setActiveText(text);
    setPhase("reading");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleQuizDone(userAnswers: number[]) {
    if (!activeText) return;
    const score     = userAnswers.filter((a, i) => a === activeText.questions[i].answer).length;
    const total     = activeText.questions.length;
    const xp        = score * ADV_READING_XP.per_correct
                    + ADV_READING_XP.complete
                    + (score === total ? ADV_READING_XP.perfect : 0);

    saveQuizResult(activeText.id, score);
    addPoints(xp, { readingDone: 1 });
    checkAndUnlock();

    const r = getAllRecords();
    setRecords(r);
    setCompletedN(Object.values(r).filter((v) => v.completed).length);
    setAnswers(userAnswers);
    setXpEarned(xp);
    setPhase("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmitWriting() {
    if (!activeText) return;
    markWritten(activeText.id);
    setRecords(getAllRecords());
  }

  function goHome() {
    stopSpeaking();
    setPhase("home");
    setActiveText(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Route sub-phases ────────────────────────────────────────────────────────
  if (activeText && phase === "reading") {
    return (
      <ReadingView
        text={activeText}
        onBack={goHome}
        onStartQuiz={() => { setPhase("quiz"); window.scrollTo({ top: 0 }); }}
      />
    );
  }

  if (activeText && phase === "quiz") {
    return <QuizView text={activeText} onDone={handleQuizDone} />;
  }

  if (activeText && phase === "results") {
    return (
      <ResultsView
        text={activeText}
        answers={answers}
        xpEarned={xpEarned}
        onBack={goHome}
        onRetry={() => { setPhase("quiz"); window.scrollTo({ top: 0 }); }}
        alreadyWritten={records[activeText.id]?.written ?? false}
        onSubmitWriting={handleSubmitWriting}
      />
    );
  }

  // ── HOME VIEW ─────────────────────────────────────────────────────────────
  const totalPct = Math.round((completedN / ADV_READING_TOTAL) * 100);
  const cats     = Object.keys(ADV_READING_CAT_META) as AdvReadingCat[];

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-20" dir="rtl">

      {/* ── Nav ── */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
        <Link href="/"
          className="text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100"
          aria-label="בית">⬅</Link>
        <span className="text-2xl">📖</span>
        <div className="flex-1 min-w-0">
          <h1 className="font-extrabold text-gray-800 text-base">Advanced Reading</h1>
          <p className="text-xs text-gray-400">B1 · מחונן</p>
        </div>
        <span className="font-extrabold text-indigo-600 text-sm">{completedN}/{ADV_READING_TOTAL}</span>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">

        {/* ── Hero ── */}
        <div className="bg-gradient-to-l from-indigo-700 to-purple-700 rounded-3xl p-5 text-white shadow-xl">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="font-extrabold text-xl mb-0.5">קריאה מתקדמת 📖</p>
              <p className="text-white/70 text-sm">15 טקסטים ב-5 קטגוריות · 8 שאלות כל אחד</p>
            </div>
            <div className="bg-white/15 rounded-2xl px-4 py-2 text-center">
              <p className="text-3xl font-extrabold leading-none">{totalPct}%</p>
              <p className="text-white/60 text-xs mt-0.5">הושלם</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-white/80">
            <div className="bg-white/10 rounded-xl py-1.5">
              <p className="font-extrabold text-base text-white">+{ADV_READING_XP.per_correct}</p>
              <p>תשובה נכונה</p>
            </div>
            <div className="bg-white/10 rounded-xl py-1.5">
              <p className="font-extrabold text-base text-white">+{ADV_READING_XP.complete}</p>
              <p>השלמה</p>
            </div>
            <div className="bg-white/10 rounded-xl py-1.5">
              <p className="font-extrabold text-base text-white">+{ADV_READING_XP.perfect}</p>
              <p>ציון מושלם</p>
            </div>
          </div>

          <div className="mt-3 w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-yellow-300 h-3 rounded-full transition-all duration-700"
              style={{ width: `${totalPct}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-1 text-left">{completedN} מתוך {ADV_READING_TOTAL} טקסטים הושלמו</p>
        </div>

        {/* ── Category sections ── */}
        {cats.map((cat) => {
          const meta  = ADV_READING_CAT_META[cat];
          const texts = getTextsByCategory(cat);
          return (
            <div key={cat}>
              <h2 className="font-extrabold text-gray-700 text-sm mb-2 flex items-center gap-2">
                <span>{meta.icon}</span> {meta.label_he}
              </h2>
              <div className="space-y-2">
                {texts.map((text) => {
                  const rec     = records[text.id];
                  const done    = rec?.completed ?? false;
                  const score   = rec?.score ?? 0;
                  const written = rec?.written ?? false;
                  const pct     = done ? Math.round((score / text.questions.length) * 100) : 0;

                  return (
                    <button
                      key={text.id}
                      onClick={() => openText(text)}
                      className="w-full text-right focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-2xl"
                    >
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3
                        hover:shadow-md hover:border-indigo-200 active:scale-[0.99] transition-all">
                        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-xl shrink-0`}>
                          {text.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-extrabold text-gray-800 text-sm truncate">{text.title}</p>
                          {done ? (
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${pct === 100 ? "bg-green-500" : pct >= 60 ? "bg-yellow-400" : "bg-red-400"}`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <ScoreBadge score={score} total={text.questions.length} />
                              {written && <span title="כתיבה הושלמה" className="text-xs">✍️</span>}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400 mt-0.5">8 שאלות · מילון 8 מילים</p>
                          )}
                        </div>
                        <span className="text-gray-300 text-lg shrink-0">{done ? "↺" : "→"}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ── Legend ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-xs text-gray-500 space-y-1.5" dir="rtl">
          <p className="font-bold text-gray-700 text-sm mb-2">📋 סוגי שאלות</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-bold">עובדה — מה כתוב בטקסט</span>
            <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-bold">הסקה — מה ניתן להבין</span>
            <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-bold">חשיבה ביקורתית — מה אתה חושב</span>
          </div>
        </div>

      </div>
    </main>
  );
}
