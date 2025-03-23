import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InstantUsername - Generate Unique Usernames Instantly',
  description: 'Generate unique, available usernames instantly for Instagram, Twitter, TikTok, Discord, Twitch, and more. Find the perfect username in seconds!',
  keywords: 'username generator, social media username, available usernames, instagram username, twitter username, tiktok username',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}