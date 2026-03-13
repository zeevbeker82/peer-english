/**
 * Advanced Grammar — localStorage persistence
 * Tracks exercise progress + quiz score per topic
 */

const KEY = "adv_grammar_records";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AdvGrammarRecord {
  exercisesCorrect: number;   // How many of the 15 exercises correct
  exercisesDone: boolean;     // All 15 attempted
  quizScore: number;          // 0–8
  quizDone: boolean;          // Quiz completed
  xpEarned: number;
}

type Records = Record<string, AdvGrammarRecord>;

// ─────────────────────────────────────────────────────────────────────────────
// Read
// ─────────────────────────────────────────────────────────────────────────────

export function getAllGrammarRecords(): Records {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Records;
  } catch {
    return {};
  }
}

export function getGrammarRecord(topicId: string): AdvGrammarRecord | null {
  return getAllGrammarRecords()[topicId] ?? null;
}

export function isTopicDone(topicId: string): boolean {
  const r = getGrammarRecord(topicId);
  return (r?.exercisesDone && r?.quizDone) ?? false;
}

export function getCompletedTopicsCount(): number {
  return Object.values(getAllGrammarRecords()).filter(
    (r) => r.exercisesDone && r.quizDone
  ).length;
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

export function saveExerciseResult(
  topicId: string,
  correct: number,
  xpEarned: number,
): void {
  const all = getAllGrammarRecords();
  const existing = all[topicId];
  all[topicId] = {
    exercisesCorrect: correct,
    exercisesDone: true,
    quizScore: existing?.quizScore ?? 0,
    quizDone: existing?.quizDone ?? false,
    xpEarned: (existing?.xpEarned ?? 0) + xpEarned,
  };
  persist(all);
}

export function saveQuizResult(
  topicId: string,
  score: number,
  xpEarned: number,
): void {
  const all = getAllGrammarRecords();
  const existing = all[topicId];
  all[topicId] = {
    exercisesCorrect: existing?.exercisesCorrect ?? 0,
    exercisesDone: existing?.exercisesDone ?? false,
    quizScore: Math.max(score, existing?.quizScore ?? 0),
    quizDone: true,
    xpEarned: (existing?.xpEarned ?? 0) + xpEarned,
  };
  persist(all);
}

export function clearAllGrammarRecords(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch { /* ignore */ }
}
