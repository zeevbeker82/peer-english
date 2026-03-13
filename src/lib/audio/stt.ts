/**
 * Speech-to-Text utility using the Web Speech API.
 * This is BEHIND A FEATURE FLAG (sttEnabled in settings).
 * Only loaded/used when explicitly enabled by the user.
 */

export interface STTResult {
  transcript: string;
  confidence: number;
}

export function isSTTSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
}

type STTCallback = (result: STTResult | null, error?: string) => void;

export function startListening(onResult: STTCallback, lang = "en-US"): (() => void) | null {
  if (!isSTTSupported()) {
    onResult(null, "Speech recognition is not supported in this browser.");
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SpeechRecognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const result = event.results[0][0];
    onResult({ transcript: result.transcript, confidence: result.confidence });
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    onResult(null, `שגיאה: ${event.error}`);
  };

  recognition.start();

  // Return a stop function
  return () => recognition.stop();
}
