
import type { Block } from './types';
import { isOverlapping } from './geometry';

// Deterministic pseudo-random for consistent seeds
let seed = 20251107;
function rnd() { seed ^= seed << 13; seed ^= seed >> 17; seed ^= seed << 5; return Math.abs(seed); }
function rand(min:number, max:number) { return min + (rnd() % (max - min + 1)); }

const MURAL_SIZE = 100; // 1000px / 10px per unit

const slogans = [
  "AVAILABLE NOW", "RESERVE YOUR NAME", "GET YOUR LOGO HERE",
  "RESERVE YOUR PROFILE", "ADD YOUR SIGNATURE", "JOIN THE WALL"
];

const colors = ["#ef4444","#3b82f6","#10b981","#06b6d4","#f59e0b","#8b5cf6","#ec4899","#22c55e"];
const fg = "#000000";

const presets = [
  [6,4],[8,8],[12,8],[20,10],[10,6],[6,6]
];

export const blocks: Block[] = [];

// Place ~150 taken blocks
for (let i=0;i<150;i++) {
  const [w,h] = presets[rand(0, presets.length-1)];
  for (let tries=0; tries<200; tries++) {
    const x = rand(0, MURAL_SIZE - w);
    const y = rand(0, MURAL_SIZE - h);
    const candidate = { x,y,w,h };
    if (!blocks.some(b => isOverlapping(b, candidate))) {
      blocks.push({
        id: `b${i}`,
        x,y,w,h,
        kind: (["brand","name","profile","ad"] as const)[rand(0,3)],
        title: `Brand ${i+1}`,
        text: i % 3 === 0 ? "Great product & services" : undefined,
        href: "https://example.com",
        img_url: (i % 2 === 0) ? `https://placehold.co/${w*10}x${h*10}/png?text=Brand+${i+1}` : undefined,
        theme_bg: colors[rand(0, colors.length-1)],
        theme_fg: fg,
        status: (["reserved","paid","approved"] as const)[rand(0,2)],
        category: (["tech","food","fashion","services","creator","other"] as const)[rand(0,5)]
      });
      break;
    }
  }
}

// Add ~40 available callouts
for (let i=0;i<40;i++) {
  const [w,h] = presets[rand(0, presets.length-1)];
  for (let tries=0; tries<200; tries++) {
    const x = rand(0, MURAL_SIZE - w);
    const y = rand(0, MURAL_SIZE - h);
    const candidate = { x,y,w,h };
    if (!blocks.some(b => isOverlapping(b, candidate))) {
      const s = slogans[rand(0, slogans.length-1)];
      blocks.push({
        id: `a${i}`,
        x,y,w,h,
        kind: "ad",
        title: s,
        text: s,
        theme_bg: "#ffffff",
        theme_fg: "#000000",
        status: "available",
        category: "other"
      });
      break;
    }
  }
}

export const MURAL_UNITS = MURAL_SIZE;
