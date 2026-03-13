/** User progress — persisted in localStorage */

const PROGRESS_KEY = "peer_english_progress";

// ─── Level thresholds ────────────────────────────────────────────────────────

export const LEVEL_THRESHOLDS = [
  { level: 1,  min: 0,     max: 200,      label: "מתחיל",         emoji: "🌱" },
  { level: 2,  min: 201,   max: 500,      label: "לומד",          emoji: "🌿" },
  { level: 3,  min: 501,   max: 1000,     label: "מתקדם",         emoji: "🌳" },
  { level: 4,  min: 1001,  max: 1800,     label: "מיומן",         emoji: "⭐" },
  { level: 5,  min: 1801,  max: 2800,     label: "מנוסה",         emoji: "🌟" },
  { level: 6,  min: 2801,  max: 4000,     label: "מומחה",         emoji: "💫" },
  { level: 7,  min: 4001,  max: 5500,     label: "אלוף",          emoji: "🔥" },
  { level: 8,  min: 5501,  max: 7500,     label: "גאון",          emoji: "👑" },
  { level: 9,  min: 7501,  max: 10000,    label: "אלוף האנגלית",  emoji: "🏆" },
  { level: 10, min: 10001, max: Infinity, label: "מאסטר",         emoji: "🎓" },
] as const;

export type LevelInfo = {
  level: number;
  label: string;
  emoji: string;
  min: number;
  max: number;
};

export function getLevelInfo(xp: number): LevelInfo {
  for (const t of LEVEL_THRESHOLDS) {
    if (xp <= t.max) return t as unknown as LevelInfo;
  }
  return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] as unknown as LevelInfo;
}

// ─── UserProgress interface ──────────────────────────────────────────────────

export interface UserProgress {
  // Core fields
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalXP: number;        // unified points currency
  level: number;
  completedLessons: string[];
  lessonScores: Record<string, number>; // lessonId → percentScore
  dailyXP: Array<{ date: string; xp: number }>;

  // Achievement tracking fields
  correctAnswers: number;
  bestStreak: number;      // best consecutive-correct streak in a single session
  readingDone: number;
  listeningDone: number;
  writingDone: number;
  wordsLearned: number;    // SRS card reviews done
  grammarDone: number;
  speakingDone: number;    // speaking activities completed
}

const DEFAULT_PROGRESS: UserProgress = {
  streak: 0,
  lastActiveDate: "",
  totalXP: 0,
  level: 1,
  completedLessons: [],
  lessonScores: {},
  dailyXP: [],
  correctAnswers: 0,
  bestStreak: 0,
  readingDone: 0,
  listeningDone: 0,
  writingDone: 0,
  wordsLearned: 0,
  grammarDone: 0,
  speakingDone: 0,
};

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
function yesterdayISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// ─── CRUD ────────────────────────────────────────────────────────────────────

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    // Merge with defaults to handle schema migrations gracefully
    return { ...DEFAULT_PROGRESS, ...(JSON.parse(raw) as Partial<UserProgress>) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // ignore quota errors
  }
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROGRESS_KEY);
}

// ─── Update helpers ──────────────────────────────────────────────────────────

export function updateStreak(progress: UserProgress): UserProgress {
  const today = todayISO();
  if (progress.lastActiveDate === today) return progress;

  const newStreak =
    progress.lastActiveDate === yesterdayISO() ? progress.streak + 1 : 1;

  return { ...progress, streak: newStreak, lastActiveDate: today };
}

export function addXP(progress: UserProgress, xp: number): UserProgress {
  const newTotal = progress.totalXP + xp;
  const newLevel = getLevelInfo(newTotal).level;

  const today = todayISO();
  const existing = progress.dailyXP.find((d) => d.date === today);
  const dailyXP = existing
    ? progress.dailyXP.map((d) => (d.date === today ? { ...d, xp: d.xp + xp } : d))
    : [...progress.dailyXP.slice(-29), { date: today, xp }];

  return { ...progress, totalXP: newTotal, level: newLevel, dailyXP };
}

export interface LessonStatsUpdate {
  correctAnswers: number;
  bestStreak: number;
  readingCount: number;
  listeningCount: number;
}

export function recordLessonComplete(
  progress: UserProgress,
  lessonId: string,
  percentScore: number,
  xpEarned: number,
  stats?: LessonStatsUpdate
): UserProgress {
  const completedLessons = progress.completedLessons.includes(lessonId)
    ? progress.completedLessons
    : [...progress.completedLessons, lessonId];

  const lessonScores = {
    ...progress.lessonScores,
    [lessonId]: Math.max(percentScore, progress.lessonScores[lessonId] ?? 0),
  };

  let next = addXP({ ...progress, completedLessons, lessonScores }, xpEarned);

  if (stats) {
    next = {
      ...next,
      correctAnswers: next.correctAnswers + stats.correctAnswers,
      bestStreak: Math.max(next.bestStreak, stats.bestStreak),
      readingDone: next.readingDone + stats.readingCount,
      listeningDone: next.listeningDone + stats.listeningCount,
    };
  }

  return next;
}

/** XP needed to reach next level (0 = max level) */
export function xpToNextLevel(progress: UserProgress): number {
  const info = getLevelInfo(progress.totalXP);
  if (info.max === Infinity) return 0;
  return (info.max as number) - progress.totalXP + 1;
}

export function incrementWordsLearned(progress: UserProgress, count = 1): UserProgress {
  return { ...progress, wordsLearned: progress.wordsLearned + count };
}

export function incrementGrammarDone(progress: UserProgress, count = 1): UserProgress {
  return { ...progress, grammarDone: progress.grammarDone + count };
}

export function incrementWritingDone(progress: UserProgress, count = 1): UserProgress {
  return { ...progress, writingDone: progress.writingDone + count };
}

export function incrementSpeakingDone(progress: UserProgress, count = 1): UserProgress {
  return { ...progress, speakingDone: progress.speakingDone + count };
}
