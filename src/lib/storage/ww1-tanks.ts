/**
 * localStorage persistence for the WW1 Tanks quiz module.
 */

const STORAGE_KEY = "ww1_tanks_progress";

interface WW1TanksProgress {
  correctIds: string[];      // tank IDs answered correctly at least once
  totalAnswered: number;
  totalCorrect: number;
  totalXP: number;
  bestStreak: number;
  lastPlayedAt: string;      // ISO date
}

const DEFAULT_PROGRESS: WW1TanksProgress = {
  correctIds: [],
  totalAnswered: 0,
  totalCorrect: 0,
  totalXP: 0,
  bestStreak: 0,
  lastPlayedAt: "",
};

export function getWW1TanksProgress(): WW1TanksProgress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<WW1TanksProgress>;
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

function saveWW1TanksProgress(p: WW1TanksProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // Storage unavailable — silently ignore
  }
}

export function markWW1TankCorrect(tankId: string): void {
  if (typeof window === "undefined") return;
  const p = getWW1TanksProgress();
  if (!p.correctIds.includes(tankId)) {
    p.correctIds.push(tankId);
    saveWW1TanksProgress(p);
  }
}

export function updateWW1Stats(correct: boolean, xpEarned: number, streak: number): void {
  if (typeof window === "undefined") return;
  const p = getWW1TanksProgress();
  p.totalAnswered += 1;
  if (correct) {
    p.totalCorrect += 1;
  }
  p.totalXP += xpEarned;
  if (streak > p.bestStreak) {
    p.bestStreak = streak;
  }
  p.lastPlayedAt = new Date().toISOString();
  saveWW1TanksProgress(p);
}

export function getWW1TanksStats(): {
  correct: number;
  total: number;
  xp: number;
  bestStreak: number;
} {
  if (typeof window === "undefined") {
    return { correct: 0, total: 0, xp: 0, bestStreak: 0 };
  }
  const p = getWW1TanksProgress();
  return {
    correct: p.totalCorrect,
    total: p.totalAnswered,
    xp: p.totalXP,
    bestStreak: p.bestStreak,
  };
}
