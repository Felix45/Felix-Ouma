import Link from "next/link";
import { ServicesManager } from "@/components/admin/services-manager";
import { listServices } from "@/lib/services";

export default async function AdminServicesPage() {
  const services = await listServices();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Services</h1>
        <Link href="/admin/services/new" className="btn btn-primary focus-ring">
          Add service
        </Link>
      </div>
      <p className="text-sm text-foreground-muted">
        Reorder with the arrows, or edit and delete individual services.
      </p>
      <ServicesManager initialServices={services} />
    </div>
  );
}
