"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { ProgressBar } from "./ui/ProgressBar";
import { Confetti } from "./ui/Confetti";
import { AchievementPopup } from "./ui/AchievementPopup";
import type { LessonScore } from "@/lib/exercises/scorer";
import type { Lesson } from "@/lib/content/types";
import type { Achievement } from "@/lib/content/achievements";
import { LESSONS } from "@/lib/content/lessons";
import Link from "next/link";

interface Props {
  score: LessonScore;
  lesson: Lesson;
  newAchievements?: Achievement[];
  onReplay: () => void;
  onHome: () => void;
  onAchievementsDismissed?: () => void;
}

export function LessonComplete({
  score,
  lesson,
  newAchievements = [],
  onReplay,
  onHome,
  onAchievementsDismissed,
}: Props) {
  const [showAchievements, setShowAchievements] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const nextLessonIndex = LESSONS.findIndex((l) => l.id === lesson.id) + 1;
  const next = LESSONS[nextLessonIndex];

  const stars = Array.from({ length: 3 }, (_, i) => i < score.stars);
  const isPerfect = score.stars === 3;

  // Show confetti + achievements after a short delay
  useEffect(() => {
    if (isPerfect) {
      const t = setTimeout(() => setShowConfetti(true), 300);
      return () => clearTimeout(t);
    }
  }, [isPerfect]);

  useEffect(() => {
    if (newAchievements.length > 0) {
      const t = setTimeout(() => setShowAchievements(true), isPerfect ? 2500 : 600);
      return () => clearTimeout(t);
    }
  }, [newAchievements.length, isPerfect]);

  const handleAchievementClose = () => {
    setShowAchievements(false);
    onAchievementsDismissed?.();
  };

  return (
    <>
      {showConfetti && <Confetti />}

      <AchievementPopup
        achievements={showAchievements ? newAchievements : []}
        onClose={handleAchievementClose}
      />

      <div
        className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-white flex flex-col items-center justify-center px-4 py-8 animate-fade-in"
        dir="rtl"
      >
        {/* Stars */}
        <div className="flex gap-3 mb-4 text-5xl animate-pop">
          {stars.map((filled, i) => (
            <span
              key={i}
              className="animate-star"
              style={{
                animationDelay: `${i * 0.15}s`,
                filter: filled ? "none" : "grayscale(1) opacity(0.25)",
              }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Summary */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
          {score.summary_he}
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          {lesson.icon} {lesson.title_he}
        </p>

        {/* Score card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 w-full max-w-sm mb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-medium">תוצאה</span>
            <span className="text-2xl font-extrabold text-blue-600">{score.percentScore}%</span>
          </div>
          <ProgressBar value={score.percentScore} color="blue" size="lg" showPercent={false} />

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mt-5 text-center">
            <div className="bg-green-50 rounded-2xl p-3">
              <p className="text-2xl font-extrabold text-green-600">{score.correctCount}</p>
              <p className="text-xs text-gray-500">נכון ✓</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-3">
              <p className="text-2xl font-extrabold text-red-500">
                {score.totalCount - score.correctCount}
              </p>
              <p className="text-xs text-gray-500">טעות ✗</p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-3">
              <p className="text-2xl font-extrabold text-yellow-600">+{score.xpEarned}</p>
              <p className="text-xs text-gray-500">נקודות</p>
            </div>
          </div>

          {/* Points breakdown */}
          <div className="mt-4 bg-blue-50 rounded-2xl p-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">תשובות נכונות ({score.correctCount} × 10)</span>
              <span className="font-bold text-blue-700">+{score.correctCount * 10}</span>
            </div>
            {score.streakBonus > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">בונוס רצף 🔥</span>
                <span className="font-bold text-orange-600">+{score.streakBonus}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">בונוס סיום שיעור 🎓</span>
              <span className="font-bold text-green-600">+{score.lessonBonus}</span>
            </div>
            {score.stars === 3 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">בונוס מושלם ⭐⭐⭐</span>
                <span className="font-bold text-purple-600">+30</span>
              </div>
            )}
            <div className="border-t border-blue-200 pt-1 flex justify-between text-sm font-bold">
              <span className="text-gray-700">סה"כ</span>
              <span className="text-blue-700">+{score.xpEarned}</span>
            </div>
          </div>

          {score.wrongExerciseIds.length > 0 && (
            <div className="mt-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-sm font-semibold text-orange-700">
                💡 לחזור על: {score.wrongExerciseIds.length} תרגיל
              </p>
            </div>
          )}

          {newAchievements.length > 0 && (
            <button
              onClick={() => setShowAchievements(true)}
              className="mt-3 w-full bg-gradient-to-l from-yellow-400 to-amber-400 text-white font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              🏆 {newAchievements.length} הישג{newAchievements.length > 1 ? "ים" : ""} חד{newAchievements.length > 1 ? "שים" : "ש"}!
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {next && (
            <Link href={`/lesson/${next.id}`} className="block">
              <Button variant="success" size="lg" fullWidth>
                {next.icon} שיעור הבא: {next.title_he} →
              </Button>
            </Link>
          )}
          <Button variant="outline" size="lg" fullWidth onClick={onReplay}>
            🔄 שחק שוב
          </Button>
          <Button variant="ghost" size="lg" fullWidth onClick={onHome}>
            🏠 חזרה לבית
          </Button>
        </div>
      </div>
    </>
  );
}
