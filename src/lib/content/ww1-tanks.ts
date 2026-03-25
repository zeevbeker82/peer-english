// WWI Tanks Quiz Content
// Images sourced from Wikimedia Commons (verified URLs via MD5 hash calculation)
// All images are in the public domain or under free licenses

export type WWITankCountry = "UK" | "France" | "Germany" | "USA" | "Italy" | "Russia";
export type WWITankCategory = "heavy" | "medium" | "light" | "tank_destroyer";

export interface WWITank {
  id: string;                    // e.g. "mark-iv"
  name: string;                  // English name e.g. "Mark IV"
  altNames?: string[];
  country: WWITankCountry;
  countryHebrew: string;
  countryFlag: string;           // emoji flag
  yearIntroduced: number;
  category: WWITankCategory;
  categoryHebrew: string;        // "כבד" / "בינוני" / "קל" / "משחית טנקים"
  imageUrl: string;              // real Wikipedia Commons direct image URL
  imageCredit: string;           // short attribution
  funFactHebrew: string;         // 1-2 sentences in Hebrew for kids
  weightTons?: number;
  crewSize?: number;
}

export const WWI_TANKS_XP = {
  correct: 15,
  streak3: 10,    // bonus for 3 in a row
  streak5: 20,    // bonus for 5 in a row
  allTanks: 100,  // bonus for completing all tanks
} as const;

