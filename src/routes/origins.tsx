import { Layout, PageHero } from "@/components/site/Layout";
import { Mountain, Leaf, Calendar, type LucideIcon } from "lucide-react";

const REGIONS = [
  {
    name: "Yirgacheffe",
    altitude: "1,800–2,200m",
    process: "Washed, Natural",
    notes:
      "Floral, citrus, tea-like body. The most celebrated Ethiopian origin — bright, jasmine-laced, refined.",
    season: "Oct – Jan",
  },
  {
    name: "Sidama",
    altitude: "1,500–2,200m",
    process: "Washed, Natural",
    notes:
      "Berry, wine, sweet citrus. Diverse micro-climates produce remarkable lot-to-lot variation.",
    season: "Oct – Dec",
  },
  {
    name: "Guji",
    altitude: "1,800–2,300m",
    process: "Washed, Natural",
    notes:
      "Berry, chocolate, jasmine. A rising star with intense fruit-forward profiles.",
    season: "Oct – Jan",
  },
  {
    name: "Limu",
    altitude: "1,400–2,000m",
    process: "Washed",
    notes:
      "Balanced, spicy, winey. A reliable workhorse for blends and single-origin alike.",
    season: "Nov – Feb",
  },
  {
    name: "Jimma",
    altitude: "1,400–1,800m",
    process: "Natural",
    notes:
      "Earthy, mild, full body. Ethiopia's largest producing region by volume.",
    season: "Nov – Feb",
  },
  {
    name: "Nekemte",
    altitude: "1,500–2,100m",
    process: "Natural",
    notes:
      "Fruity, mocha, bold. Western-Ethiopian character — heavy body and chocolate.",
    season: "Oct – Jan",
  },
  {
    name: "Harrar",
    altitude: "1,500–2,100m",
    process: "Natural",
    notes:
      "Blueberry, wine, mocha. Iconic dry-processed eastern coffee with a wild, fruited cup.",
    season: "Oct – Feb",
  },
];

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
