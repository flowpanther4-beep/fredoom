
import type { Block } from './types';

/** Axis-Aligned Bounding Box overlap */
export function isOverlapping(a: Pick<Block, 'x'|'y'|'w'|'h'>, b: Pick<Block, 'x'|'y'|'w'|'h'>) {
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
}
