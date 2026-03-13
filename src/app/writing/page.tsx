"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { WRITING_TOPICS, LEVEL_COLORS } from "@/lib/content/writing";
import type { WritingTopic } from "@/lib/content/writing";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { Confetti } from "@/components/ui/Confetti";
import { AchievementPopup } from "@/components/ui/AchievementPopup";

// ─── Types ────────────────────────────────────────────────────────────────────
type Stage = "topics" | "writing" | "done";

// ─── Topics grid ──────────────────────────────────────────────────────────────
function TopicsView({ onSelect }: { onSelect: (t: WritingTopic) => void }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white pb-24" dir="rtl">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/" className="text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100">
          ←
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-orange-700 flex items-center gap-2">
            ✍️ מודול כתיבה
          </h1>
          <p className="text-xs text-gray-400">בחר נושא לכתיבה</p>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-5">
        {/* Intro */}
        <div className="bg-gradient-to-l from-orange-500 to-amber-500 rounded-3xl p-5 text-white mb-5 shadow-lg">
          <p className="font-extrabold text-xl mb-1">✍️ כתיבה חופשית</p>
          <p className="text-white/80 text-sm">
            8 נושאים • קבל הנחיות • כתוב באנגלית בעצמך!
          </p>
        </div>

        {/* Topic cards */}
        <div className="grid grid-cols-2 gap-3">
          {WRITING_TOPICS.map((topic) => {
            const lvl = LEVEL_COLORS[topic.level];
            return (
              <button
                key={topic.id}
                onClick={() => onSelect(topic)}
                className={`bg-gradient-to-br ${topic.color} rounded-3xl p-4 text-white text-right shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-white/50`}
              >
                <span className="text-4xl block mb-2">{topic.icon}</span>
                <p className="font-extrabold text-sm leading-tight">{topic.title_he}</p>
                <p className="text-white/70 text-xs mt-1" dir="ltr">{topic.title_en}</p>
                <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-white/20`}>
                  {lvl.icon} {topic.level === "easy" ? "קל" : topic.level === "medium" ? "בינוני" : "מאתגר"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

// ─── Writing workspace ────────────────────────────────────────────────────────
function WritingView({
  topic,
  onDone,
  onBack,
}: {
  topic: WritingTopic;
  onDone: (text: string) => void;
  onBack: () => void;
}) {
  const [text, setText] = useState("");
  const [showTips, setShowTips] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const progress = Math.min(100, Math.round((wordCount / topic.wordGoal) * 100));
  const isGoalReached = wordCount >= topic.wordGoal;

  const insertStarter = useCallback(
    (starter: string) => {
      const ta = textareaRef.current;
      if (!ta) return;
      const val = text;
      const cursorPos = ta.selectionStart ?? val.length;
      const prefix = val.slice(0, cursorPos);
      const suffix = val.slice(cursorPos);
      const newline = prefix.length > 0 && !prefix.endsWith("\n") ? "\n" : "";
      const newText = prefix + newline + starter;
      setText(newText + suffix);
      setTimeout(() => {
        ta.focus();
        const newPos = newText.length;
        ta.setSelectionRange(newPos, newPos);
      }, 0);
    },
    [text]
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-10" dir="rtl">
      {/* Header */}
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="text-2xl p-1 rounded-full hover:bg-gray-100">
          ←
        </button>
        <div className="flex-1">
          <p className="font-bold text-gray-800 text-sm">
            {topic.icon} {topic.title_he}
          </p>
          <p className="text-xs text-gray-400" dir="ltr">{topic.title_en}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">יעד</p>
          <p className="font-bold text-orange-600 text-sm">{wordCount}/{topic.wordGoal} מילים</p>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">
        {/* Prompt */}
        <div className={`bg-gradient-to-l ${topic.color} rounded-3xl p-4 text-white shadow-md`}>
          <p className="font-extrabold text-base">{topic.prompt_he}</p>
          <p className="text-white/80 text-sm mt-1" dir="ltr">{topic.prompt_en}</p>
        </div>

        {/* Sentence starters */}
        <div>
          <p className="font-bold text-gray-700 text-sm mb-2">
            💬 לחץ/י להוסיף משפט פתיחה:
          </p>
          <div className="flex flex-wrap gap-2">
            {topic.sentenceStarters.map((starter, i) => (
              <button
                key={i}
                onClick={() => insertStarter(starter)}
                dir="ltr"
                className="bg-white border-2 border-orange-200 text-orange-700 font-medium text-sm rounded-xl px-3 py-1.5 hover:bg-orange-50 hover:border-orange-400 transition-colors active:scale-95"
              >
                {starter}
              </button>
            ))}
          </div>
        </div>

        {/* Text area */}
        <div>
          <p className="font-bold text-gray-700 text-sm mb-2">✏️ כתוב/י כאן:</p>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            dir="ltr"
            placeholder="Start writing here..."
            className="w-full bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-800 text-lg leading-relaxed font-medium min-h-[180px] focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none placeholder:text-gray-300"
          />
        </div>

        {/* Word count bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{wordCount} מילים</span>
            <span>יעד: {topic.wordGoal} מילים</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${isGoalReached ? "bg-green-500" : "bg-orange-400"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {isGoalReached && (
            <p className="text-green-600 font-bold text-sm mt-1 text-center">
              🎉 הגעת ליעד! אפשר להמשיך לכתוב 😊
            </p>
          )}
        </div>

        {/* Tips toggle */}
        <div>
          <button
            onClick={() => setShowTips((v) => !v)}
            className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-orange-600 transition-colors"
          >
            <span>{showTips ? "🔽" : "▶️"}</span>
            💡 טיפים לדקדוק
          </button>
          {showTips && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-2 space-y-2">
              {topic.tips_he.map((tip, i) => (
                <p key={i} className="text-sm text-amber-800">
                  • {tip}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Done button */}
        <button
          onClick={() => onDone(text)}
          disabled={wordCount < 5}
          className="w-full bg-gradient-to-l from-orange-500 to-amber-500 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {wordCount < 5 ? "✍️ כתוב/י לפחות כמה מילים..." : "✅ סיימתי! →"}
        </button>
      </div>
    </main>
  );
}

// ─── Done / encouragement screen ──────────────────────────────────────────────
function DoneView({
  topic,
  text,
  xpEarned,
  onMore,
  onTopics,
}: {
  topic: WritingTopic;
  text: string;
  xpEarned: number;
  onMore: () => void;
  onTopics: () => void;
}) {
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const isLong = wordCount >= topic.wordGoal;
  const isVeryLong = wordCount >= topic.wordGoal * 1.5;

  const msg = isVeryLong
    ? "🏆 כתיבה מצוינת! יצירת מופת!"
    : isLong
    ? "🌟 כל הכבוד! כתיבה יפה מאוד!"
    : "😊 יפה! עוד קצת ותגיע ליעד!";

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center justify-center px-4 py-10"
      dir="rtl"
    >
      {/* Emoji celebration */}
      <div className="text-7xl mb-4 animate-bounce">{isLong ? "🎉" : "✍️"}</div>

      <h2 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">{msg}</h2>
      <p className="text-gray-400 mb-2 text-center">
        {topic.icon} {topic.title_he}
      </p>
      <div className="flex gap-4 mb-6">
        <div className="bg-orange-100 rounded-2xl px-5 py-3 text-center">
          <p className="text-2xl font-extrabold text-orange-600">{wordCount}</p>
          <p className="text-xs text-gray-500">מילים</p>
        </div>
        <div className="bg-green-100 rounded-2xl px-5 py-3 text-center">
          <p className="text-2xl font-extrabold text-green-600">{Math.round(wordCount / (topic.wordGoal / 3))}</p>
          <p className="text-xs text-gray-500">משפטים (בערך)</p>
        </div>
      </div>

      {/* XP earned */}
      {xpEarned > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-6 py-3 text-center mb-6">
          <p className="font-extrabold text-yellow-700 text-xl">+{xpEarned} נקודות! ⭐</p>
          <p className="text-xs text-gray-400 mt-0.5">נקודות הוספו לפרופיל שלך</p>
        </div>
      )}

      {/* What they wrote */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 w-full max-w-sm mb-6">
        <p className="text-xs text-gray-400 mb-2 font-medium">מה שכתבת:</p>
        <p
          className="text-gray-700 text-sm leading-relaxed font-medium whitespace-pre-line"
          dir="ltr"
        >
          {text.slice(0, 250)}
          {text.length > 250 ? "..." : ""}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={onMore}
          className="w-full bg-gradient-to-l from-orange-500 to-amber-500 text-white rounded-2xl py-4 font-extrabold text-lg shadow-lg"
        >
          ✏️ ערוך וכתוב עוד
        </button>
        <button
          onClick={onTopics}
          className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 font-bold text-gray-700"
        >
          📋 נושא אחר
        </button>
        <Link
          href="/"
          className="w-full text-center bg-gray-50 border border-gray-100 rounded-2xl py-3 font-medium text-gray-500"
        >
          🏠 חזרה לבית
        </Link>
      </div>
    </main>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function WritingPage() {
  const [stage, setStage] = useState<Stage>("topics");
  const [topic, setTopic] = useState<WritingTopic | null>(null);
  const [savedText, setSavedText] = useState("");
  const [earnedXP, setEarnedXP] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const { addPoints } = useProgress();
  const { newlyUnlocked, checkAndUnlock, dismissAchievements } = useAchievements();

  const handleTopicSelect = useCallback((t: WritingTopic) => {
    setTopic(t);
    setSavedText("");
    setEarnedXP(0);
    setShowConfetti(false);
    setStage("writing");
  }, []);

  const handleDone = useCallback(
    (text: string) => {
      setSavedText(text);

      // Compute XP based on word count vs goal
      const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
      const wordGoal = topic?.wordGoal ?? 20;
      let pts = 15; // under goal
      if (wordCount >= wordGoal * 1.5) pts = 50;
      else if (wordCount >= wordGoal) pts = 30;

      setEarnedXP(pts);
      const updated = addPoints(pts, { writingDone: 1 });
      if (updated) checkAndUnlock(updated);

      // Show confetti for goal-reaching writing
      if (wordCount >= wordGoal) setShowConfetti(true);

      setStage("done");
    },
    [topic, addPoints, checkAndUnlock]
  );

  if (stage === "topics") return <TopicsView onSelect={handleTopicSelect} />;

  if (stage === "writing" && topic)
    return (
      <WritingView
        topic={topic}
        onDone={handleDone}
        onBack={() => setStage("topics")}
      />
    );

  if (stage === "done" && topic)
    return (
      <>
        {showConfetti && <Confetti />}
        {newlyUnlocked.length > 0 && (
          <AchievementPopup
            achievements={newlyUnlocked}
            onClose={dismissAchievements}
          />
        )}
        <DoneView
          topic={topic}
          text={savedText}
          xpEarned={earnedXP}
          onMore={() => {
            setShowConfetti(false);
            setStage("writing");
          }}
          onTopics={() => setStage("topics")}
        />
      </>
    );

  return null;
}
