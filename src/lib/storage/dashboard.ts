/**
 * Dashboard — goals + weekly snapshot storage
 */

const KEY = "peer_dashboard_v1";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type GoalType = "xp" | "words" | "reading" | "speaking" | "exercises";

export interface GoalSnapshot {
  totalXP: number;
  wordsLearned: number;
  correctAnswers: number;
  readingDone: number;
  speakingDone: number;
}

export interface PersonalGoal {
  type: GoalType;
  target: number;
  setDate: string;       // YYYY-MM-DD
  snapshot: GoalSnapshot; // values at time goal was set
  celebrated: boolean;
}

export interface DashboardData {
  goal: PersonalGoal | null;
}

const DEFAULT: DashboardData = { goal: null };

// ─────────────────────────────────────────────────────────────────────────────
// Read / Write
// ─────────────────────────────────────────────────────────────────────────────

function load(): DashboardData {
  if (typeof window === "undefined") return { ...DEFAULT };
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "null") ?? { ...DEFAULT };
  } catch {
    return { ...DEFAULT };
  }
}

function save(data: DashboardData): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* quota */ }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function getDashboardData(): DashboardData { return load(); }

export function setGoal(type: GoalType, target: number, snapshot: GoalSnapshot): void {
  const data = load();
  data.goal = {
    type, target,
    setDate: new Date().toISOString().slice(0, 10),
    snapshot,
    celebrated: false,
  };
  save(data);
}

export function clearGoal(): void {
  const data = load();
  data.goal = null;
  save(data);
}

export function markGoalCelebrated(): void {
  const data = load();
  if (data.goal) { data.goal.celebrated = true; save(data); }
}

// ─────────────────────────────────────────────────────────────────────────────
// CEFR helpers
// ─────────────────────────────────────────────────────────────────────────────

export interface CEFRInfo {
  level: string;
  level_he: string;
  desc_he: string;
  next: string | null;
  nextXP: number | null;
  color: string;
  minXP: number;
  maxXP: number;
}

export function getCEFR(xp: number): CEFRInfo {
  if (xp < 501)  return { level:"A1", level_he:"A1", desc_he:"מתחיל",   next:"A2",  nextXP:501,  color:"from-green-400 to-emerald-500",  minXP:0,    maxXP:500  };
  if (xp < 2801) return { level:"A2", level_he:"A2", desc_he:"ממשיך",   next:"B1",  nextXP:2801, color:"from-blue-400 to-indigo-500",    minXP:501,  maxXP:2800 };
  if (xp < 6001) return { level:"B1", level_he:"B1", desc_he:"מתקדם",   next:"B1+", nextXP:6001, color:"from-purple-500 to-violet-600",  minXP:2801, maxXP:6000 };
  return           { level:"B1+",level_he:"B1+",desc_he:"מתקדם+",next:null, nextXP:null, color:"from-amber-400 to-orange-500",  minXP:6001, maxXP:10000};
}

// ─────────────────────────────────────────────────────────────────────────────
// Weekly XP helpers
// ─────────────────────────────────────────────────────────────────────────────

export interface DayXP { label: string; isoDate: string; xp: number; isToday: boolean; }

export function buildWeeklyData(
  dailyXP: { date: string; xp: number }[],
  weeksAgo: 0 | 1 = 0
): DayXP[] {
  const xpByDate = new Map(dailyXP.map((d) => [d.date, d.xp]));
  const today = new Date();
  const dayNames = ["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"];
  const result: DayXP[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i - weeksAgo * 7);
    const iso = d.toISOString().slice(0, 10);
    result.push({
      label: dayNames[d.getDay()],
      isoDate: iso,
      xp: xpByDate.get(iso) ?? 0,
      isToday: weeksAgo === 0 && i === 0,
    });
  }
  return result;
}

export function weeklyTotal(days: DayXP[]): number {
  return days.reduce((s, d) => s + d.xp, 0);
}
