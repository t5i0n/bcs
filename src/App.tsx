import { Route, Routes, Link } from "react-router-dom";
import type { ReactNode } from "react";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";
import ServicesPage from "./routes/services";
import heroFarm from "@/assets/hero-farm.jpg";
import farmers from "@/assets/farmers.jpg";
import cherries from "@/assets/cherries.jpg";
import { ArrowRight } from "lucide-react";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />
            <AboutSection />
          </>
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
    </Routes>
  );
}
/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroFarm}
          alt="Ethiopian coffee farm at sunrise"
          width={1920}
          height={1280}
          className="w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.05_148/0.7)] to-transparent" />
      </div>

      <div className="container-x relative z-10 pt-32 pb-24 text-white">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Ethiopia ·
            Since 2009
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] text-balance">
            Connecting Ethiopian Coffee Excellence{" "}
            <span className="text-accent italic">With Global Markets</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/85 leading-relaxed text-balance">
            Trusted coffee consulting, exporter verification, quality sourcing,
            and market intelligence for international coffee buyers.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#origins"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-gold hover:scale-105 transition"
            >
              Explore Ethiopian Coffee
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/40 text-white font-semibold backdrop-blur bg-white/5 hover:bg-white/15 transition"
            >
              Request Consultation
            </Link>
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
          {[
            { v: "15+", l: "Years Experience" },
            { v: "100+", l: "Verified Partners" },
            { v: "40+", l: "Countries Served" },
            { v: "$50M+", l: "Trade Facilitated" },
          ].map((s, i) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl px-5 py-6 animate-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-accent">
                {s.v}
              </p>
              <p className="text-xs uppercase tracking-widest text-white/80 mt-1">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── ABOUT SECTION ───────────── */
function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-accent uppercase tracking-[0.25em] text-xs font-semibold mb-4">
      {children}
    </p>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-elegant">
            <img
              src={farmers}
              alt="Ethiopian coffee farmers"
              width={1280}
              height={1280}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover hover:scale-105 transition duration-700"
            />
          </div>
          <div className="hidden md:block absolute -bottom-8 -right-8 w-56 rounded-2xl overflow-hidden shadow-xl border-8 border-background">
            <img
              src={cherries}
              alt="Coffee cherries"
              width={400}
              height={300}
              loading="lazy"
              className="w-full h-44 object-cover"
            />
          </div>
          <div className="absolute -top-6 -left-6 bg-accent text-accent-foreground rounded-2xl px-6 py-5 shadow-gold">
            <p className="font-display text-4xl font-bold leading-none">15+</p>
            <p className="text-xs uppercase tracking-wider mt-1">
              Years of Trust
            </p>
          </div>
        </div>

        <div>
          <SectionEyebrow>About BCS</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
            Your Trusted Ethiopian Coffee Partner
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            BCS Coffee Market Consulting bridges the world's most discerning
            buyers with Ethiopia's finest verified exporters and producers. From
            single-origin micro-lots in Yirgacheffe to commercial-grade
            containers from Sidama, we deliver clarity, integrity, and quality
            at every step.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Founded in Addis Ababa, our team blends deep cultural expertise with
            international trade rigor — so you source with confidence, every
            harvest.
          </p>

          <div className="mt-10 space-y-6">
            {[
              {
                year: "2009",
                title: "Founded in Addis Ababa",
                desc: "Started as a local broker bridging producers and roasters.",
              },
              {
                year: "2014",
                title: "Global Expansion",
                desc: "First exports to Europe, Asia, and the Middle East.",
              },
              {
                year: "2019",
                title: "100+ Export Partnerships",
                desc: "Verified network across all major Ethiopian coffee regions.",
              },
              {
                year: "2024",
                title: "International Consulting",
                desc: "Full-spectrum advisory for buyers in 40+ countries.",
              },
            ].map((m, i) => (
              <div key={m.year} className="flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full gradient-forest text-white grid place-items-center font-display font-bold text-sm shadow-elegant group-hover:scale-110 transition">
                    {m.year}
                  </div>
                  {i < 3 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-4">
                  <h4 className="font-display text-lg font-semibold">
                    {m.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
