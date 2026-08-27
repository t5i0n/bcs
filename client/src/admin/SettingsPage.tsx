import { useState, type FormEvent } from "react";
import { useAdminAuth } from "./AuthContext";
import { Save, Loader2, ExternalLink } from "lucide-react";

const SOCIAL_FIELDS = [
  { key: "social.telegram", label: "Telegram", placeholder: "https://t.me/..." },
  { key: "social.linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/company/..." },
  { key: "social.instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
  { key: "social.facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
];

const CONTACT_FIELDS = [
  { key: "site.email", label: "Email", placeholder: "info@bcscoffee.et" },
  { key: "site.phone", label: "Phone", placeholder: "+251-973-053-737" },
  { key: "site.whatsapp", label: "WhatsApp", placeholder: "+251-912-345-678" },
];

export function SettingsPage() {
  const { admin } = useAdminAuth();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (key: string, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    // In a real implementation, this would POST to the backend
    // For now, we'll simulate saving
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-muted-foreground">
        Manage your site configuration and social media links.
      </p>

      {admin && (
        <div className="mt-6 p-4 rounded-2xl bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <p className="font-medium">{admin.name} ({admin.email})</p>
          <p className="text-xs text-muted-foreground mt-1 capitalize">Role: {admin.role}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Social Links */}
        <section>
          <h2 className="font-display text-xl font-semibold mb-4">Social Media Links</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Add your company's official social media URLs. These will appear in the website footer.
          </p>
          <div className="space-y-4">
            {SOCIAL_FIELDS.map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                <div className="flex gap-2">
                  <input
                    value={values[f.key] ?? ""}
                    onChange={(e) => update(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                  />
                  {values[f.key] && (
                    <a
                      href={values[f.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 rounded-xl border border-border hover:bg-cream transition grid place-items-center"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="font-display text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            {CONTACT_FIELDS.map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                <input
                  value={values[f.key] ?? ""}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
            ) : (
              <><Save className="w-4 h-4" /> Save Settings</>
            )}
          </button>
          {saved && (
            <span className="text-sm text-green-600 dark:text-green-400">✓ Saved</span>
          )}
        </div>
      </form>
    </div>
  );
}
