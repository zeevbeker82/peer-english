"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ADV_GRAMMAR_TOPICS,
  ADV_GRAMMAR_XP,
  ADV_GRAMMAR_TOTAL_TOPICS,
  AdvGrammarTopic,
  AdvGrammarExercise,
} from "@/lib/content/advanced-grammar";
import {
  getAllGrammarRecords,
  getCompletedTopicsCount,
  saveExerciseResult,
  saveQuizResult,
  AdvGrammarRecord,
} from "@/lib/storage/advanced-grammar";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Phase = "home" | "explain" | "exercises" | "ex_results" | "quiz" | "quiz_results";

// ─────────────────────────────────────────────────────────────────────────────
// Sentence display (with ___ blank)
// ─────────────────────────────────────────────────────────────────────────────

function SentenceDisplay({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split("___");
  if (parts.length === 1) {
    return (
      <p className={`font-bold text-gray-800 leading-relaxed ${className}`} dir="ltr">
        {text}
      </p>
    );
  }
  return (
    <p className={`font-bold text-gray-800 leading-relaxed ${className}`} dir="ltr">
      {parts[0]}
      <span className="inline-block border-b-4 border-blue-500 min-w-[72px] mx-1 text-blue-400 text-center px-1">
        {"     "}
      </span>
      {parts[1]}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exercise renderer (used for both exercises and quiz)
// ─────────────────────────────────────────────────────────────────────────────

interface ExerciseCardProps {
  ex: AdvGrammarExercise;
  index: number;
  total: number;
  onAnswer: (correct: boolean) => void;
  color: string;
}

function ExerciseCard({ ex, index, total, onAnswer, color }: ExerciseCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const isAnswered = selected !== null;

  function handleSelect(i: number) {
    if (isAnswered) return;
    setSelected(i);
    setTimeout(() => onAnswer(i === ex.correctIndex), 900);
  }

  const typeLabel: Record<string, string> = {
    fillblank: "✏️ השלמה",
    choice:    "🔘 בחירה",
    error:     "🔍 תיקון שגיאה",
    build:     "🏗️ בניית משפט",
  };

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
      {/* Progress */}
      <div className={`bg-gradient-to-r ${color} px-4 py-2`}>
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-xs font-bold">{typeLabel[ex.type]}</span>
          <span className="text-white text-xs font-bold">{index + 1}/{total}</span>
        </div>
        <div className="mt-1.5 bg-white/20 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-white h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.round(((index + 1) / total) * 100)}%` }}
          />
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Instruction */}
        <p className="text-gray-600 font-bold text-sm">{ex.instruction_he}</p>

        {/* Question / sentence */}
        {ex.sentence && <SentenceDisplay text={ex.sentence} className="text-lg text-center py-2" />}
        {ex.question && (
          <p className="text-gray-800 font-bold text-base leading-relaxed" dir="ltr">
            {ex.question}
          </p>
        )}

        {/* Options */}
        <div className="grid grid-cols-1 gap-2">
          {ex.options.map((opt, i) => {
            const isCorrect = i === ex.correctIndex;
            const isSelected = i === selected;

            let style = "border-2 border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50";
            if (isAnswered) {
              if (isCorrect)        style = "border-2 border-emerald-400 bg-emerald-50 text-emerald-800";
              else if (isSelected)  style = "border-2 border-red-400 bg-red-50 text-red-700";
              else                  style = "border-2 border-gray-100 bg-gray-50 text-gray-400";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={isAnswered}
                className={`w-full px-4 py-3 rounded-2xl text-sm font-bold text-right transition-all ${style} ${!isAnswered ? "cursor-pointer active:scale-[0.98]" : "cursor-default"}`}
                dir="ltr"
              >
                <span className="text-gray-400 font-bold ml-2 text-xs">
                  {["A","B","C","D"][i]}.
                </span>{" "}
                {opt}
                {isAnswered && isCorrect && <span className="float-left">✅</span>}
                {isAnswered && isSelected && !isCorrect && <span className="float-left">❌</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className={`rounded-2xl px-4 py-3 border-2 ${
            selected === ex.correctIndex
              ? "bg-emerald-50 border-emerald-200"
              : "bg-amber-50 border-amber-200"
          }`}>
            <p className="font-extrabold text-sm mb-1">
              {selected === ex.correctIndex ? "✅ נכון!" : "❌ לא נכון"}
            </p>
            <p className="text-sm text-gray-700">{ex.explanation_he}</p>
            {selected !== ex.correctIndex && (
              <p className="text-sm font-bold text-emerald-700 mt-1" dir="ltr">
                ✓ {ex.options[ex.correctIndex]}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Explanation view
// ─────────────────────────────────────────────────────────────────────────────

function ExplanationView({
  topic,
  onStart,
  onBack,
}: {
  topic: AdvGrammarTopic;
  onStart: () => void;
  onBack: () => void;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20" dir="rtl">
      <div className={`bg-gradient-to-r ${topic.color} px-4 py-5 text-white shadow-lg`}>
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-white/75 text-sm hover:text-white flex items-center gap-1 mb-3">← חזרה</button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{topic.icon}</span>
            <div>
              <h2 className="font-extrabold text-xl">{topic.title_he}</h2>
              <p className="text-white/75 text-sm" dir="ltr">{topic.title_en}</p>
            </div>
          </div>
          <p className="mt-3 bg-white/15 rounded-2xl px-4 py-2 text-sm font-bold">{topic.summary_he}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-3">
        <h3 className="font-extrabold text-gray-700 text-base flex items-center gap-2">
          <span>📋</span> כללי הדקדוק
        </h3>

        {topic.rules.map((rule, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="text-right flex-1">
                <p className="font-extrabold text-gray-800 text-sm">{rule.title_en}</p>
                <p className="text-gray-500 text-xs mt-0.5">{rule.title_he}</p>
              </div>
              <span className="text-gray-400 ml-2">{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 space-y-2">
                {rule.examples.map((ex, j) => (
                  <div key={j} className="flex items-start gap-2" dir="ltr">
                    <span className="text-blue-400 font-bold text-xs mt-0.5 flex-shrink-0">›</span>
                    <p className="text-gray-700 text-sm">{ex}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={onStart}
          className={`w-full py-4 rounded-2xl font-extrabold text-lg text-white bg-gradient-to-r ${topic.color} shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all mt-4`}
        >
          🚀 התחל 15 תרגילים
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Results view (after exercises)
// ─────────────────────────────────────────────────────────────────────────────

function ExResultsView({
  topic,
  correct,
  total,
  xp,
  onStartQuiz,
  onBack,
}: {
  topic: AdvGrammarTopic;
  correct: number;
  total: number;
  xp: number;
  onStartQuiz: () => void;
  onBack: () => void;
}) {
  const pct = Math.round((correct / total) * 100);
  const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "⭐" : pct >= 50 ? "👍" : "💪";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20 flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md space-y-4">
        <div className={`bg-gradient-to-br ${topic.color} rounded-3xl px-6 py-8 text-white text-center shadow-xl`}>
          <p className="text-6xl mb-2">{emoji}</p>
          <h3 className="font-extrabold text-2xl">סיום תרגילים!</h3>
          <p className="text-white/75 text-sm mt-1">{topic.title_he}</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-white/20 rounded-2xl py-3">
              <p className="text-2xl font-extrabold">{correct}/{total}</p>
              <p className="text-white/70 text-xs">נכון</p>
            </div>
            <div className="bg-white/20 rounded-2xl py-3">
              <p className="text-2xl font-extrabold">{pct}%</p>
              <p className="text-white/70 text-xs">ציון</p>
            </div>
            <div className="bg-white/20 rounded-2xl py-3">
              <p className="text-2xl font-extrabold">+{xp}</p>
              <p className="text-white/70 text-xs">XP</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 text-center">
          <p className="text-gray-600 text-sm font-bold">עכשיו — מבחן סיכום!</p>
          <p className="text-gray-400 text-xs mt-1">8 שאלות · +15 XP לכל תשובה נכונה · +30 XP בונוס על 8/8</p>
        </div>

        <button
          onClick={onStartQuiz}
          className={`w-full py-4 rounded-2xl font-extrabold text-lg text-white bg-gradient-to-r ${topic.color} shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all`}
        >
          📝 מבחן סיכום ←
        </button>
        <button onClick={onBack} className="w-full py-3 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50">
          ← חזרה לנושאים
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Quiz results view
// ─────────────────────────────────────────────────────────────────────────────

function QuizResultsView({
  topic,
  score,
  total,
  xp,
  perfect,
  onBack,
  onRetry,
}: {
  topic: AdvGrammarTopic;
  score: number;
  total: number;
  xp: number;
  perfect: boolean;
  onBack: () => void;
  onRetry: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20 flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md space-y-4">
        <div className={`bg-gradient-to-br ${topic.color} rounded-3xl px-6 py-8 text-white text-center shadow-xl`}>
          <p className="text-5xl mb-2">{perfect ? "🏆" : stars === 3 ? "⭐⭐⭐" : stars === 2 ? "⭐⭐" : "⭐"}</p>
          <h3 className="font-extrabold text-2xl">{perfect ? "מושלם!" : "מבחן הושלם!"}</h3>
          <p className="text-white/75 text-sm mt-1">{topic.title_he} — Quiz</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-white/20 rounded-2xl py-3">
              <p className="text-2xl font-extrabold">{score}/{total}</p>
              <p className="text-white/70 text-xs">נכון</p>
            </div>
            <div className="bg-white/20 rounded-2xl py-3">
              <p className="text-2xl font-extrabold">{pct}%</p>
              <p className="text-white/70 text-xs">ציון</p>
            </div>
            <div className="bg-white/20 rounded-2xl py-3">
              <p className="text-2xl font-extrabold">+{xp}</p>
              <p className="text-white/70 text-xs">XP</p>
            </div>
          </div>
          {perfect && (
            <div className="mt-3 bg-yellow-300/20 rounded-2xl px-3 py-2">
              <p className="font-extrabold text-yellow-200 text-sm">🌟 בונוס מושלם: +{ADV_GRAMMAR_XP.perfect_quiz} XP!</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={onRetry} className={`py-3 rounded-2xl font-extrabold text-white bg-gradient-to-r ${topic.color} shadow-md hover:shadow-lg`}>
            🔄 נסה שוב
          </button>
          <button onClick={onBack} className="py-3 rounded-2xl border-2 border-gray-200 font-bold text-gray-700 hover:bg-gray-50">
            ← נושאים
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home view
// ─────────────────────────────────────────────────────────────────────────────

function HomeView({
  records,
  completedCount,
  onSelect,
}: {
  records: Record<string, AdvGrammarRecord>;
  completedCount: number;
  onSelect: (t: AdvGrammarTopic) => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white pb-20" dir="rtl">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-4 py-5 text-white shadow-lg">
        <div className="max-w-lg mx-auto">
          <Link href="/" className="text-white/70 text-sm hover:text-white flex items-center gap-1 mb-3">
            ← דף הבית
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-5xl">📐</span>
            <div>
              <h1 className="font-extrabold text-2xl">דקדוק מתקדם B1</h1>
              <p className="text-white/75 text-sm">6 נושאים · 15 תרגילים + מבחן סיכום לכל נושא</p>
            </div>
          </div>
          <div className="mt-4 bg-white/10 rounded-2xl px-4 py-3">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>התקדמות</span>
              <span>{completedCount}/{ADV_GRAMMAR_TOTAL_TOPICS} נושאים</span>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-3 rounded-full transition-all duration-700"
                style={{ width: `${Math.round((completedCount / ADV_GRAMMAR_TOTAL_TOPICS) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-3">
        {/* XP guide */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-4 py-3">
          <p className="font-extrabold text-gray-700 text-sm mb-2">💡 מערכת הניקוד</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>• תרגיל נכון: <strong>+10 XP</strong></div>
            <div>• מבחן נכון: <strong>+15 XP</strong></div>
            <div>• סיום נושא: <strong>+50 XP</strong></div>
            <div>• מבחן מושלם: <strong>+30 XP</strong></div>
          </div>
        </div>

        {/* Topic cards */}
        <div className="grid grid-cols-2 gap-3">
          {ADV_GRAMMAR_TOPICS.map((topic) => {
            const rec = records[topic.id];
            const exDone = rec?.exercisesDone ?? false;
            const quizDone = rec?.quizDone ?? false;
            const done = exDone && quizDone;
            const quizScore = rec?.quizScore ?? 0;

            return (
              <button
                key={topic.id}
                onClick={() => onSelect(topic)}
                className={`bg-gradient-to-br ${topic.color} rounded-3xl p-4 text-white text-right shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all`}
              >
                <span className="text-4xl block mb-2">{topic.icon}</span>
                <p className="font-extrabold text-sm leading-tight">{topic.title_he}</p>
                <p className="text-white/70 text-xs mt-0.5" dir="ltr">{topic.title_en}</p>

                {/* Status badges */}
                <div className="mt-2 space-y-1">
                  {exDone && (
                    <div className="bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">
                        {rec.exercisesCorrect}/15 ✓
                      </span>
                    </div>
                  )}
                  {quizDone && (
                    <div className="bg-white/20 rounded-full px-2 py-0.5 inline-block mr-1">
                      <span className="text-xs font-bold">Quiz {quizScore}/8 📝</span>
                    </div>
                  )}
                  {done && (
                    <div className="bg-yellow-300/30 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">🏆 הושלם</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

export default function AdvancedGrammarPage() {
  const { addPoints } = useProgress();
  const { checkAndUnlock } = useAchievements();

  const [phase,    setPhase]    = useState<Phase>("home");
  const [topic,    setTopic]    = useState<AdvGrammarTopic | null>(null);
  const [records,  setRecords]  = useState<Record<string, AdvGrammarRecord>>({});
  const [done,     setDone]     = useState(0);

  // Exercise run state
  const [exIndex,   setExIndex]   = useState(0);
  const [exCorrect, setExCorrect] = useState(0);

  // Quiz run state
  const [quizIndex,   setQuizIndex]   = useState(0);
  const [quizCorrect, setQuizCorrect] = useState(0);

  // Result state
  const [lastXP,     setLastXP]     = useState(0);
  const [lastCorrect,setLastCorrect] = useState(0);

  useEffect(() => {
    const r = getAllGrammarRecords();
    setRecords(r);
    setDone(
      Object.values(r).filter((rec) => rec.exercisesDone && rec.quizDone).length
    );
  }, []);

  function selectTopic(t: AdvGrammarTopic) {
    setTopic(t);
    setExIndex(0);
    setExCorrect(0);
    setQuizIndex(0);
    setQuizCorrect(0);
    setPhase("explain");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    const r = getAllGrammarRecords();
    setRecords(r);
    setDone(Object.values(r).filter((rec) => rec.exercisesDone && rec.quizDone).length);
    setPhase("home");
    setTopic(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Exercise answer handler ──
  function handleExAnswer(correct: boolean) {
    if (!topic) return;
    const newCorrect = exCorrect + (correct ? 1 : 0);
    const nextIndex  = exIndex + 1;

    if (nextIndex >= topic.exercises.length) {
      // All exercises done
      const xp = newCorrect * ADV_GRAMMAR_XP.per_exercise + ADV_GRAMMAR_XP.topic_complete;
      saveExerciseResult(topic.id, newCorrect, xp);
      addPoints(xp, { grammarDone: 1 });
      checkAndUnlock();
      setLastCorrect(newCorrect);
      setLastXP(xp);
      setExCorrect(newCorrect);
      setPhase("ex_results");
    } else {
      setExCorrect(newCorrect);
      setExIndex(nextIndex);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Quiz answer handler ──
  function handleQuizAnswer(correct: boolean) {
    if (!topic) return;
    const newCorrect = quizCorrect + (correct ? 1 : 0);
    const nextIndex  = quizIndex + 1;

    if (nextIndex >= topic.quiz.length) {
      // Quiz done
      const perfect = newCorrect === topic.quiz.length;
      const xp = newCorrect * ADV_GRAMMAR_XP.per_quiz + (perfect ? ADV_GRAMMAR_XP.perfect_quiz : 0);
      saveQuizResult(topic.id, newCorrect, xp);
      addPoints(xp, { grammarDone: 1 });
      checkAndUnlock();
      setLastCorrect(newCorrect);
      setLastXP(xp);
      setQuizCorrect(newCorrect);
      setPhase("quiz_results");
    } else {
      setQuizCorrect(newCorrect);
      setQuizIndex(nextIndex);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  if (!topic || phase === "home") {
    return <HomeView records={records} completedCount={done} onSelect={selectTopic} />;
  }

  if (phase === "explain") {
    return (
      <ExplanationView
        topic={topic}
        onStart={() => { setExIndex(0); setExCorrect(0); setPhase("exercises"); }}
        onBack={goHome}
      />
    );
  }

  if (phase === "exercises") {
    const ex = topic.exercises[exIndex];
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
        <div className={`bg-gradient-to-r ${topic.color} px-4 py-4 text-white shadow-md`}>
          <div className="max-w-lg mx-auto">
            <button onClick={() => setPhase("explain")} className="text-white/75 text-sm hover:text-white flex items-center gap-1 mb-2">← הסבר</button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{topic.icon}</span>
              <div>
                <h2 className="font-extrabold text-base">{topic.title_he} — תרגילים</h2>
                <p className="text-white/70 text-xs">{exIndex + 1} מתוך {topic.exercises.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 pt-4">
          <ExerciseCard
            key={ex.id}
            ex={ex}
            index={exIndex}
            total={topic.exercises.length}
            onAnswer={handleExAnswer}
            color={topic.color}
          />
        </div>
      </div>
    );
  }

  if (phase === "ex_results") {
    return (
      <ExResultsView
        topic={topic}
        correct={lastCorrect}
        total={topic.exercises.length}
        xp={lastXP}
        onStartQuiz={() => { setQuizIndex(0); setQuizCorrect(0); setPhase("quiz"); }}
        onBack={goHome}
      />
    );
  }

  if (phase === "quiz") {
    const ex = topic.quiz[quizIndex];
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
        <div className={`bg-gradient-to-r ${topic.color} px-4 py-4 text-white shadow-md`}>
          <div className="max-w-lg mx-auto">
            <button onClick={() => setPhase("ex_results")} className="text-white/75 text-sm hover:text-white flex items-center gap-1 mb-2">← תוצאות</button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <div>
                <h2 className="font-extrabold text-base">{topic.title_he} — מבחן סיכום</h2>
                <p className="text-white/70 text-xs">{quizIndex + 1} מתוך {topic.quiz.length} · +15 XP לתשובה נכונה</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 pt-4">
          <ExerciseCard
            key={ex.id}
            ex={ex}
            index={quizIndex}
            total={topic.quiz.length}
            onAnswer={handleQuizAnswer}
            color={topic.color}
          />
        </div>
      </div>
    );
  }

  if (phase === "quiz_results") {
    return (
      <QuizResultsView
        topic={topic}
        score={lastCorrect}
        total={topic.quiz.length}
        xp={lastXP}
        perfect={lastCorrect === topic.quiz.length}
        onBack={goHome}
        onRetry={() => { setQuizIndex(0); setQuizCorrect(0); setLastCorrect(0); setLastXP(0); setPhase("quiz"); }}
      />
    );
  }

  return null;
}
