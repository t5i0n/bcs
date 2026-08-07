import { Layout, PageHero } from "@/components/site/Layout";
import ceremony from "@/assets/ceremony.jpg";
import cherries from "@/assets/cherries.jpg";
import drying from "@/assets/drying.jpg";
import farmers from "@/assets/farmers.jpg";
import grading from "@/assets/grading.jpg";
import washing from "@/assets/washing.jpg";

const moments = [
  {
    image: farmers,
    title: "At the farm",
    alt: "Coffee farmers at work in Ethiopia",
    width: 1280,
    height: 1280,
  },
  {
    image: cherries,
    title: "Harvest season",
    alt: "Freshly picked coffee cherries",
    width: 1280,
    height: 960,
  },
  {
    image: washing,
    title: "Washing stations",
    alt: "Coffee processing at a washing station",
    width: 1280,
    height: 960,
  },
  {
    image: drying,
    title: "Drying coffee",
    alt: "Coffee drying in the sun",
    width: 1280,
    height: 960,
  },
  {
    image: grading,
    title: "Quality in every lot",
    alt: "Coffee grading process",
    width: 1280,
    height: 960,
  },
  {
    image: ceremony,
    title: "Coffee culture",
    alt: "Traditional Ethiopian coffee ceremony",
    width: 1280,
    height: 960,
  },
];

export default function FieldPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="From the Field"
        title="See Ethiopian Coffee at Its Origin"
        subtitle="A closer look at the farms, people, and daily work behind every coffee we help bring to market."
      />

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-accent">
              Life on the coffee land
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
              The people and places behind the cup.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Follow our work from Ethiopia’s coffee-growing communities to the
              stations where each lot is prepared for the world.
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
              Field videos
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
              Watch this space for stories from origin.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              We’ll share short videos from farm visits, harvests, and coffee
              processing as they happen.
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
                Videos coming soon
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
