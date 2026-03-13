"use client";
import { useState, useCallback, useRef } from "react";
import { MultipleChoice } from "./exercises/MultipleChoice";
import { Matching } from "./exercises/Matching";
import { FillInBlank } from "./exercises/FillInBlank";
import { ListeningExercise } from "./exercises/ListeningExercise";
import { ReadingExercise } from "./exercises/ReadingExercise";
import { ProgressBar } from "./ui/ProgressBar";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils/cn";
import { validateAnswer } from "@/lib/exercises/validator";
import { computeLessonScore } from "@/lib/exercises/scorer";
import type {
  Exercise,
  ExerciseAttempt,
  MultipleChoiceAnswer,
  MatchingAnswer,
  FillInBlankAnswer,
  ListeningAnswer,
  ReadingAnswer,
} from "@/lib/exercises/types";
import type { AppSettings } from "@/lib/storage/settings";

interface Props {
  exercises: Exercise[];
  lessonTitle: string;
  lessonIcon: string;
  settings: AppSettings;
  onSpeak: (text: string) => void;
  canSpeak: boolean;
  onComplete: (attempts: ExerciseAttempt[]) => void;
  onExit: () => void;
}

type Phase = "exercise" | "feedback" | "complete";

export function LessonRunner({
  exercises,
  lessonTitle,
  lessonIcon,
  settings,
  onSpeak,
  canSpeak,
  onComplete,
  onExit,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("exercise");
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
    points: number;
    streakBonus?: number;
  } | null>(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  const currentExercise = exercises[currentIndex];
  const isLast = currentIndex === exercises.length - 1;

  // Track what the user answered (for revealing correct answers)
  const [answerState, setAnswerState] = useState<{
    choice?: number | string | Record<string, string>;
  }>({});

  const handleAnswer = useCallback(
    (rawAnswer: MultipleChoiceAnswer | MatchingAnswer | FillInBlankAnswer | ListeningAnswer | ReadingAnswer) => {
      const timeMs = Date.now() - startTimeRef.current;
      const result = validateAnswer(currentExercise, rawAnswer);

      const attempt: ExerciseAttempt = {
        exerciseId: currentExercise.id,
        exerciseType: currentExercise.type,
        correct: result.isCorrect,
        points: result.points,
        timeMs,
      };

      setAttempts((prev) => [...prev, attempt]);

      // Track streak for bonus display
      const newStreak = result.isCorrect ? currentStreak + 1 : 0;
      setCurrentStreak(newStreak);
      const streakBonus = result.isCorrect && newStreak >= 2 ? 5 : 0;

      setFeedback({
        isCorrect: result.isCorrect,
        message: result.feedback_he,
        points: result.points + streakBonus,
        streakBonus,
      });
      setPhase("feedback");
    },
    [currentExercise]
  );

  const handleMultipleChoice = useCallback((idx: number) => {
    setAnswerState({ choice: idx });
    handleAnswer({ selectedIndex: idx } as MultipleChoiceAnswer);
  }, [handleAnswer]);

  const handleMatching = useCallback((matches: Record<string, string>) => {
    setAnswerState({ choice: matches });
    handleAnswer({ matches } as MatchingAnswer);
  }, [handleAnswer]);

  const handleFillInBlank = useCallback((word: string) => {
    setAnswerState({ choice: word });
    handleAnswer({ selectedWord: word } as FillInBlankAnswer);
  }, [handleAnswer]);

  const handleListening = useCallback((idx: number) => {
    setAnswerState({ choice: idx });
    handleAnswer({ selectedIndex: idx } as ListeningAnswer);
  }, [handleAnswer]);

  const handleReading = useCallback((idx: number) => {
    setAnswerState({ choice: idx });
    handleAnswer({ selectedIndex: idx } as ReadingAnswer);
  }, [handleAnswer]);

  const handleNext = () => {
    if (isLast) {
      setPhase("complete");
      onComplete(attempts);
    } else {
      setCurrentIndex((i) => i + 1);
      setPhase("exercise");
      setFeedback(null);
      setAnswerState({});
      startTimeRef.current = Date.now();
    }
  };

  // Reset streak on wrong answer (for display only; scorer computes independently)


  const handleSpeak = useCallback(() => {
    if (currentExercise.type === "multiple-choice") {
      onSpeak(currentExercise.question);
    }
  }, [currentExercise, onSpeak]);

  if (phase === "complete") {
    return null; // parent handles complete screen
  }

  const completedAttempts = [...attempts];
  if (phase === "complete") completedAttempts.push(...attempts);
  const correctSoFar = attempts.filter((a) => a.correct).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center gap-3">
        <button
          onClick={onExit}
          className="text-gray-500 hover:text-gray-700 text-xl p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="חזרה לתפריט"
        >
          ✕
        </button>
        <span className="text-xl">{lessonIcon}</span>
        <h1 className="font-bold text-gray-800 text-lg flex-1">{lessonTitle}</h1>
        <span className="text-sm text-gray-500 font-medium">
          {currentIndex + 1} / {exercises.length}
        </span>
      </header>

      {/* Progress bar */}
      <div className="px-4 pt-3">
        <ProgressBar
          value={currentIndex + (phase === "feedback" ? 1 : 0)}
          max={exercises.length}
          color="blue"
          size="md"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">✓ {correctSoFar} נכון</span>
          {currentStreak >= 2 && (
            <span className="text-xs font-bold text-orange-500">🔥 {currentStreak} ברצף</span>
          )}
          <span className="text-xs text-gray-400">
            {exercises.length - currentIndex - 1} נשארו
          </span>
        </div>
      </div>

      {/* Exercise area */}
      <main className="flex-1 px-4 py-5 max-w-lg mx-auto w-full">
        {currentExercise.type === "multiple-choice" && (
          <MultipleChoice
            key={currentIndex}
            exercise={currentExercise}
            onAnswer={handleMultipleChoice}
            disabled={phase === "feedback"}
            revealed={phase === "feedback" ? currentExercise.correctIndex : null}
            userChoice={typeof answerState.choice === "number" ? answerState.choice : null}
            onSpeak={
              currentExercise.type === "multiple-choice" && canSpeak ? handleSpeak : undefined
            }
          />
        )}
        {currentExercise.type === "matching" && (
          <Matching
            key={currentIndex}
            exercise={currentExercise}
            onAnswer={handleMatching}
            disabled={phase === "feedback"}
          />
        )}
        {currentExercise.type === "fill-in-blank" && (
          <FillInBlank
            key={currentIndex}
            exercise={currentExercise}
            onAnswer={handleFillInBlank}
            disabled={phase === "feedback"}
            revealed={phase === "feedback" ? currentExercise.answer : null}
            userChoice={typeof answerState.choice === "string" ? answerState.choice : null}
          />
        )}
        {currentExercise.type === "listening" && (
          <ListeningExercise
            key={currentIndex}
            exercise={currentExercise}
            onAnswer={handleListening}
            disabled={phase === "feedback"}
            revealed={phase === "feedback" ? currentExercise.correctIndex : null}
            userChoice={typeof answerState.choice === "number" ? answerState.choice : null}
            onSpeak={onSpeak}
            canSpeak={canSpeak}
          />
        )}
        {currentExercise.type === "reading" && (
          <ReadingExercise
            key={currentIndex}
            exercise={currentExercise}
            onAnswer={handleReading}
            disabled={phase === "feedback"}
            revealed={phase === "feedback" ? currentExercise.correctIndex : null}
            userChoice={typeof answerState.choice === "number" ? answerState.choice : null}
          />
        )}
      </main>

      {/* Feedback banner */}
      {phase === "feedback" && feedback && (
        <div
          className={cn(
            "px-4 pb-6 pt-3 animate-slide-in",
          )}
        >
          <div
            className={cn(
              "rounded-2xl p-4 mb-4 border-2",
              feedback.isCorrect
                ? "bg-green-50 border-green-300 text-green-800"
                : "bg-red-50 border-red-300 text-red-800"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{feedback.isCorrect ? "🎉" : "💪"}</span>
              <div>
                <p className="font-bold text-lg">{feedback.message}</p>
                {feedback.isCorrect && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm opacity-80">+{feedback.points} נקודות</p>
                    {(feedback.streakBonus ?? 0) > 0 && (
                      <span className="text-xs font-bold bg-orange-200 text-orange-800 rounded-full px-2 py-0.5">
                        🔥 רצף! +{feedback.streakBonus}
                      </span>
                    )}
                    {currentStreak >= 3 && (
                      <span className="text-xs font-bold bg-yellow-200 text-yellow-800 rounded-full px-2 py-0.5">
                        ×{currentStreak} ברצף!
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            variant={isLast ? "success" : "primary"}
            size="lg"
            fullWidth
            onClick={handleNext}
          >
            {isLast ? "סיום השיעור 🏆" : "המשך ←"}
          </Button>
        </div>
      )}
    </div>
  );
}
