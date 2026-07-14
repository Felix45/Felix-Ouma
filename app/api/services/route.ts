import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { errorResponse, zodErrorResponse } from "@/lib/api-response";
import { createService, listServices } from "@/lib/services";
import { serviceInputSchema } from "@/lib/validations";

export async function GET() {
  const services = await listServices();
  return NextResponse.json({ services });
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

  const parsed = serviceInputSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const service = await createService(parsed.data);
  return NextResponse.json({ service }, { status: 201 });
}
