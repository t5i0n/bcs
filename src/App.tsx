import { Route, Routes, Link } from "react-router-dom";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";
import ServicesPage from "./routes/services";
import heroFarm from "@/assets/hero-farm.jpg";
import { ArrowRight } from "lucide-react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
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
