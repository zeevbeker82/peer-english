// Israel Wars Tanks Quiz Content
// Images sourced from Wikimedia Commons (verified URLs)
// Covers: War of Independence (1948), Six-Day War (1967), Yom Kippur War (1973), First Lebanon War (1982)

export type IsraelWarName = "independence" | "six_day" | "yom_kippur" | "lebanon_1";
export type IsraelWarSide = "Israel" | "Egypt" | "Syria" | "Jordan" | "Iraq" | "Lebanon" | "PLO";
export type IsraelWarTankCategory = "heavy" | "medium" | "light" | "tank_destroyer" | "amphibious" | "infantry";

export interface IsraelWarsTank {
  id: string;
  name: string;
  altNames?: string[];
  side: IsraelWarSide;
  sideFlag: string;           // emoji flag
  wars: IsraelWarName[];      // all wars this tank participated in (earliest first)
  yearFirstUsed: number;      // year first used by THIS army (not WW2 introduction date)
  category: IsraelWarTankCategory;
  categoryEnglish: string;    // "Heavy Tank", "Medium Tank", "Light Tank", "Tank Destroyer", "Amphibious Tank", "Infantry Tank"
  imageUrl: string;
  imageCredit: string;
  funFactEnglish: string;     // Fun fact in English, 6th grade level, 1-2 sentences
  weightTons?: number;
  crewSize?: number;
}

export const ISRAEL_WARS_TANKS_XP = {
  correct: 15,
  streak3: 10,
  streak5: 20,
  allTanks: 100,
} as const;

export const WAR_LABELS: Record<IsraelWarName, string> = {
  independence: "War of Independence (1948)",
  six_day: "Six-Day War (1967)",
  yom_kippur: "Yom Kippur War (1973)",
  lebanon_1: "First Lebanon War (1982)",
};

export const WAR_LABELS_HE: Record<IsraelWarName, string> = {
  independence: "מלחמת השחרור (1948)",
  six_day: "מלחמת ששת הימים (1967)",
  yom_kippur: "מלחמת יום הכיפורים (1973)",
  lebanon_1: "מלחמת לבנון הראשונה (1982)",
};

export const SIDE_LABELS: Record<IsraelWarSide, string> = {
  Israel: "🇮🇱 Israel",
  Egypt: "🇪🇬 Egypt",
  Syria: "🇸🇾 Syria",
  Jordan: "🇯🇴 Jordan",
  Iraq: "🇮🇶 Iraq",
  Lebanon: "🇱🇧 Lebanon",
  PLO: "🇵🇸 PLO",
};

