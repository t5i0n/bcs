import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({
  children,
  transparentNav = false,
}: {
  children: ReactNode;
  transparentNav?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar transparent={transparentNav} />
      <main className={transparentNav ? "" : "pt-20"}>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative gradient-forest text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.74 0.15 80 / 0.6), transparent 50%)",
        }}
      />
      <div className="container-x relative py-24 md:py-32 text-center max-w-3xl">
        {eyebrow && (
          <p className="text-accent uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-6xl font-bold text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-white/80 text-lg leading-relaxed text-balance">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
