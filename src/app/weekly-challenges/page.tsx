"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  WEEKLY_CHALLENGES,
  WeeklyChallenge,
  CAT_META,
  CATS_ORDER,
  CHALLENGE_TOTAL,
  CHALLENGE_XP,
  ChallengeCat,
} from "@/lib/content/weekly-challenges";
import {
  getChallengeRecord,
  getCompletedChallengesCount,
  getCompletedIds,
  saveTasks,
  markCompleted,
} from "@/lib/storage/weekly-challenges";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type PagePhase = "home" | "detail";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function difficultyStars(d: 1 | 2 | 3) {
  return "⭐".repeat(d) + "☆".repeat(3 - d);
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
}

// ─────────────────────────────────────────────────────────────────────────────
// Certificate overlay
// ─────────────────────────────────────────────────────────────────────────────

function CertificateOverlay({
  challenge,
  onClose,
}: {
  challenge: WeeklyChallenge;
  onClose: () => void;
}) {
  const today = new Date().toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        className={`relative w-full max-w-lg rounded-3xl bg-gradient-to-br ${challenge.cert_color} p-1 shadow-2xl`}
      >
        <div className="rounded-[22px] bg-white/10 backdrop-blur-sm p-8 text-center text-white">
          {/* Badge */}
          <div className="text-7xl mb-2">{challenge.badge}</div>
          <div className="text-sm font-bold tracking-widest uppercase opacity-80 mb-4">
            תעודת הצטיינות
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-1">{challenge.title_he}</h2>
          <p className="text-lg opacity-90 mb-4">{challenge.badge_name_he}</p>

          {/* Message */}
          <div className="bg-white/20 rounded-2xl p-4 mb-6 text-sm leading-relaxed">
            {challenge.cert_message_he}
          </div>

          {/* Date */}
          <p className="text-sm opacity-70 mb-6">הושלם בתאריך: {today}</p>

          {/* XP */}
          <div className="inline-block bg-yellow-400 text-yellow-900 font-bold rounded-full px-6 py-2 text-lg mb-6">
            +{CHALLENGE_XP} XP 🎉
          </div>

          <br />
          <button
            onClick={onClose}
            className="bg-white/30 hover:bg-white/40 transition text-white font-bold rounded-full px-8 py-3"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Challenge card (home view)
// ─────────────────────────────────────────────────────────────────────────────

function ChallengeCard({
  challenge,
  completed,
  onClick,
}: {
  challenge: WeeklyChallenge;
  completed: boolean;
  onClick: () => void;
}) {
  const meta = CAT_META[challenge.cat];

  return (
    <button
      onClick={onClick}
      className="w-full text-right bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Top gradient bar */}
      <div className={`h-2 w-full bg-gradient-to-r ${meta.color}`} />

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-4xl mt-1">{challenge.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900">{challenge.title_he}</h3>
              {completed && (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  ✓ הושלם
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{challenge.subtitle_he}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span>{difficultyStars(challenge.difficulty)}</span>
              <span className="text-yellow-600 font-bold">+{challenge.xp} XP</span>
              <span>{challenge.badge} {challenge.badge_name_he}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home view
// ─────────────────────────────────────────────────────────────────────────────

function HomeView({
  onSelect,
  completedCount,
}: {
  onSelect: (c: WeeklyChallenge) => void;
  completedCount: number;
}) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompletedIds(getCompletedIds());
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">🏆</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">אתגרים שבועיים</h1>
        <p className="text-gray-500">10 אתגרים מיוחדים • 100 XP לכל אתגר • תעודת הצטיינות</p>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 font-medium">התקדמות כוללת</span>
          <span className="font-bold text-gray-900">
            {completedCount} / {CHALLENGE_TOTAL} אתגרים
          </span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all"
            style={{ width: `${(completedCount / CHALLENGE_TOTAL) * 100}%` }}
          />
        </div>
        {completedCount === CHALLENGE_TOTAL && (
          <p className="text-center text-green-600 font-bold mt-2 text-sm">
            🎊 כל האתגרים הושלמו — אתה אלוף!
          </p>
        )}
      </div>

      {/* Categories */}
      {(CATS_ORDER as ChallengeCat[]).map((cat) => {
        const meta = CAT_META[cat];
        const challenges = WEEKLY_CHALLENGES.filter((c) => c.cat === cat);
        const catCompleted = challenges.filter((c) => completedIds.has(c.id)).length;

        return (
          <div key={cat} className="mb-6">
            {/* Category header */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${meta.color} flex items-center justify-center text-white text-sm`}
              >
                {meta.icon}
              </div>
              <h2 className="font-bold text-gray-800">{meta.label_he}</h2>
              <span className="text-xs text-gray-400 mr-auto">
                {catCompleted}/{challenges.length} ✓
              </span>
            </div>

            {/* Challenge cards */}
            <div className="flex flex-col gap-3">
              {challenges.map((ch) => (
                <ChallengeCard
                  key={ch.id}
                  challenge={ch}
                  completed={completedIds.has(ch.id)}
                  onClick={() => onSelect(ch)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Detail view
// ─────────────────────────────────────────────────────────────────────────────

function DetailView({
  challenge,
  onBack,
  onComplete,
}: {
  challenge: WeeklyChallenge;
  onBack: () => void;
  onComplete: () => void;
}) {
  const meta = CAT_META[challenge.cat];
  const record = getChallengeRecord(challenge.id);

  const [tasks, setTasks] = useState<boolean[]>(
    record?.tasks ?? challenge.tasks.map(() => false)
  );
  const [exampleOpen, setExampleOpen] = useState(false);
  const [stepsOpen, setStepsOpen] = useState(false);
  const already = record?.completed ?? false;

  const allChecked = tasks.every(Boolean);

  // Auto-save tasks
  useEffect(() => {
    if (!already) saveTasks(challenge.id, tasks);
  }, [tasks, challenge.id, already]);

  function toggle(i: number) {
    if (already) return;
    setTasks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-5 transition"
      >
        <span>→</span>
        <span className="text-sm">חזרה לכל האתגרים</span>
      </button>

      {/* Header card */}
      <div
        className={`rounded-3xl bg-gradient-to-br ${meta.color} p-6 text-white mb-5 shadow-lg`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-5xl">{challenge.icon}</span>
          <div>
            <div className="text-xs font-bold tracking-wider opacity-80 uppercase">
              {meta.label_he}
            </div>
            <h1 className="text-2xl font-bold">{challenge.title_he}</h1>
            <p className="text-sm opacity-90">{challenge.subtitle_he}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3 text-sm">
          <span>{difficultyStars(challenge.difficulty)}</span>
          <span className="bg-yellow-400 text-yellow-900 font-bold rounded-full px-3 py-0.5">
            +{challenge.xp} XP
          </span>
          <span>
            {challenge.badge} {challenge.badge_name_he}
          </span>
          {already && (
            <span className="bg-green-400 text-green-900 font-bold rounded-full px-3 py-0.5">
              ✓ הושלם
            </span>
          )}
        </div>
        {already && record?.completedDate && (
          <p className="text-xs opacity-70 mt-2">
            הושלם: {formatDate(record.completedDate)}
          </p>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>📋</span> הוראות
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed text-right">
          {challenge.instructions_he}
        </p>
      </div>

      {/* Step-by-step guide (collapsible) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
        <button
          onClick={() => setStepsOpen((o) => !o)}
          className="w-full flex items-center justify-between p-5 text-right"
        >
          <span className="font-bold text-gray-900 flex items-center gap-2">
            <span>🗺️</span> מדריך שלב-אחר-שלב
          </span>
          <span className="text-gray-400 text-lg">{stepsOpen ? "▲" : "▼"}</span>
        </button>
        {stepsOpen && (
          <div className="px-5 pb-5">
            <ol className="space-y-2">
              {challenge.steps_he.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Example (collapsible) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
        <button
          onClick={() => setExampleOpen((o) => !o)}
          className="w-full flex items-center justify-between p-5 text-right"
        >
          <span className="font-bold text-gray-900 flex items-center gap-2">
            <span>💡</span> דוגמה לביצוע מצוין
          </span>
          <span className="text-gray-400 text-lg">{exampleOpen ? "▲" : "▼"}</span>
        </button>
        {exampleOpen && (
          <div className="px-5 pb-5">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-gray-800 whitespace-pre-line leading-relaxed text-right" dir="auto">
              {challenge.example_he}
            </div>
          </div>
        )}
      </div>

      {/* Task checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>✅</span> רשימת משימות
          <span className="text-sm text-gray-400 font-normal">
            ({tasks.filter(Boolean).length}/{tasks.length})
          </span>
        </h2>
        <div className="space-y-3">
          {challenge.tasks.map((t, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              disabled={already}
              className={`w-full flex items-start gap-3 p-3 rounded-xl text-right transition ${
                tasks[i]
                  ? "bg-green-50 border border-green-200"
                  : "bg-gray-50 border border-gray-100 hover:bg-gray-100"
              } ${already ? "opacity-70 cursor-default" : "cursor-pointer"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm border-2 transition ${
                  tasks[i]
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                {tasks[i] ? "✓" : ""}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-sm ${tasks[i] ? "text-green-800 line-through opacity-60" : "text-gray-700"}`}>
                  {t.task_he}
                </span>
                {t.task_en && (
                  <p className="text-xs text-gray-400 mt-0.5" dir="ltr">
                    {t.task_en}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Complete button / Already done */}
      {already ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
          <div className="text-4xl mb-2">{challenge.badge}</div>
          <p className="font-bold text-green-800 text-lg">{challenge.badge_name_he}</p>
          <p className="text-sm text-green-600 mt-1">הושלם בהצלחה! 🎉</p>
        </div>
      ) : (
        <button
          onClick={onComplete}
          disabled={!allChecked}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition ${
            allChecked
              ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg hover:shadow-xl active:scale-98"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {allChecked ? `🏆 סיים אתגר וקבל +${challenge.xp} XP` : "סמן את כל המשימות כדי לסיים"}
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

export default function WeeklyChallengesPage() {
  const { addPoints } = useProgress();
  const { checkAndUnlock } = useAchievements();

  const [phase, setPhase] = useState<PagePhase>("home");
  const [selected, setSelected] = useState<WeeklyChallenge | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [showCert, setShowCert] = useState(false);

  useEffect(() => {
    setCompletedCount(getCompletedChallengesCount());
  }, [phase]);

  function handleSelect(c: WeeklyChallenge) {
    setSelected(c);
    setPhase("detail");
  }

  function handleBack() {
    setSelected(null);
    setPhase("home");
  }

  function handleComplete() {
    if (!selected) return;
    const record = getChallengeRecord(selected.id);
    const currentTasks = record?.tasks ?? selected.tasks.map(() => true);

    markCompleted(selected.id, currentTasks, CHALLENGE_XP);
    addPoints(CHALLENGE_XP, { challengeDone: 1 } as Parameters<typeof addPoints>[1]);
    checkAndUnlock();

    setShowCert(true);
    setCompletedCount((n) => n + 1);
  }

  function handleCertClose() {
    setShowCert(false);
    setPhase("home");
    setSelected(null);
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-800 text-sm transition">
          ← דף הבית
        </Link>
        <h1 className="font-bold text-gray-900 text-sm">
          🏆 אתגרים שבועיים
        </h1>
        <span className="text-sm text-gray-400">
          {completedCount}/{CHALLENGE_TOTAL}
        </span>
      </nav>

      {/* Content */}
      {phase === "home" && (
        <HomeView onSelect={handleSelect} completedCount={completedCount} />
      )}

      {phase === "detail" && selected && (
        <DetailView
          challenge={selected}
          onBack={handleBack}
          onComplete={handleComplete}
        />
      )}

      {/* Certificate overlay */}
      {showCert && selected && (
        <CertificateOverlay challenge={selected} onClose={handleCertClose} />
      )}
    </div>
  );
}
