/**
 * Advanced Writing Lab — localStorage persistence
 * Stores draft text, submitted status, and word count per activity
 */

const KEY = "adv_writing_records";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface WritingRecord {
  draft: string;        // Saved text (auto-saved)
  submitted: boolean;   // Whether the user officially submitted
  wordCount: number;    // Word count at time of submission
  xpEarned: number;     // XP earned on submission
}

type Records = Record<string, WritingRecord>;

// ─────────────────────────────────────────────────────────────────────────────
// Read
// ─────────────────────────────────────────────────────────────────────────────

export function getAllWritingRecords(): Records {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Records;
  } catch {
    return {};
  }
}

export function getWritingRecord(activityId: string): WritingRecord | null {
  const all = getAllWritingRecords();
  return all[activityId] ?? null;
}

export function getDraft(activityId: string): string {
  return getWritingRecord(activityId)?.draft ?? "";
}

export function isSubmitted(activityId: string): boolean {
  return getWritingRecord(activityId)?.submitted ?? false;
}

export function getSubmittedCount(): number {
  const all = getAllWritingRecords();
  return Object.values(all).filter((r) => r.submitted).length;
}

// ─────────────────────────────────────────────────────────────────────────────
// Write
// ─────────────────────────────────────────────────────────────────────────────

function save(records: Records): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(records));
  } catch { /* quota exceeded — fail silently */ }
}

/** Auto-save draft (called on every keystroke debounce) */
export function saveDraft(activityId: string, text: string): void {
  const all = getAllWritingRecords();
  const existing = all[activityId];
  all[activityId] = {
    draft: text,
    submitted: existing?.submitted ?? false,
    wordCount: existing?.wordCount ?? 0,
    xpEarned: existing?.xpEarned ?? 0,
  };
  save(all);
}

/** Mark an activity as officially submitted */
export function submitWriting(
  activityId: string,
  text: string,
  wordCount: number,
  xpEarned: number,
): void {
  const all = getAllWritingRecords();
  all[activityId] = {
    draft: text,
    submitted: true,
    wordCount,
    xpEarned,
  };
  save(all);
}

/** Clear all writing records (for reset) */
export function clearAllWritingRecords(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch { /* ignore */ }
}
