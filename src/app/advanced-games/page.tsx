"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GAMES, GameMeta } from "@/lib/content/advanced-games";
import { getBestScore, getTotalGamesPlayed } from "@/lib/storage/advanced-games";

// ─────────────────────────────────────────────────────────────────────────────
// Game card
// ─────────────────────────────────────────────────────────────────────────────
function GameCard({ game, bestScore }: { game: GameMeta; bestScore: number }) {
  const pct = Math.min(100, Math.round((bestScore / game.maxXP) * 100));

  return (
    <Link href={game.path}>
      <div className={`bg-gradient-to-br ${game.color} rounded-3xl p-5 text-white shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-150 cursor-pointer`}>
        <div className="text-4xl mb-2">{game.icon}</div>
        <h3 className="font-extrabold text-base leading-tight">{game.title_he}</h3>
        <p className="text-white/70 text-xs mt-1 mb-3 leading-snug">{game.desc_he}</p>

        {/* High score bar */}
        {bestScore > 0 ? (
          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>🏆 {bestScore} XP</span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/70 rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-white/50 text-xs">טרם שוחק →</div>
        )}
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main hub page
// ─────────────────────────────────────────────────────────────────────────────
export default function AdvancedGamesHub() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [totalPlayed, setTotalPlayed] = useState(0);

  useEffect(() => {
    const s: Record<string, number> = {};
    GAMES.forEach((g) => { s[g.id] = getBestScore(g.id); });
    setScores(s);
    setTotalPlayed(getTotalGamesPlayed());
  }, []);

  const gamesWithScore = GAMES.filter((g) => scores[g.id] > 0).length;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link href="/" className="text-gray-500 text-sm">← דף הבית</Link>
        <h1 className="font-bold text-gray-900 text-sm">🎮 משחקים מתקדמים</h1>
        <span className="text-xs text-gray-400">{gamesWithScore}/{GAMES.length}</span>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="text-5xl mb-2">🎮</div>
          <h1 className="text-2xl font-bold text-gray-900">משחקים מתקדמים</h1>
          <p className="text-gray-500 text-sm mt-1">6 משחקים · רמות Easy / Medium / Hard · ניקוד אישי</p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center">
            <div className="font-bold text-xl text-gray-800">{gamesWithScore}</div>
            <div className="text-xs text-gray-500">משחקים שנוסו</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center">
            <div className="font-bold text-xl text-amber-600">{totalPlayed}</div>
            <div className="text-xs text-gray-500">סיבובים</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center">
            <div className="font-bold text-xl text-purple-600">
              {Object.values(scores).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-xs text-gray-500">XP סה"כ</div>
          </div>
        </div>

        {/* Game grid */}
        <div className="grid grid-cols-2 gap-4">
          {GAMES.map((game) => (
            <GameCard key={game.id} game={game} bestScore={scores[game.id] ?? 0} />
          ))}
        </div>

        {/* Back */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition">← חזרה לדף הבית</Link>
        </div>
      </div>
    </div>
  );
}
