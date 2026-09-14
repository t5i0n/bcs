import { Layout, PageHero } from "@/components/site/Layout";
import { useTranslation } from "react-i18next";
import bekurePhoto from "@/assets/bekure.jpg";
import rosePhoto from "@/assets/rose.jpg";
import ferehiwotPhoto from "@/assets/ferehiwot.jpg";
import zeharaPhoto from "@/assets/zehara.jpg";

interface TeamMember {
  translationKey: "bekure" | "rose" | "member3" | "member4";
  initials: string;
  color: string;
  photo?: string;
  linkedin?: string;
}

const TEAM: TeamMember[] = [
  {
    translationKey: "bekure",
    initials: "BY",
    color: "bg-primary",
    photo: bekurePhoto,
    linkedin: "https://www.linkedin.com/in/bekure-yimam-1a484525a",
  },
  {
    translationKey: "rose",
    initials: "RO",
    color: "bg-accent",
    photo: rosePhoto,
  },
  {
    translationKey: "member3",
    initials: "FD",
    color: "bg-coffee",
    photo: ferehiwotPhoto,
  },
  {
    translationKey: "member4",
    initials: "ZB",
    color: "bg-accent",
    photo: zeharaPhoto,
  },
];

function AvatarPlaceholder({
  initials,
  color,
  photo,
}: {
  initials: string;
  color: string;
  photo?: string;
}) {
  return (
    <div
      className={`w-28 h-28 mx-auto rounded-full ${color} flex items-center justify-center overflow-hidden ring-4 ring-background shadow-lg`}
    >
      {photo ? (
        <img src={photo} alt="" className="w-full h-full object-cover" />
      ) : (
        <span className="text-white/90 font-display text-3xl font-bold select-none">
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
          {TEAM.map((member) => (
            <div
              key={member.translationKey}
              className="group rounded-3xl bg-card border border-border overflow-hidden shadow-elegant hover:shadow-lg transition-shadow"
            >
              <div className="p-6 pt-8">
                <AvatarPlaceholder
                  initials={member.initials}
                  color={member.color}
                  photo={member.photo}
                />

                <h3 className="font-display text-xl font-bold text-center mt-4">
                  {t(`team.${member.translationKey}.name`)}
                </h3>
                <p className="text-sm text-accent font-medium mt-1 text-center">
                  {t(`team.${member.translationKey}.role`)}
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {t(`team.${member.translationKey}.description`)}
                </p>

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border min-h-5">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-accent/10 grid place-items-center text-accent hover:bg-accent hover:text-accent-foreground transition"
                      aria-label={`${t(`team.${member.translationKey}.name`)} on LinkedIn`}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
