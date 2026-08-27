import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Layout, PageHero } from "@/components/site/Layout";
import { SERVICES } from "@/data/services";

export default function ServicesPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={t("services.pageTitle")}
        subtitle={t("services.pageSubtitle")}
      />
      <section className="py-24 container-x">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl bg-background p-7 border border-border hover:shadow-elegant hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-xl gradient-forest text-white grid place-items-center mb-5">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold">{t(`services.items.${s.key}.title`)}</h3>
              <p className="mt-2.5 text-muted-foreground text-sm leading-relaxed">
                {t(`services.items.${s.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 rounded-3xl gradient-forest text-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl font-bold">
              {t("services.ctaTitle")}
            </h3>
            <p className="mt-2 text-white/80">
              {t("services.ctaSubtitle")}
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-gold hover:scale-105 transition"
          >
            {t("common.requestConsultation")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
