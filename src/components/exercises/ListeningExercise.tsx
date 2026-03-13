"use client";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils/cn";
import type { ListeningExercise as ListeningEx } from "@/lib/exercises/types";

interface Props {
  exercise: ListeningEx;
  onAnswer: (selectedIndex: number) => void;
  disabled?: boolean;
  revealed?: number | null;
  userChoice?: number | null;
  onSpeak: (text: string) => void;
  canSpeak: boolean;
}

export function ListeningExercise({
  exercise,
  onAnswer,
  disabled,
  revealed,
  userChoice,
  onSpeak,
  canSpeak,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hasListened, setHasListened] = useState(false);

  const choice = userChoice ?? selected;

  const handleListen = useCallback(() => {
    onSpeak(exercise.ttsText);
    setHasListened(true);
  }, [exercise.ttsText, onSpeak]);

  const handleSelect = (index: number) => {
    if (disabled || selected !== null) return;
    setSelected(index);
    onAnswer(index);
  };

  return (
    <div className="space-y-5 animate-slide-in">
      <p className="text-gray-500 text-base font-medium">{exercise.instruction_he}</p>

      {/* Listening player */}
      <div className="flex flex-col items-center gap-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
        <div className="text-5xl">{canSpeak ? "🎧" : "📢"}</div>
        <button
          onClick={handleListen}
          className={cn(
            "flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all",
            "focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95",
            "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl",
          )}
          aria-label="האזן לקטע"
        >
          <span className="text-2xl">▶</span>
          <span>האזן לקטע</span>
        </button>

        {/* Show text fallback if TTS not available */}
        {!canSpeak && (
          <div dir="ltr" className="mt-2 text-center text-gray-600 italic text-sm bg-white rounded-xl p-3 border">
            {exercise.ttsText}
          </div>
        )}

        {hasListened && (
          <p className="text-green-600 text-sm font-medium">✓ האזנת לקטע</p>
        )}
      </div>

      {/* Question */}
      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <p className="font-bold text-gray-800 text-lg">{exercise.question_he}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3" role="group" aria-label="אפשרויות תשובה">
        {exercise.options_he.map((option, index) => {
          const isChosen = choice === index;
          const isCorrect = revealed === index;
          const isWrong = isChosen && revealed !== null && revealed !== index;

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={disabled}
              className={cn(
                "rounded-2xl border-2 px-4 py-3 font-bold text-base transition-all",
                "focus:outline-none focus:ring-4 focus:ring-blue-300",
                !isChosen && !revealed && "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md",
                isChosen && !revealed && "bg-blue-100 border-blue-500 shadow-md",
                isCorrect && "bg-green-100 border-green-500 text-green-700 animate-pop",
                isWrong && "bg-red-100 border-red-400 text-red-700 animate-shake",
                disabled && !isChosen && !isCorrect && "opacity-50",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
