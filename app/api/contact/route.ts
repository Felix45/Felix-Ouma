import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { errorResponse, zodErrorResponse } from "@/lib/api-response";
import { createContactMessage, listContactMessages } from "@/lib/contact";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { contactInputSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);
  const rateLimit = checkRateLimit(clientKey);
  if (!rateLimit.allowed) {
    return errorResponse("Too many requests. Please try again shortly.", 429, {
      retryAfterSeconds: rateLimit.retryAfterSeconds,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  const parsed = contactInputSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const message = await createContactMessage(parsed.data);
  return NextResponse.json({ message }, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return errorResponse("Unauthorized", 401);
  }

  const messages = await listContactMessages();
  return NextResponse.json({ messages });
}
