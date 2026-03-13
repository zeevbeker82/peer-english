import type {
  Exercise,
  ExerciseAnswer,
  MultipleChoiceAnswer,
  MatchingAnswer,
  FillInBlankAnswer,
  ListeningAnswer,
  ReadingAnswer,
  ValidationResult,
} from "./types";

const CORRECT_MESSAGES = [
  "כל הכבוד! 🎉",
  "מעולה! 🌟",
  "נכון מאוד! 👏",
  "יפה מאוד! ✨",
  "ממש טוב! 🎊",
];

const WRONG_MESSAGES = [
  "לא בדיוק, נסה שוב! 💪",
  "כמעט! המשך להתאמן 🙂",
  "לא נכון, אבל אל תוותר! 💫",
  "טעינו — זה חלק מהלמידה! 📖",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function validateAnswer(
  exercise: Exercise,
  answer: ExerciseAnswer
): ValidationResult {
  switch (exercise.type) {
    case "multiple-choice": {
      const ans = answer as MultipleChoiceAnswer;
      const isCorrect = ans.selectedIndex === exercise.correctIndex;
      return {
        isCorrect,
        feedback_he: isCorrect
          ? randomItem(CORRECT_MESSAGES)
          : `${randomItem(WRONG_MESSAGES)} התשובה הנכונה: "${exercise.options[exercise.correctIndex]}"`,
        points: isCorrect ? 10 : 0,
      };
    }

    case "matching": {
      const ans = answer as MatchingAnswer;
      let correctCount = 0;
      const total = exercise.pairs.length;

      for (const pair of exercise.pairs) {
        if (ans.matches[pair.english] === pair.hebrew) {
          correctCount++;
        }
      }

      const allCorrect = correctCount === total;
      return {
        isCorrect: allCorrect,
        feedback_he: allCorrect
          ? randomItem(CORRECT_MESSAGES)
          : `${correctCount} מתוך ${total} נכונות ${allCorrect ? "" : "— נסה שוב! 💪"}`,
        points: Math.round((correctCount / total) * 10),
      };
    }

    case "fill-in-blank": {
      const ans = answer as FillInBlankAnswer;
      const isCorrect =
        ans.selectedWord.toLowerCase().trim() ===
        exercise.answer.toLowerCase().trim();
      return {
        isCorrect,
        feedback_he: isCorrect
          ? randomItem(CORRECT_MESSAGES)
          : `${randomItem(WRONG_MESSAGES)} התשובה הנכונה: "${exercise.answer}"`,
        points: isCorrect ? 10 : 0,
      };
    }

    case "listening": {
      const ans = answer as ListeningAnswer;
      const isCorrect = ans.selectedIndex === exercise.correctIndex;
      return {
        isCorrect,
        feedback_he: isCorrect
          ? randomItem(CORRECT_MESSAGES)
          : `${randomItem(WRONG_MESSAGES)} התשובה הנכונה: "${exercise.options_he[exercise.correctIndex]}"`,
        points: isCorrect ? 10 : 0,
      };
    }

    case "reading": {
      const ans = answer as ReadingAnswer;
      const isCorrect = ans.selectedIndex === exercise.correctIndex;
      return {
        isCorrect,
        feedback_he: isCorrect
          ? randomItem(CORRECT_MESSAGES)
          : `${randomItem(WRONG_MESSAGES)} התשובה הנכונה: "${exercise.options_he[exercise.correctIndex]}"`,
        points: isCorrect ? 10 : 0,
      };
    }
  }
}

/** Returns total max points for a lesson's exercises */
export function maxPoints(count: number): number {
  return count * 10;
}

/** Returns percentage score (0–100) */
export function scorePercent(earned: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((earned / total) * 100);
}
