import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50" dir="rtl">
      <div className="text-center">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">הדף לא נמצא</h2>
        <p className="text-gray-500 mb-6">נראה שהלכת לאיבוד!</p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors"
        >
          🏠 חזרה לבית
        </Link>
      </div>
    </div>
  );
}
