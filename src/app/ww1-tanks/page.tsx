"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  WWI_TANKS,
  WWI_TANKS_XP,
  WWI_CATEGORY_LABELS_HEBREW,
  WWI_COUNTRY_LABELS_HEBREW,
  type WWITank,
} from "@/lib/content/ww1-tanks";
import {
  getWW1TanksProgress,
  markWW1TankCorrect,
  updateWW1Stats,
  getWW1TanksStats,
} from "@/lib/storage/ww1-tanks";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { Confetti } from "@/components/ui/Confetti";
import { AchievementPopup } from "@/components/ui/AchievementPopup";

// ─── Types ────────────────────────────────────────────────────────────────────

type QuizScreen = "home" | "question" | "feedback" | "results";
type FilterMode = "all" | "country" | "type";
type QuestionType = "name" | "country" | "category" | "year";
type WWITankCountry = "UK" | "France" | "Germany" | "USA" | "Italy" | "Russia";

interface Question {
  tank: WWITank;
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

function getUniqueTankNames(exclude: WWITank, tanks: WWITank[], count: number): string[] {
  return shuffle(tanks.filter((t) => t.id !== exclude.id))
    .slice(0, count)
    .map((t) => t.name);
}

function getUniqueCountries(exclude: WWITank, tanks: WWITank[], count: number): string[] {
  const seen = new Set<string>([`${exclude.countryFlag} ${WWI_COUNTRY_LABELS_HEBREW[exclude.country]}`]);
  const result: string[] = [];
  for (const t of shuffle(tanks)) {
    const label = `${t.countryFlag} ${WWI_COUNTRY_LABELS_HEBREW[t.country]}`;
    if (!seen.has(label)) {
      seen.add(label);
      result.push(label);
      if (result.length >= count) break;
    }
  }
  return result;
}

function getUniqueCategories(exclude: WWITank, tanks: WWITank[], count: number): string[] {
  const seen = new Set<string>([WWI_CATEGORY_LABELS_HEBREW[exclude.category]]);
  const result: string[] = [];
  for (const t of shuffle(tanks)) {
    const label = WWI_CATEGORY_LABELS_HEBREW[t.category];
    if (!seen.has(label)) {
      seen.add(label);
      result.push(label);
      if (result.length >= count) break;
    }
  }
  return result;
}

function getYearWrongAnswers(year: number): string[] {
  const offsets = [-2, -1, 1, 2, 3].filter(
    (o) => year + o >= 1914 && year + o <= 1921 && year + o !== year
  );
  const shuffled = offsets.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((o) => String(year + o));
}

const QUESTION_TYPES: QuestionType[] = ["name", "country", "category", "year"];

function buildQuestion(tank: WWITank, type: QuestionType, allTanks: WWITank[]): Question {
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
      const correct = `${tank.countryFlag} ${WWI_COUNTRY_LABELS_HEBREW[tank.country]}`;
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
      const choices = shuffle([WWI_CATEGORY_LABELS_HEBREW[tank.category], ...wrong]);
      return {
        tank,
        type,
        questionText: "מה סוג הטנק הזה?",
        correctAnswer: WWI_CATEGORY_LABELS_HEBREW[tank.category],
        choices,
      };
    }
    case "year": {
      const wrong = getYearWrongAnswers(tank.yearIntroduced);
      const choices = shuffle([String(tank.yearIntroduced), ...wrong]);
      return {
        tank,
        type,
        questionText: "באיזו שנה נכנס לשירות?",
        correctAnswer: String(tank.yearIntroduced),
        choices,
      };
    }
  }
}

function buildSession(tanks: WWITank[]): Question[] {
  return tanks.map((tank, i) => {
    const type = QUESTION_TYPES[i % QUESTION_TYPES.length];
    return buildQuestion(tank, type, WWI_TANKS);
  });
}

// ─── Image Component ──────────────────────────────────────────────────────────

