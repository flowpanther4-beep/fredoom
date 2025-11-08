
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Space™ – 1,000,000 pixels – $1 per pixel",
  description: "Reserve your name worldwide! The modern Million Dollar Homepage.",
  openGraph: {
    title: "Brand Space™",
    description: "Reserve your name worldwide!",
    url: "https://brand-space.vercel.app",
    siteName: "Brand Space™",
    images: [{ url: "https://placehold.co/1200x630/png?text=Brand+Space%E2%84%A2" }],
    type: "website"
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
