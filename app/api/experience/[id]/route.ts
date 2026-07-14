import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { errorResponse, zodErrorResponse } from "@/lib/api-response";
import { deleteExperience, getExperienceById, updateExperience } from "@/lib/experience";
import { experienceUpdateSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const experience = await getExperienceById(id);
  if (!experience) return errorResponse("Experience entry not found", 404);
  return NextResponse.json({ experience });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return errorResponse("Unauthorized", 401);
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  const parsed = experienceUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const experience = await updateExperience(id, parsed.data);
  if (!experience) return errorResponse("Experience entry not found", 404);

  return NextResponse.json({ experience });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return errorResponse("Unauthorized", 401);
  }

  const { id } = await params;
  const deleted = await deleteExperience(id);
  if (!deleted) return errorResponse("Experience entry not found", 404);

  return new NextResponse(null, { status: 204 });
}
