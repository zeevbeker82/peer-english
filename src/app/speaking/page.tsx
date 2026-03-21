"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import {
  DAILY_EXPRESSIONS, DAILY_EXPRESSIONS_2,
  DIALOGUES, DIALOGUES_2,
  QA_QUESTIONS, QA_QUESTIONS_2,
  ROLE_PLAYS, ROLE_PLAYS_2,
  SPEAKING_XP,
  type SpeakingExpression, type InteractiveDialogue, type QAQuestion, type RolePlay,
} from "@/lib/content/speaking";
import {
  BUDDY_TOPICS, BUDDY_ENCOURAGEMENTS, BUDDY_XP,
} from "@/lib/content/buddy";
import { speak, speakAsync, stopSpeaking } from "@/lib/audio/tts";
import { isSTTSupported, startListening } from "@/lib/audio/stt";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { useSettings } from "@/hooks/useSettings";
import { useAudio } from "@/hooks/useAudio";
import { Confetti } from "@/components/ui/Confetti";
import { AchievementPopup } from "@/components/ui/AchievementPopup";

const ALL_EXPRESSIONS: SpeakingExpression[] = [...DAILY_EXPRESSIONS, ...DAILY_EXPRESSIONS_2];
const ALL_DIALOGUES: InteractiveDialogue[] = [...DIALOGUES, ...DIALOGUES_2];
const ALL_QA: QAQuestion[] = [...QA_QUESTIONS, ...QA_QUESTIONS_2];
const ALL_ROLE_PLAYS: RolePlay[] = [...ROLE_PLAYS, ...ROLE_PLAYS_2];

// ─── Types ────────────────────────────────────────────────────────────────────
type Stage = "home" | "expressions" | "dialogues" | "qa" | "roleplay" | "buddy";

