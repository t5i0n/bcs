import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Coffee, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export function Footer() {
  const { t } = useTranslation();
  const { getContent } = useSiteContent('footer');

  const description = getContent('footer.description', 'footer.description') || t('footer.description');
  const copyright = getContent('footer.copyright', 'footer.copyright') || t('footer.copyright');
  const origin = getContent('footer.origin', 'footer.origin') || t('footer.origin');

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
            {description}
          </p>
          <div className="flex gap-3 mt-5">
            {/* Telegram */}
            <a
              href="https://t.me/bcscaf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground transition"
              aria-label="Telegram"
              title="Telegram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/bekure-yimam-1a484525a"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.607H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/bcscoffeemarket?igsi=MTY0Nm9rNHNhcnhsNQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground transition"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        <FooterCol
          title={t("footer.company")}
          items={[
            { to: "/about", label: t("footer.about") },
            { to: "/services", label: t("footer.services") },
            { to: "/contact", label: t("footer.contact") },
          ]}
        />
        <FooterCol
          title={t("footer.coffeeResources")}
          items={[
            { to: "/origins", label: t("footer.coffeeOrigins") },
            { to: "/field", label: t("footer.fromTheField") },
          ]}
        />

        <div>
          <h4 className="font-display text-white text-lg mb-4">{t("footer.contactTitle")}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 text-accent" /> Addis Ababa, Ethiopia
            </li>
            <li className="flex gap-2.5">
              <Phone className="w-4 h-4 mt-0.5 text-accent" /> +251-973-053-737
            </li>
            <li className="flex gap-2.5">
              <MessageCircle className="w-4 h-4 mt-0.5 text-accent" />
              +251-951-626-242
            </li>
            <li className="flex gap-2.5">
              <Mail className="w-4 h-4 mt-0.5 text-accent" /> info@bcscoffee.et
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} BCS Coffee Market Consulting. {copyright}
          </p>
          <p>{origin}</p>
        </div>
      </div>
    </footer>
  );
}
// Reusable footer column component that displays a title and a list of navigation links.
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
