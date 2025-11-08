
import { NextRequest, NextResponse } from 'next/server';

export async function POST(_req: NextRequest) {
  // Placeholder: verify signature & update DB (paid->approved)
  return NextResponse.json({ received: true });
}
