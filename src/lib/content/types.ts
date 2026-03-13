/** Topics for vocabulary grouping */
export type VocabTopic =
  | "school"
  | "family"
  | "food"
  | "animals"
  | "colors"
  | "body"
  | "time"
  | "weather"
  | "home"
  | "numbers"
  | "greetings"
  | "clothes"
  | "places"
  | "daily_actions"
  | "verbs"
  | "adjectives"
  | "technology"
  | "nature"
  | "professions"
  | "emotions"
  | "sports"
  | "travel"
  | "shopping"
  | "health"
  | "transportation"
  | "hobbies";

export const TOPIC_LABELS: Record<VocabTopic, string> = {
  school: "בית ספר",
  family: "משפחה ואנשים",
  food: "אוכל ושתייה",
  animals: "בעלי חיים",
  colors: "צבעים וצורות",
  body: "גוף האדם",
  time: "מספרים וזמן",
  weather: "מזג אוויר ועונות",
  home: "בית וחדרים",
  numbers: "מספרים",
  greetings: "ברכות",
  clothes: "ביגוד",
  places: "מקומות בעיר",
  daily_actions: "פעולות יומיומיות",
  verbs: "פעלים",
  adjectives: "שמות תואר",
  technology: "טכנולוגיה",
  nature: "טבע וסביבה",
  professions: "מקצועות",
  emotions: "רגשות",
  sports: "ספורט",
  travel: "נסיעות",
  shopping: "קניות",
  health: "בריאות",
  transportation: "תחבורה",
  hobbies: "תחביבים",
};

export const TOPIC_EMOJIS: Record<VocabTopic, string> = {
  school: "📚",
  family: "👨‍👩‍👧",
  food: "🍎",
  animals: "🐱",
  colors: "🌈",
  body: "👁️",
  time: "⏰",
  weather: "☀️",
  home: "🏠",
  numbers: "🔢",
  greetings: "👋",
  clothes: "👕",
  places: "🏙️",
  daily_actions: "🏃",
  verbs: "⚡",
  adjectives: "🎨",
  technology: "💻",
  nature: "🌿",
  professions: "👨‍⚕️",
  emotions: "😊",
  sports: "⚽",
  travel: "✈️",
  shopping: "🛍️",
  health: "🏥",
  transportation: "🚗",
  hobbies: "🎮",
};

/** A single vocabulary item */
export interface VocabularyItem {
  id: string;
  word: string; // English
  translation_he: string; // Hebrew
  example_sentence_en: string;
  audioText: string; // Text for TTS (may differ slightly)
  topic: VocabTopic;
  difficulty: "A1";
  emoji?: string;
}

/** Skill targets for a lesson */
export type SkillTarget = "listening" | "speaking" | "reading" | "writing" | "vocabulary" | "grammar";

/** A lesson definition */
export interface Lesson {
  id: string;
  title_he: string;
  subtitle_he: string;
  objective_he: string;
  icon: string;
  skillTargets: SkillTarget[];
  exerciseIds: string[];
  vocabularyIds: string[];
  estimatedMinutes: number;
  color: string; // Tailwind gradient color
}
