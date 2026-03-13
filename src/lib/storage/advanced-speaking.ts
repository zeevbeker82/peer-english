/**
 * Advanced Speaking Lab — localStorage persistence
 */

const KEY = "adv_speaking_records";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SpeakingRecord {
  completed: boolean;     // All turns answered
  turnsAnswered: number;  // How many turns done so far
  xpEarned: number;       // XP awarded on completion
}

type Records = Record<string, SpeakingRecord>;

// ─────────────────────────────────────────────────────────────────────────────
// Read
// ─────────────────────────────────────────────────────────────────────────────

export function getAllSpeakingRecords(): Records {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Records;
  } catch {
    return {};
  }
}

export function getSpeakingRecord(activityId: string): SpeakingRecord | null {
  return getAllSpeakingRecords()[activityId] ?? null;
}

export function isCompleted(activityId: string): boolean {
  return getSpeakingRecord(activityId)?.completed ?? false;
}

export function getCompletedSpeakingCount(): number {
  return Object.values(getAllSpeakingRecords()).filter((r) => r.completed).length;
}

export function getCompletedIds(): Set<string> {
  const all = getAllSpeakingRecords();
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

export function markCompleted(activityId: string, turnsAnswered: number, xpEarned: number): void {
  const all = getAllSpeakingRecords();
  all[activityId] = { completed: true, turnsAnswered, xpEarned };
  persist(all);
}

export function clearAllSpeakingRecords(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch { /* ignore */ }
}
