/**
 * localStorage persistence for the Pronunciation training module.
 */

const STORAGE_KEY = "pron_progress";

interface PronProgress {
  shadowDone: string[];   // IDs of completed shadow sentences
  twistersDone: string[]; // IDs of completed tongue twisters
  minimalDone: string[];  // IDs of completed minimal pairs
  totalXP: number;
}

const DEFAULT_PROGRESS: PronProgress = {
  shadowDone: [],
  twistersDone: [],
  minimalDone: [],
  totalXP: 0,
};

export function getPronProgress(): PronProgress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<PronProgress>;
    return {
      shadowDone: parsed.shadowDone ?? [],
      twistersDone: parsed.twistersDone ?? [],
      minimalDone: parsed.minimalDone ?? [],
      totalXP: parsed.totalXP ?? 0,
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function savePronProgress(p: PronProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // Storage unavailable — silently ignore
  }
}

export function markShadowDone(id: string, xp: number): void {
  const p = getPronProgress();
  if (!p.shadowDone.includes(id)) {
    p.shadowDone.push(id);
    p.totalXP += xp;
    savePronProgress(p);
  }
}

export function markTwisterDone(id: string, xp: number): void {
  const p = getPronProgress();
  if (!p.twistersDone.includes(id)) {
    p.twistersDone.push(id);
    p.totalXP += xp;
    savePronProgress(p);
  }
}

export function markMinimalDone(id: string, xp: number): void {
  const p = getPronProgress();
  if (!p.minimalDone.includes(id)) {
    p.minimalDone.push(id);
    p.totalXP += xp;
    savePronProgress(p);
  }
}

export function getPronStats(): {
  shadowCount: number;
  twisterCount: number;
  minimalCount: number;
  totalXP: number;
} {
  const p = getPronProgress();
  return {
    shadowCount: p.shadowDone.length,
    twisterCount: p.twistersDone.length,
    minimalCount: p.minimalDone.length,
    totalXP: p.totalXP,
  };
}