function TankImage({ tank }: { tank: WWITank }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [tank.id]);

  if (error) {
    return (
      <div className="w-full h-64 bg-stone-800 flex flex-col items-center justify-center rounded-t-2xl">
        <span className="text-7xl">🎖️</span>
        <p className="text-stone-400 text-sm mt-2" dir="ltr">{tank.name}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 bg-stone-800 rounded-t-2xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-800 animate-pulse">
          <span className="text-5xl opacity-30">🎖️</span>
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
      <div className="bg-amber-400 text-stone-900 font-extrabold text-lg px-4 py-1.5 rounded-full shadow-lg border-2 border-amber-300">
        +{xp} XP 🎖️
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

interface HomeScreenProps {
  stats: { correct: number; total: number; xp: number; bestStreak: number };
  filter: FilterMode;
  setFilter: (f: FilterMode) => void;
  countryFilter: WWITankCountry | null;
  setCountryFilter: (c: WWITankCountry | null) => void;
  onStart: () => void;
}

const COUNTRIES: { value: WWITankCountry; flag: string; label: string }[] = [
  { value: "UK",      flag: "🇬🇧", label: "בריטניה" },
  { value: "France",  flag: "🇫🇷", label: "צרפת" },
  { value: "Germany", flag: "🇩🇪", label: "גרמניה" },
  { value: "USA",     flag: "🇺🇸", label: "ארצות הברית" },
  { value: "Italy",   flag: "🇮🇹", label: "איטליה" },
  { value: "Russia",  flag: "🇷🇺", label: "רוסיה" },
];

function HomeScreen({
  stats,
  filter,
  setFilter,
  countryFilter,
  setCountryFilter,
  onStart,
}: HomeScreenProps) {
  const countForCountry = (c: WWITankCountry) =>
    WWI_TANKS.filter((t) => t.country === c).length;

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-stone-800 rounded-2xl p-3 text-center border border-stone-700">
          <p className="text-2xl font-extrabold text-green-400">{stats.correct}</p>
          <p className="text-stone-400 text-xs mt-0.5">תשובות נכונות</p>
        </div>
        <div className="bg-stone-800 rounded-2xl p-3 text-center border border-stone-700">
          <p className="text-2xl font-extrabold text-amber-400">{stats.xp}</p>
          <p className="text-stone-400 text-xs mt-0.5">XP נצבר</p>
        </div>
        <div className="bg-stone-800 rounded-2xl p-3 text-center border border-stone-700">
          <p className="text-2xl font-extrabold text-orange-400">{stats.bestStreak}</p>
          <p className="text-stone-400 text-xs mt-0.5">רצף מקסימלי</p>
        </div>
      </div>

      {/* Filter buttons */}
      <div>
        <p className="text-stone-400 text-sm mb-2 font-bold">בחר מצב:</p>
        <div className="flex gap-2">
          {(["all", "country", "type"] as FilterMode[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${
                filter === f
                  ? "bg-amber-600 text-stone-900"
                  : "bg-stone-700 text-stone-300 hover:bg-stone-600"
              }`}
            >
              {f === "all" ? "🎖️ הכל" : f === "country" ? "🌍 לפי מדינה" : "⚙️ לפי סוג"}
            </button>
          ))}
        </div>
      </div>

      {/* Country selector */}
      {filter === "country" && (
        <div>
          <p className="text-stone-400 text-sm mb-2 font-bold">בחר מדינה:</p>
          <div className="grid grid-cols-2 gap-2">
            {COUNTRIES.map((c) => {
              const count = countForCountry(c.value);
              if (count === 0) return null;
              return (
                <button
                  key={c.value}
                  onClick={() =>
                    setCountryFilter(countryFilter === c.value ? null : c.value)
                  }
                  className={`py-2 px-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                    countryFilter === c.value
                      ? "bg-amber-600 text-stone-900"
                      : "bg-stone-700 text-stone-300 hover:bg-stone-600"
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
      <div className="bg-stone-800/50 border border-stone-700 rounded-2xl p-4 text-center">
        <p className="text-stone-300 text-sm">
          {filter === "country" && countryFilter
            ? `${WWI_TANKS.filter((t) => t.country === countryFilter).length} טנקים`
            : `${WWI_TANKS.length} טנקים`}
          {" "}· 4 סוגי שאלות
        </p>
        <p className="text-stone-500 text-xs mt-1">שאלות ישאלו בסדר אקראי</p>
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        className="w-full py-5 bg-gradient-to-r from-amber-700 to-stone-700 hover:from-amber-600 hover:to-stone-600 active:scale-[0.97] text-white font-extrabold text-xl rounded-2xl shadow-xl transition-all border border-amber-600/40"
      >
        🚀 התחל קוויז!
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WW1TanksPage() {
  const router = useRouter();
  const { addPoints } = useProgress();
  const { newlyUnlocked, checkAndUnlock, dismissAchievements } = useAchievements();

  const [screen, setScreen] = useState<QuizScreen>("home");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [countryFilter, setCountryFilter] = useState<WWITankCountry | null>(null);

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
    setStats(getWW1TanksStats());
  }, []);

  const getFilteredTanks = useCallback((): WWITank[] => {
    if (filter === "country" && countryFilter) {
      return WWI_TANKS.filter((t) => t.country === countryFilter);
    }
    return WWI_TANKS;
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
        xpEarned += WWI_TANKS_XP.correct;
        newStreak = streak + 1;
        setStreak(newStreak);

        if (newStreak === 3) xpEarned += WWI_TANKS_XP.streak3;
        else if (newStreak >= 5 && newStreak % 5 === 0) xpEarned += WWI_TANKS_XP.streak5;

        markWW1TankCorrect(q.tank.id);
        setSessionCorrect((prev) => prev + 1);
      } else {
        newStreak = 0;
        setStreak(0);
      }

      updateWW1Stats(correct, xpEarned, newStreak);

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
      const prog = getWW1TanksProgress();
      const uniqueCorrect = prog.correctIds.length;
      if (uniqueCorrect >= WWI_TANKS.length) {
        const bonus = WWI_TANKS_XP.allTanks;
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

      setStats(getWW1TanksStats());
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
    <main className="min-h-screen bg-stone-950 pb-20" dir="rtl">
      {showConfetti && <Confetti />}
      {newlyUnlocked.length > 0 && (
        <AchievementPopup achievements={newlyUnlocked} onClose={dismissAchievements} />
      )}

      {/* ── Header ── */}
      <div className="bg-gradient-to-b from-stone-900 via-stone-800 to-amber-950 px-4 pt-4 pb-5 sticky top-0 z-10 shadow-lg border-b border-stone-700">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="text-stone-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-stone-700"
            aria-label="חזור"
          >
            ← חזור
          </button>
          <h1 className="text-lg font-extrabold text-white flex items-center gap-2">
            <span>🎖️</span>
            <span>טנקי מלחמת העולם ה-1</span>
          </h1>
          {screen === "question" || screen === "feedback" ? (
            <div className="text-amber-400 font-bold text-sm">
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
            <div className="bg-gradient-to-br from-stone-800 to-amber-950 border border-amber-900/40 rounded-3xl p-5 text-center shadow-xl">
              <div className="text-6xl mb-3">🎖️</div>
              <h2 className="text-2xl font-extrabold text-white mb-1">טנקי מלחמת העולם ה-1</h2>
              <p className="text-stone-400 text-sm">זהה את הטנקים הראשונים בהיסטוריה</p>
              <p className="text-stone-500 text-xs mt-1">{WWI_TANKS.length} טנקים · קוויז תמונות</p>
              <div className="flex justify-center gap-4 mt-3 text-2xl">
                <span title="בריטניה">🇬🇧</span>
                <span title="צרפת">🇫🇷</span>
                <span title="גרמניה">🇩🇪</span>
                <span title="ארצות הברית">🇺🇸</span>
                <span title="איטליה">🇮🇹</span>
                <span title="רוסיה">🇷🇺</span>
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
              <div className="flex-1 bg-stone-700 rounded-full h-2.5">
                <div
                  className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-stone-400 text-sm font-bold whitespace-nowrap">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>

            {/* Streak display */}
            {streak >= 2 && (
              <div className="flex items-center justify-center gap-2 bg-amber-900/40 border border-amber-700/50 rounded-xl py-2">
                <span className="text-xl">🔥</span>
                <span className="text-amber-400 font-extrabold">רצף × {streak}</span>
                {streak >= 5 && <span className="text-amber-300 text-sm">מדהים!</span>}
              </div>
            )}

            {/* Question card */}
            <div className="bg-stone-800 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl relative">
              <XPBadge xp={lastXP} show={showXP} />

              {/* Tank image */}
              <TankImage tank={currentQ.tank} />

              {/* Question text */}
              <div className="px-4 pt-4 pb-3">
                <p className="text-white text-xl font-extrabold text-center">
                  {currentQ.questionText}
                </p>
                {currentQ.type === "name" && (
                  <p className="text-stone-500 text-xs text-center mt-1" dir="ltr">
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
                      btnClass += " bg-green-800 border-green-400 text-green-200";
                    } else if (isSelected && !isRight) {
                      btnClass += " bg-red-900 border-red-500 text-red-300";
                    } else {
                      btnClass += " bg-stone-800 border-stone-700 text-stone-500 opacity-50";
                    }
                  } else {
                    btnClass +=
                      " bg-stone-800 border-2 border-stone-600 hover:border-amber-500 hover:bg-stone-700 text-stone-100 active:scale-[0.97]";
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
                  <div className="bg-amber-950/60 border border-amber-800/50 rounded-2xl p-4">
                    <p className="text-amber-500 font-extrabold text-sm mb-1 flex items-center gap-1">
                      <span>⚡</span> עובדה מגניבה
                    </p>
                    <p className="text-amber-100 text-sm leading-relaxed">
                      {currentQ.tank.funFactHebrew}
                    </p>
                    <div className="flex gap-4 mt-2 text-xs text-amber-600/70" dir="ltr">
                      {currentQ.tank.weightTons && <span>⚖️ {currentQ.tank.weightTons}t</span>}
                      {currentQ.tank.crewSize && <span>👤 {currentQ.tank.crewSize} crew</span>}
                      <span>📅 {currentQ.tank.yearIntroduced}</span>
                    </div>
                  </div>
                )}

                {/* Next button */}
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-amber-700 to-stone-700 hover:from-amber-600 hover:to-stone-600 active:scale-[0.97] text-white font-extrabold text-lg rounded-2xl shadow-lg transition-all border border-amber-600/40"
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
            <div className="bg-gradient-to-br from-stone-800 to-amber-950 border border-stone-700 rounded-3xl p-6 text-center shadow-2xl">
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
              <p className="text-stone-400 text-sm mb-4">
                {sessionCorrect >= questions.length * 0.9
                  ? "מדהים! אתה מומחה טנקי מלחמת העולם ה-1!"
                  : sessionCorrect >= questions.length * 0.7
                  ? "כל הכבוד! עוד קצת ואתה מומחה!"
                  : "נסה שוב ותשתפר!"}
              </p>

              {/* Score grid */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-stone-700/60 rounded-2xl p-3">
                  <p className="text-2xl font-extrabold text-green-400">
                    {sessionCorrect}/{questions.length}
                  </p>
                  <p className="text-stone-400 text-xs mt-0.5">נכון</p>
                </div>
                <div className="bg-stone-700/60 rounded-2xl p-3">
                  <p className="text-2xl font-extrabold text-amber-400">+{sessionXP}</p>
                  <p className="text-stone-400 text-xs mt-0.5">XP</p>
                </div>
                <div className="bg-stone-700/60 rounded-2xl p-3">
                  <p className="text-2xl font-extrabold text-orange-400">{streak}</p>
                  <p className="text-stone-400 text-xs mt-0.5">רצף</p>
                </div>
              </div>

              {/* Accuracy bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-stone-500 mb-1">
                  <span>דיוק</span>
                  <span>{Math.round((sessionCorrect / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-stone-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${
                      sessionCorrect / questions.length >= 0.8
                        ? "bg-green-500"
                        : sessionCorrect / questions.length >= 0.5
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.round((sessionCorrect / questions.length) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Total stats */}
              <div className="bg-stone-700/40 rounded-xl p-3 text-center mb-4">
                <p className="text-stone-400 text-xs">סה"כ</p>
                <p className="text-stone-300 text-sm font-bold">
                  {stats.xp} XP · {stats.correct} תשובות נכונות · רצף מקסימלי {stats.bestStreak}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleStart}
                  className="flex-1 py-4 bg-gradient-to-r from-amber-700 to-stone-700 hover:from-amber-600 hover:to-stone-600 active:scale-[0.97] text-white font-extrabold rounded-2xl shadow-lg transition-all border border-amber-600/40"
                >
                  🔄 שחק שוב
                </button>
                <button
                  onClick={() => {
                    setScreen("home");
                    setStats(getWW1TanksStats());
                  }}
                  className="flex-1 py-4 bg-stone-700 hover:bg-stone-600 active:scale-[0.97] text-white font-extrabold rounded-2xl transition-all border border-stone-600"
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
