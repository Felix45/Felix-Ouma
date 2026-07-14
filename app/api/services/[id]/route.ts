import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { errorResponse, zodErrorResponse } from "@/lib/api-response";
import { deleteService, getServiceById, updateService } from "@/lib/services";
import { serviceUpdateSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) return errorResponse("Service not found", 404);
  return NextResponse.json({ service });
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

  const parsed = serviceUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const service = await updateService(id, parsed.data);
  if (!service) return errorResponse("Service not found", 404);

  return NextResponse.json({ service });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return errorResponse("Unauthorized", 401);
  }

  const { id } = await params;
  const deleted = await deleteService(id);
  if (!deleted) return errorResponse("Service not found", 404);

  return new NextResponse(null, { status: 204 });
}
