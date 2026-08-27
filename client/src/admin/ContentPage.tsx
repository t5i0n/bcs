import { useEffect, useState, useRef } from "react";
import { Save, Loader2, FileText, ChevronDown, ChevronUp } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface ContentEntry {
  id: string;
  key: string;
  value: string;
  section: string;
  updatedAt: string;
}

async function apiGet<T>(path: string): Promise<T> {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

async function apiPut(path: string, body: unknown) {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

const SECTIONS = [
  "home",
  "about",
  "services",
  "origins",
  "field",
  "contact",
  "footer",
] as const;

const SECTION_LABELS: Record<string, string> = {
  home: "Homepage",
  about: "About Page",
  services: "Services",
  origins: "Coffee Origins",
  field: "From the Field",
  contact: "Contact",
  footer: "Footer",
};

export function ContentPage() {
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["home"]),
  );
  const [dirtyKeys, setDirtyKeys] = useState<Set<string>>(new Set());
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiGet<{ entries: ContentEntry[] }>("/api/admin/content")
      .then((data) => {
        if (!cancelled && mountedRef.current) setEntries(data.entries);
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled && mountedRef.current) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function reload() {
    setLoading(true);
    apiGet<{ entries: ContentEntry[] }>("/api/admin/content")
      .then((data) => {
        setEntries(data.entries);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function updateValue(key: string, value: string) {
    setEntries((prev) =>
      prev.map((e) => (e.key === key ? { ...e, value } : e)),
    );
    setDirtyKeys((prev) => new Set(prev).add(key));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const dirtyEntries = entries.filter((e) => dirtyKeys.has(e.key));
      if (dirtyEntries.length === 0) {
        setSaving(false);
        return;
      }
      await apiPut("/api/admin/content/bulk", {
        entries: dirtyEntries.map(({ key, value, section }) => ({
          key,
          value,
          section,
        })),
      });
      setDirtyKeys(new Set());
      reload();
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to save content",
      );
    } finally {
      setSaving(false);
    }
  }

  function toggleSection(section: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  }

  // Group entries by section
  const grouped = SECTIONS.map((section) => ({
    section,
    entries: entries.filter((e) => e.section === section),
  })).filter((g) => g.entries.length > 0);

  const dirtyCount = dirtyKeys.size;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-bold">Site Content</h1>
          <p className="mt-1 text-muted-foreground">
            Manage website text and content without code changes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {dirtyCount > 0 && (
            <span className="text-sm text-muted-foreground">
              {dirtyCount} unsaved change{dirtyCount !== 1 ? "s" : ""}
            </span>
          )}
          <button
            onClick={() => void handleSave()}
            disabled={saving || dirtyCount === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border p-14 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            No content entries yet.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Content entries will appear here as they are added to the database.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {grouped.map(({ section, entries: sectionEntries }) => {
            const isExpanded = expandedSections.has(section);
            const sectionDirty = sectionEntries.filter((e) =>
              dirtyKeys.has(e.key),
            ).length;

            return (
              <div
                key={section}
                className="rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-semibold">
                      {SECTION_LABELS[section] ?? section}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {sectionEntries.length} field
                      {sectionEntries.length !== 1 ? "s" : ""}
                    </span>
                    {sectionDirty > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold">
                        {sectionDirty} unsaved
                      </span>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-border p-4 space-y-3 bg-muted/20">
                    {sectionEntries.map((entry) => (
                      <div key={entry.key}>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          {entry.key}
                        </label>
                        <textarea
                          value={entry.value}
                          onChange={(e) => updateValue(entry.key, e.target.value)}
                          rows={entry.value.length > 100 ? 3 : 1}
                          className={`w-full px-4 py-2.5 rounded-xl bg-background border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition resize-none ${
                            dirtyKeys.has(entry.key)
                              ? "border-accent"
                              : "border-border"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
