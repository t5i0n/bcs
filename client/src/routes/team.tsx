import { Layout, PageHero } from "@/components/site/Layout";
import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";
import bekureImg from "@/assets/bekure.jpg";
import roseImg from "@/assets/rose.jpg";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  initials: string;
  color: string;
  email?: string;
  image?: string;
  linkedin?: string;
  instagram?: string;
}

const TEAM_KEYS = ["bekure", "rose", "member3"] as const;

const TEAM_META: Record<string, { initials: string; color: string; image?: string; linkedin?: string; instagram?: string }> = {
  bekure: {
    initials: "BY",
    color: "bg-primary",
    image: bekureImg,
    linkedin: "https://www.linkedin.com/in/bekure-yimam-1a484525a",
    instagram: "https://www.instagram.com/bekureyimam",
  },
  rose: {
    initials: "RO",
    color: "bg-accent",
    image: roseImg,
  },
  member3: {
    initials: "TM",
    color: "bg-coffee",
  },
};

function AvatarPlaceholder({
  initials,
  color,
  image,
}: {
  initials: string;
  color: string;
  image?: string;
}) {
  return (
    <div className={`w-24 h-24 mx-auto rounded-full ${color} flex items-center justify-center overflow-hidden ring-4 ring-background shadow-lg`}>      {image ? (
        <img src={image} alt="Profile photo" className="w-full h-full object-cover" />
      ) : (
        <span className="text-white/90 font-display text-2xl font-bold select-none">
          {initials}
        </span>
      )}
    </div>
  );
}

export default function TeamPage() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHero
        eyebrow={t("team.eyebrow")}
        title={t("team.title")}
        subtitle={t("team.subtitle")}
      />

      <section className="py-24 container-x">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_KEYS.map((key) => {
            const meta = TEAM_META[key];
            const name = t(`team.${key}.name`);
            const role = t(`team.${key}.role`);
            const description = t(`team.${key}.description`);
            return (
              <div
                key={key}
                className="group rounded-3xl bg-card border border-border overflow-hidden shadow-elegant hover:shadow-lg transition-shadow"
              >
                <div className="p-6 pt-8">
                  <AvatarPlaceholder
                    initials={meta.initials}
                    color={meta.color}
                    image={meta.image}
                  />
                  <h3 className="font-display text-xl font-bold text-center mt-4">
                    {name}
                  </h3>
                  <p className="text-sm text-accent font-medium mt-1 text-center">
                    {role}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>

                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                    <a
                      href={`mailto:${key === "bekure" ? "bekure@bcscoffee.et" : key === "rose" ? "rose@bcscoffee.et" : "team@bcscoffee.et"}`}
                      className="w-9 h-9 rounded-full bg-accent/10 grid place-items-center text-accent hover:bg-accent hover:text-accent-foreground transition"
                      aria-label={`Email ${name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  {meta.linkedin && (
                    <a
                      href={meta.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-accent/10 grid place-items-center text-accent hover:bg-accent hover:text-accent-foreground transition"
                      aria-label={`${name} on LinkedIn`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.607H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {meta.instagram && (
                    <a
                      href={meta.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-accent/10 grid place-items-center text-accent hover:bg-accent hover:text-accent-foreground transition"
                      aria-label={`${name} on Instagram`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
