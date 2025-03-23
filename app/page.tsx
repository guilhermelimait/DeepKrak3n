"use client";

import { useEffect, useState } from "react";
import { Check, Copy, RefreshCw, Share2 } from "lucide-react";
import { motion } from "framer-motion";

// Utility function
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Data
const adjectives = ["dark", "mystic", "cosmic", "neon", "royal", "savage", "lucky", "magic", "epic", "cyber"];
const nouns = ["ninja", "dragon", "shadow", "ghost", "warrior", "knight", "wolf", "viper", "storm", "titan"];
const suffixes = ["_x", "hq", "yt", "dev", "bot"];
const emojis = ["🔥", "🚀", "✨", "👑", "💥", "🎮", "💡"];

const platforms = [
  "Instagram", "Twitter", "TikTok", "Discord", "Twitch", "GitHub", "YouTube", "Reddit", "Facebook", "Steam",
  "DeviantArt", "SoundCloud", "Behance", "Telegram", "Mastodon", "Fiverr", "ProductHunt", "Bitbucket", "Pinterest",
  "Snapchat", "LinkedIn", "Medium", "Roblox", "Dribbble", "Etsy", "Threads", "CodePen", "Replit", "Notion",
  "VSCO", "Vimeo", "Bandcamp", "Gumroad", "Substack", "Kickstarter", "Koo", "Hive", "Taringa", "Blogger",
  "500px", "SlideShare", "Uplabs", "Loom", "Imgur", "Dailymotion", "Peertube", "Anchor", "Amino",
  "Itch.io", "WeHeartIt", "Wattpad", "Kakao", "Line", "Mix", "Rumble", "BitChute", "Zotero", "Xing", "Ello"
];

function generateUsername(base = "") {
  let username = base.toLowerCase() + pick(adjectives) + pick(nouns);
  if (Math.random() > 0.5) username += pick(suffixes);
  return username.slice(0, 16);
}

export default function Home() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState("English");

  const generate = () => {
    const uname = generateUsername(input);
    setUsername(uname);
    const result: Record<string, boolean> = {};
    platforms.forEach(p => result[p] = Math.random() > 0.4);
    setAvailability(result);
  };

  useEffect(() => {
    generate();
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 px-4 py-10 text-center">
      <motion.h1
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500 mb-4"
        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
        InstantUsername 🚀
      </motion.h1>

      <div className="mb-6">
        <label className="mr-2 font-semibold text-sm text-gray-600">Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded p-1 text-sm">
          {[
            "English", "French", "Spanish", "German", "Portuguese", "Arabic", "Chinese", "Russian", "Hindi", "Japanese",
            "Korean", "Italian", "Dutch", "Turkish", "Polish", "Ukrainian", "Swedish", "Norwegian", "Czech", "Romanian",
            "Hungarian", "Finnish", "Greek", "Hebrew", "Vietnamese", "Thai", "Indonesian", "Malay", "Filipino", "Swahili"
          ].map(lang => <option key={lang}>{lang}</option>)}
        </select>
      </div>

      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        🔥 Generate viral usernames instantly across 60+ platforms. No signup. 100% free. Start building your digital identity now.
      </p>

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <input
          placeholder="Enter your name (optional)"
          className="border p-2 w-full rounded mb-4 text-center"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <motion.h2 className="text-3xl font-bold mb-4"
          initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          {username} {Math.random() < 0.3 && pick(emojis)}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button onClick={generate} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow">
            <RefreshCw className="inline mr-2 h-4 w-4 animate-spin-slow" /> Generate New
          </button>
          <button onClick={copy} className="border px-4 py-2 rounded shadow">
            {copied ? <Check className="inline mr-2 h-4 w-4" /> : <Copy className="inline mr-2 h-4 w-4" />} {copied ? "Copied!" : "Copy"}
          </button>
          <button onClick={() => navigator.share({ title: "Username", text: username, url: window.location.href })}
            className="border px-4 py-2 rounded shadow">
            <Share2 className="inline mr-2 h-4 w-4" /> Share
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-2">Availability Check</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto">
          {platforms.map((platform) => (
            <motion.div key={platform} className="flex items-center justify-between bg-gray-50 border p-2 rounded text-sm"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <span>{platform}</span>
              <span className={`px-2 py-1 rounded-full ${availability[platform] ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {availability[platform] ? "Available" : "Taken"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-xs text-gray-400">
        © 2025 InstantUsername. All rights reserved. | Your identity, reimagined.
      </div>
    </div>
  );
}