"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import {
  getCEFR, buildWeeklyData, weeklyTotal,
  getDashboardData, setGoal, clearGoal, markGoalCelebrated,
  type DayXP, type GoalType, type GoalSnapshot,
} from "@/lib/storage/dashboard";
import { getLearnedCount }          from "@/lib/storage/advanced-vocab";
import { getCompletedCount as getAdvReadingCount } from "@/lib/storage/advanced-reading";
import { getSubmittedCount }         from "@/lib/storage/advanced-writing";
import { getCompletedSpeakingCount } from "@/lib/storage/advanced-speaking";
import { getCompletedTopicsCount }   from "@/lib/storage/advanced-grammar";
import { getCompletedChallengesCount } from "@/lib/storage/weekly-challenges";
import { getTotalGamesPlayed }        from "@/lib/storage/advanced-games";
import { useAchievements } from "@/hooks/useAchievements";

// ─────────────────────────────────────────────────────────────────────────────
// Types & helpers
// ─────────────────────────────────────────────────────────────────────────────

type Tab = "overview" | "charts" | "goals" | "report";

interface SkillScore { key: string; label: string; label_en: string; icon: string; score: number; color: string; }

function computeSkills(p: NonNullable<ReturnType<typeof useProgress>["progress"]>, extras: {
  advVocab: number; advReading: number; advWriting: number; advSpeaking: number; advGrammar: number;
}): SkillScore[] {
  const vocab   = Math.min(100, Math.round((Math.min(p.wordsLearned, 150) / 150 * 60) + (extras.advVocab / 100 * 40)));
  const grammar = Math.min(100, Math.round((p.grammarDone / 253 * 60) + (extras.advGrammar / 6 * 40)));
  const reading = Math.min(100, Math.round((p.readingDone / 58 * 60) + (extras.advReading / 15 * 40)));
  const writing = Math.min(100, Math.round((p.writingDone / 8 * 35) + (extras.advWriting / 20 * 65)));
  const speaking = Math.min(100, Math.round((p.speakingDone / 47 * 50) + (extras.advSpeaking / 20 * 50)));
  return [
    { key:"vocab",   label:"אוצר מילים", label_en:"Vocabulary", icon:"📚", score:vocab,   color:"bg-blue-500"   },
    { key:"grammar", label:"דקדוק",       label_en:"Grammar",    icon:"📐", score:grammar, color:"bg-purple-500" },
    { key:"reading", label:"קריאה",       label_en:"Reading",    icon:"🔍", score:reading, color:"bg-emerald-500"},
    { key:"writing", label:"כתיבה",       label_en:"Writing",    icon:"✍️", score:writing, color:"bg-rose-500"   },
    { key:"speaking",label:"דיבור",       label_en:"Speaking",   icon:"🎤", score:speaking,color:"bg-amber-500"  },
  ];
}

const GOAL_META: Record<GoalType, { label: string; unit: string; options: number[]; getProgress: (p: NonNullable<ReturnType<typeof useProgress>["progress"]>, snap: GoalSnapshot) => number }> = {
  xp:        { label:"לצבור נקודות XP",          unit:"נקודות",  options:[50,100,200,300,500],  getProgress:(p,s) => p.totalXP     - s.totalXP },
  words:     { label:"ללמוד מילים חדשות",         unit:"מילים",   options:[10,20,30,50],         getProgress:(p,s) => p.wordsLearned - s.wordsLearned },
  reading:   { label:"לקרוא טקסטים",             unit:"טקסטים",  options:[3,5,10,15],           getProgress:(p,s) => p.readingDone  - s.readingDone },
  speaking:  { label:"לתרגל דיבור",              unit:"פעמים",   options:[3,5,10],              getProgress:(p,s) => p.speakingDone - s.speakingDone },
  exercises: { label:"להשלים תרגילים",            unit:"תרגילים", options:[20,50,100,200],       getProgress:(p,s) => p.correctAnswers - s.correctAnswers },
};

