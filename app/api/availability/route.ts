
import { NextRequest, NextResponse } from 'next/server';
import { blocks } from '@/lib/data';
import { isOverlapping } from '@/lib/geometry';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { x, y, w, h } = body as { x:number; y:number; w:number; h:number };
  const conflicts = blocks.filter(b => isOverlapping(b, {x,y,w,h}) && b.status !== 'rejected').map(b => b.id);
  return NextResponse.json({ ok: conflicts.length === 0, conflicts });
}
