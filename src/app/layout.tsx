import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritam Reviews Dashboard",
  description: "Unified review intelligence for hotel managers in India"
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jakarta.variable} min-h-screen bg-gradient-to-br from-[#eef3ff] via-white to-[#f8fbff] font-sans`}>
        {children}
      </body>
    </html>
  );
}
