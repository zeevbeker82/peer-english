import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "פאר - לימוד אנגלית | כיתה ה'",
  description: "אפליקציה ללימוד עצמי של אנגלית לתלמידי כיתה ה' - A1 level",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-sky-50 min-h-screen font-sans">{children}</body>
    </html>
  );
}
