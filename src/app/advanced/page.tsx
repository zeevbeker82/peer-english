"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ADVANCED_WORDS,
  ADVANCED_TOTAL,
  ADV_CAT_META,
  ADV_XP,
  type AdvCat,
  type AdvancedWord,
  getWordsByCategory,
} from "@/lib/content/advanced-vocabulary";
import {
  getLearnedIds,
  markLearned,
} from "@/lib/storage/advanced-vocab";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { speak } from "@/lib/audio/tts";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Tab   = "flashcards" | "quiz";
type Phase = "home" | "study";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function Stars({ n }: { n: 1 | 2 | 3 }) {
  return (
    <span className="text-yellow-400 text-base tracking-tight">
      {([1, 2, 3] as const).map((i) => (
        <span key={i} style={{ opacity: i <= n ? 1 : 0.2 }}>★</span>
      ))}
    </span>
  );
}

function DiffLabel({ n }: { n: 1 | 2 | 3 }) {
  const labels: Record<1 | 2 | 3, string> = { 1: "קל", 2: "בינוני", 3: "מאתגר" };
  const colors: Record<1 | 2 | 3, string> = {
    1: "bg-green-100 text-green-700",
    2: "bg-yellow-100 text-yellow-700",
    3: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors[n]}`} dir="rtl">
      {labels[n]}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FlashcardView
// ─────────────────────────────────────────────────────────────────────────────

function FlashcardView({
  words,
  learnedIds,
  onLearn,
  onXP,
}: {
  words: AdvancedWord[];
  learnedIds: Set<string>;
  onLearn: (id: string) => void;
  onXP: (pts: number) => void;
}) {
  const [idx, setIdx]       = useState(0);
  const [flipped, setFlip]  = useState(false);

  const word    = words[idx];
  const learned = learnedIds.has(word.id);

  function prev() { setIdx((i) => Math.max(i - 1, 0));                setFlip(false); }
  function next() { setIdx((i) => Math.min(i + 1, words.length - 1)); setFlip(false); }

  function handleLearn() {
    if (!learned) {
      onLearn(word.id);
      onXP(ADV_XP.flashcard);
    }
    next();
  }

  // progress bar
  const pct = Math.round(((idx + 1) / words.length) * 100);

  return (
    <div className="flex flex-col gap-4 px-4 py-2">

      {/* ── Progress strip ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-lg disabled:opacity-25 hover:bg-gray-50"
        >‹</button>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <button
          onClick={next}
          disabled={idx === words.length - 1}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-lg disabled:opacity-25 hover:bg-gray-50"
        >›</button>
      </div>
      <p className="text-center text-xs text-gray-400">{idx + 1} / {words.length}</p>

      {/* ── Card ── */}
      <div
        dir="ltr"
        onClick={() => setFlip((f) => !f)}
        className={`
          w-full rounded-3xl shadow-lg cursor-pointer min-h-[230px]
          flex flex-col items-center justify-center p-6 text-center
          transition-all duration-200 select-none
          ${flipped
            ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white"
            : "bg-white border-2 border-indigo-100"}
        `}
      >
        {!flipped ? (
          /* ── FRONT: English ── */
          <div className="space-y-3 w-full">
            <div className="flex items-center justify-center gap-2">
              <Stars n={word.stars} />
              <DiffLabel n={word.stars} />
            </div>
            <p className="text-3xl font-extrabold text-indigo-700 leading-tight">
              {word.en}
            </p>
            <p className="text-gray-500 text-sm italic px-2">{word.def}</p>
            <p className="text-xs text-gray-300 mt-2">לחץ לראות עברית ↓</p>
          </div>
        ) : (
          /* ── BACK: Hebrew + examples ── */
          <div className="space-y-4 w-full">
            <p className="text-3xl font-extrabold text-white" dir="rtl">
              {word.he}
            </p>
            <div className="border-t border-white/30 pt-3 space-y-2">
              {word.examples.map((ex, i) => (
                <div key={i} className="flex items-start gap-2 text-left">
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(ex); }}
                    className="shrink-0 text-white/60 hover:text-white text-lg mt-0.5"
                    aria-label="הגה"
                  >🔊</button>
                  <p className="text-sm text-white/90 leading-snug">{ex}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Action buttons ── */}
      <div className="flex gap-3" dir="rtl">
        <button
          onClick={() => speak(word.en)}
          className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 flex items-center justify-center gap-2 transition"
        >
          🔊 הגה
        </button>

        {!learned ? (
          <button
            onClick={handleLearn}
            className="flex-1 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-extrabold flex items-center justify-center gap-2 transition shadow-md"
          >
            ✓ למדתי! +{ADV_XP.flashcard}
          </button>
        ) : (
          <div className="flex-1 py-3 rounded-2xl bg-green-100 text-green-700 font-bold flex items-center justify-center gap-2">
            ✅ נלמד
          </div>
        )}
      </div>

      {/* ── Tip ── */}
      <p className="text-center text-xs text-gray-400" dir="rtl">
        לחץ על הכרטיסייה כדי לראות עברית ודוגמאות
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QuizView
// ─────────────────────────────────────────────────────────────────────────────

function QuizView({
  words,
  catLabelHe,
  onXP,
}: {
  words: AdvancedWord[];
  catLabelHe: string;
  onXP: (pts: number) => void;
}) {
  // Shuffle and take up to 10 questions
  const [questions] = useState<AdvancedWord[]>(() =>
    [...words].sort(() => Math.random() - 0.5).slice(0, Math.min(10, words.length))
  );
  const [qIdx,   setQIdx]   = useState(0);
  const [input,  setInput]  = useState("");
  const [result, setResult] = useState<"none" | "correct" | "wrong">("none");
  const [score,  setScore]  = useState(0);
  const [done,   setDone]   = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = questions[qIdx];

  useEffect(() => {
    if (result === "none") inputRef.current?.focus();
  }, [qIdx, result]);

  function check() {
    if (!input.trim()) return;
    const isCorrect =
      input.trim().toLowerCase() === q.exercise.answer.toLowerCase();
    setResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      setScore((s) => s + 1);
      onXP(ADV_XP.quiz_correct);
    }
  }

  function next() {
    if (qIdx + 1 >= questions.length) {
      setDone(true);
    } else {
      setQIdx((i) => i + 1);
      setInput("");
      setResult("none");
    }
  }

  function restart() {
    setQIdx(0);
    setInput("");
    setResult("none");
    setScore(0);
    setDone(false);
  }

  /* ── Done screen ── */
  if (done) {
    const pct   = Math.round((score / questions.length) * 100);
    const emoji = score === questions.length ? "🏆" : score >= 7 ? "⭐" : score >= 5 ? "💪" : "📚";
    const msg   = score === questions.length
      ? "מושלם! כל התשובות נכונות!"
      : score >= 7 ? "עבודה מצוינת!"
      : score >= 5 ? "כל הכבוד! נסה שוב לשפר"
      : "תרגול עוד קצת ואתה שם!";

    return (
      <div className="flex flex-col items-center gap-5 px-4 py-8 text-center" dir="rtl">
        <span className="text-7xl">{emoji}</span>
        <h3 className="text-2xl font-extrabold text-gray-800">{msg}</h3>
        <p className="text-xl text-gray-600 font-bold">{score} / {questions.length}</p>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-700 ${
              pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-yellow-400" : "bg-red-400"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-gray-400 text-sm">{pct}% הצלחה</p>

        <button
          onClick={restart}
          className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-md transition"
        >
          🔄 נסה שוב
        </button>
      </div>
    );
  }

  /* ── Question ── */
  // Split sentence on ___ to render the blank nicely
  const parts = q.exercise.sentence.split("___");

  return (
    <div className="flex flex-col gap-4 px-4 py-2" dir="rtl">

      {/* Header */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className="font-bold">שאלה {qIdx + 1} / {questions.length}</span>
        <span className="text-green-600 font-bold">✅ {score} נכונות</span>
      </div>

      {/* Word card */}
      <div className="bg-indigo-50 rounded-2xl p-4 text-center" dir="ltr">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Stars n={q.stars} />
          <DiffLabel n={q.stars} />
        </div>
        <p className="text-2xl font-extrabold text-indigo-700 mb-1">{q.en}</p>
        <p className="text-sm text-gray-500 italic">{q.def}</p>
        <button
          onClick={() => speak(q.en)}
          className="mt-2 text-indigo-400 hover:text-indigo-600 text-xl transition"
          aria-label="הגה"
        >🔊</button>
      </div>

      {/* Sentence with blank */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-4" dir="ltr">
        <p className="text-xs text-gray-400 mb-1 text-right" dir="rtl">השלם את החסר:</p>
        <p className="text-base text-gray-700 leading-relaxed">
          {parts[0]}
          <span className="inline-block border-b-2 border-indigo-400 mx-1 px-2 text-indigo-600 font-bold min-w-[60px] text-center">
            {result !== "none" ? q.exercise.answer : "___"}
          </span>
          {parts[1]}
        </p>
      </div>

      {/* Input */}
      {result === "none" && (
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && input.trim() && check()}
            placeholder="Write the answer in English..."
            dir="ltr"
            className="flex-1 border-2 border-indigo-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-indigo-500 font-medium"
            autoComplete="off"
          />
          <button
            onClick={check}
            disabled={!input.trim()}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-extrabold disabled:opacity-40 hover:bg-indigo-700 transition shadow-sm"
          >
            בדוק
          </button>
        </div>
      )}

      {/* Result banner */}
      {result !== "none" && (
        <div
          dir="rtl"
          className={`rounded-2xl p-4 ${
            result === "correct"
              ? "bg-green-50 border-2 border-green-300"
              : "bg-red-50 border-2 border-red-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{result === "correct" ? "✅" : "❌"}</span>
            <p className="font-extrabold text-gray-800">
              {result === "correct" ? "כל הכבוד! תשובה נכונה!" : "לא בדיוק..."}
            </p>
          </div>

          {result === "wrong" && (
            <div dir="ltr" className="bg-white rounded-xl p-3 text-sm mb-3">
              <p className="text-gray-500 mb-1">התשובה הנכונה:</p>
              <p className="text-green-700 font-extrabold text-lg">{q.exercise.answer}</p>
              <p className="text-gray-500 text-xs mt-1">{q.exercise.sentence.replace("___", q.exercise.answer)}</p>
            </div>
          )}

          {result === "correct" && (
            <p className="text-green-700 text-sm font-bold">
              +{ADV_XP.quiz_correct} נקודות 🌟
            </p>
          )}

          {/* Hebrew translation reminder */}
          <div className="bg-indigo-50 rounded-xl p-2 mt-2 text-sm text-indigo-700 font-bold" dir="rtl">
            {q.en} = {q.he}
          </div>

          <button
            onClick={next}
            className="mt-3 w-full py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold hover:bg-indigo-700 transition shadow-sm"
          >
            {qIdx + 1 < questions.length ? "הבא ←" : "📊 לתוצאות"}
          </button>
        </div>
      )}

      {/* Hint: Hebrew */}
      {result === "none" && (
        <div className="bg-amber-50 rounded-xl p-3 text-center" dir="rtl">
          <p className="text-xs text-amber-600">
            <span className="font-bold">רמז:</span> {q.he}
          </p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AdvancedPage() {
  const { addPoints }     = useProgress();
  const { checkAndUnlock } = useAchievements();

  const [phase,      setPhase]      = useState<Phase>("home");
  const [activeCat,  setActiveCat]  = useState<AdvCat | null>(null);
  const [tab,        setTab]        = useState<Tab>("flashcards");
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    setLearnedIds(getLearnedIds());
  }, []);

  const cats = Object.keys(ADV_CAT_META) as AdvCat[];
  const totalLearned = learnedIds.size;
  const totalPct     = Math.round((totalLearned / ADVANCED_TOTAL) * 100);

  function handleLearn(id: string) {
    markLearned(id);
    setLearnedIds((prev) => new Set([...prev, id]));
  }

  function handleXP(pts: number) {
    const isWord = pts === ADV_XP.flashcard;
    addPoints(pts, isWord ? { wordsLearned: 1 } : {});
    checkAndUnlock();
  }

  function openCat(cat: AdvCat) {
    setActiveCat(cat);
    setTab("flashcards");
    setPhase("study");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setPhase("home");
    setActiveCat(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── STUDY VIEW ────────────────────────────────────────────────────────────
  if (phase === "study" && activeCat) {
    const meta        = ADV_CAT_META[activeCat];
    const words       = getWordsByCategory(activeCat);
    const learnedHere = words.filter((w) => learnedIds.has(w.id)).length;
    const catPct      = Math.round((learnedHere / words.length) * 100);

    return (
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-24" dir="rtl">

        {/* ── Nav ── */}
        <nav className="bg-white/95 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
          <button
            onClick={goHome}
            className="text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100"
            aria-label="חזרה"
          >
            ⬅
          </button>
          <span className="text-2xl">{meta.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-gray-800 text-sm truncate">{meta.label_he}</p>
            <p className="text-xs text-gray-400">{learnedHere} / {words.length} נלמד</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${meta.color} h-2 rounded-full transition-all`}
                style={{ width: `${catPct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-500">{catPct}%</span>
          </div>
        </nav>

        {/* ── Tabs ── */}
        <div className="flex gap-2 px-4 py-3 max-w-lg mx-auto">
          <button
            onClick={() => setTab("flashcards")}
            className={`flex-1 py-2.5 rounded-2xl font-extrabold text-sm transition-all shadow-sm ${
              tab === "flashcards"
                ? "bg-indigo-600 text-white shadow-indigo-200"
                : "bg-white text-gray-500 border border-gray-200 hover:border-indigo-300"
            }`}
          >
            🃏 כרטיסיות
          </button>
          <button
            onClick={() => setTab("quiz")}
            className={`flex-1 py-2.5 rounded-2xl font-extrabold text-sm transition-all shadow-sm ${
              tab === "quiz"
                ? "bg-indigo-600 text-white shadow-indigo-200"
                : "bg-white text-gray-500 border border-gray-200 hover:border-indigo-300"
            }`}
          >
            📝 חידון
          </button>
        </div>

        {/* ── Content ── */}
        <div className="max-w-lg mx-auto">
          {tab === "flashcards" ? (
            <FlashcardView
              words={words}
              learnedIds={learnedIds}
              onLearn={handleLearn}
              onXP={handleXP}
            />
          ) : (
            <QuizView
              words={words}
              catLabelHe={meta.label_he}
              onXP={handleXP}
            />
          )}
        </div>
      </main>
    );
  }

  // ── HOME VIEW ─────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50/40 to-white pb-20" dir="rtl">

      {/* ── Top nav ── */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
        <Link
          href="/"
          className="text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100"
          aria-label="בית"
        >
          ⬅
        </Link>
        <span className="text-2xl">🏆</span>
        <div className="flex-1 min-w-0">
          <h1 className="font-extrabold text-gray-800 text-base">Advanced Vocabulary</h1>
          <p className="text-xs text-gray-400">B1 · מחונן</p>
        </div>
        <span className="font-extrabold text-indigo-600 text-sm">
          {totalLearned}/{ADVANCED_TOTAL} נלמד
        </span>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">

        {/* ── Hero ── */}
        <div className="bg-gradient-to-l from-indigo-700 to-purple-700 rounded-3xl p-5 text-white shadow-xl">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="font-extrabold text-xl mb-0.5">אוצר מילים מתקדם 🎓</p>
              <p className="text-white/70 text-sm">
                100 מילים ב-5 קטגוריות — כרטיסיות + חידונים
              </p>
            </div>
            <div className="bg-white/15 rounded-2xl px-4 py-2 text-center">
              <p className="text-3xl font-extrabold leading-none">{totalPct}%</p>
              <p className="text-white/60 text-xs mt-0.5">הושלם</p>
            </div>
          </div>

          {/* XP info */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-white/80">
            <div className="bg-white/10 rounded-xl py-1.5">
              <p className="font-extrabold text-base text-white">+{ADV_XP.flashcard}</p>
              <p>כרטיסייה</p>
            </div>
            <div className="bg-white/10 rounded-xl py-1.5">
              <p className="font-extrabold text-base text-white">+{ADV_XP.quiz_correct}</p>
              <p>חידון נכון</p>
            </div>
            <div className="bg-white/10 rounded-xl py-1.5">
              <p className="font-extrabold text-base text-white">+{ADV_XP.category_complete}</p>
              <p>קטגוריה</p>
            </div>
          </div>

          {/* Total progress bar */}
          <div className="mt-3 w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-yellow-300 h-3 rounded-full transition-all duration-700"
              style={{ width: `${totalPct}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-1 text-left">
            {totalLearned} מתוך {ADVANCED_TOTAL} מילים
          </p>
        </div>

        {/* ── Category cards ── */}
        <div>
          <h2 className="font-extrabold text-gray-700 text-base mb-3 flex items-center gap-2">
            <span>📚</span> קטגוריות
          </h2>
          <div className="space-y-3">
            {cats.map((cat) => {
              const meta        = ADV_CAT_META[cat];
              const catWords    = getWordsByCategory(cat);
              const learned     = catWords.filter((w) => learnedIds.has(w.id)).length;
              const pct         = Math.round((learned / catWords.length) * 100);
              const allDone     = learned === catWords.length;

              return (
                <button
                  key={cat}
                  onClick={() => openCat(cat)}
                  className="w-full text-right focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-3xl"
                >
                  <div
                    className={`bg-gradient-to-l ${meta.color} rounded-3xl p-4 text-white shadow-md
                      hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-150`}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="text-3xl">{meta.icon}</span>
                      <div className="flex-1 min-w-0 text-right">
                        <p className="font-extrabold text-base leading-tight">{meta.label_he}</p>
                        <p className="text-white/70 text-xs">{meta.label_en} · {catWords.length} מילים</p>
                      </div>
                      <div className="text-right shrink-0">
                        {allDone ? (
                          <span className="text-2xl">🏅</span>
                        ) : (
                          <>
                            <p className="font-extrabold text-lg leading-none">{learned}/{catWords.length}</p>
                            <p className="text-xs text-white/70">נלמד</p>
                          </>
                        )}
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white/80 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    {allDone && (
                      <p className="text-xs text-white/90 font-bold mt-1 text-center">
                        ✅ קטגוריה הושלמה!
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── How it works ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4">
          <h3 className="font-extrabold text-gray-700 text-sm mb-3">📖 איך ללמוד?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-lg">🃏</span>
              <p><strong>כרטיסיות</strong> — לחץ לראות עברית + דוגמאות, לחץ "למדתי" לקבל {ADV_XP.flashcard} נקודות</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📝</span>
              <p><strong>חידון</strong> — השלם את המשפט ותקבל {ADV_XP.quiz_correct} נקודות על תשובה נכונה</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔊</span>
              <p><strong>לחץ 🔊</strong> לשמוע את המילה בהגיה אנגלית</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
