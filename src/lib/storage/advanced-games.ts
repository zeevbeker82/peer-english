/**
 * Advanced Games — localStorage high-score persistence
 * Key format: adv_game_{gameId}_{difficulty}
 */

import type { GameDifficulty } from "@/lib/content/advanced-games";

const PREFIX = "adv_game_";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface GameScore {
  highScore: number;      // XP (best run)
  gamesPlayed: number;
  lastPlayed: string;     // ISO date
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function key(gameId: string, diff: GameDifficulty): string {
  return `${PREFIX}${gameId}_${diff}`;
}

function read<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { return JSON.parse(localStorage.getItem(k) ?? "null") ?? fallback; }
  catch { return fallback; }
}

function write(k: string, val: unknown): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(k, JSON.stringify(val)); } catch { /* quota */ }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function getScore(gameId: string, diff: GameDifficulty): GameScore {
  return read<GameScore>(key(gameId, diff), {
    highScore: 0, gamesPlayed: 0, lastPlayed: "",
  });
}

export function saveScore(gameId: string, diff: GameDifficulty, xp: number): void {
  const existing = getScore(gameId, diff);
  write(key(gameId, diff), {
    highScore: Math.max(existing.highScore, xp),
    gamesPlayed: existing.gamesPlayed + 1,
    lastPlayed: new Date().toISOString().slice(0, 10),
  });
}

/** Returns {easy, medium, hard} best scores for one game */
export function getAllScores(gameId: string): Record<GameDifficulty, GameScore> {
  return {
    easy:   getScore(gameId, "easy"),
    medium: getScore(gameId, "medium"),
    hard:   getScore(gameId, "hard"),
  };
}

/** Returns the overall best high score across all difficulties for a game */
export function getBestScore(gameId: string): number {
  const all = getAllScores(gameId);
  return Math.max(all.easy.highScore, all.medium.highScore, all.hard.highScore);
}

/** Returns total games played across all 6 games and all difficulties */
export function getTotalGamesPlayed(): number {
  if (typeof window === "undefined") return 0;
  const ids = ["word-race","grammar-ninja","error-hunt","speed-translation","category-challenge","idiom-match"];
  const diffs: GameDifficulty[] = ["easy","medium","hard"];
  let total = 0;
  for (const id of ids) for (const d of diffs) total += getScore(id, d).gamesPlayed;
  return total;
}

export function clearAllGameScores(): void {
  if (typeof window === "undefined") return;
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  } catch { /* ignore */ }
}
