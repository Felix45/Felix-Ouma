import { ServiceForm } from "@/components/admin/service-form";

export default function NewServicePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Add service</h1>
      <ServiceForm />
    </div>
  );
}
