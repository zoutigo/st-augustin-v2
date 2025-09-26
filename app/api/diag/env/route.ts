/*
  Debug endpoint (safe subset of env). Remove after troubleshooting.
*/
import { NextResponse } from 'next/server';

const redact = (value?: string | null, keep: number = 3) => {
  if (!value) return null;
  if (value.length <= keep) return '*'.repeat(value.length);
  return `${value.slice(0, keep)}${'*'.repeat(Math.max(0, value.length - keep - 2))}${value.slice(-2)}`;
};

export async function GET() {
  // Attempt to parse DB URL safely to avoid leaking secrets
  const dbUrl = process.env.DATABASE_URL || '';
  let dbInfo: Record<string, string | null> | null = null;
  try {
    const u = new URL(dbUrl);
    dbInfo = {
      protocol: u.protocol.replace(':', ''),
      host: u.hostname,
      port: u.port || null,
      database: u.pathname.replace(/^\//, '') || null,
      user: u.username ? redact(u.username) : null,
    };
  } catch {
    dbInfo = null;
  }

  const payload = {
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV || null,
    port: process.env.PORT || null,
    nextauthUrl: process.env.NEXTAUTH_URL || null,
    authUrl: process.env.AUTH_URL || null,
    authTrustHost: process.env.AUTH_TRUST_HOST || null,
    // show if secrets exist but redact values
    hasNextAuthSecret: Boolean(process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET),
    externalUploadDir: process.env.EXTERNAL_UPLOAD_DIR || null,
    email:
      process.env.EMAIL_SERVER_USER_YAHOO || process.env.EMAIL_FROM_YAHOO
        ? {
            user: redact(process.env.EMAIL_SERVER_USER_YAHOO || null),
            from: process.env.EMAIL_FROM_YAHOO || null,
            host: process.env.EMAIL_SERVER_HOST_YAHOO || null,
            port: process.env.EMAIL_SERVER_PORT_YAHOO || null,
          }
        : null,
    database: dbInfo,
  };

  return NextResponse.json(payload);
}

