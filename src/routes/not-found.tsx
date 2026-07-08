import { Link } from "react-router-dom";
import { Layout, PageHero } from "@/components/site/Layout";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Page Not Found"
        title="We couldn't find that page"
        subtitle="The link may be broken or the page may have moved. Return to the homepage or continue exploring our services."
      />
      <section className="py-24 container-x text-center">
        <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-border bg-cream p-14 shadow-elegant">
          <p className="text-7xl font-display font-bold text-primary">404</p>
          <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold text-foreground">
            Oops, this page doesn't exist.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Explore our homepage, learn about our consulting services, or get in
            touch for a custom sourcing plan.
          </p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground shadow-gold hover:opacity-90 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </section>
    </Layout>
  );
}
