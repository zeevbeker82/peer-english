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

// Cache voices at module level so they're ready by the time the user clicks
let cachedVoices: SpeechSynthesisVoice[] = [];

function initVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  cachedVoices = window.speechSynthesis.getVoices();
  if (cachedVoices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
    };
  }
}

// Run immediately when module loads (client-side only)
if (typeof window !== "undefined") {
  initVoices();
}

export function isTTSSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickEnglishVoice(): SpeechSynthesisVoice | undefined {
  const voices = cachedVoices.length > 0
    ? cachedVoices
    : (typeof window !== "undefined" ? window.speechSynthesis.getVoices() : []);
  return (
    voices.find((v) => v.lang.startsWith("en") && !v.name.includes("Google")) ??
    voices.find((v) => v.lang.startsWith("en"))
  );
}

function createUtterance(text: string, opts: Required<TTSOptions>): SpeechSynthesisUtterance {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = opts.rate;
  utter.pitch = opts.pitch;
  utter.lang = opts.lang;
  const voice = pickEnglishVoice();
  if (voice) utter.voice = voice;
  return utter;
}

export function speak(text: string, options?: TTSOptions): void {
  if (!isTTSSupported()) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const opts: Required<TTSOptions> = {
    rate: options?.rate ?? DEFAULT_OPTIONS.rate!,
    pitch: options?.pitch ?? DEFAULT_OPTIONS.pitch!,
    lang: options?.lang ?? DEFAULT_OPTIONS.lang!,
  };

  // If voices aren't cached yet, wait briefly then speak
  // (must stay close to user gesture to avoid autoplay block)
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }

  window.speechSynthesis.speak(createUtterance(text, opts));
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

    const opts: Required<TTSOptions> = {
      rate: options?.rate ?? DEFAULT_OPTIONS.rate!,
      pitch: options?.pitch ?? DEFAULT_OPTIONS.pitch!,
      lang: options?.lang ?? DEFAULT_OPTIONS.lang!,
    };

    if (cachedVoices.length === 0) {
      cachedVoices = window.speechSynthesis.getVoices();
    }

    const utter = createUtterance(text, opts);
    utter.onend = () => resolve();
    utter.onerror = (e) => reject(e);

    window.speechSynthesis.speak(utter);
  });
}
