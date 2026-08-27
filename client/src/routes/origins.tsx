import { Layout, PageHero } from "@/components/site/Layout";
import { Mountain, Leaf, Calendar, type LucideIcon } from "lucide-react";
import { REGIONS } from "@/data/regions";
import { useTranslation } from "react-i18next";
import { EthiopianCoffeeMap } from "@/components/site/EthiopianCoffeeMap";

export default function OriginsPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <PageHero
        eyebrow={t("origins.eyebrow")}
        title={t("origins.pageTitle")}
        subtitle={t("origins.pageSubtitle")}
      />
      <section className="py-24 container-x">
        <EthiopianCoffeeMap />
      </section>
      <section className="py-24 bg-cream">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-accent">
              {t("origins.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
              {t("origins.pageTitle")}
            </h2>
          </div>
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
                  <Pill icon={Mountain} label={t("origins.altitude")} value={r.altitude} />
                  <Pill icon={Leaf} label={t("origins.process")} value={r.process} />
                  <Pill icon={Calendar} label={t("origins.harvest")} value={r.season} />
                </div>
              </article>
            ))}
          </div>
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
