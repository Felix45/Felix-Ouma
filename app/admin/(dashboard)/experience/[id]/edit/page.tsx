import { notFound } from "next/navigation";
import { ExperienceForm } from "@/components/admin/experience-form";
import { getExperienceById } from "@/lib/experience";

type Params = Promise<{ id: string }>;

export default async function EditExperiencePage({ params }: { params: Params }) {
  const { id } = await params;
  const entry = await getExperienceById(id);

  if (!entry) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Edit experience</h1>
      <ExperienceForm entry={entry} />
    </div>
  );
}
