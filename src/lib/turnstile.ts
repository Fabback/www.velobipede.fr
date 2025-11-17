import "server-only";

import { validateTurnstileToken } from "next-turnstile";

export async function validateToken(token: string) {
  try {
    const result = await validateTurnstileToken({
      token,
      secretKey: process.env.TURNSTILE_WIGDET_SECRET ?? "MISSING",
    });

    if (result.success) {
      // Token is valid
      return true;
    }
  } catch (error) {
    console.error("Validation failed:", error);
  }
  return false;
}
