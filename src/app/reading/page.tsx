"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  LEVEL_CONFIG,
  getPassagesByLevel,
} from "@/lib/content/readings";
import type { ReadingPassage } from "@/lib/content/readings";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { Confetti } from "@/components/ui/Confetti";
import { AchievementPopup } from "@/components/ui/AchievementPopup";

// ─── Types ────────────────────────────────────────────────────────────────────
type Level = ReadingPassage["level"];
type Stage = "levels" | "passages" | "reading" | "complete";

// ─── Level selector ───────────────────────────────────────────────────────────
function LevelView({ onSelect }: { onSelect: (l: Level) => void }) {
  const levels: Level[] = ["easy", "medium", "hard"];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-violet-50 to-white pb-24" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/" className="text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100">
          ←
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-purple-700 flex items-center gap-2">
            📖 הבנת הנקרא
          </h1>
          <p className="text-xs text-gray-400">בחר רמה</p>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-5">
        {/* Intro */}
        <div className="bg-gradient-to-l from-purple-500 to-violet-600 rounded-3xl p-5 text-white mb-6 shadow-lg">
          <p className="font-extrabold text-xl mb-1">📖 קרא וענה על שאלות</p>
          <p className="text-white/80 text-sm">
            28 טקסטים • 3 רמות קושי • כוכבים לפי ציון ⭐
          </p>
        </div>

        {/* Level cards */}
        <div className="space-y-4">
          {levels.map((level) => {
            const cfg = LEVEL_CONFIG[level];
            const count = getPassagesByLevel(level).length;
            return (
              <button
                key={level}
                onClick={() => onSelect(level)}
                className={`w-full bg-gradient-to-l ${cfg.color} text-white rounded-3xl p-5 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-right focus:outline-none focus:ring-4 focus:ring-white/50`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{cfg.icon}</span>
                  <div className="flex-1">
                    <p className="font-extrabold text-2xl">{cfg.label_he}</p>
                    <p className="text-white/80 text-sm mt-1">{cfg.description_he}</p>
                  </div>
                  <div className="bg-white/20 rounded-2xl px-3 py-2 text-center">
                    <p className="font-extrabold text-xl">{count}</p>
                    <p className="text-white/70 text-xs">טקסטים</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

// ─── Passage list ─────────────────────────────────────────────────────────────
function PassageListView({
  level,
  onSelect,
  onBack,
}: {
  level: Level;
  onSelect: (p: ReadingPassage) => void;
  onBack: () => void;
}) {
  const passages = getPassagesByLevel(level);
  const cfg = LEVEL_CONFIG[level];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-24" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100">
          ←
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-purple-700">
            {cfg.icon} רמה {cfg.label_he}
          </h1>
          <p className="text-xs text-gray-400">{passages.length} טקסטים</p>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-3">
        {passages.map((passage) => (
          <button
            key={passage.id}
            onClick={() => onSelect(passage)}
            className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:border-purple-200 transition-all text-right"
          >
            <span className="text-4xl">{passage.icon}</span>
            <div className="flex-1">
              <p className="font-extrabold text-gray-800 text-lg">{passage.title_he}</p>
              <p className="text-gray-400 text-sm" dir="ltr">{passage.title_en}</p>
              <div className="flex gap-2 mt-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${LEVEL_CONFIG[passage.level].bg} border ${LEVEL_CONFIG[passage.level].border}`}>
                  {passage.topic_he}
                </span>
                <span className="text-xs text-gray-400">
                  {passage.questions.length} שאלות
                </span>
              </div>
            </div>
            <span className="text-gray-300 text-2xl">←</span>
          </button>
        ))}
      </div>
    </main>
  );
}

// ─── Reading + Q&A view ───────────────────────────────────────────────────────
function ReadingView({
  passage,
  onComplete,
  onBack,
  onAnswer,
}: {
  passage: ReadingPassage;
  onComplete: (correct: number) => void;
  onBack: () => void;
  onAnswer?: (isCorrect: boolean, pts: number) => void;
}) {
  const [qIdx, setQIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<"reading" | "questions">("reading");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastPts, setLastPts] = useState(0);

  const question = passage.questions[qIdx];
  const isCorrect = chosen !== null && chosen === question?.correctIndex;

  const handleAnswer = (idx: number) => {
    if (showFeedback) return;
    setChosen(idx);
    setShowFeedback(true);
    const correct = idx === question.correctIndex;
    if (correct) {
      setCorrectCount((c) => c + 1);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      const streakBonus = newStreak >= 2 ? 5 : 0;
      const pts = 10 + streakBonus;
      setLastPts(pts);
      onAnswer?.(true, pts);
    } else {
      setCurrentStreak(0);
      setLastPts(0);
      onAnswer?.(false, 0);
    }
  };

  const handleNext = () => {
    if (qIdx + 1 >= passage.questions.length) {
      onComplete(correctCount);
    } else {
      setQIdx((i) => i + 1);
      setChosen(null);
      setShowFeedback(false);
      setLastPts(0);
    }
  };

  // ── Reading phase ──
  if (phase === "reading") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-24" dir="rtl">
        <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={onBack} className="text-2xl p-1 rounded-full hover:bg-gray-100">
            ←
          </button>
          <div className="flex-1">
            <p className="font-bold text-gray-800 text-sm">{passage.icon} {passage.title_he}</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${LEVEL_CONFIG[passage.level].bg} border ${LEVEL_CONFIG[passage.level].border}`}>
            {LEVEL_CONFIG[passage.level].icon} {LEVEL_CONFIG[passage.level].label_he}
          </span>
        </nav>

        <div className="max-w-lg mx-auto px-4 pt-5 space-y-5">
          {/* Instruction */}
          <div className="bg-purple-100 border border-purple-200 rounded-2xl p-3 text-center">
            <p className="font-bold text-purple-700 text-sm">📖 קרא/י את הטקסט בעיון, ואז ענה/י על השאלות</p>
          </div>

          {/* Passage */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <h2 className="font-extrabold text-gray-800 text-xl mb-4 text-center">
              {passage.title_en}
            </h2>
            <div dir="ltr" className="text-gray-700 leading-8 text-lg whitespace-pre-line font-medium">
              {passage.text}
            </div>
          </div>

          {/* Continue button */}
          <button
            onClick={() => setPhase("questions")}
            className="w-full bg-gradient-to-l from-purple-500 to-violet-600 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            ✅ הבנתי! בוא נענה על שאלות →
          </button>
        </div>
      </main>
    );
  }

  // ── Questions phase ──
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-24" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => setPhase("reading")}
          className="text-2xl p-1 rounded-full hover:bg-gray-100"
          title="חזור לטקסט"
        >
          ←
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-800 text-sm">
              שאלה {qIdx + 1}/{passage.questions.length}
            </span>
            {currentStreak >= 2 && (
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                🔥 {currentStreak} ברצף
              </span>
            )}
          </div>
          <ProgressBar value={qIdx} max={passage.questions.length} size="sm" color="purple" />
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-5">
        {/* Question */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 min-h-[100px] flex items-center justify-center">
          <p className="text-xl font-extrabold text-gray-800 text-center leading-relaxed">
            {question.question_he}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options_he.map((opt, i) => {
            let cls =
              "bg-white border-2 border-gray-200 text-gray-800 hover:border-purple-400 hover:bg-purple-50";
            if (showFeedback) {
              if (i === question.correctIndex)
                cls = "bg-green-100 border-2 border-green-500 text-green-800 shadow-md";
              else if (i === chosen)
                cls = "bg-red-100 border-2 border-red-400 text-red-800";
              else cls = "bg-gray-50 border-2 border-gray-100 text-gray-300";
            } else if (chosen === i) {
              cls = "bg-purple-100 border-2 border-purple-500 text-purple-800";
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={showFeedback}
                className={`${cls} w-full rounded-2xl p-4 font-bold text-lg text-right transition-all duration-150 focus:outline-none disabled:cursor-default`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div
            className={`rounded-2xl p-4 border ${
              isCorrect ? "bg-green-50 border-green-300" : "bg-orange-50 border-orange-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="font-extrabold text-lg">
                {isCorrect
                  ? "🌟 מצוין! תשובה נכונה!"
                  : `❌ התשובה הנכונה: ${question.options_he[question.correctIndex]}`}
              </p>
              {isCorrect && lastPts > 0 && (
                <span className="bg-green-500 text-white text-sm font-extrabold px-3 py-1 rounded-full">
                  +{lastPts} ⭐
                </span>
              )}
            </div>
            {isCorrect && currentStreak >= 2 && (
              <p className="text-orange-500 font-bold text-sm mt-1">🔥 רצף של {currentStreak}!</p>
            )}
          </div>
        )}

        {/* Next */}
        {showFeedback && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-l from-purple-500 to-violet-600 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            {qIdx + 1 >= passage.questions.length ? "🏆 ראה תוצאה!" : "שאלה הבאה →"}
          </button>
        )}
      </div>
    </main>
  );
}

// ─── Completion screen ─────────────────────────────────────────────────────────
function CompleteView({
  passage,
  correct,
  xpEarned,
  onRetry,
  onBack,
  onHome,
}: {
  passage: ReadingPassage;
  correct: number;
  xpEarned: number;
  onRetry: () => void;
  onBack: () => void;
  onHome: () => void;
}) {
  const total = passage.questions.length;
  const pct = Math.round((correct / total) * 100);
  const stars: 1 | 2 | 3 = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;
  const messages: Record<1 | 2 | 3, string> = {
    1: "לא נורא! קרא שוב את הטקסט 💪",
    2: "יפה מאוד! כמעט מושלם 😊",
    3: "מדהים! הבנת הכל! 🌟🎉",
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center px-4 py-10"
      dir="rtl"
    >
      {/* Stars */}
      <div className="flex gap-3 mb-4" style={{ fontSize: "3.5rem" }}>
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            style={{ filter: s <= stars ? "none" : "grayscale(1) opacity(0.25)" }}
          >
            ⭐
          </span>
        ))}
      </div>

      <h2 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">{messages[stars]}</h2>
      <p className="text-gray-400 mb-6 text-center">
        {passage.icon} {passage.title_he}
      </p>

      {/* Score */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 w-full max-w-sm mb-6">
        <div className="grid grid-cols-3 gap-3 text-center mb-4">
          <div className="bg-green-50 rounded-2xl p-3">
            <p className="text-3xl font-extrabold text-green-600">{correct}</p>
            <p className="text-xs text-gray-500 mt-1">נכון</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-3">
            <p className="text-3xl font-extrabold text-red-500">{total - correct}</p>
            <p className="text-xs text-gray-500 mt-1">טעות</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-3">
            <p className="text-3xl font-extrabold text-purple-600">{pct}%</p>
            <p className="text-xs text-gray-500 mt-1">ציון</p>
          </div>
        </div>

        {/* XP earned */}
        {xpEarned > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 text-center">
            <p className="font-extrabold text-yellow-700 text-xl">+{xpEarned} נקודות! ⭐</p>
            <p className="text-xs text-gray-400 mt-0.5">נקודות הוספו לפרופיל שלך</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={onRetry}
          className="w-full bg-gradient-to-l from-purple-500 to-violet-600 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg"
        >
          🔄 נסה שוב
        </button>
        <button
          onClick={onBack}
          className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 font-bold text-gray-700"
        >
          📋 כל הטקסטים
        </button>
        <button
          onClick={onHome}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 font-medium text-gray-500"
        >
          🏠 חזרה לבית
        </button>
      </div>
    </main>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function ReadingPage() {
  const [stage, setStage] = useState<Stage>("levels");
  const [level, setLevel] = useState<Level>("easy");
  const [passage, setPassage] = useState<ReadingPassage | null>(null);
  const [finalCorrect, setFinalCorrect] = useState(0);
  const [finalXP, setFinalXP] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const { addPoints } = useProgress();
  const { newlyUnlocked, checkAndUnlock, dismissAchievements } = useAchievements();
  const sessionXPRef = useRef(0);

  const handleLevelSelect = useCallback((l: Level) => {
    setLevel(l);
    setStage("passages");
  }, []);

  const handlePassageSelect = useCallback((p: ReadingPassage) => {
    setPassage(p);
    sessionXPRef.current = 0;
    setShowConfetti(false);
    setStage("reading");
  }, []);

  const handleAnswer = useCallback(
    (isCorrect: boolean, pts: number) => {
      if (!isCorrect) return;
      sessionXPRef.current += pts;
      addPoints(pts, { correctAnswers: 1 });
    },
    [addPoints]
  );

  const handleComplete = useCallback(
    (correct: number) => {
      const completionBonus = 30;
      sessionXPRef.current += completionBonus;
      const totalXP = sessionXPRef.current;
      const updated = addPoints(completionBonus, { readingDone: 1 });
      if (updated) checkAndUnlock(updated);

      const total = passage?.questions.length ?? 1;
      const pct = Math.round((correct / total) * 100);
      if (pct >= 90) setShowConfetti(true);

      setFinalCorrect(correct);
      setFinalXP(totalXP);
      setStage("complete");
    },
    [addPoints, checkAndUnlock, passage]
  );

  if (stage === "levels") return <LevelView onSelect={handleLevelSelect} />;

  if (stage === "passages")
    return (
      <PassageListView
        level={level}
        onSelect={handlePassageSelect}
        onBack={() => setStage("levels")}
      />
    );

  if (stage === "reading" && passage)
    return (
      <ReadingView
        passage={passage}
        onComplete={handleComplete}
        onAnswer={handleAnswer}
        onBack={() => setStage("passages")}
      />
    );

  if (stage === "complete" && passage)
    return (
      <>
        {showConfetti && <Confetti />}
        {newlyUnlocked.length > 0 && (
          <AchievementPopup
            achievements={newlyUnlocked}
            onClose={dismissAchievements}
          />
        )}
        <CompleteView
          passage={passage}
          correct={finalCorrect}
          xpEarned={finalXP}
          onRetry={() => {
            setFinalCorrect(0);
            setFinalXP(0);
            setShowConfetti(false);
            sessionXPRef.current = 0;
            setStage("reading");
          }}
          onBack={() => setStage("passages")}
          onHome={() => setStage("levels")}
        />
      </>
    );

  return null;
}
