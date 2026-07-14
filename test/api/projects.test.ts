import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({ auth: vi.fn() }));

import { auth } from "@/auth";
import { DELETE, GET as GET_ONE, PATCH } from "@/app/api/projects/[id]/route";
import { GET, POST } from "@/app/api/projects/route";

const mockedAuth = auth as unknown as ReturnType<typeof vi.fn>;

function jsonRequest(url: string, method: string, body?: unknown) {
  return new NextRequest(url, {
    method,
    headers: { "content-type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

describe("/api/projects", () => {
  beforeEach(() => {
    mockedAuth.mockReset();
  });

  it("GET lists seeded and created projects without auth", async () => {
    const response = await GET(
      new NextRequest("http://localhost:3000/api/projects")
    );
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.projects)).toBe(true);
  });

  it("POST rejects unauthenticated requests", async () => {
    mockedAuth.mockResolvedValue(null);

    const response = await POST(
      jsonRequest("http://localhost:3000/api/projects", "POST", {
        title: "Test Project",
        description: "A project created from a test.",
        techStack: ["TypeScript"],
      })
    );

    expect(response.status).toBe(401);
  });

  it("POST rejects invalid input for authenticated requests", async () => {
    mockedAuth.mockResolvedValue({
      user: { id: "admin", email: "felix@example.com" },
    } as never);

    const response = await POST(
      jsonRequest("http://localhost:3000/api/projects", "POST", {
        title: "",
        description: "",
        techStack: [],
      })
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error.details.title).toBeDefined();
  });

  it("POST creates a project, then it can be fetched, updated, and deleted", async () => {
    mockedAuth.mockResolvedValue({
      user: { id: "admin", email: "felix@example.com" },
    } as never);

    const createResponse = await POST(
      jsonRequest("http://localhost:3000/api/projects", "POST", {
        title: "Vitest Sample Project",
        description: "Created during an API route test.",
        techStack: ["Next.js", "Vitest"],
        featured: false,
      })
    );

    expect(createResponse.status).toBe(201);
    const { project } = await createResponse.json();
    expect(project.slug).toBe("vitest-sample-project");
    expect(project.techStack).toEqual(["Next.js", "Vitest"]);

    const getResponse = await GET_ONE(
      new NextRequest(`http://localhost:3000/api/projects/${project.id}`),
      { params: Promise.resolve({ id: project.id }) }
    );
    expect(getResponse.status).toBe(200);

    const patchResponse = await PATCH(
      jsonRequest(
        `http://localhost:3000/api/projects/${project.id}`,
        "PATCH",
        { featured: true }
      ),
      { params: Promise.resolve({ id: project.id }) }
    );
    expect(patchResponse.status).toBe(200);
    const { project: updated } = await patchResponse.json();
    expect(updated.featured).toBe(true);

    const deleteResponse = await DELETE(
      new NextRequest(`http://localhost:3000/api/projects/${project.id}`, {
        method: "DELETE",
      }),
      { params: Promise.resolve({ id: project.id }) }
    );
    expect(deleteResponse.status).toBe(204);

    const getAfterDelete = await GET_ONE(
      new NextRequest(`http://localhost:3000/api/projects/${project.id}`),
      { params: Promise.resolve({ id: project.id }) }
    );
    expect(getAfterDelete.status).toBe(404);
  });
});
