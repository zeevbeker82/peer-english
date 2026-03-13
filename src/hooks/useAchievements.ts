"use client";
import { useState, useCallback } from "react";
import {
  checkNewAchievements,
  type Achievement,
  type AchievementProgress,
} from "@/lib/content/achievements";
import { getUnlockedIds, addUnlockedIds } from "@/lib/storage/achievements";
import { LESSONS } from "@/lib/content/lessons";

export function useAchievements() {
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);

  const checkAndUnlock = useCallback((progress: AchievementProgress) => {
    const alreadyUnlocked = getUnlockedIds();
    const toUnlock = checkNewAchievements(
      { ...progress, totalLessons: LESSONS.length },
      alreadyUnlocked
    );
    if (toUnlock.length > 0) {
      addUnlockedIds(toUnlock.map((a) => a.id));
      setNewlyUnlocked((prev) => [...prev, ...toUnlock]);
    }
  }, []);

  const dismissAchievements = useCallback(() => {
    setNewlyUnlocked([]);
  }, []);

  return {
    newlyUnlocked,
    checkAndUnlock,
    dismissAchievements,
  };
}
