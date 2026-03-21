import type { DailyQuestion } from "@/lib/content/speaking-games";

const STORAGE_KEY = "speaking_games_progress";

interface SpeakingGamesProgress {
  picturesDone: string[];
  storiesDone: string[];
  dailyDone: Record<string, string>; // { questionId: dateString }
  wordChainBests: Record<string, number>; // { topicId: bestChainLength }
  totalXP: number;
}

const DEFAULT_PROGRESS: SpeakingGamesProgress = {
  picturesDone: [],
  storiesDone: [],
  dailyDone: {},
  wordChainBests: {},
  totalXP: 0,
};

export function getSpeakingGamesProgress(): SpeakingGamesProgress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<SpeakingGamesProgress>;
    return {
      picturesDone: parsed.picturesDone ?? [],
      storiesDone: parsed.storiesDone ?? [],
      dailyDone: parsed.dailyDone ?? {},
      wordChainBests: parsed.wordChainBests ?? {},
      totalXP: parsed.totalXP ?? 0,
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveProgress(p: SpeakingGamesProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // ignore quota errors
  }
}

export function markPictureDone(id: string, xp: number): void {
  const p = getSpeakingGamesProgress();
  if (!p.picturesDone.includes(id)) {
    p.picturesDone.push(id);
  }
  p.totalXP += xp;
  saveProgress(p);
}

export function markStoryDone(id: string, xp: number): void {
  const p = getSpeakingGamesProgress();
  if (!p.storiesDone.includes(id)) {
    p.storiesDone.push(id);
  }
  p.totalXP += xp;
  saveProgress(p);
}

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function markDailyDone(id: string): void {
  const p = getSpeakingGamesProgress();
  p.dailyDone[id] = todayString();
  p.totalXP += 10;
  saveProgress(p);
}

export function isDailyDoneToday(id: string): boolean {
  const p = getSpeakingGamesProgress();
  return p.dailyDone[id] === todayString();
}

export function updateWordChainBest(topicId: string, length: number, xp: number): void {
  const p = getSpeakingGamesProgress();
  const prev = p.wordChainBests[topicId] ?? 0;
  if (length > prev) {
    p.wordChainBests[topicId] = length;
  }
  p.totalXP += xp;
  saveProgress(p);
}

export function getSpeakingGamesStats(): {
  picturesDone: number;
  storiesDone: number;
  dailyDone: number;
  totalXP: number;
} {
  const p = getSpeakingGamesProgress();
  return {
    picturesDone: p.picturesDone.length,
    storiesDone: p.storiesDone.length,
    dailyDone: Object.keys(p.dailyDone).length,
    totalXP: p.totalXP,
  };
}

export function getTodaysDailyQuestion(questions: DailyQuestion[]): DailyQuestion {
  if (questions.length === 0) {
    return {
      id: "fallback",
      question: "What is your favorite thing to do?",
      question_he: "מה הדבר האהוב עליך לעשות?",
      example_phrases: ["I like...", "My favorite is...", "I really enjoy...", "I love..."],
      category: "favorites",
      emoji: "⭐",
    };
  }
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % questions.length;
  return questions[index];
}
