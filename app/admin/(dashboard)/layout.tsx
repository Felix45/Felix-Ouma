import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defense in depth: proxy.ts already gates /admin/*, but Server
  // Functions and direct requests should never rely on proxy alone.
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
