import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import '../styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kindred — Intergenerational Skill & Wisdom Exchange',
  description: 'Connecting elder masters and wisdom keepers with modern apprentices and younger learners.',
  openGraph: {
    title: 'Kindred — Intergenerational Skill & Wisdom Exchange',
    description: 'Connecting elder masters and wisdom keepers with modern apprentices and younger learners.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#F7F1E6] text-[#2F4131] min-h-screen">
        {children}
      </body>
    </html>
  );
}
