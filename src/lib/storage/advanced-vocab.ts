/**
 * Advanced Vocabulary — localStorage module
 * Tracks which word IDs the student has marked as learned.
 */

const LEARNED_KEY = "adv_learned_ids";

// ─────────────────────────────────────────────────────────────────────────────
// Read
// ─────────────────────────────────────────────────────────────────────────────

export function getLearnedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(LEARNED_KEY);
    const arr: string[] = raw ? JSON.parse(raw) : [];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

export function getLearnedCount(): number {
  return getLearnedIds().size;
}

/** How many of the given word IDs have been learned? */
export function getLearnedCountForIds(ids: string[]): number {
  const learned = getLearnedIds();
  return ids.filter((id) => learned.has(id)).length;
}

// ─────────────────────────────────────────────────────────────────────────────
// Write
// ─────────────────────────────────────────────────────────────────────────────

export function markLearned(id: string): void {
  if (typeof window === "undefined") return;
  const ids = getLearnedIds();
  ids.add(id);
  try {
    localStorage.setItem(LEARNED_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage full — ignore
  }
}

export function unmarkLearned(id: string): void {
  if (typeof window === "undefined") return;
  const ids = getLearnedIds();
  ids.delete(id);
  try {
    localStorage.setItem(LEARNED_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore
  }
}

export function clearAllLearned(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LEARNED_KEY);
}
