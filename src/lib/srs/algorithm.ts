/**
 * Simplified SM-2 Spaced Repetition Algorithm
 *
 * Grade scale (0–5):
 *   0 = complete blackout
 *   1 = incorrect (remembered after seeing)
 *   2 = incorrect but correct answer felt easy
 *   3 = correct with significant difficulty
 *   4 = correct after a hesitation
 *   5 = perfect response
 *
 * In our UI we map:
 *   wrong → grade 1
 *   hard  → grade 3
 *   good  → grade 4
 *   easy  → grade 5
 */

export type SRSGrade = 0 | 1 | 2 | 3 | 4 | 5;

export interface SRSCard {
  wordId: string;
  interval: number;      // Days until next review
  easeFactor: number;    // ≥ 1.3 (default 2.5)
  repetitions: number;   // Number of times reviewed successfully
  nextReview: string;    // ISO date string
  lastReview: string;    // ISO date string
}

const DEFAULT_EASE = 2.5;
const MIN_EASE = 1.3;

/** Add days to a date, returns ISO string */
function addDays(date: Date, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + Math.max(1, days));
  return d.toISOString().slice(0, 10);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Create a new SRS card for a word (not yet reviewed) */
export function createCard(wordId: string): SRSCard {
  return {
    wordId,
    interval: 1,
    easeFactor: DEFAULT_EASE,
    repetitions: 0,
    nextReview: today(),
    lastReview: "",
  };
}

/**
 * SM-2 update: returns a new card with updated scheduling.
 */
export function updateCard(card: SRSCard, grade: SRSGrade): SRSCard {
  const now = today();

  if (grade < 3) {
    // Wrong: reset repetitions, review again tomorrow
    return {
      ...card,
      repetitions: 0,
      interval: 1,
      nextReview: addDays(new Date(), 1),
      lastReview: now,
    };
  }

  // Update ease factor
  const newEase = Math.max(
    MIN_EASE,
    card.easeFactor + 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)
  );

  // Calculate new interval
  let newInterval: number;
  if (card.repetitions === 0) {
    newInterval = 1;
  } else if (card.repetitions === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(card.interval * card.easeFactor);
  }

  return {
    ...card,
    repetitions: card.repetitions + 1,
    interval: newInterval,
    easeFactor: newEase,
    nextReview: addDays(new Date(), newInterval),
    lastReview: now,
  };
}

/** Whether a card is due for review today */
export function isDue(card: SRSCard): boolean {
  return card.nextReview <= today();
}

/** Get cards due today, sorted by overdue-ness */
export function getDueCards(cards: SRSCard[]): SRSCard[] {
  const t = today();
  return cards
    .filter((c) => c.nextReview <= t)
    .sort((a, b) => a.nextReview.localeCompare(b.nextReview));
}

/** Map our UI answer quality to SM-2 grade */
export function qualityToGrade(quality: "wrong" | "hard" | "good" | "easy"): SRSGrade {
  const map: Record<string, SRSGrade> = {
    wrong: 1,
    hard: 3,
    good: 4,
    easy: 5,
  };
  return map[quality];
}
