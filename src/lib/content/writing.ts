/** Writing module content — 8 topics with prompts, starters, and tips */

export interface WritingTopic {
  id: string;
  title_he: string;
  title_en: string;
  icon: string;
  color: string; // Tailwind gradient
  prompt_he: string; // Hebrew instruction
  prompt_en: string; // English sub-prompt
  sentenceStarters: string[]; // English starters (clickable)
  tips_he: string[]; // Hebrew grammar tips
  wordGoal: number; // target word count
  level: "easy" | "medium" | "hard";
}

export const WRITING_TOPICS: WritingTopic[] = [
  {
    id: "w-about-me",
    title_he: "אני",
    title_en: "About Me",
    icon: "😊",
    color: "from-blue-400 to-blue-600",
    prompt_he: "כתוב/י כמה משפטים על עצמך באנגלית",
    prompt_en: "Write about who you are, where you live, and what you like.",
    sentenceStarters: [
      "My name is ...",
      "I am ... years old.",
      "I live in ...",
      "I like ...",
      "My favorite color is ...",
      "I have ... brothers/sisters.",
    ],
    tips_he: [
      "עם I משתמשים ב-am: I am happy.",
      "מילים שאוהבים: I like / I love + שם עצם",
      "גיל: I am ten years old.",
    ],
    wordGoal: 30,
    level: "easy",
  },

  {
    id: "w-my-family",
    title_he: "המשפחה שלי",
    title_en: "My Family",
    icon: "👨‍👩‍👧",
    color: "from-purple-400 to-purple-600",
    prompt_he: "תאר/י את המשפחה שלך — מי הם ומה הם עושים",
    prompt_en: "Write about the members of your family and describe them.",
    sentenceStarters: [
      "My family has ... people.",
      "My mother is ...",
      "My father works as a ...",
      "I have a brother/sister named ...",
      "My grandmother ...",
      "We like to ...",
    ],
    tips_he: [
      "עם He/She משתמשים ב-is: My father is tall.",
      "שייכות: My mother's name is... / My brother's bag is...",
      "פעולות: My mother cooks / My father reads.",
    ],
    wordGoal: 35,
    level: "easy",
  },

  {
    id: "w-my-day",
    title_he: "היום שלי",
    title_en: "My Day",
    icon: "⏰",
    color: "from-teal-400 to-teal-600",
    prompt_he: "תאר/י יום רגיל שלך — בוקר, צהריים, ערב",
    prompt_en: "Write about your daily routine from morning to evening.",
    sentenceStarters: [
      "I wake up at ...",
      "In the morning, I ...",
      "At school, I ...",
      "For lunch, I eat ...",
      "After school, I ...",
      "In the evening, I ...",
      "I go to sleep at ...",
    ],
    tips_he: [
      "הווה פשוט לשגרה: I wake up / I eat / I go",
      "זמן: at + שעה (at seven o'clock)",
      "סדר: First... Then... After that... Finally...",
    ],
    wordGoal: 40,
    level: "easy",
  },

  {
    id: "w-my-hobby",
    title_he: "התחביב שלי",
    title_en: "My Hobby",
    icon: "⚽",
    color: "from-orange-400 to-orange-600",
    prompt_he: "כתוב/י על התחביב שלך — מה, מתי, ולמה אתה/ת אוהב/ת",
    prompt_en: "Write about your hobby or favourite activity.",
    sentenceStarters: [
      "My hobby is ...",
      "I like to ...",
      "I play/do ... every ...",
      "I am good at ...",
      "My favourite ... is ...",
      "I started ... when I was ...",
    ],
    tips_he: [
      "I like + שם עצם: I like football.",
      "I like + ing: I like playing football.",
      "תדירות: every day / every week / on Saturdays",
    ],
    wordGoal: 40,
    level: "medium",
  },

  {
    id: "w-my-friend",
    title_he: "החבר הכי טוב שלי",
    title_en: "My Best Friend",
    icon: "🤝",
    color: "from-pink-400 to-pink-600",
    prompt_he: "כתוב/י על החבר/ה הכי טוב/ה שלך",
    prompt_en: "Describe your best friend — who they are and what you do together.",
    sentenceStarters: [
      "My best friend's name is ...",
      "He/She is ... years old.",
      "He/She has ... hair.",
      "We like to ...",
      "We met ...",
      "My friend is very ...",
    ],
    tips_he: [
      "עם He/She: He is / She is / He has / She has",
      "תיאור: He is tall and funny.",
      "ביחד: We play / We go / We like",
    ],
    wordGoal: 40,
    level: "medium",
  },

  {
    id: "w-my-animal",
    title_he: "החיה האהובה עלי",
    title_en: "My Favourite Animal",
    icon: "🐾",
    color: "from-green-400 to-green-600",
    prompt_he: "כתוב/י על החיה האהובה עליך — מה היא יכולה לעשות ולמה אתה/ת אוהב/ת אותה",
    prompt_en: "Write about your favourite animal and describe it.",
    sentenceStarters: [
      "My favourite animal is ...",
      "It is ...",
      "It lives in ...",
      "It can ...",
      "It has ...",
      "I like it because ...",
    ],
    tips_he: [
      "יכולת: It can swim / It can fly / It can run fast.",
      "תיאור: It is big/small/beautiful.",
      "חלקי גוף: It has four legs / two wings.",
    ],
    wordGoal: 35,
    level: "medium",
  },

  {
    id: "w-last-weekend",
    title_he: "סוף השבוע שעבר",
    title_en: "Last Weekend",
    icon: "📅",
    color: "from-indigo-400 to-indigo-600",
    prompt_he: "כתוב/י מה עשית בסוף השבוע האחרון — שבת ויום ראשון",
    prompt_en: "Write about what you did last weekend.",
    sentenceStarters: [
      "Last weekend, I ...",
      "On Saturday, I ...",
      "On Sunday, I ...",
      "I went to ...",
      "I ate ...",
      "I was very ...",
      "It was a ... day!",
    ],
    tips_he: [
      "עבר: went (go), ate (eat), watched (watch), played (play)",
      "עבר לא רגולרי: go→went, eat→ate, see→saw",
      "תיאור: It was great! / It was fun! / I was happy.",
    ],
    wordGoal: 50,
    level: "hard",
  },

  {
    id: "w-dream-vacation",
    title_he: "חופשת החלומות",
    title_en: "My Dream Vacation",
    icon: "✈️",
    color: "from-cyan-400 to-cyan-600",
    prompt_he: "תאר/י את חופשת החלומות שלך — לאן תנסוע ומה תעשה שם",
    prompt_en: "Write about your dream vacation — where would you go and what would you do?",
    sentenceStarters: [
      "My dream vacation is ...",
      "I want to go to ...",
      "I will see ...",
      "I am going to ...",
      "I will eat ...",
      "I will visit ...",
      "It will be ...",
    ],
    tips_he: [
      "עתיד עם going to: I am going to visit Paris.",
      "עתיד עם will: I will see the Eiffel Tower.",
      "תיאורים: It will be amazing / beautiful / exciting.",
    ],
    wordGoal: 50,
    level: "hard",
  },
];

export const LEVEL_COLORS = {
  easy: { badge: "bg-green-100 text-green-700", icon: "🟢" },
  medium: { badge: "bg-yellow-100 text-yellow-700", icon: "🟡" },
  hard: { badge: "bg-red-100 text-red-700", icon: "🔴" },
} as const;
