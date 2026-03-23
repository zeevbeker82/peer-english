"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { useSRS } from "@/hooks/useSRS";
import { LESSONS } from "@/lib/content/lessons";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { xpToNextLevel, getLevelInfo } from "@/lib/storage/progress";
import { getUnlockedIds } from "@/lib/storage/achievements";
import { ACHIEVEMENTS } from "@/lib/content/achievements";
import { getLearnedCount } from "@/lib/storage/advanced-vocab";
import { ADVANCED_TOTAL } from "@/lib/content/advanced-vocabulary";
import { getCompletedCount as getReadingCompletedCount } from "@/lib/storage/advanced-reading";
import { ADV_READING_TOTAL } from "@/lib/content/advanced-readings";
import { getSubmittedCount } from "@/lib/storage/advanced-writing";
import { WRITING_TOTAL } from "@/lib/content/advanced-writing";
import { getCompletedSpeakingCount } from "@/lib/storage/advanced-speaking";
import { ADV_SPEAKING_TOTAL } from "@/lib/content/advanced-speaking";
import { getCompletedTopicsCount } from "@/lib/storage/advanced-grammar";
import { ADV_GRAMMAR_TOTAL_TOPICS } from "@/lib/content/advanced-grammar";
import { getCompletedChallengesCount } from "@/lib/storage/weekly-challenges";
import { CHALLENGE_TOTAL } from "@/lib/content/weekly-challenges";
import { getTotalGamesPlayed } from "@/lib/storage/advanced-games";
import { getCEFR } from "@/lib/storage/dashboard";
import { getPronStats } from "@/lib/storage/pronunciation";
import { getSpeakingGamesStats } from "@/lib/storage/speaking-games";
import { getWW2TanksStats } from "@/lib/storage/ww2-tanks";
import { getWW1TanksStats } from "@/lib/storage/ww1-tanks";
import { getIsraelWarsTanksStats } from "@/lib/storage/israel-wars-tanks";

