import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Coffee } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/origins", label: "Origins" },
  { to: "/process", label: "Process" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
              Market Consulting
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
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold shadow-gold hover:opacity-90 transition"
        >
          Request Consultation
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 rounded-md ${solid ? "text-foreground" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md text-foreground/90 hover:bg-cream"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold text-center"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
