"use client";
import { useCallback } from "react";
import { speak, stopSpeaking, isTTSSupported } from "@/lib/audio/tts";
import type { AppSettings } from "@/lib/storage/settings";

export function useAudio(settings: AppSettings) {
  const canSpeak = isTTSSupported() && settings.audioEnabled && !settings.silentMode;

  const sayWord = useCallback(
    (text: string) => {
      if (!canSpeak) return;
      speak(text, {
        rate: settings.speechRate,
        pitch: settings.speechPitch,
      });
    },
    [canSpeak, settings.speechRate, settings.speechPitch]
  );

  const stop = useCallback(() => stopSpeaking(), []);

  return { sayWord, stop, canSpeak };
}
