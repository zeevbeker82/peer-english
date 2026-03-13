"use client";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { FillInBlankExercise } from "@/lib/exercises/types";

interface Props {
  exercise: FillInBlankExercise;
  onAnswer: (word: string) => void;
  disabled?: boolean;
  revealed?: string | null;
  userChoice?: string | null;
}

export function FillInBlank({ exercise, onAnswer, disabled, revealed, userChoice }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const choice = userChoice ?? selected;

  const handleSelect = (word: string) => {
    if (disabled || selected !== null) return;
    setSelected(word);
    onAnswer(word);
  };

  // Split sentence into parts
  const parts = exercise.sentence.split("{{blank}}");

  return (
    <div className="space-y-6 animate-slide-in">
      <p className="text-gray-500 text-base font-medium">{exercise.instruction_he}</p>

      {/* Sentence display */}
      <div
        dir="ltr"
        className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-100 text-center"
      >
        <p className="text-xl font-bold text-gray-800 leading-relaxed">
          {parts[0]}
          <span
            className={cn(
              "inline-block min-w-[100px] mx-2 px-3 py-1 rounded-xl border-b-4 font-bold transition-all",
              !choice && "border-blue-400 bg-blue-100 text-blue-400",
              choice && revealed && choice === exercise.answer && "border-green-500 bg-green-100 text-green-700",
              choice && revealed && choice !== exercise.answer && "border-red-400 bg-red-100 text-red-700 line-through",
            )}
          >
            {choice ?? "_____"}
          </span>
          {parts[1]}
        </p>

        {/* Show correct answer if wrong */}
        {revealed && choice !== exercise.answer && (
          <p className="mt-2 text-green-600 font-bold text-lg" dir="ltr">
            ✓ {exercise.answer}
          </p>
        )}
      </div>

      {/* Hint */}
      {exercise.hint_he && !choice && (
        <p className="text-center text-sm text-gray-400">💡 {exercise.hint_he}</p>
      )}

      {/* Word bank */}
      <div className="flex flex-wrap gap-3 justify-center" role="group" aria-label="בנק מילים">
        {exercise.options.map((word) => {
          const isChosen = choice === word;
          const isCorrect = revealed && word === exercise.answer;
          const isWrong = isChosen && revealed && word !== exercise.answer;

          return (
            <button
              key={word}
              onClick={() => handleSelect(word)}
              disabled={disabled || !!choice}
              dir="ltr"
              className={cn(
                "px-5 py-3 rounded-2xl border-2 text-lg font-bold transition-all",
                "focus:outline-none focus:ring-4 focus:ring-blue-300",
                !isChosen && !revealed && "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md",
                isChosen && !revealed && "bg-blue-100 border-blue-500 shadow-md",
                isCorrect && "bg-green-100 border-green-500 text-green-700 animate-pop",
                isWrong && "bg-red-100 border-red-400 text-red-700 animate-shake",
                !isChosen && revealed && "opacity-40",
              )}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}