export const ISRAEL_WARS_TANKS: IsraelWarsTank[] = [

  // ===== WAR OF INDEPENDENCE 1948 — ISRAEL SIDE =====

  {
    id: "cromwell-israel",
    name: "Cromwell Mk IV",
    altNames: ["Cromwell", "A27M"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["independence"],
    yearFirstUsed: 1948,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/68/Bundesarchiv_Bild_101I-494-3376-25A%2C_Villers-Bocage%2C_zerst%C3%B6rte_Cromwell-Panzer.jpg",
    imageCredit: "Bundesarchiv, CC-BY-SA 3.0 DE",
    funFactEnglish:
      "In 1948, Israel had almost no tanks! They secretly repaired Cromwell tanks abandoned by the British and drove them into battle — sometimes with the paint still wet! It was a desperate time, and every tank counted.",
    weightTons: 28,
    crewSize: 5,
  },

  {
    id: "hotchkiss-h39-israel",
    name: "Hotchkiss H39",
    altNames: ["H39", "Char léger modèle 1935 H"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["independence"],
    yearFirstUsed: 1948,
    category: "light",
    categoryEnglish: "Light Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Hotchkiss-H-39-latrun-2.jpg/960px-Hotchkiss-H-39-latrun-2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Israel bought these old French tanks as surplus after World War II. Even though the H39 was small and slow, it was one of the first real tanks Israel ever had. Today you can still see one at the Yad la-Shiryon tank museum in Israel!",
    weightTons: 12.1,
    crewSize: 2,
  },

  {
    id: "renault-r35-israel",
    name: "Renault R35",
    altNames: ["R35", "Char léger modèle 1935 R"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["independence"],
    yearFirstUsed: 1948,
    category: "light",
    categoryEnglish: "Light Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Renault-R-35-latrun-2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The Renault R35 was a tiny French tank from the 1930s, but in 1948 Israel was happy to get any tank it could find! These little machines helped defend the new State of Israel during the very first days of its existence.",
    weightTons: 10,
    crewSize: 2,
  },

  {
    id: "sherman-israel",
    name: "Sherman M4",
    altNames: ["M4 Sherman", "Sherman"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["independence", "six_day", "yom_kippur"],
    yearFirstUsed: 1948,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Sherman_tanks_advancing_towards_Vire%2C_Normandy%2C_2_August_1944._B8484.jpg",
    imageCredit: "Imperial War Museum / Public Domain",
    funFactEnglish:
      "The Sherman tank served Israel in three different wars over 25 years! Israel was so skilled at upgrading old tanks that their Shermans became some of the best in the Middle East. It is an amazing example of making the most of what you have.",
    weightTons: 31,
    crewSize: 5,
  },

  // ===== WAR OF INDEPENDENCE 1948 — ARAB SIDE =====

  {
    id: "valentine-egypt",
    name: "Valentine Mk II",
    altNames: ["Valentine", "Infantry Tank Mk III"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["independence"],
    yearFirstUsed: 1948,
    category: "infantry",
    categoryEnglish: "Infantry Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Valentine_II_%E2%80%985-40%E2%80%99_-_Patriot_Museum%2C_Kubinka_%2838390149682%29.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 2.0",
    funFactEnglish:
      "Egypt used Valentine tanks left over from World War II when it attacked Israel in 1948. The Valentine was a British-built infantry tank, designed to move slowly and support foot soldiers in battle. It was already considered old by 1948!",
    weightTons: 17,
    crewSize: 3,
  },

  {
    id: "matilda-egypt",
    name: "Matilda II",
    altNames: ["Matilda", "Infantry Tank Mk II", "A12"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["independence"],
    yearFirstUsed: 1948,
    category: "infantry",
    categoryEnglish: "Infantry Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f9/A12_Matilda_II_%E2%80%98T10459%E2%80%99_%E2%80%9CTHE_PRINCESS_ROYAL%E2%80%9D_%2849909226038%29.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 2.0",
    funFactEnglish:
      "The Matilda II was nicknamed the 'Queen of the Desert' in World War II because its thick armor made it nearly impossible to destroy in North Africa. By 1948, Egypt used these old British tanks against Israel, but they were already out of date compared to newer designs.",
    weightTons: 27,
    crewSize: 4,
  },

  {
    id: "renault-r35-syria",
    name: "Renault R35",
    altNames: ["R35", "Char léger modèle 1935 R"],
    side: "Syria",
    sideFlag: "🇸🇾",
    wars: ["independence"],
    yearFirstUsed: 1948,
    category: "light",
    categoryEnglish: "Light Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Renault-R-35-latrun-2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Syria also used old French Renault R35 tanks when it invaded Israel in 1948. Both Israel AND Syria used the same model of tank in this war — meaning engineers on both sides knew exactly what weaknesses to look for! Syria got theirs from French army supplies left behind in the region.",
    weightTons: 10,
    crewSize: 2,
  },

  // ===== SIX-DAY WAR 1967 — ISRAEL SIDE =====

  {
    id: "centurion-shot",
    name: "Centurion Shot",
    altNames: ["Shot", "Shot Meteor", "Centurion Mk 5"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["six_day", "yom_kippur", "lebanon_1"],
    yearFirstUsed: 1967,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Centurion_cfb_borden_1.JPG",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Israel bought British Centurion tanks and named them 'Shot,' which means 'whip' in Hebrew. Israeli engineers kept upgrading this tank for over 15 years! The Shot Centurion fought in three major wars and became one of the most trusted tanks in Israeli history.",
    weightTons: 52,
    crewSize: 4,
  },

  {
    id: "amx-13-israel",
    name: "AMX-13",
    altNames: ["AMX 13"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["six_day"],
    yearFirstUsed: 1956,
    category: "light",
    categoryEnglish: "Light Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/be/AMX_13_Saumur_0.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The AMX-13 was a clever French light tank with an automatic loading system — it could fire shots very quickly without the crew needing to reload by hand! Israel used it in the 1956 Sinai Campaign and again in the Six-Day War, but it was too lightly armored for the heavy fighting of 1967.",
    weightTons: 15,
    crewSize: 3,
  },

  {
    id: "m50-super-sherman",
    name: "M50 Super Sherman",
    altNames: ["M50", "Super Sherman"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["six_day", "yom_kippur"],
    yearFirstUsed: 1956,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1a/M50-Supersherman-latrun-1.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Israel took old American Sherman tanks and gave them a powerful new French 75mm gun — creating the M50 Super Sherman! This is a great example of Israeli creativity. By upgrading older tanks with better weapons, Israel turned outdated machines into competitive fighting vehicles.",
    weightTons: 33,
    crewSize: 5,
  },

  {
    id: "m51-isherman",
    name: "M51 Isherman",
    altNames: ["M51", "Isherman", "Super Sherman M51"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["six_day", "yom_kippur"],
    yearFirstUsed: 1965,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c0/M51-Isherman-latrun-1.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The M51 Isherman was an even more powerful upgrade of the Sherman tank, fitted with a large French 105mm gun that could destroy almost any Arab tank in 1967. The name 'Isherman' comes from combining 'Israel' and 'Sherman.' These clever upgrades helped Israel win the Six-Day War!",
    weightTons: 35,
    crewSize: 5,
  },

  {
    id: "m48-magach-3",
    name: "M48 Patton / Magach 3",
    altNames: ["Magach 3", "M48 Patton", "M48A2"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["six_day", "yom_kippur"],
    yearFirstUsed: 1965,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/M48-Patton-latrun-2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Israel called its M48 Patton tanks 'Magach,' which means 'battering ram' in Hebrew. These American tanks were secretly sold to Israel and then upgraded with better guns and engines. In the Six-Day War, Magach tanks led the charge through the Sinai Desert at incredible speed!",
    weightTons: 47,
    crewSize: 4,
  },

  // ===== SIX-DAY WAR 1967 — ARAB SIDE =====

  {
    id: "t34-egypt",
    name: "T-34/85",
    altNames: ["T-34", "T34/85"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["six_day", "yom_kippur"],
    yearFirstUsed: 1956,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d2/T-34-85_in_Kubinka_Tank_Museum.JPG",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The T-34 was the legendary Soviet tank that helped defeat Nazi Germany in World War II. Egypt received hundreds of them from the Soviet Union. However, by 1967, Israeli tanks with better guns could destroy them at longer range, and Israel captured over 200 of them during the Six-Day War!",
    weightTons: 32,
    crewSize: 5,
  },

  {
    id: "is3-egypt",
    name: "IS-3M",
    altNames: ["IS-3", "Josef Stalin 3", "Object 703"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["six_day"],
    yearFirstUsed: 1956,
    category: "heavy",
    categoryEnglish: "Heavy Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/IS3.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The IS-3 was so scary that when it first appeared in a victory parade in 1945, NATO generals completely panicked! Egypt used these powerful Soviet heavy tanks in 1967, but Israeli forces captured many of them. Today you can see captured IS-3 tanks displayed at Israeli memorials.",
    weightTons: 46,
    crewSize: 4,
  },

  {
    id: "su100-egypt",
    name: "SU-100",
    altNames: ["SU100"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["six_day", "yom_kippur"],
    yearFirstUsed: 1956,
    category: "tank_destroyer",
    categoryEnglish: "Tank Destroyer",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Su-100_-_TankBiathlon2013-07.jpg/960px-Su-100_-_TankBiathlon2013-07.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The SU-100 was a Soviet tank destroyer — a vehicle built to hunt and destroy enemy tanks. Unlike a regular tank, it had no rotating turret, which made it cheaper and lower to the ground. Egypt used hundreds of them, but Israeli tank crews learned to outflank them because the SU-100 could not turn its gun quickly.",
    weightTons: 31.6,
    crewSize: 4,
  },

  {
    id: "t54-egypt",
    name: "T-54",
    altNames: ["T54", "T-54A"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["six_day", "yom_kippur", "lebanon_1"],
    yearFirstUsed: 1956,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/T-54_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The T-54 was the most widely produced tank in history — the Soviet Union and its allies built over 100,000 of them! Egypt and Syria used T-54s in multiple wars against Israel. You can actually see captured T-54s on display right outside the main gate of the Israeli Tank Museum at Latrun.",
    weightTons: 36,
    crewSize: 4,
  },

  {
    id: "centurion-jordan",
    name: "Centurion",
    altNames: ["Centurion Mk 5", "FV4011"],
    side: "Jordan",
    sideFlag: "🇯🇴",
    wars: ["six_day"],
    yearFirstUsed: 1959,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Centurion_cfb_borden_1.JPG",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Jordan received British Centurion tanks and used them to defend the West Bank in 1967. In an unusual twist, both Israel AND Jordan were using Centurion tanks against each other in the Battle of Jerusalem! Israeli and Jordanian crews were fighting each other in almost identical machines.",
    weightTons: 52,
    crewSize: 4,
  },

  {
    id: "m48-jordan",
    name: "M48 Patton",
    altNames: ["M48", "M48A1"],
    side: "Jordan",
    sideFlag: "🇯🇴",
    wars: ["six_day"],
    yearFirstUsed: 1965,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/M48-Patton-latrun-2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Jordan bought American M48 Patton tanks to defend itself, but in 1967, Israeli forces destroyed or captured over 170 Jordanian tanks in just three days! It was one of the fastest defeats of an armored force in military history. Some captured Jordanian M48s were later used by the Israeli army.",
    weightTons: 47,
    crewSize: 4,
  },

  // ===== YOM KIPPUR WAR 1973 — ISRAEL SIDE =====

  {
    id: "centurion-shot-kal",
    name: "Centurion Shot Kal",
    altNames: ["Shot Kal", "Shot Kal Alef", "Centurion Mk 5/2"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["yom_kippur", "lebanon_1"],
    yearFirstUsed: 1970,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Centurion_cfb_borden_1.JPG",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Israel took the British Centurion and upgraded it with a new diesel engine and a powerful 105mm gun, calling it the 'Shot Kal.' In the Yom Kippur War, these tanks fought heroic defensive battles on the Golan Heights, where just 177 Israeli tanks held off over 1,400 Syrian tanks for two days!",
    weightTons: 52,
    crewSize: 4,
  },

  {
    id: "m60-magach-6",
    name: "M60 Patton / Magach 6",
    altNames: ["Magach 6", "M60", "M60A1"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["yom_kippur", "lebanon_1"],
    yearFirstUsed: 1971,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/M60-patton-latrun-2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The M60 Magach 6 was Israel's most modern tank at the start of the Yom Kippur War in 1973. When Egyptian forces crossed the Suez Canal in a surprise attack, Magach 6 tanks rushed to stop them. After the war, Israel added special armor packages to make the Magach even harder to destroy.",
    weightTons: 52,
    crewSize: 4,
  },

  // ===== YOM KIPPUR WAR 1973 — ARAB SIDE =====

  {
    id: "t55-syria",
    name: "T-55",
    altNames: ["T55", "T-55A"],
    side: "Syria",
    sideFlag: "🇸🇾",
    wars: ["yom_kippur", "lebanon_1"],
    yearFirstUsed: 1967,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/T-55_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The T-55 was an improved version of the T-54, with better armor and the first built-in protection against nuclear blasts! Syria used over 1,000 T-55 tanks when it attacked Israel on the Golan Heights in 1973. The battle was so fierce that the area was later called the 'Valley of Tears.'",
    weightTons: 36,
    crewSize: 4,
  },

  {
    id: "t62-egypt",
    name: "T-62",
    altNames: ["T62", "Object 166"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["yom_kippur", "lebanon_1"],
    yearFirstUsed: 1973,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/82/T-62_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The T-62 was the most advanced Soviet tank when it first appeared, featuring a powerful 115mm smoothbore gun — the first tank gun of this type ever used in combat! Egypt brought T-62s into the Yom Kippur War in 1973. Israel captured many T-62s and studied them closely to learn Soviet tank technology.",
    weightTons: 37,
    crewSize: 4,
  },

  {
    id: "pt76-egypt",
    name: "PT-76",
    altNames: ["PT76", "Object 740"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["yom_kippur"],
    yearFirstUsed: 1967,
    category: "amphibious",
    categoryEnglish: "Amphibious Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/PT-76_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The PT-76 is a Soviet amphibious tank that can swim across rivers and lakes! Egypt used PT-76s during the Suez Canal crossing in 1973 — they literally drove their tanks into the water and swam to the other side. It was a key part of Egypt's surprise attack that shocked the entire world.",
    weightTons: 14,
    crewSize: 3,
  },

  {
    id: "bmp1-syria",
    name: "BMP-1",
    altNames: ["BMP1", "Object 765"],
    side: "Syria",
    sideFlag: "🇸🇾",
    wars: ["yom_kippur", "lebanon_1"],
    yearFirstUsed: 1973,
    category: "light",
    categoryEnglish: "Light Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/BMP-1_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The BMP-1 was a revolutionary new type of vehicle — an infantry fighting vehicle that could carry soldiers AND fight alongside tanks at the same time. Syria used hundreds of BMP-1s in 1973. It was the first time the world saw this new kind of armored vehicle used in real combat on such a large scale.",
    weightTons: 13,
    crewSize: 3,
  },

  // ===== FIRST LEBANON WAR 1982 — ISRAEL SIDE =====

  {
    id: "merkava-mk1",
    name: "Merkava Mk.1",
    altNames: ["Merkava Mark 1", "Merkava I"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["lebanon_1"],
    yearFirstUsed: 1982,
    category: "heavy",
    categoryEnglish: "Heavy Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Merkava_I_latrun_1.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "The Merkava was designed entirely in Israel and is unlike any other tank in the world! Its engine is in the FRONT instead of the back — this protects the crew much better from enemy fire. The Merkava first saw real combat in Lebanon in 1982, and Israel has kept improving it ever since with new versions.",
    weightTons: 63,
    crewSize: 4,
  },

  // ===== FIRST LEBANON WAR 1982 — ARAB/SYRIA SIDE =====

  {
    id: "t72-syria",
    name: "T-72",
    altNames: ["T72", "Object 172M"],
    side: "Syria",
    sideFlag: "🇸🇾",
    wars: ["lebanon_1"],
    yearFirstUsed: 1982,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/T-72_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Syria's T-72 was one of the most powerful Soviet tanks ever built in the 1970s. In 1982, Israeli Merkava tanks destroyed over 80 Syrian T-72s in the Bekaa Valley — it was the largest tank battle since World War II! The battle proved that Israeli training and tactics could defeat even the newest Soviet equipment.",
    weightTons: 45,
    crewSize: 3,
  },

  {
    id: "t34-plo",
    name: "T-34/85",
    altNames: ["T-34", "T34/85"],
    side: "PLO",
    sideFlag: "🇵🇸",
    wars: ["lebanon_1"],
    yearFirstUsed: 1982,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d2/T-34-85_in_Kubinka_Tank_Museum.JPG",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "By 1982, the T-34 tank was almost 40 years old — but the PLO still used a small number of them in Lebanon! These World War II veterans were completely outdated against modern Israeli tanks. It shows how some armies held onto old equipment for decades because they had no budget to buy newer machines.",
    weightTons: 32,
    crewSize: 5,
  },

  // ===== ADDITIONAL TANKS — BROADER COVERAGE =====

  // T-55 for Egypt (Yom Kippur - Egypt also used T-55)
  {
    id: "t55-egypt",
    name: "T-55",
    altNames: ["T55", "T-55A"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["yom_kippur"],
    yearFirstUsed: 1967,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/T-55_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Egypt deployed thousands of T-55 tanks when crossing the Suez Canal in the Yom Kippur War in 1973. The surprise attack was so well-planned that it initially overwhelmed Israeli defenses. Egypt's use of anti-tank missiles alongside the T-55 changed how armies think about tank warfare forever.",
    weightTons: 36,
    crewSize: 4,
  },

  // T-62 for Syria (also used in Lebanon)
  {
    id: "t62-syria",
    name: "T-62",
    altNames: ["T62", "Object 166"],
    side: "Syria",
    sideFlag: "🇸🇾",
    wars: ["yom_kippur", "lebanon_1"],
    yearFirstUsed: 1973,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/82/T-62_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Syria used T-62 tanks in the massive assault on the Golan Heights in 1973. These tanks flooded across the border in huge numbers — at one point over 1,400 Syrian tanks were attacking a small group of just 177 Israeli tanks! The outnumbered Israeli crews fought so bravely that this battle is studied in military schools around the world.",
    weightTons: 37,
    crewSize: 4,
  },

  // BMP-1 Egypt (also used by Egypt in Yom Kippur)
  {
    id: "bmp1-egypt",
    name: "BMP-1",
    altNames: ["BMP1", "Object 765"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["yom_kippur"],
    yearFirstUsed: 1973,
    category: "light",
    categoryEnglish: "Light Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/BMP-1_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Egypt was one of the first countries in the Middle East to use the new BMP-1 infantry fighting vehicle in 1973. Egyptian soldiers used the BMP-1's built-in missile launcher to destroy Israeli tanks from a distance during the crossing of the Suez Canal. This new tactic was a big shock to Israeli commanders.",
    weightTons: 13,
    crewSize: 3,
  },

  // T-54 Syria (also used in Lebanon)
  {
    id: "t54-syria",
    name: "T-54",
    altNames: ["T54", "T-54A"],
    side: "Syria",
    sideFlag: "🇸🇾",
    wars: ["six_day", "yom_kippur", "lebanon_1"],
    yearFirstUsed: 1960,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/T-54_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Syria used T-54 tanks in three different wars against Israel! In the Six-Day War of 1967, Israel captured so many Syrian T-54s that they actually added some of them to the Israeli army. Captured enemy tanks are called 'war trophies,' and Israel became very skilled at quickly fixing and reusing them.",
    weightTons: 36,
    crewSize: 4,
  },

  // T-55 Lebanon/PLO (also used in Lebanon War)
  {
    id: "t55-lebanon",
    name: "T-55",
    altNames: ["T55", "T-55A"],
    side: "Syria",
    sideFlag: "🇸🇾",
    wars: ["lebanon_1"],
    yearFirstUsed: 1975,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/T-55_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Syrian T-55 tanks deployed to Lebanon were among the defenders when Israeli forces invaded in 1982. The fighting in the narrow streets of Lebanese cities was very different from open desert battles. Syrian T-55s were at a disadvantage in urban combat, where Israeli anti-tank teams could get close and attack from the sides.",
    weightTons: 36,
    crewSize: 4,
  },

  // SU-100 Syria
  {
    id: "su100-syria",
    name: "SU-100",
    altNames: ["SU100"],
    side: "Syria",
    sideFlag: "🇸🇾",
    wars: ["six_day"],
    yearFirstUsed: 1958,
    category: "tank_destroyer",
    categoryEnglish: "Tank Destroyer",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Su-100_-_TankBiathlon2013-07.jpg/960px-Su-100_-_TankBiathlon2013-07.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Syria used Soviet-supplied SU-100 tank destroyers to defend the Golan Heights in the Six-Day War of 1967. The SU-100's long 100mm gun was perfect for shooting at tanks from a hidden position. However, Israel's rapid advance was so fast that many SU-100s were captured before their crews could even fire a shot.",
    weightTons: 31.6,
    crewSize: 4,
  },

  // IS-3 Syria (Six-Day War)
  {
    id: "is3-syria",
    name: "IS-3M",
    altNames: ["IS-3", "Josef Stalin 3", "Object 703"],
    side: "Syria",
    sideFlag: "🇸🇾",
    wars: ["six_day"],
    yearFirstUsed: 1960,
    category: "heavy",
    categoryEnglish: "Heavy Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/IS3.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Syria also had some of the feared IS-3 heavy tanks when the Six-Day War started in 1967. The IS-3's thick curved armor made it very hard to destroy from the front. Israeli tank commanders had to use speed and clever tactics to get around the sides of IS-3s where the armor was thinner.",
    weightTons: 46,
    crewSize: 4,
  },

  // M60 Magach for Lebanon 1982 (Israel also used updated Magach in Lebanon)
  {
    id: "magach-6b-lebanon",
    name: "Magach 6B",
    altNames: ["M60A1 Magach", "Magach 6 Bet", "M60 ERA"],
    side: "Israel",
    sideFlag: "🇮🇱",
    wars: ["lebanon_1"],
    yearFirstUsed: 1982,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/M60-patton-latrun-2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "After the Yom Kippur War, Israel added special Blazer explosive reactive armor to the M60 Magach 6B — small armor blocks that explode OUTWARD when hit by a missile, pushing the blast away from the tank! This was the first time reactive armor was used in real combat in Lebanon in 1982, and it surprised and confused enemy anti-tank teams.",
    weightTons: 54,
    crewSize: 4,
  },

  // T-34/85 Egypt (Yom Kippur - some reserve Egyptian units still used T-34s)
  {
    id: "t34-egypt-yom",
    name: "T-34/85",
    altNames: ["T-34", "T34/85"],
    side: "Egypt",
    sideFlag: "🇪🇬",
    wars: ["independence", "six_day"],
    yearFirstUsed: 1948,
    category: "medium",
    categoryEnglish: "Medium Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d2/T-34-85_in_Kubinka_Tank_Museum.JPG",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Egypt was one of the first Middle Eastern countries to receive Soviet T-34 tanks, getting them in the early 1950s after World War II. Egyptian T-34s took part in battles during the 1948 War of Independence and the 1956 Sinai Campaign. These powerful tanks gave Egypt a big advantage over Israel's older and lighter armored vehicles at the time.",
    weightTons: 32,
    crewSize: 5,
  },

  // PT-76 Syria (also used by Syria)
  {
    id: "pt76-syria",
    name: "PT-76",
    altNames: ["PT76", "Object 740"],
    side: "Syria",
    sideFlag: "🇸🇾",
    wars: ["six_day", "yom_kippur"],
    yearFirstUsed: 1966,
    category: "amphibious",
    categoryEnglish: "Amphibious Tank",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/PT-76_latrun_2.jpg",
    imageCredit: "Wikimedia Commons / CC-BY-SA 3.0",
    funFactEnglish:
      "Syria used PT-76 amphibious tanks near the Sea of Galilee in the Six-Day War, hoping to cross water obstacles quickly. The PT-76's ability to float made it useful for river crossings, but its thin armor made it easy to destroy. Several Syrian PT-76s were captured by Israel and placed on permanent display at the Latrun tank museum.",
    weightTons: 14,
    crewSize: 3,
  },

];

// ===== HELPER FUNCTIONS =====

export function getTanksByWar(war: IsraelWarName): IsraelWarsTank[] {
  return ISRAEL_WARS_TANKS.filter(t => t.wars.includes(war));
}

export function getTanksBySide(side: IsraelWarSide): IsraelWarsTank[] {
  return ISRAEL_WARS_TANKS.filter(t => t.side === side);
}

export function getIsraelRandomWrongAnswers(correct: string, pool: string[], count: number): string[] {
  const seen = new Set([correct]);
  const result: string[] = [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  for (const item of shuffled) {
    if (!seen.has(item) && result.length < count) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}
