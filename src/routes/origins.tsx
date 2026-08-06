import { Layout, PageHero } from "@/components/site/Layout";
import { Mountain, Leaf, Calendar, type LucideIcon } from "lucide-react";
import { REGIONS } from "@/data/regions";

export default function OriginsPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Coffee Origins"
        title="The Seven Regions of Ethiopian Coffee"
        subtitle="From the misty highlands of Yirgacheffe to the sun-baked plateaus of Harrar."
      />
      <section className="py-24 container-x">
        <div className="grid md:grid-cols-2 gap-6">
          {REGIONS.map((r) => (
            <article
              key={r.name}
              className="rounded-3xl border border-border bg-background p-8 hover:shadow-elegant transition"
            >
              <h3 className="font-display text-3xl font-bold">{r.name}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {r.notes}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <Pill icon={Mountain} label="Altitude" value={r.altitude} />
                <Pill icon={Leaf} label="Process" value={r.process} />
                <Pill icon={Calendar} label="Harvest" value={r.season} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function Pill({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-cream p-3">
      <Icon className="w-4 h-4 text-accent" />
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2">
        {label}
      </p>
      <p className="text-xs font-semibold mt-0.5">{value}</p>
    </div>
  );
}
