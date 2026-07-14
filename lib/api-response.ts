import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export function errorResponse(message: string, status: number, details?: unknown) {
  return NextResponse.json(
    { error: { message, ...(details ? { details } : {}) } },
    { status }
  );
}

export function zodErrorResponse(error: ZodError) {
  return errorResponse("Validation failed", 400, error.flatten().fieldErrors);
}
