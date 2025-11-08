
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { draft } = await req.json();
  // Placeholder: in a real app create a Stripe Checkout and return session.url
  // We will redirect to /checkout-mock and pass a temporary id in the query
  return NextResponse.json({ url: "/checkout-mock" });
}