// ─── Home screen ──────────────────────────────────────────────────────────────
function HomeView({ onSelect }: { onSelect: (s: Stage) => void }) {
  const modules = [
    {
      id: "expressions" as Stage,
      title_he: "ביטויים יומיומיים",
      subtitle_he: "45 ביטויים חיוניים",
      icon: "💬",
      color: "from-blue-400 to-blue-600",
      xp: "5 נק' לביטוי",
    },
    {
      id: "dialogues" as Stage,
      title_he: "דיאלוגים אינטראקטיביים",
      subtitle_he: "13 שיחות אמיתיות",
      icon: "🗣️",
      color: "from-purple-400 to-violet-600",
      xp: "20 נק' לדיאלוג",
    },
    {
      id: "qa" as Stage,
      title_he: "שאלות ותשובות",
      subtitle_he: "25 שאלות לתרגול",
      icon: "🙋",
      color: "from-orange-400 to-amber-500",
      xp: "10 נק' לשאלה",
    },
    {
      id: "roleplay" as Stage,
      title_he: "משחק תפקידים",
      subtitle_he: "4 תרחישים מהחיים",
      icon: "🎭",
      color: "from-green-400 to-teal-600",
      xp: "30 נק' לתרחיש",
    },
    {
      id: "buddy" as Stage,
      title_he: "שיחה עם Buddy",
      subtitle_he: "10 נושאי שיחה חופשית",
      icon: "🤖",
      color: "from-fuchsia-500 to-pink-600",
      xp: "15 נק' לנושא",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-white pb-24" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/" className="text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100">
          ←
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-sky-700 flex items-center gap-2">
            🎤 אנגלית מדוברת
          </h1>
          <p className="text-xs text-gray-400">Speaking Practice</p>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-5">
        {/* Hero */}
        <div className="bg-gradient-to-l from-sky-500 to-blue-600 rounded-3xl p-5 text-white mb-6 shadow-lg">
          <p className="font-extrabold text-xl mb-1">🎤 תרגל אנגלית מדוברת!</p>
          <p className="text-white/80 text-sm">
            ביטויים יומיומיים • דיאלוגים • שאלות • משחק תפקידים
          </p>
        </div>

        {/* Tip */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 mb-5 text-sm text-blue-800">
          <p className="font-bold">💡 טיפ:</p>
          <p>לחץ על 🔊 לשמוע את ההגייה הנכונה, ונסה לחזור על הביטוי בקול!</p>
        </div>

        {/* Modules */}
        <div className="grid grid-cols-1 gap-4">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onSelect(mod.id)}
              className={`bg-gradient-to-l ${mod.color} text-white rounded-3xl p-5 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-right focus:outline-none focus:ring-4 focus:ring-white/50`}
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">{mod.icon}</span>
                <div className="flex-1">
                  <p className="font-extrabold text-xl">{mod.title_he}</p>
                  <p className="text-white/80 text-sm mt-0.5">{mod.subtitle_he}</p>
                </div>
                <div className="bg-white/20 rounded-2xl px-3 py-2 text-center whitespace-nowrap">
                  <p className="font-extrabold text-sm">⭐ {mod.xp}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

// ─── Daily Expressions ────────────────────────────────────────────────────────
function ExpressionsView({
  onBack,
  onXP,
}: {
  onBack: () => void;
  onXP: (pts: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [showExample, setShowExample] = useState(false);
  const [done, setDone] = useState<Set<string>>(new Set());
  const { settings } = useSettings();
  const { sayWord, canSpeak } = useAudio(settings);

  const expr = ALL_EXPRESSIONS[idx];
  const total = ALL_EXPRESSIONS.length;
  const categoryColors: Record<string, string> = {
    greetings: "bg-blue-100 text-blue-700",
    reactions: "bg-purple-100 text-purple-700",
    requests: "bg-orange-100 text-orange-700",
    feelings: "bg-pink-100 text-pink-700",
    daily: "bg-green-100 text-green-700",
  };
  const categoryLabels: Record<string, string> = {
    greetings: "ברכות",
    reactions: "תגובות",
    requests: "בקשות",
    feelings: "רגשות",
    daily: "יומיומי",
  };

  const handleGotIt = () => {
    if (!done.has(expr.id)) {
      setDone((prev) => new Set([...prev, expr.id]));
      onXP(SPEAKING_XP.expression);
    }
    setShowExample(false);
    if (idx + 1 < total) {
      setIdx((i) => i + 1);
    } else {
      setIdx(0); // loop
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="text-2xl p-1 rounded-full hover:bg-gray-100">←</button>
        <div className="flex-1">
          <p className="font-bold text-gray-800 text-sm">💬 ביטויים יומיומיים</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all"
                style={{ width: `${((idx + 1) / total) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{idx + 1}/{total}</span>
          </div>
        </div>
        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          ✅ {done.size} מוכן
        </span>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-5">
        {/* Category badge */}
        <div className="flex justify-center">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[expr.category] ?? "bg-gray-100 text-gray-600"}`}>
            {categoryLabels[expr.category] ?? expr.category}
          </span>
        </div>

        {/* Main expression card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-3xl font-extrabold text-gray-800" dir="ltr">{expr.expression_en}</p>
            {canSpeak && (
              <button
                onClick={() => sayWord(expr.expression_en)}
                className="text-3xl hover:scale-125 transition-transform active:scale-95"
                title="שמע הגייה"
              >
                🔊
              </button>
            )}
          </div>
          <p className="text-xl text-blue-700 font-bold mb-3">{expr.translation_he}</p>
          <p className="text-gray-500 text-sm">{expr.context_he}</p>
        </div>

        {/* Example toggle */}
        <button
          onClick={() => setShowExample((v) => !v)}
          className="w-full bg-blue-50 border-2 border-blue-200 rounded-2xl py-3 font-bold text-blue-700 text-sm hover:bg-blue-100 transition-colors"
        >
          {showExample ? "🔼 הסתר דוגמה" : "👁️ ראה דוגמה במשפט"}
        </button>

        {showExample && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <p className="text-xs text-gray-400 mb-1 font-medium">דוגמה:</p>
            <div className="flex items-start gap-2">
              <p className="text-gray-800 font-medium text-lg" dir="ltr">"{expr.example_en}"</p>
              {canSpeak && (
                <button
                  onClick={() => sayWord(expr.example_en)}
                  className="text-xl hover:scale-125 transition-transform flex-shrink-0"
                >
                  🔊
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tip */}
        <div className="bg-blue-50 rounded-2xl p-3 text-sm text-blue-700">
          <p className="font-bold mb-1">🎤 תרגל:</p>
          <p>אמור את הביטוי בקול 3 פעמים. {canSpeak ? "לחץ 🔊 לשמוע הגייה נכונה!" : ""}</p>
        </div>

        {/* Got it button */}
        <button
          onClick={handleGotIt}
          className="w-full bg-gradient-to-l from-blue-500 to-sky-500 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
        >
          {done.has(expr.id) ? "⏭️ הבא" : "✅ הבנתי! (+5 נק')"}
        </button>

        {done.size === total && (
          <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-4 text-center">
            <p className="text-2xl mb-1">🎉</p>
            <p className="font-extrabold text-green-700">למדת את כל 30 הביטויים!</p>
          </div>
        )}
      </div>
    </main>
  );
}

// ─── Interactive Dialogues ────────────────────────────────────────────────────
function DialoguesView({
  onBack,
  onXP,
}: {
  onBack: () => void;
  onXP: (pts: number) => void;
}) {
  const [dialIdx, setDialIdx] = useState(0);
  const [stage, setStage] = useState<"list" | "dialogue" | "complete">("list");
  const [turnIdx, setTurnIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [errors, setErrors] = useState(0);
  const { settings } = useSettings();
  const { sayWord, canSpeak } = useAudio(settings);

  const dialogue = ALL_DIALOGUES[dialIdx];

  const handleChoiceSelect = (choiceIdx: number) => {
    if (showFeedback) return;
    setChosen(choiceIdx);
    setShowFeedback(true);
    const turn = dialogue.turns[turnIdx];
    const choice = turn.choices![choiceIdx];
    if (!choice.isCorrect) setErrors((e) => e + 1);
  };

  const handleNext = () => {
    const turn = dialogue.turns[turnIdx];
    const choice = turn.choices?.[chosen!];
    if (choice && !choice.isCorrect) {
      // Wrong — stay on same turn
      setChosen(null);
      setShowFeedback(false);
      return;
    }
    // Move to next player turn
    const nextTurnIdx = turnIdx + 1;
    if (nextTurnIdx >= dialogue.turns.length) {
      onXP(SPEAKING_XP.dialogue);
      setStage("complete");
    } else {
      setTurnIdx(nextTurnIdx);
      setChosen(null);
      setShowFeedback(false);
    }
  };

  if (stage === "list") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-24" dir="rtl">
        <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={onBack} className="text-2xl p-1 rounded-full hover:bg-gray-100">←</button>
          <div>
            <p className="font-bold text-gray-800 text-sm">🗣️ דיאלוגים אינטראקטיביים</p>
            <p className="text-xs text-gray-400">{ALL_DIALOGUES.length} דיאלוגים</p>
          </div>
        </nav>
        <div className="max-w-lg mx-auto px-4 pt-5 space-y-3">
          {ALL_DIALOGUES.map((d, i) => (
            <button
              key={d.id}
              onClick={() => {
                setDialIdx(i);
                setTurnIdx(0);
                setChosen(null);
                setShowFeedback(false);
                setErrors(0);
                setStage("dialogue");
              }}
              className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:border-purple-200 transition-all text-right"
            >
              <span className="text-4xl">{d.icon}</span>
              <div className="flex-1">
                <p className="font-extrabold text-gray-800 text-lg">{d.title_he}</p>
                <p className="text-gray-400 text-sm">{d.situation_he}</p>
              </div>
              <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">+20 ⭐</span>
            </button>
          ))}
        </div>
      </main>
    );
  }

  if (stage === "complete") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center px-4 py-10" dir="rtl">
        <div className="text-7xl mb-4">🎉</div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">כל הכבוד! סיימת את הדיאלוג!</h2>
        <p className="text-gray-500 mb-6">{dialogue.icon} {dialogue.title_he}</p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-6 py-4 text-center mb-6">
          <p className="text-2xl font-extrabold text-yellow-700">+20 נקודות! ⭐</p>
        </div>

        {/* Vocab tips learned */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 w-full max-w-sm mb-6">
          <p className="font-bold text-gray-700 mb-3">✅ למדת את הביטויים:</p>
          <div className="flex flex-wrap gap-2">
            {dialogue.vocab_tips.map((tip, i) => (
              <span key={i} className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full" dir="ltr">
                {tip}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={() => {
              setTurnIdx(0);
              setChosen(null);
              setShowFeedback(false);
              setErrors(0);
              setStage("dialogue");
            }}
            className="w-full bg-gradient-to-l from-purple-500 to-violet-600 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg"
          >
            🔄 תרגל שוב
          </button>
          <button
            onClick={() => setStage("list")}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 font-bold text-gray-700"
          >
            📋 כל הדיאלוגים
          </button>
        </div>
      </main>
    );
  }

  // Dialogue stage
  const currentTurn = dialogue.turns[turnIdx];
  const isPlayerTurn = currentTurn.speaker === "B";

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-24" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => setStage("list")} className="text-2xl p-1 rounded-full hover:bg-gray-100">←</button>
        <div className="flex-1">
          <p className="font-bold text-sm text-gray-800">{dialogue.icon} {dialogue.title_he}</p>
          <p className="text-xs text-gray-400">{dialogue.situation_he}</p>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-4">
        {/* Show all previous turns */}
        <div className="space-y-3">
          {dialogue.turns.slice(0, turnIdx + 1).map((turn, i) => {
            const isA = turn.speaker === "A";
            const isCurrentB = !isA && i === turnIdx;

            return (
              <div key={i} className={`flex ${isA ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] ${isA ? "bg-white border border-gray-200" : "bg-purple-500 text-white"} rounded-2xl p-4 shadow-sm`}>
                  {isA ? (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{dialogue.icon}</span>
                        <p className="font-medium text-gray-700 text-sm" dir="ltr">{turn.text_en}</p>
                        {canSpeak && (
                          <button onClick={() => sayWord(turn.text_en)} className="text-base hover:scale-125">🔊</button>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{turn.translation_he}</p>
                    </>
                  ) : isCurrentB ? (
                    <p className="text-white/80 font-bold text-center">👇 תבחר תשובה</p>
                  ) : (
                    <>
                      <p className="font-medium text-sm" dir="ltr">
                        {chosen !== null && i < turnIdx
                          ? turn.choices?.find((c) => c.isCorrect)?.text_en ?? ""
                          : ""}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Player choices */}
        {isPlayerTurn && (
          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-600 text-center">🎤 בחר את התשובה הנכונה:</p>
            {currentTurn.choices!.map((choice, i) => {
              let cls = "bg-white border-2 border-gray-200 text-gray-800 hover:border-purple-400 hover:bg-purple-50";
              if (showFeedback) {
                if (chosen === i) {
                  cls = choice.isCorrect
                    ? "bg-green-100 border-2 border-green-500 text-green-800"
                    : "bg-red-100 border-2 border-red-400 text-red-800";
                } else if (choice.isCorrect) {
                  cls = "bg-green-50 border-2 border-green-300 text-green-700";
                } else {
                  cls = "bg-gray-50 border-2 border-gray-100 text-gray-400";
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleChoiceSelect(i)}
                  disabled={showFeedback}
                  className={`${cls} w-full rounded-2xl p-4 text-right transition-all font-medium focus:outline-none disabled:cursor-default`}
                >
                  <p dir="ltr" className="font-bold">{choice.text_en}</p>
                  <p className="text-sm mt-0.5 opacity-70">{choice.translation_he}</p>
                </button>
              );
            })}

            {showFeedback && (
              <div className={`rounded-2xl p-4 border ${
                currentTurn.choices![chosen!]?.isCorrect
                  ? "bg-green-50 border-green-300"
                  : "bg-orange-50 border-orange-200"
              }`}>
                <p className="font-extrabold">
                  {currentTurn.choices![chosen!]?.isCorrect ? "✅ " : "❌ "}
                  {currentTurn.choices![chosen!]?.feedback_he}
                </p>
              </div>
            )}

            {showFeedback && (
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-l from-purple-500 to-violet-600 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg"
              >
                {currentTurn.choices![chosen!]?.isCorrect
                  ? (turnIdx + 1 >= dialogue.turns.length ? "🏆 סיום!" : "המשך →")
                  : "🔄 נסה שוב"}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

// ─── Q&A Practice ────────────────────────────────────────────────────────────
function QAView({
  onBack,
  onXP,
}: {
  onBack: () => void;
  onXP: (pts: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [done, setDone] = useState<Set<string>>(new Set());
  const { settings } = useSettings();
  const { sayWord, canSpeak } = useAudio(settings);

  const q = ALL_QA[idx];
  const total = ALL_QA.length;

  const handleDone = () => {
    if (!done.has(q.id)) {
      setDone((prev) => new Set([...prev, q.id]));
      onXP(SPEAKING_XP.qa);
    }
    setShowAnswers(false);
    if (idx + 1 < total) setIdx((i) => i + 1);
    else setIdx(0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="text-2xl p-1 rounded-full hover:bg-gray-100">←</button>
        <div className="flex-1">
          <p className="font-bold text-gray-800 text-sm">🙋 שאלות ותשובות</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
              <div className="bg-orange-500 h-1.5 rounded-full transition-all" style={{ width: `${((idx + 1) / total) * 100}%` }} />
            </div>
            <span className="text-xs text-gray-400">{idx + 1}/{total}</span>
          </div>
        </div>
        <span className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">✅ {done.size}</span>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-5">
        {/* Topic */}
        <div className="flex justify-center">
          <span className="bg-orange-100 text-orange-700 font-bold text-xs px-3 py-1 rounded-full">{q.topic_he}</span>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <p className="text-2xl font-extrabold text-gray-800" dir="ltr">{q.question_en}</p>
            {canSpeak && (
              <button onClick={() => sayWord(q.question_en)} className="text-2xl hover:scale-125 transition-transform">🔊</button>
            )}
          </div>
          <p className="text-orange-700 font-bold">{q.translation_he}</p>
        </div>

        {/* Vocabulary hints */}
        <div>
          <p className="text-sm font-bold text-gray-600 mb-2">💡 מילות עזר:</p>
          <div className="flex flex-wrap gap-2">
            {q.vocabulary_hints.map((hint, i) => (
              <span
                key={i}
                dir="ltr"
                className="bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium px-3 py-1.5 rounded-xl cursor-pointer hover:bg-orange-100"
                onClick={() => canSpeak && sayWord(hint)}
              >
                {hint} {canSpeak ? "🔊" : ""}
              </span>
            ))}
          </div>
        </div>

        {/* Think time */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
          <p className="font-bold text-blue-700 text-lg">🎤 ענה בקול על השאלה!</p>
          <p className="text-blue-600 text-sm mt-1">חשוב על תשובה, ואז לחץ לראות דוגמאות</p>
        </div>

        {/* Example answers */}
        <button
          onClick={() => setShowAnswers((v) => !v)}
          className="w-full bg-orange-50 border-2 border-orange-200 rounded-2xl py-3 font-bold text-orange-700 text-sm hover:bg-orange-100 transition-colors"
        >
          {showAnswers ? "🔼 הסתר דוגמאות" : "👁️ ראה תשובות לדוגמה"}
        </button>

        {showAnswers && (
          <div className="space-y-3">
            {q.example_answers.map((ans, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
                <span className="bg-orange-100 text-orange-700 font-extrabold text-sm rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800" dir="ltr">{ans}</p>
                </div>
                {canSpeak && (
                  <button onClick={() => sayWord(ans)} className="text-xl hover:scale-125 transition-transform flex-shrink-0">🔊</button>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleDone}
          className="w-full bg-gradient-to-l from-orange-500 to-amber-500 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
        >
          {done.has(q.id) ? "⏭️ שאלה הבאה" : "✅ ניסיתי! (+10 נק')"}
        </button>
      </div>
    </main>
  );
}

// ─── Role Play ────────────────────────────────────────────────────────────────
function RolePlayView({
  onBack,
  onXP,
}: {
  onBack: () => void;
  onXP: (pts: number) => void;
}) {
  const [rpIdx, setRpIdx] = useState(0);
  const [stage, setStage] = useState<"list" | "play" | "complete">("list");
  const [stepIdx, setStepIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { settings } = useSettings();
  const { sayWord, canSpeak } = useAudio(settings);

  const rp = ALL_ROLE_PLAYS[rpIdx];

  const handleChoice = (i: number) => {
    if (showFeedback) return;
    setChosen(i);
    setShowFeedback(true);
  };

  const handleNext = () => {
    const choice = rp.steps[stepIdx].player_choices[chosen!];
    if (!choice.isCorrect) {
      setChosen(null);
      setShowFeedback(false);
      return;
    }
    if (stepIdx + 1 >= rp.steps.length) {
      onXP(SPEAKING_XP.roleplay);
      setStage("complete");
    } else {
      setStepIdx((s) => s + 1);
      setChosen(null);
      setShowFeedback(false);
    }
  };

  if (stage === "list") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-24" dir="rtl">
        <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={onBack} className="text-2xl p-1 rounded-full hover:bg-gray-100">←</button>
          <div>
            <p className="font-bold text-sm text-gray-800">🎭 משחק תפקידים</p>
            <p className="text-xs text-gray-400">{ALL_ROLE_PLAYS.length} תרחישים</p>
          </div>
        </nav>
        <div className="max-w-lg mx-auto px-4 pt-5 space-y-3">
          {ALL_ROLE_PLAYS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => { setRpIdx(i); setStepIdx(0); setChosen(null); setShowFeedback(false); setStage("play"); }}
              className={`w-full bg-gradient-to-l ${r.color} text-white rounded-3xl p-5 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all text-right`}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{r.icon}</span>
                <div className="flex-1">
                  <p className="font-extrabold text-xl">{r.title_he}</p>
                  <p className="text-white/80 text-sm mt-0.5">{r.situation_he}</p>
                  <p className="text-white/60 text-xs mt-1">אתה: {r.player_role_he}</p>
                </div>
                <div className="bg-white/20 rounded-2xl px-3 py-2 text-center">
                  <p className="font-extrabold text-sm">+30 ⭐</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    );
  }

  if (stage === "complete") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-4 py-10" dir="rtl">
        <div className="text-7xl mb-4">🎭</div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">כל הכבוד! השלמת את משחק התפקידים!</h2>
        <p className="text-gray-500 mb-6">{rp.icon} {rp.title_he}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-6 py-4 text-center mb-6">
          <p className="text-2xl font-extrabold text-yellow-700">+30 נקודות! ⭐</p>
        </div>
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 w-full max-w-sm mb-6">
          <p className="font-bold text-gray-700 mb-3">✅ ביטויים ששלמדת:</p>
          <div className="flex flex-wrap gap-2">
            {rp.vocab_tips.map((tip, i) => (
              <span key={i} dir="ltr" className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">{tip}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button onClick={() => { setStepIdx(0); setChosen(null); setShowFeedback(false); setStage("play"); }} className="w-full bg-gradient-to-l from-green-500 to-teal-600 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg">🔄 תרגל שוב</button>
          <button onClick={() => setStage("list")} className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 font-bold text-gray-700">📋 כל התרחישים</button>
        </div>
      </main>
    );
  }

  const step = rp.steps[stepIdx];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-24" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => setStage("list")} className="text-2xl p-1 rounded-full hover:bg-gray-100">←</button>
        <div className="flex-1">
          <p className="font-bold text-sm text-gray-800">{rp.icon} {rp.title_he}</p>
          <p className="text-xs text-gray-400">שלב {stepIdx + 1} מתוך {rp.steps.length}</p>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-5">
        {/* Roles */}
        <div className="flex gap-2 justify-center">
          <span className="bg-blue-100 text-blue-700 font-bold text-xs px-3 py-1 rounded-full">👤 אתה: {rp.player_role_he}</span>
          <span className="bg-green-100 text-green-700 font-bold text-xs px-3 py-1 rounded-full">🤝 {rp.partner_role_he}</span>
        </div>

        {/* Situation */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-3 text-center">
          <p className="text-sm font-bold text-green-700">{step.situation_he}</p>
        </div>

        {/* Partner says */}
        <div className="flex justify-start">
          <div className="max-w-[80%] bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{rp.icon}</span>
              <p className="font-bold text-gray-700 text-sm" dir="ltr">{step.partner_says_en}</p>
              {canSpeak && (
                <button onClick={() => sayWord(step.partner_says_en)} className="text-base hover:scale-125">🔊</button>
              )}
            </div>
            <p className="text-xs text-gray-400">{step.partner_says_he}</p>
          </div>
        </div>

        {/* Player choices */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-gray-600 text-center">🎤 מה תגיד?</p>
          {step.player_choices.map((choice, i) => {
            let cls = "bg-white border-2 border-gray-200 text-gray-800 hover:border-green-400 hover:bg-green-50";
            if (showFeedback) {
              if (chosen === i) {
                cls = choice.isCorrect
                  ? "bg-green-100 border-2 border-green-500 text-green-800"
                  : "bg-red-100 border-2 border-red-400 text-red-800";
              } else if (choice.isCorrect) {
                cls = "bg-green-50 border-2 border-green-300 text-green-700";
              } else {
                cls = "bg-gray-50 border-2 border-gray-100 text-gray-400";
              }
            }
            return (
              <button
                key={i}
                onClick={() => handleChoice(i)}
                disabled={showFeedback}
                className={`${cls} w-full rounded-2xl p-4 text-right transition-all font-medium focus:outline-none disabled:cursor-default`}
              >
                <p dir="ltr" className="font-bold">{choice.text_en}</p>
                <p className="text-sm mt-0.5 opacity-70">{choice.translation_he}</p>
              </button>
            );
          })}

          {showFeedback && (
            <div className={`rounded-2xl p-4 border ${
              step.player_choices[chosen!]?.isCorrect ? "bg-green-50 border-green-300" : "bg-orange-50 border-orange-200"
            }`}>
              <p className="font-extrabold">
                {step.player_choices[chosen!]?.isCorrect ? "✅ " : "❌ "}
                {step.player_choices[chosen!]?.feedback_he}
              </p>
            </div>
          )}

          {showFeedback && (
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-l from-green-500 to-teal-600 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg"
            >
              {step.player_choices[chosen!]?.isCorrect
                ? stepIdx + 1 >= rp.steps.length ? "🏆 סיום!" : "המשך →"
                : "🔄 נסה שוב"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

// ─── Buddy AI Chat ─────────────────────────────────────────────────────────────
type ChatMsg = { from: "buddy" | "child"; text: string };

function RecordingWave() {
  return (
    <div className="flex items-end gap-0.5 h-5" aria-hidden>
      {[3, 5, 7, 5, 4, 7, 4, 5, 3].map((h, i) => (
        <div
          key={i}
          className="w-1 bg-white rounded-full animate-pulse"
          style={{ height: `${h * 3}px`, animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

function BuddyView({
  onBack,
  onXP,
}: {
  onBack: () => void;
  onXP: (pts: number) => void;
}) {
  const [topicIdx, setTopicIdx] = useState<number | null>(null);
  const [chatStage, setChatStage] = useState<"topics" | "chat" | "complete">("topics");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [micState, setMicState] = useState<"idle" | "recording">("idle");
  const [showHelp, setShowHelp] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [lastBuddyText, setLastBuddyText] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const stopRecRef = useRef<(() => void) | null>(null);
  // Refs for stable access inside async callbacks
  const waitingRef = useRef(false);
  const qIdxRef = useRef(0);
  const topicIdxRef = useRef<number | null>(null);
  const canSpeakRef = useRef(false);
  // answerRef is updated every render so STT callback always calls the latest version
  const answerRef = useRef((_t: string) => {});

  const { settings } = useSettings();
  const { canSpeak } = useAudio(settings);
  const [sttAvailable] = useState(() => isSTTSupported());

  // Keep refs in sync every render
  waitingRef.current = waiting;
  qIdxRef.current = questionIdx;
  topicIdxRef.current = topicIdx;
  canSpeakRef.current = canSpeak;

  const topic = topicIdx !== null ? BUDDY_TOPICS[topicIdx] : null;
  const currentQuestion = topic
    ? topic.questions[Math.min(questionIdx, topic.questions.length - 1)]
    : null;

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecRef.current?.();
      stopSpeaking();
    };
  }, []);

  // Buddy speaks (reads canSpeakRef so always current even in closures)
  const buddySpeak = (text: string) => {
    if (canSpeakRef.current) speak(text, { rate: 0.82, pitch: 1.3 });
  };

  // Add buddy chat bubble + speak
  const addBuddy = (text: string) => {
    setMessages((prev) => [...prev, { from: "buddy", text }]);
    setLastBuddyText(text);
    buddySpeak(text);
  };

  // answerRef.current captures addBuddy/buddySpeak from the latest render;
  // those functions only use stable setters + canSpeakRef (a ref), so stale closure is safe.
  answerRef.current = (transcript: string) => {
    if (!waitingRef.current) return;
    const qIdx = qIdxRef.current;
    const tIdx = topicIdxRef.current;
    if (tIdx === null) return;
    const t = BUDDY_TOPICS[tIdx];

    setWaiting(false);
    waitingRef.current = false;
    setShowHelp(false);
    setMessages((prev) => [
      ...prev,
      { from: "child", text: transcript },
    ]);

    const enc =
      BUDDY_ENCOURAGEMENTS[
        Math.floor(Math.random() * BUDDY_ENCOURAGEMENTS.length)
      ];
    const nextQIdx = qIdx + 1;

    setTimeout(() => {
      if (nextQIdx < t.questions.length) {
        addBuddy(enc);
        setTimeout(() => {
          setQuestionIdx(nextQIdx);
          qIdxRef.current = nextQIdx;
          addBuddy(t.questions[nextQIdx].question_en);
          setWaiting(true);
          waitingRef.current = true;
        }, 1800);
      } else {
        addBuddy(`${enc} You finished all the questions! You are amazing! 🎉`);
        setTimeout(() => {
          onXP(BUDDY_XP);
          setChatStage("complete");
        }, 2500);
      }
    }, 500);
  };

  const handleTopicSelect = (idx: number) => {
    setTopicIdx(idx);
    topicIdxRef.current = idx;
    setQuestionIdx(0);
    qIdxRef.current = 0;
    setMessages([]);
    setWaiting(false);
    waitingRef.current = false;
    setShowHelp(false);
    setMicState("idle");
    setChatStage("chat");

    const t = BUDDY_TOPICS[idx];
    const greeting = `Hi! I'm Buddy! 😊 Let's talk about "${t.subtitle_he}"!`;

    setTimeout(() => {
      setMessages([{ from: "buddy", text: greeting }]);
      setLastBuddyText(greeting);
      if (canSpeakRef.current) {
        speakAsync(greeting, { rate: 0.82, pitch: 1.3 })
          .catch(() => {})
          .then(() => {
            const firstQ = t.questions[0].question_en;
            setMessages((prev) => [...prev, { from: "buddy", text: firstQ }]);
            setLastBuddyText(firstQ);
            buddySpeak(firstQ);
            setWaiting(true);
            waitingRef.current = true;
          });
      } else {
        setTimeout(() => {
          const firstQ = t.questions[0].question_en;
          setMessages((prev) => [...prev, { from: "buddy", text: firstQ }]);
          setLastBuddyText(firstQ);
          setWaiting(true);
          waitingRef.current = true;
        }, 1200);
      }
    }, 300);
  };

  const handleStartMic = () => {
    if (micState === "recording") {
      stopRecRef.current?.();
      setMicState("idle");
      return;
    }
    setMicState("recording");
    const stop = startListening((result, error) => {
      setMicState("idle");
      if (result?.transcript.trim()) {
        answerRef.current(result.transcript.trim());
      } else if (
        error &&
        !error.includes("aborted") &&
        !error.includes("no-speech")
      ) {
        addBuddy("I couldn't hear you. Please try again! 😊");
        setWaiting(true);
        waitingRef.current = true;
      }
      // aborted / no-speech → stay on same question, waiting remains true
    }, "en-US");
    stopRecRef.current = stop;
  };

  const handleTextSubmit = () => {
    const text = textInput.trim();
    if (!text) return;
    setTextInput("");
    answerRef.current(text);
  };

  const handleSkip = () => answerRef.current("...");

  const handleReplay = () => buddySpeak(lastBuddyText);

  // ── Topic selection ──────────────────────────────────────────────────────────
  if (chatStage === "topics") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-fuchsia-50 to-white pb-24" dir="rtl">
        <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={onBack} className="text-2xl p-1 rounded-full hover:bg-gray-100">←</button>
          <div>
            <p className="font-bold text-gray-800 text-sm">🤖 שיחה עם Buddy</p>
            <p className="text-xs text-gray-400">{BUDDY_TOPICS.length} נושאי שיחה</p>
          </div>
        </nav>

        <div className="max-w-lg mx-auto px-4 pt-5 space-y-5">
          <div className="bg-gradient-to-l from-fuchsia-500 to-pink-500 rounded-3xl p-5 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <span className="text-5xl">🤖</span>
              <div>
                <p className="font-extrabold text-xl">היי! אני Buddy!</p>
                <p className="text-white/80 text-sm">בחר נושא ונשוחח באנגלית. אני כאן לעזור!</p>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl p-3 text-sm border ${sttAvailable ? "bg-green-50 border-green-200 text-green-800" : "bg-yellow-50 border-yellow-200 text-yellow-800"}`}>
            {sttAvailable ? (
              <>
                <p className="font-bold">🎤 זיהוי דיבור פעיל!</p>
                <p>Buddy ישאל שאלות בקול. לחץ 🎤 ודבר! הוא תמיד יגיב בחיוב.</p>
              </>
            ) : (
              <>
                <p className="font-bold">⌨️ מצב כתיבה</p>
                <p>הדפדפן לא תומך בזיהוי דיבור. כתוב את התשובות בתיבת הטקסט.</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {BUDDY_TOPICS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => handleTopicSelect(i)}
                className={`bg-gradient-to-br ${t.color} text-white rounded-2xl p-4 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-right focus:outline-none`}
              >
                <span className="text-3xl block mb-2">{t.icon}</span>
                <p className="font-extrabold text-sm leading-tight">{t.title_he}</p>
                <p className="text-white/70 text-xs mt-1">{t.subtitle_he}</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ── Complete screen ──────────────────────────────────────────────────────────
  if (chatStage === "complete" && topic) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-fuchsia-50 to-white flex flex-col items-center justify-center px-4 py-10" dir="rtl">
        <div className="text-7xl mb-4">🎉</div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">כל הכבוד! דיברת עם Buddy!</h2>
        <p className="text-gray-500 mb-1">{topic.icon} {topic.title_he}</p>
        <p className="text-gray-400 text-sm mb-6">ענית על כל 5 השאלות!</p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-6 py-4 text-center mb-6">
          <p className="text-2xl font-extrabold text-yellow-700">+{BUDDY_XP} נקודות! ⭐</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 w-full max-w-sm mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🤖</span>
            <p className="font-extrabold text-gray-800" dir="ltr">Great job! You are amazing! 🌟</p>
          </div>
          <p className="text-gray-500 text-sm">אתה/את מדבר/ת אנגלית מצוין! המשך/המשיכי לתרגל!</p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={() => handleTopicSelect(topicIdx!)}
            className="w-full bg-gradient-to-l from-fuchsia-500 to-pink-500 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg"
          >
            🔄 שוב את אותו נושא
          </button>
          <button
            onClick={() => setChatStage("topics")}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 font-bold text-gray-700"
          >
            📋 בחר נושא אחר
          </button>
        </div>
      </main>
    );
  }

  // ── Chat screen ──────────────────────────────────────────────────────────────
  if (!topic || !currentQuestion) return null;

  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-fuchsia-50 to-white" dir="rtl">
      {/* Nav */}
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => {
            stopRecRef.current?.();
            stopSpeaking();
            setChatStage("topics");
          }}
          className="text-2xl p-1 rounded-full hover:bg-gray-100"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-gray-800 truncate">{topic.icon} {topic.title_he}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-fuchsia-500 h-1.5 rounded-full transition-all"
                style={{ width: `${((questionIdx + 1) / topic.questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {questionIdx + 1}/{topic.questions.length}
            </span>
          </div>
        </div>
        {/* Replay last Buddy message */}
        {canSpeak && lastBuddyText && (
          <button
            onClick={handleReplay}
            className="bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-600 rounded-full p-2 transition-colors flex-shrink-0"
            title="השמע שוב"
          >
            🔊
          </button>
        )}
      </nav>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        {messages.map((msg, i) =>
          msg.from === "buddy" ? (
            <div key={i} className="flex items-end gap-2">
              <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 shadow-sm mb-0.5">
                🤖
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 px-4 py-3 max-w-[78%]">
                <p dir="ltr" className="text-gray-800 font-medium leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div
                className={`rounded-2xl rounded-br-sm px-4 py-3 max-w-[78%] shadow-sm ${
                  msg.text === "..."
                    ? "bg-gray-200 text-gray-500"
                    : "bg-fuchsia-500 text-white"
                }`}
              >
                <p dir="ltr" className="font-medium leading-relaxed">
                  {msg.text === "..." ? "⏭️ דילגתי" : msg.text}
                </p>
              </div>
            </div>
          )
        )}
        <div ref={bottomRef} />
      </div>

      {/* Help panel — slides up from bottom */}
      {showHelp && currentQuestion && (
        <div className="bg-yellow-50 border-t-2 border-yellow-200 px-4 py-3 space-y-2 flex-shrink-0 max-h-52 overflow-y-auto">
          <p className="text-xs font-bold text-yellow-700">💡 רמז:</p>
          <p className="text-gray-700 text-sm">{currentQuestion.hint_he}</p>
          <p className="text-xs font-bold text-yellow-700 pt-1">📝 דוגמאות לתשובה:</p>
          <div className="space-y-1.5">
            {currentQuestion.example_answers.map((ans, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-yellow-200 px-3 py-1.5 flex items-center gap-2"
              >
                <span className="bg-yellow-200 text-yellow-800 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <p dir="ltr" className="text-gray-800 text-sm flex-1">{ans}</p>
                {canSpeak && (
                  <button
                    onClick={() => speak(ans, { rate: 0.82, pitch: 1.3 })}
                    className="text-sm flex-shrink-0 hover:scale-110 transition-transform"
                  >
                    🔊
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-4 space-y-2.5 flex-shrink-0">
        {/* Help + Skip row */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowHelp((v) => !v)}
            className={`flex-1 py-2 rounded-xl font-bold text-sm border-2 transition-colors ${
              showHelp
                ? "bg-yellow-100 border-yellow-400 text-yellow-800"
                : "bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
            }`}
          >
            {showHelp ? "🔼 הסתר עזרה" : "🆘 אני צריך עזרה"}
          </button>
          <button
            onClick={handleSkip}
            disabled={!waiting || micState === "recording"}
            className="px-4 py-2 rounded-xl font-bold text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-2 border-gray-200"
          >
            דלג ⏭️
          </button>
        </div>

        {/* Mic button (STT available) */}
        {sttAvailable ? (
          <button
            onClick={handleStartMic}
            disabled={!waiting && micState === "idle"}
            className={`w-full rounded-2xl py-5 font-extrabold text-xl shadow-lg transition-all focus:outline-none ${
              micState === "recording"
                ? "bg-red-500 text-white"
                : waiting
                ? "bg-gradient-to-l from-fuchsia-500 to-pink-500 text-white hover:shadow-xl active:scale-[0.98]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {micState === "recording" ? (
              <span className="flex items-center justify-center gap-3">
                <RecordingWave />
                <span className="text-lg">מקליט... לחץ לעצור</span>
              </span>
            ) : waiting ? (
              "🎤 לחץ ודבר!"
            ) : (
              "⏳ Buddy מדבר..."
            )}
          </button>
        ) : (
          /* Text input fallback */
          <div className="space-y-1.5">
            <div className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                placeholder="כתוב תשובה באנגלית..."
                disabled={!waiting}
                dir="ltr"
                className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-fuchsia-400 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
              />
              <button
                onClick={handleTextSubmit}
                disabled={!waiting || !textInput.trim()}
                className="bg-fuchsia-500 text-white rounded-xl px-5 py-3 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-fuchsia-600 transition-colors"
              >
                שלח ✓
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center">
              💡 לזיהוי דיבור השתמש ב-Chrome במחשב
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function SpeakingPage() {
  const [stage, setStage] = useState<Stage>("home");
  const [showConfetti, setShowConfetti] = useState(false);

  const { addPoints } = useProgress();
  const { newlyUnlocked, checkAndUnlock, dismissAchievements } = useAchievements();

  const handleXP = useCallback(
    (pts: number) => {
      const updated = addPoints(pts, { correctAnswers: 1, speakingDone: 1 });
      if (updated) checkAndUnlock(updated);
      if (pts >= 20) setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    },
    [addPoints, checkAndUnlock]
  );

  return (
    <>
      {showConfetti && <Confetti />}
      {newlyUnlocked.length > 0 && (
        <AchievementPopup achievements={newlyUnlocked} onClose={dismissAchievements} />
      )}

      {stage === "home" && <HomeView onSelect={(s) => setStage(s)} />}
      {stage === "expressions" && (
        <ExpressionsView onBack={() => setStage("home")} onXP={handleXP} />
      )}
      {stage === "dialogues" && (
        <DialoguesView onBack={() => setStage("home")} onXP={handleXP} />
      )}
      {stage === "qa" && (
        <QAView onBack={() => setStage("home")} onXP={handleXP} />
      )}
      {stage === "roleplay" && (
        <RolePlayView onBack={() => setStage("home")} onXP={handleXP} />
      )}
      {stage === "buddy" && (
        <BuddyView onBack={() => setStage("home")} onXP={handleXP} />
      )}
    </>
  );
}
