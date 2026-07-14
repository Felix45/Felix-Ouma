import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { errorResponse } from "@/lib/api-response";
import { deleteContactMessage } from "@/lib/contact";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return errorResponse("Unauthorized", 401);
  }

  const { id } = await params;
  const deleted = await deleteContactMessage(id);
  if (!deleted) return errorResponse("Message not found", 404);

  return new NextResponse(null, { status: 204 });
}
