import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({ auth: vi.fn() }));

import { auth } from "@/auth";
import { DELETE, GET as GET_ONE, PATCH } from "@/app/api/experience/[id]/route";
import { GET, POST } from "@/app/api/experience/route";

const mockedAuth = auth as unknown as ReturnType<typeof vi.fn>;

function jsonRequest(url: string, method: string, body?: unknown) {
  return new NextRequest(url, {
    method,
    headers: { "content-type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

describe("/api/experience", () => {
  beforeEach(() => {
    mockedAuth.mockReset();
  });

  it("GET lists experience without auth", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.experience)).toBe(true);
  });

  it("POST rejects unauthenticated requests", async () => {
    mockedAuth.mockResolvedValue(null);

    const response = await POST(
      jsonRequest("http://localhost:3000/api/experience", "POST", {
        role: "Engineer",
        company: "Acme",
        employment: "Full-time",
        period: "2024 - Present",
        location: "Remote",
      })
    );

    expect(response.status).toBe(401);
  });

  it("POST rejects invalid input for authenticated requests", async () => {
    mockedAuth.mockResolvedValue({
      user: { id: "admin", email: "felix@example.com" },
    } as never);

    const response = await POST(
      jsonRequest("http://localhost:3000/api/experience", "POST", {
        role: "",
        company: "",
        employment: "",
        period: "",
        location: "",
      })
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error.details.role).toBeDefined();
  });

  it("POST creates an entry, then it can be fetched, updated, and deleted", async () => {
    mockedAuth.mockResolvedValue({
      user: { id: "admin", email: "felix@example.com" },
    } as never);

    const createResponse = await POST(
      jsonRequest("http://localhost:3000/api/experience", "POST", {
        role: "Vitest Engineer",
        company: "Test Co",
        employment: "Full-time",
        period: "2024 - Present",
        location: "Remote",
        skills: ["Vitest"],
        highlights: ["Wrote a great test suite."],
      })
    );

    expect(createResponse.status).toBe(201);
    const { experience } = await createResponse.json();
    expect(experience.role).toBe("Vitest Engineer");
    expect(experience.skills).toEqual(["Vitest"]);

    const getResponse = await GET_ONE(
      new NextRequest(`http://localhost:3000/api/experience/${experience.id}`),
      { params: Promise.resolve({ id: experience.id }) }
    );
    expect(getResponse.status).toBe(200);

    const patchResponse = await PATCH(
      jsonRequest(
        `http://localhost:3000/api/experience/${experience.id}`,
        "PATCH",
        { period: "2024 - 2025" }
      ),
      { params: Promise.resolve({ id: experience.id }) }
    );
    expect(patchResponse.status).toBe(200);
    const { experience: updated } = await patchResponse.json();
    expect(updated.period).toBe("2024 - 2025");

    const deleteResponse = await DELETE(
      new NextRequest(`http://localhost:3000/api/experience/${experience.id}`, {
        method: "DELETE",
      }),
      { params: Promise.resolve({ id: experience.id }) }
    );
    expect(deleteResponse.status).toBe(204);

    const getAfterDelete = await GET_ONE(
      new NextRequest(`http://localhost:3000/api/experience/${experience.id}`),
      { params: Promise.resolve({ id: experience.id }) }
    );
    expect(getAfterDelete.status).toBe(404);
  });
});
