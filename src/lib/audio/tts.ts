/**
 * Text-to-Speech utility using the Web Speech API.
 * Falls back silently when the API is unavailable.
 */

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  lang?: string;
}

const DEFAULT_OPTIONS: TTSOptions = {
  rate: 0.9,
  pitch: 1.1,
  lang: "en-US",
};

export function isTTSSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, options?: TTSOptions): void {
  if (!isTTSSupported()) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  const opts = { ...DEFAULT_OPTIONS, ...options };

  utter.rate = opts.rate ?? 0.9;
  utter.pitch = opts.pitch ?? 1.1;
  utter.lang = opts.lang ?? "en-US";

  // Try to use an English voice if available
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(
    (v) => v.lang.startsWith("en") && !v.name.includes("Google")
  ) ?? voices.find((v) => v.lang.startsWith("en"));

  if (enVoice) {
    utter.voice = enVoice;
  }

  window.speechSynthesis.speak(utter);
}

export function stopSpeaking(): void {
  if (isTTSSupported()) {
    window.speechSynthesis.cancel();
  }
}

/** Returns a promise that resolves when speech ends */
export function speakAsync(text: string, options?: TTSOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isTTSSupported()) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    const opts = { ...DEFAULT_OPTIONS, ...options };

    utter.rate = opts.rate ?? 0.9;
    utter.pitch = opts.pitch ?? 1.1;
    utter.lang = opts.lang ?? "en-US";

    utter.onend = () => resolve();
    utter.onerror = (e) => reject(e);

    window.speechSynthesis.speak(utter);
  });
}
