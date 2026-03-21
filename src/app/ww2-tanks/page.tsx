"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { WW2_TANKS, WW2_TANKS_XP, type WW2Tank, type TankCountry } from "@/lib/content/ww2-tanks";
import {
  getWW2TanksProgress,
  markTankCorrect,
  updateStats,
  getWW2TanksStats,
} from "@/lib/storage/ww2-tanks";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { Confetti } from "@/components/ui/Confetti";
import { AchievementPopup } from "@/components/ui/AchievementPopup";

// ─── Types ────────────────────────────────────────────────────────────────────

type QuizScreen = "home" | "question" | "feedback" | "results";
type FilterMode = "all" | "country" | "type";
type QuestionType = "name" | "country" | "category" | "year";

interface Question {
  tank: WW2Tank;
  type: QuestionType;
  questionText: string;
  correctAnswer: string;
  choices: string[];
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

function getUniqueTankNames(exclude: WW2Tank, tanks: WW2Tank[], count: number): string[] {
  return shuffle(tanks.filter((t) => t.id !== exclude.id))
    .slice(0, count)
    .map((t) => t.name);
}

function getUniqueCountries(exclude: WW2Tank, tanks: WW2Tank[], count: number): string[] {
  const seen = new Set<string>([`${exclude.countryFlag} ${exclude.countryHebrew}`]);
  const result: string[] = [];
  for (const t of shuffle(tanks)) {
    const label = `${t.countryFlag} ${t.countryHebrew}`;
    if (!seen.has(label)) {
      seen.add(label);
      result.push(label);
      if (result.length >= count) break;
    }
  }
  return result;
}

function getUniqueCategories(exclude: WW2Tank, tanks: WW2Tank[], count: number): string[] {
  const seen = new Set<string>([exclude.categoryHebrew]);
  const result: string[] = [];
  for (const t of shuffle(tanks)) {
    if (!seen.has(t.categoryHebrew)) {
      seen.add(t.categoryHebrew);
      result.push(t.categoryHebrew);
      if (result.length >= count) break;
    }
  }
  return result;
}

function getUniqueYears(exclude: WW2Tank, tanks: WW2Tank[], count: number): string[] {
  const seen = new Set<string>([String(exclude.yearIntroduced)]);
  const result: string[] = [];
  for (const t of shuffle(tanks)) {
    const y = String(t.yearIntroduced);
    if (!seen.has(y)) {
      seen.add(y);
      result.push(y);
      if (result.length >= count) break;
    }
  }
  return result;
}

const QUESTION_TYPES: QuestionType[] = ["name", "country", "category", "year"];

function buildQuestion(tank: WW2Tank, type: QuestionType, allTanks: WW2Tank[]): Question {
  switch (type) {
    case "name": {
      const wrong = getUniqueTankNames(tank, allTanks, 3);
      const choices = shuffle([tank.name, ...wrong]);
      return {
        tank,
        type,
        questionText: "מה שמו של הטנק הזה?",
        correctAnswer: tank.name,
        choices,
      };
    }
    case "country": {
      const correct = `${tank.countryFlag} ${tank.countryHebrew}`;
      const wrong = getUniqueCountries(tank, allTanks, 3);
      const choices = shuffle([correct, ...wrong]);
      return {
        tank,
        type,
        questionText: "של איזו מדינה הטנק הזה?",
        correctAnswer: correct,
        choices,
      };
    }
    case "category": {
      const wrong = getUniqueCategories(tank, allTanks, 3);
      const choices = shuffle([tank.categoryHebrew, ...wrong]);
      return {
        tank,
        type,
        questionText: "מה סוג הטנק הזה?",
        correctAnswer: tank.categoryHebrew,
        choices,
      };
    }
    case "year": {
      const wrong = getUniqueYears(tank, allTanks, 3);
      const choices = shuffle([String(tank.yearIntroduced), ...wrong]);
      return {
        tank,
        type,
        questionText: "באיזו שנה נכנס הטנק הזה לשירות?",
        correctAnswer: String(tank.yearIntroduced),
        choices,
      };
    }
  }
}

function buildSession(tanks: WW2Tank[]): Question[] {
  return tanks.map((tank, i) => {
    const type = QUESTION_TYPES[i % QUESTION_TYPES.length];
    return buildQuestion(tank, type, WW2_TANKS);
  });
}

// ─── Image Component ──────────────────────────────────────────────────────────

function TankImage({ tank }: { tank: WW2Tank }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset on tank change
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [tank.id]);

