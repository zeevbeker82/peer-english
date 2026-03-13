"use client";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils/cn";
import type { MatchingExercise } from "@/lib/exercises/types";
import { Button } from "@/components/ui/Button";

interface Props {
  exercise: MatchingExercise;
  onAnswer: (matches: Record<string, string>) => void;
  disabled?: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Matching({ exercise, onAnswer, disabled }: Props) {
  const [leftItems] = useState(() => shuffle(exercise.pairs.map((p) => ({ id: p.id, label: p.english }))));
  const [rightItems] = useState(() => shuffle(exercise.pairs.map((p) => ({ id: p.id, label: p.hebrew }))));

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({}); // english id → hebrew id
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);

  const correctPairs = Object.fromEntries(exercise.pairs.map((p) => [p.id, p.id]));

  const matchedEnglishIds = new Set(Object.keys(matched));
  const matchedHebrewIds = new Set(Object.values(matched));

  const handleLeftClick = (id: string) => {
    if (disabled || matchedEnglishIds.has(id)) return;
    setSelectedLeft((prev) => (prev === id ? null : id));
  };

  const handleRightClick = useCallback(
    (id: string) => {
      if (disabled || matchedHebrewIds.has(id) || !selectedLeft) return;

      const isCorrect = selectedLeft === id;

      if (isCorrect) {
        const newMatched = { ...matched, [selectedLeft]: id };
        setMatched(newMatched);
        setSelectedLeft(null);

        if (Object.keys(newMatched).length === exercise.pairs.length) {
          // Build english→hebrew mapping for scorer
          const result: Record<string, string> = {};
          for (const pair of exercise.pairs) {
            result[pair.english] = pair.hebrew;
          }
          onAnswer(result);
        }
      } else {
        setWrongPair([selectedLeft, id]);
        setTimeout(() => {
          setWrongPair(null);
          setSelectedLeft(null);
        }, 600);
      }
    },
    [disabled, matchedHebrewIds, selectedLeft, matched, exercise.pairs, onAnswer]
  );

  return (
    <div className="space-y-5 animate-slide-in">
      <p className="text-gray-500 text-base font-medium">{exercise.instruction_he}</p>

      <div className="flex gap-4">
        {/* Left column — English */}
        <div className="flex-1 flex flex-col gap-3" dir="ltr">
          <p className="text-center text-xs text-gray-400 font-semibold uppercase tracking-wide">English</p>
          {leftItems.map(({ id, label }) => {
            const isMatched = matchedEnglishIds.has(id);
            const isSelected = selectedLeft === id;
            const isWrong = wrongPair?.[0] === id;
            return (
              <button
                key={id}
                onClick={() => handleLeftClick(id)}
                disabled={disabled || isMatched}
                className={cn(
                  "rounded-2xl border-2 px-4 py-3 font-bold text-base transition-all",
                  "focus:outline-none focus:ring-4 focus:ring-blue-300",
                  isMatched && "bg-green-100 border-green-400 text-green-700 cursor-default",
                  isSelected && !isMatched && "bg-blue-100 border-blue-500 shadow-md scale-105",
                  isWrong && "bg-red-100 border-red-400 animate-shake",
                  !isMatched && !isSelected && "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50",
                )}
              >
                {isMatched ? "✓ " : ""}{label}
              </button>
            );
          })}
        </div>

        {/* Arrow divider */}
        <div className="flex items-center pt-8">
          <span className="text-2xl text-gray-300 select-none">↔</span>
        </div>

        {/* Right column — Hebrew */}
        <div className="flex-1 flex flex-col gap-3">
          <p className="text-center text-xs text-gray-400 font-semibold uppercase tracking-wide">עברית</p>
          {rightItems.map(({ id, label }) => {
            const isMatched = matchedHebrewIds.has(id);
            const isWrong = wrongPair?.[1] === id;
            return (
              <button
                key={id}
                onClick={() => handleRightClick(id)}
                disabled={disabled || isMatched}
                className={cn(
                  "rounded-2xl border-2 px-4 py-3 font-bold text-base transition-all",
                  "focus:outline-none focus:ring-4 focus:ring-purple-300",
                  isMatched && "bg-green-100 border-green-400 text-green-700 cursor-default",
                  isWrong && "bg-red-100 border-red-400 animate-shake",
                  !isMatched && "bg-white border-gray-200 hover:border-purple-400 hover:bg-purple-50",
                  selectedLeft && !isMatched && "border-purple-300 shadow-sm",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-center text-sm text-gray-400">
        {matchedEnglishIds.size} / {exercise.pairs.length} התאמות ✓
      </p>
    </div>
  );
}
