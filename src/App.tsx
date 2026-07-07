import { Route, Routes, Link } from "react-router-dom";
import { useState, type ComponentType, type ReactNode } from "react";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";
import ServicesPage from "./routes/services";
import OriginsPage from "./routes/origins";
import ProcessPage from "./routes/process";
import BlogPage from "./routes/blog";
import { Layout } from "@/components/site/Layout";
import heroFarm from "@/assets/hero-farm.jpg";
import farmers from "@/assets/farmers.jpg";
import cherries from "@/assets/cherries.jpg";
import {
  ArrowRight,
  Handshake,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Truck,
  Search,
  MapPin,
  Mountain,
  Leaf,
  Calendar,
  type LucideIcon,
} from "lucide-react";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout transparentNav>
            <Hero />
            <AboutSection />
            <ServicesSection />
            <OriginsSection />
            <ContactSection />
          </Layout>
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/origins" element={<OriginsPage />} />
      <Route path="/process" element={<ProcessPage />} />
      <Route path="/blog" element={<BlogPage />} />
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
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.18_0.05_148/0.7)] to-transparent" />
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
function SectionEyebrow({
  children,
  inverted,
}: {
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <p
      className={`uppercase tracking-[0.25em] text-xs font-semibold mb-4 ${inverted ? "text-white" : "text-accent"}`}
    >
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
              className="w-full aspect-4/5 object-cover hover:scale-105 transition duration-700"
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

/* ───────────── SERVICES SECTION ───────────── */
function ServicesSection() {
  const SERVICES = [
    {
      icon: Handshake,
      title: "Coffee Export Consulting",
      desc: "Helping buyers source reliable Ethiopian coffee with expert market guidance.",
    },
    {
      icon: ShieldCheck,
      title: "Supplier Verification",
      desc: "Background checks, exporter validation, and end-to-end due diligence.",
    },
    {
      icon: CheckCircle2,
      title: "Quality Control & Grading",
      desc: "Professional cupping, grading, and pre-shipment inspection.",
    },
    {
      icon: TrendingUp,
      title: "Market Research",
      desc: "Coffee market trends, pricing intelligence, and opportunity analysis.",
    },
    {
      icon: Truck,
      title: "Logistics Coordination",
      desc: "Export documentation, freight, and shipping support to any port.",
    },
    {
      icon: Search,
      title: "Price Negotiation",
      desc: "Helping buyers secure transparent, competitive pricing direct from origin.",
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-cream">
      <div className="container-x">
        <div className="max-w-2xl">
          <SectionEyebrow>What We Do</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
            End-to-End Coffee Services
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A complete consulting and trade desk for international buyers — from
            sourcing decisions to shipping containers.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-2xl bg-background p-7 border border-border hover:border-accent/60 hover:-translate-y-1 hover:shadow-elegant transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-forest text-white grid place-items-center mb-5 group-hover:rotate-6 transition">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2.5 text-muted-foreground text-sm leading-relaxed">
                {s.desc}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OriginsSection() {
  const REGIONS = [
    {
      name: "Yirgacheffe",
      altitude: "1,800–2,200m",
      process: "Washed, Natural",
      notes: "Floral, citrus, tea-like body",
      season: "Oct – Jan",
    },
    {
      name: "Sidama",
      altitude: "1,500–2,200m",
      process: "Washed, Natural",
      notes: "Berry, wine, sweet citrus",
      season: "Oct – Dec",
    },
    {
      name: "Guji",
      altitude: "1,800–2,300m",
      process: "Washed, Natural",
      notes: "Berry, chocolate, jasmine",
      season: "Oct – Jan",
    },
    {
      name: "Limu",
      altitude: "1,400–2,000m",
      process: "Washed",
      notes: "Balanced, spicy, winey",
      season: "Nov – Feb",
    },
    {
      name: "Jimma",
      altitude: "1,400–1,800m",
      process: "Natural",
      notes: "Earthy, mild, full body",
      season: "Nov – Feb",
    },
    {
      name: "Nekemte",
      altitude: "1,500–2,100m",
      process: "Natural",
      notes: "Fruity, mocha, bold",
      season: "Oct – Jan",
    },
    {
      name: "Harrar",
      altitude: "1,500–2,100m",
      process: "Natural",
      notes: "Blueberry, wine, mocha",
      season: "Oct – Feb",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section id="origins" className="py-24 md:py-32 bg-background">
      <div className="container-x">
        <div className="max-w-2xl">
          <SectionEyebrow>Coffee Origins</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
            Seven Regions. One Legendary Origin.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Ethiopia is the birthplace of coffee — each region produces a
            distinct cup profile shaped by altitude, soil, and tradition.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div className="relative aspect-square max-w-xl mx-auto lg:mx-0 rounded-3xl bg-cream border border-border p-8 overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, oklch(0.36 0.08 148 / 0.4), transparent 65%)",
              }}
            />
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full p-8"
            >
              <path
                d="M80 140 Q120 80 200 90 Q290 100 320 160 Q345 220 310 280 Q260 340 200 330 Q130 320 90 270 Q60 210 80 140 Z"
                fill="oklch(0.36 0.08 148 / 0.15)"
                stroke="oklch(0.36 0.08 148 / 0.6)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
            {[
              { x: 35, y: 50 },
              { x: 50, y: 60 },
              { x: 55, y: 70 },
              { x: 42, y: 75 },
              { x: 38, y: 65 },
              { x: 30, y: 55 },
              { x: 72, y: 45 },
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all ${
                  active === i ? "scale-125 z-10" : "hover:scale-110"
                }`}
              >
                <span className="relative grid place-items-center">
                  <span
                    className={`absolute inset-0 rounded-full ${
                      active === i ? "bg-accent animate-ping" : ""
                    }`}
                  />
                  <MapPin
                    className={`w-6 h-6 ${
                      active === i ? "text-accent" : "text-primary"
                    }`}
                    fill="currentColor"
                  />
                </span>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[11px] font-semibold whitespace-nowrap bg-background px-2 py-0.5 rounded-full border border-border shadow-sm">
                  {REGIONS[i].name}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl gradient-forest text-white p-8 shadow-elegant">
              <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">
                Featured Region
              </p>
              <h3 className="font-display text-4xl font-bold mt-3">
                {REGIONS[active].name}
              </h3>
              <p className="mt-2 text-white/80 italic">
                "{REGIONS[active].notes}"
              </p>

              <div className="mt-7 grid grid-cols-3 gap-4">
                <Stat
                  icon={Mountain}
                  label="Altitude"
                  value={REGIONS[active].altitude}
                />
                <Stat
                  icon={Leaf}
                  label="Processing"
                  value={REGIONS[active].process}
                />
                <Stat
                  icon={Calendar}
                  label="Harvest"
                  value={REGIONS[active].season}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {REGIONS.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => setActive(i)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    active === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-cream hover:bg-accent/20 text-foreground"
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-3">
      <Icon className="w-4 h-4 text-accent" />
      <p className="text-[10px] uppercase tracking-wider text-white/70 mt-2">
        {label}
      </p>
      <p className="text-sm font-semibold mt-0.5">{value}</p>
    </div>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 gradient-forest text-white relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, oklch(0.74 0.15 80 / 0.7), transparent 50%)",
        }}
      />
      <div className="container-x relative grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <SectionEyebrow inverted>Get in Touch</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
            Let's Source Your Next Harvest.
          </h2>
          <p className="mt-5 text-white/80 text-lg leading-relaxed">
            Tell us about your roastery, volume, and flavor goals. A consultant
            will respond within one business day.
          </p>

          <div className="mt-10 space-y-4">
            <InfoRow
              icon={MapPin}
              title="Headquarters"
              lines={["Bole Sub-City, Addis Ababa", "Ethiopia"]}
            />
            <InfoRow
              icon={() => <span className="text-lg">📞</span>}
              title="Phone & WhatsApp"
              lines={["+251 11 555 0199", "+251 91 234 5678"]}
            />
            <InfoRow
              icon={() => <span className="text-lg">✉</span>}
              title="Email"
              lines={["hello@bcscoffee.com", "trade@bcscoffee.com"]}
            />
          </div>

          <a
            href="https://wa.me/251912345678"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:scale-105 transition"
          >
            <span>💬</span> Chat on WhatsApp
          </a>

          <div className="mt-8 rounded-2xl overflow-hidden border border-white/20 h-56">
            <iframe
              title="Map of Addis Ababa"
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.70%2C8.95%2C38.85%2C9.05&layer=mapnik&marker=9.0054%2C38.7636"
              className="w-full h-full grayscale-20"
              loading="lazy"
            />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you — we'll be in touch within one business day.");
          }}
          className="rounded-3xl bg-white text-foreground p-8 md:p-10 shadow-elegant"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" required />
            <Field label="Company" name="company" />
            <Field label="Country" name="country" />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field
            label="Coffee Interest"
            name="interest"
            placeholder="e.g. Yirgacheffe washed Grade 1, 5 tons"
          />
          <Field label="Message" name="message" textarea required />
          <button
            type="submit"
            className="mt-6 w-full py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-gold hover:scale-[1.02] transition"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  title,
  lines,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 backdrop-blur grid place-items-center text-accent">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm text-white/70">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const cls =
    "w-full mt-1.5 px-4 py-3 rounded-xl border border-border bg-cream focus:bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition";
  return (
    <label className={`block ${textarea ? "sm:col-span-2 mt-4" : ""}`}>
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          placeholder={placeholder}
          className={cls}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}
