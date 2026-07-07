import farmers from "@/assets/farmers.jpg";
import ceremony from "@/assets/ceremony.jpg";
import { Layout, PageHero } from "@site/Layout";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Who We Are"
        title="Bridging Ethiopian Origins With Global Roasters"
        subtitle="Born in Addis Ababa, trusted across 40+ countries."
      />
      <section className="py-24 container-x grid lg:grid-cols-2 gap-14 items-center">
        <img
          src={farmers}
          alt="Ethiopian coffee farmers"
          loading="lazy"
          className="rounded-3xl shadow-elegant w-full aspect-4/5 object-cover"
        />
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Our Story
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-lg">
            BCS Coffee Market Consulting was founded in 2009 by a team of
            Ethiopian coffee professionals who saw a gap between the country's
            extraordinary coffee heritage and the international buyers seeking
            it. We've spent fifteen years closing that gap — visit by visit,
            container by container.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Today our consultancy operates as the trusted intermediary between
            verified Ethiopian exporters and roasters in Europe, Asia, North
            America, and the Middle East — facilitating over $50M in trade and
            shipping more than 5,000 tons.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["15+", "Years"],
              ["100+", "Partners"],
              ["40+", "Countries"],
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
              loading="lazy"
              className="rounded-3xl shadow-elegant w-full aspect-4/3 object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Rooted in Ethiopian Heritage
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed text-lg">
              Ethiopia is coffee's birthplace. Our work honors that lineage by
              ensuring fair, transparent trade — where producers, exporters, and
              buyers all win.
            </p>
            <Link
              to="/contact"
              className="inline-flex mt-8 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              Work With Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
