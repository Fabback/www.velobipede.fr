import "server-only";

import { NextRequest, NextResponse } from "next/server";

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // CHANGE THIS TO YOUR DOMAIN
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type",
};

const createResponse = (
  body: { success: boolean; error: string },
  status = 200,
) =>
  NextResponse.json(body, {
    status,
    headers: CORS_HEADERS,
  });

const handle_request = async (request: NextRequest): Promise<NextResponse> => {
  if (request.method === "OPTIONS") {
    return NextResponse.json(null, { headers: CORS_HEADERS });
  }

  if (request.method !== "POST") {
    return createResponse({ success: false, error: "Method Not Allowed" }, 405);
  }

  try {
    const { "cf-turnstile-response": token } = await request.json();
    const ip = request.headers.get("CF-Connecting-IP") || "";

    if (!token) {
      return createResponse({ success: false, error: "Token missing" }, 400);
    }

    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_WIGDET_SECRET,
          response: token,
          remoteip: ip,
        }),
      },
    );

    const outcome = await verificationResponse.json();
    return createResponse(outcome, outcome.success ? 200 : 400);
  } catch (error) {
    console.error("Error:", error);
    return createResponse(
      { success: false, error: "Internal Server Error" },
      500,
    );
  }
};

export {
  handle_request as GET,
  handle_request as POST,
  handle_request as OPTIONS,
};
