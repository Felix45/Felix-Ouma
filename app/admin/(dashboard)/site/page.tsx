import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { getSiteSettings } from "@/lib/site-settings";

export default async function AdminSitePage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Site content</h1>
      <p className="text-sm text-foreground-muted">
        Edit the hero, about, skills, and social copy shown on the homepage.
      </p>
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
