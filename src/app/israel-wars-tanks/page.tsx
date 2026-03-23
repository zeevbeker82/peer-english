"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ISRAEL_WARS_TANKS,
  ISRAEL_WARS_TANKS_XP,
  WAR_LABELS,
  WAR_LABELS_HE,
  SIDE_LABELS,
  type IsraelWarsTank,
  type IsraelWarName,
  type IsraelWarSide,
} from "@/lib/content/israel-wars-tanks";
import {
  getIsraelWarsTanksProgress,
  markIsraelTankCorrect,
  updateIsraelStats,
  getIsraelWarsTanksStats,
} from "@/lib/storage/israel-wars-tanks";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { Confetti } from "@/components/ui/Confetti";
import { AchievementPopup } from "@/components/ui/AchievementPopup";

// ─── Types ────────────────────────────────────────────────────────────────────

type QuizScreen = "home" | "question" | "feedback" | "results";
type FilterMode = "all" | "war" | "side";
type QuestionType = "name" | "side" | "category" | "war";

interface Question {
  tank: IsraelWarsTank;
  type: QuestionType;
  questionText: string;     // in English
  correctAnswer: string;    // in English
  choices: string[];        // in English
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── War/Side Filter Data ─────────────────────────────────────────────────────

const WARS: { value: IsraelWarName; label: string; labelHe: string; emoji: string }[] = [
  { value: "independence", label: "War of Independence", labelHe: "מלחמת השחרור", emoji: "⚔️" },
  { value: "six_day",      label: "Six-Day War",         labelHe: "ששת הימים",     emoji: "✡️" },
  { value: "yom_kippur",   label: "Yom Kippur War",      labelHe: "יום הכיפורים",  emoji: "🌙" },
  { value: "lebanon_1",    label: "First Lebanon War",   labelHe: "לבנון א׳",      emoji: "🌲" },
];

// ─── buildQuestion ────────────────────────────────────────────────────────────

function buildQuestion(
  tank: IsraelWarsTank,
  type: QuestionType,
  allTanks: IsraelWarsTank[]
): Question {
  switch (type) {
    case "name": {
      const wrong = shuffle(allTanks.filter((t) => t.id !== tank.id))
        .slice(0, 3)
        .map((t) => t.name);
      return {
        tank,
        type,
        questionText: "What is the name of this tank?",
        correctAnswer: tank.name,
        choices: shuffle([tank.name, ...wrong]),
      };
    }
    case "side": {
      const correct = SIDE_LABELS[tank.side];
      const allSides = [...new Set(allTanks.map((t) => SIDE_LABELS[t.side]))];
      const wrong = shuffle(allSides.filter((s) => s !== correct)).slice(0, 3);
      return {
        tank,
        type,
        questionText: "Which country used this tank?",
        correctAnswer: correct,
        choices: shuffle([correct, ...wrong]),
      };
    }
    case "category": {
      const allCats = [...new Set(allTanks.map((t) => t.categoryEnglish))];
      const wrong = shuffle(allCats.filter((c) => c !== tank.categoryEnglish)).slice(0, 3);
      return {
        tank,
        type,
        questionText: "What type of tank is this?",
        correctAnswer: tank.categoryEnglish,
        choices: shuffle([tank.categoryEnglish, ...wrong]),
      };
    }
    case "war": {
      const correct = WAR_LABELS[tank.wars[0]];
      const allWars = Object.values(WAR_LABELS);
      const wrong = shuffle(allWars.filter((w) => w !== correct)).slice(0, 3);
      return {
        tank,
        type,
        questionText: "In which war was this tank FIRST used?",
        correctAnswer: correct,
        choices: shuffle([correct, ...wrong]),
      };
    }
  }
}

function buildSession(tanks: IsraelWarsTank[]): Question[] {
  return tanks.map((tank, i) => {
    const type = (["name", "side", "category", "war"] as QuestionType[])[i % 4];
    return buildQuestion(tank, type, ISRAEL_WARS_TANKS);
  });
}

// ─── TankImage Component ──────────────────────────────────────────────────────

function TankImage({ tank }: { tank: IsraelWarsTank }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [tank.id]);

