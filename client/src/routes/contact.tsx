import { Layout, PageHero } from "@/components/site/Layout";
import { useTranslation } from "react-i18next";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { InfoRow } from "@/components/site/InfoRow";

import { ContactForm } from "@/components/site/ContactForm";

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.pageTitle")}
        subtitle={t("contact.pageSubtitle")}
      />
      <section className="py-24 container-x grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <div className="rounded-3xl bg-background p-10 border border-border shadow-elegant">
            <h2 className="font-display text-3xl font-bold">
              {t("contact.contactInfoTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("contact.contactInfoDesc")}
            </p>
            <div className="mt-8 space-y-5">
              <InfoRow
                icon={MapPin}
                title={t("contact.headquarters")}
                lines={["Jemo Around Africa Building, Ethiopia"]}
              />
              <InfoRow
                icon={Phone}
                title={t("contact.phoneWhatsapp")}
                lines={["+251-973-053-737", "+251-951-626-242"]}
              />
              <InfoRow
                icon={Mail}
                title={t("contact.email")}
                lines={["info@bcscoffee.et"]}
              />
            </div>
            <a
              href="https://wa.me/251951626242"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:scale-105 transition"
            >
              <MessageCircle className="w-4 h-4" /> {t("contact.chatWhatsapp")}
            </a>
          </div>

          <div className="mt-8 rounded-3xl overflow-hidden border border-border h-64">
            <iframe
              title="Map of Jemo Africa Building"
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.6704%2C8.9171%2C38.7704%2C9.0171&layer=mapnik&marker=8.9671%2C38.7204"
              className="w-full h-full grayscale-20"
              loading="lazy"
            />
          </div>
        </div>

        <ContactForm heading={t("contact.sendInquiryHeading")} />
      </section>
    </Layout>
  );
}
