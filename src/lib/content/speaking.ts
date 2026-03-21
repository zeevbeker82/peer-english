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

// ─── Additional Expressions (Set 2) ───────────────────────────────────────────
export const DAILY_EXPRESSIONS_2: SpeakingExpression[] = [
  // Reactions
  { id: "sp2_exp-01", expression_en: "That's awesome!", translation_he: "זה מדהים/מעולה!", context_he: "כשמשהו ממש מרשים או מגניב", example_en: "You got a hundred on the test? That's awesome!", category: "reactions" },
  { id: "sp2_exp-02", expression_en: "No way!", translation_he: "אין מצב! / לא ייתכן!", context_he: "כשמשהו מפתיע מאד או לא יאומן", example_en: "They cancelled school today? No way!", category: "reactions" },
  { id: "sp2_exp-03", expression_en: "Are you serious?", translation_he: "אתה רציני? / בצינה?", context_he: "כשמשהו קשה להאמין", example_en: "We have a test on Friday AND Monday? Are you serious?", category: "reactions" },
  { id: "sp2_exp-04", expression_en: "I can't believe it!", translation_he: "אני לא מאמין/לא יכול להאמין בזה!", context_he: "כשמשהו מדהים מאד קורה", example_en: "You won the competition? I can't believe it!", category: "reactions" },

  // Opinions
  { id: "sp2_exp-05", expression_en: "What do you think about...?", translation_he: "מה אתה חושב על...?", context_he: "לשאול את דעת מישהו", example_en: "What do you think about the new teacher?", category: "daily" },
  { id: "sp2_exp-06", expression_en: "In my opinion...", translation_he: "לדעתי... / לפי דעתי...", context_he: "לבטא דעה אישית", example_en: "In my opinion, this movie is the best of the year.", category: "daily" },
  { id: "sp2_exp-07", expression_en: "I agree!", translation_he: "אני מסכים!", context_he: "כשאתה מסכים עם מה שנאמר", example_en: "Pizza is the best food! — I agree!", category: "feelings" },
  { id: "sp2_exp-08", expression_en: "I disagree.", translation_he: "אני לא מסכים.", context_he: "כשאתה לא מסכים, בצורה מנומסת", example_en: "I disagree. I think math is easier than English.", category: "feelings" },

  // Requests / Clarification
  { id: "sp2_exp-09", expression_en: "Could you help me?", translation_he: "אתה יכול לעזור לי?", context_he: "לבקש עזרה בצורה מנומסת", example_en: "Excuse me, could you help me find the library?", category: "requests" },
  { id: "sp2_exp-10", expression_en: "What does that mean?", translation_he: "מה זה אומר? / מה המשמעות?", context_he: "כשאתה לא מבין מילה או משפט", example_en: "What does 'enormous' mean? Is it the same as 'big'?", category: "requests" },
  { id: "sp2_exp-11", expression_en: "Can you repeat that?", translation_he: "אתה יכול לחזור על זה?", context_he: "כשלא שמעת או לא הבנת", example_en: "Sorry, can you repeat that? I didn't catch it.", category: "requests" },

  // Time expressions
  { id: "sp2_exp-12", expression_en: "Eventually...", translation_he: "בסופו של דבר... / לבסוף...", context_he: "לתאר משהו שקורה אחרי זמן מה", example_en: "I was nervous at first, but eventually I felt fine.", category: "daily" },
  { id: "sp2_exp-13", expression_en: "Meanwhile...", translation_he: "בינתיים...", context_he: "לתאר דברים שקורים בו זמנית", example_en: "I was doing homework. Meanwhile, my sister was watching TV.", category: "daily" },
  { id: "sp2_exp-14", expression_en: "By the time...", translation_he: "עד שה... / בשעה שה...", context_he: "לתאר שני דברים ביחס לזמן", example_en: "By the time I arrived, the party had already started.", category: "daily" },

  // School
  { id: "sp2_exp-15", expression_en: "I finished!", translation_he: "סיימתי!", context_he: "כשגמרת משימה", example_en: "I finished! Can I go out to play?", category: "daily" },
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
          { text_en: "Yes! Go straight and turn left at the traffic lights.", translation_he: "כן! לך ישר ופנה שמאלה ברמזור.", isCorrect: true, feedback_he: "תשובה מנומסת ומפורטת!" },
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

// ─── Additional Dialogues (Set 2) ─────────────────────────────────────────────
export const DIALOGUES_2: InteractiveDialogue[] = [
  {
    id: "sp2_dial-01",
    title_he: "אצל הרופא",
    situation_he: "אתה מרגיש לא טוב ואמא שלך לוקחת אותך לרופא.",
    icon: "🏥",
    color: "from-red-400 to-pink-600",
    turns: [
      { speaker: "A", text_en: "Good morning! Please sit down. How are you feeling today?", translation_he: "בוקר טוב! בבקשה שב. איך אתה מרגיש היום?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Not very well. I have a stomachache and a headache.", translation_he: "לא כל כך טוב. יש לי כאב בטן וכאב ראש.", isCorrect: true, feedback_he: "מצוין! תיארת את הסימפטומים שלך!" },
          { text_en: "I feel amazing, thanks!", translation_he: "אני מרגיש נפלא, תודה!", isCorrect: false, feedback_he: "אתה אצל הרופא כי אתה חולה — נסה שוב!" },
          { text_en: "I don't want to be here.", translation_he: "אני לא רוצה להיות פה.", isCorrect: false, feedback_he: "נסה לתאר איך אתה מרגיש!" },
        ],
      },
      { speaker: "A", text_en: "I see. How long have you had these symptoms?", translation_he: "אני מבין. כמה זמן יש לך את הסימפטומים האלה?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Since this morning. I also have a little fever.", translation_he: "מהבוקר. יש לי גם קצת חום.", isCorrect: true, feedback_he: "מצוין! Since = מאז. מידע מאוד שימושי לרופא!" },
          { text_en: "I don't know. Maybe one hundred years.", translation_he: "אני לא יודע. אולי מאה שנה.", isCorrect: false, feedback_he: "😄 נסה תשובה אמיתית!" },
          { text_en: "What are symptoms?", translation_he: "מה זה סימפטומים?", isCorrect: false, feedback_he: "נסה לענות על שאלת הרופא!" },
        ],
      },
      { speaker: "A", text_en: "Open your mouth, please. Say 'Aaah'.", translation_he: "פתח את הפה, בבקשה. תגיד 'אאאה'." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Aaah. Is everything okay?", translation_he: "אאאה. הכול בסדר?", isCorrect: true, feedback_he: "שיתפת פעולה ושאלת — נהדר!" },
          { text_en: "No, I won't open my mouth.", translation_he: "לא, אני לא אפתח את הפה.", isCorrect: false, feedback_he: "הרופא צריך לבדוק אותך! נסה שוב." },
          { text_en: "Why do you need my mouth?", translation_he: "למה אתה צריך את הפה שלי?", isCorrect: false, feedback_he: "הרופא בודק את הגרון! נסה לשתף פעולה." },
        ],
      },
      { speaker: "A", text_en: "Your throat is a little red. I'll give you medicine. Rest at home for two days.", translation_he: "הגרון שלך קצת אדום. אני אתן לך תרופות. תנוח בבית יומיים." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Thank you, doctor. Should I drink lots of water?", translation_he: "תודה, רופא. האם אני אמור לשתות הרבה מים?", isCorrect: true, feedback_he: "מושלם! שאלה מאוד טובה לרופא!" },
          { text_en: "Two days? I want more!", translation_he: "יומיים? אני רוצה יותר!", isCorrect: false, feedback_he: "😄 מצחיק, אבל נסה תשובה מנומסת יותר." },
          { text_en: "I hate medicine.", translation_he: "אני שונא תרופות.", isCorrect: false, feedback_he: "נסה להגיב בצורה מנומסת יותר." },
        ],
      },
    ],
    vocab_tips: ["I have a stomachache / headache / fever", "Since this morning", "Is everything okay?", "Should I...?"],
  },
  {
    id: "sp2_dial-02",
    title_he: "תכנון מסיבת יום הולדת",
    situation_he: "אתה מתכנן מסיבת יום הולדת עם חברה שלך.",
    icon: "🎂",
    color: "from-pink-400 to-purple-500",
    turns: [
      { speaker: "A", text_en: "My birthday is next Sunday! Can you help me plan a party?", translation_he: "יום ההולדת שלי הוא ביום ראשון הבא! אתה יכול לעזור לי לתכנן מסיבה?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Of course! How many people do you want to invite?", translation_he: "כמובן! כמה אנשים אתה רוצה להזמין?", isCorrect: true, feedback_he: "נהדר! Of course = כמובן. שאלת שאלה חשובה!" },
          { text_en: "I'm too busy. Find someone else.", translation_he: "אני יותר מדי עסוק. מצא מישהו אחר.", isCorrect: false, feedback_he: "לא נחמד לחבר! נסה שוב." },
          { text_en: "What is a party?", translation_he: "מה זה מסיבה?", isCorrect: false, feedback_he: "כולם יודעים מה זה מסיבה! נסה שוב." },
        ],
      },
      { speaker: "A", text_en: "About fifteen friends. I want to have it at the park.", translation_he: "בערך חמישה עשר חברים. אני רוצה לעשות את זה בפארק." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Great idea! Shall we order a pizza? Or make sandwiches?", translation_he: "רעיון מצוין! אנחנו נזמין פיצה? או נכין כריכים?", isCorrect: true, feedback_he: "מצוין! הצעת רעיונות אוכל — חשוב למסיבה!" },
          { text_en: "The park is boring.", translation_he: "הפארק משעמם.", isCorrect: false, feedback_he: "נסה לעזור לתכנן, לא לבקר!" },
          { text_en: "Fifteen people? That's too many.", translation_he: "חמישה עשר אנשים? זה יותר מדי.", isCorrect: false, feedback_he: "נסה להיות עוזר ומעודד!" },
        ],
      },
      { speaker: "A", text_en: "Let's order pizza! And what about music and games?", translation_he: "בוא נזמין פיצה! ומה עם מוזיקה ומשחקים?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "We can make a playlist and bring a speaker. For games, how about water balloons?", translation_he: "אנחנו יכולים לעשות פלייליסט ולהביא רמקול. למשחקים, מה עם בלוני מים?", isCorrect: true, feedback_he: "רעיונות נפלאים! הצעת משחק כיפי!" },
          { text_en: "Music is too loud.", translation_he: "מוזיקה רועשת מדי.", isCorrect: false, feedback_he: "נסה לתרום רעיונות למסיבה!" },
          { text_en: "I don't know any games.", translation_he: "אני לא יודע שום משחקים.", isCorrect: false, feedback_he: "בטח יש לך רעיון! נסה שוב." },
        ],
      },
    ],
    vocab_tips: ["Of course!", "How many people?", "Great idea!", "Shall we...?", "How about...?"],
  },
  {
    id: "sp2_dial-03",
    title_he: "שיחה על סרט אהוב",
    situation_he: "אתה ממליץ לחבר על סרט שאתה אוהב.",
    icon: "🎬",
    color: "from-indigo-400 to-blue-600",
    turns: [
      { speaker: "A", text_en: "I'm bored. What good movies have you seen recently?", translation_he: "אני משועמם. אילו סרטים טובים ראית לאחרונה?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "I just watched an amazing film. It's called 'The Jungle Adventure'!", translation_he: "הרגע ראיתי סרט מדהים. הוא נקרא 'הרפתקאת הג'ונגל'!", isCorrect: true, feedback_he: "מצוין! הצגת המלצה בצורה טובה!" },
          { text_en: "I never watch movies.", translation_he: "אני אף פעם לא רואה סרטים.", isCorrect: false, feedback_he: "נסה לתת המלצה!" },
          { text_en: "Movies are bad for your eyes.", translation_he: "סרטים רעים לעיניים.", isCorrect: false, feedback_he: "😄 נסה לעזור לחבר המשועמם!" },
        ],
      },
      { speaker: "A", text_en: "What is it about?", translation_he: "על מה זה?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "It's about a group of kids who get lost in a jungle and have to survive.", translation_he: "זה על קבוצה של ילדים שאובדים בג'ונגל וצריכים לשרוד.", isCorrect: true, feedback_he: "תיאור מצוין! It's about = זה על" },
          { text_en: "I don't remember.", translation_he: "אני לא זוכר.", isCorrect: false, feedback_he: "אבל זה הסרט שהמלצת! נסה שוב." },
          { text_en: "It's a secret.", translation_he: "זה סוד.", isCorrect: false, feedback_he: "ספר לחבר על הסרט!" },
        ],
      },
      { speaker: "A", text_en: "Sounds exciting! Did you like the ending?", translation_he: "נשמע מרגש! אהבת את הסוף?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Yes! The ending was a big surprise. I didn't expect it at all!", translation_he: "כן! הסוף היה הפתעה גדולה. לא ציפיתי לזה בכלל!", isCorrect: true, feedback_he: "תיאור מצוין! I didn't expect = לא ציפיתי" },
          { text_en: "I didn't finish it.", translation_he: "לא סיימתי את זה.", isCorrect: false, feedback_he: "אבל המלצת עליו! נסה שוב." },
          { text_en: "The ending was bad.", translation_he: "הסוף היה רע.", isCorrect: false, feedback_he: "אפשר, אבל נסה לתאר יותר!" },
        ],
      },
    ],
    vocab_tips: ["It's called...", "It's about...", "The ending was...", "I didn't expect it!"],
  },
  {
    id: "sp2_dial-04",
    title_he: "במרכז הספורט",
    situation_he: "אתה רוצה להצטרף לחוג ספורט חדש.",
    icon: "⚽",
    color: "from-green-400 to-emerald-600",
    turns: [
      { speaker: "A", text_en: "Hello! Welcome to the Sports Center. How can I help you?", translation_he: "שלום! ברוך הבא למרכז הספורט. איך אני יכול לעזור לך?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Hi! I'd like to join a football group. Do you have one for my age?", translation_he: "היי! אני רוצה להצטרף לקבוצת כדורגל. יש לכם אחת בגיל שלי?", isCorrect: true, feedback_he: "מצוין! I'd like to join = אני רוצה להצטרף" },
          { text_en: "Where is the bathroom?", translation_he: "איפה השירותים?", isCorrect: false, feedback_he: "אתה כאן להצטרף לספורט! נסה שוב." },
          { text_en: "I want to buy a football.", translation_he: "אני רוצה לקנות כדור.", isCorrect: false, feedback_he: "זה מרכז ספורט, לא חנות! נסה שוב." },
        ],
      },
      { speaker: "A", text_en: "Sure! We have a group for ages 11-13. Practice is on Tuesdays and Thursdays.", translation_he: "בוודאי! יש לנו קבוצה לגילאי 11-13. האימון הוא בשלישי ובחמישי." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "That's perfect! What time does practice start?", translation_he: "זה מושלם! באיזו שעה מתחיל האימון?", isCorrect: true, feedback_he: "שאלה חשובה! הראית עניין!" },
          { text_en: "I prefer Sundays.", translation_he: "אני מעדיף ימי ראשון.", isCorrect: false, feedback_he: "אפשר לשאול על אפשרויות אחרות בצורה מנומסת." },
          { text_en: "Two days is too much.", translation_he: "יומיים זה יותר מדי.", isCorrect: false, feedback_he: "נסה להיות יותר פתוח!" },
        ],
      },
      { speaker: "A", text_en: "Practice starts at 4 PM and ends at 6 PM. Would you like to sign up?", translation_he: "האימון מתחיל ב-16:00 ומסתיים ב-18:00. תרצה להירשם?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Yes, please! Can I start next week?", translation_he: "כן, בבקשה! אני יכול להתחיל שבוע הבא?", isCorrect: true, feedback_he: "נהדר! נרשמת ושאלת שאלה חשובה!" },
          { text_en: "Maybe. I'll think about it.", translation_he: "אולי. אני אחשוב על זה.", isCorrect: false, feedback_he: "נסה לענות בצורה יותר נחרצת!" },
          { text_en: "No, actually I want to do tennis.", translation_he: "לא, בעצם אני רוצה לעשות טניס.", isCorrect: false, feedback_he: "אפשר, אבל שאלת על כדורגל — נסה שוב." },
        ],
      },
    ],
    vocab_tips: ["I'd like to join...", "What time does it start?", "Would you like to...?", "Can I start...?"],
  },
  {
    id: "sp2_dial-05",
    title_he: "שיחה על שיעורי בית",
    situation_he: "אתה מתקשר לחבר לגבי שיעורי הבית.",
    icon: "📝",
    color: "from-yellow-400 to-amber-600",
    turns: [
      { speaker: "A", text_en: "Hey! Did you finish the math homework? I'm stuck on question four.", translation_he: "היי! סיימת את שיעורי הבית במתמטיקה? אני תקוע בשאלה ארבע." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Yes, I finished it. Which part is giving you trouble?", translation_he: "כן, סיימתי. באיזה חלק יש לך בעיה?", isCorrect: true, feedback_he: "מצוין! הצעת לעזור באופן ספציפי!" },
          { text_en: "I didn't do it either.", translation_he: "גם אני לא עשיתי.", isCorrect: false, feedback_he: "נסה לענות בצורה שתעזור לחבר!" },
          { text_en: "Homework is not important.", translation_he: "שיעורי בית לא חשובים.", isCorrect: false, feedback_he: "לא נכון ולא מעזר! נסה שוב." },
        ],
      },
      { speaker: "A", text_en: "I don't understand how to find the area of a triangle.", translation_he: "אני לא מבין איך למצוא את השטח של משולש." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "It's easy! The formula is base times height divided by two.", translation_he: "זה קל! הנוסחה היא בסיס כפול גובה חלקי שתיים.", isCorrect: true, feedback_he: "מצוין! עזרת לחבר עם הנוסחה!" },
          { text_en: "I don't remember either.", translation_he: "גם אני לא זוכר.", isCorrect: false, feedback_he: "אתה אמרת שסיימת! נסה שוב." },
          { text_en: "Ask the teacher.", translation_he: "שאל את המורה.", isCorrect: false, feedback_he: "נסה לעזור לחבר עכשיו!" },
        ],
      },
      { speaker: "A", text_en: "Oh! Base times height divided by two. That makes sense! Thanks!", translation_he: "אוה! בסיס כפול גובה חלקי שתיים. זה הגיוני! תודה!" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "No problem! Let me know if you need more help.", translation_he: "אין בעיה! תודיע לי אם אתה צריך עוד עזרה.", isCorrect: true, feedback_he: "נהדר! No problem + Let me know — מושלם!" },
          { text_en: "You should have known that.", translation_he: "אתה היית צריך לדעת את זה.", isCorrect: false, feedback_he: "לא נחמד! נסה תשובה אחרת." },
          { text_en: "Whatever.", translation_he: "לא אכפת לי.", isCorrect: false, feedback_he: "לא מנומס! נסה שוב." },
        ],
      },
    ],
    vocab_tips: ["I'm stuck on...", "Which part?", "The formula is...", "That makes sense!", "Let me know if..."],
  },
  {
    id: "sp2_dial-06",
    title_he: "בסופרמרקט",
    situation_he: "אתה בסופרמרקט ומחפש מוצר.",
    icon: "🛒",
    color: "from-lime-400 to-green-500",
    turns: [
      { speaker: "A", text_en: "Excuse me, can you help me? I'm looking for the cereal.", translation_he: "סליחה, אתה יכול לעזור לי? אני מחפש את הדגן." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Sure! It's in aisle three, next to the milk.", translation_he: "בוודאי! זה במעבר שלוש, ליד החלב.", isCorrect: true, feedback_he: "מצוין! נתת הוראות ברורות ומדויקות!" },
          { text_en: "I don't work here.", translation_he: "אני לא עובד פה.", isCorrect: false, feedback_he: "אפשר לעזור גם אם אתה לא עובד! נסה שוב." },
          { text_en: "What is cereal?", translation_he: "מה זה דגן?", isCorrect: false, feedback_he: "נסה לעזור! נסה שוב." },
        ],
      },
      { speaker: "A", text_en: "Thank you! Do you know if they have whole grain cereal?", translation_he: "תודה! אתה יודע אם יש להם דגן מלא?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "I'm not sure, but you can check on the shelf or ask a worker.", translation_he: "אני לא בטוח, אבל אתה יכול לבדוק על המדף או לשאול עובד.", isCorrect: true, feedback_he: "מצוין! I'm not sure + הצעת פתרון!" },
          { text_en: "No, they don't have it.", translation_he: "לא, אין להם.", isCorrect: false, feedback_he: "אי אפשר לדעת בוודאות! נסה תשובה יותר ישרה." },
          { text_en: "I don't like cereal.", translation_he: "אני לא אוהב דגן.", isCorrect: false, feedback_he: "השאלה לא הייתה על מה אתה אוהב! נסה שוב." },
        ],
      },
      { speaker: "A", text_en: "Great idea! One more question — do you know where the checkout is?", translation_he: "רעיון מצוין! עוד שאלה — אתה יודע איפה הקופות?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Yes! It's at the front of the store, near the entrance.", translation_he: "כן! זה בחזית החנות, ליד הכניסה.", isCorrect: true, feedback_he: "מושלם! עזרת לאדם עם הוראות ברורות!" },
          { text_en: "I don't know.", translation_he: "אני לא יודע.", isCorrect: false, feedback_he: "בסופרמרקט הקופות תמיד בחזית! נסה שוב." },
          { text_en: "Checkout? What do you mean?", translation_he: "קופה? מה אתה מתכוון?", isCorrect: false, feedback_he: "נסה לעזור! נסה שוב." },
        ],
      },
    ],
    vocab_tips: ["I'm looking for...", "It's in aisle...", "near / next to", "at the front of the store"],
  },
  {
    id: "sp2_dial-07",
    title_he: "תכנון סוף שבוע",
    situation_he: "אתה ואחותך מתכננים מה לעשות בסוף השבוע.",
    icon: "🏖️",
    color: "from-violet-400 to-purple-600",
    turns: [
      { speaker: "A", text_en: "What do you want to do this weekend? I'm bored of staying home.", translation_he: "מה אתה רוצה לעשות בסוף השבוע? נמאס לי מלהישאר בבית." },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "How about going to the beach? The weather looks great!", translation_he: "מה דעתך ללכת לחוף? מזג האוויר נראה מצוין!", isCorrect: true, feedback_he: "מצוין! How about = מה דעתך על..." },
          { text_en: "Let's stay home and sleep.", translation_he: "בוא נישאר בבית וננוח.", isCorrect: false, feedback_he: "אבל אמרת שנמאס לך מהבית! נסה שוב." },
          { text_en: "I don't want to do anything.", translation_he: "אני לא רוצה לעשות כלום.", isCorrect: false, feedback_he: "נסה להציע משהו מהנה!" },
        ],
      },
      { speaker: "A", text_en: "The beach sounds fun! Should we bring food from home or buy there?", translation_he: "החוף נשמע כיפי! האם להביא אוכל מהבית או לקנות שם?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Let's bring sandwiches and fruit. It's cheaper and healthier.", translation_he: "בוא נביא כריכים ופירות. זה יותר זול ובריא.", isCorrect: true, feedback_he: "רעיון מצוין עם הסבר!" },
          { text_en: "I'm not hungry.", translation_he: "אני לא רעב.", isCorrect: false, feedback_he: "השאלה הייתה על מה לעשות — נסה שוב!" },
          { text_en: "Food is expensive.", translation_he: "אוכל יקר.", isCorrect: false, feedback_he: "נסה לתת הצעה ספציפית!" },
        ],
      },
      { speaker: "A", text_en: "Great plan! What time shall we leave?", translation_he: "תוכנית מצוינת! באיזו שעה נצא?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Let's leave at ten o'clock so we can have the whole morning there!", translation_he: "בוא נצא בעשר כדי שיהיה לנו כל הבוקר שם!", isCorrect: true, feedback_he: "מושלם! הצעת שעה עם הסבר!" },
          { text_en: "Very early. Maybe midnight.", translation_he: "מאוד מוקדם. אולי חצות.", isCorrect: false, feedback_he: "😄 חצות? נסה שעה הגיונית יותר!" },
          { text_en: "I don't care.", translation_he: "לא אכפת לי.", isCorrect: false, feedback_he: "נסה להשתתף בתכנון!" },
        ],
      },
    ],
    vocab_tips: ["How about...?", "Sounds fun!", "Should we...?", "Let's leave at..."],
  },
  {
    id: "sp2_dial-08",
    title_he: "שיחה על טיול",
    situation_he: "חבר שלך חזר מטיול ואתה שואל אותו עליו.",
    icon: "✈️",
    color: "from-sky-400 to-blue-600",
    turns: [
      { speaker: "A", text_en: "Welcome back! How was your trip to London?", translation_he: "ברוך שובך! איך היה הטיול שלך ללונדון?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "It was amazing! I visited Big Ben and the British Museum.", translation_he: "זה היה מדהים! ביקרתי בביג בן ובמוזיאון הבריטי.", isCorrect: true, feedback_he: "נהדר! תיארת את הטיול עם פעולות ספציפיות!" },
          { text_en: "It was fine, I guess.", translation_he: "זה היה בסדר, אני מניח.", isCorrect: false, feedback_he: "נסה לתת תשובה יותר מרגשת!" },
          { text_en: "I don't want to talk about it.", translation_he: "אני לא רוצה לדבר על זה.", isCorrect: false, feedback_he: "חבר שאל אותך! נסה לשתף." },
        ],
      },
      { speaker: "A", text_en: "That sounds incredible! What was your favorite part?", translation_he: "זה נשמע מדהים! מה היה החלק האהוב עליך?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "My favorite part was riding a double-decker bus through the city!", translation_he: "החלק האהוב עלי היה לרכב על אוטובוס קומותיים בעיר!", isCorrect: true, feedback_he: "מצוין! My favorite part was = החלק האהוב עלי היה" },
          { text_en: "Everything was the same.", translation_he: "הכול היה אותו דבר.", isCorrect: false, feedback_he: "נסה לשתף משהו מעניין!" },
          { text_en: "I forgot.", translation_he: "שכחתי.", isCorrect: false, feedback_he: "אי אפשר לשכוח את הטיול! נסה שוב." },
        ],
      },
      { speaker: "A", text_en: "Wow! Would you like to go back there someday?", translation_he: "וואו! אתה הייתה רוצה לחזור לשם יום אחד?" },
      {
        speaker: "B", text_en: "???", translation_he: "",
        choices: [
          { text_en: "Definitely! I'd love to see more of England. Maybe next summer.", translation_he: "בהחלט! אני הייתי אוהב לראות יותר מאנגליה. אולי קיץ הבא.", isCorrect: true, feedback_he: "מושלם! Definitely + I'd love to — מענה נפלא!" },
          { text_en: "No, it was cold and rainy.", translation_he: "לא, זה היה קר וגשום.", isCorrect: false, feedback_he: "נסה להשלים עם תגובה חיובית יותר!" },
          { text_en: "London is too far.", translation_he: "לונדון רחוקה מדי.", isCorrect: false, feedback_he: "נסה לענות בצורה יותר חלומית!" },
        ],
      },
    ],
    vocab_tips: ["How was your trip?", "My favorite part was...", "I visited...", "Definitely!", "I'd love to..."],
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

