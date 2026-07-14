import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { errorResponse, zodErrorResponse } from "@/lib/api-response";
import { deleteProject, getProjectById, updateProject } from "@/lib/projects";
import { projectUpdateSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return errorResponse("Project not found", 404);
  return NextResponse.json({ project });
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

  const parsed = projectUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const project = await updateProject(id, parsed.data);
  if (!project) return errorResponse("Project not found", 404);

  return NextResponse.json({ project });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return errorResponse("Unauthorized", 401);
  }

  const { id } = await params;
  const deleted = await deleteProject(id);
  if (!deleted) return errorResponse("Project not found", 404);

  return new NextResponse(null, { status: 204 });
}
