/** Buddy AI conversation topics for speaking practice */

export interface BuddyQuestion {
  id: string;
  question_en: string;
  translation_he: string;
  hint_he: string;
  example_answers: string[];
}

export interface BuddyTopic {
  id: string;
  title_he: string;
  subtitle_he: string;
  icon: string;
  color: string;
  questions: BuddyQuestion[];
}

export const BUDDY_XP = 15;

export const BUDDY_ENCOURAGEMENTS = [
  "Great job! 🌟",
  "Well done! 👏",
  "You're amazing! ⭐",
  "Excellent! 🎉",
  "Fantastic! 🔥",
  "Super! 💪",
  "Awesome! 🚀",
  "Perfect! 💎",
  "Wonderful! 🌈",
  "Keep it up! 😊",
];

export const BUDDY_TOPICS: BuddyTopic[] = [
  {
    id: "buddy-intro",
    title_he: "היכרות ראשונה",
    subtitle_he: "Tell me about yourself!",
    icon: "👋",
    color: "from-blue-400 to-sky-500",
    questions: [
      {
        id: "bi-q1",
        question_en: "What is your name?",
        translation_he: "מה שמך?",
        hint_he: "אמור את שמך: My name is ___",
        example_answers: ["My name is David.", "My name is Noa.", "I am Yosef."],
      },
      {
        id: "bi-q2",
        question_en: "How old are you?",
        translation_he: "בן/בת כמה אתה/את?",
        hint_he: "אמור את גילך: I am ___ years old.",
        example_answers: ["I am eleven years old.", "I am twelve.", "I am ten years old."],
      },
      {
        id: "bi-q3",
        question_en: "Where do you live?",
        translation_he: "איפה אתה/את גר/גרה?",
        hint_he: "אמור את עיר המגורים שלך: I live in ___.",
        example_answers: ["I live in Tel Aviv.", "I live in Jerusalem.", "I live in Haifa."],
      },
      {
        id: "bi-q4",
        question_en: "Do you have brothers or sisters?",
        translation_he: "יש לך אחים או אחיות?",
        hint_he: "ספר על משפחתך: I have ___ brother/sister(s). או: I have no brothers or sisters.",
        example_answers: ["I have one brother.", "I have two sisters.", "I have no brothers or sisters."],
      },
      {
        id: "bi-q5",
        question_en: "What is your favorite color?",
        translation_he: "מה הצבע האהוב עליך?",
        hint_he: "אמור את הצבע שאתה אוהב: My favorite color is ___.",
        example_answers: ["My favorite color is blue.", "I love red.", "My favorite color is green."],
      },
    ],
  },
  {
    id: "buddy-hobbies",
    title_he: "תחביבים",
    subtitle_he: "What do you like to do?",
    icon: "🎨",
    color: "from-purple-400 to-violet-500",
    questions: [
      {
        id: "bh-q1",
        question_en: "What do you like to do?",
        translation_he: "מה אתה/את אוהב/ת לעשות?",
        hint_he: "אמור פעילות שאתה אוהב: I like to ___ (draw, play, read...)",
        example_answers: ["I like to draw.", "I like to play football.", "I like to read books."],
      },
      {
        id: "bh-q2",
        question_en: "Do you like reading?",
        translation_he: "אתה/את אוהב/ת לקרוא?",
        hint_he: "הגב בחיוב או שלילה: Yes, I love reading. / No, I don't like reading.",
        example_answers: ["Yes, I love reading books.", "I like reading comics.", "No, I prefer watching TV."],
      },
      {
        id: "bh-q3",
        question_en: "Can you draw or paint?",
        translation_he: "אתה/את יכול/ה לצייר?",
        hint_he: "ספר אם אתה יכול: Yes, I can draw. / No, I cannot draw.",
        example_answers: ["Yes, I can draw animals.", "I love painting pictures.", "I can draw a little."],
      },
      {
        id: "bh-q4",
        question_en: "Do you play any sport?",
        translation_he: "אתה/את משחק/ת ספורט?",
        hint_he: "ספר על ספורט שאתה עושה: I play ___ (football, basketball...)",
        example_answers: ["I play football every day.", "I swim on Fridays.", "I play basketball with friends."],
      },
      {
        id: "bh-q5",
        question_en: "What is your favorite hobby?",
        translation_he: "מה התחביב האהוב עליך?",
        hint_he: "אמור את התחביב שלך: My favorite hobby is ___.",
        example_answers: ["My favorite hobby is drawing.", "I love playing video games.", "My favorite hobby is cooking."],
      },
    ],
  },
  {
    id: "buddy-family",
    title_he: "המשפחה שלי",
    subtitle_he: "Tell me about your family!",
    icon: "👨‍👩‍👧",
    color: "from-orange-400 to-amber-500",
    questions: [
      {
        id: "bf-q1",
        question_en: "How many people are in your family?",
        translation_he: "כמה אנשים יש במשפחתך?",
        hint_he: "ספר את אנשי המשפחה: There are ___ people in my family.",
        example_answers: ["There are four people in my family.", "I have a big family — seven people!", "There are three of us."],
      },
      {
        id: "bf-q2",
        question_en: "What does your mom do?",
        translation_he: "מה אמא שלך עושה?",
        hint_he: "ספר על עבודת אמא: My mom is a ___ (teacher, doctor...)",
        example_answers: ["My mom is a teacher.", "My mom works in a store.", "My mom is a doctor."],
      },
      {
        id: "bf-q3",
        question_en: "Do you have a pet at home?",
        translation_he: "יש לך חיית מחמד בבית?",
        hint_he: "ספר אם יש לך חיה: Yes, I have a ___. / No, I don't have a pet.",
        example_answers: ["Yes, I have a dog.", "I have a cat named Miso.", "No, I don't have a pet."],
      },
      {
        id: "bf-q4",
        question_en: "Who do you like to play with?",
        translation_he: "עם מי אתה/את אוהב/ת לשחק?",
        hint_he: "ספר עם מי אתה משחק: I like to play with my ___.",
        example_answers: ["I like to play with my brother.", "I play with my sister and friends.", "I play with my dad on weekends."],
      },
      {
        id: "bf-q5",
        question_en: "Who is funny in your family?",
        translation_he: "מי מצחיק/ה במשפחתך?",
        hint_he: "ספר מי מצחיק: My ___ is very funny!",
        example_answers: ["My dad is very funny.", "My brother always makes us laugh.", "My grandpa is the funniest!"],
      },
    ],
  },
  {
    id: "buddy-school",
    title_he: "בית הספר",
    subtitle_he: "Let's talk about school!",
    icon: "📚",
    color: "from-green-400 to-teal-500",
    questions: [
      {
        id: "bs-q1",
        question_en: "What is your favorite subject?",
        translation_he: "מה המקצוע האהוב עליך?",
        hint_he: "ספר איזה שיעור אתה אוהב: My favorite subject is ___.",
        example_answers: ["My favorite subject is math.", "I love art class.", "My favorite subject is English."],
      },
      {
        id: "bs-q2",
        question_en: "Do you like school?",
        translation_he: "אתה/את אוהב/ת בית ספר?",
        hint_he: "אמור אם אתה אוהב: Yes, I like school. / It is okay. / I don't love it.",
        example_answers: ["Yes, I like school!", "School is okay. I like my friends.", "I like some subjects."],
      },
      {
        id: "bs-q3",
        question_en: "Who is your best friend?",
        translation_he: "מי החבר/ה הכי טוב/ה שלך?",
        hint_he: "ספר על החבר שלך: My best friend is ___.",
        example_answers: ["My best friend is Lior.", "My best friend is Maya. She is funny.", "I have two best friends."],
      },
      {
        id: "bs-q4",
        question_en: "Do you have homework today?",
        translation_he: "יש לך שיעורי בית היום?",
        hint_he: "ספר על שיעורי בית: Yes, I have homework in ___. / No, I don't have homework.",
        example_answers: ["Yes, I have math homework.", "I have homework in English.", "No homework today!"],
      },
      {
        id: "bs-q5",
        question_en: "What do you do at lunch break?",
        translation_he: "מה אתה/את עושה בהפסקת צהריים?",
        hint_he: "ספר מה אתה עושה בהפסקה: I ___ at lunch break.",
        example_answers: ["I eat and play with friends.", "I read during lunch break.", "I play football in the yard."],
      },
    ],
  },
  {
    id: "buddy-food",
    title_he: "אוכל אהוב",
    subtitle_he: "Let's talk about food!",
    icon: "🍎",
    color: "from-red-400 to-orange-500",
    questions: [
      {
        id: "bfo-q1",
        question_en: "What is your favorite food?",
        translation_he: "מה האוכל האהוב עליך?",
        hint_he: "אמור מה אתה אוהב לאכול: My favorite food is ___.",
        example_answers: ["My favorite food is pizza.", "I love pasta!", "My favorite food is rice and chicken."],
      },
      {
        id: "bfo-q2",
        question_en: "Do you like vegetables?",
        translation_he: "אתה/את אוהב/ת ירקות?",
        hint_he: "אמור אם אתה אוהב ירקות: Yes, I love ___. / I don't really like vegetables.",
        example_answers: ["Yes, I love carrots and cucumbers.", "I like tomatoes.", "Not really, but I eat them."],
      },
      {
        id: "bfo-q3",
        question_en: "What do you eat for breakfast?",
        translation_he: "מה אתה/את אוכל/ת לארוחת בוקר?",
        hint_he: "ספר מה אתה אוכל בבוקר: For breakfast I eat ___.",
        example_answers: ["I eat bread and cheese.", "I have cereal and milk.", "I eat eggs and toast."],
      },
      {
        id: "bfo-q4",
        question_en: "Do you like sweet or salty food?",
        translation_he: "אתה/את אוהב/ת אוכל מתוק או מלוח?",
        hint_he: "בחר מתוק או מלוח: I prefer ___ food.",
        example_answers: ["I prefer sweet food.", "I love salty snacks.", "I like both!"],
      },
      {
        id: "bfo-q5",
        question_en: "What is your favorite fruit?",
        translation_he: "מה הפרי האהוב עליך?",
        hint_he: "אמור את הפרי שאתה אוהב: My favorite fruit is ___.",
        example_answers: ["My favorite fruit is watermelon.", "I love strawberries.", "My favorite fruit is mango."],
      },
    ],
  },
  {
    id: "buddy-sports",
    title_he: "ספורט ומשחקים",
    subtitle_he: "Sports and games time!",
    icon: "⚽",
    color: "from-lime-400 to-green-600",
    questions: [
      {
        id: "bsp-q1",
        question_en: "What sport do you play?",
        translation_he: "איזה ספורט אתה/את משחק/ת?",
        hint_he: "ספר על ספורט שאתה עושה: I play ___ (football, basketball, swimming...)",
        example_answers: ["I play football.", "I swim three times a week.", "I play basketball with my team."],
      },
      {
        id: "bsp-q2",
        question_en: "Do you like football?",
        translation_he: "אתה/את אוהב/ת כדורגל?",
        hint_he: "אמור אם אתה אוהב כדורגל: Yes, I love football! / I prefer ___.",
        example_answers: ["Yes, I love football!", "I like football, but I prefer basketball.", "Not really, I like swimming more."],
      },
      {
        id: "bsp-q3",
        question_en: "Are you good at swimming?",
        translation_he: "אתה/את טוב/ה בשחייה?",
        hint_he: "אמור אם אתה שוחה טוב: Yes, I am good at swimming. / I am learning.",
        example_answers: ["Yes, I swim very fast!", "I am learning to swim.", "I am okay at swimming."],
      },
      {
        id: "bsp-q4",
        question_en: "Do you play video games?",
        translation_he: "אתה/את משחק/ת משחקי מחשב?",
        hint_he: "ספר על משחקי מחשב: Yes, I play ___. / No, I don't play video games.",
        example_answers: ["Yes, I love video games!", "I play games on weekends.", "No, I prefer outdoor games."],
      },
      {
        id: "bsp-q5",
        question_en: "Who is your favorite sports player?",
        translation_he: "מי השחקן/ית האהוב/ה עליך?",
        hint_he: "ספר על שחקן ספורט שאתה אוהב: My favorite player is ___.",
        example_answers: ["My favorite player is Messi.", "I love watching Federer play.", "I like LeBron James."],
      },
    ],
  },
  {
    id: "buddy-weekend",
    title_he: "סוף שבוע",
    subtitle_he: "What do you do on weekends?",
    icon: "🌟",
    color: "from-yellow-400 to-orange-400",
    questions: [
      {
        id: "bw-q1",
        question_en: "What do you do on Saturday?",
        translation_he: "מה אתה/את עושה בשבת?",
        hint_he: "ספר מה אתה עושה בסוף השבוע: On Saturday I ___.",
        example_answers: ["On Saturday I sleep late and watch TV.", "I go to the park with my family.", "I visit my grandparents."],
      },
      {
        id: "bw-q2",
        question_en: "Do you sleep late on weekends?",
        translation_he: "אתה/את ישן/ה מאוחר בסוף השבוע?",
        hint_he: "אמור אם אתה ישן מאוחר: Yes, I sleep until ___. / No, I wake up early.",
        example_answers: ["Yes, I sleep until ten o'clock.", "I wake up at nine on weekends.", "No, I always wake up early."],
      },
      {
        id: "bw-q3",
        question_en: "Do you go outside to play?",
        translation_he: "אתה/את יוצא/ת לשחק בחוץ?",
        hint_he: "ספר אם אתה משחק בחוץ: Yes, I play outside. / I prefer to stay inside.",
        example_answers: ["Yes, I love playing outside!", "I go to the park with friends.", "Sometimes, when the weather is nice."],
      },
      {
        id: "bw-q4",
        question_en: "Do you help at home on weekends?",
        translation_he: "אתה/את עוזר/ת בבית בסוף השבוע?",
        hint_he: "ספר אם אתה עוזר בבית: Yes, I help with ___. / A little.",
        example_answers: ["Yes, I clean my room.", "I help my mom in the kitchen.", "A little — I wash the dishes."],
      },
      {
        id: "bw-q5",
        question_en: "What is your favorite day of the week?",
        translation_he: "מה היום האהוב עליך?",
        hint_he: "אמור את היום האהוב עליך: My favorite day is ___.",
        example_answers: ["My favorite day is Friday.", "I love Saturday because I relax.", "Sunday is my favorite day."],
      },
    ],
  },
  {
    id: "buddy-pet",
    title_he: "חיית המחמד",
    subtitle_he: "Tell me about your pet!",
    icon: "🐕",
    color: "from-amber-400 to-yellow-500",
    questions: [
      {
        id: "bp-q1",
        question_en: "Do you have a pet?",
        translation_he: "יש לך חיית מחמד?",
        hint_he: "ספר אם יש לך חיה: Yes, I have a ___. / No, I don't have a pet.",
        example_answers: ["Yes, I have a dog!", "I have a cat named Luna.", "No, I don't have a pet, but I want one."],
      },
      {
        id: "bp-q2",
        question_en: "Do you prefer dogs or cats?",
        translation_he: "אתה/את מעדיף/ה כלבים או חתולים?",
        hint_he: "בחר בין כלב לחתול: I prefer ___ because ___.",
        example_answers: ["I prefer dogs because they are playful.", "I like cats because they are calm.", "I love both dogs and cats!"],
      },
      {
        id: "bp-q3",
        question_en: "What pet do you want?",
        translation_he: "איזה חיה אתה/את רוצה?",
        hint_he: "אמור איזה חיה אתה רוצה: I want a ___ because ___.",
        example_answers: ["I want a dog because they are fun.", "I want a rabbit.", "I want a parrot that can talk!"],
      },
      {
        id: "bp-q4",
        question_en: "What sound does a dog make?",
        translation_he: "איזה צליל כלב עושה?",
        hint_he: "תאר את הצליל: A dog says woof woof!",
        example_answers: ["A dog says woof!", "Dogs bark — woof woof!", "A dog makes a loud woof sound."],
      },
      {
        id: "bp-q5",
        question_en: "Is your pet funny or calm?",
        translation_he: "חיית המחמד שלך מצחיקה או רגועה?",
        hint_he: "תאר את החיה שלך: My pet is ___ (funny, calm, noisy...)",
        example_answers: ["My dog is very funny and energetic.", "My cat is calm and quiet.", "My fish is very calm!"],
      },
    ],
  },
  {
    id: "buddy-vacation",
    title_he: "טיולים וחופשות",
    subtitle_he: "Let's talk about trips!",
    icon: "✈️",
    color: "from-sky-400 to-blue-500",
    questions: [
      {
        id: "bv-q1",
        question_en: "Where do you like to go?",
        translation_he: "לאן אתה/את אוהב/ת ללכת?",
        hint_he: "ספר לאן אתה אוהב ללכת: I like to go to ___.",
        example_answers: ["I like to go to the beach.", "I love going to the mountains.", "I like going to the park."],
      },
      {
        id: "bv-q2",
        question_en: "Did you go to the sea this year?",
        translation_he: "הלכת לים השנה?",
        hint_he: "ספר אם הלכת לים: Yes, I went to the sea in ___. / No, not this year.",
        example_answers: ["Yes, I went to the beach in summer.", "I love the sea! I went in July.", "No, not this year."],
      },
      {
        id: "bv-q3",
        question_en: "Do you like the mountains or the beach?",
        translation_he: "אתה/את אוהב/ת הרים או ים?",
        hint_he: "בחר בין הרים לים: I prefer the ___ because ___.",
        example_answers: ["I prefer the beach because it is fun.", "I love the mountains — they are beautiful.", "I like both!"],
      },
      {
        id: "bv-q4",
        question_en: "Where is your dream vacation?",
        translation_he: "לאן אתה/את חולם/ת לנסוע?",
        hint_he: "אמור לאן אתה חולם לנסוע: My dream vacation is ___.",
        example_answers: ["My dream is to visit Japan.", "I want to go to New York.", "I dream of going to London."],
      },
      {
        id: "bv-q5",
        question_en: "What do you pack for a trip?",
        translation_he: "מה אתה/את לוקח/ת לטיול?",
        hint_he: "ספר מה אתה לוקח: I pack ___, ___, and ___.",
        example_answers: ["I pack clothes, snacks, and my book.", "I take my bag, water, and phone.", "I pack sunscreen, clothes, and sandals."],
      },
    ],
  },
  {
    id: "buddy-future",
    title_he: "כשאהיה גדול",
    subtitle_he: "What are your dreams?",
    icon: "🌟",
    color: "from-indigo-400 to-purple-500",
    questions: [
      {
        id: "bfu-q1",
        question_en: "What do you want to be?",
        translation_he: "מה אתה/את רוצה להיות?",
        hint_he: "אמור מה אתה רוצה להיות: I want to be a ___ (doctor, teacher, pilot...)",
        example_answers: ["I want to be a doctor.", "I want to be a footballer.", "I want to be a teacher."],
      },
      {
        id: "bfu-q2",
        question_en: "Do you want to help people?",
        translation_he: "אתה/את רוצה לעזור לאנשים?",
        hint_he: "ספר אם אתה רוצה לעזור: Yes, I want to help by ___.",
        example_answers: ["Yes, I want to be a doctor and help people.", "I want to help animals.", "Yes, I want to be a teacher."],
      },
      {
        id: "bfu-q3",
        question_en: "Do you want to travel the world?",
        translation_he: "אתה/את רוצה לטייל בעולם?",
        hint_he: "ספר אם אתה רוצה לטייל: Yes, I want to visit ___. / I prefer to stay home.",
        example_answers: ["Yes! I want to visit every country.", "I want to travel to Asia.", "Maybe a little — I love Israel."],
      },
      {
        id: "bfu-q4",
        question_en: "Are you good at art or math?",
        translation_he: "אתה/את טוב/ה באמנות או במתמטיקה?",
        hint_he: "ספר במה אתה טוב: I am good at ___ (art, math, sport...)",
        example_answers: ["I am good at math.", "I love art — I draw every day.", "I am good at both!"],
      },
      {
        id: "bfu-q5",
        question_en: "What is your big dream?",
        translation_he: "מה החלום הגדול שלך?",
        hint_he: "ספר על החלום שלך: My big dream is to ___.",
        example_answers: ["My dream is to be a famous football player.", "I dream of writing a book.", "My dream is to travel the world."],
      },
    ],
  },
];
