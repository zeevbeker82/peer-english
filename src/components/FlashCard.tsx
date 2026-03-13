"use client";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { VocabularyItem } from "@/lib/content/types";
import { Button } from "./ui/Button";

interface Props {
  item: VocabularyItem;
  onGrade: (quality: "wrong" | "hard" | "good" | "easy") => void;
  onSpeak?: (text: string) => void;
  isDue?: boolean;
}

export function FlashCard({ item, onGrade, onSpeak, isDue }: Props) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((f) => !f);

  return (
    <div className="flex flex-col items-center gap-5 animate-slide-in">
      {/* Card */}
      <div
        className={cn(
          "relative w-full max-w-sm h-48 cursor-pointer select-none",
          "rounded-3xl shadow-lg border-2 transition-all duration-300",
          "focus:outline-none focus:ring-4 focus:ring-blue-300",
          flipped
            ? "bg-gradient-to-br from-purple-100 to-indigo-100 border-purple-300"
            : "bg-gradient-to-br from-blue-100 to-sky-100 border-blue-300"
        )}
        onClick={handleFlip}
        role="button"
        aria-label={flipped ? "כרטיס אחורי - הקלק להפוך" : "כרטיס קדמי - הקלק להפוך"}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleFlip()}
      >
        {!flipped ? (
          // Front: English
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6" dir="ltr">
            <div className="text-5xl mb-2">{item.emoji}</div>
            <p className="text-4xl font-extrabold text-blue-800">{item.word}</p>
            <p className="text-sm text-blue-500 mt-2 italic">{item.difficulty}</p>
            {isDue && (
              <span className="absolute top-3 right-3 text-orange-400 text-lg" title="לחזרה היום">🔔</span>
            )}
            <p className="absolute bottom-3 text-xs text-gray-400">לחץ להפוך</p>
          </div>
        ) : (
          // Back: Hebrew + example
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 gap-2">
            <p className="text-3xl font-extrabold text-purple-800">{item.translation_he}</p>
            <div className="w-8 border-t-2 border-purple-200" />
            <p dir="ltr" className="text-sm text-gray-600 italic text-center leading-relaxed px-2">
              "{item.example_sentence_en}"
            </p>
            {onSpeak && (
              <button
                onClick={(e) => { e.stopPropagation(); onSpeak(item.audioText); }}
                className="text-xl hover:scale-125 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-full p-1 mt-1"
                aria-label="הקשב למילה"
              >
                🔊
              </button>
            )}
          </div>
        )}
      </div>

      {/* Grade buttons (shown after flip) */}
      {flipped && (
        <div className="grid grid-cols-4 gap-2 w-full max-w-sm animate-slide-in">
          <button
            onClick={() => onGrade("wrong")}
            className="flex flex-col items-center gap-1 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-2xl py-3 px-1 transition-all font-bold text-red-700 text-xs focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="לא ידעתי"
          >
            <span className="text-xl">😟</span>
            <span>לא ידעתי</span>
          </button>
          <button
            onClick={() => onGrade("hard")}
            className="flex flex-col items-center gap-1 bg-orange-100 hover:bg-orange-200 border-2 border-orange-300 rounded-2xl py-3 px-1 transition-all font-bold text-orange-700 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="קשה"
          >
            <span className="text-xl">😬</span>
            <span>קשה</span>
          </button>
          <button
            onClick={() => onGrade("good")}
            className="flex flex-col items-center gap-1 bg-blue-100 hover:bg-blue-200 border-2 border-blue-300 rounded-2xl py-3 px-1 transition-all font-bold text-blue-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="ידעתי"
          >
            <span className="text-xl">😊</span>
            <span>ידעתי</span>
          </button>
          <button
            onClick={() => onGrade("easy")}
            className="flex flex-col items-center gap-1 bg-green-100 hover:bg-green-200 border-2 border-green-300 rounded-2xl py-3 px-1 transition-all font-bold text-green-700 text-xs focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="קל מאוד"
          >
            <span className="text-xl">🌟</span>
            <span>קל!</span>
          </button>
        </div>
      )}

      {!flipped && (
        <p className="text-sm text-gray-400">לחץ על הכרטיס כדי לראות את התרגום</p>
      )}
    </div>
  );
}