  if (error) {
    return (
      <div className="w-full h-64 bg-blue-900 flex flex-col items-center justify-center rounded-t-2xl">
        <span className="text-7xl">🔯</span>
        <p className="text-blue-400 text-sm mt-2" dir="ltr">{tank.name}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 bg-blue-900 rounded-t-2xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-900 animate-pulse">
          <span className="text-5xl opacity-30">🔯</span>
        </div>
      )}
      <img
        src={tank.imageUrl}
        alt={tank.name}
        loading="lazy"
        crossOrigin="anonymous"
        className={`w-full h-64 object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
        <p className="text-white/60 text-xs" dir="ltr">{tank.imageCredit}</p>
      </div>
    </div>
  );
}

// ─── XP Badge ─────────────────────────────────────────────────────────────────

function XPBadge({ xp, show }: { xp: number; show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 animate-bounce">
      <div className="bg-cyan-400 text-blue-950 font-extrabold text-lg px-4 py-1.5 rounded-full shadow-lg border-2 border-cyan-300">
        +{xp} XP ✡️
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

interface HomeScreenProps {
  stats: { correct: number; total: number; xp: number; bestStreak: number };
  filter: FilterMode;
  setFilter: (f: FilterMode) => void;
  warFilter: IsraelWarName | null;
  setWarFilter: (w: IsraelWarName | null) => void;
  sideFilter: "israel" | "arab" | null;
  setSideFilter: (s: "israel" | "arab" | null) => void;
  onStart: () => void;
}

function HomeScreen({
  stats,
  filter,
  setFilter,
  warFilter,
  setWarFilter,
  sideFilter,
  setSideFilter,
  onStart,
}: HomeScreenProps) {
  const countForWar = (w: IsraelWarName) =>
    ISRAEL_WARS_TANKS.filter((t) => t.wars.includes(w)).length;

  const countForSide = (side: "israel" | "arab") =>
    side === "israel"
      ? ISRAEL_WARS_TANKS.filter((t) => t.side === "Israel").length
      : ISRAEL_WARS_TANKS.filter((t) => t.side !== "Israel").length;

  const getActiveCount = () => {
    if (filter === "war" && warFilter) {
      return ISRAEL_WARS_TANKS.filter((t) => t.wars.includes(warFilter)).length;
    }
    if (filter === "side" && sideFilter) {
      return sideFilter === "israel"
        ? ISRAEL_WARS_TANKS.filter((t) => t.side === "Israel").length
        : ISRAEL_WARS_TANKS.filter((t) => t.side !== "Israel").length;
    }
    return ISRAEL_WARS_TANKS.length;
  };

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-900/50 rounded-2xl p-3 text-center border border-blue-700">
          <p className="text-2xl font-extrabold text-green-400">{stats.correct}</p>
          <p className="text-blue-400 text-xs mt-0.5">תשובות נכונות</p>
        </div>
        <div className="bg-blue-900/50 rounded-2xl p-3 text-center border border-blue-700">
          <p className="text-2xl font-extrabold text-cyan-400">{stats.xp}</p>
          <p className="text-blue-400 text-xs mt-0.5">XP נצבר</p>
        </div>
        <div className="bg-blue-900/50 rounded-2xl p-3 text-center border border-blue-700">
          <p className="text-2xl font-extrabold text-orange-400">{stats.bestStreak}</p>
          <p className="text-blue-400 text-xs mt-0.5">רצף מקסימלי</p>
        </div>
      </div>

      {/* Filter mode buttons */}
      <div>
        <p className="text-blue-300 text-sm mb-2 font-bold">בחר מצב:</p>
        <div className="flex gap-2">
          {(["all", "war", "side"] as FilterMode[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : "bg-blue-800 text-blue-300 hover:bg-blue-700"
              }`}
            >
              {f === "all" ? "✡️ הכל" : f === "war" ? "⚔️ לפי מלחמה" : "🌍 לפי צד"}
            </button>
          ))}
        </div>
      </div>

      {/* War selector */}
      {filter === "war" && (
        <div>
          <p className="text-blue-300 text-sm mb-2 font-bold">בחר מלחמה:</p>
          <div className="grid grid-cols-2 gap-2">
            {WARS.map((w) => {
              const count = countForWar(w.value);
              if (count === 0) return null;
              return (
                <button
                  key={w.value}
                  onClick={() => setWarFilter(warFilter === w.value ? null : w.value)}
                  className={`py-2.5 px-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                    warFilter === w.value
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "bg-blue-800 text-blue-200 hover:bg-blue-700"
                  }`}
                >
                  <span>{w.emoji}</span>
                  <span className="flex-1 text-right">{w.labelHe}</span>
                  <span className="text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Side selector */}
      {filter === "side" && (
        <div>
          <p className="text-blue-300 text-sm mb-2 font-bold">בחר צד:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSideFilter(sideFilter === "israel" ? null : "israel")}
              className={`py-3 px-3 rounded-xl font-bold text-sm transition-all flex items-center justify-between gap-2 ${
                sideFilter === "israel"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : "bg-blue-800 text-blue-200 hover:bg-blue-700"
              }`}
            >
              <span>🇮🇱 ישראל</span>
              <span className="text-xs opacity-70">{countForSide("israel")}</span>
            </button>
            <button
              onClick={() => setSideFilter(sideFilter === "arab" ? null : "arab")}
              className={`py-3 px-3 rounded-xl font-bold text-sm transition-all flex items-center justify-between gap-2 ${
                sideFilter === "arab"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : "bg-blue-800 text-blue-200 hover:bg-blue-700"
              }`}
            >
              <span>🌙 מדינות ערב</span>
              <span className="text-xs opacity-70">{countForSide("arab")}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tank count */}
      <div className="bg-blue-900/40 border border-blue-700/50 rounded-2xl p-4 text-center">
        <p className="text-blue-200 text-sm">
          {getActiveCount()} טנקים · 4 סוגי שאלות
        </p>
        <p className="text-blue-500 text-xs mt-1">שאלות ישאלו בסדר אקראי</p>
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        className="w-full py-5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 active:scale-[0.97] text-white font-extrabold text-xl rounded-2xl shadow-xl transition-all"
      >
        🚀 התחל קוויז!
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function IsraelWarsTanksPage() {
  const router = useRouter();
  const { addPoints } = useProgress();
  const { newlyUnlocked, checkAndUnlock, dismissAchievements } = useAchievements();

  const [screen, setScreen] = useState<QuizScreen>("home");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [warFilter, setWarFilter] = useState<IsraelWarName | null>(null);
  const [sideFilter, setSideFilter] = useState<"israel" | "arab" | null>(null);

  // Session state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  // Question state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showXP, setShowXP] = useState(false);
  const [lastXP, setLastXP] = useState(0);

  // Results state
  const [showConfetti, setShowConfetti] = useState(false);

  // Stats (home screen)
  const [stats, setStats] = useState({ correct: 0, total: 0, xp: 0, bestStreak: 0 });

  useEffect(() => {
    setStats(getIsraelWarsTanksStats());
  }, []);

  const getFilteredTanks = useCallback((): IsraelWarsTank[] => {
    let tanks = ISRAEL_WARS_TANKS;
    if (filter === "war" && warFilter) {
      tanks = tanks.filter((t) => t.wars.includes(warFilter));
    } else if (filter === "side" && sideFilter) {
      if (sideFilter === "israel") {
        tanks = tanks.filter((t) => t.side === "Israel");
      } else {
        tanks = tanks.filter((t) => t.side !== "Israel");
      }
    }
    return tanks;
  }, [filter, warFilter, sideFilter]);

  const handleStart = useCallback(() => {
    const tanks = shuffle(getFilteredTanks());
    const qs = buildSession(tanks);
    setQuestions(qs);
    setCurrentIndex(0);
    setStreak(0);
    setSessionXP(0);
    setSessionCorrect(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScreen("question");
  }, [getFilteredTanks]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (selectedAnswer !== null) return; // already answered

      const q = questions[currentIndex];
      const correct = answer === q.correctAnswer;
      setSelectedAnswer(answer);
      setIsCorrect(correct);

      let xpEarned = 0;
      let newStreak = streak;

      if (correct) {
        xpEarned += ISRAEL_WARS_TANKS_XP.correct;
        newStreak = streak + 1;
        setStreak(newStreak);

        if (newStreak === 3) xpEarned += ISRAEL_WARS_TANKS_XP.streak3;
        else if (newStreak >= 5 && newStreak % 5 === 0) xpEarned += ISRAEL_WARS_TANKS_XP.streak5;

        markIsraelTankCorrect(q.tank.id);
        setSessionCorrect((prev) => prev + 1);
      } else {
        newStreak = 0;
        setStreak(0);
      }

      updateIsraelStats(correct, xpEarned, newStreak);

      if (xpEarned > 0) {
        setLastXP(xpEarned);
        setShowXP(true);
        setTimeout(() => setShowXP(false), 1500);
        setSessionXP((prev) => prev + xpEarned);

        const updated = addPoints(xpEarned, { correctAnswers: correct ? 1 : 0 });
        if (updated) checkAndUnlock(updated);
      }

      setScreen("feedback");
    },
    [questions, currentIndex, streak, selectedAnswer, addPoints, checkAndUnlock]
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      // Check allTanks bonus
      const prog = getIsraelWarsTanksProgress();
      const uniqueCorrect = prog.correctIds.length;
      if (uniqueCorrect >= ISRAEL_WARS_TANKS.length) {
        const bonus = ISRAEL_WARS_TANKS_XP.allTanks;
        setSessionXP((prev) => prev + bonus);
        const updated = addPoints(bonus, {});
        if (updated) checkAndUnlock(updated);
      }

      const totalQs = questions.length;
      const pct = totalQs > 0 ? (sessionCorrect / totalQs) * 100 : 0;
      if (pct > 80) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }

      setStats(getIsraelWarsTanksStats());
      setScreen("results");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setScreen("question");
    }
  }, [currentIndex, questions.length, sessionCorrect, addPoints, checkAndUnlock]);

  // ── Render ──────────────────────────────────────────────────────────────────

  const currentQ = questions[currentIndex] ?? null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 pb-20" dir="rtl">
      {showConfetti && <Confetti />}
      {newlyUnlocked.length > 0 && (
        <AchievementPopup achievements={newlyUnlocked} onClose={dismissAchievements} />
      )}

      {/* ── Header ── */}
      <div className="bg-gradient-to-b from-blue-950 to-blue-900 px-4 pt-4 pb-5 sticky top-0 z-10 shadow-lg border-b border-blue-700">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="text-blue-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-blue-800"
            aria-label="חזור"
          >
            ← חזור
          </button>
          <h1 className="text-lg font-extrabold text-white flex items-center gap-2">
            <span>✡️</span>
            <span>טנקי מלחמות ישראל</span>
          </h1>
          {screen === "question" || screen === "feedback" ? (
            <div className="text-cyan-400 font-bold text-sm">
              {streak >= 2 && <span>🔥</span>} {streak > 0 ? `×${streak}` : ""}
            </div>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5">

        {/* ── HOME SCREEN ── */}
        {screen === "home" && (
          <div className="space-y-5">
            {/* Title card */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-700/50 rounded-3xl p-5 text-center shadow-xl">
              <div className="text-6xl mb-3">✡️</div>
              <h2 className="text-2xl font-extrabold text-white mb-1">טנקי מלחמות ישראל</h2>
              <p className="text-blue-400 text-sm">{ISRAEL_WARS_TANKS.length} טנקים היסטוריים · קוויז תמונות</p>
              <div className="flex justify-center gap-4 mt-3 text-2xl">
                <span title="ישראל">🇮🇱</span>
                <span title="מלחמת השחרור">⚔️</span>
                <span title="ששת הימים">✡️</span>
                <span title="יום הכיפורים">🌙</span>
                <span title="לבנון א׳">🌲</span>
              </div>
            </div>

            <HomeScreen
              stats={stats}
              filter={filter}
              setFilter={setFilter}
              warFilter={warFilter}
              setWarFilter={setWarFilter}
              sideFilter={sideFilter}
              setSideFilter={setSideFilter}
              onStart={handleStart}
            />
          </div>
        )}

        {/* ── QUESTION SCREEN ── */}
        {(screen === "question" || screen === "feedback") && currentQ && (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-blue-800 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-blue-400 text-sm font-bold whitespace-nowrap">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>

            {/* Streak display */}
            {streak >= 2 && (
              <div className="flex items-center justify-center gap-2 bg-orange-900/40 border border-orange-700/50 rounded-xl py-2">
                <span className="text-xl">🔥</span>
                <span className="text-orange-400 font-extrabold">רצף × {streak}</span>
                {streak >= 5 && <span className="text-orange-300 text-sm">מדהים!</span>}
              </div>
            )}

            {/* Question card */}
            <div className="bg-blue-900/50 rounded-2xl overflow-hidden border border-blue-700 shadow-2xl relative">
              <XPBadge xp={lastXP} show={showXP} />

              {/* Tank image */}
              <TankImage tank={currentQ.tank} />

              {/* Question text */}
              <div className="px-4 pt-4 pb-3">
                <p className="text-white text-xl font-extrabold text-center" dir="ltr">
                  {currentQ.questionText}
                </p>
                {currentQ.type === "name" && (
                  <p className="text-blue-400 text-xs text-center mt-1" dir="ltr">
                    {currentQ.tank.side} · {currentQ.tank.yearFirstUsed}
                  </p>
                )}
              </div>

              {/* Answer buttons */}
              <div className="grid grid-cols-2 gap-3 px-4 pb-4">
                {currentQ.choices.map((choice) => {
                  const isSelected = selectedAnswer === choice;
                  const isRight = choice === currentQ.correctAnswer;

                  let btnClass =
                    "py-3 px-2 rounded-xl font-bold text-sm transition-all border-2 text-center min-h-[3rem] flex items-center justify-center";

                  if (screen === "feedback") {
                    if (isRight) {
                      btnClass += " bg-green-800 border-green-500 text-green-200";
                    } else if (isSelected && !isRight) {
                      btnClass += " bg-red-900 border-red-500 text-red-300";
                    } else {
                      btnClass += " bg-blue-900 border-blue-700 text-blue-500 opacity-50";
                    }
                  } else {
                    btnClass +=
                      " bg-blue-800 border-blue-700 text-blue-100 hover:border-cyan-500 hover:bg-blue-700 active:scale-[0.97]";
                  }

                  return (
                    <button
                      key={choice}
                      className={btnClass}
                      onClick={() => handleAnswer(choice)}
                      disabled={screen === "feedback"}
                      dir="ltr"
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback panel */}
            {screen === "feedback" && (
              <div className="space-y-3">
                {/* Correct / Wrong banner */}
                <div
                  className={`rounded-2xl p-4 text-center font-extrabold text-lg ${
                    isCorrect
                      ? "bg-green-900/60 border border-green-600 text-green-300"
                      : "bg-red-900/60 border border-red-600 text-red-300"
                  }`}
                >
                  {isCorrect ? (
                    "✅ Correct!"
                  ) : (
                    <span dir="ltr">❌ Wrong — correct answer: {currentQ.correctAnswer}</span>
                  )}
                </div>

                {/* Fun fact — always shown */}
                <div className="bg-blue-900/40 border border-blue-700/50 rounded-2xl p-4">
                  <p className="text-blue-300 font-extrabold text-sm mb-1 flex items-center gap-1" dir="ltr">
                    <span>⚡</span> Did you know?
                  </p>
                  <p className="text-blue-100 text-sm leading-relaxed" dir="ltr">
                    {currentQ.tank.funFactEnglish}
                  </p>
                  <div className="flex gap-4 mt-2 text-xs text-blue-500/70" dir="ltr">
                    {currentQ.tank.weightTons && <span>⚖️ {currentQ.tank.weightTons}t</span>}
                    {currentQ.tank.crewSize && <span>👤 {currentQ.tank.crewSize} crew</span>}
                    <span>📅 {currentQ.tank.yearFirstUsed}</span>
                  </div>
                </div>

                {/* Next button */}
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 active:scale-[0.97] text-white font-extrabold text-lg rounded-2xl shadow-lg transition-all"
                >
                  {currentIndex + 1 >= questions.length ? "סיום הקוויז 🏁" : "הבא ←"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── RESULTS SCREEN ── */}
        {screen === "results" && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-700 rounded-3xl p-6 text-center shadow-2xl">
              <div className="text-6xl mb-3">
                {sessionCorrect / questions.length >= 0.9
                  ? "🏆"
                  : sessionCorrect / questions.length >= 0.7
                  ? "🌟"
                  : sessionCorrect / questions.length >= 0.5
                  ? "👍"
                  : "💪"}
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2">סיום הקוויז!</h2>
              <p className="text-blue-400 text-sm mb-4">
                {sessionCorrect >= questions.length * 0.9
                  ? "מדהים! אתה מומחה טנקי ישראל!"
                  : sessionCorrect >= questions.length * 0.7
                  ? "כל הכבוד! עוד קצת ואתה מומחה!"
                  : "נסה שוב ותשתפר!"}
              </p>

              {/* Score grid */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-blue-800/60 rounded-2xl p-3">
                  <p className="text-2xl font-extrabold text-green-400">
                    {sessionCorrect}/{questions.length}
                  </p>
                  <p className="text-blue-400 text-xs mt-0.5">נכון</p>
                </div>
                <div className="bg-blue-800/60 rounded-2xl p-3">
                  <p className="text-2xl font-extrabold text-cyan-400">+{sessionXP}</p>
                  <p className="text-blue-400 text-xs mt-0.5">XP</p>
                </div>
                <div className="bg-blue-800/60 rounded-2xl p-3">
                  <p className="text-2xl font-extrabold text-orange-400">{streak}</p>
                  <p className="text-blue-400 text-xs mt-0.5">רצף</p>
                </div>
              </div>

              {/* Accuracy bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-blue-500 mb-1">
                  <span>דיוק</span>
                  <span>{Math.round((sessionCorrect / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-blue-800 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${
                      sessionCorrect / questions.length >= 0.8
                        ? "bg-green-500"
                        : sessionCorrect / questions.length >= 0.5
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.round((sessionCorrect / questions.length) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Total stats */}
              <div className="bg-blue-800/40 rounded-xl p-3 text-center mb-4">
                <p className="text-blue-400 text-xs">סה"כ</p>
                <p className="text-blue-200 text-sm font-bold">
                  {stats.xp} XP · {stats.correct} תשובות נכונות · רצף מקסימלי {stats.bestStreak}
                </p>
              </div>

              {/* War breakdown */}
              <div className="bg-blue-900/50 border border-blue-700/50 rounded-2xl p-3 mb-4">
                <p className="text-blue-300 text-xs font-bold mb-2">מלחמות שתרגלת:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {WARS.map((w) => {
                    const count = ISRAEL_WARS_TANKS.filter((t) => t.wars.includes(w.value)).length;
                    return (
                      <span
                        key={w.value}
                        className="bg-blue-800 text-blue-200 text-xs px-2.5 py-1 rounded-full font-bold"
                      >
                        {w.emoji} {w.labelHe} ({count})
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleStart}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 active:scale-[0.97] text-white font-extrabold rounded-2xl shadow-lg transition-all"
                >
                  🔄 שחק שוב
                </button>
                <button
                  onClick={() => {
                    setScreen("home");
                    setStats(getIsraelWarsTanksStats());
                  }}
                  className="flex-1 py-4 bg-blue-800 hover:bg-blue-700 active:scale-[0.97] text-white font-extrabold rounded-2xl transition-all border border-blue-700"
                >
                  🏠 בית
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
