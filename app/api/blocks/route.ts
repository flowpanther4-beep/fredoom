
import { NextRequest, NextResponse } from 'next/server';
import { blocks } from '@/lib/data';

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status') || 'all';
  const list = status === 'all' ? blocks : blocks.filter(b => {
    if (status === 'approved') return b.status === 'approved';
    if (status === 'taken') return b.status !== 'available' && b.status !== 'rejected';
    return true;
  });
  return NextResponse.json(list);
}
