import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "am", label: "አማርኛ", flag: "🇪🇹" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export function LanguageSelector({
  solid,
}: {
  solid?: boolean;
}) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang =
    languages.find((l) => l.code === i18n.language) ?? languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function changeLang(code: string) {
    i18n.changeLanguage(code);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`p-2.5 rounded-full transition-colors flex items-center gap-1 ${
          solid
            ? "text-foreground/80 hover:text-foreground hover:bg-cream"
            : "text-white/85 hover:text-white hover:bg-white/10"
        }`}
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-card border border-border shadow-elegant overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLang(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                currentLang.code === lang.code
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
