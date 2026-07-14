import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { errorResponse, zodErrorResponse } from "@/lib/api-response";
import { createExperience, listExperience } from "@/lib/experience";
import { experienceInputSchema } from "@/lib/validations";

export async function GET() {
  const experience = await listExperience();
  return NextResponse.json({ experience });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return errorResponse("Unauthorized", 401);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  const parsed = experienceInputSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const experience = await createExperience(parsed.data);
  return NextResponse.json({ experience }, { status: 201 });
}
