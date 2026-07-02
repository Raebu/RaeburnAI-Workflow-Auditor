import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const hasProvider = Boolean(process.env.OPENAI_API_KEY);

  return NextResponse.json({
    status: 'ready',
    checks: {
      aiProviderConfigured: hasProvider,
      fallbackAuditorAvailable: true
    },
    timestamp: new Date().toISOString()
  });
}
