import { Link } from "@tanstack/react-router";

interface FAQItem {
  question: string;
  answer: string;
}

interface LinkItem {
  label: string;
  href: string;
}

interface ToolPageDetailsProps {
  overview: string;
  features?: string[];
  howTo?: string[];
  benefits?: string[];
  seoContent?: string;
  relatedLinks?: LinkItem[];
  trustSignals?: string[];
  faq: FAQItem[];
}

export function ToolPageDetails({
  overview,
  features = [],
  howTo = [],
  benefits = [],
  seoContent,
  relatedLinks = [],
  trustSignals = [],
  faq,
}: ToolPageDetailsProps) {
  return (
    <div className="mt-12 space-y-10">
      <section className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-foreground">What is this tool?</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{overview}</p>
      </section>

      {features.length > 0 && (
        <section className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-foreground">Why use this tool?</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="space-y-1 rounded-2xl border border-border/60 bg-background/80 p-4">
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {howTo.length > 0 && (
        <section className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-foreground">How to use this tool</h2>
          <ol className="mt-4 space-y-3 rounded-2xl border border-border/60 bg-background/80 p-4 text-sm leading-7 text-muted-foreground">
            {howTo.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {benefits.length > 0 && (
        <section className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-foreground">Benefits and use cases</h2>
          <ul className="mt-4 space-y-3 list-disc pl-5 text-sm leading-7 text-muted-foreground">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-foreground">Frequently asked questions</h2>
        <div className="mt-4 space-y-4">
          {faq.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-border/60 bg-background/80 p-4"
            >
              <summary className="cursor-pointer font-semibold text-foreground">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {seoContent && (
        <section className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-foreground">Download easily and securely</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{seoContent}</p>
        </section>
      )}

      {relatedLinks.length > 0 && (
        <section className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-foreground">More free Trakory tools</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {trustSignals.length > 0 && (
        <section className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-foreground">Download with confidence</h2>
          <ul className="mt-4 space-y-3 list-disc pl-5 text-sm leading-7 text-muted-foreground">
            {trustSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
