import crypto from "crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "nssolutions_admin_session";

function getSecretKey(): string {
  return (
    process.env.ADMIN_SECRET_KEY ||
    "nssolutions-secret-encryption-master-key-2026-very-secure"
  );
}

function getExpectedAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "nssolutions2026";
}

/**
 * Creates a deterministic, tamper-proof session token based on password + secret
 */
export function generateAdminSessionToken(): string {
  const secret = getSecretKey();
  const password = getExpectedAdminPassword();
  return crypto
    .createHmac("sha256", secret)
    .update(`admin-authenticated-session:${password}`)
    .digest("hex");
}

/**
 * Validates a submitted password against environment configuration
 */
export function verifyAdminPassword(password: string): boolean {
  const expected = getExpectedAdminPassword();
  if (!password) return false;
  
  // Timing-safe comparison to prevent side-channel timing attacks
  const bufExpected = Buffer.from(expected);
  const bufActual = Buffer.from(password);
  
  if (bufExpected.length !== bufActual.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(bufExpected, bufActual);
}

/**
 * Checks if the incoming request has a valid admin session cookie
 */
export async function isAuthenticatedAdmin(request?: NextRequest): Promise<boolean> {
  const expectedToken = generateAdminSessionToken();

  // Try checking from request cookies first
  if (request) {
    const cookieToken = request.cookies.get(COOKIE_NAME)?.value;
    if (cookieToken && cookieToken === expectedToken) {
      return true;
    }
  }

  // Fallback to Next.js headers cookies()
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return token === expectedToken;
  } catch {
    return false;
  }
}

/**
 * Sets the admin session cookie on the response
 */
export async function setAdminSessionCookie() {
  const cookieStore = await cookies();
  const token = generateAdminSessionToken();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Removes the admin session cookie
 */
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
