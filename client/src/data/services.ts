import {
  Handshake,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Truck,
  Search,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  key: string;
};

export const SERVICES: Service[] = [
  {
    icon: Handshake,
    title: "Coffee Export Consulting",
    desc: "Strategic sourcing advice tailored to your roastery's volume, profile, and shipping cadence.",
    key: "exportConsulting",
  },
  {
    icon: ShieldCheck,
    title: "Supplier Verification",
    desc: "Comprehensive due diligence licenses, export history, capacity audits, and reference checks.",
    key: "supplierVerification",
  },
  {
    icon: CheckCircle2,
    title: "Quality Control & Grading",
    desc: "Q-grader cupping, screen-size analysis, moisture testing, and pre-shipment sample approval.",
    key: "qualityControl",
  },
  {
    icon: TrendingUp,
    title: "Market Research",
    desc: "Differential pricing, harvest forecasts, regional yield reports, and competitor intelligence.",
    key: "marketResearch",
  },
  {
    icon: Truck,
    title: "Logistics Coordination",
    desc: "Phytosanitary, ECX certificates, ICO marks, FOB Djibouti coordination, and freight booking.",
    key: "logistics",
  },
  {
    icon: Search,
    title: "Price Negotiation",
    desc: "Direct origin pricing with full transparency no hidden margins or kickbacks.",
    key: "priceNegotiation",
  },
];
