export function Field({
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
    "w-full mt-1.5 px-4 py-3 rounded-xl border border-border bg-cream focus:bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition placeholder:text-muted-foreground";
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
