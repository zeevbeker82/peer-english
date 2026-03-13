/**
 * Weekly Challenges — localStorage persistence
 */

const KEY = "weekly_challenge_records";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ChallengeRecord {
  completed: boolean;
  completedDate: string; // ISO date string, e.g. "2026-03-12"
  tasks: boolean[];      // per-task checkbox state
  xpEarned: number;
}

type Records = Record<string, ChallengeRecord>;

// ─────────────────────────────────────────────────────────────────────────────
// Read
// ─────────────────────────────────────────────────────────────────────────────

export function getAllChallengeRecords(): Records {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Records;
  } catch {
    return {};
  }
}

export function getChallengeRecord(id: string): ChallengeRecord | null {
  return getAllChallengeRecords()[id] ?? null;
}

export function isCompleted(id: string): boolean {
  return getChallengeRecord(id)?.completed ?? false;
}

export function getCompletedChallengesCount(): number {
  return Object.values(getAllChallengeRecords()).filter((r) => r.completed).length;
}

export function getCompletedIds(): Set<string> {
  const all = getAllChallengeRecords();
  return new Set(
    Object.entries(all)
      .filter(([, r]) => r.completed)
      .map(([id]) => id)
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Write
// ─────────────────────────────────────────────────────────────────────────────

function persist(records: Records): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(records));
  } catch { /* quota — fail silently */ }
}

export function saveTasks(id: string, tasks: boolean[]): void {
  const all = getAllChallengeRecords();
  const existing = all[id];
  all[id] = {
    completed: existing?.completed ?? false,
    completedDate: existing?.completedDate ?? "",
    tasks,
    xpEarned: existing?.xpEarned ?? 0,
  };
  persist(all);
}

export function markCompleted(id: string, tasks: boolean[], xpEarned: number): void {
  const all = getAllChallengeRecords();
  const today = new Date().toISOString().slice(0, 10);
  all[id] = {
    completed: true,
    completedDate: today,
    tasks,
    xpEarned,
  };
  persist(all);
}

export function clearAllChallengeRecords(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch { /* ignore */ }
}
