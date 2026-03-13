"use client";
import { useState } from "react";
import Link from "next/link";
import { useSettings } from "@/hooks/useSettings";
import { useProgress } from "@/hooks/useProgress";
import { useSRS } from "@/hooks/useSRS";
import { speak, isTTSSupported } from "@/lib/audio/tts";
import { clearAchievements } from "@/lib/storage/achievements";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { TextSize } from "@/lib/storage/settings";

const TEXT_SIZE_OPTIONS: { value: TextSize; label: string }[] = [
  { value: "normal", label: "רגיל" },
  { value: "large", label: "גדול" },
  { value: "xlarge", label: "גדול מאוד" },
];

export default function SettingsPage() {
  const { settings, update } = useSettings();
  const { reset: resetProgress } = useProgress();
  const { resetAll: resetSRS } = useSRS();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [testPlayed, setTestPlayed] = useState(false);

  const ttsSupported = isTTSSupported();

  const handleTestAudio = () => {
    speak("Hello! My name is Dan. I go to school.", {
      rate: settings.speechRate,
      pitch: settings.speechPitch,
    });
    setTestPlayed(true);
  };

  const handleReset = () => {
    resetProgress();
    resetSRS();
    clearAchievements();
    setShowResetConfirm(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-10" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-gray-500 hover:text-gray-700 text-xl p-1 rounded-lg" aria-label="חזרה">
          ←
        </Link>
        <h1 className="font-bold text-gray-800 text-xl flex-1">⚙️ הגדרות</h1>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">

        {/* Audio settings */}
        <Card>
          <h2 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            🔊 שמע והגייה
          </h2>

          <div className="space-y-4">
            {/* Enable audio */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-700">הפעלת שמע</p>
                <p className="text-xs text-gray-400">הקראת מילים ומשפטים</p>
              </div>
              <button
                onClick={() => update({ audioEnabled: !settings.audioEnabled })}
                className={`w-12 h-6 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  settings.audioEnabled ? "bg-blue-500" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={settings.audioEnabled}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${
                    settings.audioEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Silent mode */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-700">מצב שקט</p>
                <p className="text-xs text-gray-400">ללא הקראה אוטומטית</p>
              </div>
              <button
                onClick={() => update({ silentMode: !settings.silentMode })}
                className={`w-12 h-6 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  settings.silentMode ? "bg-orange-400" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={settings.silentMode}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${
                    settings.silentMode ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Speech rate */}
            <div>
              <div className="flex justify-between mb-1">
                <p className="font-semibold text-gray-700">מהירות קריאה</p>
                <span className="text-sm text-gray-500">{settings.speechRate.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={settings.speechRate}
                onChange={(e) => update({ speechRate: parseFloat(e.target.value) })}
                className="w-full accent-blue-500"
                aria-label="מהירות קריאה"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                <span>איטי</span>
                <span>מהיר</span>
              </div>
            </div>

            {/* Test audio */}
            {ttsSupported && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestAudio}
                disabled={!settings.audioEnabled || settings.silentMode}
              >
                {testPlayed ? "✓ נשמע?" : "▶ בדוק שמע"}
              </Button>
            )}

            {!ttsSupported && (
              <p className="text-sm text-orange-500 bg-orange-50 rounded-xl p-3">
                ⚠️ הדפדפן שלך אינו תומך בהקראה. נסה Chrome או Edge.
              </p>
            )}
          </div>
        </Card>

        {/* Display settings */}
        <Card>
          <h2 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            🔤 תצוגה
          </h2>
          <div>
            <p className="font-semibold text-gray-700 mb-2">גודל טקסט</p>
            <div className="flex gap-2">
              {TEXT_SIZE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update({ textSize: opt.value })}
                  className={`flex-1 py-2 rounded-xl font-bold text-sm border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    settings.textSize === opt.value
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white border-gray-200 text-gray-600 hover:border-blue-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Experimental: STT */}
        <Card>
          <h2 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            🎙️ תכונות ניסיוניות
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-700">זיהוי דיבור (STT)</p>
              <p className="text-xs text-gray-400">תרגול הגייה — בניסוי</p>
            </div>
            <button
              onClick={() => update({ sttEnabled: !settings.sttEnabled })}
              className={`w-12 h-6 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                settings.sttEnabled ? "bg-purple-500" : "bg-gray-200"
              }`}
              role="switch"
              aria-checked={settings.sttEnabled}
            >
              <span
                className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${
                  settings.sttEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </Card>

        {/* Privacy & data */}
        <Card>
          <h2 className="font-bold text-gray-800 text-lg mb-2 flex items-center gap-2">
            🔒 פרטיות ונתונים
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            כל הנתונים שמורים מקומית במכשיר שלך בלבד. אין איסוף מידע אישי.
          </p>

          {!showResetConfirm ? (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowResetConfirm(true)}
            >
              🗑️ איפוס כל הנתונים
            </Button>
          ) : (
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="font-bold text-red-700 mb-3">
                האם לאפס את כל ההתקדמות? לא ניתן לבטל!
              </p>
              <div className="flex gap-2">
                <Button variant="danger" size="sm" onClick={handleReset}>
                  כן, אפס הכל
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowResetConfirm(false)}>
                  ביטול
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* App info */}
        <div className="text-center text-xs text-gray-300 mt-4">
          <p>פאר לימוד אנגלית | כיתה ה' | A1 Level</p>
          <p>v0.1.0 — כל הנתונים מקומיים</p>
        </div>
      </div>
    </main>
  );
}
