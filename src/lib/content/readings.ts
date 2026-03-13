/** Reading comprehension passages — 3 levels, 8 texts total */

export interface ReadingQuestion {
  id: string;
  question_he: string;
  options_he: string[];
  correctIndex: number;
}

export interface ReadingPassage {
  id: string;
  title_en: string;
  title_he: string;
  level: "easy" | "medium" | "hard";
  icon: string;
  topic_he: string; // short label e.g. "חיות"
  text: string; // English passage
  questions: ReadingQuestion[];
}

export const READING_PASSAGES: ReadingPassage[] = [
  // ══════════════════════════════════════════════════════════════
  //  EASY  (3-6 sentences, familiar vocabulary)
  // ══════════════════════════════════════════════════════════════
  {
    id: "r-easy-1",
    title_en: "My Dog",
    title_he: "הכלב שלי",
    level: "easy",
    icon: "🐶",
    topic_he: "חיות",
    text: `My name is Tom. I am ten years old.
I have a dog. His name is Max.
Max is brown and white.
Max likes to run and play.
I love my dog very much.`,
    questions: [
      {
        id: "r-easy-1-q1",
        question_he: "מה שמו של הילד?",
        options_he: ["Max", "Tom", "Dan", "Sam"],
        correctIndex: 1,
      },
      {
        id: "r-easy-1-q2",
        question_he: "באיזה צבע הכלב?",
        options_he: ["שחור", "צהוב", "חום ולבן", "כתום"],
        correctIndex: 2,
      },
      {
        id: "r-easy-1-q3",
        question_he: "מה Max אוהב לעשות?",
        options_he: ["לישון", "לשחות", "לרוץ ולשחק", "לאכול"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-easy-2",
    title_en: "My Classroom",
    title_he: "הכיתה שלי",
    level: "easy",
    icon: "🏫",
    topic_he: "בית ספר",
    text: `This is my classroom.
There is a big board.
There are twenty desks.
My teacher is Mrs. Cohen. She is very nice.
I sit near the window.
I like my classroom.`,
    questions: [
      {
        id: "r-easy-2-q1",
        question_he: "איפה התלמיד יושב?",
        options_he: ["ליד הדלת", "ליד הלוח", "ליד החלון", "ליד המורה"],
        correctIndex: 2,
      },
      {
        id: "r-easy-2-q2",
        question_he: "כמה שולחנות יש בכיתה?",
        options_he: ["עשרה", "עשרים", "שלושים", "ארבעים"],
        correctIndex: 1,
      },
      {
        id: "r-easy-2-q3",
        question_he: "מה שם המורה?",
        options_he: ["Mrs. Levi", "Mrs. Cohen", "Mrs. Sharon", "Mrs. Tal"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-easy-3",
    title_en: "My Morning",
    title_he: "הבוקר שלי",
    level: "easy",
    icon: "🌅",
    topic_he: "שגרה",
    text: `I wake up at seven o'clock.
I eat breakfast. I have bread and milk.
Then I go to school.
I walk with my friend Sara.
School starts at eight o'clock.
I like school!`,
    questions: [
      {
        id: "r-easy-3-q1",
        question_he: "באיזו שעה הילד מתעורר?",
        options_he: ["שש", "שבע", "שמונה", "תשע"],
        correctIndex: 1,
      },
      {
        id: "r-easy-3-q2",
        question_he: "מה הילד אוכל לארוחת בוקר?",
        options_he: ["פיצה ומיץ", "לחם וחלב", "ביצה וגבינה", "עוגה ומים"],
        correctIndex: 1,
      },
      {
        id: "r-easy-3-q3",
        question_he: "עם מי הילד הולך לבית הספר?",
        options_he: ["עם אמא", "עם אחיו", "עם חברתו שרה", "עם המורה"],
        correctIndex: 2,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  MEDIUM  (7-12 sentences, past tense, richer vocabulary)
  // ══════════════════════════════════════════════════════════════
  {
    id: "r-medium-1",
    title_en: "A Day at the Zoo",
    title_he: "יום בגן חיות",
    level: "medium",
    icon: "🦁",
    topic_he: "טיול",
    text: `Last week, my class went to the zoo.
We traveled by bus.
The zoo has many animals.
I saw elephants, lions, and monkeys.
The elephants were very big.
The monkeys were funny. They jumped from tree to tree.
My favorite animal was the dolphin. It jumped out of the water.
We had lunch in the park near the zoo.
It was a great day!`,
    questions: [
      {
        id: "r-med-1-q1",
        question_he: "איך הכיתה נסעה לגן החיות?",
        options_he: ["ברכב", "באוטובוס", "ברכבת", "ברגל"],
        correctIndex: 1,
      },
      {
        id: "r-med-1-q2",
        question_he: "מה הקופים עשו?",
        options_he: ["שחו", "ישנו", "קפצו מעץ לעץ", "אכלו בננות"],
        correctIndex: 2,
      },
      {
        id: "r-med-1-q3",
        question_he: "מה החיה האהובה של הכותב?",
        options_he: ["האריה", "הפיל", "הקוף", "הדולפין"],
        correctIndex: 3,
      },
    ],
  },

  {
    id: "r-medium-2",
    title_en: "My Hobby",
    title_he: "התחביב שלי",
    level: "medium",
    icon: "🎨",
    topic_he: "תחביבים",
    text: `My name is Yael. My hobby is painting.
Every afternoon, I paint in my room.
I have many colors — red, blue, green, and yellow.
Sometimes I paint flowers, and sometimes I paint animals.
My mother says my paintings are beautiful.
Last month, I painted a picture of our family.
Now it hangs on my bedroom wall.
I want to be an artist when I grow up.`,
    questions: [
      {
        id: "r-med-2-q1",
        question_he: "מה התחביב של יעל?",
        options_he: ["שירה", "ציור", "ריקוד", "קריאה"],
        correctIndex: 1,
      },
      {
        id: "r-med-2-q2",
        question_he: "מה יעל ציירה בחודש שעבר?",
        options_he: ["חתול", "פרחים", "המשפחה שלה", "בית הספר"],
        correctIndex: 2,
      },
      {
        id: "r-med-2-q3",
        question_he: "מה יעל רוצה להיות כשתגדל?",
        options_he: ["מורה", "רופאה", "אמנית", "שחקנית"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-medium-3",
    title_en: "The Four Seasons",
    title_he: "ארבע העונות",
    level: "medium",
    icon: "🌸",
    topic_he: "טבע",
    text: `There are four seasons in a year: spring, summer, fall, and winter.
In spring, the flowers bloom and the weather is warm and beautiful.
In summer, it is very hot. Children swim at the beach and play outside.
In fall, the leaves change color from green to yellow, orange, and red.
The weather gets cooler and the days get shorter.
In winter, it rains a lot. Sometimes it snows in the mountains.
My favorite season is spring because everything is beautiful and new.`,
    questions: [
      {
        id: "r-med-3-q1",
        question_he: "כמה עונות יש בשנה?",
        options_he: ["שתיים", "שלוש", "ארבע", "חמש"],
        correctIndex: 2,
      },
      {
        id: "r-med-3-q2",
        question_he: "מה קורה לעלים בסתיו?",
        options_he: ["הם נופלים מיד", "הם משנים צבע", "הם גדלים", "הם נשארים ירוקים"],
        correctIndex: 1,
      },
      {
        id: "r-med-3-q3",
        question_he: "מה העונה האהובה על הכותב?",
        options_he: ["קיץ", "סתיו", "חורף", "אביב"],
        correctIndex: 3,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  HARD  (12-18 sentences, complex vocabulary, 4 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: "r-hard-1",
    title_en: "A Letter from London",
    title_he: "מכתב מלונדון",
    level: "hard",
    icon: "✉️",
    topic_he: "מכתב",
    text: `Dear Dana,

I am writing to you from London, England.
I arrived here three days ago with my family.
London is a big and beautiful city with a lot of history.
Yesterday, we visited the famous Tower Bridge.
It was amazing! The bridge is very old — it was built in 1894.
We also saw red buses and black taxis everywhere in the streets.
The weather here is cloudy and cool, very different from sunny Israel.
The food is also different. I tried fish and chips — that is a very popular English meal.
I found it delicious!
I miss my friends and my school at home, but I am having a wonderful time.
We will visit the Natural History Museum tomorrow.
I will come back to Israel next month.
Write to me soon!

Your friend, Noa`,
    questions: [
      {
        id: "r-hard-1-q1",
        question_he: "מאיפה נועה כותבת את המכתב?",
        options_he: ["צרפת", "אנגליה", "אמריקה", "אוסטרליה"],
        correctIndex: 1,
      },
      {
        id: "r-hard-1-q2",
        question_he: "מה נועה ביקרה אתמול?",
        options_he: ["מוזיאון הטבע", "גן חיות", "Tower Bridge", "ה-Big Ben"],
        correctIndex: 2,
      },
      {
        id: "r-hard-1-q3",
        question_he: "איך מזג האוויר בלונדון?",
        options_he: ["חם ושמשי", "גשום וחם", "מעונן וקריר", "קר ושלגי"],
        correctIndex: 2,
      },
      {
        id: "r-hard-1-q4",
        question_he: "מה נועה תבקר מחר?",
        options_he: ["Tower Bridge", "מוזיאון הטבע", "הפארק", "המלך"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-hard-2",
    title_en: "The School Play",
    title_he: "ההצגה בבית הספר",
    level: "hard",
    icon: "🎭",
    topic_he: "בית ספר",
    text: `Every year, our school has a big play at the end of the year.
This year, we are performing the story of Cinderella.
I have an important role — I am playing the prince!
My best friend Michal is playing Cinderella.
We have been practicing for two whole months.
Every Tuesday and Thursday, we rehearse after school for one hour.
Our teacher, Mrs. Katz, is helping us a lot.
She teaches us how to speak clearly on stage and how to move our bodies.
She also made our beautiful costumes.
The play will be performed on the last day of school.
All of our parents and families are going to come and watch.
I am a little nervous because there will be so many people watching.
But I am also very excited and I cannot wait!
I hope we do a great job and everyone will enjoy the show.`,
    questions: [
      {
        id: "r-hard-2-q1",
        question_he: "איזה סיפור ההצגה?",
        options_he: ["שלגייה", "סינדרלה", "כיפה אדומה", "הנסיכה הישנה"],
        correctIndex: 1,
      },
      {
        id: "r-hard-2-q2",
        question_he: "מי משחק את הנסיך?",
        options_he: ["מיכל", "גברת כץ", "הכותב", "חבר חדש"],
        correctIndex: 2,
      },
      {
        id: "r-hard-2-q3",
        question_he: "מתי הם מתאמנים?",
        options_he: ["יום שני וסרביי", "יום שלישי וחמישי", "כל יום", "רק בסופ\"ש"],
        correctIndex: 1,
      },
      {
        id: "r-hard-2-q4",
        question_he: "איך הכותב מרגיש לגבי ההצגה?",
        options_he: ["רק עצבני", "רק נרגש", "עצבני ונרגש", "שמח ורגוע"],
        correctIndex: 2,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  EASY  (new passages r-easy-4 through r-easy-10)
  // ══════════════════════════════════════════════════════════════
  {
    id: "r-easy-4",
    title_en: "My Cat",
    title_he: "החתול שלי",
    level: "easy",
    icon: "🐱",
    topic_he: "חיות",
    text: `My cat's name is Luna.
She is white and soft.
Luna likes to sleep and play.
She drinks milk every morning.
I love my cat very much.`,
    questions: [
      {
        id: "r-easy-4-q1",
        question_he: "מה שם החתולה?",
        options_he: ["Mimi", "Luna", "Lola", "Nala"],
        correctIndex: 1,
      },
      {
        id: "r-easy-4-q2",
        question_he: "איזה צבע החתולה?",
        options_he: ["שחור", "כתום", "לבן", "אפור"],
        correctIndex: 2,
      },
      {
        id: "r-easy-4-q3",
        question_he: "מה Luna אוהבת לעשות?",
        options_he: ["לרוץ", "לישון ולשחק", "לשחות", "לאכול"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-easy-5",
    title_en: "My Birthday",
    title_he: "יום ההולדת שלי",
    level: "easy",
    icon: "🎂",
    topic_he: "חגים",
    text: `Today is my birthday!
I am ten years old.
My mom baked a chocolate cake.
My friends came to my house.
We ate cake and played games.
It was a great day!`,
    questions: [
      {
        id: "r-easy-5-q1",
        question_he: "כמה שנים הילד היום?",
        options_he: ["שמונה", "תשע", "עשר", "אחת עשרה"],
        correctIndex: 2,
      },
      {
        id: "r-easy-5-q2",
        question_he: "מה האמא אפתה?",
        options_he: ["עוגת תפוח", "עוגת שוקולד", "עוגת גזר", "עוגת תות"],
        correctIndex: 1,
      },
      {
        id: "r-easy-5-q3",
        question_he: "מה הילדים עשו?",
        options_he: ["ישנו", "שרו", "אכלו עוגה ושיחקו", "הלכו לפארק"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-easy-6",
    title_en: "At the Supermarket",
    title_he: "בסופרמרקט",
    level: "easy",
    icon: "🛒",
    topic_he: "קניות",
    text: `I go to the supermarket with my mom.
We buy bread, milk, and eggs.
I choose a red apple.
Mom pays at the cashier.
We carry the bags home.`,
    questions: [
      {
        id: "r-easy-6-q1",
        question_he: "עם מי הילד הולך לסופרמרקט?",
        options_he: ["עם אבא", "עם אמא", "עם אחיו", "לבד"],
        correctIndex: 1,
      },
      {
        id: "r-easy-6-q2",
        question_he: "מה הילד בוחר?",
        options_he: ["בננה", "תפוז", "תפוח אדום", "ענבים"],
        correctIndex: 2,
      },
      {
        id: "r-easy-6-q3",
        question_he: "מי משלם בקופה?",
        options_he: ["הילד", "אמא", "אבא", "אף אחד"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-easy-7",
    title_en: "Playing Football",
    title_he: "משחק כדורגל",
    level: "easy",
    icon: "⚽",
    topic_he: "ספורט",
    text: `I love football.
I play football with my friends every Saturday.
Our team has ten players.
I am the goalkeeper.
We won the game today!`,
    questions: [
      {
        id: "r-easy-7-q1",
        question_he: "מתי הם משחקים כדורגל?",
        options_he: ["יום שישי", "יום שבת", "יום ראשון", "כל יום"],
        correctIndex: 1,
      },
      {
        id: "r-easy-7-q2",
        question_he: "כמה שחקנים יש בקבוצה?",
        options_he: ["שמונה", "תשעה", "עשרה", "אחד עשר"],
        correctIndex: 2,
      },
      {
        id: "r-easy-7-q3",
        question_he: "מה תפקיד הכותב?",
        options_he: ["חלוץ", "שוער", "מגן", "אמצע"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-easy-8",
    title_en: "My Room",
    title_he: "החדר שלי",
    level: "easy",
    icon: "🛏️",
    topic_he: "בית",
    text: `This is my room.
I have a big blue bed.
There is a desk near the window.
I have many books and toys.
I love my room because it is cozy.`,
    questions: [
      {
        id: "r-easy-8-q1",
        question_he: "איזה צבע המיטה?",
        options_he: ["אדום", "ירוק", "כחול", "צהוב"],
        correctIndex: 2,
      },
      {
        id: "r-easy-8-q2",
        question_he: "איפה השולחן?",
        options_he: ["ליד הדלת", "ליד המיטה", "ליד החלון", "ליד הקיר"],
        correctIndex: 2,
      },
      {
        id: "r-easy-8-q3",
        question_he: "למה הכותב אוהב את החדר?",
        options_he: ["כי הוא גדול", "כי הוא נוח", "כי הוא חדש", "כי הוא מסודר"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-easy-9",
    title_en: "Rainy Day",
    title_he: "יום גשום",
    level: "easy",
    icon: "🌧️",
    topic_he: "מזג אוויר",
    text: `Today it is raining outside.
I cannot go to the park.
I stay at home with my brother.
We play cards and watch TV.
I like rainy days at home.`,
    questions: [
      {
        id: "r-easy-9-q1",
        question_he: "למה הילד לא יוצא?",
        options_he: ["כי הוא חולה", "כי גשום", "כי הוא עייף", "כי הוא עסוק"],
        correctIndex: 1,
      },
      {
        id: "r-easy-9-q2",
        question_he: "עם מי הוא נשאר בבית?",
        options_he: ["עם אחותו", "עם אחיו", "עם חברו", "עם אמא"],
        correctIndex: 1,
      },
      {
        id: "r-easy-9-q3",
        question_he: "מה הם עושים בבית?",
        options_he: ["ישנים", "קוראים", "משחקים קלפים וצופים בטלוויזיה", "מבשלים"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-easy-10",
    title_en: "My Favorite Food",
    title_he: "האוכל האהוב עלי",
    level: "easy",
    icon: "🍕",
    topic_he: "אוכל",
    text: `My favorite food is pizza.
I eat pizza on Fridays.
I like cheese and tomato pizza.
My mom makes pizza at home.
It is very delicious!`,
    questions: [
      {
        id: "r-easy-10-q1",
        question_he: "מה האוכל האהוב?",
        options_he: ["פיצה", "המבורגר", "פסטה", "לחם"],
        correctIndex: 0,
      },
      {
        id: "r-easy-10-q2",
        question_he: "מתי הוא אוכל פיצה?",
        options_he: ["שלישי", "רביעי", "חמישי", "שישי"],
        correctIndex: 3,
      },
      {
        id: "r-easy-10-q3",
        question_he: "מי מכינה פיצה בבית?",
        options_he: ["הילד", "אבא", "אמא", "סבתא"],
        correctIndex: 2,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  MEDIUM  (new passages r-medium-4 through r-medium-10)
  // ══════════════════════════════════════════════════════════════
  {
    id: "r-medium-4",
    title_en: "A Trip to the Beach",
    title_he: "טיול לים",
    level: "medium",
    icon: "🏖️",
    topic_he: "טיול",
    text: `Last summer, my family went to the beach.
We drove for two hours to get there.
The beach was crowded with people.
I swam in the sea with my dad.
The water was warm and blue.
My sister built a big sandcastle.
We ate sandwiches and ice cream for lunch.
At sunset, we went back home, very happy and tired.`,
    questions: [
      {
        id: "r-medium-4-q1",
        question_he: "כמה זמן נסעו לים?",
        options_he: ["שעה", "שעתיים", "שלוש שעות", "ארבע שעות"],
        correctIndex: 1,
      },
      {
        id: "r-medium-4-q2",
        question_he: "מה אחות הכותב בנתה?",
        options_he: ["בית חול", "מגדל חול", "טירת חול", "בריכה"],
        correctIndex: 2,
      },
      {
        id: "r-medium-4-q3",
        question_he: "מה הם אכלו לצהריים?",
        options_he: ["פיצה ומיץ", "כריכים וגלידה", "דגים ועוגה", "פיצה וסלט"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-medium-5",
    title_en: "My School Day",
    title_he: "יום בבית הספר",
    level: "medium",
    icon: "🏫",
    topic_he: "בית ספר",
    text: `Every morning I wake up at seven o'clock.
I eat breakfast and put on my uniform.
I walk to school with my neighbor, Yoav.
We have six lessons every day.
My favorite subjects are English and art.
During recess, I play football with my friends.
After school, I go home and do my homework.
In the evening, I read a book before bed.`,
    questions: [
      {
        id: "r-medium-5-q1",
        question_he: "עם מי הכותב הולך לבית הספר?",
        options_he: ["עם אחיו", "עם שכנו יואב", "עם חברו דוד", "לבד"],
        correctIndex: 1,
      },
      {
        id: "r-medium-5-q2",
        question_he: "מה המקצועות האהובים?",
        options_he: ["מתמטיקה ומדעים", "היסטוריה ואנגלית", "אנגלית ואמנות", "גיאוגרפיה ומוזיקה"],
        correctIndex: 2,
      },
      {
        id: "r-medium-5-q3",
        question_he: "מה הכותב עושה בערב?",
        options_he: ["צופה בטלוויזיה", "משחק", "קורא ספר", "מדבר בטלפון"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-medium-6",
    title_en: "My Pet Rabbit",
    title_he: "הארנב שלי",
    level: "medium",
    icon: "🐰",
    topic_he: "חיות",
    text: `I have a pet rabbit named Snowy.
Snowy is white with brown spots.
Every morning, I feed him carrots and lettuce.
Snowy lives in a big cage in my room.
He likes to hop around and play.
Sometimes I let him run in the garden.
My friends love to visit and play with Snowy.
Having a rabbit is a big responsibility.`,
    questions: [
      {
        id: "r-medium-6-q1",
        question_he: "מה שם הארנב?",
        options_he: ["Fluffy", "Snowy", "Bunny", "Cotton"],
        correctIndex: 1,
      },
      {
        id: "r-medium-6-q2",
        question_he: "מה הכותב מאכיל את הארנב?",
        options_he: ["גזר ולחוגה", "גזר וחסה", "אוכל ומים", "פירות וירקות"],
        correctIndex: 1,
      },
      {
        id: "r-medium-6-q3",
        question_he: "איפה הארנב גר?",
        options_he: ["בגינה", "בסלון", "בכלוב גדול בחדר", "בחוץ"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-medium-7",
    title_en: "Sports Day",
    title_he: "יום ספורט",
    level: "medium",
    icon: "🏃",
    topic_he: "ספורט",
    text: `Last week, our school had a Sports Day.
All the students came to the sports field.
We competed in running, jumping, and swimming.
I participated in the 100-meter race.
I was very nervous before the race.
When the whistle blew, I ran as fast as I could.
I came in second place!
My teacher gave me a silver medal.
I was so proud!`,
    questions: [
      {
        id: "r-medium-7-q1",
        question_he: "במה הכותב השתתף?",
        options_he: ["קפיצה", "שחייה", "ריצת 100 מטר", "כדורגל"],
        correctIndex: 2,
      },
      {
        id: "r-medium-7-q2",
        question_he: "באיזה מקום הכותב הגיע?",
        options_he: ["ראשון", "שני", "שלישי", "רביעי"],
        correctIndex: 1,
      },
      {
        id: "r-medium-7-q3",
        question_he: "מה המורה נתן לו?",
        options_he: ["מדליית זהב", "מדליית כסף", "גביע", "תעודה"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-medium-8",
    title_en: "Winter Holiday",
    title_he: "חופשת חורף",
    level: "medium",
    icon: "⛄",
    topic_he: "חגים",
    text: `During the winter holiday, I visited my grandparents.
They live in a small village in the mountains.
There was snow everywhere — it was beautiful!
My grandfather taught me how to ski.
At first, I fell many times, but then I got better.
In the evenings, we sat by the fireplace.
Grandma made hot chocolate and cookies.
I did not want to go back home!`,
    questions: [
      {
        id: "r-medium-8-q1",
        question_he: "איפה גרים הסבא וסבתא?",
        options_he: ["בעיר גדולה", "ליד הים", "בכפר קטן בהרים", "בפרברים"],
        correctIndex: 2,
      },
      {
        id: "r-medium-8-q2",
        question_he: "מה הסבא לימד?",
        options_he: ["לשחות", "לגלוש על שלג", "לטפס", "לרכב על אופניים"],
        correctIndex: 1,
      },
      {
        id: "r-medium-8-q3",
        question_he: "מה הסבתא הכינה?",
        options_he: ["מרק ולחם", "שוקו חם ועוגיות", "פיצה ועוגה", "כריכים ומיץ"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-medium-9",
    title_en: "My Hobby: Reading",
    title_he: "התחביב שלי: קריאה",
    level: "medium",
    icon: "📖",
    topic_he: "תחביבים",
    text: `My hobby is reading books.
I read every day before going to sleep.
My favorite books are adventure stories.
I also like books about animals and nature.
Last month, I read five books!
I borrow books from the school library every week.
My teacher says reading helps us learn new words.
I want to write my own book one day.`,
    questions: [
      {
        id: "r-medium-9-q1",
        question_he: "מתי הכותב קורא?",
        options_he: ["בבוקר", "בהפסקה", "לפני השינה", "אחר הצהריים"],
        correctIndex: 2,
      },
      {
        id: "r-medium-9-q2",
        question_he: "כמה ספרים קרא בחודש שעבר?",
        options_he: ["שלושה", "ארבעה", "חמישה", "שישה"],
        correctIndex: 2,
      },
      {
        id: "r-medium-9-q3",
        question_he: "מאיפה הוא לוקח ספרים?",
        options_he: ["מחנות", "מהספרייה", "מחברים", "מהאינטרנט"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-medium-10",
    title_en: "Shopping for Clothes",
    title_he: "קניית בגדים",
    level: "medium",
    icon: "👗",
    topic_he: "קניות",
    text: `Yesterday, my mom took me to buy new clothes for school.
We went to a big shopping mall.
I tried on three different shirts.
I chose a blue shirt and black jeans.
My mom also bought me new sneakers.
The sneakers were white and very comfortable.
We spent two hours in the mall.
I was happy with my new clothes.`,
    questions: [
      {
        id: "r-medium-10-q1",
        question_he: "למה הם קנו בגדים?",
        options_he: ["לשמחה", "לבית הספר", "לחג", "לטיול"],
        correctIndex: 1,
      },
      {
        id: "r-medium-10-q2",
        question_he: "מה הילד בחר?",
        options_he: ["חולצה אדומה ומכנסיים כחולים", "חולצה כחולה ומכנסיים שחורים", "שמלה ירוקה", "מעיל חום"],
        correctIndex: 1,
      },
      {
        id: "r-medium-10-q3",
        question_he: "כמה זמן הם היו בקניון?",
        options_he: ["שעה", "שעתיים", "שלוש שעות", "חצי שעה"],
        correctIndex: 1,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  HARD  (new passages r-hard-3 through r-hard-8)
  // ══════════════════════════════════════════════════════════════
  {
    id: "r-hard-3",
    title_en: "My Family History",
    title_he: "ההיסטוריה של משפחתי",
    level: "hard",
    icon: "👨‍👩‍👧‍👦",
    topic_he: "משפחה",
    text: `My family has an interesting history.
My grandparents came to Israel from Morocco many years ago.
They spoke Arabic and French, not Hebrew.
When they arrived, they had to learn a new language.
It was very difficult for them, but they worked hard.
My grandmother says that learning Hebrew was the hardest thing she ever did.
Now, our family speaks Hebrew, but my grandparents still remember Arabic.
My grandfather tells us stories in Arabic sometimes, and we love listening.
Because of my grandparents' courage, my family has a better life.
I am very proud of where my family comes from.`,
    questions: [
      {
        id: "r-hard-3-q1",
        question_he: "מאיפה באו הסבא והסבתא?",
        options_he: ["תורכיה", "מרוקו", "פולין", "אתיופיה"],
        correctIndex: 1,
      },
      {
        id: "r-hard-3-q2",
        question_he: "מה הסבתא אומרת שהיה הכי קשה?",
        options_he: ["למצוא עבודה", "ללמוד עברית", "להתרגל לאקלים", "לאכול אוכל חדש"],
        correctIndex: 1,
      },
      {
        id: "r-hard-3-q3",
        question_he: "מה הסבא עושה לפעמים?",
        options_he: ["שר שירים", "מספר סיפורים בערבית", "מבשל אוכל", "מצייר"],
        correctIndex: 1,
      },
      {
        id: "r-hard-3-q4",
        question_he: "מה הכותב מרגיש לגבי משפחתו?",
        options_he: ["עצוב", "מתבייש", "גאה", "מופתע"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-hard-4",
    title_en: "The New Student",
    title_he: "התלמיד החדש",
    level: "hard",
    icon: "🆕",
    topic_he: "בית ספר",
    text: `At the beginning of the school year, a new student joined our class.
His name is Daniel, and he came from the United States.
Daniel spoke English perfectly, but his Hebrew was not very good.
At first, he was quiet and looked a little sad.
I decided to sit next to him and help him.
I taught him some Hebrew words every day.
In return, he helped me practice my English.
Soon, Daniel made many friends in our class.
His Hebrew improved quickly because he worked very hard.
By the end of the year, he could speak Hebrew almost as well as us.
Our teacher said that Daniel was the most improved student of the year.
Now Daniel and I are best friends.`,
    questions: [
      {
        id: "r-hard-4-q1",
        question_he: "מאיפה דניאל הגיע?",
        options_he: ["אנגליה", "אוסטרליה", "ארצות הברית", "קנדה"],
        correctIndex: 2,
      },
      {
        id: "r-hard-4-q2",
        question_he: "מה הכותב עשה כדי לעזור?",
        options_he: ["שיחק איתו", "לימד אותו מילים בעברית", "הביא לו אוכל", "הציג אותו לחברים"],
        correctIndex: 1,
      },
      {
        id: "r-hard-4-q3",
        question_he: "איך דניאל עזר לכותב?",
        options_he: ["במתמטיקה", "בספורט", "בתרגול אנגלית", "בגיאוגרפיה"],
        correctIndex: 2,
      },
      {
        id: "r-hard-4-q4",
        question_he: "מה המורה אמרה על דניאל?",
        options_he: ["שהוא החכם ביותר", "שהוא התקדם הכי הרבה", "שהוא הכי עצלן", "שהוא הכי חברותי"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-hard-5",
    title_en: "Saving the Environment",
    title_he: "הצלת הסביבה",
    level: "hard",
    icon: "🌍",
    topic_he: "סביבה",
    text: `Our planet is in danger because of pollution.
Factories and cars produce gases that make the air dirty.
People throw too much garbage into the sea and on the streets.
Animals and fish are dying because of the pollution.
Many scientists warn that the Earth is getting warmer every year.
This is called climate change, and it is a very serious problem.
However, there are things we can do to help.
We can recycle paper, glass, and plastic.
We can use less electricity by turning off lights.
We can travel by bicycle or public transport instead of cars.
Children around the world are also protesting to ask governments to act.
It is not too late to save our planet if we all work together.`,
    questions: [
      {
        id: "r-hard-5-q1",
        question_he: "מה גורם לאוויר להיות מזוהם?",
        options_he: ["בתים ועצים", "מפעלים ומכוניות", "אנשים ובעלי חיים", "ים ורוח"],
        correctIndex: 1,
      },
      {
        id: "r-hard-5-q2",
        question_he: "מה קוראים לתופעה של התחממות האדמה?",
        options_he: ["גשם חומצי", "שינוי אקלים", "זיהום ים", "פסולת גרעינית"],
        correctIndex: 1,
      },
      {
        id: "r-hard-5-q3",
        question_he: "מה ילדים עושים ברחבי העולם?",
        options_he: ["שותלים עצים", "מנקים חופים", "מוחים ודורשים שינוי", "לומדים מדעים"],
        correctIndex: 2,
      },
      {
        id: "r-hard-5-q4",
        question_he: "מה אנחנו יכולים לעשות כדי לעזור?",
        options_he: ["לקנות יותר דברים", "למחזר ולחסוך חשמל", "לעבור לגור בכפר", "לא לאכול בשר"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-hard-6",
    title_en: "A Dream Come True",
    title_he: "חלום שהתגשם",
    level: "hard",
    icon: "🌠",
    topic_he: "ספורט",
    text: `When I was seven years old, I watched a swimming competition on TV.
I saw a young swimmer win a gold medal, and I decided: I want to do that!
The next day, I asked my parents to sign me up for swimming lessons.
For five years, I trained every morning before school.
Some days I was tired and wanted to quit, but I kept going.
My coach always said: Champions are made in difficult moments.
At the age of twelve, I entered my first regional competition.
There were swimmers from many different cities.
I was nervous, but I remembered all my hard work.
When I dived into the pool, I forgot everything except swimming.
At the end of the race, I looked at the board — first place!
Tears came to my eyes. All those years of training were worth it.`,
    questions: [
      {
        id: "r-hard-6-q1",
        question_he: "כמה שנים הכותב התאמן?",
        options_he: ["שלוש שנים", "ארבע שנים", "חמש שנים", "שש שנים"],
        correctIndex: 2,
      },
      {
        id: "r-hard-6-q2",
        question_he: "מה האמרה של המאמן?",
        options_he: ["תמיד תאמין בעצמך", "אלופים נוצרים ברגעים קשים", "אל תוותר לעולם", "הזמן יחלוף"],
        correctIndex: 1,
      },
      {
        id: "r-hard-6-q3",
        question_he: "באיזה גיל הכותב נכנס לתחרות הראשונה?",
        options_he: ["עשר", "אחת עשרה", "שתים עשרה", "שלוש עשרה"],
        correctIndex: 2,
      },
      {
        id: "r-hard-6-q4",
        question_he: "באיזה מקום הכותב הגיע?",
        options_he: ["שני", "שלישי", "ראשון", "לא ידוע"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-hard-7",
    title_en: "Technology in Our Lives",
    title_he: "טכנולוגיה בחיינו",
    level: "hard",
    icon: "📱",
    topic_he: "טכנולוגיה",
    text: `Twenty years ago, most people did not have a smartphone.
Today, almost everyone has one — even children!
Technology has changed our lives in many ways.
We can communicate with people on the other side of the world instantly.
We can find any information we need in just seconds.
Students can learn languages, science, and art using apps and websites.
Hospitals use technology to help doctors save more lives.
However, there are some problems with too much technology.
Many children spend too many hours looking at screens.
This can cause problems with eyesight and sleep.
Some experts say that face-to-face friendships are getting weaker.
The most important thing is to use technology wisely.
We should enjoy its benefits, but also spend time in nature and with real people.`,
    questions: [
      {
        id: "r-hard-7-q1",
        question_he: "מה השתנה ב-20 השנים האחרונות?",
        options_he: ["מזג האוויר", "השימוש בטכנולוגיה", "ספרי לימוד", "שפת ילדים"],
        correctIndex: 1,
      },
      {
        id: "r-hard-7-q2",
        question_he: "מה טכנולוגיה מאפשרת לנו לעשות?",
        options_he: ["לתקשר מיידית עם כל העולם", "לבשל אוכל", "לנסוע מהר יותר", "לישון טוב יותר"],
        correctIndex: 0,
      },
      {
        id: "r-hard-7-q3",
        question_he: "מה אחד הבעיות של יותר מדי טכנולוגיה?",
        options_he: ["יקר מדי", "בעיות ראייה ושינה", "מזג אוויר גרוע", "פחות ספרים"],
        correctIndex: 1,
      },
      {
        id: "r-hard-7-q4",
        question_he: "מה הדבר הכי חשוב לגבי טכנולוגיה?",
        options_he: ["להשתמש בה כמה שיותר", "לא להשתמש בה בכלל", "להשתמש בה בחוכמה", "לקנות טכנולוגיה חדשה"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-hard-8",
    title_en: "My Hero",
    title_he: "הגיבור שלי",
    level: "hard",
    icon: "🦸",
    topic_he: "השראה",
    text: `People often ask me: who is your hero?
My hero is not a famous athlete or a movie star.
My hero is my older sister, Tamar.
When Tamar was sixteen, she was in a serious car accident.
The doctors said she might never walk again.
Everyone was very sad and worried.
But Tamar refused to give up.
She worked with doctors and physical therapists every single day.
She was in pain, but she kept trying.
After two years of hard work, Tamar took her first steps again.
She cried, and our whole family cried with her.
Today, Tamar runs marathons and helps other injured people.
She says: If I could do it, so can you.
Tamar taught me that with determination and hope, anything is possible.`,
    questions: [
      {
        id: "r-hard-8-q1",
        question_he: "מי הגיבור של הכותב?",
        options_he: ["ספורטאי מפורסם", "שחקן סרטים", "אחותו תמר", "מורה"],
        correctIndex: 2,
      },
      {
        id: "r-hard-8-q2",
        question_he: "מה קרה לתמר כשהייתה בת 16?",
        options_he: ["היא חלתה", "היא נפצעה בתאונת דרכים", "היא עברה ניתוח", "היא שברה רגל"],
        correctIndex: 1,
      },
      {
        id: "r-hard-8-q3",
        question_he: "מה הרופאים אמרו?",
        options_he: ["שהיא תבריא מהר", "שהיא אולי לא תלך שוב", "שהיא צריכה ניתוח", "שאין סיכוי"],
        correctIndex: 1,
      },
      {
        id: "r-hard-8-q4",
        question_he: "מה תמר עושה היום?",
        options_he: ["רצה מרתונים ועוזרת לפצועים", "עובדת כרופאה", "מלמדת ספורט", "כותבת ספרים"],
        correctIndex: 0,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  EASY — BATCH 2  (r-easy-11 … r-easy-20)
  // ══════════════════════════════════════════════════════════════
  {
    id: "r-easy-11",
    title_en: "My Family",
    title_he: "המשפחה שלי",
    level: "easy",
    icon: "👨‍👩‍👧",
    topic_he: "משפחה",
    text: `I have a small family.
My mom is a teacher. My dad is a doctor.
I have one sister. Her name is Maya.
Maya is seven years old.
We eat dinner together every day.
I love my family.`,
    questions: [
      {
        id: "r-easy-11-q1",
        question_he: "מה המקצוע של האמא?",
        options_he: ["רופאה", "מורה", "עורכת דין", "אחות"],
        correctIndex: 1,
      },
      {
        id: "r-easy-11-q2",
        question_he: "כמה בת שנות אחות?",
        options_he: ["שש", "שבע", "שמונה", "תשע"],
        correctIndex: 1,
      },
      {
        id: "r-easy-11-q3",
        question_he: "מתי המשפחה אוכלת יחד?",
        options_he: ["ארוחת בוקר", "ארוחת צהריים", "ארוחת ערב", "בסוף השבוע"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-easy-12",
    title_en: "The Park",
    title_he: "הפארק",
    level: "easy",
    icon: "🌳",
    topic_he: "טבע",
    text: `Near my house there is a big park.
I go to the park after school.
There are trees and flowers in the park.
Children play on the swings.
I like to run on the grass.
The park is a nice place.`,
    questions: [
      {
        id: "r-easy-12-q1",
        question_he: "מתי הילד הולך לפארק?",
        options_he: ["לפני בית הספר", "אחרי בית הספר", "בסוף השבוע", "בבוקר"],
        correctIndex: 1,
      },
      {
        id: "r-easy-12-q2",
        question_he: "מה יש בפארק?",
        options_he: ["בריכה ומגרש", "עצים ופרחים", "חנויות ומסעדות", "כלבים וחתולים"],
        correctIndex: 1,
      },
      {
        id: "r-easy-12-q3",
        question_he: "מה הילד אוהב לעשות בפארק?",
        options_he: ["לשחות", "לשבת", "לרוץ על הדשא", "לאכול"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-easy-13",
    title_en: "My Lunch",
    title_he: "ארוחת הצהריים שלי",
    level: "easy",
    icon: "🥪",
    topic_he: "אוכל",
    text: `Every day I eat lunch at school.
Today I have a sandwich and an apple.
My sandwich has cheese and tomato.
I also drink water.
My friend Lior eats rice and chicken.
Lunch is my favorite meal.`,
    questions: [
      {
        id: "r-easy-13-q1",
        question_he: "איפה הילד אוכל צהריים?",
        options_he: ["בבית", "בפארק", "בבית הספר", "במסעדה"],
        correctIndex: 2,
      },
      {
        id: "r-easy-13-q2",
        question_he: "מה יש בכריך?",
        options_he: ["גבינה ועגבנייה", "חמאה ורוטב", "ביצה וירקות", "עוף ולחם"],
        correctIndex: 0,
      },
      {
        id: "r-easy-13-q3",
        question_he: "מה ליאור אוכל?",
        options_he: ["כריך ותפוח", "פסטה ודגים", "אורז ועוף", "סלט וגבינה"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-easy-14",
    title_en: "My Room",
    title_he: "החדר שלי",
    level: "easy",
    icon: "🛏️",
    topic_he: "בית",
    text: `My room is small but nice.
I have a blue bed and a white desk.
My books are on the shelf.
I have a big window.
I can see the garden from my window.
I like to read in my room.`,
    questions: [
      {
        id: "r-easy-14-q1",
        question_he: "באיזה צבע המיטה?",
        options_he: ["לבנה", "אדומה", "כחולה", "ירוקה"],
        correctIndex: 2,
      },
      {
        id: "r-easy-14-q2",
        question_he: "איפה הספרים?",
        options_he: ["על המיטה", "על המדף", "על השולחן", "על הרצפה"],
        correctIndex: 1,
      },
      {
        id: "r-easy-14-q3",
        question_he: "מה הילד רואה מהחלון?",
        options_he: ["רחוב", "ים", "גינה", "הרים"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-easy-15",
    title_en: "A Birthday Party",
    title_he: "מסיבת יום הולדת",
    level: "easy",
    icon: "🎂",
    topic_he: "חגיגות",
    text: `Today is my birthday. I am nine years old.
My friends come to my party.
We eat cake and ice cream.
I open my presents. I get a book and a game.
We play games and dance.
It is a happy day!`,
    questions: [
      {
        id: "r-easy-15-q1",
        question_he: "כמה שנות בן הילד היום?",
        options_he: ["שמונה", "תשע", "עשר", "שבע"],
        correctIndex: 1,
      },
      {
        id: "r-easy-15-q2",
        question_he: "מה הילד אוכל במסיבה?",
        options_he: ["פיצה וצ'יפס", "כריכים ומיץ", "עוגה וגלידה", "פירות וסלט"],
        correctIndex: 2,
      },
      {
        id: "r-easy-15-q3",
        question_he: "מה הילד מקבל במתנה?",
        options_he: ["ספר ומשחק", "כדור ואוזניות", "צעצוע ובגד", "ספר וצבעים"],
        correctIndex: 0,
      },
    ],
  },

  {
    id: "r-easy-16",
    title_en: "The Weather",
    title_he: "מזג האוויר",
    level: "easy",
    icon: "☀️",
    topic_he: "מזג אוויר",
    text: `Today is sunny and warm.
The sky is blue with white clouds.
I wear a T-shirt and shorts.
In winter it is cold and rainy.
I wear a coat and boots in winter.
I like summer best.`,
    questions: [
      {
        id: "r-easy-16-q1",
        question_he: "מה מזג האוויר היום?",
        options_he: ["קר וגשום", "עצום ורוח", "שמשי וחם", "מעונן וקר"],
        correctIndex: 2,
      },
      {
        id: "r-easy-16-q2",
        question_he: "מה לובשים בחורף?",
        options_he: ["חולצה ומכנסיים קצרים", "מעיל ומגפיים", "חולצה ונעליים", "ז'קט וכובע"],
        correctIndex: 1,
      },
      {
        id: "r-easy-16-q3",
        question_he: "איזה עונה הכי אהובה על הילד?",
        options_he: ["חורף", "אביב", "סתיו", "קיץ"],
        correctIndex: 3,
      },
    ],
  },

  {
    id: "r-easy-17",
    title_en: "My Cat",
    title_he: "החתול שלי",
    level: "easy",
    icon: "🐱",
    topic_he: "חיות",
    text: `I have a cat. Her name is Luna.
Luna is black and white.
She likes to sleep on my bed.
She drinks milk and eats fish.
Luna can jump very high.
She is a good cat.`,
    questions: [
      {
        id: "r-easy-17-q1",
        question_he: "מה שם החתולה?",
        options_he: ["Lilly", "Luna", "Lucy", "Lena"],
        correctIndex: 1,
      },
      {
        id: "r-easy-17-q2",
        question_he: "מה החתולה אוהבת לאכול?",
        options_he: ["עוף ואורז", "בשר וירקות", "חלב ודגים", "לחם וגבינה"],
        correctIndex: 2,
      },
      {
        id: "r-easy-17-q3",
        question_he: "איפה החתולה אוהבת לישון?",
        options_he: ["על הספה", "על המיטה", "על הרצפה", "בגינה"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-easy-18",
    title_en: "A School Day",
    title_he: "יום בבית הספר",
    level: "easy",
    icon: "🎒",
    topic_he: "בית ספר",
    text: `I wake up at seven o'clock.
I eat breakfast and put on my school bag.
I walk to school with my friend.
We have five lessons today.
I like the math lesson.
At three o'clock I go home.`,
    questions: [
      {
        id: "r-easy-18-q1",
        question_he: "באיזו שעה הילד מתעורר?",
        options_he: ["שש", "שש וחצי", "שבע", "שבע וחצי"],
        correctIndex: 2,
      },
      {
        id: "r-easy-18-q2",
        question_he: "כמה שיעורים יש היום?",
        options_he: ["ארבעה", "חמישה", "שישה", "שלושה"],
        correctIndex: 1,
      },
      {
        id: "r-easy-18-q3",
        question_he: "איזה שיעור הילד אוהב?",
        options_he: ["אנגלית", "מדע", "חשבון", "ספורט"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-easy-19",
    title_en: "At the Supermarket",
    title_he: "בסופרמרקט",
    level: "easy",
    icon: "🛒",
    topic_he: "קניות",
    text: `Mom and I go to the supermarket.
We need milk, bread, and eggs.
I push the shopping cart.
We also buy apples and orange juice.
We pay at the checkout.
We carry the bags home together.`,
    questions: [
      {
        id: "r-easy-19-q1",
        question_he: "עם מי הילד הולך לסופרמרקט?",
        options_he: ["עם אבא", "עם חבר", "עם אמא", "לבד"],
        correctIndex: 2,
      },
      {
        id: "r-easy-19-q2",
        question_he: "מה הם קונים?",
        options_he: ["לחם, חלב וביצים", "בשר, ירקות ופרי", "גבינה, יוגורט וחלב", "עוגיות, מיץ ובשר"],
        correctIndex: 0,
      },
      {
        id: "r-easy-19-q3",
        question_he: "מה הילד עושה בסופרמרקט?",
        options_he: ["בוחר את האוכל", "דוחף את עגלת הקניות", "משלם בקופה", "נושא את השקיות"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-easy-20",
    title_en: "My Hobby",
    title_he: "התחביב שלי",
    level: "easy",
    icon: "🎨",
    topic_he: "תחביבים",
    text: `I love to draw and paint.
Every day I draw something new.
I draw animals, houses, and people.
I use colored pencils and paint.
My pictures are on my wall.
My teacher says I draw very well.`,
    questions: [
      {
        id: "r-easy-20-q1",
        question_he: "מה התחביב של הילד?",
        options_he: ["לשחק כדורגל", "לצייר ולצבוע", "לקרוא ספרים", "לנגן מוזיקה"],
        correctIndex: 1,
      },
      {
        id: "r-easy-20-q2",
        question_he: "מה הילד מצייר?",
        options_he: ["פרחים ועצים", "בעלי חיים, בתים ואנשים", "רכבים וספינות", "דגים ופרפרים"],
        correctIndex: 1,
      },
      {
        id: "r-easy-20-q3",
        question_he: "מה המורה אומרת על הציורים?",
        options_he: ["שהם יפים", "שהם מוזרים", "שהוא מצייר מאוד טוב", "שהוא צריך להתאמן יותר"],
        correctIndex: 2,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  MEDIUM — BATCH 2  (r-medium-11 … r-medium-22)
  // ══════════════════════════════════════════════════════════════
  {
    id: "r-medium-11",
    title_en: "The Library",
    title_he: "הספרייה",
    level: "medium",
    icon: "📚",
    topic_he: "בית ספר",
    text: `Our school has a big library.
There are hundreds of books on the shelves.
Every Tuesday, our class goes to the library for one hour.
We can choose any book we like.
The librarian, Mrs. Green, helps us find good books.
I always choose adventure stories.
Last week I read a book about a boy who sailed around the world.
It was exciting and I finished it in two days.`,
    questions: [
      {
        id: "r-medium-11-q1",
        question_he: "מתי הכיתה הולכת לספרייה?",
        options_he: ["כל יום", "ביום שני", "ביום שלישי", "בסוף השבוע"],
        correctIndex: 2,
      },
      {
        id: "r-medium-11-q2",
        question_he: "מה שם הספרנית?",
        options_he: ["Mrs. Brown", "Mrs. White", "Mrs. Black", "Mrs. Green"],
        correctIndex: 3,
      },
      {
        id: "r-medium-11-q3",
        question_he: "איזה סוג ספרים הילד בוחר תמיד?",
        options_he: ["סיפורי אימה", "סיפורי הרפתקאות", "ספרי מדע", "שירים"],
        correctIndex: 1,
      },
      {
        id: "r-medium-11-q4",
        question_he: "על מה הספר שקרא השבוע?",
        options_he: ["ילד שחקר את החלל", "ילד שטייל ביבשות", "ילד שהפליג סביב העולם", "ילד שגילה אי"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-medium-12",
    title_en: "A Trip to the Zoo",
    title_he: "טיול לגן החיות",
    level: "medium",
    icon: "🦁",
    topic_he: "בעלי חיים",
    text: `Last Friday, our class went on a trip to the zoo.
We left school at eight in the morning and arrived at nine.
The zoo had many animals: lions, elephants, giraffes, and monkeys.
My favourite animal was the giraffe because it was so tall.
The giraffe ate leaves from a high tree. Its tongue was very long.
We also saw baby animals in a special area.
There was a baby elephant that was only two months old.
We had lunch near the lake and then went back to school at four.
It was the best school trip!`,
    questions: [
      {
        id: "r-medium-12-q1",
        question_he: "מתי הכיתה יצאה לטיול?",
        options_he: ["ביום חמישי", "ביום שישי", "ביום ראשון", "ביום שבת"],
        correctIndex: 1,
      },
      {
        id: "r-medium-12-q2",
        question_he: "מה החיה האהובה של הילד ומדוע?",
        options_he: ["אריה כי הוא חזק", "פיל כי הוא גדול", "ג'ירפה כי היא גבוהה", "קוף כי הוא מצחיק"],
        correctIndex: 2,
      },
      {
        id: "r-medium-12-q3",
        question_he: "כמה זמן בן גור הפיל?",
        options_he: ["שבועיים", "חודש", "חודשיים", "שלושה חודשים"],
        correctIndex: 2,
      },
      {
        id: "r-medium-12-q4",
        question_he: "איפה אכלו ארוחת צהריים?",
        options_he: ["ליד הכניסה", "ליד כלוב האריה", "ליד העצים", "ליד האגם"],
        correctIndex: 3,
      },
    ],
  },

  {
    id: "r-medium-13",
    title_en: "The Four Seasons",
    title_he: "ארבע עונות השנה",
    level: "medium",
    icon: "🍂",
    topic_he: "מזג אוויר",
    text: `There are four seasons in a year: spring, summer, autumn, and winter.
In spring, flowers bloom and trees turn green. The weather is warm and pleasant.
In summer, it is hot and sunny. Children go to the beach and swim.
In autumn, the leaves change colour to orange, red, and brown. They fall from the trees.
In winter, it is cold and it rains a lot. In some countries it snows.
Each season has special holidays and activities.
My favourite season is summer because I can swim and play outside all day.`,
    questions: [
      {
        id: "r-medium-13-q1",
        question_he: "מה קורה באביב?",
        options_he: ["השלג נופל", "עלים נושרים", "פרחים פורחים ועצים מתירקים", "חם מאוד ויש ים"],
        correctIndex: 2,
      },
      {
        id: "r-medium-13-q2",
        question_he: "מה קורה לעלים בסתיו?",
        options_he: ["הם גדלים ומתירקים", "הם משנים צבע ונושרים", "הם נשארים ירוקים", "הם נעלמים"],
        correctIndex: 1,
      },
      {
        id: "r-medium-13-q3",
        question_he: "באיזה מדינות יורד שלג?",
        options_he: ["בכל המדינות", "רק בישראל", "במדינות מסוימות", "רק ביבשת אפריקה"],
        correctIndex: 2,
      },
      {
        id: "r-medium-13-q4",
        question_he: "מה העונה האהובה ומדוע?",
        options_he: ["חורף בגלל השלג", "אביב בגלל הפרחים", "קיץ בגלל השחייה ומשחק בחוץ", "סתיו בגלל הצבעים"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-medium-14",
    title_en: "Cooking with Grandma",
    title_he: "בישול עם סבתא",
    level: "medium",
    icon: "👩‍🍳",
    topic_he: "אוכל",
    text: `Every Friday I help my grandma cook dinner.
First, we write a list of ingredients we need.
Then we go shopping and buy vegetables, chicken, and spices.
Grandma teaches me how to cut vegetables and mix the sauce.
I am careful with the knife because it is sharp.
The chicken cooks in the oven for one hour.
While we wait, we set the table and talk.
When the food is ready, the whole family eats together.
Everyone says the food is delicious!
I am proud when people enjoy the food I helped make.`,
    questions: [
      {
        id: "r-medium-14-q1",
        question_he: "מתי הילד עוזר לסבתא לבשל?",
        options_he: ["כל יום", "כל שבת", "כל יום שישי", "כל ראשון"],
        correctIndex: 2,
      },
      {
        id: "r-medium-14-q2",
        question_he: "מה הילד לומד לעשות?",
        options_he: ["לקנות מצרכים", "לחתוך ירקות ולערבב רוטב", "להדליק תנור", "לשטוף כלים"],
        correctIndex: 1,
      },
      {
        id: "r-medium-14-q3",
        question_he: "כמה זמן העוף מתבשל בתנור?",
        options_he: ["חצי שעה", "שעה", "שעתיים", "רבע שעה"],
        correctIndex: 1,
      },
      {
        id: "r-medium-14-q4",
        question_he: "איך הילד מרגיש כשאנשים נהנים מהאוכל?",
        options_he: ["עצוב", "עייף", "גאה", "חרד"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-medium-15",
    title_en: "Technology at School",
    title_he: "טכנולוגיה בבית הספר",
    level: "medium",
    icon: "💻",
    topic_he: "טכנולוגיה",
    text: `Our school has a computer room with twenty computers.
Every week we have one computer lesson with our teacher, Mr. Dan.
We learn how to type, search for information, and make presentations.
Mr. Dan says that knowing how to use computers is very important for the future.
Last month we made a presentation about our country.
We found pictures and information on the internet and put them together.
We also have tablets in our class that we use for reading and maths games.
I think technology makes learning more fun and interesting.`,
    questions: [
      {
        id: "r-medium-15-q1",
        question_he: "כמה מחשבים יש בחדר המחשבים?",
        options_he: ["עשרה", "חמישה עשר", "עשרים", "עשרים וחמישה"],
        correctIndex: 2,
      },
      {
        id: "r-medium-15-q2",
        question_he: "מה למדו לעשות בשיעורי מחשב?",
        options_he: ["לתכנת אתרים", "להקליד, לחפש מידע ולהכין מצגות", "לשחק משחקים", "לצלם סרטים"],
        correctIndex: 1,
      },
      {
        id: "r-medium-15-q3",
        question_he: "על מה היתה המצגת שהכינו?",
        options_he: ["על בעלי חיים", "על העיר שלהם", "על המדינה שלהם", "על ממציאים"],
        correctIndex: 2,
      },
      {
        id: "r-medium-15-q4",
        question_he: "למה הילד חושב שטכנולוגיה עוזרת?",
        options_he: ["כי היא חוסכת זמן", "כי היא הופכת את הלמידה לכיפית ומעניינת", "כי היא עוזרת לעשות שיעורי בית", "כי היא מאפשרת לצפות בסרטונים"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-medium-16",
    title_en: "My Best Friend",
    title_he: "החבר הכי טוב שלי",
    level: "medium",
    icon: "👫",
    topic_he: "חברות",
    text: `My best friend is called Noam. We have been friends since kindergarten.
Noam lives near my house, so we walk to school together every day.
We like the same things: football, video games, and pizza.
Sometimes we disagree about small things, but we always make up quickly.
Last summer, Noam came with my family on a trip to Eilat.
We swam in the sea and built sandcastles on the beach.
It was one of the best holidays of my life.
I think a good friend is someone who is always there for you.
I am lucky to have Noam as my best friend.`,
    questions: [
      {
        id: "r-medium-16-q1",
        question_he: "מתי הם נהיו חברים?",
        options_he: ["בגן ילדים", "בכיתה א'", "בגן חובה", "בגיל שלוש"],
        correctIndex: 0,
      },
      {
        id: "r-medium-16-q2",
        question_he: "מה הם עשו בחופשה באילת?",
        options_he: ["שחו בבריכה ורכבו על סוסים", "שחו בים ובנו טירות חול", "שחו ורכבו על אופניים", "צללו ואכלו בשפע"],
        correctIndex: 1,
      },
      {
        id: "r-medium-16-q3",
        question_he: "מה הם אוהבים לאכול?",
        options_he: ["המבורגר", "פסטה", "פיצה", "סושי"],
        correctIndex: 2,
      },
      {
        id: "r-medium-16-q4",
        question_he: "איך מגדיר הילד חבר טוב?",
        options_he: ["מישהו שמצחיק", "מישהו שתמיד שם בשבילך", "מישהו שגר קרוב", "מישהו שאוהב אותם הדברים"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-medium-17",
    title_en: "Our Garden",
    title_he: "הגינה שלנו",
    level: "medium",
    icon: "🌻",
    topic_he: "טבע",
    text: `We have a small garden behind our house.
My dad and I take care of the garden together.
We grow tomatoes, cucumbers, and sunflowers.
Every morning, I water the plants with a hose.
In spring we plant new seeds and wait for them to grow.
It takes about two weeks for the first tiny plants to appear.
I feel excited when I see a new green shoot coming out of the soil.
Last summer, we had so many tomatoes that we gave some to our neighbours.
My mom makes fresh salad with our tomatoes every week.
Taking care of plants teaches me to be patient and responsible.`,
    questions: [
      {
        id: "r-medium-17-q1",
        question_he: "מה גדל בגינה?",
        options_he: ["תפוחים, תפוזים ועגבניות", "עגבניות, מלפפונים וחמניות", "ירקות ועשבי תיבול", "פרחים ושיחים"],
        correctIndex: 1,
      },
      {
        id: "r-medium-17-q2",
        question_he: "כמה זמן לוקח לצמחים הראשונים לצמוח?",
        options_he: ["יום אחד", "שבוע", "שבועיים", "חודש"],
        correctIndex: 2,
      },
      {
        id: "r-medium-17-q3",
        question_he: "מה עשו עם עגבניות עודפות?",
        options_he: ["מכרו אותן", "נתנו לשכנים", "שמרו אותן בהקפאה", "עשו מהן רוטב"],
        correctIndex: 1,
      },
      {
        id: "r-medium-17-q4",
        question_he: "מה הילד לומד מטיפול בצמחים?",
        options_he: ["ידע מדעי", "סבלנות ואחריות", "כישורי בישול", "אהבה לטבע"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-medium-18",
    title_en: "A Visit to the Doctor",
    title_he: "ביקור אצל הרופא",
    level: "medium",
    icon: "🏥",
    topic_he: "בריאות",
    text: `Last week I had a cold and a high fever.
My mum took me to see the doctor.
The doctor's name was Dr. Levi. She was kind and friendly.
She checked my temperature, looked at my throat, and listened to my chest.
She said I had an infection and gave me a prescription for antibiotics.
She also told me to drink lots of water, rest, and eat light food.
Mum bought the medicine at the pharmacy.
I stayed home from school for three days.
I drank hot tea with honey and slept a lot.
After four days I felt much better and went back to school.`,
    questions: [
      {
        id: "r-medium-18-q1",
        question_he: "מה הייתה בעיית הבריאות של הילד?",
        options_he: ["שפעת וכאב ראש", "הצטננות וחום גבוה", "כאב בטן ובחילה", "שיעול ואסטמה"],
        correctIndex: 1,
      },
      {
        id: "r-medium-18-q2",
        question_he: "מה הרופאה בדקה?",
        options_he: ["לחץ דם ורגליים", "טמפרטורה, גרון וחזה", "עיניים ואוזניים", "גב ובטן"],
        correctIndex: 1,
      },
      {
        id: "r-medium-18-q3",
        question_he: "כמה ימים נשאר הילד בבית?",
        options_he: ["יום אחד", "יומיים", "שלושה ימים", "שבוע"],
        correctIndex: 2,
      },
      {
        id: "r-medium-18-q4",
        question_he: "מה הילד שתה כשהיה חולה?",
        options_he: ["מיץ תפוזים", "מרק עוף", "תה חם עם דבש", "מים קרים"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-medium-19",
    title_en: "Dreams and Goals",
    title_he: "חלומות ומטרות",
    level: "medium",
    icon: "🌟",
    topic_he: "שאיפות",
    text: `When I grow up, I want to be a pilot.
I love aeroplanes and I am fascinated by how they fly.
I watch documentaries about aviation and read books about famous pilots.
My teacher says that to become a pilot, I need to study hard, especially maths and science.
I also need to be healthy, so I eat well and exercise every day.
My dad says that if you work hard for your dreams, they can come true.
My older cousin is already studying at a flight academy.
She told me that the training is very difficult but very rewarding.
I believe that with effort and determination, I can achieve my goal.
Every long journey begins with a single step.`,
    questions: [
      {
        id: "r-medium-19-q1",
        question_he: "מה הילד רוצה להיות כשיגדל?",
        options_he: ["מהנדס מטוסים", "טייס", "אסטרונאוט", "מדריך תעופה"],
        correctIndex: 1,
      },
      {
        id: "r-medium-19-q2",
        question_he: "אילו מקצועות חשובים לפי המורה?",
        options_he: ["אנגלית ומדעים", "חשבון ומדעים", "גיאוגרפיה והיסטוריה", "ספורט ובריאות"],
        correctIndex: 1,
      },
      {
        id: "r-medium-19-q3",
        question_he: "מה הדודנית הגדולה עושה?",
        options_he: ["עובדת כטייסת", "לומדת באקדמיה לתעופה", "מתאמנת בספורט", "עובדת בחברת תעופה"],
        correctIndex: 1,
      },
      {
        id: "r-medium-19-q4",
        question_he: "מה האמרה שמסיים את הטקסט?",
        options_he: ["לא להיכנע לקשיים", "כל מסע ארוך מתחיל בצעד אחד", "חלום בלי עבודה הוא רק חלום", "השמיים הם הגבול"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-medium-20",
    title_en: "Helping at Home",
    title_he: "עזרה בבית",
    level: "medium",
    icon: "🏠",
    topic_he: "בית",
    text: `In our house, everyone helps with the chores.
My job is to clean my room and take out the rubbish.
My sister sets the table before dinner.
Dad washes the dishes and mum does the laundry.
On Saturday mornings we all clean the house together.
We play music and make it fun.
After we finish, we usually go out for ice cream as a reward.
My mum says that doing chores teaches us responsibility and teamwork.
I think she is right. When we work together, it doesn't take long.
I feel good when I help my family.`,
    questions: [
      {
        id: "r-medium-20-q1",
        question_he: "מה המשימה של הילד?",
        options_he: ["לשטוף כלים ולסדר שולחן", "לנקות חדר ולהוציא זבל", "לגהץ ולקפל בגדים", "לבשל ולערוך שולחן"],
        correctIndex: 1,
      },
      {
        id: "r-medium-20-q2",
        question_he: "מתי מנקים את כל הבית ביחד?",
        options_he: ["כל יום", "בשישי בערב", "בשבת בבוקר", "כל ראשון"],
        correctIndex: 2,
      },
      {
        id: "r-medium-20-q3",
        question_he: "מה עושים אחרי שמסיימים לנקות?",
        options_he: ["צופים בטלוויזיה", "הולכים לאכול גלידה", "משחקים בגינה", "ישנים"],
        correctIndex: 1,
      },
      {
        id: "r-medium-20-q4",
        question_he: "מה האמא אומרת שמטלות הבית מלמדות?",
        options_he: ["סדר וניקיון", "אחריות ועבודת צוות", "חיסכון וארגון", "עצמאות ומשמעת"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-medium-21",
    title_en: "Sports Day",
    title_he: "יום ספורט",
    level: "medium",
    icon: "🏃",
    topic_he: "ספורט",
    text: `Once a year, our school holds a Sports Day.
All the students compete in running, jumping, and throwing events.
This year I participated in the 100-metre race and the long jump.
I trained for two months before the event. I woke up early every morning to practise.
On Sports Day, there were parents and teachers watching and cheering.
I came second in the 100-metre race. I was very happy.
In the long jump, I jumped 3.5 metres, which was a personal best for me.
I won a silver medal for the race and a certificate for the jump.
My mum took many photos and my dad was very proud.
Sports Day taught me that practice and dedication make you better.`,
    questions: [
      {
        id: "r-medium-21-q1",
        question_he: "באילו תחרויות השתתף הילד?",
        options_he: ["ריצה וקפיצה", "שחייה וריצה", "ריצת 100 מטר וקפיצה לרוחק", "זריקה וקפיצה לגובה"],
        correctIndex: 2,
      },
      {
        id: "r-medium-21-q2",
        question_he: "כמה זמן התאמן לפני יום הספורט?",
        options_he: ["חודש", "שבועיים", "שלושה חודשים", "חודשיים"],
        correctIndex: 3,
      },
      {
        id: "r-medium-21-q3",
        question_he: "באיזה מקום סיים בריצת 100 מטר?",
        options_he: ["ראשון", "שני", "שלישי", "רביעי"],
        correctIndex: 1,
      },
      {
        id: "r-medium-21-q4",
        question_he: "מה הילד למד מיום הספורט?",
        options_he: ["שגנטיקה חשובה לספורט", "שאימון ומסירות משפרים אותך", "שתחרות לא חשובה", "שצריך לנוח הרבה"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-medium-22",
    title_en: "A Rainy Afternoon",
    title_he: "אחר צהריים גשום",
    level: "medium",
    icon: "🌧️",
    topic_he: "מזג אוויר",
    text: `Yesterday it rained all afternoon.
I could not go outside to play, so I stayed home.
First, I finished my homework. Then I didn't know what to do.
My mum suggested we bake chocolate cookies together.
We mixed flour, sugar, eggs, butter, and chocolate chips.
The smell of the cookies baking in the oven was amazing.
While they cooled, I read a comic book.
Then my dad came home and we played a board game together.
When the cookies were ready, we had them with hot chocolate.
It was a cosy and happy afternoon.
Sometimes rainy days can be really nice!`,
    questions: [
      {
        id: "r-medium-22-q1",
        question_he: "למה הילד נשאר בבית?",
        options_he: ["כי היה חולה", "כי ירד גשם", "כי לא היה לו מה לעשות", "כי חיכה לחבר"],
        correctIndex: 1,
      },
      {
        id: "r-medium-22-q2",
        question_he: "מה האמא הציעה לעשות?",
        options_he: ["לצפות בסרט", "לשחק משחק קופסה", "לאפות עוגיות שוקולד", "לצייר"],
        correctIndex: 2,
      },
      {
        id: "r-medium-22-q3",
        question_he: "מה עשו בזמן שהעוגיות התקררו?",
        options_he: ["שיחקו קלפים", "שרו שירים", "הכינו שיעורי בית", "קראו ושיחקו משחק קופסה"],
        correctIndex: 3,
      },
      {
        id: "r-medium-22-q4",
        question_he: "עם מה אכלו את העוגיות?",
        options_he: ["מיץ תפוזים", "חלב קר", "שוקו חם", "תה עם לימון"],
        correctIndex: 2,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  HARD — BATCH 2  (r-hard-9 … r-hard-16)
  // ══════════════════════════════════════════════════════════════
  {
    id: "r-hard-9",
    title_en: "Climate Change",
    title_he: "שינוי אקלים",
    level: "hard",
    icon: "🌍",
    topic_he: "סביבה",
    text: `Climate change is one of the most important challenges facing our planet today.
The Earth's average temperature has been rising because of greenhouse gases, mainly carbon dioxide, that are released when we burn fossil fuels such as coal, oil, and natural gas.
These gases trap heat in the atmosphere, causing what scientists call the greenhouse effect.
As a result, we are seeing more extreme weather events: powerful hurricanes, devastating floods, severe droughts, and record heatwaves.
The polar ice caps are melting, which causes sea levels to rise and threatens coastal cities around the world.
Many animal and plant species are also at risk, as their natural habitats are changing faster than they can adapt.
However, there is reason for hope. Countries around the world are investing in renewable energy sources like solar and wind power.
Individuals can also help by reducing energy use, choosing public transport, eating less meat, and planting trees.
Scientists agree that urgent action is necessary if we want to prevent the worst effects of climate change.
Every person, every choice, and every action matters in this global challenge.`,
    questions: [
      {
        id: "r-hard-9-q1",
        question_he: "מה הגורם העיקרי לשינוי האקלים?",
        options_he: ["כריתת יערות", "גזי חממה כמו פחמן דו-חמצני מדלקים מאובנים", "זיהום מים מתעשייה", "שינויים טבעיים במסלול כדור הארץ"],
        correctIndex: 1,
      },
      {
        id: "r-hard-9-q2",
        question_he: "מה קורה כשקרחונים נמסים?",
        options_he: ["הטמפרטורה יורדת", "הים נעשה מלוח יותר", "מפלס הים עולה", "העננים הופכים קטנים יותר"],
        correctIndex: 2,
      },
      {
        id: "r-hard-9-q3",
        question_he: "אילו מקורות אנרגיה מוזכרים כפתרון?",
        options_he: ["גרעיני ומימני", "סולארי ורוח", "פחמי וגרעיני", "נפטי וגז"],
        correctIndex: 1,
      },
      {
        id: "r-hard-9-q4",
        question_he: "מה יכול כל אדם לעשות?",
        options_he: ["לנסות להמציא טכנולוגיות חדשות", "לתרום כסף למדענים", "לחסוך בחשמל, להשתמש בתחבורה ציבורית ולנטוע עצים", "להחרים חברות מזהמות"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "r-hard-10",
    title_en: "Social Media and Young People",
    title_he: "מדיה חברתית וצעירים",
    level: "hard",
    icon: "📱",
    topic_he: "טכנולוגיה",
    text: `Social media platforms have transformed the way young people communicate, learn, and spend their time.
Applications such as Instagram, TikTok, and YouTube allow users to share photos, videos, and ideas with millions of people instantly.
For many teenagers, social media is a tool for staying connected with friends, discovering new interests, and even building a career.
However, researchers have raised concerns about its effects on mental health.
Studies show that spending too much time on social media can lead to feelings of loneliness, anxiety, and low self-esteem, especially when young people compare themselves to the idealised images they see online.
Cyberbullying is another serious problem, as online harassment can be just as damaging as face-to-face bullying, if not more so.
On the positive side, social media can be a powerful platform for raising awareness about social issues, organising community events, and giving a voice to young activists.
Many young people have used platforms like Twitter to create movements for change.
Experts recommend setting daily time limits for social media use and being mindful of the content you consume and share.
Balance, critical thinking, and digital literacy are essential skills for navigating the online world safely and responsibly.`,
    questions: [
      {
        id: "r-hard-10-q1",
        question_he: "מה היתרון העיקרי של מדיה חברתית לצעירים?",
        options_he: ["לשחק משחקים מול שחקנים אחרים", "לשמור על קשר, לגלות תחומי עניין ולבנות קריירה", "ללמוד שפות זרות", "לצפות בסרטים בחינם"],
        correctIndex: 1,
      },
      {
        id: "r-hard-10-q2",
        question_he: "מה הסיכון הנפשי של שימוש יתר במדיה חברתית?",
        options_he: ["הסחת דעת מלימודים", "כאבי גב וראש", "בדידות, חרדה ודימוי עצמי נמוך", "התמכרות למשחקים"],
        correctIndex: 2,
      },
      {
        id: "r-hard-10-q3",
        question_he: "כיצד מדיה חברתית יכולה להיות כלי חיובי?",
        options_he: ["להעלות מודעות לנושאים חברתיים וליצור תנועות שינוי", "לעזור בעשיית שיעורי בית", "להחליף פגישות פנים מול פנים", "להרוויח כסף דרך פרסומות"],
        correctIndex: 0,
      },
      {
        id: "r-hard-10-q4",
        question_he: "מה המומחים ממליצים?",
        options_he: ["להפסיק לחלוטין להשתמש במדיה חברתית", "להגביל זמן שימוש יומי ולחשוב ביקורתית על תכנים", "להשתמש רק בפלטפורמות מאובטחות", "לא לחשוף מידע אישי בכלל"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-hard-11",
    title_en: "Space Exploration",
    title_he: "חקר החלל",
    level: "hard",
    icon: "🚀",
    topic_he: "מדע",
    text: `Since Yuri Gagarin became the first human to travel to space in 1961, humanity has made remarkable progress in space exploration.
The Apollo 11 mission in 1969 achieved the historic milestone of landing humans on the Moon for the first time.
Neil Armstrong's famous words — "That's one small step for man, one giant leap for mankind" — are remembered across the world.
Today, organisations like NASA, the European Space Agency, and private companies such as SpaceX are pushing the boundaries further than ever before.
Unmanned probes have visited every planet in our solar system, and the Hubble Space Telescope has captured breathtaking images of galaxies billions of light-years away.
The International Space Station has been continuously inhabited since the year 2000, serving as a laboratory for experiments in microgravity.
Scientists are currently working on plans for a crewed mission to Mars, which would represent the next giant leap in human exploration.
However, space travel presents enormous challenges: the physical effects of microgravity on the human body, radiation exposure, and the immense distances involved.
Despite these obstacles, the quest to understand our universe and perhaps discover life on other planets continues to inspire scientists, engineers, and dreamers worldwide.
Space exploration is not just about science — it is about the enduring human desire to explore the unknown.`,
    questions: [
      {
        id: "r-hard-11-q1",
        question_he: "מי היה האדם הראשון שנסע לחלל?",
        options_he: ["ניל ארמסטרונג", "ברז אולדרין", "יורי גגארין", "ג'ון גלן"],
        correctIndex: 2,
      },
      {
        id: "r-hard-11-q2",
        question_he: "מה קרה בשנת 1969?",
        options_he: ["השקת לוויין ראשון", "נחיתה על הירח", "בניית תחנת החלל הבינ'ל", "נסיעה ראשונה לחלל"],
        correctIndex: 1,
      },
      {
        id: "r-hard-11-q3",
        question_he: "מה היתרון של תחנת החלל הבינ'ל?",
        options_he: ["משמשת כמאגר חמצן לאסטרונאוטים", "מאפשרת ניסויים בחוסר כבידה", "מגינה מפני אסטרואידים", "משדרת תמונות לכדור הארץ"],
        correctIndex: 1,
      },
      {
        id: "r-hard-11-q4",
        question_he: "מהי המשימה הגדולה הבאה בחקר החלל?",
        options_he: ["לנחות על הירח שוב", "לשלוח בני אדם למאדים", "לבנות בסיס על כוכב לכת", "לחקור כוכבי שביט"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-hard-12",
    title_en: "Healthy Living",
    title_he: "חיים בריאים",
    level: "hard",
    icon: "🥗",
    topic_he: "בריאות",
    text: `Living a healthy lifestyle is one of the most important investments you can make in your future.
Health is determined by a combination of factors: the food we eat, how much physical activity we do, the quality of our sleep, our stress levels, and our social connections.
A balanced diet includes plenty of fruits and vegetables, whole grains, lean proteins, and healthy fats, while limiting processed foods, sugar, and excessive salt.
Regular exercise strengthens the heart, improves mood, boosts the immune system, and helps maintain a healthy weight.
Health experts recommend at least sixty minutes of moderate physical activity per day for children and teenagers.
Sleep is often underestimated, but it plays a vital role in brain development, emotional regulation, and overall health.
Young people need between eight and ten hours of sleep every night.
Mental health is equally important. Taking time to relax, pursue hobbies, connect with friends and family, and seek help when you feel overwhelmed are all part of a healthy life.
The choices you make during childhood and adolescence set the foundation for your health in adulthood.
It is never too early — or too late — to make healthier choices.`,
    questions: [
      {
        id: "r-hard-12-q1",
        question_he: "מה כולל תזונה מאוזנת?",
        options_he: ["המון חלבון ושומן", "פירות, ירקות, דגנים מלאים, חלבון רזה ושומן בריא", "מינימום פחמימות ומקסימום חלבון", "אוכל טבעי בלבד ללא מזון מעובד"],
        correctIndex: 1,
      },
      {
        id: "r-hard-12-q2",
        question_he: "כמה שעות שינה צריכים ילדים ומתבגרים?",
        options_he: ["שש עד שמונה", "שבע עד תשע", "שמונה עד עשר", "עשר עד שתים עשרה"],
        correctIndex: 2,
      },
      {
        id: "r-hard-12-q3",
        question_he: "כמה פעילות גופנית מומלצת ליום לילדים?",
        options_he: ["30 דקות", "45 דקות", "60 דקות", "90 דקות"],
        correctIndex: 2,
      },
      {
        id: "r-hard-12-q4",
        question_he: "מה אומר הטקסט על בריאות הנפש?",
        options_he: ["היא פחות חשובה מבריאות הגוף", "היא חשובה באותה מידה כמו הבריאות הפיזית", "היא קשורה רק לגנטיקה", "אפשר להתעלם ממנה בגיל ילדות"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-hard-13",
    title_en: "Volunteering",
    title_he: "התנדבות",
    level: "hard",
    icon: "🤝",
    topic_he: "חברה",
    text: `Volunteering is the act of giving your time, skills, or energy to help others without expecting payment in return.
Around the world, millions of people volunteer in hospitals, schools, animal shelters, food banks, environmental organisations, and community centres.
Research consistently shows that volunteering benefits not only the community but also the volunteers themselves.
People who volunteer regularly report higher levels of happiness, a greater sense of purpose, stronger social connections, and even better physical health.
Young volunteers, in particular, develop important life skills such as communication, teamwork, problem-solving, and empathy.
These skills are highly valued by universities and employers.
In Israel, many young people volunteer through organisations like Magen David Adom, youth movements, and community projects.
Some schools even require students to complete a certain number of volunteer hours each year as part of their education.
Critics argue that mandatory volunteering removes the genuine spirit of giving, while supporters say it introduces young people to the habit and value of service.
Regardless of your motivation, stepping outside your own concerns to help someone else is a powerful experience that can change both the giver and the receiver.`,
    questions: [
      {
        id: "r-hard-13-q1",
        question_he: "מה הגדרת התנדבות בטקסט?",
        options_he: ["עבודה בשכר נמוך", "נתינת זמן ומיומנויות לאחרים ללא תשלום", "עבודה לבית ספר כחובה", "עזרה לאנשים מוכרים"],
        correctIndex: 1,
      },
      {
        id: "r-hard-13-q2",
        question_he: "מה היתרונות שמתנדבים מדווחים עליהם?",
        options_he: ["שכר גבוה ויוקרה חברתית", "אושר, מטרה, קשרים חברתיים ובריאות טובה יותר", "הצלחה לימודית", "כישורים טכניים ומקצועיים"],
        correctIndex: 1,
      },
      {
        id: "r-hard-13-q3",
        question_he: "מה הויכוח על התנדבות חובה?",
        options_he: ["אם היא יעילה לחברה", "אם היא פוגעת ברוח הנתינה האמיתית לעומת הכנסת ילדים לשירות", "אם כדאי לשלם לצעירים שמתנדבים", "אם בתי ספר צריכים להנחות מה לעשות"],
        correctIndex: 1,
      },
      {
        id: "r-hard-13-q4",
        question_he: "מה המסר הכללי של הטקסט?",
        options_he: ["כולם חייבים להתנדב", "ההתנדבות היא חוויה חזקה שמשפיעה על הנותן והמקבל", "ילדים לא מתאימים להתנדבות", "התנדבות מחייבת הכשרה מיוחדת"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-hard-14",
    title_en: "Music and Emotions",
    title_he: "מוזיקה ורגשות",
    level: "hard",
    icon: "🎵",
    topic_he: "מוזיקה",
    text: `Music is a universal language that transcends cultural and linguistic boundaries.
From the earliest human civilisations, music has been used in rituals, celebrations, mourning ceremonies, and everyday life.
Scientists have found fascinating evidence of music's profound effect on the human brain and emotions.
Listening to music activates the brain's reward centre, releasing dopamine — the same chemical associated with pleasure and motivation.
This explains why your favourite song can instantly improve your mood or bring tears to your eyes.
Research also shows that music can reduce stress, lower blood pressure, ease pain, and even improve sleep quality.
In therapeutic settings, music therapy is used to help patients with depression, anxiety, autism, and various neurological conditions.
The tempo and key of music strongly influence how we feel: fast, major-key music tends to energise and uplift us, while slow, minor-key music often evokes sadness or reflection.
Playing a musical instrument has additional benefits — it develops discipline, patience, fine motor skills, and mathematical thinking.
Music education in schools has been shown to improve academic performance across subjects.
Whether you are a performer or simply a listener, music enriches the human experience in ways that few other art forms can match.`,
    questions: [
      {
        id: "r-hard-14-q1",
        question_he: "מה הוא הדופמין ומה תפקידו?",
        options_he: ["הורמון שגורם לכאב", "כימיקל הקשור להנאה ומוטיבציה", "חומר שמופרש בעת פחד", "נוירוטרנסמיטר הגורם לשינה"],
        correctIndex: 1,
      },
      {
        id: "r-hard-14-q2",
        question_he: "כיצד משפיע קצב ומפתח המוזיקה על הרגשות?",
        options_he: ["מהיר ומינורי = עצבות; איטי ומז'ורי = שמחה", "מהיר ומז'ורי = אנרגיה; איטי ומינורי = עצבות", "אין קשר בין קצב ורגשות", "תלוי רק בטקסט של השיר"],
        correctIndex: 1,
      },
      {
        id: "r-hard-14-q3",
        question_he: "אילו מצבים רפואיים מוזכרים שמוזיקה עוזרת להם?",
        options_he: ["שברים ופציעות פיזיות", "דיכאון, חרדה, אוטיזם ומצבים נוירולוגיים", "מחלות זיהומיות", "בעיות לב ודם"],
        correctIndex: 1,
      },
      {
        id: "r-hard-14-q4",
        question_he: "מה היתרונות של נגינה בכלי נגינה?",
        options_he: ["שיפור שמיעה ותחושת קצב", "משמעת, סבלנות, מיומנות מוטורית וחשיבה מתמטית", "פיתוח זיכרון בלבד", "שיפור שפות ותקשורת"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-hard-15",
    title_en: "The Ocean's Importance",
    title_he: "חשיבות האוקיינוס",
    level: "hard",
    icon: "🌊",
    topic_he: "טבע",
    text: `The ocean covers more than 70 percent of our planet's surface and is home to an astonishing diversity of life.
From microscopic plankton to the blue whale — the largest animal on Earth — the ocean supports millions of species.
Yet, it is far more than a habitat for marine life. The ocean is essential for all life on Earth, including humans.
It produces over half of the world's oxygen, largely through the photosynthesis of microscopic marine plants called phytoplankton.
The ocean also absorbs about 30 percent of the carbon dioxide that humans release into the atmosphere, helping to regulate the climate.
Ocean currents act as a global conveyor belt, distributing heat around the planet and influencing weather patterns on every continent.
For billions of people, particularly in coastal and island communities, the ocean is the primary source of food and livelihood.
The fishing and seafood industry employs hundreds of millions of people worldwide.
However, the ocean faces severe threats: overfishing, plastic pollution, ocean acidification caused by carbon dioxide, and rising water temperatures due to climate change.
Scientists warn that if current trends continue, many marine ecosystems could collapse within our lifetime.
Protecting the ocean means protecting ourselves. Sustainable fishing practices, reducing plastic waste, and cutting carbon emissions are all steps we can take to preserve the ocean for future generations.`,
    questions: [
      {
        id: "r-hard-15-q1",
        question_he: "כמה אחוזים מהחמצן בעולם מגיעים מהאוקיינוס?",
        options_he: ["פחות מ-20%", "כ-30%", "יותר מ-50%", "כ-70%"],
        correctIndex: 2,
      },
      {
        id: "r-hard-15-q2",
        question_he: "מה תפקיד הפיטופלנקטון?",
        options_he: ["הם מזון לדגים בלבד", "הם מייצרים חמצן דרך פוטוסינתזה", "הם מסננים את מי הים", "הם עוזרים לזרמי הים"],
        correctIndex: 1,
      },
      {
        id: "r-hard-15-q3",
        question_he: "מהם האיומים המוזכרים על האוקיינוס?",
        options_he: ["דייג יתר, זיהום פלסטיק, חמצת האוקיינוס וחימום הים", "שמן, כימיקלים ורעש", "עוגנים וספינות", "ציד לוויתנים ואסונות טבע"],
        correctIndex: 0,
      },
      {
        id: "r-hard-15-q4",
        question_he: "מה הפתרונות שמוזכרים?",
        options_he: ["בנייה של שוניות מלאכותיות", "דייג בר-קיימא, הפחתת פלסטיק וקיצוץ פליטות פחמן", "הגבלת השייט באוקיינוסים", "איסור על דיג מסחרי"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "r-hard-16",
    title_en: "Future Technologies",
    title_he: "טכנולוגיות העתיד",
    level: "hard",
    icon: "🤖",
    topic_he: "טכנולוגיה",
    text: `We live in an era of unprecedented technological change.
Innovations that were once confined to science fiction are rapidly becoming reality, reshaping every aspect of human life.
Artificial intelligence — the ability of computers to learn, reason, and make decisions — is perhaps the most transformative technology of our time.
AI is already being used in healthcare to diagnose diseases, in transportation to develop self-driving cars, in education to personalise learning, and in countless other fields.
Biotechnology is another frontier with enormous potential. Scientists are developing gene-editing tools like CRISPR, which can modify the DNA of living organisms and may eventually cure genetic diseases.
Renewable energy technologies, including advanced solar panels, wind turbines, and next-generation batteries, are making clean energy cheaper and more accessible.
Quantum computing, which harnesses the strange properties of subatomic particles, promises to solve problems that would take conventional computers millions of years.
Virtual and augmented reality are transforming how we experience entertainment, education, and remote collaboration.
However, these technologies also raise profound ethical questions: Who owns the data that AI systems learn from? What happens to workers whose jobs are automated away? How do we ensure that powerful technologies are used for good rather than harm?
The generation growing up today will face the challenge of steering these technologies wisely, for the benefit of all humanity — not just the privileged few.
The future is not predetermined. It will be shaped by the choices we make now.`,
    questions: [
      {
        id: "r-hard-16-q1",
        question_he: "מהי בינה מלאכותית לפי הטקסט?",
        options_he: ["רובוטים שמחליפים עובדים", "יכולת של מחשבים ללמוד, לחשוב ולקבל החלטות", "מחשב-על לחישובים מדעיים", "מערכת תקשורת בין מחשבים"],
        correctIndex: 1,
      },
      {
        id: "r-hard-16-q2",
        question_he: "מה CRISPR?",
        options_he: ["שפת תכנות חדשה", "כלי עריכת גנים לשינוי DNA", "מחשב קוונטי", "פרוטוקול אבטחת סייבר"],
        correctIndex: 1,
      },
      {
        id: "r-hard-16-q3",
        question_he: "מה מחשוב קוונטי מסוגל לעשות?",
        options_he: ["לייצר אנרגיה ממולקולות", "לפתור בעיות שמחשבים רגילים יזדקקו לכך מיליוני שנים", "לתקשר עם לוויינים", "לדמות מוחות אנושיים"],
        correctIndex: 1,
      },
      {
        id: "r-hard-16-q4",
        question_he: "מהם הדילמות האתיות שמוזכרות?",
        options_he: ["האם לפתח טכנולוגיה בכלל", "בעלות על נתונים, אוטומציה של עבודה, ושימוש לטובה או לרעה", "האם לאפשר AI בבתי ספר", "כיצד לאבטח מחשבים מוצ'ני מידע"],
        correctIndex: 1,
      },
    ],
  },
];

export function getPassagesByLevel(level: ReadingPassage["level"]): ReadingPassage[] {
  return READING_PASSAGES.filter((p) => p.level === level);
}

export function getPassageById(id: string): ReadingPassage | undefined {
  return READING_PASSAGES.find((p) => p.id === id);
}

export const LEVEL_CONFIG = {
  easy: {
    label_he: "קל",
    icon: "🟢",
    color: "from-green-400 to-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    description_he: "משפטים קצרים, מילים פשוטות",
  },
  medium: {
    label_he: "בינוני",
    icon: "🟡",
    color: "from-yellow-400 to-orange-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    description_he: "טקסטים קצת יותר ארוכים",
  },
  hard: {
    label_he: "מאתגר",
    icon: "🔴",
    color: "from-red-400 to-rose-600",
    bg: "bg-red-50",
    border: "border-red-200",
    description_he: "טקסטים ארוכים, אוצר מילים עשיר",
  },
} as const;
