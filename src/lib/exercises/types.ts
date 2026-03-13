/** Discriminated union of all exercise types */

export interface MultipleChoiceExercise {
  id: string;
  type: "multiple-choice";
  instruction_he: string;
  question: string; // English word or phrase shown
  questionType: "word" | "sentence" | "phrase";
  options: string[]; // Hebrew translations (4 options)
  correctIndex: number;
  wordId?: string;
  difficulty: "A1";
}

export interface MatchingPair {
  id: string;
  english: string;
  hebrew: string;
  wordId?: string;
}

export interface MatchingExercise {
  id: string;
  type: "matching";
  instruction_he: string;
  pairs: MatchingPair[]; // 4 pairs
  difficulty: "A1";
}

export interface FillInBlankExercise {
  id: string;
  type: "fill-in-blank";
  instruction_he: string;
  sentence: string; // English sentence with {{blank}} placeholder
  answer: string; // Correct word
  options: string[]; // Word bank (4 choices incl. answer)
  hint_he?: string;
  wordId?: string;
  difficulty: "A1";
}

export interface ListeningExercise {
  id: string;
  type: "listening";
  instruction_he: string;
  ttsText: string; // Text to speak via TTS
  question_he: string; // Question in Hebrew
  options_he: string[]; // Hebrew answer options (4)
  correctIndex: number;
  difficulty: "A1";
}

export interface ReadingExercise {
  id: string;
  type: "reading";
  instruction_he: string;
  passage: string; // Short English passage
  question_he: string; // Question in Hebrew
  options_he: string[]; // Hebrew answer options (4)
  correctIndex: number;
  difficulty: "A1";
}

export type Exercise =
  | MultipleChoiceExercise
  | MatchingExercise
  | FillInBlankExercise
  | ListeningExercise
  | ReadingExercise;

export type ExerciseType = Exercise["type"];

/** Result of validating an answer */
export interface ValidationResult {
  isCorrect: boolean;
  feedback_he: string;
  points: number;
}

/** User's answer for each exercise type */
export type MultipleChoiceAnswer = { selectedIndex: number };
export type MatchingAnswer = { matches: Record<string, string> }; // english → hebrew
export type FillInBlankAnswer = { selectedWord: string };
export type ListeningAnswer = { selectedIndex: number };
export type ReadingAnswer = { selectedIndex: number };

export type ExerciseAnswer =
  | MultipleChoiceAnswer
  | MatchingAnswer
  | FillInBlankAnswer
  | ListeningAnswer
  | ReadingAnswer;

/** Record of a single exercise attempt */
export interface ExerciseAttempt {
  exerciseId: string;
  exerciseType: ExerciseType;
  correct: boolean;
  points: number;
  timeMs: number;
}
