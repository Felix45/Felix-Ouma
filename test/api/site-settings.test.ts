import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({ auth: vi.fn() }));

import { auth } from "@/auth";
import { PATCH } from "@/app/api/site-settings/route";

const mockedAuth = auth as unknown as ReturnType<typeof vi.fn>;

function jsonRequest(url: string, method: string, body?: unknown) {
  return new NextRequest(url, {
    method,
    headers: { "content-type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

describe("/api/site-settings", () => {
  beforeEach(() => {
    mockedAuth.mockReset();
  });

  it("PATCH rejects unauthenticated requests", async () => {
    mockedAuth.mockResolvedValue(null);

    const response = await PATCH(
      jsonRequest("http://localhost:3000/api/site-settings", "PATCH", {
        name: "Someone",
      })
    );

    expect(response.status).toBe(401);
  });

  it("PATCH rejects invalid input for authenticated requests", async () => {
    mockedAuth.mockResolvedValue({
      user: { id: "admin", email: "felix@example.com" },
    } as never);

    const response = await PATCH(
      jsonRequest("http://localhost:3000/api/site-settings", "PATCH", {
        name: "",
      })
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error.details.name).toBeDefined();
  });

  it("PATCH updates the singleton settings row for authenticated requests", async () => {
    mockedAuth.mockResolvedValue({
      user: { id: "admin", email: "felix@example.com" },
    } as never);

    const response = await PATCH(
      jsonRequest("http://localhost:3000/api/site-settings", "PATCH", {
        heroSummary: "Updated from a Vitest run.",
      })
    );

    expect(response.status).toBe(200);
    const { settings } = await response.json();
    expect(settings.heroSummary).toBe("Updated from a Vitest run.");
  });
});
