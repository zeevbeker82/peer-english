// WW2 Tanks Quiz Content
// Images sourced from Wikimedia Commons (verified URLs, all return HTTP 200)

export type TankCountry = "Germany" | "USA" | "USSR" | "UK" | "Japan" | "Italy" | "France";
export type TankCategory = "heavy" | "medium" | "light" | "tank_destroyer" | "infantry";

export interface WW2Tank {
  id: string;
  name: string;
  altNames?: string[];
  country: TankCountry;
  countryHebrew: string;
  countryFlag: string;
  yearIntroduced: number;
  category: TankCategory;
  categoryHebrew: string;
  imageUrl: string;          // Direct image URL from upload.wikimedia.org
  imageCredit: string;       // Short attribution
  funFactHebrew: string;     // Fun fact for kids in Hebrew
  weightTons?: number;
  crewSize?: number;
}

export const WW2_TANKS_XP = {
  correct: 15,
  streak3: 10,    // bonus for 3 in a row
  streak5: 20,    // bonus for 5 in a row
  allTanks: 100,  // bonus for completing all tanks
} as const;

export const WW2_TANKS: WW2Tank[] = [
  // ===== GERMANY =====
  {
    id: "tiger-i",
    name: "Tiger I",
    altNames: ["Tiger", "PzKpfw VI", "Panzer VI"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1942,
    category: "heavy",
    categoryHebrew: "כבד",
    // Bundesarchiv wartime photo, Northern France 1944
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Bundesarchiv_Bild_101I-299-1805-16%2C_Nordfrankreich%2C_Panzer_VI_%28Tiger_I%29.2.jpg",
    imageCredit: "Bundesarchiv, Bild 101I-299-1805-16 / CC-BY-SA 3.0 DE",
    funFactHebrew:
      "הטנק הזה היה כל כך כבד (57 טון!) שגשרים רבים לא יכלו לשאת אותו. הגרמנים בנו רק 1,347 יחידות ממנו.",
    weightTons: 57,
    crewSize: 5,
  },
  {
    id: "tiger-ii",
    name: "Tiger II",
    altNames: ["King Tiger", "Königstiger", "PzKpfw VI Ausf. B"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1944,
    category: "heavy",
    categoryHebrew: "כבד",
    // Bundesarchiv wartime photo, France 1944
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/Bundesarchiv_Bild_101I-721-0398-21A%2C_Frankreich%2C_Panzer_VI_%28Tiger_II%2C_K%C3%B6nigstiger%29.jpg",
    imageCredit: "Bundesarchiv, Bild 101I-721-0398-21A / CC-BY-SA 3.0 DE",
    funFactHebrew:
      "ה\"נמר המלך\" היה הטנק הכבד ביותר בשימוש מבצעי במלחמת העולם השנייה – 69 טון! השריון שלו היה עב כל כך שכמעט לא ניתן היה לחדור אותו מהחזית.",
    weightTons: 69,
    crewSize: 5,
  },
  {
    id: "panther",
    name: "Panther",
    altNames: ["Panzer V", "PzKpfw V"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1943,
    category: "medium",
    categoryHebrew: "בינוני",
    // Bundesarchiv photo, Panzer V Panther
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Bundesarchiv_Bild_183-H26258%2C_Panzer_V_%22Panther%22.jpg",
    imageCredit: "Bundesarchiv, Bild 183-H26258 / CC-BY-SA 3.0 DE",
    funFactHebrew:
      "הפנתר תוכנן בתגובה לטנק הסובייטי T-34. הוא היה מהיר יחסית לגודלו ונחשב לאחד הטנקים הטובים ביותר במלחמה.",
    weightTons: 44.8,
    crewSize: 5,
  },
  {
    id: "panzer-iv",
    name: "Panzer IV",
    altNames: ["PzKpfw IV", "Panzerkampfwagen IV"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1939,
    category: "medium",
    categoryHebrew: "בינוני",
    // Bundesarchiv wartime photo, Russia – Panzer IV column with Tiger I, 1943
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Bundesarchiv_Bild_101I-571-1721-26%2C_Russland%2C_Panzer_IV%2C_Panzer_VI_%28Tiger_I%29.jpg",
    imageCredit: "Bundesarchiv, Bild 101I-571-1721-26 / Schnitzer / CC-BY-SA 3.0 DE",
    funFactHebrew:
      "הפנצר IV היה \"פרד העבודה\" של גרמניה במלחמה – יותר מ-8,000 יחידות יוצרו. הוא שרת בכל חזיתות המלחמה מאפריקה ועד רוסיה.",
    weightTons: 25,
    crewSize: 5,
  },
  {
    id: "panzer-iii",
    name: "Panzer III",
    altNames: ["PzKpfw III", "Panzerkampfwagen III"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1939,
    category: "medium",
    categoryHebrew: "בינוני",
    // Bundesarchiv wartime photo: StuG and Panzer III in Russian snow
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Bundesarchiv_Bild_183-84001-0011%2C_Russland%2C_Sturmgesch%C3%BCtz_und_Panzer_III_im_Schnee.jpg",
    imageCredit: "Bundesarchiv, Bild 183-84001-0011 / Lachmann / CC-BY-SA 3.0 DE",
    funFactHebrew:
      "הפנצר III היה הטנק הגרמני המרכזי בתחילת המלחמה. הוא לחם בצפון אפריקה, בצרפת ובחזית המזרחית בשלג ובחום.",
    weightTons: 22,
    crewSize: 5,
  },
  {
    id: "stug-iii",
    name: "StuG III",
    altNames: ["Sturmgeschütz III", "Assault Gun III"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1940,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // Bundesarchiv wartime parade photo, Russia – StuG III Großdeutschland Division
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b3/Bundesarchiv_Bild_101I-732-0110-23%2C_Parade_von_Sturmgesch%C3%BCtzen_d._Div._%C2%BBGro%C3%9Fdeutschland%C2%AB.jpg",
    imageCredit: "Bundesarchiv, Bild 101I-732-0110-23 / CC-BY-SA 3.0 DE",
    funFactHebrew:
      "ה-StuG III הוא הרכב המשוריין הגרמני שיוצר בכמות הגדולה ביותר – כמעט 10,000 יחידות! הוא היה זול וקל לייצור כי לא היה לו מגדל מסתובב.",
    weightTons: 23.9,
    crewSize: 4,
  },
  {
    id: "jagdpanzer-iv",
    name: "Jagdpanzer IV",
    altNames: ["Tank Hunter IV", "Guderian Duck"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1943,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // Bundesarchiv wartime photo, Italy – Jagdpanzer IV in a town
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Bundesarchiv_Bild_101I-479-2198-26A%2C_Italien%2C_Jagdpanzer_IV_in_Ortschaft.jpg",
    imageCredit: "Bundesarchiv, Bild 101I-479-2198-26A / Brünning / CC-BY-SA 3.0 DE",
    funFactHebrew:
      "ה\"ציד הטנקים\" הזה היה נמוך מאוד, מה שהקשה על האויב לפגוע בו. החיילים קראו לו \"ברווז גודריאן\" על שם מפקד השריון הגרמני.",
    weightTons: 25.8,
    crewSize: 4,
  },

  // ===== USA =====
  {
    id: "m4-sherman",
    name: "M4 Sherman",
    altNames: ["Sherman", "Medium Tank M4"],
    country: "USA",
    countryHebrew: "ארה\"ב",
    countryFlag: "🇺🇸",
    yearIntroduced: 1942,
    category: "medium",
    categoryHebrew: "בינוני",
    // IWM wartime photo: Sherman tanks advancing towards Vire, Normandy, August 1944
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Sherman_tanks_advancing_towards_Vire%2C_Normandy%2C_2_August_1944._B8484.jpg",
    imageCredit: "Imperial War Museum, Public Domain (Normandy, August 1944)",
    funFactHebrew:
      "יותר מ-49,000 שרמנים יוצרו – זה הטנק שיוצר הכי הרבה על ידי בעלות הברית! הוא שימש גם את הצבא הבריטי, הסובייטי ועוד.",
    weightTons: 30.3,
    crewSize: 5,
  },
  {
    id: "m26-pershing",
    name: "M26 Pershing",
    altNames: ["Pershing", "General Pershing"],
    country: "USA",
    countryHebrew: "ארה\"ב",
    countryFlag: "🇺🇸",
    yearIntroduced: 1945,
    category: "heavy",
    categoryHebrew: "כבד",
    // Real wartime photo: M26 of 9th Armored Division near Vettweiss, Germany, March 1945
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/M26-Pershing-Vettweiss-194503.jpg",
    imageCredit: "US Army Signal Corps, Public Domain (Vettweiss, Germany, March 1945)",
    funFactHebrew:
      "הפרשינג הגיע לאירופה ממש לקראת סוף המלחמה, בשנת 1945. הוא נוצר כדי להתמודד עם הטנקים הגרמנים הכבדים כמו הטייגר.",
    weightTons: 41.7,
    crewSize: 5,
  },
  {
    id: "m3-stuart",
    name: "M3 Stuart",
    altNames: ["Stuart", "Light Tank M3", "Honey"],
    country: "USA",
    countryHebrew: "ארה\"ב",
    countryFlag: "🇺🇸",
    yearIntroduced: 1941,
    category: "light",
    categoryHebrew: "קל",
    // US Army training photo, Fort Knox
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/M3-Stuart-Fort-Knox-1.jpg",
    imageCredit: "US Army, Public Domain",
    funFactHebrew:
      "הבריטים כינו את הסטיוארט \"דבש\" כי היה קל לנהוג בו ואמין מאוד. הוא שימש בצפון אפריקה, בדרום מזרח אסיה ובאירופה.",
    weightTons: 14.7,
    crewSize: 4,
  },
  {
    id: "m3-lee",
    name: "M3 Lee",
    altNames: ["General Lee", "Grant", "Medium Tank M3"],
    country: "USA",
    countryHebrew: "ארה\"ב",
    countryFlag: "🇺🇸",
    yearIntroduced: 1941,
    category: "medium",
    categoryHebrew: "בינוני",
    // Alfred T. Palmer wartime industrial photo, 1942
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/aa/AlfredPalmerM3tank1942b_crop2.jpg",
    imageCredit: "Alfred T. Palmer / US Library of Congress, Public Domain (1942)",
    funFactHebrew:
      "הגנרל לי היה טנק יוצא דופן – היו לו שני כלי נשק: תותח בצד הגוף ומגדל נוסף למעלה. הבריטים כינו גרסה שלו \"גרנט\" על שם הגנרל גרנט.",
    weightTons: 27.2,
    crewSize: 6,
  },

  // ===== USSR =====
  {
    id: "t-34",
    name: "T-34",
    altNames: ["T-34/76"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1940,
    category: "medium",
    categoryHebrew: "בינוני",
    // Preserved T-34/76 (model 1942), Saumur museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tank_T-34.JPG",
    imageCredit: "Wikimedia Commons, CC-BY-SA",
    funFactHebrew:
      "הטנק הזה שינה את מהלך המלחמה! הגרמנים היו בהלם כשראו אותו לראשונה ב-1941 – הוא היה מהיר, אמין, עם שריון משופע שקשה לחדור.",
    weightTons: 26.5,
    crewSize: 4,
  },
  {
    id: "t-34-85",
    name: "T-34/85",
    altNames: ["T-34-85"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1944,
    category: "medium",
    categoryHebrew: "בינוני",
    // T-34-85 at Kubinka Tank Museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d2/T-34-85_in_Kubinka_Tank_Museum.JPG",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Kubinka Tank Museum)",
    funFactHebrew:
      "גרסה משופרת של ה-T-34 עם תותח חזק יותר של 85 מ\"מ. הוא הוביל את הצבא האדום לברלין ב-1945 – ניצחון מוחץ!",
    weightTons: 32,
    crewSize: 5,
  },
  {
    id: "is-2",
    name: "IS-2",
    altNames: ["Josef Stalin 2", "IS-2M", "JS-2"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1944,
    category: "heavy",
    categoryHebrew: "כבד",
    // IS-2M at IWM Duxford
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/64/IS-2M_heavy_tank_%E2%80%93_IWM_Duxford_%2851293149799%29.jpg",
    imageCredit: "IWM Duxford / Flickr, CC-BY-SA 2.0",
    funFactHebrew:
      "ה-IS-2 נקרא על שם יוסיף סטלין! התותח שלו (122 מ\"מ) היה כל כך חזק שיכול היה להפיל בניין שלם. הגרמנים פחדו ממנו מאוד.",
    weightTons: 46,
    crewSize: 4,
  },
  {
    id: "kv-1",
    name: "KV-1",
    altNames: ["Kliment Voroshilov 1"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1941,
    category: "heavy",
    categoryHebrew: "כבד",
    // KV-1 at the "Breakthrough of the Leningrad Blockade" diorama museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/%D0%9A%D0%92-1_%D1%83_%D0%B4%D0%B8%D0%BE%D1%80%D0%B0%D0%BC%D1%8B_%C2%AB%D0%9F%D1%80%D0%BE%D1%80%D1%8B%D0%B2_%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0%D0%B4%D1%8B_%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D0%B0%C2%BB._%D0%92%D0%B8%D0%B4_%D1%81%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B8-%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%B0.JPG",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Leningrad Blockade museum)",
    funFactHebrew:
      "ב-1941 היה ה-KV-1 כמעט בלתי ניתן להריסה! בקרב אחד, טנק KV-1 יחיד עצר עמודה גרמנית שלמה למשך כמה שעות בלי לספוג נזק קריטי.",
    weightTons: 47.5,
    crewSize: 5,
  },
  {
    id: "t-70",
    name: "T-70",
    altNames: ["T-70M"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1942,
    category: "light",
    categoryHebrew: "קל",
    // T-70 at the Technical Museum, Togliatti
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/T-70%2C_technical_museum%2C_Togliatti-1.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Technical Museum, Togliatti)",
    funFactHebrew:
      "ה-T-70 היה הטנק הקל הסובייטי הנפוץ ביותר במלחמה – כמעט 8,000 יחידות יוצרו. הוא היה מהיר וקל לתחזוקה, אבל קטן מדי להתמודד עם טנקים גרמנים כבדים.",
    weightTons: 9.2,
    crewSize: 2,
  },

  // ===== UK =====
  {
    id: "churchill",
    name: "Churchill",
    altNames: ["Infantry Tank Mk IV", "A22"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1941,
    category: "infantry",
    categoryHebrew: "חי\"ר",
    // IWM wartime photo: Churchill tanks of the North Irish Horse, Tunisia 1943
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Na2606_Churchill_tanks_of_the_North_Irish_Horse.jpg",
    imageCredit: "Imperial War Museum, Public Domain (North Irish Horse, Tunisia 1943)",
    funFactHebrew:
      "הצ'רצ'יל נקרא על שם ראש הממשלה וינסטון צ'רצ'יל. הוא היה איטי אבל עם שריון עבה מאוד, ושימש לתמיכה בחיילי רגלים בקרבות אורבניים.",
    weightTons: 40.7,
    crewSize: 5,
  },
  {
    id: "cromwell",
    name: "Cromwell",
    altNames: ["Cruiser Tank Mk VIII", "A27M"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1944,
    category: "medium",
    categoryHebrew: "בינוני",
    // Bundesarchiv wartime photo: Destroyed Cromwell tanks at Villers-Bocage, France, June 1944
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/68/Bundesarchiv_Bild_101I-494-3376-25A%2C_Villers-Bocage%2C_zerst%C3%B6rte_Cromwell-Panzer.jpg",
    imageCredit: "Bundesarchiv, Bild 101I-494-3376-25A / CC-BY-SA 3.0 DE (Villers-Bocage, June 1944)",
    funFactHebrew:
      "הקרומוול היה מהיר מאוד – עד 64 קמ\"ש! הוא שימש בעיקר לסיור מהיר. בקרב וילר-בוקאז' הפורסם, כמה טנקי קרומוול הושמדו על ידי מפקד הגדוד הגרמני מיכאל ויטמן.",
    weightTons: 27.9,
    crewSize: 5,
  },
  {
    id: "matilda-ii",
    name: "Matilda II",
    altNames: ["Infantry Tank Mk II", "A12"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1940,
    category: "infantry",
    categoryHebrew: "חי\"ר",
    // A12 Matilda II at a military museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f9/A12_Matilda_II_%E2%80%98T10459%E2%80%99_%E2%80%9CTHE_PRINCESS_ROYAL%E2%80%9D_%2849909226038%29.jpg",
    imageCredit: "Wikimedia Commons / Flickr, CC-BY-SA 2.0",
    funFactHebrew:
      "במלחמת המדבר ב-1940-1941, כמעט שאף נשק גרמני לא יכול היה לחדור את השריון של מטילדה II. הגרמנים קראו לה \"מלכת שדה הקרב\".",
    weightTons: 26.9,
    crewSize: 4,
  },
  {
    id: "valentine",
    name: "Valentine",
    altNames: ["Infantry Tank Mk III"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1940,
    category: "infantry",
    categoryHebrew: "חי\"ר",
    // Valentine II at Kubinka Patriot Museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Valentine_II_%E2%80%985-40%E2%80%99_-_Patriot_Museum%2C_Kubinka_%2838390149682%29.jpg",
    imageCredit: "Wikimedia Commons / Flickr, CC-BY-SA 2.0 (Kubinka Patriot Museum)",
    funFactHebrew:
      "הוולנטיין הוא אחד הטנקים הבריטיים שיוצרו בכמות הגדולה ביותר – כ-8,275 יחידות. הרבה מהם נשלחו לברית המועצות כסיוע.",
    weightTons: 17.7,
    crewSize: 3,
  },

  // ===== JAPAN =====
  {
    id: "type-97-chi-ha",
    name: "Type 97 Chi-Ha",
    altNames: ["Chi-Ha", "Type 97 Medium Tank"],
    country: "Japan",
    countryHebrew: "יפן",
    countryFlag: "🇯🇵",
    yearIntroduced: 1938,
    category: "medium",
    categoryHebrew: "בינוני",
    // Type 97 Chi-Ha at the Great Patriotic War Museum, Moscow
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Type_97_Chi-Ha_in_the_Great_Patriotic_War_Museum_5-jun-2014.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Great Patriotic War Museum, Moscow)",
    funFactHebrew:
      "ה-Chi-Ha היה הטנק היפני הנפוץ ביותר במלחמה. הוא נלחם בסין, בפיליפינים ובאיים רבים בדרום מזרח אסיה, אבל היה חלש מול טנקים אמריקאים.",
    weightTons: 15,
    crewSize: 4,
  },
  {
    id: "type-95-ha-go",
    name: "Type 95 Ha-Go",
    altNames: ["Ha-Go", "Type 95 Light Tank"],
    country: "Japan",
    countryHebrew: "יפן",
    countryFlag: "🇯🇵",
    yearIntroduced: 1935,
    category: "light",
    categoryHebrew: "קל",
    // Type 95 Ha-Go captured, displayed at Moscow museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/83/Ha-Go_Moscow_%28cropped%29.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (preserved at Moscow museum)",
    funFactHebrew:
      "ה-Ha-Go היה הטנק הקל היפני הנפוץ ביותר במלחמה. הוא כבש אי אחר אי בדרום מזרח אסיה בתחילת המלחמה, אבל עד 1943 כלי נשק אמריקאים יכלו לפגוע בו בקלות.",
    weightTons: 7.4,
    crewSize: 3,
  },

  // ===== ITALY =====
  {
    id: "m13-40",
    name: "Carro Armato M13/40",
    altNames: ["M13/40", "Fiat M13/40"],
    country: "Italy",
    countryHebrew: "איטליה",
    countryFlag: "🇮🇹",
    yearIntroduced: 1940,
    category: "medium",
    categoryHebrew: "בינוני",
    // Italian M13/40 at El Alamein Museum, Egypt
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Museum_at_El_Alamein_-_Flickr_-_heatheronhertravels_%289%29_%28cropped%29.jpg",
    imageCredit: "Flickr / heatheronhertravels, CC-BY-SA 2.0 (El Alamein Museum, Egypt)",
    funFactHebrew:
      "ה-M13/40 היה הטנק האיטלקי העיקרי בצפון אפריקה. הוא הוצב בקרבות המדבר נגד הבריטים, אבל לרוב היה נחות מהטנקים הבריטים שנלחמו נגדו.",
    weightTons: 14,
    crewSize: 4,
  },

  // ===== FRANCE =====
  {
    id: "char-b1",
    name: "Char B1",
    altNames: ["Char B1 bis", "B1 bis"],
    country: "France",
    countryHebrew: "צרפת",
    countryFlag: "🇫🇷",
    yearIntroduced: 1940,
    category: "heavy",
    categoryHebrew: "כבד",
    // Destroyed Char B1 bis 'Indochine' No.205, France 1940 – authentic wartime photo
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/03/Char_B1.jpg",
    imageCredit: "Wikimedia Commons, Public Domain (destroyed Char B1 bis, France 1940)",
    funFactHebrew:
      "הצ'אר B1 היה מהטנקים החזקים בעולם ב-1940 – אבל זה לא עזר לצרפת! גרמניה הביסה את צרפת תוך 6 שבועות בזכות טקטיקה מהירה, לא כוח טנקים.",
    weightTons: 32.5,
    crewSize: 4,
  },
  {
    id: "renault-r35",
    name: "Renault R35",
    altNames: ["R35", "Char léger modèle 1935 R"],
    country: "France",
    countryHebrew: "צרפת",
    countryFlag: "🇫🇷",
    yearIntroduced: 1937,
    category: "light",
    categoryHebrew: "קל",
    // Renault R35 at Yad la-Shiryon Museum, Israel (Latrun)
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Renault-R-35-latrun-2.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Yad la-Shiryon Museum, Latrun, Israel)",
    funFactHebrew:
      "הרנו R35 היה הטנק הצרפתי הנפוץ ביותר ב-1940 – כ-1,700 יחידות. לאחר נפילת צרפת, הגרמנים לכדו הרבה מהם ושינו את ייעודם.",
    weightTons: 10,
    crewSize: 2,
  },

  // ===== GERMANY (additional) =====
  {
    id: "panzer-i",
    name: "Panzer I",
    altNames: ["PzKpfw I", "Panzerkampfwagen I"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1934,
    category: "light",
    categoryHebrew: "קל",
    // SdKfz 101 – preserved Panzer I Ausf. A
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/SdKfz101.jpg/960px-SdKfz101.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "הפנצר I היה הטנק הגרמני הראשון – כל כך קטן שהיה לו רק מקלע! הוא שימש לאימון צוותים והשתתף בפלישה לפולין ב-1939.",
    weightTons: 5.4,
    crewSize: 2,
  },
  {
    id: "panzer-ii",
    name: "Panzer II",
    altNames: ["PzKpfw II", "Panzerkampfwagen II"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1936,
    category: "light",
    categoryHebrew: "קל",
    // Preserved Panzer II at the Saumur tank museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Panzer_II_Saumur.JPG/960px-Panzer_II_Saumur.JPG",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Saumur Museum)",
    funFactHebrew:
      "הפנצר II היה הטנק הגרמני הנפוץ ביותר בתחילת המלחמה. הוא לחם בפולין, בצרפת ובצפון אפריקה, אך עד 1942 כבר היה מיושן מדי.",
    weightTons: 8.9,
    crewSize: 3,
  },
  {
    id: "panzer-38t",
    name: "Panzer 38(t)",
    altNames: ["PzKpfw 38(t)", "LT vz. 38"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1939,
    category: "light",
    categoryHebrew: "קל",
    // Preserved Panzer 38(t) Ausf. S
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Panzer_38%28t%29_Ausf._S.jpg/960px-Panzer_38%28t%29_Ausf._S.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA",
    funFactHebrew:
      "הפנצר 38(t) לא היה גרמני במקור – הוא יוצר בצ'כיה! כשגרמניה כבשה את צ'כיה, היא לקחה את הטנקים האלה ושלחה אותם לחזית.",
    weightTons: 9.7,
    crewSize: 4,
  },
  {
    id: "jagdpanther",
    name: "Jagdpanther",
    altNames: ["Jagdpanzer V", "Tank Hunter Panther"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1944,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // Jagdpanther at the Bovington Tank Museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Jagdpanzer_V_Jagdpanther_1.jpg/960px-Jagdpanzer_V_Jagdpanther_1.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Bovington Tank Museum)",
    funFactHebrew:
      "הג'גדפנתר נחשב למשמיד הטנקים הטוב ביותר של גרמניה – התותח שלו יכול היה לפגוע בטנק מטווח של קילומטר וחצי! אבל יוצרו רק 415 יחידות.",
    weightTons: 45.5,
    crewSize: 5,
  },
  {
    id: "jagdtiger",
    name: "Jagdtiger",
    altNames: ["Panzerjäger Tiger Ausf. B", "SdKfz 186"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1944,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // Jagdtiger preserved at Aberdeen Proving Grounds
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Jagdtiger_at_Aberdeen_proving_grounds_2008.jpg/960px-Jagdtiger_at_Aberdeen_proving_grounds_2008.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Aberdeen Proving Grounds, 2008)",
    funFactHebrew:
      "הג'גדטייגר היה משמיד הטנקים הכבד ביותר שנבנה אי פעם – 75 טון! יוצרו רק 88 יחידות, ורובן התקלקלו מהכובד שלהן עוד לפני הקרב.",
    weightTons: 75.2,
    crewSize: 6,
  },
  {
    id: "elefant",
    name: "Elefant",
    altNames: ["Ferdinand", "SdKfz 184", "Panzerjäger Tiger (P)"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1943,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // Elefant preserved at US Army Ordnance Museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/07/Elefant_USAOM-01.jpg",
    imageCredit: "Wikimedia Commons, Public Domain (US Army Ordnance Museum)",
    funFactHebrew:
      "הפרדינאנד (מאוחר יותר שונה שמו ל\"פיל\") לחם בקרב קורסק ב-1943 – הקרב הגדול ביותר של טנקים בהיסטוריה. הבעיה: לא היה לו מקלע להגנה מחיילי רגלים!",
    weightTons: 65,
    crewSize: 6,
  },
  {
    id: "hetzer",
    name: "Hetzer",
    altNames: ["Jagdpanzer 38(t)", "G-13"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1944,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // Hetzer at Lešany military museum, Czech Republic
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Le%C5%A1any_-_vojensk%C3%A9_muzeum%2C_Tankov%C3%BD_den_2024%2C_uk%C3%A1zky%2C_Hetzer%2C_obr01.jpg/960px-Le%C5%A1any_-_vojensk%C3%A9_muzeum%2C_Tankov%C3%BD_den_2024%2C_uk%C3%A1zky%2C_Hetzer%2C_obr01.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Lešany Museum, Czech Republic)",
    funFactHebrew:
      "ה-Hetzer היה קטן וזול לייצור אבל יעיל מאוד. הוא יוצר על בסיס הפנצר 38(t) הצ'כי, ויותר מ-2,800 יחידות יוצרו עד סוף המלחמה.",
    weightTons: 16,
    crewSize: 4,
  },
  {
    id: "maus",
    name: "Panzer VIII Maus",
    altNames: ["Maus", "Mouse"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1944,
    category: "heavy",
    categoryHebrew: "כבד",
    // Maus at Kubinka Tank Museum, Russia (2025 updated photo)
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Maus_2025_b.jpg/960px-Maus_2025_b.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Kubinka Tank Museum)",
    funFactHebrew:
      "ה\"עכבר\" (Maus) היה הטנק הכבד ביותר שנבנה אי פעם – 188 טון! הוא היה כל כך כבד שגשרים רגילים קרסו תחתיו. יוצרו רק 2 יחידות לפני תום המלחמה.",
    weightTons: 188,
    crewSize: 6,
  },
  {
    id: "marder-iii",
    name: "Marder III",
    altNames: ["Panzerjäger 38(t)", "Tank Hunter III"],
    country: "Germany",
    countryHebrew: "גרמניה",
    countryFlag: "🇩🇪",
    yearIntroduced: 1942,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // Preserved Marder III tank destroyer
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Marder_III_tank_destroyer.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "המארדר III נבנה על שלדת הפנצר 38(t) הצ'כי עם תותח רוסי שנלכד! הגרמנים היו יצירתיים – השתמשו בנשק האויב נגד האויב עצמו.",
    weightTons: 10.5,
    crewSize: 4,
  },

  // ===== USA (additional) =====
  {
    id: "m24-chaffee",
    name: "M24 Chaffee",
    altNames: ["Chaffee", "Light Tank M24"],
    country: "USA",
    countryHebrew: "ארה\"ב",
    countryFlag: "🇺🇸",
    yearIntroduced: 1944,
    category: "light",
    categoryHebrew: "קל",
    // M24 Chaffee at Tankfest 2023
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/M24_Chaffee_tankfest_2023.JPG/960px-M24_Chaffee_tankfest_2023.JPG",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Tankfest 2023)",
    funFactHebrew:
      "ה-M24 צ'אפי היה הטנק הקל האמריקאי הטוב ביותר במלחמה. הוא היה מהיר, אמין, ועם תותח טוב יחסית לגודלו. הוא הגיע לאירופה ב-1944.",
    weightTons: 18.4,
    crewSize: 5,
  },
  {
    id: "m10-wolverine",
    name: "M10 Wolverine",
    altNames: ["M10 Tank Destroyer", "Wolverine", "Achilles"],
    country: "USA",
    countryHebrew: "ארה\"ב",
    countryFlag: "🇺🇸",
    yearIntroduced: 1942,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // M10 Wolverine at Aberdeen Proving Grounds
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Aberdean_proving_grounds_036.JPG/960px-Aberdean_proving_grounds_036.JPG",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Aberdeen Proving Grounds)",
    funFactHebrew:
      "ה-M10 וולברין היה משמיד הטנקים האמריקאי הנפוץ ביותר. הבריטים הוסיפו לגרסה שלהם (\"אכילס\") תותח חזק עוד יותר שיכול היה לפגוע גם בטייגר.",
    weightTons: 29.6,
    crewSize: 5,
  },
  {
    id: "m18-hellcat",
    name: "M18 Hellcat",
    altNames: ["Hellcat", "Gun Motor Carriage M18"],
    country: "USA",
    countryHebrew: "ארה\"ב",
    countryFlag: "🇺🇸",
    yearIntroduced: 1943,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // M18 Hellcat side view
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/M18_hellcat_side.jpg/960px-M18_hellcat_side.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA",
    funFactHebrew:
      "ה-M18 הלקט היה מהיר כמו מכונית מירוץ – עד 89 קמ\"ש! זה עשה אותו לרכב המשוריין המהיר ביותר במלחמה. \"לרוץ ולירות\" היתה האסטרטגיה שלו.",
    weightTons: 17.7,
    crewSize: 5,
  },
  {
    id: "m36-jackson",
    name: "M36 Jackson",
    altNames: ["Jackson", "M36 Tank Destroyer", "Slugger"],
    country: "USA",
    countryHebrew: "ארה\"ב",
    countryFlag: "🇺🇸",
    yearIntroduced: 1944,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // M36 Jackson tank destroyers in formation
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/American_tank_destroyers.jpg/960px-American_tank_destroyers.jpg",
    imageCredit: "US Army Signal Corps, Public Domain",
    funFactHebrew:
      "ה-M36 ג'קסון נוצר כי האמריקאים היו צריכים תותח חזק מספיק להרוס טנקים גרמנים כבדים. התותח שלו (90 מ\"מ) יכול היה לפגוע בטייגר מטווח של 1,000 מטר.",
    weightTons: 28.1,
    crewSize: 5,
  },
  {
    id: "sherman-firefly",
    name: "Sherman Firefly",
    altNames: ["Firefly", "Sherman VC"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1944,
    category: "medium",
    categoryHebrew: "בינוני",
    // British Sherman Firefly at Namur
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/British_Sherman_Firefly_Namur.jpg/960px-British_Sherman_Firefly_Namur.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Namur, Belgium)",
    funFactHebrew:
      "הפיירפליי הבריטי היה שרמן רגיל עם תותח חזק יותר של 17 פאונד שיכול לפגוע בטייגר! הגרמנים כל כך פחדו ממנו שנתנו פקודה לכוון קודם כל לפיירפליי.",
    weightTons: 34.75,
    crewSize: 4,
  },

  // ===== USSR (additional) =====
  {
    id: "kv-2",
    name: "KV-2",
    altNames: ["Kliment Voroshilov 2", "KV-2M"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1940,
    category: "heavy",
    categoryHebrew: "כבד",
    // KV-2 1940 wartime photo
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/KW-2_1940.jpg",
    imageCredit: "Wikimedia Commons, Public Domain (1940)",
    funFactHebrew:
      "ה-KV-2 היה ענק עם מגדל ענקי ותותח 152 מ\"מ שיכול להפיל בניין שלם! הוא היה כל כך גדול שקשה היה לסובב את המגדל בצד של גבעה.",
    weightTons: 52,
    crewSize: 6,
  },
  {
    id: "t-60",
    name: "T-60",
    altNames: ["T-60 Light Tank"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1941,
    category: "light",
    categoryHebrew: "קל",
    // T-60 at Kubinka Patriot Museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/T-60_%E2%80%98A_-_2317%E2%80%99_-_Patriot_Museum%2C_Kubinka_%2824524755458%29.jpg/960px-T-60_%E2%80%98A_-_2317%E2%80%99_-_Patriot_Museum%2C_Kubinka_%2824524755458%29.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Kubinka Patriot Museum)",
    funFactHebrew:
      "ה-T-60 היה הטנק הקל הסובייטי הקטן ביותר במלחמה – רק 6 טון! הוא שימש בעיקר לסיור, אבל גם ל\"גלות\" אויבים מעמדות קדמיות.",
    weightTons: 6.4,
    crewSize: 2,
  },
  {
    id: "su-76",
    name: "SU-76",
    altNames: ["SU-76M", "Suka"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1942,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // SU-76 preserved photo
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Su76_nn.jpg/960px-Su76_nn.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA",
    funFactHebrew:
      "ה-SU-76 היה הרכב המשוריין הסובייטי השני בנפוץ ביותר במלחמה אחרי ה-T-34! הוא שימש לתמיכה בחיילי רגלים. החיילים קראו לו \"סוקה\" (כלבה) בגלל הרעש שהוא עשה.",
    weightTons: 10.6,
    crewSize: 4,
  },
  {
    id: "su-100",
    name: "SU-100",
    altNames: ["SU-100M1"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1944,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // SU-100 at Tank Biathlon 2013
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Su-100_-_TankBiathlon2013-07.jpg/960px-Su-100_-_TankBiathlon2013-07.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Tank Biathlon 2013)",
    funFactHebrew:
      "ה-SU-100 נשא תותח 100 מ\"מ חזק מאוד שיכול היה לחדור כמעט כל שריון גרמני. הוא שירת גם אחרי המלחמה בצבאות רבים ברחבי העולם.",
    weightTons: 31.6,
    crewSize: 4,
  },
  {
    id: "isu-152",
    name: "ISU-152",
    altNames: ["Beast Killer", "Zveroboy"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1943,
    category: "tank_destroyer",
    categoryHebrew: "משמיד טנקים",
    // ISU-152 at Kubinka Tank Museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/ISU-152%40Kubinka.jpg/960px-ISU-152%40Kubinka.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Kubinka Tank Museum)",
    funFactHebrew:
      "ה-ISU-152 כונה \"ציד החיות\" (Zveroboy) כי ירה פגזים כל כך כבדים שיכלו לפגוע בטייגר, בפנתר ובפיל! פגז אחד שלו שקל 43 קילוגרם.",
    weightTons: 45.5,
    crewSize: 5,
  },
  {
    id: "is-3",
    name: "IS-3",
    altNames: ["Josef Stalin 3", "IS-3M", "Pike"],
    country: "USSR",
    countryHebrew: "ברית המועצות",
    countryFlag: "🇷🇺",
    yearIntroduced: 1945,
    category: "heavy",
    categoryHebrew: "כבד",
    // IS-3 preserved tank
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/IS3.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA",
    funFactHebrew:
      "ה-IS-3 הגיע ממש בסוף המלחמה ב-1945. החרטום המשופע שלו בצורת \"אף פייק\" נועד להסיט קליעים. כשהוצג במצעד ניצחון בברלין, הוא הדהים את הכל!",
    weightTons: 45.8,
    crewSize: 4,
  },

  // ===== UK (additional) =====
  {
    id: "crusader",
    name: "Crusader",
    altNames: ["Cruiser Tank Mk VI", "A15"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1941,
    category: "medium",
    categoryHebrew: "בינוני",
    // Crusader Mk III at a museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Crusader_MkIII_%E2%80%98T126272%E2%80%99_%2836590905746%29.jpg/960px-Crusader_MkIII_%E2%80%98T126272%E2%80%99_%2836590905746%29.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Flickr)",
    funFactHebrew:
      "הצלבן (Crusader) לחם בצפון אפריקה בקרבות המדבר. הוא היה מהיר אבל עם שריון דק. אחרי שהוחלף על ידי שרמן, הוא שימש כרכב הנדסי.",
    weightTons: 20,
    crewSize: 3,
  },
  {
    id: "comet",
    name: "Comet",
    altNames: ["Cruiser Tank Comet", "A34"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1944,
    category: "medium",
    categoryHebrew: "בינוני",
    // Comet tank at Tankfest 2023
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/Comet_tank_tankfest_2023.JPG",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Tankfest 2023)",
    funFactHebrew:
      "הקומט נחשב לטנק הבריטי הטוב ביותר שהגיע בזמן לשדה הקרב. הוא שילב מהירות, שריון טוב ותותח 77 מ\"מ חזק. הגיע לגרמניה בינואר 1945.",
    weightTons: 35.7,
    crewSize: 5,
  },
  {
    id: "tetrarch",
    name: "Tetrarch",
    altNames: ["Light Tank Mk VII", "Purdah"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1940,
    category: "light",
    categoryHebrew: "קל",
    // Tetrarch Light Tank Mark VII
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ed/Tetrarch_-_Light_Tank_Mark_VII.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA",
    funFactHebrew:
      "הטטרארך היה הטנק הבריטי שנפל מהשמיים! הוא הוטס לנורמנדי בגלשנים כחלק מהפלישה ב-D-Day. טנק מעופף – עובדה מדהימה!",
    weightTons: 7.6,
    crewSize: 3,
  },
  {
    id: "centurion",
    name: "Centurion",
    altNames: ["FV4007", "A41"],
    country: "UK",
    countryHebrew: "בריטניה",
    countryFlag: "🇬🇧",
    yearIntroduced: 1945,
    category: "medium",
    categoryHebrew: "בינוני",
    // Centurion at CFB Borden, Canada
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Centurion_cfb_borden_1.JPG",
    imageCredit: "Wikimedia Commons, CC-BY-SA (CFB Borden, Canada)",
    funFactHebrew:
      "הצנטוריון הגיע ממש בסוף מלחמת העולם השנייה ב-1945 ולא הספיק לקחת חלק בלחימה. אבל הוא הפך לאחד הטנקים המצליחים בהיסטוריה ושירת בצבאות רבים עד 1990!",
    weightTons: 52,
    crewSize: 4,
  },

  // ===== JAPAN (additional) =====
  {
    id: "type-1-chi-he",
    name: "Type 1 Chi-He",
    altNames: ["Chi-He", "Type 1 Medium Tank"],
    country: "Japan",
    countryHebrew: "יפן",
    countryFlag: "🇯🇵",
    yearIntroduced: 1941,
    category: "medium",
    categoryHebrew: "בינוני",
    // Type 1 Chi-He preserved in Japan
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/bd/Isshikityusensya.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "ה-Chi-He היה שיפור על ה-Chi-Ha המוכר, עם שריון עבה יותר ומנוע חזק יותר. אבל הייצור האיטי של יפן אומר שרק כ-170 יחידות יוצרו.",
    weightTons: 17.2,
    crewSize: 5,
  },
  {
    id: "type-3-chi-nu",
    name: "Type 3 Chi-Nu",
    altNames: ["Chi-Nu", "Type 3 Medium Tank"],
    country: "Japan",
    countryHebrew: "יפן",
    countryFlag: "🇯🇵",
    yearIntroduced: 1943,
    category: "medium",
    categoryHebrew: "בינוני",
    // Japanese Type 3 Chi-Nu tank
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Japanese_Type_3_Chi-Nu_tank_1.jpg/960px-Japanese_Type_3_Chi-Nu_tank_1.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "ה-Chi-Nu היה הטנק הבינוני הטוב ביותר שיפן פיתחה, עם תותח 75 מ\"מ. אבל הוא נועד בעיקר להגן על האיים היפניים מפני פלישה אמריקאית שלא הגיעה.",
    weightTons: 18.8,
    crewSize: 5,
  },
  {
    id: "type-97-te-ke",
    name: "Type 97 Te-Ke",
    altNames: ["Te-Ke", "Type 97 Tankette"],
    country: "Japan",
    countryHebrew: "יפן",
    countryFlag: "🇯🇵",
    yearIntroduced: 1937,
    category: "light",
    categoryHebrew: "קל",
    // Type 97 Te-Ke at the Australian War Memorial
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/Type_97_%28AWM_P00001-361%29.jpg",
    imageCredit: "Australian War Memorial, Public Domain",
    funFactHebrew:
      "ה-Te-Ke היה טנקטה – ​​כלי רכב קטן מאוד דמוי טנק. הוא היה כל כך קטן שנראה כמו צעצוע, אבל שימש לסיור ותמיכה בחיילים בג'ונגל.",
    weightTons: 4.75,
    crewSize: 2,
  },
  {
    id: "type-2-ka-mi",
    name: "Type 2 Ka-Mi",
    altNames: ["Ka-Mi", "Type 2 Amphibious Tank"],
    country: "Japan",
    countryHebrew: "יפן",
    countryFlag: "🇯🇵",
    yearIntroduced: 1942,
    category: "light",
    categoryHebrew: "קל",
    // Type 2 Ka-Mi amphibious tank
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Type_2_Ka-Mi_amphibious_tank.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "ה-Ka-Mi היה טנק מיוחד שיכול לשחות! הוא שימש לנחיתות ימיות באיים. הצדפות הענקיות שלפנים ומאחור אפשרו לו לצוף, ולפני הקרב הוסרו.",
    weightTons: 12.5,
    crewSize: 5,
  },

  // ===== ITALY (additional) =====
  {
    id: "l6-40",
    name: "L6/40",
    altNames: ["Carro Armato L6/40", "Fiat L6"],
    country: "Italy",
    countryHebrew: "איטליה",
    countryFlag: "🇮🇹",
    yearIntroduced: 1940,
    category: "light",
    categoryHebrew: "קל",
    // L6/40 preserved at museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Fiat_L6_40_05.jpg/960px-Fiat_L6_40_05.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA",
    funFactHebrew:
      "ה-L6/40 היה הטנק הקל האיטלקי הנפוץ ביותר. הוא נלחם בצפון אפריקה ובמזרח אירופה, אך היה חלש מדי בהשוואה לטנקים של מדינות אחרות.",
    weightTons: 6.84,
    crewSize: 2,
  },
  {
    id: "p40",
    name: "P40",
    altNames: ["P26/40", "Carro Armato P 40"],
    country: "Italy",
    countryHebrew: "איטליה",
    countryFlag: "🇮🇹",
    yearIntroduced: 1942,
    category: "heavy",
    categoryHebrew: "כבד",
    // P26/40 tank preserved
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c6/P26-40_tank.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "ה-P40 היה הטנק הכבד היחיד שאיטליה ייצרה – אבל מאוחר מדי! כשאיטליה כניעה ב-1943, הגרמנים השתלטו על הטנקים שכבר יוצרו ושלחו אותם לחזית.",
    weightTons: 26,
    crewSize: 4,
  },

  // ===== FRANCE (additional) =====
  {
    id: "somua-s35",
    name: "SOMUA S35",
    altNames: ["S35", "Char de cavalerie S 35"],
    country: "France",
    countryHebrew: "צרפת",
    countryFlag: "🇫🇷",
    yearIntroduced: 1936,
    category: "medium",
    categoryHebrew: "בינוני",
    // SOMUA S35 at Saumur museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Char_1935_S_Somua_1.jpg/960px-Char_1935_S_Somua_1.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Saumur Museum)",
    funFactHebrew:
      "ה-SOMUA S35 נחשב לאחד הטנקים הטובים בעולם ב-1940 – שריון טוב, תותח חזק ומהיר. הבעיה: לכל צריח היה רק חייל אחד שהיה צריך לעשות הכל בעצמו!",
    weightTons: 19.5,
    crewSize: 3,
  },
  {
    id: "hotchkiss-h35",
    name: "Hotchkiss H35",
    altNames: ["H35", "H39", "Char léger d'accompagnement"],
    country: "France",
    countryHebrew: "צרפת",
    countryFlag: "🇫🇷",
    yearIntroduced: 1936,
    category: "light",
    categoryHebrew: "קל",
    // Hotchkiss H39 at Yad la-Shiryon Museum, Latrun
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Hotchkiss-H-39-latrun-2.jpg/960px-Hotchkiss-H-39-latrun-2.jpg",
    imageCredit: "Wikimedia Commons, CC-BY-SA (Yad la-Shiryon Museum, Latrun, Israel)",
    funFactHebrew:
      "ה-Hotchkiss H35 היה הטנק הקל של פרשת הצבא הצרפתי. אחרי נפילת צרפת, חלק מהטנקים האלה הגיעו לישראל ושירתו בצה\"ל במלחמת העצמאות!",
    weightTons: 11.4,
    crewSize: 2,
  },
  {
    id: "renault-ft",
    name: "Renault FT",
    altNames: ["FT-17", "Renault FT-17", "char Renault FT modèle 1917"],
    country: "France",
    countryHebrew: "צרפת",
    countryFlag: "🇫🇷",
    yearIntroduced: 1917,
    category: "light",
    categoryHebrew: "קל",
    // Renault FT preserved at a museum
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/FT_17.jpg",
    imageCredit: "Wikimedia Commons, Public Domain",
    funFactHebrew:
      "הרנו FT היה הטנק הראשון בהיסטוריה עם מגדל מסתובב! הוא תוכנן במלחמת העולם הראשונה, אבל צרפת עדיין השתמשה בו ב-1940. הפך לדגם לכל הטנקים המודרניים.",
    weightTons: 6.7,
    crewSize: 2,
  },
];

// ===== HELPER FUNCTIONS =====

export function getTanksByCountry(country: TankCountry): WW2Tank[] {
  return WW2_TANKS.filter((tank) => tank.country === country);
}

export function getTanksByCategory(category: TankCategory): WW2Tank[] {
  return WW2_TANKS.filter((tank) => tank.category === category);
}

/**
 * Returns `count` wrong answers for a given field, excluding the correct tank.
 * Used to build multiple-choice questions.
 */
export function getRandomWrongAnswers(
  correctTank: WW2Tank,
  field: "name" | "country" | "category",
  count: number
): string[] {
  const allValues = WW2_TANKS
    .filter((t) => t.id !== correctTank.id)
    .map((t) => {
      if (field === "name") return t.name;
      if (field === "country") return t.country;
      return t.category;
    });

  // Deduplicate
  const unique = Array.from(new Set(allValues));

  // Shuffle using Fisher-Yates
  for (let i = unique.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unique[i], unique[j]] = [unique[j], unique[i]];
  }

  return unique.slice(0, count);
}

// Category labels in Hebrew (for display)
export const CATEGORY_LABELS_HEBREW: Record<TankCategory, string> = {
  heavy: "טנק כבד",
  medium: "טנק בינוני",
  light: "טנק קל",
  tank_destroyer: "משמיד טנקים",
  infantry: "חי\"ר",
};

// Country labels in Hebrew (for display)
export const COUNTRY_LABELS_HEBREW: Record<TankCountry, string> = {
  Germany: "גרמניה",
  USA: "ארה\"ב",
  USSR: "ברית המועצות",
  UK: "בריטניה",
  Japan: "יפן",
  Italy: "איטליה",
  France: "צרפת",
};
