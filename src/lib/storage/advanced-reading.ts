/**
 * Advanced Reading — localStorage module
 * Tracks quiz scores and completion per text ID.
 */

const KEY = "adv_reading_records";

export interface ReadingRecord {
  score: number;       // 0–8 correct answers
  completed: boolean;  // finished all 8 questions
  written: boolean;    // submitted the writing prompt
}

type Records = Record<string, ReadingRecord>;

// ─────────────────────────────────────────────────────────────────────────────
// Read
// ─────────────────────────────────────────────────────────────────────────────

export function getAllRecords(): Records {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getRecord(textId: string): ReadingRecord | null {
  return getAllRecords()[textId] ?? null;
}

export function getCompletedCount(): number {
  const r = getAllRecords();
  return Object.values(r).filter((v) => v.completed).length;
}

export function getBestScore(textId: string): number {
  return getRecord(textId)?.score ?? 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Write
// ─────────────────────────────────────────────────────────────────────────────

function save(records: Records): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(records));
  } catch {
    // localStorage full — ignore
  }
}

export function saveQuizResult(textId: string, score: number): void {
  if (typeof window === "undefined") return;
  const records  = getAllRecords();
  const existing = records[textId];
  records[textId] = {
    score: Math.max(score, existing?.score ?? 0), // keep best score
    completed: true,
    written: existing?.written ?? false,
  };
  save(records);
}

export function markWritten(textId: string): void {
  if (typeof window === "undefined") return;
  const records = getAllRecords();
  if (records[textId]) {
    records[textId].written = true;
    save(records);
  }
}

export function clearAllRecords(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
