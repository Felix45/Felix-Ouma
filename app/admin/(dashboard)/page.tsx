import { ProjectsManager } from "@/components/admin/projects-manager";
import { listProjects } from "@/lib/projects";

export default async function AdminProjectsPage() {
  const projects = await listProjects();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
      <p className="text-sm text-foreground-muted">
        Reorder with the arrows, or edit and delete individual projects. Changes are
        reflected on the public site immediately.
      </p>
      <ProjectsManager initialProjects={projects} />
    </div>
  );
}
