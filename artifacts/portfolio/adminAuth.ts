import type { IncomingMessage } from "node:http";
import crypto from "node:crypto";

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

function sessionSecret(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return "";
  return process.env.ADMIN_SESSION_SECRET ?? password;
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;

  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string | null {
  const secret = sessionSecret();
  if (!secret) return null;

  const payload = { exp: Date.now() + TOKEN_TTL_MS };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64url");
  return `${data}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  const secret = sessionSecret();
  if (!secret) return false;

  const dot = token.indexOf(".");
  if (dot === -1) return false;

  const data = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!data || !sig) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64url");

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString("utf8"),
    ) as { exp: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

function bearerToken(req: IncomingMessage): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7).trim() || null;
}

export function isAuthorized(req: IncomingMessage): boolean {
  if (!isAdminConfigured()) return false;
  const token = bearerToken(req);
  return token !== null && verifySessionToken(token);
}

export function isMutatingMethod(method: string | undefined): boolean {
  return method === "POST" || method === "PUT" || method === "DELETE";
}
