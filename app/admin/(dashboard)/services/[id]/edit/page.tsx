import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/service-form";
import { getServiceById } from "@/lib/services";

type Params = Promise<{ id: string }>;

export default async function EditServicePage({ params }: { params: Params }) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Edit service</h1>
      <ServiceForm service={service} />
    </div>
  );
}
