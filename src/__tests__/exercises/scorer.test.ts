import { describe, it, expect } from "vitest";
import { computeLessonScore } from "@/lib/exercises/scorer";
import type { ExerciseAttempt } from "@/lib/exercises/types";

const makeAttempt = (id: string, correct: boolean, points: number): ExerciseAttempt => ({
  exerciseId: id,
  exerciseType: "multiple-choice",
  correct,
  points,
  timeMs: 3000,
});

describe("computeLessonScore", () => {
  it("gives 3 stars for 100% correct", () => {
    const attempts = [
      makeAttempt("e1", true, 10),
      makeAttempt("e2", true, 10),
      makeAttempt("e3", true, 10),
      makeAttempt("e4", true, 10),
      makeAttempt("e5", true, 10),
    ];
    const score = computeLessonScore(attempts);
    expect(score.stars).toBe(3);
    expect(score.percentScore).toBe(100);
    expect(score.correctCount).toBe(5);
    expect(score.totalCount).toBe(5);
    expect(score.wrongExerciseIds).toHaveLength(0);
    // XP: 20 base + 5*5 + 15 bonus = 60
    expect(score.xpEarned).toBe(60);
  });

  it("gives 2 stars for 60-89%", () => {
    const attempts = [
      makeAttempt("e1", true, 10),
      makeAttempt("e2", true, 10),
      makeAttempt("e3", true, 10),
      makeAttempt("e4", false, 0),
      makeAttempt("e5", false, 0),
    ];
    const score = computeLessonScore(attempts);
    expect(score.stars).toBe(2);
    expect(score.percentScore).toBe(60);
    expect(score.wrongExerciseIds).toEqual(["e4", "e5"]);
  });

  it("gives 1 star for <60%", () => {
    const attempts = [
      makeAttempt("e1", false, 0),
      makeAttempt("e2", false, 0),
      makeAttempt("e3", false, 0),
      makeAttempt("e4", false, 0),
      makeAttempt("e5", true, 10),
    ];
    const score = computeLessonScore(attempts);
    expect(score.stars).toBe(1);
    expect(score.percentScore).toBe(20);
  });

  it("handles empty attempts gracefully", () => {
    const score = computeLessonScore([]);
    expect(score.percentScore).toBe(0);
    expect(score.stars).toBe(1);
    expect(score.xpEarned).toBe(20); // base XP only
  });
});