// ─── Module definitions ─────────────────────────────────────────────────────
const MODULES = [
  {
    href: "/",
    scrollTo: "lessons",
    icon: "📚",
    title_he: "שיעורים",
    desc_he: "16 שיעורים עם תרגילים",
    color: "from-blue-400 to-blue-600",
    isAnchor: true,
  },
  {
    href: "/grammar",
    icon: "📖",
    title_he: "דקדוק",
    desc_he: "18 נושאי דקדוק",
    color: "from-green-400 to-emerald-600",
    isAnchor: false,
  },
  {
    href: "/reading",
    icon: "🔍",
    title_he: "קריאה",
    desc_he: "58 טקסטים ב-3 רמות",
    color: "from-purple-400 to-violet-600",
    isAnchor: false,
  },
  {
    href: "/writing",
    icon: "✍️",
    title_he: "כתיבה",
    desc_he: "8 נושאי כתיבה",
    color: "from-orange-400 to-amber-500",
    isAnchor: false,
  },
  {
    href: "/speaking",
    icon: "🎤",
    title_he: "דיבור",
    desc_he: "ביטויים, דיאלוגים ושאלות",
    color: "from-pink-400 to-rose-600",
    isAnchor: false,
  },
  {
    href: "/dictionary",
    icon: "🗂️",
    title_he: "מילון",
    desc_he: "500+ מילים עם חזרה",
    color: "from-teal-400 to-cyan-600",
    isAnchor: false,
  },
  {
    href: "/achievements",
    icon: "🏆",
    title_he: "הישגים",
    desc_he: "פרסים ואתגרים",
    color: "from-yellow-400 to-amber-500",
    isAnchor: false,
  },
  {
    href: "/advanced",
    icon: "🎓",
    title_he: "Advanced B1",
    desc_he: "100 מילים מתקדמות",
    color: "from-indigo-500 to-purple-600",
    isAnchor: false,
  },
  {
    href: "/advanced-reading",
    icon: "📖",
    title_he: "קריאה מתקדמת",
    desc_he: "15 טקסטים + חידונים",
    color: "from-violet-500 to-indigo-600",
    isAnchor: false,
  },
  {
    href: "/advanced-writing",
    icon: "✍️",
    title_he: "כתיבה יצירתית",
    desc_he: "20 פעילויות כתיבה",
    color: "from-rose-500 to-pink-600",
    isAnchor: false,
  },
  {
    href: "/advanced-speaking",
    icon: "🎙️",
    title_he: "דיבור מתקדם",
    desc_he: "20 שיחות אינטראקטיביות",
    color: "from-indigo-500 to-purple-600",
    isAnchor: false,
  },
  {
    href: "/advanced-grammar",
    icon: "📐",
    title_he: "דקדוק מתקדם B1",
    desc_he: "6 נושאים · 15 תרגילים + quiz",
    color: "from-slate-600 to-slate-800",
    isAnchor: false,
  },
  {
    href: "/weekly-challenges",
    icon: "🏆",
    title_he: "אתגרים שבועיים",
    desc_he: "10 אתגרים · 100 XP + תעודות",
    color: "from-amber-400 to-yellow-500",
    isAnchor: false,
  },
  {
    href: "/advanced-games",
    icon: "🎮",
    title_he: "משחקים מתקדמים",
    desc_he: "6 משחקים · Easy/Medium/Hard",
    color: "from-violet-500 to-purple-700",
    isAnchor: false,
  },
  {
    href: "/pronunciation",
    icon: "🗣️",
    title_he: "אימון הגייה",
    desc_he: "Shadow Me · מפשלי לשון · זוגות",
    color: "from-orange-400 to-amber-500",
    isAnchor: false,
  },
  {
    href: "/speaking-games",
    icon: "🎮",
    title_he: "משחקי דיבור",
    desc_he: "תאר · ספר · שאלת היום · שרשרת",
    color: "from-teal-400 to-cyan-600",
    isAnchor: false,
  },
  {
    href: "/dashboard",
    icon: "📊",
    title_he: "דשבורד התקדמות",
    desc_he: "CEFR · גרפים · יעדים · דוח",
    color: "from-cyan-500 to-teal-600",
    isAnchor: false,
  },
  {
    href: "/ww2-tanks",
    icon: "🪖",
    title_he: 'טנקי מלח"ע 2',
    desc_he: "58 טנקים · קוויז תמונות",
    color: "from-gray-700 to-gray-900",
    isAnchor: false,
  },
  {
    href: "/ww1-tanks",
    icon: "🎖️",
    title_he: 'טנקי מלח"ע 1',
    desc_he: "~18 טנקים · קוויז תמונות",
    color: "from-stone-700 to-amber-900",
    isAnchor: false,
  },
  {
    href: "/israel-wars-tanks",
    icon: "🇮🇱",
    title_he: "טנקי מלחמות ישראל",
    desc_he: "4 מלחמות · ישראל ועולם הערבי",
    color: "from-blue-700 to-blue-900",
    isAnchor: false,
  },
] as const;

// ─── Star rating ─────────────────────────────────────────────────────────────
function StarRating({ score }: { score: number }) {
  const stars: 1 | 2 | 3 = score >= 90 ? 3 : score >= 60 ? 2 : 1;
  return (
    <span className="text-sm">
      {[1, 2, 3].map((s) => (
        <span key={s} style={{ opacity: s <= stars ? 1 : 0.25 }}>⭐</span>
      ))}
    </span>
  );
}

