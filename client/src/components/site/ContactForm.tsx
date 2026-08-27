import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "./Field";
import { publicContactApi } from "@/lib/api";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const CONTACT_EMAIL = "info@bcscoffee.et";

export function ContactForm({ heading }: { heading?: string }) {
  const { t } = useTranslation();
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim() || undefined,
      country: String(data.get("country") ?? "").trim() || undefined,
      email: String(data.get("email") ?? "").trim(),
      interest: String(data.get("interest") ?? "").trim() || undefined,
      message: String(data.get("message") ?? "").trim(),
    };

    try {
      await publicContactApi.submit(payload);
      setState("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : t("contact.form.error"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-card text-foreground p-8 md:p-10 shadow-elegant"
    >
      {heading && (
        <h2 className="font-display text-2xl font-bold mb-6">{heading}</h2>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("contact.form.name")} name="name" required />
        <Field label={t("contact.form.company")} name="company" />
        <Field label={t("contact.form.country")} name="country" />
        <Field label={t("contact.form.email")} name="email" type="email" required />
      </div>
      <Field
        label={t("contact.form.coffeeInterest")}
        name="interest"
        placeholder={t("contact.form.coffeeInterestPlaceholder")}
      />
      <Field label={t("contact.form.message")} name="message" textarea required />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 w-full py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-gold hover:scale-[1.02] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {state === "submitting" ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> {t("common.sending")}</>
        ) : (
          t("common.sendInquiry")
        )}
      </button>

      {state === "success" && (
        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm">
          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{t("contact.form.success")}</span>
        </div>
      )}

      {state === "error" && (
        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{errorMsg} <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{t("contact.form.emailUsDirectly")}</a></span>
        </div>
      )}
    </form>
  );
}
