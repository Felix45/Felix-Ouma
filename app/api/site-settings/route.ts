import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { errorResponse, zodErrorResponse } from "@/lib/api-response";
import { updateSiteSettings } from "@/lib/site-settings";
import { siteSettingsUpdateSchema } from "@/lib/validations";

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

  const parsed = siteSettingsUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const settings = await updateSiteSettings(parsed.data);
  return NextResponse.json({ settings });
}
