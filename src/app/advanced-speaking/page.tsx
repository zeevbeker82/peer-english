"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ADV_SPEAKING_ACTIVITIES,
  ADV_SPEAKING_CAT_META,
  ADV_SPEAKING_TOTAL,
  ADV_SPEAKING_ENCOURAGEMENTS,
  AdvSpeakingCat,
  AdvSpeakingActivity,
  getActivitiesByCat,
} from "@/lib/content/advanced-speaking";
import {
  getCompletedIds,
  getCompletedSpeakingCount,
  markCompleted,
} from "@/lib/storage/advanced-speaking";
import { speak, stopSpeaking } from "@/lib/audio/tts";
import { isSTTSupported, startListening } from "@/lib/audio/stt";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { useSettings } from "@/hooks/useSettings";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function randomEncouragement(): string {
  return ADV_SPEAKING_ENCOURAGEMENTS[
    Math.floor(Math.random() * ADV_SPEAKING_ENCOURAGEMENTS.length)
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Category section on home
// ─────────────────────────────────────────────────────────────────────────────

function CategorySection({
  cat,
  completedIds,
  onSelect,
}: {
  cat: AdvSpeakingCat;
  completedIds: Set<string>;
  onSelect: (a: AdvSpeakingActivity) => void;
}) {
  const meta = ADV_SPEAKING_CAT_META[cat];
  const activities = getActivitiesByCat(cat);
  const doneCount = activities.filter((a) => completedIds.has(a.id)).length;

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${meta.color} px-5 py-4 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl">{meta.icon}</span>
            <h3 className="font-extrabold text-lg mt-1">{meta.label_he}</h3>
            <p className="text-white/75 text-sm">{meta.desc_he}</p>
          </div>
          <div className="text-center bg-white/20 rounded-2xl px-3 py-2">
            <p className="text-2xl font-extrabold leading-none">{doneCount}</p>
            <p className="text-white/70 text-xs">/{activities.length}</p>
          </div>
        </div>
        <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.round((doneCount / activities.length) * 100)}%` }}
          />
        </div>
      </div>

      {/* Activity list */}
      <div className="divide-y divide-gray-50">
        {activities.map((act) => {
          const done = completedIds.has(act.id);
          return (
            <button
              key={act.id}
              onClick={() => onSelect(act)}
              className="w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <span className="text-2xl flex-shrink-0">{act.icon}</span>
              <div className="flex-1 min-w-0 text-right">
                <p className="font-bold text-gray-800 text-sm leading-tight truncate" dir="ltr">
                  {act.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{act.title_he}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-bold text-gray-400">+{act.xp} XP</span>
                <span className="text-lg">{done ? "✅" : "→"}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Conversation view
// ─────────────────────────────────────────────────────────────────────────────

function ConversationView({
  activity,
  onBack,
  onComplete,
}: {
  activity: AdvSpeakingActivity;
  onBack: () => void;
  onComplete: (xp: number) => void;
}) {
  const meta = ADV_SPEAKING_CAT_META[activity.cat];
  const { settings } = useSettings();
  const totalTurns = activity.turns.length;

  // ── State ──
  const [phase,         setPhase]         = useState<"intro" | "turns" | "done">("intro");
  const [currentTurn,   setCurrentTurn]   = useState(0);
  const [answers,       setAnswers]       = useState<string[]>(() => Array(totalTurns).fill(""));
  const [wyrChoice,     setWyrChoice]     = useState<"a" | "b" | null>(null);
  const [showPhrases,   setShowPhrases]   = useState(false);
  const [isTTSPlaying,  setIsTTSPlaying]  = useState(false);
  const [isListening,   setIsListening]   = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [showEnc,       setShowEnc]       = useState(false);

  // Timer for "describe" activities
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopListenRef = useRef<(() => void) | null>(null);

  // ── Auto-start timer on describe activities ──
  useEffect(() => {
    if (activity.cat === "describe" && phase === "turns" && currentTurn === 0) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activity.cat, phase, currentTurn]);

  // ── Auto-speak Buddy's intro ──
  useEffect(() => {
    if (phase === "intro") {
      speakBuddy(activity.intro);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Auto-speak current turn ──
  useEffect(() => {
    if (phase === "turns") {
      const turn = activity.turns[currentTurn];
      if (turn) speakBuddy(turn.buddy_says);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTurn, phase]);

  function speakBuddy(text: string) {
    if (!settings?.ttsEnabled) return;
    setIsTTSPlaying(true);
    speak(text, { rate: 0.85 });
    const words = text.split(" ").length;
    setTimeout(() => setIsTTSPlaying(false), Math.max(2000, words * 450));
  }

  function handleTTSButton() {
    if (isTTSPlaying) {
      stopSpeaking();
      setIsTTSPlaying(false);
    } else {
      const text = phase === "intro"
        ? activity.intro
        : activity.turns[currentTurn]?.buddy_says ?? "";
      speakBuddy(text);
    }
  }

  // ── STT ──
  function handleMic() {
    if (isListening) {
      stopListenRef.current?.();
      setIsListening(false);
      return;
    }
    if (!isSTTSupported()) return;
    setIsListening(true);
    const stop = startListening((result) => {
      setIsListening(false);
      if (result?.transcript) {
        setAnswers((prev) => {
          const next = [...prev];
          next[currentTurn] = (prev[currentTurn] ? prev[currentTurn] + " " : "") + result.transcript;
          return next;
        });
      }
    });
    stopListenRef.current = stop;
  }

  function handleNext() {
    // Show encouragement briefly
    const enc = randomEncouragement();
    setEncouragement(enc);
    setShowEnc(true);
    setTimeout(() => setShowEnc(false), 2000);

    if (currentTurn < totalTurns - 1) {
      setCurrentTurn((t) => t + 1);
      setShowPhrases(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setSeconds(0);
    } else {
      // All turns done
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase("done");
      onComplete(activity.xp);
    }
  }

  const turn = activity.turns[currentTurn];
  const currentAnswer = answers[currentTurn] ?? "";
  const canProceed = activity.cat === "wyr" && currentTurn === 0
    ? wyrChoice !== null
    : currentAnswer.trim().length > 0;

  // ── Timer colour ──
  const timerColor = seconds >= 45
    ? "text-emerald-600 bg-emerald-50"
    : seconds >= 20
    ? "text-amber-600 bg-amber-50"
    : "text-blue-600 bg-blue-50";

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white pb-20" dir="rtl">

      {/* ── Header ── */}
      <div className={`bg-gradient-to-r ${meta.color} px-4 py-4 text-white shadow-lg`}>
        <div className="max-w-lg mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-white/80 text-sm hover:text-white mb-3 transition-colors"
          >
            ← חזרה
          </button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{activity.icon}</span>
            <div className="flex-1">
              <h2 className="font-extrabold text-lg leading-tight" dir="ltr">{activity.title}</h2>
              <p className="text-white/75 text-sm">{activity.title_he}</p>
            </div>
            <div className="bg-white/20 rounded-xl px-3 py-1.5 text-center flex-shrink-0">
              <p className="text-xs text-white/75 font-bold">+{activity.xp} XP</p>
            </div>
          </div>

          {/* Turn progress (only in turns phase) */}
          {phase === "turns" && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>שיחה</span>
                <span>שאלה {currentTurn + 1} מתוך {totalTurns}</span>
              </div>
              <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(((currentTurn) / totalTurns) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">

        {/* ═══════════ INTRO PHASE ═══════════ */}
        {phase === "intro" && (
          <>
            {/* Buddy bubble */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
                🤖
              </div>
              <div className="flex-1 bg-white rounded-3xl rounded-tl-none shadow-md border border-indigo-100 px-5 py-4">
                <p className="text-gray-800 text-sm leading-relaxed" dir="ltr">
                  {activity.intro}
                </p>
                <button
                  onClick={handleTTSButton}
                  className="mt-3 flex items-center gap-2 text-indigo-500 text-xs font-bold hover:text-indigo-700 transition-colors"
                >
                  <span>{isTTSPlaying ? "⏹ עצור" : "🔊 שמע את בבדי"}</span>
                </button>
              </div>
            </div>

            {/* WYR intro — show both options */}
            {activity.cat === "wyr" && activity.wyr_a && activity.wyr_b && (
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200 p-4">
                <p className="text-purple-700 font-extrabold text-sm text-center mb-3">הבחירה שלך:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-2xl border-2 border-purple-300 px-3 py-3 text-center" dir="ltr">
                    <p className="font-extrabold text-purple-700 text-sm">{activity.wyr_a}</p>
                  </div>
                  <div className="bg-white rounded-2xl border-2 border-purple-300 px-3 py-3 text-center" dir="ltr">
                    <p className="font-extrabold text-purple-700 text-sm">{activity.wyr_b}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setPhase("turns")}
              className={`w-full py-4 rounded-2xl font-extrabold text-lg text-white bg-gradient-to-r ${meta.color} shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all`}
            >
              🚀 התחל שיחה!
            </button>
          </>
        )}

        {/* ═══════════ TURNS PHASE ═══════════ */}
        {phase === "turns" && turn && (
          <>
            {/* Transcript: previous answers */}
            {currentTurn > 0 && (
              <div className="space-y-2">
                {answers.slice(0, currentTurn).map((ans, i) => (
                  ans.trim() ? (
                    <div key={i} className="bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold mb-1">שאלה {i + 1}:</p>
                      <p className="text-gray-700 text-xs italic" dir="ltr">{ans.length > 120 ? ans.slice(0, 120) + "…" : ans}</p>
                    </div>
                  ) : null
                ))}
              </div>
            )}

            {/* Buddy bubble */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
                🤖
              </div>
              <div className="flex-1 bg-white rounded-3xl rounded-tl-none shadow-md border border-indigo-100 px-5 py-4">
                <p className="text-gray-800 text-sm leading-relaxed font-medium" dir="ltr">
                  {turn.buddy_says}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={handleTTSButton}
                    className="flex items-center gap-1.5 text-indigo-500 text-xs font-bold hover:text-indigo-700 transition-colors"
                  >
                    <span>{isTTSPlaying ? "⏹ עצור" : "🔊 שמע"}</span>
                  </button>
                  {activity.cat === "describe" && (
                    <span className={`ml-auto text-xs font-extrabold px-3 py-1 rounded-full ${timerColor}`}>
                      ⏱ {seconds}s {seconds >= 45 ? "✅" : `/ 45s`}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Hebrew hint */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
              <p className="text-amber-800 text-sm font-bold">{turn.user_hint_he}</p>
              <p className="text-amber-600 text-xs mt-1">{turn.buddy_he}</p>
            </div>

            {/* WYR special: two choice buttons (turn 0 only) */}
            {activity.cat === "wyr" && currentTurn === 0 && activity.wyr_a && activity.wyr_b ? (
              <div className="space-y-3">
                <p className="text-gray-600 text-sm font-bold text-center">בחר אחת:</p>
                <div className="grid grid-cols-2 gap-3">
                  {(["a", "b"] as const).map((key) => {
                    const label = key === "a" ? activity.wyr_a! : activity.wyr_b!;
                    const chosen = wyrChoice === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setWyrChoice(key);
                          setAnswers((prev) => {
                            const next = [...prev];
                            next[0] = `I would rather ${label} because...`;
                            return next;
                          });
                        }}
                        className={`py-5 rounded-2xl border-2 font-extrabold text-sm transition-all ${
                          chosen
                            ? "border-purple-500 bg-purple-100 text-purple-800 scale-105 shadow-md"
                            : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                        }`}
                        dir="ltr"
                      >
                        {label}
                        {chosen && <span className="block text-xl mt-1">✅</span>}
                      </button>
                    );
                  })}
                </div>
                {wyrChoice && (
                  <div className="bg-purple-50 border border-purple-200 rounded-2xl px-4 py-3">
                    <p className="text-purple-700 text-sm font-bold">
                      עכשיו הסבר למה בחרת! דבר באנגלית 👇
                    </p>
                  </div>
                )}
              </div>
            ) : null}

            {/* Text area (always shown except on WYR turn 0 before choice) */}
            {!(activity.cat === "wyr" && currentTurn === 0) || wyrChoice !== null ? (
              <textarea
                value={currentAnswer}
                onChange={(e) =>
                  setAnswers((prev) => {
                    const next = [...prev];
                    next[currentTurn] = e.target.value;
                    return next;
                  })
                }
                placeholder={
                  activity.cat === "wyr" && currentTurn === 0
                    ? `I would rather ${wyrChoice === "a" ? activity.wyr_a : activity.wyr_b} because...`
                    : "Type or speak your answer here..."
                }
                dir="ltr"
                rows={4}
                className="w-full border-2 border-gray-200 rounded-2xl p-4 text-gray-800 text-sm leading-relaxed resize-none focus:outline-none focus:border-indigo-400 transition-colors font-mono"
              />
            ) : null}

            {/* Helpful phrases */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowPhrases((p) => !p)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-700 text-sm">💡 ביטויים שיעזרו לך</span>
                <span className="text-gray-400 text-sm">{showPhrases ? "▲" : "▼"}</span>
              </button>
              {showPhrases && (
                <div className="border-t border-gray-100 divide-y divide-gray-50">
                  {turn.phrases.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5" dir="ltr">
                      <span className="text-indigo-400 text-xs font-bold w-4 flex-shrink-0">{i + 1}.</span>
                      <span
                        className="text-gray-700 text-sm font-mono cursor-pointer hover:text-indigo-600 transition-colors"
                        onClick={() =>
                          setAnswers((prev) => {
                            const next = [...prev];
                            next[currentTurn] = (prev[currentTurn] ? prev[currentTurn] + " " : "") + p;
                            return next;
                          })
                        }
                        title="לחץ להוסיף לתשובה"
                      >
                        {p}
                      </span>
                    </div>
                  ))}
                  <p className="text-center text-xs text-gray-400 py-2">לחץ על ביטוי להוסיף לתשובה</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              {isSTTSupported() && (
                <button
                  onClick={handleMic}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                    isListening
                      ? "bg-red-50 border-red-400 text-red-600 animate-pulse"
                      : "bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
                  }`}
                >
                  <span>{isListening ? "⏹ עצור" : "🎤 דבר"}</span>
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex-1 py-3 rounded-2xl font-extrabold text-base transition-all shadow-md ${
                  canProceed
                    ? `bg-gradient-to-r ${meta.color} text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.99]`
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {currentTurn < totalTurns - 1 ? "הבא ←" : `סיים וקבל +${activity.xp} XP 🎉`}
              </button>
            </div>
          </>
        )}

        {/* ═══════════ DONE PHASE ═══════════ */}
        {phase === "done" && (
          <div className="text-center space-y-4 py-4">
            <div className={`bg-gradient-to-br ${meta.color} rounded-3xl px-6 py-8 text-white shadow-xl`}>
              <p className="text-6xl mb-3">🎉</p>
              <h3 className="font-extrabold text-2xl">שיחה הושלמה!</h3>
              <p className="text-white/80 text-sm mt-1">{activity.title_he}</p>
              <div className="mt-4 bg-white/20 rounded-2xl px-4 py-3">
                <p className="text-4xl font-extrabold">+{activity.xp} XP</p>
                <p className="text-white/75 text-sm mt-1">הרווחת!</p>
              </div>
            </div>

            {/* Transcript */}
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden text-right">
              <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100">
                <p className="font-extrabold text-indigo-800 text-sm">📜 תמליל השיחה</p>
              </div>
              <div className="divide-y divide-gray-50">
                {activity.turns.map((t, i) => (
                  <div key={i} className="px-4 py-3">
                    <p className="text-xs text-gray-400 font-bold mb-1" dir="ltr">🤖 {t.buddy_says.slice(0, 60)}...</p>
                    {answers[i] && (
                      <p className="text-gray-700 text-sm italic border-r-4 border-indigo-300 pr-3 mt-1" dir="ltr">
                        "{answers[i]}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Outro */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 py-4">
              <p className="text-amber-800 font-bold text-sm" dir="ltr">🤖 {activity.outro}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onBack}
                className="py-3 rounded-2xl border-2 border-gray-200 font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                ← חזרה
              </button>
              <button
                onClick={() => {
                  setPhase("intro");
                  setCurrentTurn(0);
                  setAnswers(Array(totalTurns).fill(""));
                  setWyrChoice(null);
                  setSeconds(0);
                }}
                className={`py-3 rounded-2xl font-extrabold text-white bg-gradient-to-r ${meta.color} shadow-md hover:shadow-lg transition-all`}
              >
                🔄 שוב
              </button>
            </div>
          </div>
        )}

        {/* ── Encouragement toast ── */}
        {showEnc && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-base z-50 animate-bounce">
            {encouragement}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home view
// ─────────────────────────────────────────────────────────────────────────────

const CATS: AdvSpeakingCat[] = ["opinion", "wyr", "describe"];

function HomeView({
  completedIds,
  onSelect,
}: {
  completedIds: Set<string>;
  onSelect: (a: AdvSpeakingActivity) => void;
}) {
  const totalDone = [...completedIds].filter((id) =>
    ADV_SPEAKING_ACTIVITIES.some((a) => a.id === id)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white pb-20" dir="rtl">

      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-5 text-white shadow-lg">
        <div className="max-w-lg mx-auto">
          <Link href="/" className="text-white/70 text-sm hover:text-white flex items-center gap-1 mb-3 transition-colors">
            ← דף הבית
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-5xl">🎙️</span>
            <div>
              <h1 className="font-extrabold text-2xl">דיבור מתקדם</h1>
              <p className="text-white/75 text-sm">20 שיחות — דעות, בחירות ותיאורים</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 bg-white/15 rounded-2xl px-4 py-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold">התקדמות כוללת</span>
              <span className="text-sm font-bold">{totalDone}/{ADV_SPEAKING_TOTAL} שיחות</span>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-3 rounded-full transition-all duration-700"
                style={{ width: `${Math.round((totalDone / ADV_SPEAKING_TOTAL) * 100)}%` }}
              />
            </div>
            <p className="text-white/65 text-xs mt-1.5">
              {totalDone === 0
                ? "בחר פעילות כדי להתחיל לדבר!"
                : totalDone === ADV_SPEAKING_TOTAL
                ? "🏆 השלמת את כל השיחות!"
                : `עוד ${ADV_SPEAKING_TOTAL - totalDone} שיחות להשלמה`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">

        {/* XP guide */}
        <div className="flex gap-2">
          {[
            { icon: "💬", label: "דעה", xp: "25 XP", bg: "bg-blue-50 border-blue-200 text-blue-700" },
            { icon: "🤔", label: "WYR",  xp: "20 XP", bg: "bg-purple-50 border-purple-200 text-purple-700" },
            { icon: "🗣️", label: "תיאור", xp: "30 XP", bg: "bg-teal-50 border-teal-200 text-teal-700" },
          ].map((t) => (
            <div key={t.label} className={`flex-1 rounded-2xl border px-2 py-3 text-center ${t.bg}`}>
              <p className="text-xl">{t.icon}</p>
              <p className="font-extrabold text-xs mt-1">{t.label}</p>
              <p className="font-bold text-xs mt-0.5">{t.xp}</p>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-4 py-3">
          <p className="text-indigo-800 font-extrabold text-sm mb-1.5">💡 טיפים לדיבור מוצלח</p>
          <ul className="text-indigo-700 text-xs space-y-1">
            <li>• דבר באנגלית בקול רם — אפילו לעצמך!</li>
            <li>• השתמש בביטויים המוצעים בכל שאלה</li>
            <li>• בתיאורים — נסה לדבר 45 שניות לפחות</li>
            <li>• אין תשובה שגויה — הדעה שלך חשובה!</li>
          </ul>
        </div>

        {/* Categories */}
        {CATS.map((cat) => (
          <CategorySection
            key={cat}
            cat={cat}
            completedIds={completedIds}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

export default function AdvancedSpeakingPage() {
  const { addPoints } = useProgress();
  const { checkAndUnlock } = useAchievements();

  const [phase,        setPhase]        = useState<"home" | "conversation">("home");
  const [activity,     setActivity]     = useState<AdvSpeakingActivity | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompletedIds(getCompletedIds());
  }, []);

  function handleSelect(act: AdvSpeakingActivity) {
    setActivity(act);
    setPhase("conversation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setPhase("home");
    setActivity(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleComplete(xp: number) {
    if (!activity) return;
    markCompleted(activity.id, activity.turns.length, xp);
    addPoints(xp, { speakingDone: 1 });
    checkAndUnlock();
    setCompletedIds((prev) => new Set([...prev, activity.id]));
  }

  if (phase === "conversation" && activity) {
    return (
      <ConversationView
        activity={activity}
        onBack={handleBack}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <HomeView
      completedIds={completedIds}
      onSelect={handleSelect}
    />
  );
}
