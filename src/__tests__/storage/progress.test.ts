import { describe, it, expect, beforeEach } from "vitest";
import {
  updateStreak,
  addXP,
  recordLessonComplete,
  type UserProgress,
} from "@/lib/storage/progress";

const BASE_PROGRESS: UserProgress = {
  streak: 0,
  lastActiveDate: "",
  totalXP: 0,
  level: 1,
  completedLessons: [],
  lessonScores: {},
  dailyXP: [],
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

describe("updateStreak", () => {
  it("starts streak at 1 for new user", () => {
    const result = updateStreak(BASE_PROGRESS);
    expect(result.streak).toBe(1);
    expect(result.lastActiveDate).toBe(today());
  });

  it("extends streak for consecutive day", () => {
    const progress = { ...BASE_PROGRESS, streak: 5, lastActiveDate: yesterday() };
    const result = updateStreak(progress);
    expect(result.streak).toBe(6);
  });

  it("resets streak after gap", () => {
    const progress = { ...BASE_PROGRESS, streak: 10, lastActiveDate: "2020-01-01" };
    const result = updateStreak(progress);
    expect(result.streak).toBe(1);
  });

  it("does not change if already updated today", () => {
    const progress = { ...BASE_PROGRESS, streak: 7, lastActiveDate: today() };
    const result = updateStreak(progress);
    expect(result.streak).toBe(7);
  });
});

describe("addXP", () => {
  it("adds XP correctly", () => {
    const result = addXP(BASE_PROGRESS, 50);
    expect(result.totalXP).toBe(50);
    expect(result.level).toBe(1);
  });

  it("levels up at 100 XP", () => {
    const result = addXP(BASE_PROGRESS, 100);
    expect(result.level).toBe(2);
  });

  it("tracks daily XP", () => {
    const result = addXP(BASE_PROGRESS, 30);
    expect(result.dailyXP).toHaveLength(1);
    expect(result.dailyXP[0].xp).toBe(30);
    expect(result.dailyXP[0].date).toBe(today());
  });
});

describe("recordLessonComplete", () => {
  it("adds lesson to completed list", () => {
    const result = recordLessonComplete(BASE_PROGRESS, "lesson-01", 80, 25);
    expect(result.completedLessons).toContain("lesson-01");
    expect(result.lessonScores["lesson-01"]).toBe(80);
    expect(result.totalXP).toBe(25);
  });

  it("does not duplicate lesson ID", () => {
    let p = recordLessonComplete(BASE_PROGRESS, "lesson-01", 80, 25);
    p = recordLessonComplete(p, "lesson-01", 90, 30);
    expect(p.completedLessons.filter((id) => id === "lesson-01")).toHaveLength(1);
    expect(p.lessonScores["lesson-01"]).toBe(90); // improved score
  });

  it("keeps best score when replaying with lower score", () => {
    let p = recordLessonComplete(BASE_PROGRESS, "lesson-01", 95, 50);
    p = recordLessonComplete(p, "lesson-01", 60, 20);
    expect(p.lessonScores["lesson-01"]).toBe(95); // keeps higher
  });
});
