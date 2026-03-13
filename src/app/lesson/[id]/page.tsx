"use client";
import { useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { getLessonById } from "@/lib/content/lessons";
import { getExercisesByIds } from "@/lib/content/exercises";
import { computeLessonScore } from "@/lib/exercises/scorer";
import { LessonRunner } from "@/components/LessonRunner";
import { LessonComplete } from "@/components/LessonComplete";
import { useSettings } from "@/hooks/useSettings";
import { useAudio } from "@/hooks/useAudio";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import type { ExerciseAttempt } from "@/lib/exercises/types";
import type { LessonScore } from "@/lib/exercises/scorer";
import type { Achievement } from "@/lib/content/achievements";

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { settings } = useSettings();
  const { sayWord, canSpeak } = useAudio(settings);
  const { completedLesson } = useProgress();
  const { newlyUnlocked, checkAndUnlock, dismissAchievements } = useAchievements();

  const [phase, setPhase] = useState<"running" | "complete">("running");
  const [score, setScore] = useState<LessonScore | null>(null);
  const [earnedAchievements, setEarnedAchievements] = useState<Achievement[]>([]);
  const [key, setKey] = useState(0);

  const lesson = getLessonById(params.id);
  const exercises = lesson ? getExercisesByIds(lesson.exerciseIds) : [];

  if (!lesson || exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <p className="text-gray-600 font-bold">השיעור לא נמצא</p>
          <button onClick={() => router.push("/")} className="mt-4 text-blue-500 underline">
            חזרה לבית
          </button>
        </div>
      </div>
    );
  }

  const handleComplete = useCallback(
    (attempts: ExerciseAttempt[]) => {
      const computed = computeLessonScore(attempts);
      setScore(computed);
      setPhase("complete");

      // Update progress with full stats
      const updatedProgress = completedLesson(lesson.id, computed.percentScore, computed.xpEarned, {
        correctAnswers: computed.correctCount,
        bestStreak: computed.bestStreak,
        readingCount: computed.readingCount,
        listeningCount: computed.listeningCount,
      });

      // Check achievements on the updated progress
      if (updatedProgress) {
        checkAndUnlock(updatedProgress);
      }
    },
    [lesson.id, completedLesson, checkAndUnlock]
  );

  // Capture newly unlocked for this session so they persist through replay
  const handleAchievementsDismissed = useCallback(() => {
    setEarnedAchievements([]);
    dismissAchievements();
  }, [dismissAchievements]);

  // Merge newly unlocked into earned list
  const allEarned = [...new Map(
    [...earnedAchievements, ...newlyUnlocked].map((a) => [a.id, a])
  ).values()];

  const handleReplay = () => {
    setPhase("running");
    setScore(null);
    setKey((k) => k + 1);
  };

  if (phase === "complete" && score) {
    return (
      <LessonComplete
        score={score}
        lesson={lesson}
        newAchievements={allEarned}
        onReplay={handleReplay}
        onHome={() => router.push("/")}
        onAchievementsDismissed={handleAchievementsDismissed}
      />
    );
  }

  return (
    <LessonRunner
      key={key}
      exercises={exercises}
      lessonTitle={lesson.title_he}
      lessonIcon={lesson.icon}
      settings={settings}
      onSpeak={sayWord}
      canSpeak={canSpeak}
      onComplete={handleComplete}
      onExit={() => router.push("/")}
    />
  );
}
