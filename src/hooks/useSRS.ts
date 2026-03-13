"use client";
import { useState, useEffect, useCallback } from "react";
import {
  createCard,
  updateCard,
  getDueCards,
  qualityToGrade,
  type SRSCard,
} from "@/lib/srs/algorithm";
import {
  getAllCards,
  saveCard,
  clearAllCards,
} from "@/lib/srs/storage";
import { VOCABULARY } from "@/lib/content/vocabulary";

export function useSRS() {
  const [cards, setCards] = useState<SRSCard[]>([]);

  useEffect(() => {
    const stored = getAllCards();
    // Ensure every vocab word has a card
    const storedIds = new Set(stored.map((c) => c.wordId));
    const newCards: SRSCard[] = [];

    for (const vocab of VOCABULARY) {
      if (!storedIds.has(vocab.id)) {
        newCards.push(createCard(vocab.id));
      }
    }

    if (newCards.length > 0) {
      newCards.forEach(saveCard);
    }

    setCards([...stored, ...newCards]);
  }, []);

  const dueCards = getDueCards(cards);

  const reviewCard = useCallback(
    (wordId: string, quality: "wrong" | "hard" | "good" | "easy") => {
      const card = cards.find((c) => c.wordId === wordId);
      if (!card) return;

      const grade = qualityToGrade(quality);
      const updated = updateCard(card, grade);
      saveCard(updated);
      setCards((prev) =>
        prev.map((c) => (c.wordId === wordId ? updated : c))
      );
    },
    [cards]
  );

  const resetAll = useCallback(() => {
    clearAllCards();
    const fresh = VOCABULARY.map((v) => createCard(v.id));
    fresh.forEach(saveCard);
    setCards(fresh);
  }, []);

  return {
    cards,
    dueCards,
    dueCount: dueCards.length,
    reviewCard,
    resetAll,
  };
}
