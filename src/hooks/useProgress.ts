"use client";
import { useState, useEffect, useCallback } from "react";
import {
  loadProgress,
  saveProgress,
  updateStreak,
  recordLessonComplete,
  addXP,
  xpToNextLevel,
  clearProgress,
  incrementWordsLearned,
  incrementGrammarDone,
  incrementWritingDone,
  incrementSpeakingDone,
  getLevelInfo,
  type UserProgress,
  type LessonStatsUpdate,
} from "@/lib/storage/progress";

export interface PointsStats {
  grammarDone?: number;
  readingDone?: number;
  writingDone?: number;
  wordsLearned?: number;
  correctAnswers?: number;
  bestStreak?: number;
  speakingDone?: number;
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const p = loadProgress();
    const withStreak = updateStreak(p);
    saveProgress(withStreak);
    setProgress(withStreak);
  }, []);

  /**
   * Add points (XP) plus any optional stat increments.
   * Returns the updated progress for achievement checks.
   */
  const addPoints = useCallback(
    (xp: number, stats?: PointsStats): UserProgress | null => {
      let updated: UserProgress | null = null;
      setProgress((prev) => {
        if (!prev) return prev;
        let next = addXP(prev, xp);
        if (stats) {
          next = {
            ...next,
            correctAnswers: next.correctAnswers + (stats.correctAnswers ?? 0),
            bestStreak: Math.max(next.bestStreak, stats.bestStreak ?? 0),
            grammarDone: next.grammarDone + (stats.grammarDone ?? 0),
            readingDone: next.readingDone + (stats.readingDone ?? 0),
            writingDone: next.writingDone + (stats.writingDone ?? 0),
            wordsLearned: next.wordsLearned + (stats.wordsLearned ?? 0),
            speakingDone: next.speakingDone + (stats.speakingDone ?? 0),
          };
        }
        saveProgress(next);
        updated = next;
        return next;
      });
      return updated;
    },
    []
  );

  /**
   * Record lesson completion. Returns the updated progress for achievement checks.
   */
  const completedLesson = useCallback(
    (
      lessonId: string,
      percentScore: number,
      xpEarned: number,
      stats?: LessonStatsUpdate
    ): UserProgress | null => {
      let updated: UserProgress | null = null;
      setProgress((prev) => {
        if (!prev) return prev;
        const next = recordLessonComplete(prev, lessonId, percentScore, xpEarned, stats);
        saveProgress(next);
        updated = next;
        return next;
      });
      return updated;
    },
    []
  );

  /** Increment words learned (called from SRS review) */
  const addWordLearned = useCallback((count = 1) => {
    setProgress((prev) => {
      if (!prev) return prev;
      const next = incrementWordsLearned(prev, count);
      saveProgress(next);
      return next;
    });
  }, []);

  /** Increment grammar exercises completed */
  const addGrammarDone = useCallback((count = 1) => {
    setProgress((prev) => {
      if (!prev) return prev;
      const next = incrementGrammarDone(prev, count);
      saveProgress(next);
      return next;
    });
  }, []);

  /** Increment writing exercises completed */
  const addWritingDone = useCallback((count = 1) => {
    setProgress((prev) => {
      if (!prev) return prev;
      const next = incrementWritingDone(prev, count);
      saveProgress(next);
      return next;
    });
  }, []);

  /** Increment speaking activities completed */
  const addSpeakingDone = useCallback((count = 1) => {
    setProgress((prev) => {
      if (!prev) return prev;
      const next = incrementSpeakingDone(prev, count);
      saveProgress(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    clearProgress();
    const p = loadProgress();
    saveProgress(p);
    setProgress(p);
  }, []);

  const xpNeeded = progress ? xpToNextLevel(progress) : 100;
  const levelInfo = progress ? getLevelInfo(progress.totalXP) : null;

  return {
    progress,
    completedLesson,
    addPoints,
    addWordLearned,
    addGrammarDone,
    addWritingDone,
    addSpeakingDone,
    reset,
    xpNeeded,
    levelInfo,
  };
}
