/** Speaking Practice module — Daily Expressions, Dialogues, Q&A, Role Play */

// ─── Daily Expressions ────────────────────────────────────────────────────────
export interface SpeakingExpression {
  id: string;
  expression_en: string;
  translation_he: string;
  context_he: string;
  example_en: string;
  category: "greetings" | "reactions" | "requests" | "feelings" | "daily";
}

export const DAILY_EXPRESSIONS: SpeakingExpression[] = [
  // Greetings
  { id: "exp-01", expression_en: "How are you doing?", translation_he: "מה נשמע?", context_he: "לברך חבר בפגישה", example_en: "Hi Tom! How are you doing today?", category: "greetings" },
  { id: "exp-02", expression_en: "Nice to meet you!", translation_he: "נעים להכיר!", context_he: "כשנפגשים עם מישהו בפעם הראשונה", example_en: "Hi, I'm Sara. Nice to meet you!", category: "greetings" },
  { id: "exp-03", expression_en: "Long time no see!", translation_he: "הרבה זמן לא התראינו!", context_he: "כשרואים מישהו אחרי זמן רב", example_en: "Wow, long time no see! How have you been?", category: "greetings" },
  { id: "exp-04", expression_en: "Have a nice day!", translation_he: "יום נעים!", context_he: "נפרדים ממישהו בבוקר", example_en: "Bye! Have a nice day!", category: "greetings" },
  { id: "exp-05", expression_en: "See you later!", translation_he: "נתראה אחר כך!", context_he: "נפרדים מחבר", example_en: "I have to go now. See you later!", category: "greetings" },
  { id: "exp-06", expression_en: "Take care!", translation_he: "תשמור על עצמך!", context_he: "ברכת פרידה חמה", example_en: "Bye, take care! See you tomorrow.", category: "greetings" },
  { id: "exp-07", expression_en: "Good luck!", translation_he: "בהצלחה!", context_he: "לפני מבחן או אתגר", example_en: "You have a test today? Good luck!", category: "greetings" },

  // Reactions
  { id: "exp-08", expression_en: "That's awesome!", translation_he: "זה מדהים!", context_he: "כשמשהו מרשים מאד", example_en: "You won first place? That's awesome!", category: "reactions" },
  { id: "exp-09", expression_en: "No way!", translation_he: "אין מצב!", context_he: "כשמשהו מפתיע מאד", example_en: "You met the singer? No way!", category: "reactions" },
  { id: "exp-10", expression_en: "Are you kidding me?", translation_he: "אתה冗談ל בצחוק?", context_he: "כשמשהו מאד מפתיע", example_en: "We got a day off school? Are you kidding me?", category: "reactions" },
  { id: "exp-11", expression_en: "That's too bad.", translation_he: "זה ממש חבל.", context_he: "כשמישהו מספר על משהו רע שקרה לו", example_en: "You missed the party? That's too bad.", category: "reactions" },
  { id: "exp-12", expression_en: "You're welcome!", translation_he: "בבקשה! / אין בעד מה!", context_he: "תשובה ל-Thank you", example_en: "Thank you for helping me! — You're welcome!", category: "reactions" },
  { id: "exp-13", expression_en: "My pleasure!", translation_he: "בכיף! / בשמחה!", context_he: "תשובה מנומסת ל-Thank you", example_en: "Thanks for the gift! — My pleasure!", category: "reactions" },

  // Requests
  { id: "exp-14", expression_en: "Could you repeat that?", translation_he: "אתה יכול לחזור על זה?", context_he: "כשלא שמעת טוב", example_en: "Sorry, could you repeat that? I didn't hear.", category: "requests" },
  { id: "exp-15", expression_en: "Can you speak more slowly?", translation_he: "אתה יכול לדבר יותר לאט?", context_he: "כשהדובר מדבר מהר מדי", example_en: "Can you speak more slowly, please?", category: "requests" },
  { id: "exp-16", expression_en: "What do you mean?", translation_he: "למה אתה מתכוון?", context_he: "כשלא הבנת משהו", example_en: "What do you mean by that?", category: "requests" },
  { id: "exp-17", expression_en: "I don't understand.", translation_he: "אני לא מבין.", context_he: "כשמשהו לא ברור", example_en: "Sorry, I don't understand. Can you explain?", category: "requests" },
  { id: "exp-18", expression_en: "Let me know.", translation_he: "תעדכן אותי.", context_he: "לבקש מישהו לעדכן אותך", example_en: "If you decide to come, let me know.", category: "requests" },
  { id: "exp-19", expression_en: "No worries!", translation_he: "אין בעיה! / לא נורא!", context_he: "כשמישהו מתנצל", example_en: "Sorry I'm late! — No worries, it's okay!", category: "requests" },
  { id: "exp-20", expression_en: "Excuse me.", translation_he: "סליחה / רשות.", context_he: "לבקש עבור דרך, לשאול שאלה", example_en: "Excuse me, where is the bathroom?", category: "requests" },

  // Feelings
  { id: "exp-21", expression_en: "I'm on my way!", translation_he: "אני בדרך!", context_he: "כשאתה הולך למקום", example_en: "Wait for me! I'm on my way!", category: "feelings" },
  { id: "exp-22", expression_en: "I can't wait!", translation_he: "אני כבר לא מחכה (מתרגש)!", context_he: "כשמשהו מרגש מתקרב", example_en: "The trip is tomorrow! I can't wait!", category: "feelings" },
  { id: "exp-23", expression_en: "I'm not sure.", translation_he: "אני לא בטוח.", context_he: "כשאתה לא יודע משהו בוודאות", example_en: "Is the test on Monday? I'm not sure.", category: "feelings" },
  { id: "exp-24", expression_en: "I feel like...", translation_he: "אני מרגיש שב...", context_he: "לבטא רצון או תחושה", example_en: "I feel like eating pizza tonight.", category: "feelings" },
  { id: "exp-25", expression_en: "Same here!", translation_he: "גם אני! / אותו דבר!", context_he: "להסכים עם מישהו", example_en: "I love chocolate! — Same here!", category: "feelings" },
  { id: "exp-26", expression_en: "What a surprise!", translation_he: "איזו הפתעה!", context_he: "כשמשהו לא צפוי קורה", example_en: "You're here! What a surprise!", category: "feelings" },

  // Daily
  { id: "exp-27", expression_en: "What's up?", translation_he: "מה קורה?", context_he: "פתיחת שיחה קצרה עם חבר", example_en: "Hey! What's up?", category: "daily" },
  { id: "exp-28", expression_en: "Hang on a second.", translation_he: "רגע אחד.", context_he: "לבקש שמישהו ימתין", example_en: "Hang on a second, I'll be right back.", category: "daily" },
  { id: "exp-29", expression_en: "That makes sense.", translation_he: "זה הגיוני. / אני מבין.", context_he: "כשמשהו מובן לך עכשיו", example_en: "Oh, that makes sense! Thanks for explaining.", category: "daily" },
  { id: "exp-30", expression_en: "By the way...", translation_he: "אגב...", context_he: "להוסיף מידע שלא קשור ישירות", example_en: "By the way, did you hear about the new movie?", category: "daily" },
];

