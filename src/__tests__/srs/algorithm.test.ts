import { describe, it, expect } from "vitest";
import { createCard, updateCard, isDue } from "@/lib/srs/algorithm";

describe("SRS Algorithm (SM-2)", () => {
  it("creates card with default values", () => {
    const card = createCard("word-01");
    expect(card.wordId).toBe("word-01");
    expect(card.repetitions).toBe(0);
    expect(card.easeFactor).toBe(2.5);
    expect(card.interval).toBe(1);
    // New card is due today
    expect(isDue(card)).toBe(true);
  });

  it("resets card on wrong answer (grade < 3)", () => {
    let card = createCard("word-01");
    card = updateCard(card, 5); // easy → interval=1, rep=1
    card = updateCard(card, 1); // wrong → reset
    expect(card.repetitions).toBe(0);
    expect(card.interval).toBe(1);
  });

  it("increases interval on correct answers (grade 4)", () => {
    let card = createCard("word-01");
    card = updateCard(card, 4); // rep=0 → interval=1
    expect(card.repetitions).toBe(1);
    expect(card.interval).toBe(1);

    card = updateCard(card, 4); // rep=1 → interval=6
    expect(card.repetitions).toBe(2);
    expect(card.interval).toBe(6);

    card = updateCard(card, 4); // rep=2 → interval=6*2.5=15
    expect(card.repetitions).toBe(3);
    expect(card.interval).toBeGreaterThanOrEqual(6);
  });

  it("decreases ease factor for hard answers (grade 3)", () => {
    let card = createCard("word-01");
    const initialEase = card.easeFactor;
    card = updateCard(card, 3); // hard
    card = updateCard(card, 3); // hard
    // ease factor should decrease slightly
    expect(card.easeFactor).toBeLessThan(initialEase);
    expect(card.easeFactor).toBeGreaterThanOrEqual(1.3); // min ease
  });

  it("increases ease factor for easy answers (grade 5)", () => {
    let card = createCard("word-01");
    const initialEase = card.easeFactor;
    card = updateCard(card, 5); // easy
    card = updateCard(card, 5); // easy
    // ease factor stays at or above default
    expect(card.easeFactor).toBeGreaterThanOrEqual(initialEase);
  });

  it("marks card as not due after update with correct answer", () => {
    let card = createCard("word-01");
    card = updateCard(card, 4); // good
    // After update, nextReview is tomorrow or later → not due today
    expect(isDue(card)).toBe(false);
  });
});
