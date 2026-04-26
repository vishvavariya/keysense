import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KeySense",
  description:
    "Explore real keyboards digitally. See, press, and hear keyboards from Apple, Logitech, and Keychron, then compare specs and test your typing speed.",
  keywords: [
    "keyboard simulator",
    "mechanical keyboard",
    "typing test",
    "keyboard comparison",
    "keychron",
    "logitech",
  ],
  other: {
    codescissor: "cs_keysensenetlifya_a23080ac9bb99e7bc7aa96a39721ae72",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
