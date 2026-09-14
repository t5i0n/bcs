import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { type ReactNode } from "react";
import { Layout } from "@/components/site/Layout";
import { ContactForm } from "@/components/site/ContactForm";
import { InfoRow } from "@/components/site/InfoRow";
import { SERVICES } from "@/data/services";
import { EthiopianCoffeeMap } from "@/components/site/EthiopianCoffeeMap";
import { useSiteContent } from "@/hooks/useSiteContent";
import heroFarm from "@/assets/hero-farm.jpg";
import teamPhoto from "@/assets/team.jpg";
import cherries from "@/assets/cherries.jpg";
import hajiLogo from "@/assets/haji-abatu-logo.png";
import kkgtLogo from "@/assets/kkgt-logo.png";
import zelalemLogo from "@/assets/zelalem-logo.png";
import gujiLogo from "@/assets/guji-logo.jpg";
import bukuAbalLogo from "@/assets/buku-abal-logo.png";
import birbsaLogo from "@/assets/birbsa-logo.png";
import meOlyadLogo from "@/assets/me-olyad-logo.png";
import birhanLogo from "@/assets/birhan-logo.png";
import emulkeyerLogo from "@/assets/emulkeyer-logo.png";
import edemealemLogo from "@/assets/edemealem-logo.svg";
import sakichaLogo from "@/assets/Sakicha Trading PLC.png";
import { StackedCardCarousel } from "@/components/site/StackedCardCarousel";
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Star,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <Layout transparentNav>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <OriginsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <ContactSection />
    </Layout>
  );
}

