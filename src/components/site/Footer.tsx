import { Link as RouterLink } from "react-router-dom";
import {
  Coffee,
  Link as LinkIcon,
  Link2,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.22_0.03_145)] text-white/80">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-10 h-10 rounded-full bg-accent text-accent-foreground grid place-items-center">
              <Coffee className="w-5 h-5" />
            </span>
            <span className="font-display text-xl font-bold text-white">
              BCS Coffee
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Connecting Ethiopian coffee excellence with global markets through
            trusted consulting, sourcing, and export expertise since 2009.
          </p>
          <div className="flex gap-3 mt-5">
            {[LinkIcon, ExternalLink, Link2].map((I, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground transition"
                aria-label="social"
              >
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Company"
          items={[
            { to: "/about", label: "About" },
            { to: "/services", label: "Services" },
            { to: "/blog", label: "Blog" },
            { to: "/contact", label: "Contact" },
          ]}
        />
        <FooterCol
          title="Coffee Resources"
          items={[
            { to: "/origins", label: "Coffee Origins" },
            { to: "/process", label: "Processing Methods" },
            { to: "/process", label: "Export Guide" },
            { to: "/blog", label: "Insights" },
          ]}
        />

        <div>
          <h4 className="font-display text-white text-lg mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 text-accent" /> Bole Road, Addis
              Ababa, Ethiopia
            </li>
            <li className="flex gap-2.5">
              <Phone className="w-4 h-4 mt-0.5 text-accent" /> +251 11 555 0199
            </li>
            <li className="flex gap-2.5">
              <Mail className="w-4 h-4 mt-0.5 text-accent" />{" "}
              hello@bcscoffee.com
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} BCS Coffee Market Consulting. All
            rights reserved.
          </p>
          <p>Origin: Ethiopia · Serving 40+ countries worldwide</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { to: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-display text-white text-lg mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {items.map((i, idx) => (
          <li key={idx}>
            <RouterLink to={i.to} className="hover:text-accent transition">
              {i.label}
            </RouterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
