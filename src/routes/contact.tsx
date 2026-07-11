import type { ComponentType, SVGProps } from "react";
import { Layout, PageHero } from "@/components/site/Layout";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";

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
                lines={["Bole Sub-City, Addis Ababa, Ethiopia"]}
              />
              <InfoRow
                icon={Phone}
                title="Phone & WhatsApp"
                lines={["+251 11 555 0199", "+251 91 234 5678"]}
              />
              <InfoRow
                icon={Mail}
                title="Email"
                lines={["hello@bcscoffee.com", "trade@bcscoffee.com"]}
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
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you — we'll be in touch within one business day.");
          }}
          className="rounded-3xl bg-white text-foreground p-8 md:p-10 shadow-elegant"
        >
          <h2 className="font-display text-2xl font-bold mb-6">
            Send an inquiry
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" required />
            <Field label="Company" name="company" />
            <Field label="Country" name="country" />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field
            label="Coffee Interest"
            name="interest"
            placeholder="e.g. Yirgacheffe washed G1, 5 tons"
          />
          <Field label="Message" name="message" textarea required />
          <button
            type="submit"
            className="mt-6 w-full py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-gold hover:scale-[1.02] transition"
          >
            Send Inquiry
          </button>
        </form>
      </section>
    </Layout>
  );
}

function InfoRow({
  icon: Icon,
  title,
  lines,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 backdrop-blur grid place-items-center text-accent">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm text-white/70">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const cls =
    "w-full mt-1.5 px-4 py-3 rounded-xl border border-border bg-cream focus:bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition";
  return (
    <label className={`block ${textarea ? "sm:col-span-2 mt-4" : ""}`}>
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          placeholder={placeholder}
          className={cls}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}