// ─── Interactive Dialogues ────────────────────────────────────────────────────
export interface DialogueChoice {
  text_en: string;
  translation_he: string;
  isCorrect: boolean;
  feedback_he: string;
}

export interface DialogueTurn {
  speaker: "A" | "B"; // A = the "other person", B = the player
  text_en: string;
  translation_he: string;
  choices?: DialogueChoice[]; // only on player turns
}

export interface InteractiveDialogue {
  id: string;
  title_he: string;
  situation_he: string;
  icon: string;
  color: string;
  turns: DialogueTurn[];
  vocab_tips: string[];
}

export const DIALOGUES: InteractiveDialogue[] = [
  {
    id: "dial-01",
    title_he: "היכרות עם חבר חדש",
    situation_he: "יום ראשון בבית הספר. ילד חדש ניגש אליך.",
    icon: "👋",
    color: "from-blue-400 to-blue-600",
    turns: [
      { speaker: "A", text_en: "Hi! I'm new here. My name is Liam.", translation_he: "היי! אני חדש פה. שמי ליאם." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Hi Liam! Nice to meet you! I'm Dan.", translation_he: "היי ליאם! נעים להכיר! אני דן.", isCorrect: true, feedback_he: "מצוין! זו בדיוק הדרך להיכרות!" },
          { text_en: "I don't talk to new kids.", translation_he: "אני לא מדבר עם ילדים חדשים.", isCorrect: false, feedback_he: "לא נחמד... נסה שוב!" },
          { text_en: "Goodbye!", translation_he: "להתראות!", isCorrect: false, feedback_he: "זו לא הדרך להתחיל היכרות!" },
        ],
      },
      { speaker: "A", text_en: "Great! Where are you from, Dan?", translation_he: "נהדר! מאיפה אתה, דן?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "I'm from Tel Aviv. What about you?", translation_he: "אני מתל אביב. ואתה?", isCorrect: true, feedback_he: "שאלה חזרה — נהדר!" },
          { text_en: "I'm from the moon.", translation_he: "אני מהירח.", isCorrect: false, feedback_he: "😄 מצחיק, אבל לא מדויק!" },
          { text_en: "I don't know.", translation_he: "אני לא יודע.", isCorrect: false, feedback_he: "בטח שאתה יודע מאיפה אתה!" },
        ],
      },
      { speaker: "A", text_en: "Cool! I'm from Haifa. Do you like football?", translation_he: "מגניב! אני מחיפה. אתה אוהב כדורגל?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Yes, I love it! Do you want to play after school?", translation_he: "כן, אני אוהב את זה! אתה רוצה לשחק אחרי בית הספר?", isCorrect: true, feedback_he: "יפה! הזמנת את החבר החדש — כל הכבוד!" },
          { text_en: "No, I hate all sports.", translation_he: "לא, אני שונא כל ספורט.", isCorrect: false, feedback_he: "אפשר לענות לא, אבל בדרך נחמדה יותר!" },
          { text_en: "Football is boring.", translation_he: "כדורגל משעמם.", isCorrect: false, feedback_he: "ניסה שוב בצורה נחמדה יותר." },
        ],
      },
    ],
    vocab_tips: ["Nice to meet you", "Where are you from?", "I'm from...", "Do you want to...?"],
  },
  {
    id: "dial-02",
    title_he: "הזמנת אוכל במסעדה",
    situation_he: "אתה במסעדה. המלצר ניגש לשולחן.",
    icon: "🍕",
    color: "from-orange-400 to-orange-600",
    turns: [
      { speaker: "A", text_en: "Good evening! Can I take your order?", translation_he: "ערב טוב! אני יכול לקחת את ההזמנה שלך?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Yes, please. I'd like a pizza and a juice.", translation_he: "כן, בבקשה. אני רוצה פיצה ומיץ.", isCorrect: true, feedback_he: "מצוין! I'd like = בקשה מנומסת" },
          { text_en: "Give me food now!", translation_he: "תן לי אוכל עכשיו!", isCorrect: false, feedback_he: "זה לא מנומס! נסה שוב." },
          { text_en: "I don't know what food is.", translation_he: "אני לא יודע מה זה אוכל.", isCorrect: false, feedback_he: "😄 נסה תשובה רצינית!" },
        ],
      },
      { speaker: "A", text_en: "What size pizza would you like — small, medium, or large?", translation_he: "איזה גודל פיצה תרצה — קטנה, בינונית או גדולה?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Medium, please.", translation_he: "בינונית, בבקשה.", isCorrect: true, feedback_he: "תשובה מנומסת ופשוטה!" },
          { text_en: "The biggest one you have!", translation_he: "הכי גדולה שיש לך!", isCorrect: false, feedback_he: "אפשר, אבל ה-large הוא הכי גדול..." },
          { text_en: "I want all of them.", translation_he: "אני רוצה את כולן.", isCorrect: false, feedback_he: "😄 פיצות לא כל כך! נסה שוב." },
        ],
      },
      { speaker: "A", text_en: "Great! Anything else?", translation_he: "מצוין! עוד משהו?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "No, thank you. That's all.", translation_he: "לא, תודה. זה הכול.", isCorrect: true, feedback_he: "מושלם! אחלה הזמנה!" },
          { text_en: "Yes, I want the whole menu.", translation_he: "כן, אני רוצה את כל התפריט.", isCorrect: false, feedback_he: "😄 קצת הרבה! נסה שוב." },
          { text_en: "Food bad.", translation_he: "אוכל רע.", isCorrect: false, feedback_he: "לא הגיוני! נסה שוב." },
        ],
      },
    ],
    vocab_tips: ["I'd like...", "Could I have...?", "That's all, thank you.", "Anything else?"],
  },
  {
    id: "dial-03",
    title_he: "שאילת דרך בעיר",
    situation_he: "אתה מאבד בעיר. תייר ניגש אליך.",
    icon: "🗺️",
    color: "from-green-400 to-green-600",
    turns: [
      { speaker: "A", text_en: "Excuse me, do you know where the library is?", translation_he: "סליחה, אתה יודע איפה הספרייה?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Yes! Go straight and turn left at the traffic lights.", translation_he: "כן! לך ישר ופנה שמאלה ברמזור.", isCorrect: true, explanation_he: "תשובה מנומסת ומפורטת!" },
          { text_en: "I don't know. Find it yourself.", translation_he: "אני לא יודע. מצא לבד.", isCorrect: false, feedback_he: "לא נחמד! תנסה שוב." },
          { text_en: "Library? What is a library?", translation_he: "ספרייה? מה זה ספרייה?", isCorrect: false, feedback_he: "בטח שאתה יודע! נסה שוב." },
        ],
      },
      { speaker: "A", text_en: "Turn left? How far is it from here?", translation_he: "לפנות שמאלה? כמה רחוק מכאן?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "It's about five minutes on foot.", translation_he: "זה כחמש דקות ברגל.", isCorrect: true, feedback_he: "מצוין! On foot = ברגל" },
          { text_en: "Very, very far. Good luck!", translation_he: "רחוק מאוד. בהצלחה!", isCorrect: false, feedback_he: "לא מדויק! נסה תשובה טובה יותר." },
          { text_en: "I don't measure distances.", translation_he: "אני לא מודד מרחקים.", isCorrect: false, feedback_he: "😄 נסה שוב!" },
        ],
      },
      { speaker: "A", text_en: "Thank you so much! You're very helpful.", translation_he: "תודה רבה! אתה מאוד עוזר." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "You're welcome! Have a nice day!", translation_he: "בבקשה! יום נעים!", isCorrect: true, feedback_he: "מושלם! סיימת את הדיאלוג!" },
          { text_en: "Whatever.", translation_he: "לא אכפת לי.", isCorrect: false, feedback_he: "לא מנומס! נסה שוב." },
          { text_en: "I want money for this.", translation_he: "אני רוצה כסף בשביל זה.", isCorrect: false, feedback_he: "😄 מצחיק! אבל לא! נסה שוב." },
        ],
      },
    ],
    vocab_tips: ["Go straight", "Turn left / right", "On foot", "It's about... minutes"],
  },
  {
    id: "dial-04",
    title_he: "שיחה עם המורה",
    situation_he: "שכחת את שיעורי הבית. המורה שואל אותך.",
    icon: "📚",
    color: "from-purple-400 to-purple-600",
    turns: [
      { speaker: "A", text_en: "Did you do your homework?", translation_he: "עשית את שיעורי הבית?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "I'm sorry, I forgot. Can I bring it tomorrow?", translation_he: "אני מצטער, שכחתי. אני יכול להביא את זה מחר?", isCorrect: true, feedback_he: "מצוין! כנות + בקשה מנומסת!" },
          { text_en: "Homework? What homework?", translation_he: "שיעורי בית? איזה שיעורי בית?", isCorrect: false, feedback_he: "לא כנה! נסה שוב." },
          { text_en: "No. I don't do homework.", translation_he: "לא. אני לא עושה שיעורי בית.", isCorrect: false, feedback_he: "לא מומלץ! נסה תשובה טובה יותר." },
        ],
      },
      { speaker: "A", text_en: "Okay, but please bring it tomorrow. Do you understand the material?", translation_he: "בסדר, אבל בבקשה תביא את זה מחר. אתה מבין את החומר?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Yes, but I have one question about exercise 3.", translation_he: "כן, אבל יש לי שאלה אחת על תרגיל 3.", isCorrect: true, feedback_he: "יפה! זה מראה שאתה מעורב ולומד!" },
          { text_en: "No idea what you're talking about.", translation_he: "אין לי מושג על מה אתה מדבר.", isCorrect: false, feedback_he: "לא טוב! נסה תשובה אחרת." },
          { text_en: "Everything is boring.", translation_he: "הכול משעמם.", isCorrect: false, feedback_he: "לא נחמד למורה! נסה שוב." },
        ],
      },
    ],
    vocab_tips: ["I'm sorry", "I forgot", "Can I...?", "I have a question about..."],
  },
  {
    id: "dial-05",
    title_he: "תכנון עם חבר",
    situation_he: "חבר מתקשר אליך לתכנן את הסוף שבוע.",
    icon: "📅",
    color: "from-teal-400 to-teal-600",
    turns: [
      { speaker: "A", text_en: "Hey! Are you free this Saturday?", translation_he: "היי! אתה פנוי השבת?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Yes! What do you want to do?", translation_he: "כן! מה אתה רוצה לעשות?", isCorrect: true, feedback_he: "מצוין! ענית ושאלת חזרה!" },
          { text_en: "I'm always busy. Don't call me.", translation_he: "אני תמיד עסוק. אל תתקשר אלי.", isCorrect: false, feedback_he: "לא נחמד! נסה שוב." },
          { text_en: "What is Saturday?", translation_he: "מה זה שבת?", isCorrect: false, feedback_he: "😄 כולם יודעים מה זה שבת!" },
        ],
      },
      { speaker: "A", text_en: "Let's go to the movies! There's a new superhero film.", translation_he: "בוא נלך לסרט! יש סרט סופר-גיבור חדש." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Sounds great! What time does it start?", translation_he: "נשמע מצוין! באיזה שעה זה מתחיל?", isCorrect: true, feedback_he: "יפה! הסכמת ושאלת שאלה חשובה!" },
          { text_en: "I hate movies.", translation_he: "אני שונא סרטים.", isCorrect: false, feedback_he: "נסה תשובה יותר פתוחה." },
          { text_en: "Movies are for babies.", translation_he: "סרטים הם לתינוקות.", isCorrect: false, feedback_he: "לא נחמד! נסה שוב." },
        ],
      },
      { speaker: "A", text_en: "It starts at 4 PM. Let's meet at the cinema at 3:45.", translation_he: "זה מתחיל ב-16:00. בוא ניפגש בקולנוע ב-15:45." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Perfect! See you there!", translation_he: "מושלם! נתראה שם!", isCorrect: true, feedback_he: "נהדר! תכננתם יחד!" },
          { text_en: "I will be late probably.", translation_he: "כנראה אאחר.", isCorrect: false, feedback_he: "אפשר, אבל לא הכי טוב. נסה שוב." },
          { text_en: "I changed my mind. No.", translation_he: "שיניתי את דעתי. לא.", isCorrect: false, feedback_he: "לא נחמד! נסה שוב." },
        ],
      },
    ],
    vocab_tips: ["Are you free?", "Let's go to...", "Sounds great!", "See you there!"],
  },
];

