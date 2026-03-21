/**
 * localStorage persistence for the WW2 Tanks quiz module.
 */

const STORAGE_KEY = "ww2_tanks_progress";

interface WW2TanksProgress {
  correctIds: string[];      // tank IDs answered correctly at least once
  totalAnswered: number;
  totalCorrect: number;
  totalXP: number;
  bestStreak: number;
  lastPlayedAt: string;      // ISO date
}

const DEFAULT_PROGRESS: WW2TanksProgress = {
  correctIds: [],
  totalAnswered: 0,
  totalCorrect: 0,
  totalXP: 0,
  bestStreak: 0,
  lastPlayedAt: "",
};

export function getWW2TanksProgress(): WW2TanksProgress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<WW2TanksProgress>;
    return {
      correctIds: parsed.correctIds ?? [],
      totalAnswered: parsed.totalAnswered ?? 0,
      totalCorrect: parsed.totalCorrect ?? 0,
      totalXP: parsed.totalXP ?? 0,
      bestStreak: parsed.bestStreak ?? 0,
      lastPlayedAt: parsed.lastPlayedAt ?? "",
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveWW2TanksProgress(p: WW2TanksProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // Storage unavailable — silently ignore
  }
}

export function markTankCorrect(tankId: string): void {
  if (typeof window === "undefined") return;
  const p = getWW2TanksProgress();
  if (!p.correctIds.includes(tankId)) {
    p.correctIds.push(tankId);
    saveWW2TanksProgress(p);
  }
}

export function updateStats(correct: boolean, xpEarned: number, streak: number): void {
  if (typeof window === "undefined") return;
  const p = getWW2TanksProgress();
  p.totalAnswered += 1;
  if (correct) {
    p.totalCorrect += 1;
  }
  p.totalXP += xpEarned;
  if (streak > p.bestStreak) {
    p.bestStreak = streak;
  }
  p.lastPlayedAt = new Date().toISOString();
  saveWW2TanksProgress(p);
}

export function getWW2TanksStats(): {
  correct: number;
  total: number;
  xp: number;
  bestStreak: number;
} {
  if (typeof window === "undefined") {
    return { correct: 0, total: 0, xp: 0, bestStreak: 0 };
  }
  const p = getWW2TanksProgress();
  return {
    correct: p.totalCorrect,
    total: p.totalAnswered,
    xp: p.totalXP,
    bestStreak: p.bestStreak,
  };
}
