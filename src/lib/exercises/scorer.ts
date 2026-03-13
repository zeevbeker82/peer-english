import type { ExerciseAttempt } from "./types";

export interface LessonScore {
  totalPoints: number;
  maxPoints: number;
  percentScore: number;
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  stars: 1 | 2 | 3;
  summary_he: string;
  wrongExerciseIds: string[];
  // New fields
  streakBonus: number;
  lessonBonus: number;
  bestStreak: number;
  readingCount: number;
  listeningCount: number;
}

/** Compute stars: 1 = <60%, 2 = 60-89%, 3 = 90%+ */
function calcStars(percent: number): 1 | 2 | 3 {
  if (percent >= 90) return 3;
  if (percent >= 60) return 2;
  return 1;
}

/**
 * Compute streak bonus from ordered attempts.
 * Each correct answer that continues a streak (2nd, 3rd, …) earns +5.
 * Returns total streak bonus and best streak length.
 */
function computeStreakBonus(attempts: ExerciseAttempt[]): {
  bonus: number;
  bestStreak: number;
} {
  let currentStreak = 0;
  let bestStreak = 0;
  let bonus = 0;

  for (const attempt of attempts) {
    if (attempt.correct) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
      if (currentStreak >= 2) bonus += 5; // bonus starts from 2nd in a row
    } else {
      currentStreak = 0;
    }
  }

  return { bonus, bestStreak };
}

export function computeLessonScore(attempts: ExerciseAttempt[]): LessonScore {
  const correctCount = attempts.filter((a) => a.correct).length;
  const basePoints = correctCount * 10; // 10 pts per correct answer
  const maxPts = attempts.length * 10;

  const { bonus: streakBonus, bestStreak } = computeStreakBonus(attempts);

  const lessonBonus = 50; // bonus for completing any lesson

  const totalPoints = basePoints + streakBonus + lessonBonus;
  const percent = maxPts > 0 ? Math.round((basePoints / maxPts) * 100) : 0;
  const stars = calcStars(percent);

  // Stars bonus on top
  const starsBonus = stars === 3 ? 30 : stars === 2 ? 10 : 0;
  const xpEarned = totalPoints + starsBonus;

  const wrongIds = attempts.filter((a) => !a.correct).map((a) => a.exerciseId);

  const readingCount = attempts.filter((a) => a.exerciseType === "reading").length;
  const listeningCount = attempts.filter((a) => a.exerciseType === "listening").length;

  const summaryMap: Record<1 | 2 | 3, string> = {
    1: "לא נורא! בואו נתאמן עוד קצת 💪",
    2: "יפה מאוד! עוד קצת ותהיה מושלם 😊",
    3: "מדהים! שיעור מושלם! 🌟🎉",
  };

  return {
    totalPoints,
    maxPoints: maxPts,
    percentScore: percent,
    correctCount,
    totalCount: attempts.length,
    xpEarned,
    stars,
    summary_he: summaryMap[stars],
    wrongExerciseIds: wrongIds,
    streakBonus,
    lessonBonus,
    bestStreak,
    readingCount,
    listeningCount,
  };
}