// ─── Q&A Practice ────────────────────────────────────────────────────────────
export interface QAQuestion {
  id: string;
  question_en: string;
  translation_he: string;
  topic_he: string;
  example_answers: string[];
  vocabulary_hints: string[];
}

export const QA_QUESTIONS: QAQuestion[] = [
  {
    id: "qa-01",
    question_en: "What's your favorite food?",
    translation_he: "מה האוכל האהוב עליך?",
    topic_he: "אוכל",
    example_answers: [
      "My favorite food is pizza. I eat it every Friday.",
      "I love spaghetti because it's delicious and easy to make.",
      "My favorite food is hummus. It's a traditional Israeli food.",
    ],
    vocabulary_hints: ["My favorite food is...", "I love... because...", "It's delicious / tasty"],
  },
  {
    id: "qa-02",
    question_en: "Where do you live?",
    translation_he: "איפה אתה גר?",
    topic_he: "מקום מגורים",
    example_answers: [
      "I live in Tel Aviv. It's a big and exciting city.",
      "I live in a small town near Jerusalem. It's very quiet.",
      "I live in Haifa. I can see the sea from my house!",
    ],
    vocabulary_hints: ["I live in...", "It's a big / small / quiet / exciting city", "near..."],
  },
  {
    id: "qa-03",
    question_en: "What do you like to do after school?",
    translation_he: "מה אתה אוהב לעשות אחרי בית הספר?",
    topic_he: "תחביבים",
    example_answers: [
      "After school I play football with my friends. It's fun!",
      "I like to watch TV and relax. Sometimes I read books.",
      "I go to a guitar class after school. I love music!",
    ],
    vocabulary_hints: ["After school I...", "I like to...", "I love / enjoy..."],
  },
  {
    id: "qa-04",
    question_en: "Tell me about your family.",
    translation_he: "ספר לי על המשפחה שלך.",
    topic_he: "משפחה",
    example_answers: [
      "I have a small family — mom, dad, and one sister. My sister is 8 years old.",
      "I live with my parents and two brothers. We are a big family.",
      "My family is me, my mom, and my grandma. My grandma makes amazing food!",
    ],
    vocabulary_hints: ["I have...", "My brother / sister is... years old", "We are a big / small family"],
  },
  {
    id: "qa-05",
    question_en: "What did you do yesterday?",
    translation_he: "מה עשית אתמול?",
    topic_he: "פעולות בעבר",
    example_answers: [
      "Yesterday I went to school, played football, and watched TV.",
      "I stayed home because I was sick. I read a book and slept a lot.",
      "Yesterday I went to my grandma's house. We ate dinner together.",
    ],
    vocabulary_hints: ["Yesterday I went to...", "I stayed home", "We ate / played / watched..."],
  },
  {
    id: "qa-06",
    question_en: "What are your hobbies?",
    translation_he: "מה התחביבים שלך?",
    topic_he: "תחביבים",
    example_answers: [
      "My hobbies are reading and drawing. I draw every day.",
      "I love playing video games and swimming. Sport is important!",
      "I like cooking with my mom and playing chess with my dad.",
    ],
    vocabulary_hints: ["My hobbies are...", "I like / love...", "I enjoy..."],
  },
  {
    id: "qa-07",
    question_en: "What is your favorite subject at school?",
    translation_he: "מה המקצוע האהוב עליך בבית הספר?",
    topic_he: "בית ספר",
    example_answers: [
      "My favorite subject is math. I love solving problems!",
      "I like English best because I want to travel the world.",
      "Science is my favorite. We do experiments and it's exciting!",
    ],
    vocabulary_hints: ["My favorite subject is...", "I love / like it because...", "I want to..."],
  },
  {
    id: "qa-08",
    question_en: "Describe your best friend.",
    translation_he: "תאר את החבר הכי טוב שלך.",
    topic_he: "אנשים",
    example_answers: [
      "My best friend is Tom. He is tall, funny, and very kind.",
      "My best friend is Noa. She has long brown hair and she loves animals.",
      "My best friend is David. We go to the same class. He is smart and helpful.",
    ],
    vocabulary_hints: ["My best friend is...", "He / She is...", "We...", "tall / short / funny / kind / smart"],
  },
  {
    id: "qa-09",
    question_en: "What do you want to be when you grow up?",
    translation_he: "מה אתה רוצה להיות כשתגדל?",
    topic_he: "עתיד ומקצועות",
    example_answers: [
      "I want to be a doctor because I want to help sick people.",
      "I want to be a footballer! I practice every day.",
      "I want to be a programmer. Computers are amazing!",
    ],
    vocabulary_hints: ["I want to be a...", "because...", "I like / love...", "I practice..."],
  },
  {
    id: "qa-10",
    question_en: "What's the weather like today?",
    translation_he: "איך מזג האוויר היום?",
    topic_he: "מזג אוויר",
    example_answers: [
      "Today it is sunny and warm. I love this weather!",
      "It's cloudy and cold today. I think it will rain.",
      "The weather is perfect today — not too hot, not too cold!",
    ],
    vocabulary_hints: ["It's sunny / cloudy / rainy / cold / hot", "The weather is...", "I think it will..."],
  },
];