function getMondayISO(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

// ─────────────────────────────────────────────────────────────────────────────
// Vertical bar chart
// ─────────────────────────────────────────────────────────────────────────────
function BarChart({ days, compare }: { days: DayXP[]; compare?: DayXP[] }) {
  const maxXP = Math.max(...days.map((d) => d.xp), ...(compare?.map((d) => d.xp) ?? []), 10);
  return (
    <div className="flex items-end gap-1 h-32 pt-2">
      {days.map((d, i) => {
        const pct = (d.xp / maxXP) * 100;
        const cPct = compare ? ((compare[i]?.xp ?? 0) / maxXP) * 100 : null;
        return (
          <div key={d.isoDate} className="flex-1 flex flex-col items-center gap-0.5 h-full">
            {/* Value label */}
            {d.xp > 0 && (
              <span className="text-[9px] text-blue-600 font-bold">{d.xp}</span>
            )}
            {/* Bar area */}
            <div className="flex-1 w-full flex items-end gap-0.5 justify-center">
              {/* Current week bar */}
              <div className="flex-1 rounded-t transition-all" style={{
                height: `${pct}%`,
                background: d.isToday ? "#3b82f6" : "#93c5fd",
                minHeight: d.xp > 0 ? "4px" : "0px",
              }} />
              {/* Last week bar (comparison) */}
              {cPct !== null && (
                <div className="flex-1 rounded-t opacity-40" style={{
                  height: `${cPct}%`,
                  background: "#6b7280",
                  minHeight: (compare?.[i]?.xp ?? 0) > 0 ? "4px" : "0px",
                }} />
              )}
            </div>
            {/* Day label */}
            <span className={`text-[10px] font-medium ${d.isToday ? "text-blue-700" : "text-gray-400"}`}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Horizontal skill bar
// ─────────────────────────────────────────────────────────────────────────────
function SkillBar({ skill, animate = true }: { skill: SkillScore; animate?: boolean }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center gap-1.5 font-medium text-gray-700">
          <span>{skill.icon}</span> {skill.label}
        </span>
        <span className={`font-bold text-sm ${skill.score >= 70 ? "text-green-600" : skill.score >= 40 ? "text-amber-600" : "text-red-500"}`}>
          {skill.score}%
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${skill.color} rounded-full transition-all duration-700`}
          style={{ width: animate ? `${skill.score}%` : "0%" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Overview tab
// ─────────────────────────────────────────────────────────────────────────────
function OverviewTab({ skills, totalXP, streak, bestStreak, stats }: {
  skills: SkillScore[];
  totalXP: number;
  streak: number;
  bestStreak: number;
  stats: { wordsLearned: number; correctAnswers: number; readingDone: number; speakingDone: number; gamesPlayed: number; challengesDone: number; };
}) {
  const sorted = [...skills].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 3);
  const weaknesses = [...skills].sort((a, b) => a.score - b.score).slice(0, 3);

  const recommendations: Record<string, string> = {
    vocab:   "כנס למילון ותרגל מילים חדשות עם SRS",
    grammar: "כנס לדקדוק ועבוד על הנושאים הפתוחים",
    reading: "קרא 2-3 טקסטים היום באזור הקריאה",
    writing: "כתוב פסקה קצרה בכתיבה היצירתית",
    speaking: "שוחח 10 דקות עם Buddy האנגלי",
  };

  return (
    <div className="space-y-5">
      {/* Skill bars */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📊</span> רמה לפי מיומנות
        </h2>
        <div className="space-y-3">
          {skills.map((s) => <SkillBar key={s.key} skill={s} />)}
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <h2 className="font-bold text-green-800 mb-3 flex items-center gap-2">
          <span>💪</span> 3 החוזקות שלי
        </h2>
        <div className="space-y-2">
          {strengths.map((s, i) => (
            <div key={s.key} className="flex items-center gap-3 bg-white/60 rounded-xl p-2.5">
              <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
              <span className="text-2xl">{s.icon}</span>
              <div className="flex-1">
                <span className="font-semibold text-green-800">{s.label}</span>
                <span className="text-xs text-green-600 mr-2">({s.label_en})</span>
              </div>
              <span className="font-bold text-green-700">{s.score}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weaknesses + recommendations */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <h2 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
          <span>🎯</span> 3 נושאים לשיפור
        </h2>
        <div className="space-y-3">
          {weaknesses.map((s) => (
            <div key={s.key} className="bg-white/60 rounded-xl p-2.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{s.icon}</span>
                <span className="font-semibold text-amber-800">{s.label}</span>
                <span className="text-amber-600 text-sm">{s.score}%</span>
              </div>
              <p className="text-xs text-amber-700">
                💡 {recommendations[s.key]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📈</span> סטטיסטיקות כלליות
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { val: Math.min(stats.wordsLearned, 9999), label: "מילים שנלמדו",  icon: "📚", color: "text-blue-600" },
            { val: stats.correctAnswers,               label: "תרגילים נכונים", icon: "✅", color: "text-green-600" },
            { val: stats.readingDone,                  label: "טקסטים נקראו",   icon: "📖", color: "text-purple-600" },
            { val: stats.speakingDone,                 label: "שיחות דיבור",    icon: "🎤", color: "text-pink-600" },
            { val: streak,                             label: "רצף נוכחי",      icon: "🔥", color: "text-orange-600" },
            { val: bestStreak,                         label: "רצף שיא",        icon: "👑", color: "text-amber-600" },
            { val: stats.gamesPlayed,                  label: "סיבובי משחק",    icon: "🎮", color: "text-indigo-600" },
            { val: stats.challengesDone,               label: "אתגרים הושלמו",  icon: "🏆", color: "text-yellow-600" },
            { val: totalXP,                            label: "נקודות XP",      icon: "⭐", color: "text-rose-600"   },
          ].map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-2.5 text-center">
              <div className="text-xl mb-0.5">{s.icon}</div>
              <div className={`font-extrabold text-lg leading-tight ${s.color}`}>{s.val.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Charts tab
// ─────────────────────────────────────────────────────────────────────────────
function ChartsTab({ thisWeek, lastWeek, skills }: { thisWeek: DayXP[]; lastWeek: DayXP[]; skills: SkillScore[]; }) {
  const thisTotal = weeklyTotal(thisWeek);
  const lastTotal = weeklyTotal(lastWeek);
  const diff = thisTotal - lastTotal;
  const diffPct = lastTotal > 0 ? Math.round((diff / lastTotal) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Weekly XP chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-start mb-3">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <span>📅</span> XP השבוע
          </h2>
          <div className="text-right">
            <div className="font-bold text-blue-600 text-lg">{thisTotal} XP</div>
            {lastTotal > 0 && (
              <div className={`text-xs font-medium ${diff >= 0 ? "text-green-600" : "text-red-500"}`}>
                {diff >= 0 ? "▲" : "▼"} {Math.abs(diffPct)}% לעומת שבוע שעבר
              </div>
            )}
          </div>
        </div>
        <BarChart days={thisWeek} compare={lastWeek} />
        {lastTotal > 0 && (
          <div className="flex gap-4 mt-2 text-xs justify-center">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-400" /> השבוע</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gray-300" /> שבוע שעבר</div>
          </div>
        )}
      </div>

      {/* Last week comparison table */}
      {lastTotal > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🔄</span> השוואה שבועית
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <div className="text-xs text-blue-600 mb-1">השבוע</div>
              <div className="font-extrabold text-2xl text-blue-700">{thisTotal}</div>
              <div className="text-xs text-blue-500">XP</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">שבוע שעבר</div>
              <div className="font-extrabold text-2xl text-gray-600">{lastTotal}</div>
              <div className="text-xs text-gray-400">XP</div>
            </div>
          </div>
          <div className={`mt-3 text-center p-2 rounded-xl text-sm font-bold ${
            diff > 0 ? "bg-green-50 text-green-700" : diff < 0 ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"
          }`}>
            {diff > 0 ? `🎉 שיפור של ${diffPct}% לעומת שבוע שעבר!` :
             diff < 0 ? `📉 ${Math.abs(diffPct)}% פחות השבוע — אפשר לשפר!` :
             "➡️ אותה רמה כמו שבוע שעבר"}
          </div>
        </div>
      )}

      {/* Skill chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🎯</span> פרופיל מיומנויות
        </h2>
        <div className="space-y-3">
          {[...skills].sort((a, b) => b.score - a.score).map((s) => (
            <SkillBar key={s.key} skill={s} />
          ))}
        </div>
        {/* Spider-like visual using stacked area */}
        <div className="mt-4 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 text-center mb-2">ניקוד ממוצע: {Math.round(skills.reduce((s, k) => s + k.score, 0) / skills.length)}%</p>
          <div className="flex justify-around">
            {skills.map((s) => (
              <div key={s.key} className="flex flex-col items-center gap-1">
                <div className="text-xl">{s.icon}</div>
                <div className="w-8 bg-gray-200 rounded-full overflow-hidden" style={{ height: "40px" }}>
                  <div
                    className={`w-full ${s.color} rounded-full transition-all duration-700`}
                    style={{ height: `${s.score}%`, marginTop: `${100 - s.score}%` }}
                  />
                </div>
                <div className="text-[10px] font-bold text-gray-600">{s.score}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Goals tab
// ─────────────────────────────────────────────────────────────────────────────
function GoalsTab({
  progress,
}: {
  progress: NonNullable<ReturnType<typeof useProgress>["progress"]>;
}) {
  const [goalData, setGoalData] = useState(() => getDashboardData());
  const [showSetter, setShowSetter] = useState(false);
  const [selectedType, setSelectedType] = useState<GoalType>("xp");
  const [selectedTarget, setSelectedTarget] = useState(100);
  const [celebrated, setCelebrated] = useState(false);
  const { checkAndUnlock } = useAchievements();

  const goal = goalData.goal;
  const meta = goal ? GOAL_META[goal.type] : null;
  const current = goal && meta ? meta.getProgress(progress, goal.snapshot) : 0;
  const pct = goal ? Math.min(100, Math.round((Math.max(0, current) / goal.target) * 100)) : 0;
  const achieved = pct >= 100;

  // Celebrate
  useEffect(() => {
    if (achieved && goal && !goal.celebrated && !celebrated) {
      setCelebrated(true);
      markGoalCelebrated();
      setGoalData(getDashboardData());
      checkAndUnlock();
    }
  }, [achieved, goal, celebrated, checkAndUnlock]);

  function handleSetGoal() {
    const snapshot: GoalSnapshot = {
      totalXP: progress.totalXP,
      wordsLearned: progress.wordsLearned,
      correctAnswers: progress.correctAnswers,
      readingDone: progress.readingDone,
      speakingDone: progress.speakingDone,
    };
    setGoal(selectedType, selectedTarget, snapshot);
    setGoalData(getDashboardData());
    setShowSetter(false);
  }

  return (
    <div className="space-y-5">
      {/* Current goal */}
      {goal && meta ? (
        <div className={`rounded-2xl p-5 border-2 ${achieved ? "bg-green-50 border-green-300" : "bg-white border-blue-200 shadow-sm"}`}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">היעד שלי:</div>
              <h3 className="font-bold text-gray-900 text-lg">{meta.label}</h3>
              <p className="text-sm text-gray-500">יעד: {goal.target} {meta.unit}</p>
            </div>
            <button onClick={() => { clearGoal(); setGoalData(getDashboardData()); }}
              className="text-gray-300 hover:text-red-400 text-xl transition">✕</button>
          </div>

          {/* Progress */}
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 font-medium">{Math.max(0, current)} / {goal.target} {meta.unit}</span>
              <span className={`font-bold ${achieved ? "text-green-600" : "text-blue-600"}`}>{pct}%</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${achieved ? "bg-green-500" : "bg-blue-500"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            {!achieved && (
              <p className="text-xs text-gray-400 mt-1">
                עוד {goal.target - Math.max(0, current)} {meta.unit} ליעד!
              </p>
            )}
          </div>

          {/* Achieved */}
          {achieved && (
            <div className="bg-green-100 rounded-xl p-3 text-center">
              <div className="text-3xl mb-1">🎉</div>
              <p className="font-bold text-green-800">כל הכבוד! השגת את היעד שלך!</p>
              <button
                onClick={() => { clearGoal(); setGoalData(getDashboardData()); setShowSetter(true); }}
                className="mt-2 text-sm text-green-700 underline"
              >
                הגדר יעד חדש
              </button>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-2">הוגדר ב-{goal.setDate}</p>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-2">🎯</div>
          <h3 className="font-bold text-gray-800 mb-1">הגדר יעד שבועי</h3>
          <p className="text-sm text-gray-500 mb-4">בחר יעד ועקוב אחרי ההתקדמות שלך</p>
          <button
            onClick={() => setShowSetter(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition"
          >
            + הגדר יעד
          </button>
        </div>
      )}

      {/* Goal setter */}
      {showSetter && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">בחר סוג יעד:</h3>
          <div className="space-y-2 mb-4">
            {(Object.keys(GOAL_META) as GoalType[]).map((t) => (
              <button
                key={t}
                onClick={() => { setSelectedType(t); setSelectedTarget(GOAL_META[t].options[1]); }}
                className={`w-full p-3 rounded-xl text-right transition ${
                  selectedType === t
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="font-medium">{GOAL_META[t].label}</span>
              </button>
            ))}
          </div>

          <h3 className="font-bold text-gray-800 mb-2">בחר כמות:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {GOAL_META[selectedType].options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedTarget(opt)}
                className={`px-4 py-2 rounded-full font-bold transition ${
                  selectedTarget === opt
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {opt} {GOAL_META[selectedType].unit}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSetGoal}
              className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
            >
              ✓ הגדר יעד
            </button>
            <button
              onClick={() => setShowSetter(false)}
              className="px-4 py-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* Motivation */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <h3 className="font-bold text-amber-800 mb-2">💡 טיפים להצלחה</h3>
        <ul className="space-y-1.5 text-sm text-amber-700">
          <li>⏰ 15-20 דקות ביום עדיף על שעה פעם בשבוע</li>
          <li>🔁 חזרה יומית על מילים חדשות = SRS במילון</li>
          <li>🎯 יעד קטן שמושג = מוטיבציה גדולה</li>
          <li>🌟 כל יום ברצף = בונוס ניקוד!</li>
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Report tab
// ─────────────────────────────────────────────────────────────────────────────
function ReportTab({
  progress,
  thisWeek,
  lastWeek,
  skills,
}: {
  progress: NonNullable<ReturnType<typeof useProgress>["progress"]>;
  thisWeek: DayXP[];
  lastWeek: DayXP[];
  skills: SkillScore[];
}) {
  const [copied, setCopied] = useState(false);
  const thisTotal = weeklyTotal(thisWeek);
  const lastTotal = weeklyTotal(lastWeek);
  const diff = thisTotal - lastTotal;
  const diffPct = lastTotal > 0 ? Math.round(Math.abs((diff / lastTotal) * 100)) : 0;

  const daysActive = thisWeek.filter((d) => d.xp > 0).length;
  const topSkill = [...skills].sort((a, b) => b.score - a.score)[0];
  const weakSkill = [...skills].sort((a, b) => a.score - b.score)[0];

  const today = new Date().toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });

  const summaryText = [
    `📊 דוח שבועי — ${today}`,
    "",
    `רמת CEFR: ${getCEFR(progress.totalXP).level} | XP כולל: ${progress.totalXP.toLocaleString()}`,
    "",
    `📅 השבוע (${daysActive}/7 ימים פעיל):`,
    `  • ${thisTotal} נקודות XP`,
    `  • ${progress.wordsLearned} מילים נלמדו`,
    `  • ${progress.readingDone} טקסטים נקראו`,
    `  • ${progress.correctAnswers} תרגילים הושלמו`,
    "",
    lastTotal > 0
      ? (diff >= 0
        ? `📈 שיפור של ${diffPct}% לעומת שבוע שעבר! (${lastTotal} XP)`
        : `📉 ${diffPct}% פחות מהשבוע שעבר (${lastTotal} XP)`)
      : "",
    "",
    `💪 חוזקה גדולה: ${topSkill.label} (${topSkill.score}%)`,
    `🎯 לשיפור: ${weakSkill.label} (${weakSkill.score}%)`,
    "",
    `🔥 רצף: ${progress.streak} ימים`,
    "",
    "— נוצר ע\"י פאר לימוד אנגלית",
  ].filter((l) => l !== undefined).join("\n");

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback: show in textarea
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="space-y-5">
      {/* Weekly summary card */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <span>📋</span> סיכום שבועי
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <div className="font-bold text-2xl">{thisTotal}</div>
            <div className="text-xs opacity-80">XP השבוע</div>
          </div>
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <div className="font-bold text-2xl">{daysActive}/7</div>
            <div className="text-xs opacity-80">ימים פעיל</div>
          </div>
        </div>

        {/* Auto-text summary */}
        <div className="bg-white/15 rounded-xl p-4 text-sm leading-relaxed">
          {thisTotal === 0 ? (
            <p>השבוע עוד לא התחלת ללמוד — כנס ותתחיל! 💪</p>
          ) : daysActive >= 5 ? (
            <p>
              שבוע מצוין! למדת {daysActive} ימים מתוך 7 והשגת {thisTotal} נקודות.
              {diff > 0 && ` זה שיפור של ${diffPct}% לעומת שבוע שעבר!`}
              {" "}החוזקה שלך: {topSkill.label} ({topSkill.score}%). כדאי לתרגל יותר {weakSkill.label}.
            </p>
          ) : (
            <p>
              השבוע למדת {daysActive} ימים והשגת {thisTotal} נקודות.
              {diff > 0 ? ` שיפור של ${diffPct}% לעומת שבוע שעבר! ` : " "}
              נסה ללמוד כל יום לשמירה על רצף. {topSkill.label} הוא התחום הכי חזק שלך!
            </p>
          )}
        </div>
      </div>

      {/* Comparison this vs last week */}
      {lastTotal > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🔄</span> השוואה לשבוע שעבר
          </h2>
          <div className="space-y-2">
            {[
              { label: "XP", this: thisTotal, last: lastTotal, unit: "נקודות" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-24 text-right">{r.label}</span>
                <div className="flex-1 flex items-center gap-1">
                  <div className="h-6 bg-blue-400 rounded transition-all" style={{ width: `${(r.this / Math.max(r.this, r.last, 1)) * 100}%`, minWidth: r.this > 0 ? "4px" : "0" }} />
                  <span className="text-xs font-bold text-blue-700">{r.this}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-3 p-2 rounded-lg text-center text-sm font-bold ${
            diff > 0 ? "bg-green-50 text-green-700" : diff < 0 ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-500"
          }`}>
            {diff > 0 ? `🎉 שיפור של ${diffPct}%!` : diff < 0 ? `📉 ירידה של ${diffPct}%` : "➡️ שווה"}
          </div>
        </div>
      )}

      {/* Report text preview */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4">
        <h2 className="font-bold text-gray-700 mb-2 text-sm">📄 טקסט לשיתוף:</h2>
        <pre className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap font-mono" dir="rtl">
          {summaryText}
        </pre>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleShare}
          className={`py-3 rounded-2xl font-bold text-sm transition ${
            copied
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          {copied ? "✓ הועתק ללוח!" : "📋 העתק לשיתוף"}
        </button>
        <button
          onClick={handlePrint}
          className="py-3 rounded-2xl font-bold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          🖨️ הדפס / שמור
        </button>
      </div>
      <p className="text-center text-xs text-gray-400">שתף עם ההורים · מורה · או שמור לעצמך</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { progress } = useProgress();
  const [tab, setTab] = useState<Tab>("overview");
  const [extras, setExtras] = useState({
    advVocab: 0, advReading: 0, advWriting: 0, advSpeaking: 0, advGrammar: 0,
    challengesDone: 0, gamesPlayed: 0,
  });

  useEffect(() => {
    setExtras({
      advVocab:      getLearnedCount(),
      advReading:    getAdvReadingCount(),
      advWriting:    getSubmittedCount(),
      advSpeaking:   getCompletedSpeakingCount(),
      advGrammar:    getCompletedTopicsCount(),
      challengesDone: getCompletedChallengesCount(),
      gamesPlayed:   getTotalGamesPlayed(),
    });
  }, []);

  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-5xl animate-bounce">📊</div>
      </div>
    );
  }

  const cefr       = getCEFR(progress.totalXP);
  const skills     = computeSkills(progress, extras);
  const thisWeek   = buildWeeklyData(progress.dailyXP, 0);
  const lastWeek   = buildWeeklyData(progress.dailyXP, 1);
  const cefrPct    = cefr.nextXP
    ? Math.min(100, Math.round(((progress.totalXP - cefr.minXP) / (cefr.nextXP - cefr.minXP)) * 100))
    : 100;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "סקירה",  icon: "📊" },
    { id: "charts",   label: "גרפים",  icon: "📈" },
    { id: "goals",    label: "יעדים",  icon: "🎯" },
    { id: "report",   label: "דוח",    icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <Link href="/" className="text-gray-500 text-sm">← דף הבית</Link>
        <h1 className="font-bold text-gray-900 text-sm">📊 דשבורד</h1>
        <span />
      </nav>

      {/* CEFR Hero */}
      <div className={`bg-gradient-to-br ${cefr.color} text-white px-4 py-5`}>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/70 text-xs mb-0.5">רמת CEFR משוערת</p>
              <div className="flex items-center gap-2">
                <span className="text-5xl font-extrabold">{cefr.level}</span>
                <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-bold">{cefr.desc_he}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{progress.totalXP.toLocaleString()}</div>
              <div className="text-white/70 text-xs">נקודות XP</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-orange-300">🔥</span>
                <span className="font-bold">{progress.streak}</span>
                <span className="text-white/60 text-xs">ימים ברצף</span>
              </div>
            </div>
          </div>

          {/* CEFR progress bar */}
          {cefr.nextXP && (
            <div>
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>{cefr.level}</span>
                <span>{cefr.next}</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/80 rounded-full transition-all duration-700"
                  style={{ width: `${cefrPct}%` }}
                />
              </div>
              <p className="text-white/60 text-xs mt-1">
                עוד {(cefr.nextXP - progress.totalXP).toLocaleString()} XP לרמה {cefr.next}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tab bar */}
      <div className="sticky top-[53px] z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-lg mx-auto flex">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
                tab === t.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="block text-base">{t.icon}</span>
              <span className="text-xs">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-lg mx-auto px-4 py-5 pb-20">
        {tab === "overview" && (
          <OverviewTab
            skills={skills}
            totalXP={progress.totalXP}
            streak={progress.streak}
            bestStreak={progress.bestStreak}
            stats={{
              wordsLearned:   progress.wordsLearned,
              correctAnswers: progress.correctAnswers,
              readingDone:    progress.readingDone,
              speakingDone:   progress.speakingDone,
              gamesPlayed:    extras.gamesPlayed,
              challengesDone: extras.challengesDone,
            }}
          />
        )}
        {tab === "charts" && (
          <ChartsTab thisWeek={thisWeek} lastWeek={lastWeek} skills={skills} />
        )}
        {tab === "goals" && (
          <GoalsTab progress={progress} />
        )}
        {tab === "report" && (
          <ReportTab
            progress={progress}
            thisWeek={thisWeek}
            lastWeek={lastWeek}
            skills={skills}
          />
        )}
      </div>
    </div>
  );
}
