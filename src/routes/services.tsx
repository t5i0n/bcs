import { Link } from "react-router-dom";
import {
  Handshake,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Truck,
  Search,
  ArrowRight,
} from "lucide-react";
import { Layout, PageHero } from "@/components/site/Layout";

const SERVICES = [
  {
    icon: Handshake,
    title: "Coffee Export Consulting",
    desc: "Strategic sourcing advice tailored to your roastery's volume, profile, and shipping cadence.",
  },
  {
    icon: ShieldCheck,
    title: "Supplier Verification",
    desc: "Comprehensive due diligence licenses, export history, capacity audits, and reference checks.",
  },
  {
    icon: CheckCircle2,
    title: "Quality Control & Grading",
    desc: "Q-grader cupping, screen-size analysis, moisture testing, and pre-shipment sample approval.",
  },
  {
    icon: TrendingUp,
    title: "Market Research",
    desc: "Differential pricing, harvest forecasts, regional yield reports, and competitor intelligence.",
  },
  {
    icon: Truck,
    title: "Logistics Coordination",
    desc: "Phytosanitary, ECX certificates, ICO marks, FOB Djibouti coordination, and freight booking.",
  },
  {
    icon: Search,
    title: "Price Negotiation",
    desc: "Direct origin pricing with full transparency no hidden margins or kickbacks.",
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="What We Do"
        title="End-to-End Coffee Trade Services"
        subtitle="Six core services that take you from sourcing strategy to a container at your warehouse door."
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
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2.5 text-muted-foreground text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 rounded-3xl gradient-forest text-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl font-bold">
              Ready to start sourcing?
            </h3>
            <p className="mt-2 text-white/80">
              Book a free 30-minute consultation with our team.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-gold hover:scale-105 transition"
          >
            Request Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
