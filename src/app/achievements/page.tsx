"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ACHIEVEMENTS } from "@/lib/content/achievements";
import { getUnlockedIds } from "@/lib/storage/achievements";

export default function AchievementsPage() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

  useEffect(() => {
    setUnlockedIds(getUnlockedIds());
  }, []);

  const unlockedSet = new Set(unlockedIds);
  const unlockedCount = ACHIEVEMENTS.filter((a) => unlockedSet.has(a.id)).length;
  const total = ACHIEVEMENTS.length;

  const categories = [
    { id: "learning", label: "למידה", icon: "📚" },
    { id: "streak",   label: "רצפים", icon: "🔥" },
    { id: "skills",   label: "מיומנויות", icon: "⚡" },
    { id: "points",   label: "נקודות", icon: "🏆" },
  ] as const;

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-white pb-20" dir="rtl">
      {/* Nav */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 text-xl p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="חזרה"
        >
          ←
        </Link>
        <h1 className="text-xl font-extrabold text-amber-600 flex items-center gap-2">
          🏆 ההישגים שלי
        </h1>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {/* Summary card */}
        <div className="bg-gradient-to-l from-amber-500 to-orange-500 rounded-3xl p-6 text-white shadow-xl text-center">
          <p className="text-white/80 text-sm mb-1">פתחת</p>
          <p className="text-6xl font-extrabold">{unlockedCount}</p>
          <p className="text-white/80 text-lg">מתוך {total} הישגים</p>
          <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-3 rounded-full transition-all duration-700"
              style={{ width: `${Math.round((unlockedCount / total) * 100)}%` }}
            />
          </div>
        </div>

        {/* Achievements by category */}
        {categories.map((cat) => {
          const items = ACHIEVEMENTS.filter((a) => a.category === cat.id);
          return (
            <div key={cat.id}>
              <h3 className="font-extrabold text-gray-700 text-base mb-3 flex items-center gap-2">
                <span>{cat.icon}</span> {cat.label}
              </h3>
              <div className="space-y-2.5">
                {items.map((a) => {
                  const unlocked = unlockedSet.has(a.id);
                  return (
                    <div
                      key={a.id}
                      className={`flex items-center gap-4 rounded-2xl p-4 border-2 transition-all ${
                        unlocked
                          ? "bg-gradient-to-l from-yellow-50 to-amber-50 border-yellow-300 shadow-md"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span
                        className="text-4xl flex-shrink-0"
                        style={{ filter: unlocked ? "none" : "grayscale(1) opacity(0.4)" }}
                      >
                        {a.icon}
                      </span>
                      <div className="flex-1">
                        <p className={`font-extrabold ${unlocked ? "text-gray-800" : "text-gray-400"}`}>
                          {a.title_he}
                        </p>
                        <p className="text-sm text-gray-500">{a.description_he}</p>
                      </div>
                      {unlocked && (
                        <span className="text-green-500 text-2xl flex-shrink-0">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
