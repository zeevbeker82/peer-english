const SETTINGS_KEY = "peer_english_settings";

export type TextSize = "normal" | "large" | "xlarge";

export interface AppSettings {
  audioEnabled: boolean;
  silentMode: boolean; // No TTS playback
  sttEnabled: boolean; // Feature flag: speech-to-text
  speechRate: number; // 0.5–2.0
  speechPitch: number; // 0.5–2.0
  textSize: TextSize;
}

export const DEFAULT_SETTINGS: AppSettings = {
  audioEnabled: true,
  silentMode: false,
  sttEnabled: false,
  speechRate: 0.9,
  speechPitch: 1.1,
  textSize: "normal",
};

export function loadSettings(): AppSettings {
  if (typeof window === "undefined") return { ...DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as AppSettings) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export const TEXT_SIZE_CLASSES: Record<TextSize, string> = {
  normal: "text-base",
  large: "text-lg",
  xlarge: "text-xl",
};