// ─── Additional Q&A (Set 2) ────────────────────────────────────────────────────
export const QA_QUESTIONS_2: QAQuestion[] = [
  {
    id: "sp2_qa-01",
    question_en: "What is your favorite school subject and why?",
    translation_he: "מה המקצוע האהוב עליך בבית הספר ולמה?",
    topic_he: "מקצועות בית ספר",
    example_answers: [
      "My favorite subject is science because we do experiments. It's exciting!",
      "I love art. I enjoy drawing and painting. It makes me feel relaxed.",
      "English is my favorite because I want to travel the world one day.",
    ],
    vocabulary_hints: ["My favorite subject is...", "because...", "I enjoy / love...", "It makes me feel..."],
  },
  {
    id: "sp2_qa-02",
    question_en: "Which subject do you find most difficult?",
    translation_he: "איזה מקצוע אתה מוצא הכי קשה?",
    topic_he: "מקצועות בית ספר",
    example_answers: [
      "I find math most difficult. The algebra problems are really hard for me.",
      "Grammar is the most difficult for me. There are so many rules!",
      "History is the hardest. I have to remember too many dates.",
    ],
    vocabulary_hints: ["I find... most difficult", "It's really hard for me", "There are too many..."],
  },
  {
    id: "sp2_qa-03",
    question_en: "How much time do you spend on the internet each day?",
    translation_he: "כמה זמן אתה מבלה באינטרנט כל יום?",
    topic_he: "טכנולוגיה",
    example_answers: [
      "I spend about two hours on the internet after school. I watch videos and chat with friends.",
      "I use my phone for about one hour a day. My parents have rules about screen time.",
      "Maybe three hours. I use it for homework and also for entertainment.",
    ],
    vocabulary_hints: ["I spend about... hours", "I use my phone / computer for...", "My parents have rules about..."],
  },
  {
    id: "sp2_qa-04",
    question_en: "What apps or websites do you use the most?",
    translation_he: "אילו אפליקציות או אתרים אתה משתמש בהם הכי הרבה?",
    topic_he: "טכנולוגיה",
    example_answers: [
      "I use YouTube the most. I watch funny videos and tutorials.",
      "My favorite app is a game where you build cities. I play it every day.",
      "I use a messaging app to talk with my friends and family.",
    ],
    vocabulary_hints: ["I use... the most", "My favorite app is...", "I watch / play / chat..."],
  },
  {
    id: "sp2_qa-05",
    question_en: "What sport do you enjoy playing or watching?",
    translation_he: "איזה ספורט אתה נהנה לשחק או לצפות בו?",
    topic_he: "ספורט",
    example_answers: [
      "I love playing basketball. I'm on my school team!",
      "I enjoy watching football. My favorite team is from Tel Aviv.",
      "I like swimming. It's great for staying fit and I find it relaxing.",
    ],
    vocabulary_hints: ["I love playing / watching...", "I'm on the team", "My favorite team is...", "It's great for..."],
  },
  {
    id: "sp2_qa-06",
    question_en: "Have you ever tried a new sport or activity? How was it?",
    translation_he: "האם ניסית אי פעם ספורט או פעילות חדשה? איך היה?",
    topic_he: "ספורט ותחביבים",
    example_answers: [
      "Yes! I tried rock climbing last summer. It was scary but exciting.",
      "I tried yoga with my mom. At first it was funny but then I liked it.",
      "I started learning judo this year. It's very difficult but I enjoy it.",
    ],
    vocabulary_hints: ["I tried...", "It was scary / exciting / funny / difficult", "At first...", "I started learning..."],
  },
  {
    id: "sp2_qa-07",
    question_en: "How many people are in your family? Tell me about them.",
    translation_he: "כמה אנשים יש במשפחה שלך? ספר לי עליהם.",
    topic_he: "משפחה",
    example_answers: [
      "There are four of us: mom, dad, my brother, and me. My brother is 8 and very noisy!",
      "I have a big family — five brothers and sisters! It's always fun and loud at home.",
      "It's just me and my mom. We're a small family but very close.",
    ],
    vocabulary_hints: ["There are... of us", "My brother / sister is...", "We are a big / small family", "We are very close"],
  },
  {
    id: "sp2_qa-08",
    question_en: "What do you do with your friends on weekends?",
    translation_he: "מה אתה עושה עם החברים שלך בסופי שבוע?",
    topic_he: "חברים",
    example_answers: [
      "We usually go to the park and play football. Sometimes we go to the mall.",
      "My friends and I love playing video games together at someone's house.",
      "We go to the cinema or just hang out and talk. It's fun just being together.",
    ],
    vocabulary_hints: ["We usually...", "Sometimes we...", "My friends and I...", "We love / enjoy..."],
  },
  {
    id: "sp2_qa-09",
    question_en: "What would you do if you had one million dollars?",
    translation_he: "מה היית עושה אם היו לך מיליון דולר?",
    topic_he: "חלומות ועתיד",
    example_answers: [
      "I would travel around the world! First I'd go to Japan and then to Brazil.",
      "I'd buy a big house for my family and donate some money to help animals.",
      "First I would save most of the money. Then I'd buy a new computer and games.",
    ],
    vocabulary_hints: ["I would...", "First I'd...", "Then I'd...", "I'd donate / save / buy..."],
  },
  {
    id: "sp2_qa-10",
    question_en: "What country would you most like to visit and why?",
    translation_he: "לאיזו מדינה היית הכי רוצה לבקר ולמה?",
    topic_he: "עתיד וחלומות",
    example_answers: [
      "I'd love to visit Japan because the food looks amazing and I love anime!",
      "I want to visit Australia. I want to see kangaroos and koalas in real life!",
      "I'd visit Iceland because I want to see the Northern Lights. It looks magical.",
    ],
    vocabulary_hints: ["I'd love to visit...", "because...", "I want to see...", "It looks amazing / magical"],
  },
  {
    id: "sp2_qa-11",
    question_en: "What do you want to study when you are older?",
    translation_he: "מה אתה רוצה ללמוד כשתהיה גדול יותר?",
    topic_he: "תוכניות עתיד",
    example_answers: [
      "I want to study medicine. I'd like to become a doctor and help people.",
      "I'm interested in computers. I'd like to study programming or design.",
      "I want to study art. I love drawing and I'd like to be an animator one day.",
    ],
    vocabulary_hints: ["I want to study...", "I'd like to become...", "I'm interested in...", "one day"],
  },
  {
    id: "sp2_qa-12",
    question_en: "What is the most useful skill you have learned at school?",
    translation_he: "מה המיומנות הכי שימושית שלמדת בבית הספר?",
    topic_he: "בית ספר ולמידה",
    example_answers: [
      "The most useful skill is reading. Once you can read, you can learn anything!",
      "I think math is the most useful. I use it every day when shopping or cooking.",
      "I learned how to work in a team. It's important for school and later in life.",
    ],
    vocabulary_hints: ["The most useful skill is...", "Once you can...", "I use it...", "It's important for..."],
  },
  {
    id: "sp2_qa-13",
    question_en: "Do you prefer studying alone or with friends? Why?",
    translation_he: "אתה מעדיף ללמוד לבד או עם חברים? למה?",
    topic_he: "סגנון למידה",
    example_answers: [
      "I prefer studying alone because I concentrate better. Music helps me focus.",
      "I like studying with friends. We can explain things to each other.",
      "It depends. For hard subjects I study with friends, but for reading I'm alone.",
    ],
    vocabulary_hints: ["I prefer... because...", "I concentrate better when...", "It depends on...", "We can explain..."],
  },
  {
    id: "sp2_qa-14",
    question_en: "What is something you are really good at?",
    translation_he: "מה משהו שאתה ממש טוב בו?",
    topic_he: "כישרונות ותחביבים",
    example_answers: [
      "I'm really good at drawing. My friends always ask me to draw for them.",
      "I'm good at football. I've been playing since I was five years old.",
      "I'm good at cooking! I can make pasta and salad all by myself.",
    ],
    vocabulary_hints: ["I'm really good at...", "I've been... since I was...", "I can... all by myself"],
  },
  {
    id: "sp2_qa-15",
    question_en: "If you could change one thing about your school, what would it be?",
    translation_he: "אם יכולת לשנות דבר אחד בבית הספר שלך, מה זה היה?",
    topic_he: "בית ספר",
    example_answers: [
      "I'd add a bigger playground with more sports equipment.",
      "I'd make the school day shorter. Six hours is too long!",
      "I would add a cooking class. Learning to cook is a life skill.",
    ],
    vocabulary_hints: ["I'd add...", "I'd make... shorter / longer / better", "I would change...", "It's a life skill"],
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

// ─── Additional Role Plays (Set 2) ────────────────────────────────────────────
export const ROLE_PLAYS_2: RolePlay[] = [
  {
    id: "sp2_rp-01",
    title_he: "תלמיד ומורה מדברים על ציונים",
    situation_he: "קיבלת ציון נמוך במבחן. אתה ניגש למורה כדי לשאול מה קרה.",
    player_role_he: "תלמיד",
    partner_role_he: "מורה",
    icon: "📊",
    color: "from-blue-400 to-indigo-600",
    steps: [
      {
        situation_he: "אתה נכנס לכיתה אחרי השיעור. המורה יושב ליד השולחן.",
        partner_says_en: "Yes? Can I help you?",
        partner_says_he: "כן? אני יכול לעזור לך?",
        player_choices: [
          { text_en: "Excuse me, I got my test back and I'm not sure why my grade is low. Can we talk?", translation_he: "סליחה, קיבלתי את המבחן חזרה ואני לא בטוח למה הציון שלי נמוך. אנחנו יכולים לדבר?", isCorrect: true, feedback_he: "מצוין! פנייה מנומסת ומקצועית למורה!" },
          { text_en: "You gave me a bad grade. That's not fair!", translation_he: "נתת לי ציון רע. זה לא הוגן!", isCorrect: false, feedback_he: "לא מנומס! כדאי לדבר בצורה שקטה ומכבדת." },
          { text_en: "I want more points.", translation_he: "אני רוצה עוד נקודות.", isCorrect: false, feedback_he: "נסה לדבר בצורה מנומסת יותר עם המורה." },
        ],
      },
      {
        situation_he: "המורה מסביר שהיו הרבה שגיאות בחלק על דקדוק.",
        partner_says_en: "You made many mistakes in the grammar section. Did you study that part?",
        partner_says_he: "עשית הרבה טעויות בחלק הדקדוק. למדת את החלק הזה?",
        player_choices: [
          { text_en: "Honestly, I didn't study that part enough. Can you explain what I did wrong?", translation_he: "באמת, לא למדתי מספיק את החלק הזה. אתה יכול להסביר מה עשיתי לא נכון?", isCorrect: true, feedback_he: "מצוין! כנות + בקשה לעזרה — תגובה בוגרת ומכבדת!" },
          { text_en: "Grammar is too hard. I give up.", translation_he: "דקדוק קשה מדי. אני מוותר.", isCorrect: false, feedback_he: "אל תוותר! נסה תגובה חיובית יותר." },
          { text_en: "The textbook was confusing.", translation_he: "הספר הלימוד היה מבלבל.", isCorrect: false, feedback_he: "נסה לקחת אחריות ולבקש עזרה." },
        ],
      },
      {
        situation_he: "המורה מציע לעזור לך.",
        partner_says_en: "Okay. I can give you extra practice worksheets. Come on Thursday after school.",
        partner_says_he: "בסדר. אני יכול לתת לך דפי עבודה נוספים. בוא ביום חמישי אחרי בית הספר.",
        player_choices: [
          { text_en: "Thank you so much! I will work hard and do better next time.", translation_he: "תודה רבה! אני אעבוד קשה ואעשה טוב יותר בפעם הבאה.", isCorrect: true, feedback_he: "נפלא! הבטחת להשתפר והודית למורה — מושלם!" },
          { text_en: "Thursday is not good for me.", translation_he: "יום חמישי לא מתאים לי.", isCorrect: false, feedback_he: "אם יום חמישי לא מתאים, שאל אם אפשר ביום אחר — בנימוס!" },
          { text_en: "Do I have to?", translation_he: "חייב?", isCorrect: false, feedback_he: "המורה מציע עזרה — נסה לקבל את ההצעה בברכה!" },
        ],
      },
    ],
    vocab_tips: ["Can we talk?", "Can you explain what I did wrong?", "I will work hard", "Thank you so much!", "Do better next time"],
  },
  {
    id: "sp2_rp-02",
    title_he: "תייר מבקש הכוונה בעיר",
    situation_he: "תייר זר ניגש אליך ברחוב ומבקש עזרה למצוא מקום.",
    player_role_he: "מקומי שיודע את העיר",
    partner_role_he: "תייר",
    icon: "🗺️",
    color: "from-orange-400 to-red-500",
    steps: [
      {
        situation_he: "תייר ניגש אליך עם מפה בידיים.",
        partner_says_en: "Excuse me! I'm a bit lost. Can you help me get to the train station?",
        partner_says_he: "סליחה! אני קצת אבוד. אתה יכול לעזור לי להגיע לתחנת הרכבת?",
        player_choices: [
          { text_en: "Of course! The train station is not far. Go straight for two blocks, then turn right.", translation_he: "כמובן! תחנת הרכבת לא רחוקה. לכו ישר שני רחובות, ואז פנו ימינה.", isCorrect: true, feedback_he: "מצוין! נתת הוראות ברורות וידידותיות!" },
          { text_en: "Sorry, I don't know.", translation_he: "סליחה, אני לא יודע.", isCorrect: false, feedback_he: "אם אתה מכיר את העיר, נסה לעזור!" },
          { text_en: "I'm busy. Ask someone else.", translation_he: "אני עסוק. שאל מישהו אחר.", isCorrect: false, feedback_he: "לא נחמד לתייר! נסה שוב." },
        ],
      },
      {
        situation_he: "התייר לא הבין בדיוק.",
        partner_says_en: "Sorry, could you repeat that? I didn't quite understand.",
        partner_says_he: "סליחה, אתה יכול לחזור על זה? לא הבנתי לגמרי.",
        player_choices: [
          { text_en: "Sure! Walk straight until you see a big supermarket. Then turn right. The station is on your left.", translation_he: "בוודאי! לכו ישר עד שתראו סופרמרקט גדול. אז פנו ימינה. התחנה תהיה משמאלכם.", isCorrect: true, feedback_he: "מושלם! חזרת בסבלנות עם ציוני דרך ברורים!" },
          { text_en: "I already told you. Go straight then right.", translation_he: "כבר אמרתי לך. ישר ואחר כך ימינה.", isCorrect: false, feedback_he: "נסה להסביר בסבלנות עם יותר פרטים!" },
          { text_en: "Use your phone.", translation_he: "השתמש בטלפון שלך.", isCorrect: false, feedback_he: "נסה לעזור ישירות!" },
        ],
      },
      {
        situation_he: "התייר מבין ומודה לך.",
        partner_says_en: "Thank you so much! You are very helpful. Is there anything interesting near the station?",
        partner_says_he: "תודה רבה! אתה מאוד עוזר. האם יש משהו מעניין ליד התחנה?",
        player_choices: [
          { text_en: "Yes! There's a nice cafe and a small park. It's a great place to sit and relax.", translation_he: "כן! יש בית קפה נחמד ופארק קטן. זה מקום מצוין לשבת ולהירגע.", isCorrect: true, feedback_he: "מדהים! הלכת מעבר לעזרה ושיתפת מידע מועיל נוסף — מארח נהדר!" },
          { text_en: "I don't know. I never go there.", translation_he: "אני לא יודע. אני אף פעם לא הולך לשם.", isCorrect: false, feedback_he: "נסה לשתף משהו שימושי עם התייר!" },
          { text_en: "No, nothing interesting.", translation_he: "לא, כלום מעניין.", isCorrect: false, feedback_he: "בטח יש משהו מעניין! נסה שוב." },
        ],
      },
    ],
    vocab_tips: ["Go straight for... blocks", "Turn right / left", "On your left / right", "There's a... near the station", "It's a great place to..."],
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────
export const SPEAKING_XP = {
  expression: 5,    // completing an expression review
  dialogue: 20,     // completing a full dialogue
  qa: 10,           // completing a Q&A question
  roleplay: 30,     // completing a role play
} as const;
