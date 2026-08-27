import { useEffect, useState, type FormEvent } from "react";
import { commoditiesApi, type Commodity, type CreateCommodityInput } from "@/lib/api";
import { Plus, Pencil, Trash2, X, Loader2, Search } from "lucide-react";

const EMPTY_FORM: CreateCommodityInput = {
  name: "",
  organicCertified: false,
  sourceOfCoffee: "",
  coffeeGrade: "",
  coffeeType: "",
  coffeeStatus: "Available",
  processingType: "",
  packagingContent: "",
  packageUnit: "",
  weightUnitCode: "KG",
  pricePerUnit: null,
  stockQuantity: 0,
  availableQty: 0,
  quantitySold: 0,
  minOrderQty: null,
  description: null,
};

export function CommoditiesPage() {
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Commodity | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<CreateCommodityInput>(EMPTY_FORM);

  const load = () => {
    commoditiesApi.list().then(({ commodities }) => setCommodities(commodities)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = commodities.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.sourceOfCoffee.toLowerCase().includes(search.toLowerCase()) ||
      c.coffeeGrade.toLowerCase().includes(search.toLowerCase()),
  );

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(c: Commodity) {
    setEditing(c);
    setForm({
      name: c.name,
      organicCertified: c.organicCertified,
      sourceOfCoffee: c.sourceOfCoffee,
      coffeeGrade: c.coffeeGrade,
      coffeeType: c.coffeeType,
      coffeeStatus: c.coffeeStatus,
      processingType: c.processingType,
      packagingContent: c.packagingContent,
      packageUnit: c.packageUnit,
      weightUnitCode: c.weightUnitCode,
      pricePerUnit: c.pricePerUnit,
      stockQuantity: c.stockQuantity,
      availableQty: c.availableQty,
      quantitySold: c.quantitySold,
      minOrderQty: c.minOrderQty,
      description: c.description,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await commoditiesApi.update(editing.id, form);
      } else {
        await commoditiesApi.create(form);
      }
      setShowForm(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await commoditiesApi.delete(id);
    load();
  }

  const update = (field: keyof CreateCommodityInput, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

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
          <h1 className="font-display text-3xl font-bold">Commodities</h1>
          <p className="mt-1 text-muted-foreground">Manage your coffee inventory and pricing.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add Commodity
        </button>
      </div>

      {/* Search */}
      <div className="mt-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, origin, or grade…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
        />
      </div>

      {/* Table */}
      <div className="mt-6 rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Origin</th>
                <th className="px-4 py-3 font-medium">Grade</th>
                <th className="px-4 py-3 font-medium">Process</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                    {search ? "No commodities match your search." : "No commodities yet. Click 'Add Commodity' to create one."}
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 transition">
                    <td className="px-4 py-3 font-medium">
                      {c.name}
                      {c.organicCertified && (
                        <span className="ml-2 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Organic
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.sourceOfCoffee}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.coffeeGrade}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.processingType}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.coffeeStatus} />
                    </td>
                    <td className="px-4 py-3 tabular-nums">{c.stockQuantity.toLocaleString()}</td>
                    <td className="px-4 py-3 tabular-nums">
                      {c.pricePerUnit != null ? `$${c.pricePerUnit}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => openEdit(c)}
                          className="p-2 rounded-lg hover:bg-cream transition"
                          aria-label={`Edit ${c.name}`}
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id, c.name)}
                          className="p-2 rounded-lg hover:bg-destructive/10 transition"
                          aria-label={`Delete ${c.name}`}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-elegant">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-xl font-bold">
                {editing ? "Edit Commodity" : "Add Commodity"}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-cream transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <FieldInput label="Name" value={form.name} onChange={(v) => update("name", v)} required />
                <FieldInput label="Source / Origin" value={form.sourceOfCoffee} onChange={(v) => update("sourceOfCoffee", v)} required />
                <FieldInput label="Grade" value={form.coffeeGrade} onChange={(v) => update("coffeeGrade", v)} required placeholder="e.g. Grade 1" />
                <FieldInput label="Coffee Type" value={form.coffeeType} onChange={(v) => update("coffeeType", v)} required placeholder="e.g. Single Origin" />
                <FieldSelect label="Processing Type" value={form.processingType} onChange={(v) => update("processingType", v)} options={["Washed", "Natural", "Honey", "Semi-washed"]} />
                <FieldSelect label="Status" value={form.coffeeStatus} onChange={(v) => update("coffeeStatus", v)} options={["Available", "Sold Out", "In Transit", "Reserved"]} />
                <FieldInput label="Packaging Content" value={form.packagingContent} onChange={(v) => update("packagingContent", v)} placeholder="e.g. GrainPro lined bags" />
                <FieldInput label="Package Unit" value={form.packageUnit} onChange={(v) => update("packageUnit", v)} placeholder="e.g. 60kg bags" />
                <FieldSelect label="Weight Unit" value={form.weightUnitCode} onChange={(v) => update("weightUnitCode", v)} options={["KG", "LB"]} />
                <div className="flex items-end gap-3 pb-1">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.organicCertified}
                      onChange={(e) => update("organicCertified", e.target.checked)}
                      className="w-4 h-4 rounded border-border accent-accent"
                    />
                    Organic Certified
                  </label>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <FieldNumber label="Price per Unit ($)" value={form.pricePerUnit} onChange={(v) => update("pricePerUnit", v)} />
                <FieldNumber label="Stock Quantity" value={form.stockQuantity} onChange={(v) => update("stockQuantity", v)} />
                <FieldNumber label="Available Qty" value={form.availableQty} onChange={(v) => update("availableQty", v)} />
                <FieldNumber label="Quantity Sold" value={form.quantitySold} onChange={(v) => update("quantitySold", v)} />
                <FieldNumber label="Min Order Qty" value={form.minOrderQty} onChange={(v) => update("minOrderQty", v)} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea
                  value={form.description ?? ""}
                  onChange={(e) => update("description", e.target.value || null)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
                  placeholder="Brief description of this coffee commodity…"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-cream transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editing ? "Save Changes" : "Create Commodity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Available: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "Sold Out": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    "In Transit": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Reserved: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

function FieldInput({
  label, value, onChange, required, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
      />
    </div>
  );
}

function FieldSelect({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function FieldNumber({
  label, value, onChange,
}: {
  label: string; value: number | null; onChange: (v: number | null) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition tabular-nums"
      />
    </div>
  );
}
