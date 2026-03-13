"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  WRITING_ACTIVITIES,
  WRITING_CAT_META,
  WRITING_TOTAL,
  WritingCat,
  WritingActivity,
  getActivitiesByCategory,
  getWritingXP,
  countWords,
} from "@/lib/content/advanced-writing";
import {
  getAllWritingRecords,
  getDraft,
  isSubmitted,
  getSubmittedCount,
  saveDraft,
  submitWriting,
} from "@/lib/storage/advanced-writing";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type PagePhase = "home" | "activity";
type HelpTab = "structure" | "expressions" | "starters" | "example";

// ─────────────────────────────────────────────────────────────────────────────
// XP colour helpers
// ─────────────────────────────────────────────────────────────────────────────

function xpColor(wordCount: number) {
  if (wordCount >= 100) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (wordCount >= 50)  return "text-amber-600  bg-amber-50  border-amber-200";
  return                       "text-gray-500   bg-gray-50   border-gray-200";
}

function xpLabel(wordCount: number) {
  if (wordCount >= 100) return `🏆 +${getWritingXP(wordCount)} XP (ארוך!)`;
  if (wordCount >= 50)  return `⭐ +${getWritingXP(wordCount)} XP (בינוני)`;
  if (wordCount > 0)    return `✏️ +${getWritingXP(wordCount)} XP (קצר)`;
  return                       "כתוב כדי להרוויח XP";
}

