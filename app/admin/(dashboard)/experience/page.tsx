import Link from "next/link";
import { ExperienceManager } from "@/components/admin/experience-manager";
import { listExperience } from "@/lib/experience";

export default async function AdminExperiencePage() {
  const experience = await listExperience();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Experience</h1>
        <Link href="/admin/experience/new" className="btn btn-primary focus-ring">
          Add experience
        </Link>
      </div>
      <p className="text-sm text-foreground-muted">
        Reorder with the arrows, or edit and delete individual entries.
      </p>
      <ExperienceManager initialExperience={experience} />
    </div>
  );
}