// ─── Role Play ────────────────────────────────────────────────────────────────
export interface RolePlayStep {
  situation_he: string;
  partner_says_en: string;
  partner_says_he: string;
  player_choices: {
    text_en: string;
    translation_he: string;
    isCorrect: boolean;
    feedback_he: string;
  }[];
}

export interface RolePlay {
  id: string;
  title_he: string;
  situation_he: string;
  player_role_he: string;
  partner_role_he: string;
  icon: string;
  color: string;
  steps: RolePlayStep[];
  vocab_tips: string[];
}

export const ROLE_PLAYS: RolePlay[] = [
  {
    id: "rp-01",
    title_he: "קניות בחנות ספרים",
    situation_he: "אתה בחנות ספרים. אתה מחפש ספר מתנה לחבר שלך.",
    player_role_he: "לקוח בחנות ספרים",
    partner_role_he: "מוכר בחנות",
    icon: "📚",
    color: "from-yellow-400 to-orange-500",
    steps: [
      {
        situation_he: "אתה נכנס לחנות. המוכר ניגש אליך.",
        partner_says_en: "Good morning! Can I help you?",
        partner_says_he: "בוקר טוב! אני יכול לעזור לך?",
        player_choices: [
          { text_en: "Yes, please! I'm looking for a book for my friend.", translation_he: "כן, בבקשה! אני מחפש ספר לחבר שלי.", isCorrect: true, feedback_he: "מצוין! I'm looking for = אני מחפש" },
          { text_en: "No. I'm just standing here.", translation_he: "לא. אני רק עומד פה.", isCorrect: false, feedback_he: "נסה שוב!" },
          { text_en: "Where is the bathroom?", translation_he: "איפה השירותים?", isCorrect: false, feedback_he: "אתה בחנות ספרים! נסה שוב." },
        ],
      },
      {
        situation_he: "המוכר שואל על גיל החבר.",
        partner_says_en: "Great! How old is your friend?",
        partner_says_he: "מצוין! בן כמה החבר שלך?",
        player_choices: [
          { text_en: "He is 11 years old. He loves adventure stories.", translation_he: "הוא בן 11. הוא אוהב סיפורי הרפתקאות.", isCorrect: true, feedback_he: "נהדר! נתת מידע שימושי!" },
          { text_en: "I don't know how old he is.", translation_he: "אני לא יודע בן כמה הוא.", isCorrect: false, feedback_he: "נסה שוב — בטח שאתה יודע!" },
          { text_en: "Very old.", translation_he: "מאוד זקן.", isCorrect: false, feedback_he: "😄 לא מדויק! נסה שוב." },
        ],
      },
      {
        situation_he: "המוכר ממליץ על ספר.",
        partner_says_en: "I recommend this book — it's a great adventure story!",
        partner_says_he: "אני ממליץ על הספר הזה — זה סיפור הרפתקאות נהדר!",
        player_choices: [
          { text_en: "How much does it cost?", translation_he: "כמה זה עולה?", isCorrect: true, feedback_he: "שאלה חשובה! How much = כמה" },
          { text_en: "I hate books.", translation_he: "אני שונא ספרים.", isCorrect: false, feedback_he: "אתה בחנות ספרים! נסה שוב." },
          { text_en: "Is this book for babies?", translation_he: "הספר הזה הוא לתינוקות?", isCorrect: false, feedback_he: "לא מנומס! נסה שוב." },
        ],
      },
    ],
    vocab_tips: ["I'm looking for...", "How much does it cost?", "Do you have...?", "I'll take it!"],
  },
  {
    id: "rp-02",
    title_he: "אצל הרופא",
    situation_he: "אתה מרגיש לא טוב. אתה אצל הרופא.",
    player_role_he: "חולה",
    partner_role_he: "רופא",
    icon: "🏥",
    color: "from-green-400 to-teal-500",
    steps: [
      {
        situation_he: "הרופא שואל מה קרה.",
        partner_says_en: "Good morning! What's the problem today?",
        partner_says_he: "בוקר טוב! מה הבעיה היום?",
        player_choices: [
          { text_en: "I have a headache and a sore throat. I feel terrible.", translation_he: "יש לי כאב ראש וכאב גרון. אני מרגיש נורא.", isCorrect: true, feedback_he: "מצוין! תיארת את הסימפטומים!" },
          { text_en: "Nothing. I'm fine actually.", translation_he: "כלום. אני בסדר בעצם.", isCorrect: false, feedback_he: "אז למה אתה אצל הרופא? נסה שוב!" },
          { text_en: "I want medicine.", translation_he: "אני רוצה תרופות.", isCorrect: false, feedback_he: "קודם צריך לתאר את הבעיה!" },
        ],
      },
      {
        situation_he: "הרופא שואל מתי זה התחיל.",
        partner_says_en: "How long have you felt this way?",
        partner_says_he: "כמה זמן אתה מרגיש ככה?",
        player_choices: [
          { text_en: "Since yesterday. I also have a fever.", translation_he: "מאתמול. יש לי גם חום.", isCorrect: true, feedback_he: "מצוין! Since = מאז" },
          { text_en: "Forever. I was always sick.", translation_he: "תמיד. תמיד הייתי חולה.", isCorrect: false, feedback_he: "נסה לתת תשובה מדויקת יותר." },
          { text_en: "I don't remember.", translation_he: "אני לא זוכר.", isCorrect: false, feedback_he: "נסה שוב!" },
        ],
      },
      {
        situation_he: "הרופא נותן לך מרשם.",
        partner_says_en: "I'll give you some medicine. Rest at home and drink lots of water.",
        partner_says_he: "אני אתן לך תרופות. תנוח בבית ותשתה הרבה מים.",
        player_choices: [
          { text_en: "Thank you, doctor. How many times a day should I take the medicine?", translation_he: "תודה, רופא. כמה פעמים ביום אני אמור לקחת את התרופות?", isCorrect: true, feedback_he: "שאלה חשובה! מצוין!" },
          { text_en: "No medicine for me, thanks.", translation_he: "לא תרופות בשבילי, תודה.", isCorrect: false, feedback_he: "אבל אתה חולה! נסה שוב." },
          { text_en: "Can I still go to school?", translation_he: "אני עדיין יכול ללכת לבית ספר?", isCorrect: false, feedback_he: "אפשר, אבל שאלה על התרופות יותר חשובה!" },
        ],
      },
    ],
    vocab_tips: ["I have a headache / sore throat / fever", "Since yesterday", "How many times a day?", "Thank you, doctor"],
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────
export const SPEAKING_XP = {
  expression: 5,    // completing an expression review
  dialogue: 20,     // completing a full dialogue
  qa: 10,           // completing a Q&A question
  roleplay: 30,     // completing a role play
} as const;
