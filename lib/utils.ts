
export function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function zoneMultiplier(y: number, h: number) {
  const midY = y + h / 2;
  if (midY < 200) return 1.4;        // top
  if (midY >= 350 && midY <= 650) return 1.2; // center
  return 1.0;                         // rest
}

export function px(n: number) { return `${n * 10}px`; } // grid unit to px
