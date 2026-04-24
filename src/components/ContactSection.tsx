import { useState } from "react";

const SUPPORT_EMAIL = "trakory.contact@gmail.com";

export function ContactSection() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !message.trim()) {
      setError("Please add your email address and message so we can respond.");
      return;
    }

    setError("");

    const subject = encodeURIComponent("Trakory website contact request");
    const body = encodeURIComponent(
      `Email: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-foreground">Contact, Feedback & Partnerships</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        We’re always looking to improve and collaborate.
      </p>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        If you have feedback, feature requests, business inquiries, or partnership opportunities, feel free to reach out. Whether you’ve found a bug, have an idea to make the tool better, or want to work together — we’d love to hear from you.
      </p>

      <div className="mt-6 rounded-3xl border border-border/60 bg-background/80 p-6">
        <div className="flex flex-col gap-4 text-sm text-foreground sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold">💬 Send Us a Message</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Use the input fields below to share your thoughts, suggestions, or inquiries directly with us. Please add your email address so we can respond.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground" htmlFor="trakory-contact-email">
              Your email address
            </label>
            <input
              id="trakory-contact-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-3xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground" htmlFor="trakory-contact-message">
              Your message
            </label>
            <textarea
              id="trakory-contact-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Share your feedback, request, or idea..."
              required
              className="min-h-[140px] w-full rounded-3xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Submit
          </button>
        </form>

        <div className="mt-8 space-y-4 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground">📧 Prefer Email?</p>
            <p className="mt-2">
              You can also contact us directly via email:{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">
                {SUPPORT_EMAIL}
              </a>
            </p>
            <p className="mt-1">We typically respond within 24–48 hours.</p>
          </div>

          <div>
            <p className="font-semibold text-foreground">🤝 What You Can Contact Us For</p>
            <ul className="mt-2 space-y-1 pl-5 text-sm leading-7 text-muted-foreground list-disc">
              <li>Feedback or suggestions</li>
              <li>Bug reports or issues</li>
              <li>Feature requests</li>
              <li>Business or partnership inquiries</li>
              <li>General questions</li>
            </ul>
          </div>

          <p className="text-sm leading-7 text-muted-foreground">
            🔒 Your privacy matters. We respect your privacy. Any information you provide will only be used to respond to your inquiry and will never be shared with third parties.
          </p>
        </div>
      </div>
    </section>
  );
}