export const WWI_TANKS: WWITank[] = [
  // ===== UK =====
  {
    id: "mark-i",
    name: "Mark I",
    altNames: ["Tank Mark I", "Mother"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1916,
    category: "heavy",
    categoryHebrew: "כבד",
    // Iconic wartime photo at the Battle of the Somme, 25 September 1916, Lt. Ernest Brooks
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/British_Mark_I_male_tank_Somme_25_September_1916.jpg",
    imageCredit: "Lt. Ernest Brooks / Imperial War Museum, Public Domain",
    funFactHebrew:
      "הטנק הראשון בהיסטוריה נכנס לקרב ב-15 בספטמבר 1916 בקרב הסום. החיילים הגרמניים ברחו מפחד כשראו אותו לראשונה — הם מעולם לא ראו דבר כזה!",
    weightTons: 28,
    crewSize: 8,
  },
  {
    id: "mark-ii",
    name: "Mark II",
    altNames: ["Tank Mark II"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1917,
    category: "heavy",
    categoryHebrew: "כבד",
    // Battle of Arras, April-May 1917 — IWM photo Q6301
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/The_Battle_of_Arras%2C_April-May_1917_Q6301.jpg",
    imageCredit: "Imperial War Museum Q6301, Public Domain",
    funFactHebrew:
      "הטנק מארק 2 היה בעיקר טנק לאימונים — בריטניה השתמשה בו ללמד טנקיסטים איך לנהוג. הוא נכנס גם לקרב אחד חשוב בעיר אראס בצרפת ב-1917.",
    weightTons: 28,
    crewSize: 8,
  },
  {
    id: "mark-iv",
    name: "Mark IV",
    altNames: ["Tank Mark IV", "Mark IV Male", "Mark IV Female"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1917,
    category: "heavy",
    categoryHebrew: "כבד",
    // WWI British Mark IV tank — Flickr/CC photo
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/63/WWI_British_Mark_IV_tank_%2826574762791%29.jpg",
    imageCredit: "Wikimedia Commons, CC BY 2.0",
    funFactHebrew:
      "הטנק מארק 4 היה הטנק הבריטי שיוצר הכי הרבה בכל מלחמת העולם הראשונה — יותר מ-1,200 נבנו! הוא היה בשני סוגים: 'זכר' עם תותח גדול, ו'נקבה' עם רק מקלעים.",
    weightTons: 28,
    crewSize: 8,
  },
  {
    id: "mark-v",
    name: "Mark V",
    altNames: ["Tank Mark V"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1918,
    category: "heavy",
    categoryHebrew: "כבד",
    // The Hundred Days Offensive, Q9372 — IWM wartime photo
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d8/The_Hundred_Days_Offensive%2C_August-november_1918_Q9372.jpg",
    imageCredit: "Imperial War Museum Q9372, Public Domain",
    funFactHebrew:
      "הטנק מארק 5 היה שיפור גדול — לראשונה אדם אחד יכול לנהוג בו לבד! בטנקים הקודמים היו צריכים ארבעה אנשים רק כדי לנהוג. הוא השתתף בקרב אמייאן ב-1918.",
    weightTons: 29,
    crewSize: 8,
  },
  {
    id: "mark-a-whippet",
    name: "Mark A Whippet",
    altNames: ["Medium Mark A", "Whippet"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1918,
    category: "medium",
    categoryHebrew: "בינוני",
    // Museum exhibit photo — Whippet.JPG on Commons
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/FastWhippet.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "הוויפט היה הטנק המהיר של הבריטים — הוא יכול לנסוע 13 קמ\"ש, כמעט פי שלושה ממהירות הטנקים הכבדים! השם 'ויפט' הוא סוג של כלב מרוץ מהיר.",
    weightTons: 14,
    crewSize: 3,
  },
  {
    id: "mark-ix",
    name: "Mark IX",
    altNames: ["Tank Mark IX", "Supply Tank"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1918,
    category: "heavy",
    categoryHebrew: "כבד",
    // British Mark IX APC at Bovington Tank Museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/British_Mark_IX_Armoured_Personnel_Carrier.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "הטנק מארק 9 היה מיוחד מאוד — הוא לא נועד לירות, אלא להוביל חיילים! זה היה נשק הנשא המשוריין הראשון בהיסטוריה. הוא יכול היה להוביל 30 חיילים בצורה מוגנת.",
    weightTons: 27,
    crewSize: 4,
  },
  {
    id: "gun-carrier-mark-i",
    name: "Gun Carrier Mark I",
    altNames: ["Gun Carrier Mk.I", "Carrier Mark I"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1917,
    category: "heavy",
    categoryHebrew: "כבד",
    // British Gun Carrier Mark I with 60-pounder
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/British_Gun_Carrier_Mark_I_-_60_pdr.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "גם זה לא היה טנק קרבי — הוא נבנה כדי לסחוב תותחים כבדים קדימה אחרי ניצחון. זה היה כלי הארטילריה הממונע הראשון בהיסטוריה! בסוף השתמשו בו בעיקר לאספקה.",
    weightTons: 27,
    crewSize: 6,
  },

  // ===== FRANCE =====
  {
    id: "schneider-ca1",
    name: "Schneider CA1",
    altNames: ["Char Schneider", "CA1"],
    country: "France",
    countryHebrew: "צרפת",
    countryFlag: "🇫🇷",
    yearIntroduced: 1916,
    category: "heavy",
    categoryHebrew: "כבד",
    // ECPAD wartime photo, January 1918
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/Char_Schneider_03996_ECPAD_janvier_1918.JPG",
    imageCredit: "ECPAD, Public Domain",
    funFactHebrew:
      "הטנק שניידר CA1 היה הטנק הראשון של צרפת! הוא נכנס לקרב לראשונה באפריל 1917 במהלך מתקפה גדולה. הצרפתים בנו 400 מהם — אבל הטנק לא היה מוצלח מאוד כי היה קשה לנוע בשדה הקרב.",
    weightTons: 13.5,
    crewSize: 6,
  },
  {
    id: "saint-chamond",
    name: "Saint-Chamond",
    altNames: ["Char Saint-Chamond", "Char St. Chamond"],
    country: "France",
    countryHebrew: "צרפת",
    countryFlag: "🇫🇷",
    yearIntroduced: 1917,
    category: "heavy",
    categoryHebrew: "כבד",
    // St. Chamond museum/wartime photo
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/St._Chamond.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "הסן-שאמון היה הטנק הכי ארוך בצרפת — 8.8 מטר! הבעיה הגדולה שלו הייתה שהמסילות שלו היו קצרות מדי ביחס לאורכו, וזה גרם לו להיתקע בקלות בשוחות ובבוץ.",
    weightTons: 23,
    crewSize: 9,
  },
  {
    id: "renault-ft",
    name: "Renault FT",
    altNames: ["FT-17", "Renault FT-17", "FT"],
    country: "France",
    countryHebrew: "צרפת",
    countryFlag: "🇫🇷",
    yearIntroduced: 1917,
    category: "light",
    categoryHebrew: "קל",
    // Renault FT-17 at the National WWI Museum, Kansas City
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/Renault_FT-17_tank_-_National_World_War_I_Museum_-_Kansas_City%2C_MO_-_DSC07680.JPG",
    imageCredit: "Daderot / Wikimedia Commons, CC0 (Public Domain)",
    funFactHebrew:
      "הרנו FT שינה את עולם הטנקים לנצח — הוא היה הראשון עם מגדל מסתובב בחלק העליון. כמעט כל הטנקים המודרניים היום בנויים על הרעיון שלו! יותר מ-3,700 יוצרו.",
    weightTons: 6.7,
    crewSize: 2,
  },
  {
    id: "char-2c",
    name: "Char 2C",
    altNames: ["FCM 2C", "FCM Char 2C"],
    country: "France",
    countryHebrew: "צרפת",
    countryFlag: "🇫🇷",
    yearIntroduced: 1921,
    category: "heavy",
    categoryHebrew: "כבד",
    // "Berry" Char 2C photographed in 1928, high resolution
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Berry_in_1928_%28moar_contrast_%2B_cropped%29.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "הצ'אר 2C היה הטנק הגדול ביותר שאי פעם נבנה והופעל! הוא אורך 10 מטר ושוקל 69 טון. הוא הוזמן בזמן מלחמת העולם הראשונה, אבל נמסר רק אחרי המלחמה — ורק 10 נבנו.",
    weightTons: 69,
    crewSize: 12,
  },

  // ===== GERMANY =====
  {
    id: "a7v",
    name: "A7V",
    altNames: ["Sturmpanzerwagen A7V", "Sturmpanzer"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1918,
    category: "heavy",
    categoryHebrew: "כבד",
    // Wartime photo of A7V "Elfriede" at Villers-Bretonneux, April 1918
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/A7V_Tank_Villers-Bretonneux_1918.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "גרמניה בנתה רק 20 טנקים A7V בכל המלחמה! הם נקראו 'שטורמפנצרווגן' — רכב שריון לסערה. הטנק ה-A7V 'מפיסטו' הוא הטנק הגרמני היחיד מהמלחמה ששרד — הוא נמצא במוזיאון באוסטרליה!",
    weightTons: 33,
    crewSize: 18,
  },

  // ===== USA =====
  {
    id: "m1917",
    name: "M1917",
    altNames: ["Six-Ton Tank M1917", "M1917 Six-Ton"],
    country: "USA",
    countryHebrew: "ארצות הברית",
    countryFlag: "🇺🇸",
    yearIntroduced: 1918,
    category: "light",
    categoryHebrew: "קל",
    // M1917 at the National Infantry Museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/M1917_light_tank_with_37mm_cannon_at_the_National_Infantry_Museum.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "הטנק M1917 היה העתק אמריקאי של הרנו FT הצרפתי — הוא היה הטנק הראשון שיוצר בסדרה בארצות הברית. הוזמנו 4,440 מהם, אבל המלחמה הסתיימה לפני שהגיעו לאירופה!",
    weightTons: 6.5,
    crewSize: 2,
  },
  {
    id: "mark-viii-liberty",
    name: "Mark VIII Liberty",
    altNames: ["Mark VIII", "Liberty Tank", "International Tank"],
    country: "USA",
    countryHebrew: "ארצות הברית",
    countryFlag: "🇺🇸",
    yearIntroduced: 1918,
    category: "heavy",
    categoryHebrew: "כבד",
    // Allied/American Mark VIII Liberty Tank
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5b/Allied_Mark_VIII_%28Liberty%29_Tank.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "הטנק מארק 8 ליברטי היה פרויקט משותף של בריטניה וארצות הברית — שתי מדינות תכננו אותו יחד! הוא נקרא 'הטנק הבין-לאומי'. אמריקה בנתה 100 מהם, אבל המלחמה הסתיימה לפני שנכנסו לקרב.",
    weightTons: 37,
    crewSize: 12,
  },

  // ===== ITALY =====
  {
    id: "fiat-2000",
    name: "FIAT 2000",
    altNames: ["Fiat 2000"],
    country: "Italy",
    countryHebrew: "איטליה",
    countryFlag: "🇮🇹",
    yearIntroduced: 1917,
    category: "heavy",
    categoryHebrew: "כבד",
    // FIAT 2000 wartime/archive colorized photo
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/FIAT_2000_bt_RoColor.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "הפיאט 2000 היה הטנק הראשון של איטליה — ובנו רק שניים! הוא שקל 40 טון וזה היה הטנק הכבד ביותר של מלחמת העולם הראשונה. הוא היה כמו מבצר נע עם תותח ושבעה מקלעים!",
    weightTons: 40,
    crewSize: 10,
  },

  // ===== RUSSIA =====
  {
    id: "tsar-tank",
    name: "Tsar Tank",
    altNames: ["Lebedenko Tank", "Netopyr", "Bat Tank", "Царь-танк"],
    country: "Russia",
    countryHebrew: "רוסיה",
    countryFlag: "🇷🇺",
    yearIntroduced: 1915,
    category: "heavy",
    categoryHebrew: "כבד",
    // The only surviving photograph of the Tsar Tank, field tests 1915
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tsar_tank.jpg",
    imageCredit: "Russian Imperial Archives, Public Domain",
    funFactHebrew:
      "הטנק הצאר היה המוזר ביותר בהיסטוריה — במקום מסילות, היו לו שתי גלגלות ענק בגובה 9 מטר! הצאר ניקולאי ה-2 ראה דגם שלו ואהב אותו. אבל בניסוי הראשון הוא נתקע בבוץ ולא יצא משם עד 1923!",
    weightTons: 60,
    crewSize: 15,
  },
];

// ===== LABELS =====

export const WWI_COUNTRY_LABELS_HEBREW: Record<WWITankCountry, string> = {
  UK: "בריטניה",
  France: "צרפת",
  Germany: "גרמניה",
  USA: "ארצות הברית",
  Italy: "איטליה",
  Russia: "רוסיה",
};

export const WWI_CATEGORY_LABELS_HEBREW: Record<WWITankCategory, string> = {
  heavy: "כבד",
  medium: "בינוני",
  light: "קל",
  tank_destroyer: "משחית טנקים",
};

// ===== HELPER FUNCTIONS =====

export function getWWITanksByCountry(country: WWITankCountry): WWITank[] {
  return WWI_TANKS.filter((t) => t.country === country);
}

export function getWWITanksByCategory(category: WWITankCategory): WWITank[] {
  return WWI_TANKS.filter((t) => t.category === category);
}

export function getWWIRandomWrongAnswers(
  correctTank: WWITank,
  field: "name" | "country" | "category",
  count: number
): string[] {
  const allValues = Array.from(
    new Set(
      WWI_TANKS.filter((t) => t.id !== correctTank.id).map((t) => {
        if (field === "name") return t.name;
        if (field === "country") return WWI_COUNTRY_LABELS_HEBREW[t.country];
        return WWI_CATEGORY_LABELS_HEBREW[t.category];
      })
    )
  );

  // Shuffle and pick `count` wrong answers
  for (let i = allValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allValues[i], allValues[j]] = [allValues[j], allValues[i]];
  }

  return allValues.slice(0, count);
}
