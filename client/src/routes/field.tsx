import { Layout, PageHero } from "@/components/site/Layout";
import { useTranslation } from "react-i18next";
import coffeeHarvestPoster from "@/assets/coffee-harvest-poster.jpg";
import coffeeLandscapePoster from "@/assets/coffee-landscape-poster.jpg";
import takingCoffeePoster from "@/assets/coffee-taking-for-sorting-video-poster.png";
import sortingCherriesPoster from "@/assets/coffee-sorting-cherries-video-poster.png";
import washingCoffeePoster from "@/assets/coffee-washing-video-poster.png";
import dryingWashedCoffeePoster from "@/assets/coffee-drying-washed-video-poster.png";
import dryingProcessPoster from "@/assets/coffee-drying-process-video-poster.png";
import coffeeVideoPoster from "@/assets/coffee-video-poster.jpg";
import dryingPoster from "@/assets/coffee-drying-video-poster.png";
import handpickedCherriesPoster from "@/assets/handpicked-cherries-poster.jpg";

export default function FieldPage() {
  const { t } = useTranslation();

  const fieldVideos = [
    {
      src: "/field-videos/coffee-landscape.MOV",
      poster: coffeeLandscapePoster,
      title: t("field.videoMoments.coffeeLandscape"),
    },
    {
      src: "/field-videos/coffee-harvest.MOV",
      poster: coffeeHarvestPoster,
      title: t("field.videoMoments.coffeeHarvest"),
    },
    {
      src: "/field-videos/handpicked-cherries.MOV",
      poster: handpickedCherriesPoster,
      title: t("field.videoMoments.handpickedCherries"),
    },
    {
      src: "/field-videos/Taking Coffee for Sorting.MOV",
      poster: takingCoffeePoster,
      title: t("field.moments.takingCoffeeForSorting"),
    },
    {
      src: "/field-videos/Sorting coffee cherries.MOV",
      poster: sortingCherriesPoster,
      title: t("field.moments.sortingCoffeeCherries"),
    },
    {
      src: "/field-videos/Cleaning:Washing coffee.MOV",
      poster: washingCoffeePoster,
      title: t("field.moments.washingCoffee"),
    },
    {
      src: "/field-videos/drying process.MOV",
      poster: dryingProcessPoster,
      title: t("field.moments.dryingWashedCoffee"),
    },
    {
      src: "/field-videos/dry.MOV",
      poster: dryingWashedCoffeePoster,
      title: t("field.moments.dryingWashedCoffee"),
    },
    {
      src: "/field-videos/coffee drying.MOV",
      poster: dryingPoster,
      title: t("field.moments.dryingCoffee"),
    },
  ];

  const startPreview = (video: HTMLVideoElement | null) => {
    if (video) void video.play().catch(() => undefined);
  };

  const stopPreview = (video: HTMLVideoElement | null) => {
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

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
            {fieldVideos.map((video) => (
              <figure
                key={video.src}
                tabIndex={0}
                className="group relative aspect-4/3 overflow-hidden rounded-3xl bg-black shadow-elegant outline-none focus-visible:ring-4 focus-visible:ring-accent"
                onMouseEnter={(event) =>
                  startPreview(event.currentTarget.querySelector("video"))
                }
                onMouseLeave={(event) =>
                  stopPreview(event.currentTarget.querySelector("video"))
                }
                onFocus={(event) =>
                  startPreview(event.currentTarget.querySelector("video"))
                }
                onBlur={(event) =>
                  stopPreview(event.currentTarget.querySelector("video"))
                }
                onTouchStart={(event) =>
                  startPreview(event.currentTarget.querySelector("video"))
                }
                onTouchEnd={(event) =>
                  stopPreview(event.currentTarget.querySelector("video"))
                }
              >
                <img
                  src={video.poster}
                  alt={video.title}
                  className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0 group-focus:opacity-0"
                  loading="lazy"
                />
                <video
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100"
                  aria-label={video.title}
                >
                  <source src={video.src} type="video/quicktime" />
                </video>
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-6 pb-5 pt-14 text-lg font-display font-semibold text-white">
                  {video.title}
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
            <video
              controls
              preload="metadata"
              poster={coffeeVideoPoster}
              className="h-full w-full object-cover bg-black"
              aria-label={t("field.fieldVideos")}
            >
              <source src="/videos/bcs coffee vid.mov" type="video/quicktime" />
              Your browser does not support embedded video.
            </video>
          </div>
        </div>
      </section>
    </Layout>
  );
}
