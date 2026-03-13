"use client";
import { useState, useEffect, useCallback } from "react";
import {
  loadSettings,
  saveSettings,
  type AppSettings,
  DEFAULT_SETTINGS,
} from "@/lib/storage/settings";

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setLoaded(true);
  }, []);

  const update = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  }, []);

  return { settings, update, loaded };
}
