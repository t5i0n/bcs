import { Layout, PageHero } from "@/components/site/Layout";

export default function ProcessPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Our Process"
        title="How We Source, Verify, and Deliver Ethiopian Coffee"
        subtitle="A transparent process from farm to port, designed for international buyers who demand quality and trust."
      />
      <section className="py-24 container-x">
        <div className="grid gap-10">
          <div className="rounded-3xl bg-background p-8 border border-border shadow-elegant">
            <h2 className="font-display text-3xl font-bold">Sourcing</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We identify trusted producers across Ethiopia’s major coffee
              regions, evaluate their traceability, and build long-term supplier
              relationships that match your quality requirements.
            </p>
          </div>
          <div className="rounded-3xl bg-background p-8 border border-border shadow-elegant">
            <h2 className="font-display text-3xl font-bold">Verification</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every exporter is audited, every lot is sampled, and every
              shipment is vetted to ensure your coffee is authentic, properly
              documented, and ready for export.
            </p>
          </div>
          <div className="rounded-3xl bg-background p-8 border border-border shadow-elegant">
            <h2 className="font-display text-3xl font-bold">Delivery</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We coordinate logistics, shipping, and documentation so your
              coffee arrives at the right port on time and with complete export
              compliance.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
