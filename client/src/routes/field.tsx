import { Layout, PageHero } from "@/components/site/Layout";
import { useTranslation } from "react-i18next";
import ceremony from "@/assets/ceremony.jpg";
import cherries from "@/assets/cherries.jpg";
import drying from "@/assets/drying.jpg";
import farmers from "@/assets/farmers.jpg";
import grading from "@/assets/grading.jpg";
import washing from "@/assets/washing.jpg";

export default function FieldPage() {
  const { t } = useTranslation();

  const moments = [
    {
      image: farmers,
      title: t("field.moments.atFarm"),
      alt: "Coffee farmers at work in Ethiopia",
      width: 1280,
      height: 1280,
    },
    {
      image: cherries,
      title: t("field.moments.harvestSeason"),
      alt: "Freshly picked coffee cherries",
      width: 1280,
      height: 960,
    },
    {
      image: washing,
      title: t("field.moments.washingStations"),
      alt: "Coffee processing at a washing station",
      width: 1280,
      height: 960,
    },
    {
      image: drying,
      title: t("field.moments.dryingCoffee"),
      alt: "Coffee drying in the sun",
      width: 1280,
      height: 960,
    },
    {
      image: grading,
      title: t("field.moments.qualityLot"),
      alt: "Coffee grading process",
      width: 1280,
      height: 960,
    },
    {
      image: ceremony,
      title: t("field.moments.coffeeCulture"),
      alt: "Traditional Ethiopian coffee ceremony",
      width: 1280,
      height: 960,
    },
  ];

  return (
    <Layout>
      <PageHero
        eyebrow={t("field.eyebrow")}
        title={t("field.title")}
        subtitle={t("field.subtitle")}
      />

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-accent">
              {t("field.lifeOnCoffeeLand")}
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
              {t("field.placesBehindCup")}
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              {t("field.followWork")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moments.map((moment) => (
              <figure
                key={moment.title}
                className="group relative aspect-4/3 overflow-hidden rounded-3xl bg-cream shadow-elegant"
              >
                <img
                  src={moment.image}
                  alt={moment.alt}
                  width={moment.width}
                  height={moment.height}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-6 pb-5 pt-14 text-lg font-display font-semibold text-white">
                  {moment.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-accent">
              {t("field.fieldVideos")}
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
              {t("field.watchSpace")}
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              {t("field.shareVideos")}
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-3xl shadow-elegant">
            <img
              src={drying}
              alt="Coffee drying at origin"
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/30">
              <span className="rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold shadow-gold">
                {t("field.videosComingSoon")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
