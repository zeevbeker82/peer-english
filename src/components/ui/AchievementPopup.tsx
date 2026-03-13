"use client";
import type { Achievement } from "@/lib/content/achievements";

interface Props {
  achievements: Achievement[];
  onClose: () => void;
}

export function AchievementPopup({ achievements, onClose }: Props) {
  if (achievements.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-6 mx-4 max-w-sm w-full animate-achievement"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-5">
          <div className="text-5xl mb-2 animate-star">🎊</div>
          <h2 className="text-2xl font-extrabold text-gray-800">הישג חדש!</h2>
          {achievements.length > 1 && (
            <p className="text-sm text-gray-500 mt-1">פתחת {achievements.length} הישגים בבת אחת!</p>
          )}
        </div>

        {/* Achievement list */}
        <div className="space-y-3 mb-5">
          {achievements.map((a, i) => (
            <div
              key={a.id}
              className="flex items-center gap-4 bg-gradient-to-l from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl p-4"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-4xl flex-shrink-0">{a.icon}</span>
              <div>
                <p className="font-extrabold text-gray-800 text-lg">{a.title_he}</p>
                <p className="text-sm text-gray-500">{a.description_he}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-l from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-2xl text-lg hover:opacity-90 transition-opacity active:scale-95"
        >
          מדהים! 🌟
        </button>
      </div>
    </div>
  );
}