  if (error) {
    return (
      <div className="w-full h-64 bg-gray-700 flex flex-col items-center justify-center rounded-t-2xl">
        <span className="text-7xl">🪖</span>
        <p className="text-gray-400 text-sm mt-2 dir-ltr" dir="ltr">{tank.name}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 bg-gray-700 rounded-t-2xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 animate-pulse">
          <span className="text-5xl opacity-30">🪖</span>
        </div>
      )}
      <img
        src={tank.imageUrl}
        alt={tank.name}
        loading="lazy"
        crossOrigin="anonymous"
        className={`w-full h-64 object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
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
      <div className="bg-yellow-400 text-gray-900 font-extrabold text-lg px-4 py-1.5 rounded-full shadow-lg border-2 border-yellow-300">
        +{xp} XP 🌟
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

interface HomeScreenProps {
  stats: { correct: number; total: number; xp: number; bestStreak: number };
  filter: FilterMode;
  setFilter: (f: FilterMode) => void;
  countryFilter: TankCountry | null;
  setCountryFilter: (c: TankCountry | null) => void;
  onStart: () => void;
}

const COUNTRIES: { value: TankCountry; flag: string; label: string }[] = [
  { value: "Germany", flag: "🇩🇪", label: "גרמניה" },
  { value: "USA",     flag: "🇺🇸", label: "ארצות הברית" },
  { value: "USSR",    flag: "🇷🇺", label: "ברית המועצות" },
  { value: "UK",      flag: "🇬🇧", label: "בריטניה" },
  { value: "Japan",   flag: "🇯🇵", label: "יפן" },
  { value: "Italy",   flag: "🇮🇹", label: "איטליה" },
  { value: "France",  flag: "🇫🇷", label: "צרפת" },
];

function HomeScreen({ stats, filter, setFilter, countryFilter, setCountryFilter, onStart }: HomeScreenProps) {
  const countForCountry = (c: TankCountry) => WW2_TANKS.filter((t) => t.country === c).length;

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-800 rounded-2xl p-3 text-center border border-gray-700">
          <p className="text-2xl font-extrabold text-green-400">{stats.correct}</p>
          <p className="text-gray-400 text-xs mt-0.5">תשובות נכונות</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-3 text-center border border-gray-700">
          <p className="text-2xl font-extrabold text-yellow-400">{stats.xp}</p>
          <p className="text-gray-400 text-xs mt-0.5">XP נצבר</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-3 text-center border border-gray-700">
          <p className="text-2xl font-extrabold text-orange-400">{stats.bestStreak}</p>
          <p className="text-gray-400 text-xs mt-0.5">רצף מקסימלי</p>
        </div>
      </div>

      {/* Filter buttons */}
      <div>
        <p className="text-gray-400 text-sm mb-2 font-bold">בחר מצב:</p>
        <div className="flex gap-2">
          {(["all", "country", "type"] as FilterMode[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${
                filter === f
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {f === "all" ? "🪖 הכל" : f === "country" ? "🌍 לפי מדינה" : "⚙️ לפי סוג"}
            </button>
          ))}
        </div>
      </div>

      {/* Country selector */}
      {filter === "country" && (
        <div>
          <p className="text-gray-400 text-sm mb-2 font-bold">בחר מדינה:</p>
          <div className="grid grid-cols-2 gap-2">
            {COUNTRIES.map((c) => {
              const count = countForCountry(c.value);
              if (count === 0) return null;
              return (
                <button
                  key={c.value}
                  onClick={() => setCountryFilter(countryFilter === c.value ? null : c.value)}
                  className={`py-2 px-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                    countryFilter === c.value
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.label}</span>
                  <span className="mr-auto text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tank count */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 text-center">
        <p className="text-gray-300 text-sm">
          {filter === "country" && countryFilter
            ? `${WW2_TANKS.filter((t) => t.country === countryFilter).length} טנקים`
            : `${WW2_TANKS.length} טנקים`}
          {" "}· 4 סוגי שאלות
        </p>
        <p className="text-gray-500 text-xs mt-1">שאלות ישאלו בסדר אקראי</p>
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        className="w-full py-5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 active:scale-[0.97] text-gray-900 font-extrabold text-xl rounded-2xl shadow-xl transition-all"
      >
        🚀 התחל קוויז!
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WW2TanksPage() {
  const router = useRouter();
  const { addPoints } = useProgress();
  const { newlyUnlocked, checkAndUnlock, dismissAchievements } = useAchievements();

  const [screen, setScreen] = useState<QuizScreen>("home");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [countryFilter, setCountryFilter] = useState<TankCountry | null>(null);

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
    setStats(getWW2TanksStats());
  }, []);

  const getFilteredTanks = useCallback((): WW2Tank[] => {
    if (filter === "country" && countryFilter) {
      return WW2_TANKS.filter((t) => t.country === countryFilter);
    }
    return WW2_TANKS;
  }, [filter, countryFilter]);

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
        xpEarned += WW2_TANKS_XP.correct;
        newStreak = streak + 1;
        setStreak(newStreak);

        if (newStreak === 3) xpEarned += WW2_TANKS_XP.streak3;
        else if (newStreak >= 5 && newStreak % 5 === 0) xpEarned += WW2_TANKS_XP.streak5;

        markTankCorrect(q.tank.id);
        setSessionCorrect((prev) => prev + 1);
      } else {
        newStreak = 0;
        setStreak(0);
      }

      updateStats(correct, xpEarned, newStreak);

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
      const prog = getWW2TanksProgress();
      const uniqueCorrect = prog.correctIds.length;
      if (uniqueCorrect >= WW2_TANKS.length) {
        const bonus = WW2_TANKS_XP.allTanks;
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

      setStats(getWW2TanksStats());
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
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pb-20" dir="rtl">
      {showConfetti && <Confetti />}
      {newlyUnlocked.length > 0 && (
        <AchievementPopup achievements={newlyUnlocked} onClose={dismissAchievements} />
      )}

      {/* ── Header ── */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 px-4 pt-4 pb-5 sticky top-0 z-10 shadow-lg border-b border-gray-700">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-gray-700"
            aria-label="חזור"
          >
            ← חזור
          </button>
          <h1 className="text-lg font-extrabold text-white flex items-center gap-2">
            <span>🪖</span>
            <span>טנקים: מלחמת העולם ה-2</span>
          </h1>
          {screen === "question" || screen === "feedback" ? (
            <div className="text-yellow-400 font-bold text-sm">
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
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-900/40 rounded-3xl p-5 text-center shadow-xl">
              <div className="text-6xl mb-3">🪖</div>
              <h2 className="text-2xl font-extrabold text-white mb-1">טנקי מלחמת העולם ה-2</h2>
              <p className="text-gray-400 text-sm">{WW2_TANKS.length} טנקים אגדיים · קוויז תמונות</p>
              <div className="flex justify-center gap-4 mt-3 text-2xl">
                <span title="גרמניה">🇩🇪</span>
                <span title="ארצות הברית">🇺🇸</span>
                <span title="ברית המועצות">🇷🇺</span>
                <span title="בריטניה">🇬🇧</span>
                <span title="יפן">🇯🇵</span>
              </div>
            </div>

            <HomeScreen
              stats={stats}
              filter={filter}
              setFilter={setFilter}
              countryFilter={countryFilter}
              setCountryFilter={setCountryFilter}
              onStart={handleStart}
            />
          </div>
        )}

        {/* ── QUESTION SCREEN ── */}
        {(screen === "question" || screen === "feedback") && currentQ && (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-gray-400 text-sm font-bold whitespace-nowrap">
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
            <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl relative">
              <XPBadge xp={lastXP} show={showXP} />

              {/* Tank image */}
              <TankImage tank={currentQ.tank} />

              {/* Question text */}
              <div className="px-4 pt-4 pb-3">
                <p className="text-white text-xl font-extrabold text-center">
                  {currentQ.questionText}
                </p>
                {currentQ.type === "name" && (
                  <p className="text-gray-500 text-xs text-center mt-1" dir="ltr">
                    {currentQ.tank.country} · {currentQ.tank.yearIntroduced}
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
                      btnClass += " bg-gray-800 border-gray-700 text-gray-500 opacity-50";
                    }
                  } else {
                    btnClass +=
                      " bg-gray-800 border-gray-700 text-gray-100 hover:border-yellow-500 hover:bg-gray-700 active:scale-[0.97]";
                  }

                  return (
                    <button
                      key={choice}
                      className={btnClass}
                      onClick={() => handleAnswer(choice)}
                      disabled={screen === "feedback"}
                      dir={currentQ.type === "name" ? "ltr" : "rtl"}
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
                  {isCorrect ? "✅ נכון מאוד!" : `❌ לא נכון — התשובה הנכונה: ${currentQ.correctAnswer}`}
                </div>

                {/* Fun fact (shown on correct) */}
                {isCorrect && (
                  <div className="bg-amber-900/40 border border-amber-700/50 rounded-2xl p-4">
                    <p className="text-amber-400 font-extrabold text-sm mb-1 flex items-center gap-1">
                      <span>⚡</span> עובדה מגניבה
                    </p>
                    <p className="text-amber-100 text-sm leading-relaxed">
                      {currentQ.tank.funFactHebrew}
                    </p>
                    <div className="flex gap-4 mt-2 text-xs text-amber-500/70" dir="ltr">
                      {currentQ.tank.weightTons && <span>⚖️ {currentQ.tank.weightTons}t</span>}
                      {currentQ.tank.crewSize && <span>👤 {currentQ.tank.crewSize} crew</span>}
                      <span>📅 {currentQ.tank.yearIntroduced}</span>
                    </div>
                  </div>
                )}

                {/* Next button */}
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 active:scale-[0.97] text-gray-900 font-extrabold text-lg rounded-2xl shadow-lg transition-all"
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
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-6 text-center shadow-2xl">
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
              <p className="text-gray-400 text-sm mb-4">
                {sessionCorrect >= questions.length * 0.9
                  ? "מדהים! אתה מומחה טנקים!"
                  : sessionCorrect >= questions.length * 0.7
                  ? "כל הכבוד! עוד קצת ואתה מומחה!"
                  : "נסה שוב ותשתפר!"}
              </p>

              {/* Score grid */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-gray-700/60 rounded-2xl p-3">
                  <p className="text-2xl font-extrabold text-green-400">
                    {sessionCorrect}/{questions.length}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">נכון</p>
                </div>
                <div className="bg-gray-700/60 rounded-2xl p-3">
                  <p className="text-2xl font-extrabold text-yellow-400">+{sessionXP}</p>
                  <p className="text-gray-400 text-xs mt-0.5">XP</p>
                </div>
                <div className="bg-gray-700/60 rounded-2xl p-3">
                  <p className="text-2xl font-extrabold text-orange-400">{streak}</p>
                  <p className="text-gray-400 text-xs mt-0.5">רצף</p>
                </div>
              </div>

              {/* Accuracy bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>דיוק</span>
                  <span>{Math.round((sessionCorrect / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
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
              <div className="bg-gray-700/40 rounded-xl p-3 text-center mb-4">
                <p className="text-gray-400 text-xs">סה"כ</p>
                <p className="text-gray-300 text-sm font-bold">
                  {stats.xp} XP · {stats.correct} תשובות נכונות · רצף מקסימלי {stats.bestStreak}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleStart}
                  className="flex-1 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 active:scale-[0.97] text-gray-900 font-extrabold rounded-2xl shadow-lg transition-all"
                >
                  🔄 שחק שוב
                </button>
                <button
                  onClick={() => {
                    setScreen("home");
                    setStats(getWW2TanksStats());
                  }}
                  className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 active:scale-[0.97] text-white font-extrabold rounded-2xl transition-all border border-gray-600"
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
