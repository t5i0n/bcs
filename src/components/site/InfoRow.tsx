import type { ComponentType } from "react";

export function InfoRow({
  icon: Icon,
  title,
  lines,
  dark = false,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  dark?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-11 h-11 shrink-0 rounded-xl grid place-items-center text-accent ${
          dark ? "bg-white/10 backdrop-blur" : "bg-accent/15"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        {lines.map((l) => (
          <p
            key={l}
            className={`text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}
          >
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
