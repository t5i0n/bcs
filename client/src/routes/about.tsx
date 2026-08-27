import farmers from "@/assets/farmers.jpg";
import ceremony from "@/assets/ceremony.jpg";
import { Layout, PageHero } from "@/components/site/Layout";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <PageHero
        eyebrow={t("aboutPage.eyebrow")}
        title={t("aboutPage.title")}
        subtitle={t("aboutPage.subtitle")}
      />
      <section className="py-24 container-x grid lg:grid-cols-2 gap-14 items-center">
        <img
          src={farmers}
          alt="Ethiopian coffee farmers"
          width={1280}
          height={1280}
          loading="lazy"
          className="rounded-3xl shadow-elegant w-full aspect-4/5 object-cover"
        />
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            {t("aboutPage.storyTitle")}
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-lg">
            {t("aboutPage.storyP1")}
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("aboutPage.storyP2")}
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["15+", t("common.yearsExperience")],
              ["100+", t("common.verifiedExporters")],
              ["40+", t("common.countriesServed")],
              ["7", t("common.coffeeRegions")],
              ["$50M+", t("common.tradeFacilitated")],
              ["5,000+", t("common.tonsShipped")],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-cream p-5 text-center">
                <p className="font-display text-3xl font-bold text-primary">
                  {v}
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-cream">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div className="lg:order-2">
            <img
              src={ceremony}
              alt="Ethiopian coffee ceremony"
              width={1280}
              height={960}
              loading="lazy"
              className="rounded-3xl shadow-elegant w-full aspect-4/3 object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              {t("aboutPage.heritageTitle")}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed text-lg">
              {t("aboutPage.heritageP1")}
            </p>
            <Link
              to="/contact"
              className="inline-flex mt-8 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              {t("aboutPage.workWithUs")}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
