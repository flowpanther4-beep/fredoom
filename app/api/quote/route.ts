
import { NextRequest, NextResponse } from 'next/server';
import { zoneMultiplier } from '../../../lib/utils';

const BASE = 100; // $1 per grid unit (10x10) -> 100 cents

export async function POST(req: NextRequest) {
  const { x, y, w, h } = await req.json();
  const area = w * h;
  const price_cents = Math.round(BASE * area * zoneMultiplier(y,h));
  return NextResponse.json({ price_cents });
}
