
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Here you'd create a Stripe Checkout session with the draft payload
  // and return the session.url. This is a mock placeholder.
  const { draft } = await req.json();
  // TODO: connect Stripe and use real webhook to mark paid -> approved
  return NextResponse.json({ url: "/checkout-mock" });
}
