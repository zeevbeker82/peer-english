import { describe, it, expect } from "vitest";
import { validateAnswer } from "@/lib/exercises/validator";
import type {
  MultipleChoiceExercise,
  MatchingExercise,
  FillInBlankExercise,
  ListeningExercise,
  ReadingExercise,
} from "@/lib/exercises/types";

// ─── Multiple Choice ─────────────────────────────────────────────────────────

const mcExercise: MultipleChoiceExercise = {
  id: "test-mc",
  type: "multiple-choice",
  instruction_he: "מה פירוש?",
  question: "teacher",
  questionType: "word",
  options: ["מורה", "מחברת", "עיפרון", "שולחן"],
  correctIndex: 0,
  difficulty: "A1",
};

describe("validateAnswer - multiple-choice", () => {
  it("returns isCorrect=true and 10 points for correct answer", () => {
    const result = validateAnswer(mcExercise, { selectedIndex: 0 });
    expect(result.isCorrect).toBe(true);
    expect(result.points).toBe(10);
    expect(result.feedback_he).toBeTruthy();
  });

  it("returns isCorrect=false and 0 points for wrong answer", () => {
    const result = validateAnswer(mcExercise, { selectedIndex: 2 });
    expect(result.isCorrect).toBe(false);
    expect(result.points).toBe(0);
    expect(result.feedback_he).toContain("מורה");
  });
});

// ─── Matching ────────────────────────────────────────────────────────────────

const matchExercise: MatchingExercise = {
  id: "test-match",
  type: "matching",
  instruction_he: "חברו",
  pairs: [
    { id: "m1", english: "cat", hebrew: "חתול" },
    { id: "m2", english: "dog", hebrew: "כלב" },
  ],
  difficulty: "A1",
};

describe("validateAnswer - matching", () => {
  it("returns isCorrect=true when all pairs correct", () => {
    const result = validateAnswer(matchExercise, {
      matches: { cat: "חתול", dog: "כלב" },
    });
    expect(result.isCorrect).toBe(true);
    expect(result.points).toBe(10);
  });

  it("returns partial score for partial match", () => {
    const result = validateAnswer(matchExercise, {
      matches: { cat: "חתול", dog: "חתול" }, // wrong second
    });
    expect(result.isCorrect).toBe(false);
    expect(result.points).toBe(5); // 1/2 pairs correct → 5 pts
  });

  it("returns 0 for all wrong", () => {
    const result = validateAnswer(matchExercise, {
      matches: { cat: "כלב", dog: "חתול" },
    });
    expect(result.isCorrect).toBe(false);
    expect(result.points).toBe(0);
  });
});

// ─── Fill in Blank ───────────────────────────────────────────────────────────

const fillExercise: FillInBlankExercise = {
  id: "test-fill",
  type: "fill-in-blank",
  instruction_he: "בחרו",
  sentence: "I carry my books in my {{blank}}.",
  answer: "bag",
  options: ["bag", "book", "desk", "pencil"],
  difficulty: "A1",
};

describe("validateAnswer - fill-in-blank", () => {
  it("returns correct for exact match", () => {
    const result = validateAnswer(fillExercise, { selectedWord: "bag" });
    expect(result.isCorrect).toBe(true);
    expect(result.points).toBe(10);
  });

  it("is case-insensitive", () => {
    const result = validateAnswer(fillExercise, { selectedWord: "BAG" });
    expect(result.isCorrect).toBe(true);
  });

  it("returns wrong for incorrect word", () => {
    const result = validateAnswer(fillExercise, { selectedWord: "desk" });
    expect(result.isCorrect).toBe(false);
    expect(result.points).toBe(0);
    expect(result.feedback_he).toContain("bag");
  });
});

// ─── Listening ───────────────────────────────────────────────────────────────

const listenExercise: ListeningExercise = {
  id: "test-listen",
  type: "listening",
  instruction_he: "הקשיבו",
  ttsText: "Hello! My name is Dan.",
  question_he: "מה שם הילד?",
  options_he: ["דן", "שרה", "דוד", "רון"],
  correctIndex: 0,
  difficulty: "A1",
};

describe("validateAnswer - listening", () => {
  it("returns correct for right option", () => {
    const result = validateAnswer(listenExercise, { selectedIndex: 0 });
    expect(result.isCorrect).toBe(true);
    expect(result.points).toBe(10);
  });

  it("returns wrong for wrong option", () => {
    const result = validateAnswer(listenExercise, { selectedIndex: 2 });
    expect(result.isCorrect).toBe(false);
    expect(result.feedback_he).toContain("דן");
  });
});

// ─── Reading ─────────────────────────────────────────────────────────────────

const readExercise: ReadingExercise = {
  id: "test-read",
  type: "reading",
  instruction_he: "קראו",
  passage: "My cat is black. My dog is big.",
  question_he: "איזה צבע החתול?",
  options_he: ["חום", "לבן", "שחור", "כתום"],
  correctIndex: 2,
  difficulty: "A1",
};

describe("validateAnswer - reading", () => {
  it("returns correct for right index", () => {
    const result = validateAnswer(readExercise, { selectedIndex: 2 });
    expect(result.isCorrect).toBe(true);
  });

  it("returns wrong for wrong index", () => {
    const result = validateAnswer(readExercise, { selectedIndex: 0 });
    expect(result.isCorrect).toBe(false);
    expect(result.feedback_he).toContain("שחור");
  });
});
