import { Layout, PageHero } from "@/components/site/Layout";

export default function BlogPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Insights"
        title="Coffee Market Stories, Trends, and Trade Intelligence"
        subtitle="Articles and updates for buyers, importers, and coffee professionals interested in Ethiopian origin markets."
      />
      <section className="py-24 container-x">
        <div className="rounded-3xl bg-background p-10 border border-border shadow-elegant">
          <h2 className="font-display text-3xl font-bold">Coming Soon</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-lg">
            We’re preparing thoughtful stories about Ethiopian coffee growing
            regions, exporter practices, sourcing strategies, and market
            dynamics. Check back soon for updates.
          </p>
        </div>
      </section>
    </Layout>
  );
}
