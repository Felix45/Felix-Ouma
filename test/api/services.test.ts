import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({ auth: vi.fn() }));

import { auth } from "@/auth";
import { DELETE, GET as GET_ONE, PATCH } from "@/app/api/services/[id]/route";
import { GET, POST } from "@/app/api/services/route";

const mockedAuth = auth as unknown as ReturnType<typeof vi.fn>;

function jsonRequest(url: string, method: string, body?: unknown) {
  return new NextRequest(url, {
    method,
    headers: { "content-type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

describe("/api/services", () => {
  beforeEach(() => {
    mockedAuth.mockReset();
  });

  it("GET lists services without auth", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.services)).toBe(true);
  });

  it("POST rejects unauthenticated requests", async () => {
    mockedAuth.mockResolvedValue(null);

    const response = await POST(
      jsonRequest("http://localhost:3000/api/services", "POST", {
        title: "Consulting",
        description: "Some description.",
      })
    );

    expect(response.status).toBe(401);
  });

  it("POST rejects invalid input for authenticated requests", async () => {
    mockedAuth.mockResolvedValue({
      user: { id: "admin", email: "felix@example.com" },
    } as never);

    const response = await POST(
      jsonRequest("http://localhost:3000/api/services", "POST", {
        title: "",
        description: "",
      })
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error.details.title).toBeDefined();
  });

  it("POST creates a service, then it can be fetched, updated, and deleted", async () => {
    mockedAuth.mockResolvedValue({
      user: { id: "admin", email: "felix@example.com" },
    } as never);

    const createResponse = await POST(
      jsonRequest("http://localhost:3000/api/services", "POST", {
        title: "Vitest Sample Service",
        description: "Created during an API route test.",
      })
    );

    expect(createResponse.status).toBe(201);
    const { service } = await createResponse.json();
    expect(service.title).toBe("Vitest Sample Service");

    const getResponse = await GET_ONE(
      new NextRequest(`http://localhost:3000/api/services/${service.id}`),
      { params: Promise.resolve({ id: service.id }) }
    );
    expect(getResponse.status).toBe(200);

    const patchResponse = await PATCH(
      jsonRequest(
        `http://localhost:3000/api/services/${service.id}`,
        "PATCH",
        { description: "Updated description." }
      ),
      { params: Promise.resolve({ id: service.id }) }
    );
    expect(patchResponse.status).toBe(200);
    const { service: updated } = await patchResponse.json();
    expect(updated.description).toBe("Updated description.");

    const deleteResponse = await DELETE(
      new NextRequest(`http://localhost:3000/api/services/${service.id}`, {
        method: "DELETE",
      }),
      { params: Promise.resolve({ id: service.id }) }
    );
    expect(deleteResponse.status).toBe(204);

    const getAfterDelete = await GET_ONE(
      new NextRequest(`http://localhost:3000/api/services/${service.id}`),
      { params: Promise.resolve({ id: service.id }) }
    );
    expect(getAfterDelete.status).toBe(404);
  });
});
