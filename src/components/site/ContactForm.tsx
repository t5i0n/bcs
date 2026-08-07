import { useState, type FormEvent } from "react";
import { Field } from "./Field";

// Destination for inquiry emails. Web3Forms upgrade: replace this constant
// with the account's access key and POST to https://api.web3forms.com/submit.
const CONTACT_EMAIL = "info@bcscoffee.et";

export function ContactForm({ heading }: { heading?: string }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const country = String(data.get("country") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Website inquiry${name ? ` from ${name}` : ""}${
      company ? ` (${company})` : ""
    }`;

    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Country: ${country}`,
      `Email: ${email}`,
      `Coffee interest: ${interest}`,
      "",
      "Message:",
      message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
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
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
        <Field label="Country" name="country" />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field
        label="Coffee Interest"
        name="interest"
        placeholder="e.g. Yirgacheffe washed Grade 1, 5 tons"
      />
      <Field label="Message" name="message" textarea required />
      <button
        type="submit"
        className="mt-6 w-full py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-gold hover:scale-[1.02] transition"
      >
        Send Inquiry
      </button>
      {submitted && (
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          Your email app should open with your message pre-filled — just press
          send. If it didn't open, email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