// ─── Home page ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const { progress } = useProgress();
  const { dueCount } = useSRS();
  const [unlockedCount,      setUnlockedCount]      = useState(0);
  const [advLearnedCount,    setAdvLearnedCount]    = useState(0);
  const [readingDoneCount,   setReadingDoneCount]   = useState(0);
  const [writingDoneCount,   setWritingDoneCount]   = useState(0);
  const [advSpeakingCount,   setAdvSpeakingCount]   = useState(0);
  const [grammarDoneCount,   setGrammarDoneCount]   = useState(0);
  const [challengesDoneCount, setChallengesDoneCount] = useState(0);
  const [gamesPlayedCount,    setGamesPlayedCount]    = useState(0);
  const [pronXP, setPronXP] = useState(0);
  const [speakingGamesXP, setSpeakingGamesXP] = useState(0);
  const [tanksXP, setTanksXP] = useState(0);
  const [ww1TanksXP, setWW1TanksXP] = useState(0);
  const [israelWarsTanksXP, setIsraelWarsTanksXP] = useState(0);

  useEffect(() => {
    setUnlockedCount(getUnlockedIds().length);
    setAdvLearnedCount(getLearnedCount());
    setReadingDoneCount(getReadingCompletedCount());
    setWritingDoneCount(getSubmittedCount());
    setAdvSpeakingCount(getCompletedSpeakingCount());
    setGrammarDoneCount(getCompletedTopicsCount());
    setChallengesDoneCount(getCompletedChallengesCount());
    setGamesPlayedCount(getTotalGamesPlayed());
    const pronStats = getPronStats();
    setPronXP(pronStats.totalXP);
    const sgStats = getSpeakingGamesStats();
    setSpeakingGamesXP(sgStats.totalXP);
    const tanksStats = getWW2TanksStats();
    setTanksXP(tanksStats.xp);
    const ww1Stats = getWW1TanksStats();
    setWW1TanksXP(ww1Stats.xp);
    const israelStats = getIsraelWarsTanksStats();
    setIsraelWarsTanksXP(israelStats.xp);
  }, []);

  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white">
        <div className="text-5xl animate-bounce">📚</div>
      </div>
    );
  }

  const nextLesson = LESSONS.find((l) => !progress.completedLessons.includes(l.id));
  const completedCount = progress.completedLessons.length;
  const xpNeeded = xpToNextLevel(progress);
  const levelInfo = getLevelInfo(progress.totalXP);

  // XP progress within current level
  const xpInLevel = progress.totalXP - levelInfo.min;
  const xpForLevel = levelInfo.max === Infinity ? 0 : (levelInfo.max as number) - levelInfo.min + 1;
  const xpPercent = xpForLevel > 0 ? Math.min(100, Math.round((xpInLevel / xpForLevel) * 100)) : 100;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-white pb-20" dir="rtl">
      {/* ── Top nav ── */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-xl font-extrabold text-blue-700 flex items-center gap-2">
          <span>🎓</span> פאר אנגלית
        </h1>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            aria-label="דשבורד"
            className="text-2xl hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-teal-300 rounded-full p-1"
          >
            📊
          </Link>
          <Link
            href="/achievements"
            aria-label="הישגים"
            className="text-2xl hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-full p-1"
          >
            🏆
          </Link>
          <Link
            href="/settings"
            aria-label="הגדרות"
            className="text-2xl hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
          >
            ⚙️
          </Link>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">

        {/* ── Hero: greeting + level + streak ── */}
        <div className="bg-gradient-to-l from-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-2xl font-extrabold">שלום! 👋</h2>
              <p className="text-white/75 text-sm mt-0.5">בואו נלמד אנגלית היום</p>
            </div>
            {/* Streak */}
            <div className="flex flex-col items-center bg-white/15 rounded-2xl px-4 py-2">
              <span className="text-3xl">🔥</span>
              <span className="font-extrabold text-xl leading-none mt-1">{progress.streak}</span>
              <span className="text-white/70 text-xs">ימים</span>
            </div>
          </div>

          {/* Level & XP bar */}
          <div className="bg-white/10 rounded-2xl p-3">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">{levelInfo.emoji}</span>
                <span className="font-extrabold text-lg">{levelInfo.label}</span>
              </div>
              <span className="text-white/70 text-sm font-bold">{progress.totalXP} נקודות</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-yellow-300 h-3 rounded-full transition-all duration-700"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            {xpNeeded > 0 ? (
              <p className="text-white/60 text-xs mt-1 text-left">{xpNeeded} נקודות לרמה הבאה</p>
            ) : (
              <p className="text-yellow-300 text-xs mt-1 font-bold text-center">🏆 רמה מקסימלית!</p>
            )}
          </div>
        </div>

        {/* ── Quick stats ── */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-2.5 text-center">
            <p className="text-xl font-extrabold text-blue-600">{completedCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">שיעורים</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-2.5 text-center">
            <p className="text-xl font-extrabold text-orange-500">{dueCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">לחזרה</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-2.5 text-center">
            <p className="text-xl font-extrabold text-purple-600">{progress.totalXP}</p>
            <p className="text-xs text-gray-500 mt-0.5">נקודות</p>
          </div>
          <Link href="/achievements">
            <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 p-2.5 text-center h-full flex flex-col items-center justify-center cursor-pointer hover:border-yellow-300 transition-colors">
              <p className="text-xl font-extrabold text-yellow-600">{unlockedCount}</p>
              <p className="text-xs text-gray-500 mt-0.5">הישגים</p>
            </div>
          </Link>
        </div>

        {/* ── Module navigation ── */}
        <div>
          <h3 className="font-extrabold text-gray-700 text-base mb-3 flex items-center gap-2">
            <span>🧩</span> מודולי לימוד
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {MODULES.map((mod) => {
              const content = (
                <div
                  className={`bg-gradient-to-br ${mod.color} rounded-3xl p-4 text-white shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-150 text-right h-full`}
                >
                  <span className="text-4xl block mb-2">{mod.icon}</span>
                  <p className="font-extrabold text-base leading-tight">{mod.title_he}</p>
                  <p className="text-white/70 text-xs mt-1">{mod.desc_he}</p>
                  {mod.href === "/" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{completedCount}/{LESSONS.length} ✓</span>
                    </div>
                  )}
                  {mod.href === "/dictionary" && dueCount > 0 && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{dueCount} לחזרה 🔔</span>
                    </div>
                  )}
                  {mod.href === "/achievements" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{unlockedCount}/{ACHIEVEMENTS.length} 🏅</span>
                    </div>
                  )}
                  {mod.href === "/advanced" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{advLearnedCount}/{ADVANCED_TOTAL} מילים ✓</span>
                    </div>
                  )}
                  {mod.href === "/advanced-reading" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{readingDoneCount}/{ADV_READING_TOTAL} טקסטים ✓</span>
                    </div>
                  )}
                  {mod.href === "/advanced-writing" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{writingDoneCount}/{WRITING_TOTAL} פעילויות ✓</span>
                    </div>
                  )}
                  {mod.href === "/advanced-speaking" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{advSpeakingCount}/{ADV_SPEAKING_TOTAL} שיחות ✓</span>
                    </div>
                  )}
                  {mod.href === "/advanced-grammar" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{grammarDoneCount}/{ADV_GRAMMAR_TOTAL_TOPICS} נושאים ✓</span>
                    </div>
                  )}
                  {mod.href === "/weekly-challenges" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{challengesDoneCount}/{CHALLENGE_TOTAL} אתגרים ✓</span>
                    </div>
                  )}
                  {mod.href === "/advanced-games" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{gamesPlayedCount > 0 ? `${gamesPlayedCount} סיבובים 🎮` : "חדש! 🎮"}</span>
                    </div>
                  )}
                  {mod.href === "/pronunciation" && pronXP > 0 && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{pronXP} XP 🗣️</span>
                    </div>
                  )}
                  {mod.href === "/speaking-games" && speakingGamesXP > 0 && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">{speakingGamesXP} XP 🎮</span>
                    </div>
                  )}
                  {mod.href === "/dashboard" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">רמה {getCEFR(progress.totalXP).level} 📊</span>
                    </div>
                  )}
                  {mod.href === "/ww2-tanks" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">
                        {tanksXP > 0 ? `${tanksXP} XP 🪖` : "חדש! 🔥"}
                      </span>
                    </div>
                  )}
                  {mod.href === "/ww1-tanks" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">
                        {ww1TanksXP > 0 ? `${ww1TanksXP} XP 🎖️` : "חדש! 🎖️"}
                      </span>
                    </div>
                  )}
                  {mod.href === "/israel-wars-tanks" && (
                    <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                      <span className="text-xs font-bold">
                        {israelWarsTanksXP > 0 ? `${israelWarsTanksXP} XP 🇮🇱` : "חדש! 🇮🇱"}
                      </span>
                    </div>
                  )}
                </div>
              );

              if ("isAnchor" in mod && mod.isAnchor) {
                return (
                  <a key={mod.title_he} href="#lessons">
                    {content}
                  </a>
                );
              }
              return (
                <Link key={mod.href} href={mod.href}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Today's mission ── */}
        <div>
          <h3 className="font-extrabold text-gray-700 text-base mb-2 flex items-center gap-2">
            <span>🎯</span> המשימה של היום
          </h3>
          {nextLesson ? (
            <Link href={`/lesson/${nextLesson.id}`}>
              <div
                className={`bg-gradient-to-l ${nextLesson.color} rounded-3xl p-5 shadow-lg text-white cursor-pointer hover:scale-[1.02] active:scale-[0.99] transition-transform`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{nextLesson.icon}</span>
                  <div className="flex-1">
                    <p className="font-extrabold text-xl">{nextLesson.title_he}</p>
                    <p className="text-white/80 text-sm" dir="ltr">{nextLesson.subtitle_he}</p>
                    <p className="text-white/65 text-xs mt-1">{nextLesson.objective_he}</p>
                  </div>
                  <span className="text-white/70 text-2xl">←</span>
                </div>
                <div className="flex items-center gap-3 mt-3 text-white/80 text-sm">
                  <span>⏱ {nextLesson.estimatedMinutes} דקות</span>
                  <span>•</span>
                  <span>{nextLesson.exerciseIds.length} תרגילים</span>
                  <span>•</span>
                  <span>+{50 + nextLesson.exerciseIds.length * 10} נקודות</span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 text-center">
              <p className="text-4xl mb-2">🏆</p>
              <p className="font-extrabold text-gray-800 text-lg">סיימת את כל השיעורים!</p>
              <p className="text-gray-400 text-sm mt-1">מעולה! תמשיך לדקדוק וקריאה</p>
            </div>
          )}
        </div>

        {/* ── All lessons ── */}
        <div id="lessons">
          <h3 className="font-extrabold text-gray-700 text-base mb-3 flex items-center gap-2">
            <span>📋</span> כל השיעורים
          </h3>
          <div className="space-y-2.5">
            {LESSONS.map((lesson) => {
              const done = progress.completedLessons.includes(lesson.id);
              const score = progress.lessonScores[lesson.id];
              return (
                <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${lesson.color} shadow-sm flex-shrink-0`}
                    >
                      {lesson.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-gray-800">{lesson.title_he}</p>
                      <p className="text-xs text-gray-400" dir="ltr">{lesson.subtitle_he}</p>
                      {done && score !== undefined && (
                        <div className="mt-1.5">
                          <ProgressBar value={score} size="sm" color="green" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      {done ? (
                        <>
                          <StarRating score={score ?? 0} />
                          {score !== undefined && (
                            <span className="text-xs text-gray-400">{score}%</span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-300 text-xl">→</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Footer links ── */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          <Link href="/dictionary">
            <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-4 text-center cursor-pointer hover:shadow-md hover:border-teal-300 transition-all">
              <p className="text-3xl mb-1">🗂️</p>
              <p className="font-bold text-gray-700 text-sm">מילון SRS</p>
              {dueCount > 0 && (
                <p className="text-xs text-orange-500 font-bold mt-0.5">{dueCount} ממתינים</p>
              )}
            </div>
          </Link>
          <Link href="/achievements">
            <div className="bg-white rounded-2xl border border-yellow-100 shadow-sm p-4 text-center cursor-pointer hover:shadow-md hover:border-yellow-300 transition-all">
              <p className="text-3xl mb-1">🏆</p>
              <p className="font-bold text-gray-700 text-sm">הישגים</p>
              <p className="text-xs text-yellow-600 font-bold mt-0.5">{unlockedCount} פתוחים</p>
            </div>
          </Link>
          <Link href="/settings">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center cursor-pointer hover:shadow-md transition-all">
              <p className="text-3xl mb-1">⚙️</p>
              <p className="font-bold text-gray-700 text-sm">הגדרות</p>
              <p className="text-xs text-gray-400 mt-0.5">קול, גודל</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
