import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { errorResponse, zodErrorResponse } from "@/lib/api-response";
import { createProject, listProjects } from "@/lib/projects";
import { projectInputSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const tech = request.nextUrl.searchParams.get("tech") ?? undefined;
  const featured = request.nextUrl.searchParams.get("featured") === "true";

  const projects = await listProjects({ tech, featuredOnly: featured });
  return NextResponse.json({ projects });
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

  const parsed = projectInputSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const project = await createProject(parsed.data);
  return NextResponse.json({ project }, { status: 201 });
}
