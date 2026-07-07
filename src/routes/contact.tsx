import type { ComponentType, SVGProps } from "react";
import { Layout } from "@/components/site/Layout";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <Layout>
      <section className="gradient-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, oklch(0.74 0.15 80 / 0.7), transparent 50%)" }} />
        <div className="container-x relative pt-32 pb-24 grid lg:grid-cols-2 gap-14">
          <div>
            <p className="text-accent uppercase tracking-[0.25em] text-xs font-semibold">Get in Touch</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold text-balance">Let's Source Your Next Harvest.</h1>
            <p className="mt-5 text-white/80 text-lg leading-relaxed">
              Tell us about your roastery, volume, and flavor goals. A consultant will respond within one business day.
            </p>

            <div className="mt-10 space-y-5">
              <InfoRow icon={MapPin} title="Headquarters" lines={["Bole Sub-City, Addis Ababa, Ethiopia"]} />
              <InfoRow icon={Phone} title="Phone & WhatsApp" lines={["+251 11 555 0199", "+251 91 234 5678"]} />
              <InfoRow icon={Mail} title="Email" lines={["hello@bcscoffee.com", "trade@bcscoffee.com"]} />
            </div>

            <a href="https://wa.me/251912345678" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:scale-105 transition">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>

            <div className="mt-8 rounded-2xl overflow-hidden border border-white/20 h-64">
              <iframe
                title="Map of Addis Ababa"
                src="https://www.openstreetmap.org/export/embed.html?bbox=38.70%2C8.95%2C38.85%2C9.05&layer=mapnik&marker=9.0054%2C38.7636"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thank you — we'll be in touch within one business day."); }}
            className="rounded-3xl bg-white text-foreground p-8 md:p-10 shadow-elegant h-fit"
          >
            <h2 className="font-display text-2xl font-bold mb-6">Send an inquiry</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" required />
              <Field label="Company" name="company" />
              <Field label="Country" name="country" />
              <Field label="Email" name="email" type="email" required />
            </div>
            <Field label="Coffee Interest" name="interest" placeholder="e.g. Yirgacheffe washed G1, 5 tons" />
            <Field label="Message" name="message" textarea required />
            <button type="submit" className="mt-6 w-full py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-gold hover:scale-[1.02] transition">
              Send Inquiry
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function InfoRow({ icon: Icon, title, lines }: { icon: ComponentType<SVGProps<SVGSVGElement>>; title: string; lines: string[] }) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 backdrop-blur grid place-items-center text-accent">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        {lines.map((l) => <p key={l} className="text-sm text-white/70">{l}</p>)}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required, textarea, placeholder }: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean; placeholder?: string; }) {
  const cls = "w-full mt-1.5 px-4 py-3 rounded-xl border border-border bg-cream focus:bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition";
  return (
    <label className={`block ${textarea ? "sm:col-span-2 mt-4" : ""}`}>
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} placeholder={placeholder} className={cls} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}
