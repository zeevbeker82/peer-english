import type { SRSCard } from "./algorithm";

const SRS_KEY = "peer_english_srs";

function readAll(): Record<string, SRSCard> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(SRS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, SRSCard>) : {};
  } catch {
    return {};
  }
}

function writeAll(cards: Record<string, SRSCard>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SRS_KEY, JSON.stringify(cards));
}

export function getCard(wordId: string): SRSCard | null {
  return readAll()[wordId] ?? null;
}

export function getAllCards(): SRSCard[] {
  return Object.values(readAll());
}

export function saveCard(card: SRSCard): void {
  const all = readAll();
  all[card.wordId] = card;
  writeAll(all);
}

export function deleteCard(wordId: string): void {
  const all = readAll();
  delete all[wordId];
  writeAll(all);
}

export function clearAllCards(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SRS_KEY);
}
