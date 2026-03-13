"use client";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { ReadingExercise as ReadingEx } from "@/lib/exercises/types";

interface Props {
  exercise: ReadingEx;
  onAnswer: (selectedIndex: number) => void;
  disabled?: boolean;
  revealed?: number | null;
  userChoice?: number | null;
}

export function ReadingExercise({ exercise, onAnswer, disabled, revealed, userChoice }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const choice = userChoice ?? selected;

  const handleSelect = (index: number) => {
    if (disabled || selected !== null) return;
    setSelected(index);
    onAnswer(index);
  };

  return (
    <div className="space-y-5 animate-slide-in">
      <p className="text-gray-500 text-base font-medium">{exercise.instruction_he}</p>

      {/* Passage */}
      <div
        dir="ltr"
        className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-100"
        aria-label="קטע לקריאה"
      >
        <div className="flex items-start gap-2 mb-2">
          <span className="text-2xl">📖</span>
          <p className="text-base font-semibold text-gray-400 text-sm">קרא בעיון:</p>
        </div>
        <p className="text-lg font-medium text-gray-800 leading-relaxed">{exercise.passage}</p>
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
                "focus:outline-none focus:ring-4 focus:ring-amber-300",
                !isChosen && !revealed && "bg-white border-gray-200 hover:border-amber-400 hover:bg-amber-50 hover:shadow-md",
                isChosen && !revealed && "bg-amber-100 border-amber-500 shadow-md",
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