// ─────────────────────────────────────────────────────────────────────────────
// Category card
// ─────────────────────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  submittedIds,
  onSelect,
}: {
  cat: WritingCat;
  submittedIds: Set<string>;
  onSelect: (a: WritingActivity) => void;
}) {
  const meta = WRITING_CAT_META[cat];
  const activities = getActivitiesByCategory(cat);
  const doneCount = activities.filter((a) => submittedIds.has(a.id)).length;

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
            <p className="text-white/75 text-xs">{activities.length}</p>
          </div>
        </div>
        {/* Progress bar */}
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
          const done = submittedIds.has(act.id);
          return (
            <button
              key={act.id}
              onClick={() => onSelect(act)}
              className="w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <span className="text-2xl flex-shrink-0">{act.icon}</span>
              <div className="flex-1 min-w-0 text-right">
                <p className="font-bold text-gray-800 text-sm truncate">{act.title}</p>
                <p className="text-xs text-gray-500 truncate">{act.title_he}</p>
              </div>
              <span className="flex-shrink-0 text-lg">{done ? "✅" : "→"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Activity page — write + help tabs
// ─────────────────────────────────────────────────────────────────────────────

function ActivityView({
  activity,
  onBack,
  onSubmit,
}: {
  activity: WritingActivity;
  onBack: () => void;
  onSubmit: (text: string, wordCount: number, xp: number) => void;
}) {
  const meta = WRITING_CAT_META[activity.cat];

  // ── State ──
  const [text,      setText]      = useState(() => getDraft(activity.id));
  const [tab,       setTab]       = useState<"write" | "help">("write");
  const [helpTab,   setHelpTab]   = useState<HelpTab>("structure");
  const [submitted, setSubmitted] = useState(() => isSubmitted(activity.id));
  const [showDone,  setShowDone]  = useState(false);
  const [checklist, setChecklist] = useState<boolean[]>(() =>
    activity.checklist.map(() => false)
  );

  // Auto-save debounce
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleChange = useCallback((val: string) => {
    setText(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => saveDraft(activity.id, val), 800);
  }, [activity.id]);

  const wc  = countWords(text);
  const xp  = getWritingXP(wc);

  function handleSubmit() {
    if (wc === 0) return;
    const earned = getWritingXP(wc);
    submitWriting(activity.id, text, wc, earned);
    setSubmitted(true);
    setShowDone(true);
    onSubmit(text, wc, earned);
    setTimeout(() => setShowDone(false), 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white pb-20" dir="rtl">

      {/* ── Header ── */}
      <div className={`bg-gradient-to-r ${meta.color} px-4 py-4 text-white`}>
        <div className="max-w-lg mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-white/80 text-sm hover:text-white mb-3 transition-colors"
          >
            ← חזרה
          </button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{activity.icon}</span>
            <div>
              <h2 className="font-extrabold text-xl leading-tight">{activity.title}</h2>
              <p className="text-white/75 text-sm">{activity.title_he}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">

        {/* ── Instructions (Hebrew) ── */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3">
          <p className="text-blue-800 text-sm font-bold leading-relaxed">{activity.instructions_he}</p>
        </div>

        {/* ── Prompt card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wide">Your Prompt</p>
          <p className="text-gray-800 font-bold text-base leading-relaxed" dir="ltr">
            "{activity.prompt}"
          </p>
        </div>

        {/* ── Tab bar: Write | Help ── */}
        <div className="flex bg-gray-100 rounded-2xl p-1 gap-1">
          {(["write", "help"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all duration-150 ${
                tab === t
                  ? "bg-white shadow-sm text-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "write" ? "✏️ כתוב" : "🆘 עזרים"}
            </button>
          ))}
        </div>

        {/* ══════════════════ WRITE TAB ══════════════════ */}
        {tab === "write" && (
          <div className="space-y-3">
            {/* Textarea */}
            <textarea
              value={text}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Start writing here..."
              dir="ltr"
              rows={10}
              className="w-full border-2 border-gray-200 rounded-2xl p-4 text-gray-800 text-sm leading-relaxed resize-none focus:outline-none focus:border-rose-400 transition-colors font-mono"
            />

            {/* Word count + XP preview */}
            <div className={`flex items-center justify-between px-4 py-3 rounded-2xl border ${xpColor(wc)}`}>
              <span className="font-bold text-sm">{wc} מילים</span>
              <span className="font-bold text-sm">{xpLabel(wc)}</span>
            </div>

            {/* Word target hints */}
            <div className="flex gap-2">
              {[
                { label: "קצר", words: "<50",  color: "bg-gray-100 text-gray-600", hit: wc > 0 && wc < 50 },
                { label: "בינוני", words: "50+", color: "bg-amber-50 text-amber-700", hit: wc >= 50 && wc < 100 },
                { label: "ארוך ⭐", words: "100+", color: "bg-emerald-50 text-emerald-700", hit: wc >= 100 },
              ].map((t) => (
                <div
                  key={t.label}
                  className={`flex-1 rounded-xl px-2 py-2 text-center border transition-all ${
                    t.hit ? t.color + " border-current font-extrabold scale-105" : "bg-white border-gray-100 text-gray-400"
                  }`}
                >
                  <p className="text-xs font-bold">{t.label}</p>
                  <p className="text-xs">{t.words} מילים</p>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="font-extrabold text-gray-700 text-sm">✅ Checklist לבדיקה עצמית</p>
              </div>
              <div className="divide-y divide-gray-50">
                {activity.checklist.map((item, i) => (
                  <label
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    dir="ltr"
                  >
                    <input
                      type="checkbox"
                      checked={checklist[i]}
                      onChange={() =>
                        setChecklist((prev) => {
                          const next = [...prev];
                          next[i] = !next[i];
                          return next;
                        })
                      }
                      className="mt-0.5 w-4 h-4 accent-rose-500 flex-shrink-0"
                    />
                    <span className={`text-sm ${checklist[i] ? "line-through text-gray-400" : "text-gray-700"}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
              <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 font-bold text-center">
                {checklist.filter(Boolean).length}/{activity.checklist.length} סעיפים הושלמו
              </div>
            </div>

            {/* Submit button */}
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={wc === 0}
                className={`w-full py-4 rounded-2xl font-extrabold text-lg transition-all shadow-md ${
                  wc > 0
                    ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.99]"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {wc > 0 ? `📨 שלח וקבל +${xp} XP` : "כתוב כדי לשלוח"}
              </button>
            ) : (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl px-5 py-4 text-center">
                <p className="text-3xl mb-1">🎉</p>
                <p className="font-extrabold text-emerald-700 text-lg">הכתיבה הוגשה!</p>
                <p className="text-emerald-600 text-sm mt-1">תוכל להמשיך לערוך ולשלוח שוב</p>
                <button
                  onClick={handleSubmit}
                  className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
                >
                  שלח גרסה חדשה
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════ HELP TAB ══════════════════ */}
        {tab === "help" && (
          <div className="space-y-3">
            {/* Sub-tab bar */}
            <div className="flex bg-gray-100 rounded-2xl p-1 gap-0.5 overflow-x-auto">
              {(
                [
                  { id: "structure",   label: "📋 מבנה" },
                  { id: "expressions", label: "💬 ביטויים" },
                  { id: "starters",    label: "🚀 פתיחות" },
                  { id: "example",     label: "📝 דוגמה" },
                ] as { id: HelpTab; label: string }[]
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setHelpTab(t.id)}
                  className={`flex-shrink-0 px-3 py-2 rounded-xl font-bold text-xs transition-all duration-150 ${
                    helpTab === t.id
                      ? "bg-white shadow-sm text-gray-800"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Structure */}
            {helpTab === "structure" && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                  <p className="font-extrabold text-blue-800 text-sm">📋 מבנה מומלץ</p>
                  <p className="text-blue-600 text-xs mt-0.5">עקוב אחר השלבים לכתיבה מעולה</p>
                </div>
                <ol className="divide-y divide-gray-50">
                  {activity.structure.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 px-4 py-3" dir="ltr">
                      <span className="bg-blue-100 text-blue-700 font-extrabold text-xs rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Expressions */}
            {helpTab === "expressions" && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-purple-50 px-4 py-3 border-b border-purple-100">
                  <p className="font-extrabold text-purple-800 text-sm">💬 10 ביטויים שימושיים</p>
                  <p className="text-purple-600 text-xs mt-0.5">העתק והשתמש בכתיבה שלך!</p>
                </div>
                <div className="grid grid-cols-1 gap-0 divide-y divide-gray-50">
                  {activity.expressions.map((expr, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3"
                      dir="ltr"
                    >
                      <span className="text-purple-400 font-bold text-xs w-5 flex-shrink-0">{i + 1}.</span>
                      <span className="text-gray-700 text-sm font-mono">{expr}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sentence starters */}
            {helpTab === "starters" && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100">
                  <p className="font-extrabold text-emerald-800 text-sm">🚀 Sentence Starters</p>
                  <p className="text-emerald-600 text-xs mt-0.5">השתמש בפתיחות האלה כהשראה</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {activity.starters.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3" dir="ltr">
                      <span className="text-emerald-400 mt-1 flex-shrink-0">›</span>
                      <span className="text-gray-700 text-sm italic">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Example */}
            {helpTab === "example" && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-amber-50 px-4 py-3 border-b border-amber-100">
                  <p className="font-extrabold text-amber-800 text-sm">📝 דוגמה לכתיבה טובה</p>
                  <p className="text-amber-600 text-xs mt-0.5">זו דוגמה בלבד — כתוב את הגרסה שלך!</p>
                </div>
                <div className="px-5 py-4" dir="ltr">
                  <p className="text-gray-700 text-sm leading-relaxed italic border-r-4 border-amber-300 pr-4">
                    {activity.example}
                  </p>
                  <p className="text-amber-600 text-xs mt-3 font-bold">
                    📊 {countWords(activity.example)} מילים בדוגמה
                  </p>
                </div>
              </div>
            )}

            {/* Tip: go write */}
            <button
              onClick={() => setTab("write")}
              className={`w-full py-3 rounded-2xl font-extrabold text-base bg-gradient-to-r ${meta.color} text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all`}
            >
              ✏️ מוכן לכתוב!
            </button>
          </div>
        )}

        {/* ── Success toast ── */}
        {showDone && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-base z-50 animate-bounce">
            🎉 +{xp} XP הרווחת!
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home view
// ─────────────────────────────────────────────────────────────────────────────

const CATS: WritingCat[] = ["story_starter", "opinion", "letter", "descriptive"];

function HomeView({
  submittedIds,
  totalSubmitted,
  onSelect,
}: {
  submittedIds: Set<string>;
  totalSubmitted: number;
  onSelect: (a: WritingActivity) => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white pb-20" dir="rtl">

      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-4 py-5 text-white shadow-lg">
        <div className="max-w-lg mx-auto">
          <Link href="/" className="text-white/70 text-sm hover:text-white flex items-center gap-1 mb-3 transition-colors">
            ← דף הבית
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-5xl">✍️</span>
            <div>
              <h1 className="font-extrabold text-2xl">Creative Writing Lab</h1>
              <p className="text-white/75 text-sm">20 פעילויות כתיבה יצירתית</p>
            </div>
          </div>

          {/* Overall progress */}
          <div className="mt-4 bg-white/15 rounded-2xl px-4 py-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold">התקדמות כוללת</span>
              <span className="text-sm font-bold">{totalSubmitted}/{WRITING_TOTAL} פעילויות</span>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-3 rounded-full transition-all duration-700"
                style={{ width: `${Math.round((totalSubmitted / WRITING_TOTAL) * 100)}%` }}
              />
            </div>
            <p className="text-white/65 text-xs mt-1.5">
              {totalSubmitted === 0
                ? "בחר פעילות כדי להתחיל"
                : totalSubmitted === WRITING_TOTAL
                ? "🏆 השלמת את כל הפעילויות!"
                : `עוד ${WRITING_TOTAL - totalSubmitted} פעילויות`}
            </p>
          </div>
        </div>
      </div>

      {/* ── XP guide ── */}
      <div className="max-w-lg mx-auto px-4 pt-4">
        <div className="flex gap-2 mb-4">
          {[
            { emoji: "✏️", label: "קצר", sub: "<50 מילים", xp: "15 XP", bg: "bg-gray-50 border-gray-200" },
            { emoji: "⭐", label: "בינוני", sub: "50-99 מילים", xp: "30 XP", bg: "bg-amber-50 border-amber-200" },
            { emoji: "🏆", label: "ארוך", sub: "100+ מילים", xp: "50 XP", bg: "bg-emerald-50 border-emerald-200" },
          ].map((tier) => (
            <div key={tier.label} className={`flex-1 rounded-2xl border ${tier.bg} px-2 py-2.5 text-center`}>
              <p className="text-xl">{tier.emoji}</p>
              <p className="font-extrabold text-xs text-gray-800 mt-1">{tier.label}</p>
              <p className="text-gray-500 text-xs">{tier.sub}</p>
              <p className="font-bold text-xs text-emerald-600 mt-0.5">{tier.xp}</p>
            </div>
          ))}
        </div>

        {/* ── Category cards ── */}
        <div className="space-y-4">
          {CATS.map((cat) => (
            <CategoryCard
              key={cat}
              cat={cat}
              submittedIds={submittedIds}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

export default function AdvancedWritingPage() {
  const { addPoints } = useProgress();
  const { checkAndUnlock } = useAchievements();

  const [phase,        setPhase]        = useState<PagePhase>("home");
  const [activity,     setActivity]     = useState<WritingActivity | null>(null);
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set());

  // Load submitted IDs from storage
  useEffect(() => {
    const records = getAllWritingRecords();
    const ids = new Set(
      Object.entries(records)
        .filter(([, r]) => r.submitted)
        .map(([id]) => id)
    );
    setSubmittedIds(ids);
  }, []);

  function handleSelect(act: WritingActivity) {
    setActivity(act);
    setPhase("activity");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setPhase("home");
    setActivity(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit(text: string, wordCount: number, xp: number) {
    if (!activity) return;
    // Award XP
    addPoints(xp, { writingDone: 1 });
    checkAndUnlock();
    // Update submitted set
    setSubmittedIds((prev) => new Set([...prev, activity.id]));
  }

  if (phase === "activity" && activity) {
    return (
      <ActivityView
        activity={activity}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <HomeView
      submittedIds={submittedIds}
      totalSubmitted={submittedIds.size}
      onSelect={handleSelect}
    />
  );
}
