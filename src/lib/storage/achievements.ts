/** Persist unlocked achievement IDs in localStorage */

const KEY = "peer_english_achievements";

export function getUnlockedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveUnlockedIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // ignore storage errors
  }
}

export function addUnlockedIds(newIds: string[]): void {
  const existing = getUnlockedIds();
  const merged = Array.from(new Set([...existing, ...newIds]));
  saveUnlockedIds(merged);
}

export function clearAchievements(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
