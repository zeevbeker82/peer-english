import { describe, it, expect } from "vitest";
import { VOCABULARY, getVocabById, getVocabByTopic } from "@/lib/content/vocabulary";

describe("Vocabulary seed", () => {
  it("has at least 100 vocabulary items", () => {
    expect(VOCABULARY.length).toBeGreaterThanOrEqual(100);
  });

  it("all items have required fields", () => {
    for (const item of VOCABULARY) {
      expect(item.id).toBeTruthy();
      expect(item.word).toBeTruthy();
      expect(item.translation_he).toBeTruthy();
      expect(item.example_sentence_en).toBeTruthy();
      expect(item.topic).toBeTruthy();
      expect(item.difficulty).toBe("A1");
    }
  });

  it("all IDs are unique", () => {
    const ids = VOCABULARY.map((v) => v.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("getVocabById returns correct item", () => {
    const item = getVocabById("school-01");
    expect(item).toBeDefined();
    expect(item?.word).toBe("school");
    expect(item?.translation_he).toBe("בית ספר");
  });

  it("getVocabById returns undefined for invalid id", () => {
    expect(getVocabById("nonexistent")).toBeUndefined();
  });

  it("getVocabByTopic returns only items for that topic", () => {
    const schoolWords = getVocabByTopic("school");
    expect(schoolWords.length).toBeGreaterThan(0);
    expect(schoolWords.every((v) => v.topic === "school")).toBe(true);
  });

  it("covers all required topics", () => {
    const topics = new Set(VOCABULARY.map((v) => v.topic));
    expect(topics.has("school")).toBe(true);
    expect(topics.has("family")).toBe(true);
    expect(topics.has("food")).toBe(true);
    expect(topics.has("animals")).toBe(true);
    expect(topics.has("colors")).toBe(true);
    expect(topics.has("home")).toBe(true);
    expect(topics.has("numbers")).toBe(true);
  });
});
