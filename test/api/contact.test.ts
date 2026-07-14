import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({ auth: vi.fn() }));

import { auth } from "@/auth";
import { GET, POST } from "@/app/api/contact/route";

const mockedAuth = auth as unknown as ReturnType<typeof vi.fn>;

function jsonRequest(body: unknown, ip = "203.0.113.1") {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("/api/contact", () => {
  beforeEach(() => {
    mockedAuth.mockReset();
  });

  it("POST rejects invalid input", async () => {
    const response = await POST(
      jsonRequest({ name: "", email: "not-an-email", message: "short" }, "203.0.113.10")
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error.details.name).toBeDefined();
    expect(data.error.details.email).toBeDefined();
    expect(data.error.details.message).toBeDefined();
  });

  it("POST accepts a valid message", async () => {
    const response = await POST(
      jsonRequest(
        {
          name: "Jane Doe",
          email: "jane@example.com",
          message: "Hi Felix, I'd love to chat about a project.",
        },
        "203.0.113.11"
      )
    );

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.message.email).toBe("jane@example.com");
  });

  it("rate limits repeated submissions from the same client", async () => {
    const ip = "203.0.113.12";
    const payload = {
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hi Felix, I'd love to chat about a project.",
    };

    const statuses: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      const response = await POST(jsonRequest(payload, ip));
      statuses.push(response.status);
    }

    expect(statuses.filter((status) => status === 201)).toHaveLength(5);
    expect(statuses.at(-1)).toBe(429);
  });

  it("GET rejects unauthenticated requests", async () => {
    mockedAuth.mockResolvedValue(null);
    const response = await GET();
    expect(response.status).toBe(401);
  });

  it("GET returns messages for an authenticated admin", async () => {
    mockedAuth.mockResolvedValue({
      user: { id: "admin", email: "felix@example.com" },
    } as never);

    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.messages)).toBe(true);
  });
});
