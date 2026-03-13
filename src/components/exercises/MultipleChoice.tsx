"use client";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { MultipleChoiceExercise } from "@/lib/exercises/types";
import { Button } from "@/components/ui/Button";

interface Props {
  exercise: MultipleChoiceExercise;
  onAnswer: (selectedIndex: number) => void;
  disabled?: boolean;
  revealed?: number | null; // correctIndex when answer revealed
  userChoice?: number | null;
  onSpeak?: () => void;
}

export function MultipleChoice({
  exercise,
  onAnswer,
  disabled,
  revealed,
  userChoice,
  onSpeak,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (disabled || selected !== null) return;
    setSelected(index);
    onAnswer(index);
  };

  const choiceIndex = userChoice ?? selected;

  return (
    <div className="space-y-5 animate-slide-in">
      {/* Instruction */}
      <p className="text-gray-500 text-base font-medium">{exercise.instruction_he}</p>

      {/* Question word */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div
          dir="ltr"
          className="text-4xl font-extrabold text-blue-700 tracking-wide bg-blue-50 rounded-2xl px-8 py-4 border-2 border-blue-200 select-none"
        >
          {exercise.question}
        </div>
        {onSpeak && (
          <button
            onClick={onSpeak}
            aria-label="הקשב למילה"
            className="text-2xl hover:scale-125 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
          >
            🔊
          </button>
        )}
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-3" role="group" aria-label="אפשרויות תשובה">
        {exercise.options.map((option, index) => {
          const isChosen = choiceIndex === index;
          const isCorrect = revealed === index;
          const isWrong = isChosen && revealed !== null && revealed !== index;

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={disabled}
              aria-pressed={isChosen}
              className={cn(
                "rounded-2xl border-2 p-4 text-lg font-bold transition-all duration-200",
                "focus:outline-none focus:ring-4 focus:ring-blue-300",
                "active:scale-95",
                !isChosen && !revealed && "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md",
                isChosen && !revealed && "bg-blue-100 border-blue-500 shadow-md",
                isCorrect && "bg-green-100 border-green-500 text-green-700 animate-pop",
                isWrong && "bg-red-100 border-red-400 text-red-700 animate-shake",
                disabled && !isChosen && !isCorrect && "opacity-50 cursor-not-allowed",
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
