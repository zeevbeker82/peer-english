"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { GRAMMAR_TOPICS } from "@/lib/content/grammar";
import type { GrammarTopic, GrammarExercise } from "@/lib/content/grammar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AchievementPopup } from "@/components/ui/AchievementPopup";
import { Confetti } from "@/components/ui/Confetti";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";

// ─── Types ────────────────────────────────────────────────────────────────────
type Stage = "topics" | "running" | "complete";

// ─── Sentence display ─────────────────────────────────────────────────────────
function SentenceDisplay({ text }: { text: string }) {
  const parts = text.split("___");
  if (parts.length === 1) {
    return (
      <p className="text-2xl font-bold text-gray-800 text-center leading-relaxed" dir="ltr">
        {text}
      </p>
    );
  }
  return (
    <p className="text-2xl font-bold text-gray-800 text-center leading-relaxed" dir="ltr">
      {parts[0]}
      <span className="inline-block border-b-4 border-blue-500 min-w-[72px] mx-1 text-blue-400 text-center">
        {"   "}
      </span>
      {parts[1]}
    </p>
  );
}

// ─── Topics grid ──────────────────────────────────────────────────────────────
function TopicsView({ onSelect }: { onSelect: (t: GrammarTopic) => void }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-white pb-24" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/" className="text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100" aria-label="חזרה">←</Link>
        <div>
          <h1 className="text-xl font-extrabold text-green-700">📖 מודול דקדוק</h1>
          <p className="text-xs text-gray-400">10 נקודות לכל תשובה נכונה + בונוס רצף 🔥</p>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-5 pb-3">
        <div className="bg-gradient-to-l from-green-500 to-emerald-600 rounded-3xl p-4 text-white mb-5 shadow-lg">
          <p className="font-bold text-lg">📖 דקדוק אנגלית</p>
          <p className="text-white/80 text-sm mt-1">10 נושאים • 🎯 10 נקודות לתשובה • 🔥 בונוס רצף • 🏆 +50 לסיום נושא</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {GRAMMAR_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelect(topic)}
              className={`bg-gradient-to-br ${topic.color} rounded-3xl p-4 text-white text-right shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-white/50`}
            >
              <span className="text-4xl block mb-2">{topic.icon}</span>
              <p className="font-extrabold text-sm leading-tight">{topic.title_he}</p>
              <p className="text-white/70 text-xs mt-1 font-medium" dir="ltr">{topic.title_en}</p>
              <p className="text-white/60 text-xs mt-2">{topic.exercises.length} תרגילים</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

// ─── Exercise runner ───────────────────────────────────────────────────────────
interface ExerciseViewProps {
  topic: GrammarTopic;
  exercise: GrammarExercise;
  exIdx: number;
  total: number;
  chosen: number | null;
  showFeedback: boolean;
  currentStreak: number;
  lastPoints: number;
  lastStreakBonus: number;
  onAnswer: (idx: number) => void;
  onNext: () => void;
}

function ExerciseView({
  topic, exercise, exIdx, total, chosen, showFeedback,
  currentStreak, lastPoints, lastStreakBonus, onAnswer, onNext,
}: ExerciseViewProps) {
  const displayText = exercise.type === "fillblank" ? exercise.sentence! : exercise.question!;
  const isCorrect = chosen !== null && chosen === exercise.correctIndex;

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-10" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{topic.icon}</span>
            <span className="font-bold text-gray-800 text-sm">{topic.title_he}</span>
            {currentStreak >= 2 && (
              <span className="text-xs font-bold text-orange-500 bg-orange-100 rounded-full px-2 py-0.5">
                🔥 {currentStreak} ברצף
              </span>
            )}
          </div>
          <ProgressBar value={exIdx} max={total} size="sm" color="green" />
        </div>
        <span className="text-sm font-bold text-gray-400 bg-gray-100 rounded-full px-3 py-1">
          {exIdx + 1}/{total}
        </span>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <p className="text-gray-500 text-sm font-medium text-center">{exercise.instruction_he}</p>

        <div className="bg-white rounded-3xl shadow-lg p-7 border-2 border-green-100 min-h-[120px] flex items-center justify-center">
          <SentenceDisplay text={displayText} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {exercise.options.map((opt, i) => {
            let cls = "bg-white border-2 border-gray-200 text-gray-800 hover:border-green-400 hover:bg-green-50";
            if (showFeedback) {
              if (i === exercise.correctIndex)
                cls = "bg-green-100 border-2 border-green-500 text-green-800 shadow-md";
              else if (i === chosen)
                cls = "bg-red-100 border-2 border-red-400 text-red-800";
              else cls = "bg-gray-50 border-2 border-gray-100 text-gray-300";
            } else if (chosen === i) {
              cls = "bg-blue-100 border-2 border-blue-500 text-blue-800";
            }
            return (
              <button
                key={i}
                onClick={() => onAnswer(i)}
                disabled={showFeedback}
                dir="ltr"
                className={`${cls} rounded-2xl p-4 font-bold text-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:cursor-default`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={`rounded-2xl p-4 border ${isCorrect ? "bg-green-50 border-green-300" : "bg-orange-50 border-orange-200"}`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{isCorrect ? "🎉" : "💪"}</span>
              <div>
                <p className="font-extrabold text-lg">
                  {isCorrect ? "נכון מאוד!" : "התשובה הנכונה: "}
                  {!isCorrect && (
                    <span dir="ltr" className="font-bold text-green-700"> {exercise.options[exercise.correctIndex]}</span>
                  )}
                </p>
                {isCorrect && (
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    <span className="text-sm text-green-700 font-bold">+{lastPoints} נקודות</span>
                    {lastStreakBonus > 0 && (
                      <span className="text-xs font-bold bg-orange-200 text-orange-800 rounded-full px-2 py-0.5">
                        🔥 בונוס רצף +{lastStreakBonus}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700">💡 {exercise.explanation_he}</p>
          </div>
        )}

        {showFeedback && (
          <button
            onClick={onNext}
            className="w-full bg-gradient-to-l from-green-500 to-emerald-600 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            {exIdx + 1 >= total ? "🏆 ראה תוצאה!" : "הבא →"}
          </button>
        )}
      </div>
    </main>
  );
}

// ─── Completion screen ─────────────────────────────────────────────────────────
function CompleteView({
  topic, correct, total, stars, xpEarned, onRetry, onBack,
}: {
  topic: GrammarTopic;
  correct: number;
  total: number;
  stars: 1 | 2 | 3;
  xpEarned: number;
  onRetry: () => void;
  onBack: () => void;
}) {
  const messages: Record<1 | 2 | 3, string> = {
    1: "לא נורא! תתאמן עוד קצת 💪",
    2: "יפה מאוד! עוד קצת ותהיה מושלם 😊",
    3: "מדהים! שיעור מושלם! 🌟🎉",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-4 py-10" dir="rtl">
      <div className="flex gap-3 mb-4" style={{ fontSize: "3.5rem" }}>
        {[1, 2, 3].map((s) => (
          <span key={s} style={{ filter: s <= stars ? "none" : "grayscale(1) opacity(0.25)" }}>⭐</span>
        ))}
      </div>

      <h2 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">{messages[stars]}</h2>
      <p className="text-gray-400 mb-8 text-center">{topic.icon} {topic.title_he}</p>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 w-full max-w-sm mb-6">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-green-50 rounded-2xl p-3">
            <p className="text-3xl font-extrabold text-green-600">{correct}</p>
            <p className="text-xs text-gray-500 mt-1">נכון ✓</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-3">
            <p className="text-3xl font-extrabold text-red-500">{total - correct}</p>
            <p className="text-xs text-gray-500 mt-1">טעות ✗</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-extrabold text-yellow-600">+{xpEarned}</p>
            <p className="text-xs text-gray-500 mt-1">נקודות</p>
          </div>
        </div>
        <div className="mt-3 bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-xs text-blue-600 font-medium">🏆 בונוס סיום נושא: +50 נקודות נוספות!</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button onClick={onRetry} className="w-full bg-gradient-to-l from-green-500 to-emerald-600 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg">
          🔄 שחק שוב
        </button>
        <button onClick={onBack} className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 font-bold text-gray-700">
          📋 כל הנושאים
        </button>
        <Link href="/" className="w-full text-center bg-gray-50 border border-gray-100 rounded-2xl py-3 font-medium text-gray-500">
          🏠 חזרה לבית
        </Link>
      </div>
    </main>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function GrammarPage() {
  const [stage, setStage] = useState<Stage>("topics");
  const [topic, setTopic] = useState<GrammarTopic | null>(null);
  const [exIdx, setExIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [lastPoints, setLastPoints] = useState(0);
  const [lastStreakBonus, setLastStreakBonus] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const { addPoints } = useProgress();
  const { newlyUnlocked, checkAndUnlock, dismissAchievements } = useAchievements();

  const startTopic = useCallback((t: GrammarTopic) => {
    setTopic(t);
    setExIdx(0);
    setChosen(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setCurrentStreak(0);
    setTotalXpEarned(0);
    setLastPoints(0);
    setLastStreakBonus(0);
    setShowConfetti(false);
    setStage("running");
  }, []);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (showFeedback || !topic) return;
      setChosen(idx);
      setShowFeedback(true);

      const isCorrect = idx === topic.exercises[exIdx].correctIndex;

      if (isCorrect) {
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);
        setCorrectCount((c) => c + 1);

        const streakBonus = newStreak >= 2 ? 5 : 0;
        const pts = 10 + streakBonus;
        setLastPoints(pts);
        setLastStreakBonus(streakBonus);
        setTotalXpEarned((prev) => prev + pts);

        const updated = addPoints(pts, {
          correctAnswers: 1,
          grammarDone: 1,
          bestStreak: newStreak,
        });
        if (updated) checkAndUnlock(updated);
      } else {
        setCurrentStreak(0);
        setLastPoints(0);
        setLastStreakBonus(0);
      }
    },
    [showFeedback, topic, exIdx, currentStreak, addPoints, checkAndUnlock]
  );

  const handleNext = useCallback(() => {
    if (!topic) return;
    if (exIdx + 1 >= topic.exercises.length) {
      const completionBonus = 50;
      setTotalXpEarned((prev) => prev + completionBonus);
      const updated = addPoints(completionBonus);
      if (updated) {
        checkAndUnlock(updated);
        const pct = (correctCount / topic.exercises.length) * 100;
        if (pct >= 80) setShowConfetti(true);
      }
      setStage("complete");
    } else {
      setExIdx((i) => i + 1);
      setChosen(null);
      setShowFeedback(false);
    }
  }, [topic, exIdx, correctCount, addPoints, checkAndUnlock]);

  const calcStars = (correct: number, total: number): 1 | 2 | 3 => {
    const pct = (correct / total) * 100;
    if (pct >= 90) return 3;
    if (pct >= 60) return 2;
    return 1;
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <AchievementPopup achievements={newlyUnlocked} onClose={dismissAchievements} />

      {stage === "topics" && <TopicsView onSelect={startTopic} />}

      {stage === "running" && topic && (
        <ExerciseView
          topic={topic}
          exercise={topic.exercises[exIdx]}
          exIdx={exIdx}
          total={topic.exercises.length}
          chosen={chosen}
          showFeedback={showFeedback}
          currentStreak={currentStreak}
          lastPoints={lastPoints}
          lastStreakBonus={lastStreakBonus}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}

      {stage === "complete" && topic && (
        <CompleteView
          topic={topic}
          correct={correctCount}
          total={topic.exercises.length}
          stars={calcStars(correctCount, topic.exercises.length)}
          xpEarned={totalXpEarned}
          onRetry={() => startTopic(topic)}
          onBack={() => setStage("topics")}
        />
      )}
    </>
  );
}
