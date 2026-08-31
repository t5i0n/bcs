import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Coffee, Moon, Sun } from "lucide-react";
import { useTheme } from "@/use-theme";
import { LanguageSelector } from "./LanguageSelector";

const links = [
  { to: "/", labelKey: "nav.home" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/services", labelKey: "nav.services" },
  { to: "/origins", labelKey: "nav.origins" },
  { to: "/field", labelKey: "nav.field" },
  { to: "/contact", labelKey: "nav.contact" },
] as const;

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparent || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span
            className={`w-10 h-10 rounded-full grid place-items-center transition-colors ${
              solid
                ? "bg-primary text-primary-foreground"
                : "bg-white/15 text-white backdrop-blur"
            }`}
          >
            <Coffee className="w-5 h-5" />
          </span>
          <span className="leading-tight">
            <span
              className={`block font-display text-lg font-bold ${
                solid ? "text-foreground" : "text-white"
              }`}
            >
              BCS Coffee
            </span>
            <span
              className={`block text-[10px] uppercase tracking-[0.18em] ${
                solid ? "text-muted-foreground" : "text-white/70"
              }`}
            >
              {t("nav.brandSubtitle")}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }: { isActive: boolean }) =>
                `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  solid
                    ? "text-foreground/80 hover:text-primary hover:bg-cream"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                } ${isActive ? (solid ? "text-primary bg-cream" : "text-white bg-white/15") : ""}`.trim()
              }
            >
              {t(l.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSelector solid={solid} />
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? t("nav.switchToLight") : t("nav.switchToDark")
            }
            className={`p-2.5 rounded-full transition-colors ${
              solid
                ? "text-foreground/80 hover:text-foreground hover:bg-cream"
                : "text-white/85 hover:text-white hover:bg-white/10"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold shadow-gold hover:opacity-90 transition"
          >
            {t("common.requestConsultation")}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden p-2 rounded-md ${solid ? "text-foreground" : "text-white"}`}
            aria-label={t("nav.toggleMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-background border-t border-border"
        >
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md text-foreground/90 hover:bg-cream"
              >
                {t(l.labelKey)}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold text-center"
            >
              {t("common.requestConsultation")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
