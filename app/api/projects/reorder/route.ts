import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { errorResponse, zodErrorResponse } from "@/lib/api-response";
import { reorderProjects } from "@/lib/projects";
import { reorderSchema } from "@/lib/validations";

export async function PATCH(request: NextRequest) {
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

  const parsed = reorderSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  await reorderProjects(parsed.data.items);
  return NextResponse.json({ success: true });
}
