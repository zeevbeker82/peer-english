"use client";
import { useState } from "react";
import Link from "next/link";
import { VOCABULARY } from "@/lib/content/vocabulary";
import { TOPIC_LABELS, TOPIC_EMOJIS, type VocabTopic } from "@/lib/content/types";
import { FlashCard } from "@/components/FlashCard";
import { Badge } from "@/components/ui/Badge";
import { useSRS } from "@/hooks/useSRS";
import { useSettings } from "@/hooks/useSettings";
import { useAudio } from "@/hooks/useAudio";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { AchievementPopup } from "@/components/ui/AchievementPopup";
import type { VocabularyItem } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";

const TOPICS = Object.keys(TOPIC_LABELS) as VocabTopic[];

type ViewMode = "browse" | "study";

export default function DictionaryPage() {
  const [selectedTopic, setSelectedTopic] = useState<VocabTopic | "all">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("browse");
  const [studyIndex, setStudyIndex] = useState(0);
  const [showOnlyDue, setShowOnlyDue] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);
  const [lastPts, setLastPts] = useState<number | null>(null);

  const { dueCards, reviewCard } = useSRS();
  const { settings } = useSettings();
  const { sayWord, canSpeak } = useAudio(settings);
  const { addPoints } = useProgress();
  const { newlyUnlocked, checkAndUnlock, dismissAchievements } = useAchievements();

  const dueWordIds = new Set(dueCards.map((c) => c.wordId));

  const filtered: VocabularyItem[] = VOCABULARY.filter((v) => {
    const topicMatch = selectedTopic === "all" || v.topic === selectedTopic;
    const dueMatch = !showOnlyDue || dueWordIds.has(v.id);
    return topicMatch && dueMatch;
  });

  const studyList = filtered;
  const currentCard = studyList[studyIndex];

  const handleGrade = (quality: "wrong" | "hard" | "good" | "easy") => {
    if (!currentCard) return;
    reviewCard(currentCard.id, quality);

    // Award XP based on grade
    let pts = 0;
    let wordsLearned = 0;
    if (quality === "hard") {
      pts = 3;
    } else if (quality === "good") {
      pts = 5;
      wordsLearned = 1;
    } else if (quality === "easy") {
      pts = 10;
      wordsLearned = 1;
    }

    if (pts > 0) {
      setSessionXP((prev) => prev + pts);
      setLastPts(pts);
      const updated = addPoints(pts, {
        wordsLearned,
        correctAnswers: quality !== "wrong" ? 1 : 0,
      });
      if (updated) checkAndUnlock(updated);

      // Clear lastPts indicator after 1.5s
      setTimeout(() => setLastPts(null), 1500);
    } else {
      setLastPts(null);
    }

    if (studyIndex < studyList.length - 1) {
      setStudyIndex((i) => i + 1);
    } else {
      setStudyIndex(0);
      setViewMode("browse");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-10" dir="rtl">
      {/* Achievement popup */}
      {newlyUnlocked.length > 0 && (
        <AchievementPopup
          achievements={newlyUnlocked}
          onClose={dismissAchievements}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-gray-500 hover:text-gray-700 text-xl p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" aria-label="חזרה לבית">
          ←
        </Link>
        <h1 className="font-bold text-gray-800 text-xl flex-1">🗂️ מילון וכרטיסיות</h1>
        {dueCards.length > 0 && (
          <Badge color="orange">{dueCards.length} לחזרה</Badge>
        )}
        {sessionXP > 0 && (
          <span className="bg-yellow-100 text-yellow-700 font-extrabold text-sm px-3 py-1 rounded-full">
            +{sessionXP} ⭐
          </span>
        )}
      </header>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {/* View mode toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("browse")}
            className={cn(
              "flex-1 py-2 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-2",
              viewMode === "browse"
                ? "bg-purple-500 text-white shadow-md focus:ring-purple-300"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 focus:ring-purple-300"
            )}
          >
            📋 דפדוף
          </button>
          <button
            onClick={() => { setViewMode("study"); setStudyIndex(0); }}
            className={cn(
              "flex-1 py-2 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-2",
              viewMode === "study"
                ? "bg-blue-500 text-white shadow-md focus:ring-blue-300"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 focus:ring-blue-300"
            )}
          >
            🎴 לימוד
          </button>
        </div>

        {/* Filters */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-600">נושא:</span>
            <label className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyDue}
                onChange={(e) => setShowOnlyDue(e.target.checked)}
                className="accent-orange-400"
              />
              רק לחזרה ({dueCards.length})
            </label>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedTopic("all")}
              className={cn(
                "whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all",
                selectedTopic === "all"
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white border-gray-200 text-gray-600 hover:border-purple-300"
              )}
            >
              כל הנושאים
            </button>
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={cn(
                  "whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all",
                  selectedTopic === topic
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white border-gray-200 text-gray-600 hover:border-purple-300"
                )}
              >
                {TOPIC_EMOJIS[topic]} {TOPIC_LABELS[topic]}
              </button>
            ))}
          </div>
        </div>

        {/* Study mode */}
        {viewMode === "study" && currentCard && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500">
                {studyIndex + 1} / {studyList.length}
              </span>
              <div className="flex items-center gap-2">
                {lastPts !== null && lastPts > 0 && (
                  <span className="bg-green-500 text-white text-sm font-extrabold px-3 py-1 rounded-full animate-bounce">
                    +{lastPts} ⭐
                  </span>
                )}
                <button
                  onClick={() => setViewMode("browse")}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  ✕ סיום
                </button>
              </div>
            </div>
            <FlashCard
              item={currentCard}
              onGrade={handleGrade}
              onSpeak={canSpeak ? (text) => sayWord(text) : undefined}
              isDue={dueWordIds.has(currentCard.id)}
            />
            {/* Points guide */}
            <div className="mt-3 flex justify-center gap-3 text-xs text-gray-400">
              <span>😓 שגיאה = 0⭐</span>
              <span>😐 קשה = 3⭐</span>
              <span>😊 טוב = 5⭐</span>
              <span>🌟 קל = 10⭐</span>
            </div>
          </div>
        )}

        {/* Browse mode */}
        {viewMode === "browse" && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{filtered.length} מילים</p>
              {filtered.length > 0 && (
                <button
                  onClick={() => { setViewMode("study"); setStudyIndex(0); }}
                  className="text-sm font-bold text-blue-500 hover:text-blue-700"
                >
                  לימוד כרטיסיות →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4"
                >
                  <div className="text-3xl">{item.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-800 text-lg" dir="ltr">{item.word}</p>
                      {canSpeak && (
                        <button
                          onClick={() => sayWord(item.audioText)}
                          className="text-base hover:scale-125 transition-transform focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-full"
                          aria-label="הקשב"
                        >
                          🔊
                        </button>
                      )}
                      {dueWordIds.has(item.id) && (
                        <span className="text-orange-400 text-sm" title="לחזרה היום">🔔</span>
                      )}
                    </div>
                    <p className="text-purple-700 font-semibold">{item.translation_he}</p>
                    <p dir="ltr" className="text-xs text-gray-400 italic mt-1">{item.example_sentence_en}</p>
                  </div>
                  <Badge color="gray" size="sm">{TOPIC_LABELS[item.topic]}</Badge>
                </div>
              ))}
            </div>
          </>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500">לא נמצאו מילים</p>
          </div>
        )}
      </div>
    </main>
  );
}
