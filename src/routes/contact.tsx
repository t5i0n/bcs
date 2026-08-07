import { Layout, PageHero } from "@/components/site/Layout";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { InfoRow } from "@/components/site/InfoRow";
import { ContactForm } from "@/components/site/ContactForm";

export default function ContactPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's Source Your Next Harvest"
        subtitle="Tell us about your roastery, volume, and flavor goals. A consultant will respond within one business day."
      />
      <section className="py-24 container-x grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <div className="rounded-3xl bg-background p-10 border border-border shadow-elegant">
            <h2 className="font-display text-3xl font-bold">
              Contact Information
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Reach out by email, phone, or WhatsApp — we're ready to support
              your next Ethiopian coffee sourcing plan.
            </p>
            <div className="mt-8 space-y-5">
              <InfoRow
                icon={MapPin}
                title="Headquarters"
                lines={["Addis Ababa, Ethiopia"]}
              />
              <InfoRow
                icon={Phone}
                title="Phone & WhatsApp"
                lines={["+251-973-053-737", "+251-912-345-678"]}
              />
              <InfoRow
                icon={Mail}
                title="Email"
                lines={["info@bcscoffee.et"]}
              />
            </div>
            <a
              href="https://wa.me/251912345678"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:scale-105 transition"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>

          <div className="mt-8 rounded-3xl overflow-hidden border border-border h-64">
            <iframe
              title="Map of Addis Ababa"
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.70%2C8.95%2C38.85%2C9.05&layer=mapnik&marker=9.0054%2C38.7636"
              className="w-full h-full grayscale-20"
              loading="lazy"
            />
          </div>
        </div>

        <ContactForm heading="Send an inquiry" />
      </section>
    </Layout>
  );
}

