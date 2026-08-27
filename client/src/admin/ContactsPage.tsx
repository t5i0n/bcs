import { useEffect, useState, useRef } from "react";
import { contactsApi, type ContactSubmission } from "@/lib/api";
import { Trash2, Mail, Building, Globe, Clock, Filter } from "lucide-react";

const STATUS_FILTERS = ["all", "new", "read", "replied", "archived"] as const;

export function ContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard data-fetching pattern
    setLoading(true);
    contactsApi
      .list({ status: statusFilter === "all" ? undefined : statusFilter, page })
      .then(({ submissions: data, pagination }) => {
        if (!cancelled && mountedRef.current) {
          setSubmissions(data);
          setTotalPages(pagination.pages);
        }
      })
      .catch(console.error)
      .finally(() => { if (!cancelled && mountedRef.current) setLoading(false); });
    return () => { cancelled = true; };
  }, [statusFilter, page]);

  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    contactsApi.get(selected.id).then(({ submission }) => {
      if (!cancelled && mountedRef.current) {
        setSelected(submission);
      }
    }).catch(console.error);
    return () => { cancelled = true; };
  }, [selected, selected?.id]);

  function reload() {
    setLoading(true);
    contactsApi
      .list({ status: statusFilter === "all" ? undefined : statusFilter, page })
      .then(({ submissions: data, pagination }) => {
        setSubmissions(data);
        setTotalPages(pagination.pages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  async function updateStatus(id: string, status: string) {
    await contactsApi.update(id, { status });
    if (selected?.id === id) setSelected((s) => (s ? { ...s, status } : s));
    reload();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this submission? This cannot be undone.")) return;
    await contactsApi.delete(id);
    if (selected?.id === id) setSelected(null);
    reload();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-bold">Contact Submissions</h1>
          <p className="mt-1 text-muted-foreground">View and manage inquiries from the website.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition ${
              statusFilter === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-[1fr_400px] gap-6">
        {/* List */}
        <div className="rounded-2xl border border-border overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              No submissions found.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {submissions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`w-full text-left p-4 hover:bg-muted/50 transition ${
                    selected?.id === s.id ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{s.name}</p>
                        {s.status === "new" && (
                          <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{s.email}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <StatusDot status={s.status} />
                      <span className="text-xs text-muted-foreground">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-border">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 rounded-lg text-sm hover:bg-muted transition disabled:opacity-50"
              >
                ← Previous
              </button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg text-sm hover:bg-muted transition disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="rounded-2xl border border-border bg-card p-6 h-fit lg:sticky lg:top-24">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold">{selected.name}</h2>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 transition"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <Info icon={Mail} label="Email" value={selected.email} />
                {selected.company && <Info icon={Building} label="Company" value={selected.company} />}
                {selected.country && <Info icon={Globe} label="Country" value={selected.country} />}
                <Info
                  icon={Clock}
                  label="Submitted"
                  value={new Date(selected.createdAt).toLocaleString()}
                />
              </div>

              {selected.coffeeInterest && (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Coffee Interest</p>
                  <p className="text-sm bg-muted/50 rounded-xl px-4 py-2">{selected.coffeeInterest}</p>
                </div>
              )}

              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Message</p>
                <p className="text-sm bg-muted/50 rounded-xl px-4 py-3 whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </p>
              </div>

              {/* Status actions */}
              <div className="mt-5 flex flex-wrap gap-2">
                {(["new", "read", "replied", "archived"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition ${
                      selected.status === s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-10">
              Select a submission to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: "bg-accent",
    read: "bg-blue-500",
    replied: "bg-green-500",
    archived: "bg-muted-foreground",
  };
  return <span className={`w-2 h-2 rounded-full ${colors[status] ?? "bg-muted"}`} />;
}
