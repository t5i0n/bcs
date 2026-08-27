import { useEffect, useState } from "react";
import { commoditiesApi, contactsApi } from "@/lib/api";
import { Package, MessageSquare, TrendingUp, BarChart3 } from "lucide-react";

interface Stats {
  commodities: { total: number; available: number; totalStock: number; totalSold: number };
  contacts: { total: number; new: number; read: number; replied: number };
}

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([commoditiesApi.stats(), contactsApi.stats()])
      .then(([commodities, contacts]) => setStats({ commodities, contacts }))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return <p className="text-muted-foreground">Failed to load dashboard stats.</p>;
  }

  const cards = [
    {
      label: "Total Commodities",
      value: stats.commodities.total,
      sub: `${stats.commodities.available} available`,
      icon: Package,
      color: "bg-forest text-white",
    },
    {
      label: "Contact Submissions",
      value: stats.contacts.total,
      sub: `${stats.contacts.new} new`,
      icon: MessageSquare,
      color: "bg-accent text-accent-foreground",
    },
    {
      label: "Total Stock",
      value: `${stats.commodities.totalStock.toLocaleString()} kg`,
      sub: "Across all commodities",
      icon: BarChart3,
      color: "bg-coffee text-white",
    },
    {
      label: "Total Sold",
      value: `${stats.commodities.totalSold.toLocaleString()} kg`,
      sub: "Lifetime sales volume",
      icon: TrendingUp,
      color: "bg-primary text-primary-foreground",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Overview of your BCS Coffee business data.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <div className={`w-10 h-10 rounded-xl grid place-items-center ${c.color}`}>
                <c.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="font-display text-3xl font-bold">{c.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card p-8">
        <h2 className="font-display text-xl font-semibold">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="/admin/commodities"
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            Manage Commodities
          </a>
          <a
            href="/admin/contacts"
            className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition"
          >
            View Submissions
          </a>
        </div>
      </div>
    </div>
  );
}