function Hero() {
  const { t } = useTranslation();
  const { getContent } = useSiteContent("home");

  // CMS keys map to i18n fallbacks
  const heroTitle = t("hero.title", { returnObjects: true });
  const title1 = getContent(
    "home.hero.title1",
    "",
    Array.isArray(heroTitle) ? heroTitle[0] : heroTitle,
  );
  const title2 = getContent(
    "home.hero.title2",
    "",
    Array.isArray(heroTitle) ? heroTitle[1] : "",
  );
  const description =
    getContent("home.hero.description", "hero.subtitle") || t("hero.subtitle");
  const cta1 =
    getContent("home.hero.cta1", "hero.exploreCoffee") ||
    t("hero.exploreCoffee");
  const cta2 =
    getContent("home.hero.cta2", "common.requestConsultation") ||
    t("common.requestConsultation");

  const stats = [
    {
      v: getContent("home.stats.years", "", "15+"),
      l: t("common.yearsExperience"),
    },
    {
      v: getContent("home.stats.exporters", "", "100+"),
      l: t("common.verifiedExporters"),
    },
    {
      v: getContent("home.stats.countries", "", "40+"),
      l: t("common.countriesServed"),
    },
    {
      v: getContent("home.stats.trade", "", "$50M+"),
      l: t("common.tradeFacilitated"),
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {" "}
        <img
          src={heroFarm}
          alt="Ethiopian coffee farm at sunrise"
          width={1920}
          height={1280}
          className="w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.18_0.05_148/0.7)] to-transparent" />
      </div>

      <div className="container-x relative z-10 pt-32 pb-24 text-white">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text */}
          <div className="flex-1 max-w-3xl">
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] text-balance">
              <span>{title1}</span>
              {title2 && (
                <>
                  <br />
                  <span className="text-accent italic">{title2}</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/85 leading-relaxed text-balance">
              {description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#origins"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-gold hover:scale-105 transition"
              >
                {cta1}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/40 text-white font-semibold backdrop-blur bg-white/5 hover:bg-white/15 transition"
              >
                {cta2}
              </Link>
            </div>
          </div>

          {/* Right: Photo Carousel */}
          <div className="flex-shrink-0 hidden md:block">
            <StackedCardCarousel />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl px-5 py-6 animate-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-accent">
                {s.v}
              </p>
              <p className="text-xs uppercase tracking-widest text-white/80 mt-1">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionEyebrow({
  children,
  inverted,
}: {
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <p
      className={`uppercase tracking-[0.25em] text-xs font-semibold mb-4 ${inverted ? "text-white" : "text-gold-deep"}`}
    >
      {children}
    </p>
  );
}

function AboutSection() {
  const { t } = useTranslation();
  const { getContent } = useSiteContent("home");

  const eyebrow =
    getContent("home.about.badge", "about.eyebrow") || t("about.eyebrow");
  const title =
    getContent("home.about.title", "about.title") || t("about.title");
  const description1 =
    getContent("home.about.description", "about.description1") ||
    t("about.description1");
  const description2 =
    getContent("home.about.mission", "about.description2") ||
    t("about.description2");
  const description3 = t("about.description3");
  const timeline = [
    {
      year: "2009",
      titleKey: "home.timeline.2009.title",
      descKey: "home.timeline.2009.description",
      i18nTitle: "about.timeline.2009.title",
      i18nDesc: "about.timeline.2009.desc",
    },
    {
      year: "2014",
      titleKey: "home.timeline.2014.title",
      descKey: "home.timeline.2014.description",
      i18nTitle: "about.timeline.2014.title",
      i18nDesc: "about.timeline.2014.desc",
    },
    {
      year: "2019",
      titleKey: "home.timeline.2019.title",
      descKey: "home.timeline.2019.description",
      i18nTitle: "about.timeline.2019.title",
      i18nDesc: "about.timeline.2019.desc",
    },
    {
      year: "2024",
      titleKey: "home.timeline.2024.title",
      descKey: "home.timeline.2024.description",
      i18nTitle: "about.timeline.2024.title",
      i18nDesc: "about.timeline.2024.desc",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-elegant">
            <img
              src={teamPhoto}
              alt="BCS team"
              width={1280}
              height={1280}
              loading="lazy"
              className="w-full aspect-4/5 object-cover hover:scale-105 transition duration-700"
            />
          </div>
          <div className="hidden md:block absolute -bottom-8 -right-8 w-56 rounded-2xl overflow-hidden shadow-xl border-8 border-background">
            <img
              src={cherries}
              alt="Coffee cherries"
              width={400}
              height={300}
              loading="lazy"
              className="w-full h-44 object-cover"
            />
          </div>
          <div className="absolute -top-6 -left-6 bg-accent text-accent-foreground rounded-2xl px-6 py-5 shadow-gold">
            <p className="font-display text-4xl font-bold leading-none">15+</p>
            <p className="text-xs uppercase tracking-wider mt-1">
              {t("common.yearsOfTrust")}
            </p>
          </div>
        </div>

        <div>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
            {title}
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            {description1}
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {description2}
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {description3}
          </p>

          <div className="mt-10 space-y-6">
            {timeline.map((m, i) => (
              <div key={m.year} className="flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full gradient-forest text-white grid place-items-center font-display font-bold text-sm shadow-elegant group-hover:scale-110 transition">
                    {m.year}
                  </div>
                  {i < 3 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-4">
                  <h4 className="font-display text-lg font-semibold">
                    {getContent(m.titleKey, m.i18nTitle) || t(m.i18nTitle)}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getContent(m.descKey, m.i18nDesc) || t(m.i18nDesc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t } = useTranslation();
  const { getContent } = useSiteContent("home");

  const eyebrow =
    getContent("home.services.badge", "services.eyebrow") ||
    t("services.eyebrow");
  const title =
    getContent("home.services.title", "services.homeTitle") ||
    t("services.homeTitle");
  const description =
    getContent("home.services.description", "services.homeSubtitle") ||
    t("services.homeSubtitle");

  return (
    <section id="services" className="py-24 md:py-32 bg-cream">
      <div className="container-x">
        <div className="max-w-2xl">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">{description}</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, index) => (
            <div
              key={s.title}
              className="group relative rounded-2xl bg-background p-7 border border-border hover:border-accent/60 hover:-translate-y-1 hover:shadow-elegant transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-forest text-white grid place-items-center mb-5 group-hover:rotate-6 transition">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold">
                {getContent(
                  `home.services.${index + 1}.title`,
                  `services.items.${s.key}.title`,
                ) || t(`services.items.${s.key}.title`)}
              </h3>
              <p className="mt-2.5 text-muted-foreground text-sm leading-relaxed">
                {getContent(
                  `home.services.${index + 1}.description`,
                  `services.items.${s.key}.desc`,
                ) || t(`services.items.${s.key}.desc`)}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
              >
                {t("common.learnMore")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OriginsSection() {
  const { t } = useTranslation();
  const { getContent } = useSiteContent("home");

  const eyebrow =
    getContent("home.origins.badge", "origins.eyebrow") || t("origins.eyebrow");
  const title =
    getContent("home.origins.title", "origins.homeTitle") ||
    t("origins.homeTitle");
  const description =
    getContent("home.origins.description", "origins.homeSubtitle") ||
    t("origins.homeSubtitle");

  return (
    <section id="origins" className="py-24 md:py-32 bg-background">
      <div className="container-x">
        <div className="max-w-2xl">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">{description}</p>
        </div>
        <div className="mt-14">
          <EthiopianCoffeeMap />
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const { t } = useTranslation();
  const { getContent } = useSiteContent("home");

  const eyebrow =
    getContent("home.whyUs.badge", "whyUs.eyebrow") || t("whyUs.eyebrow");
  const title =
    getContent("home.whyUs.title", "whyUs.title") || t("whyUs.title");
  const description =
    getContent("home.whyUs.description", "whyUs.subtitle") ||
    t("whyUs.subtitle");

  const features = [
    {
      icon: Sparkles,
      titleKey: "home.whyUs.1.title",
      descKey: "home.whyUs.1.description",
      i18nTitle: "whyUs.verifiedQuality",
      i18nDesc: "whyUs.verifiedQualityDesc",
    },
    {
      icon: Star,
      titleKey: "home.whyUs.2.title",
      descKey: "home.whyUs.2.description",
      i18nTitle: "whyUs.trustedRelationships",
      i18nDesc: "whyUs.trustedRelationshipsDesc",
    },
    {
      icon: ShieldCheck,
      titleKey: "home.whyUs.3.title",
      descKey: "home.whyUs.3.description",
      i18nTitle: "whyUs.exportConfidence",
      i18nDesc: "whyUs.exportConfidenceDesc",
    },
  ];

  const commitmentBadge =
    getContent("home.whyUs.commitment.badge", "whyUs.ourCommitment") ||
    t("whyUs.ourCommitment");
  const commitmentTitle =
    getContent("home.whyUs.commitment.title", "whyUs.commitmentTitle") ||
    t("whyUs.commitmentTitle");
  const commitmentDesc =
    getContent("home.whyUs.commitment.description", "whyUs.commitmentDesc") ||
    t("whyUs.commitmentDesc");
  const commitmentCta =
    getContent("home.whyUs.commitment.cta", "whyUs.seeLifeAtOrigin") ||
    t("whyUs.seeLifeAtOrigin");

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="container-x grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <div>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">
            {title}
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>

          <div className="mt-10 space-y-4">
            {features.map((item) => (
              <div
                key={item.titleKey}
                className="flex gap-4 p-5 rounded-3xl bg-background border border-border"
              >
                <div className="w-14 h-14 rounded-3xl grid place-items-center bg-accent text-accent-foreground">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {getContent(item.titleKey, item.i18nTitle) ||
                      t(item.i18nTitle)}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {getContent(item.descKey, item.i18nDesc) ||
                      t(item.i18nDesc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-[2.5rem] overflow-hidden p-10 text-white shadow-elegant"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #b37a14 0%, #c08a1f 30%, #c98f24 60%, #d38a31 100%)",
          }}
        >
          <p className="uppercase tracking-[0.28em] text-xs text-white/80">
            {commitmentBadge}
          </p>
          <h3 className="mt-6 font-display text-4xl font-bold">
            {commitmentTitle}
          </h3>
          <p className="mt-6 text-white/90 leading-relaxed">{commitmentDesc}</p>
          <Link
            to="/field"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/90 hover:text-white"
          >
            {commitmentCta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { t } = useTranslation();
  const { getContent } = useSiteContent("home");

  const eyebrow =
    getContent("home.testimonials.badge", "testimonials.eyebrow") ||
    t("testimonials.eyebrow");
  const title =
    getContent("home.testimonials.title", "testimonials.title") ||
    t("testimonials.title");
  const description =
    getContent("home.testimonials.description", "testimonials.subtitle") ||
    t("testimonials.subtitle");

  const partners = [
    { logo: hajiLogo, name: "Haji Abatu Abdela Coffee Export" },
    { logo: kkgtLogo, name: "KKGT Import & Export" },
    { logo: zelalemLogo, name: "Zelalem Eshetu Coffee Exporter" },
    { logo: gujiLogo, name: "Guji Coffee Export" },
    { logo: bukuAbalLogo, name: "Buku Abal Trading PLC" },
    { logo: sakichaLogo, name: "Sakicha Trading PLC" },
    { logo: birbsaLogo, name: "Birbsa Trading PLC" },
    { logo: meOlyadLogo, name: "Me-Olyad Trading PLC" },
    { logo: birhanLogo, name: "Birhan Coffee" },
    { logo: emulkeyerLogo, name: "Emulkeyer Nuru Import Export" },
    { logo: edemealemLogo, name: "Edemealem Tilahun Group" },
  ];

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Scrolling logos carousel */}
      <div className="mt-14 relative">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex w-max animate-scroll">
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-8 flex flex-col items-center gap-4"
            >
              <div className="w-40 h-40 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center p-4 hover:shadow-md transition-shadow">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useTranslation();
  const { getContent } = useSiteContent("home");

  const eyebrow =
    getContent("home.contact.badge", "contact.eyebrow") || t("contact.eyebrow");
  const title =
    getContent("home.contact.title", "contact.homeTitle") ||
    t("contact.homeTitle");
  const description =
    getContent("home.contact.description", "contact.homeSubtitle") ||
    t("contact.homeSubtitle");
  const headquarters = getContent(
    "home.contact.headquarters",
    "",
    "Jemo Around Africa Building, Ethiopia",
  );
  const phone1 = getContent("home.contact.phone1", "", "+251-973-053-737");
  const phone2 = getContent("home.contact.phone2", "", "+251-951-626-242");
  const email = getContent("home.contact.email", "", "info@bcscoffeemarket.com");
  const whatsapp =
    getContent("home.contact.whatsapp", "contact.chatWhatsapp") ||
    t("contact.chatWhatsapp");

  return (
    <section
      id="contact"
      className="py-24 md:py-32 gradient-forest text-white relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, oklch(0.74 0.15 80 / 0.7), transparent 50%)",
        }}
      />
      <div className="container-x relative grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <SectionEyebrow inverted>{eyebrow}</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-balance">
            {title}
          </h2>
          <p className="mt-5 text-white/80 text-lg leading-relaxed">
            {description}
          </p>

          <div className="mt-10 space-y-4">
            <InfoRow
              dark
              icon={MapPin}
              title={t("contact.headquarters")}
              lines={[headquarters]}
            />
            <InfoRow
              dark
              icon={Phone}
              title={t("contact.phoneWhatsapp")}
              lines={[phone1, phone2]}
            />
            <InfoRow
              dark
              icon={Mail}
              title={t("contact.email")}
              lines={[email]}
            />
          </div>

          <a
            href="https://wa.me/251951626242"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:scale-105 transition"
          >
            <MessageCircle className="w-4 h-4" /> {whatsapp}
          </a>
          <a
            href="weixin://dl/chat?%2B251973053737"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-6 py-3 rounded-full bg-[#07C160] text-white font-semibold hover:scale-105 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.108.24-.243 0-.06-.023-.12-.038-.177l-.327-1.233a.49.49 0 0 1 .176-.553C23.452 18.12 24 16.52 24 14.782c0-3.237-3.024-5.838-7.062-5.924zm-2.85 2.87c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
            </svg>
            Chat on WeChat: +251-973-053-737
          </a>

          <div className="mt-8 rounded-2xl overflow-hidden border border-white/20">
            <iframe
              title="Map of Jemo Africa Building"
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.6704%2C8.9171%2C38.7704%2C9.0171&layer=mapnik&marker=8.9671%2C38.7204"
              className="w-full h-56 grayscale-20"
              loading="lazy"
            />
            <a
              href="https://www.openstreetmap.org/way/711723419#map=19/8.967076/38.720398"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              <MapPin className="w-4 h-4" /> Get Directions
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
