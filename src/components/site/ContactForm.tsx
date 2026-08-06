import { Field } from "./Field";

export function ContactForm({ heading }: { heading?: string }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thank you — we'll be in touch within one business day.");
      }}
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
    </form>
  );
}
