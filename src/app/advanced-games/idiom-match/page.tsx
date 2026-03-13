"use client";

import { useState } from "react";
import Link from "next/link";
import { IDIOM_PAIRS, IdiomPair, GameDifficulty } from "@/lib/content/advanced-games";
import { saveScore, getScore } from "@/lib/storage/advanced-games";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";

const GAME_ID = "idiom-match";
const XP_CORRECT = 8;
const XP_WRONG   = -2;
const XP_PERFECT = 20;

type Phase = "select" | "playing" | "results";

interface MatchResult { correct: number; wrong: number; totalXP: number; idioms: IdiomPair[]; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
}

// ─────────────────────────────────────────────────────────────────────────────
// Select view
// ─────────────────────────────────────────────────────────────────────────────
function SelectView({ onStart }: { onStart: (d: GameDifficulty) => void }) {
  const diffs: { d: GameDifficulty; label: string; desc: string }[] = [
    { d:"easy",   label:"קל",     desc:"5 ביטויים נפוצים לגמרי" },
    { d:"medium", label:"בינוני", desc:"5 ביטויים ידועים" },
    { d:"hard",   label:"קשה",    desc:"5 ביטויים מתקדמים" },
  ];
  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <div className="text-6xl mb-3">🎯</div>
      <h1 className="text-3xl font-bold mb-1">התאמת ביטויים</h1>
      <p className="text-gray-500 mb-2 text-sm">בחר ביטוי אחר כך בחר את המשמעות שלו!</p>
      <p className="text-xs text-gray-400 mb-8">+{XP_CORRECT} XP נכון · {XP_WRONG} XP טעות · +{XP_PERFECT} בונוס מושלם</p>
      <div className="space-y-3">
        {diffs.map(({ d, label, desc }) => {
          const s = getScore(GAME_ID, d);
          return (
            <button key={d} onClick={() => onStart(d)}
              className="w-full p-4 rounded-2xl border-2 border-pink-200 bg-pink-50 text-pink-800 flex items-center justify-between hover:bg-pink-100 transition">
              <div className="text-right">
                <p className="font-bold">🎯 {label}</p>
                <p className="text-xs opacity-70">{desc}</p>
              </div>
              {s.highScore > 0 && (
                <div className="text-xs text-right opacity-70">
                  <div className="font-bold">🏆 {s.highScore} XP</div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <Link href="/advanced-games" className="mt-6 inline-block text-sm text-gray-400">← חזרה</Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Playing view — click idiom then click meaning
// ─────────────────────────────────────────────────────────────────────────────
function PlayingView({ difficulty, onDone }: {
  difficulty: GameDifficulty;
  onDone: (result: MatchResult) => void;
}) {
  const idioms = IDIOM_PAIRS.filter((p) => p.difficulty === difficulty);
  const shuffledMeanings = shuffle(idioms.map((p) => ({ id: p.id, meaning: p.meaning_he })));

  const [selectedIdiom, setSelectedIdiom] = useState<string | null>(null);
  const [matched, setMatched]             = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair]         = useState<{ idiomId: string; meaningId: string } | null>(null);
  const [score, setScore]                 = useState(0);
  const [wrongCount, setWrongCount]       = useState(0);
  const [flash, setFlash]                 = useState<"good" | "bad" | null>(null);
  const [lastIdiom, setLastIdiom]         = useState<IdiomPair | null>(null);

  function handleIdiomClick(id: string) {
    if (matched.has(id)) return;
    setSelectedIdiom(id === selectedIdiom ? null : id);
    setWrongPair(null);
  }

  function handleMeaningClick(id: string) {
    if (!selectedIdiom) return;
    if (matched.has(id)) return;

    if (selectedIdiom === id) {
      // Correct match!
      const newScore = score + XP_CORRECT;
      const newMatched = new Set([...matched, id]);
      setMatched(newMatched);
      setScore(newScore);
      setFlash("good");
      setLastIdiom(idioms.find((p) => p.id === id)!);
      setSelectedIdiom(null);
      setTimeout(() => setFlash(null), 800);

      // All matched?
      if (newMatched.size === idioms.length) {
        const perfect = wrongCount === 0;
        const total = Math.max(0, newScore + (perfect ? XP_PERFECT : 0));
        setTimeout(() => onDone({ correct: newMatched.size, wrong: wrongCount, totalXP: total, idioms }), 600);
      }
    } else {
      // Wrong match
      setWrongPair({ idiomId: selectedIdiom, meaningId: id });
      setWrongCount((n) => n + 1);
      setScore((s) => Math.max(0, s + XP_WRONG));
      setFlash("bad");
      setTimeout(() => {
        setWrongPair(null);
        setSelectedIdiom(null);
        setFlash(null);
      }, 1000);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-4">
      {/* Score & progress */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          ✓ {matched.size} / {idioms.length} התאמות
        </div>
        <div className={`font-bold text-lg transition-colors ${flash === "good" ? "text-green-600" : flash === "bad" ? "text-red-500" : "text-pink-600"}`}>
          {score} XP
        </div>
        <div className="text-sm text-gray-400">✗ {wrongCount} טעויות</div>
      </div>

      {/* Last match hint */}
      {lastIdiom && flash === "good" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-2 mb-3 text-xs text-center text-green-700">
          ✓ <span dir="ltr">{lastIdiom.idiom}</span> — {lastIdiom.example}
        </div>
      )}

      {/* Instructions */}
      <p className="text-center text-xs text-gray-400 mb-3">
        {selectedIdiom
          ? "✅ עכשיו בחר את המשמעות הנכונה →"
          : "← בחר קודם ביטוי אנגלי"}
      </p>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left: idioms */}
        <div className="space-y-2">
          <p className="text-xs text-center font-bold text-gray-500 mb-1">ביטויים 🇬🇧</p>
          {idioms.map((p) => {
            const isMatched  = matched.has(p.id);
            const isSelected = selectedIdiom === p.id;
            const isWrong    = wrongPair?.idiomId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleIdiomClick(p.id)}
                disabled={isMatched}
                className={`w-full p-3 rounded-xl text-sm font-medium text-left transition-all ${
                  isMatched   ? "bg-green-100 text-green-700 opacity-60 cursor-default" :
                  isSelected  ? "bg-pink-500 text-white shadow-lg scale-[1.02]" :
                  isWrong     ? "bg-red-100 text-red-700" :
                               "bg-white border border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                }`}
                dir="ltr"
              >
                {isMatched ? "✓ " : ""}{p.idiom}
              </button>
            );
          })}
        </div>

        {/* Right: shuffled meanings */}
        <div className="space-y-2">
          <p className="text-xs text-center font-bold text-gray-500 mb-1">משמעויות 🇮🇱</p>
          {shuffledMeanings.map((m) => {
            const isMatched = matched.has(m.id);
            const isWrong   = wrongPair?.meaningId === m.id;
            const isTarget  = selectedIdiom !== null && !isMatched;
            return (
              <button
                key={m.id}
                onClick={() => handleMeaningClick(m.id)}
                disabled={isMatched || !selectedIdiom}
                className={`w-full p-3 rounded-xl text-sm font-medium text-right transition-all ${
                  isMatched   ? "bg-green-100 text-green-700 opacity-60 cursor-default" :
                  isWrong     ? "bg-red-100 text-red-700 ring-2 ring-red-400" :
                  isTarget    ? "bg-white border-2 border-pink-300 hover:bg-pink-50 hover:border-pink-400" :
                               "bg-white border border-gray-200 opacity-50 cursor-not-allowed"
                }`}
              >
                {isMatched ? "✓ " : ""}{m.meaning}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Results view
// ─────────────────────────────────────────────────────────────────────────────
function ResultsView({ result, onPlay }: { result: MatchResult; onPlay: () => void }) {
  const { correct, wrong, totalXP, idioms } = result;
  const perfect = wrong === 0;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className={`rounded-3xl p-6 text-white text-center mb-5 ${perfect ? "bg-gradient-to-br from-pink-500 to-fuchsia-600" : "bg-gradient-to-br from-gray-500 to-gray-600"}`}>
        <div className="text-5xl mb-2">{perfect ? "🎯" : "🎲"}</div>
        <h2 className="text-2xl font-bold">{perfect ? "ציון מושלם!" : "סיבוב הסתיים"}</h2>
        <div className="text-4xl font-bold mt-2">+{totalXP} XP</div>
        <div className="flex justify-center gap-4 mt-3 text-sm text-white/80">
          <span>✓ {correct}/{idioms.length}</span>
          {wrong > 0 && <span>✗ {wrong} טעויות</span>}
          {perfect && <span className="text-yellow-300 font-bold">+{XP_PERFECT} בונוס!</span>}
        </div>
      </div>

      {/* All idioms review */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <h3 className="font-bold text-gray-700 mb-3 text-sm">כל הביטויים:</h3>
        <div className="space-y-3">
          {idioms.map((p) => (
            <div key={p.id} className="border-b border-gray-50 pb-2 last:border-0">
              <p className="font-bold text-gray-800 text-sm" dir="ltr">"{p.idiom}"</p>
              <p className="text-pink-600 text-sm">{p.meaning_he}</p>
              <p className="text-gray-400 text-xs italic" dir="ltr">{p.example}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onPlay} className="w-full py-3 rounded-2xl bg-pink-500 text-white font-bold hover:bg-pink-600 transition mb-3">שחק שוב 🔄</button>
      <Link href="/advanced-games" className="block text-center text-sm text-gray-400 hover:text-gray-600">← חזרה למשחקים</Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export default function IdiomMatchPage() {
  const { addPoints } = useProgress();
  const { checkAndUnlock } = useAchievements();
  const [phase, setPhase] = useState<Phase>("select");
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy");
  const [result, setResult] = useState<MatchResult | null>(null);

  function handleDone(r: MatchResult) {
    saveScore(GAME_ID, difficulty, r.totalXP);
    addPoints(r.totalXP);
    checkAndUnlock();
    setResult(r);
    setPhase("results");
  }

  return (
    <div className="min-h-screen bg-pink-50" dir="rtl">
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link href="/advanced-games" className="text-gray-500 text-sm">← משחקים</Link>
        <h1 className="font-bold text-sm">🎯 התאמת ביטויים</h1>
        <span />
      </nav>
      {phase === "select" && <SelectView onStart={(d) => { setDifficulty(d); setPhase("playing"); }} />}
      {phase === "playing" && <PlayingView key={Date.now()} difficulty={difficulty} onDone={handleDone} />}
      {phase === "results" && result && <ResultsView result={result} onPlay={() => setPhase("playing")} />}
    </div>
  );
}
