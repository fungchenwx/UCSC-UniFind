import { NextResponse } from 'next/server';

export async function POST(req) {
  const { tip } = await req.json();

  // Placeholder for AI API call
  const summary = `Summary of: ${tip}`;

  return NextResponse.json({ summary });
}
