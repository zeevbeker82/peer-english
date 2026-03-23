/**
 * localStorage persistence for the Israel Wars Tanks quiz module.
 */

const STORAGE_KEY = "israel_wars_tanks_progress";

interface IsraelWarsTanksProgress {
  correctIds: string[];      // tank IDs answered correctly at least once
  totalAnswered: number;
  totalCorrect: number;
  totalXP: number;
  bestStreak: number;
  lastPlayedAt: string;      // ISO date
}

const DEFAULT_PROGRESS: IsraelWarsTanksProgress = {
  correctIds: [],
  totalAnswered: 0,
  totalCorrect: 0,
  totalXP: 0,
  bestStreak: 0,
  lastPlayedAt: "",
};

export function getIsraelWarsTanksProgress(): IsraelWarsTanksProgress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<IsraelWarsTanksProgress>;
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

function saveIsraelWarsTanksProgress(p: IsraelWarsTanksProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // Storage unavailable — silently ignore
  }
}

export function markIsraelTankCorrect(tankId: string): void {
  if (typeof window === "undefined") return;
  const p = getIsraelWarsTanksProgress();
  if (!p.correctIds.includes(tankId)) {
    p.correctIds.push(tankId);
    saveIsraelWarsTanksProgress(p);
  }
}

export function updateIsraelStats(correct: boolean, xpEarned: number, streak: number): void {
  if (typeof window === "undefined") return;
  const p = getIsraelWarsTanksProgress();
  p.totalAnswered += 1;
  if (correct) {
    p.totalCorrect += 1;
  }
  p.totalXP += xpEarned;
  if (streak > p.bestStreak) {
    p.bestStreak = streak;
  }
  p.lastPlayedAt = new Date().toISOString();
  saveIsraelWarsTanksProgress(p);
}

export function getIsraelWarsTanksStats(): {
  correct: number;
  total: number;
  xp: number;
  bestStreak: number;
} {
  if (typeof window === "undefined") {
    return { correct: 0, total: 0, xp: 0, bestStreak: 0 };
  }
  const p = getIsraelWarsTanksProgress();
  return {
    correct: p.totalCorrect,
    total: p.totalAnswered,
    xp: p.totalXP,
    bestStreak: p.bestStreak,
  };
}
