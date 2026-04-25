import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { generateFaqSchema, generateHowToSchema } from "@/lib/seo";
import { SOCIAL_SEO_PAGE_MAP } from "@/lib/socialToolkitSeo";

export const Route = createFileRoute("/$seoSlug")({
  loader: ({ params }) => {
    const page = SOCIAL_SEO_PAGE_MAP.get(params.seoSlug);
    if (!page) {
      throw notFound();
    }
    return { page };
  },
  head: ({ loaderData, params }) => {
    const page = loaderData?.page ?? SOCIAL_SEO_PAGE_MAP.get(params.seoSlug);
    if (!page) {
      return {};
    }

    const routeUrl = `https://trakory.com/${page.slug}`;
    return {
      meta: [
        { title: page.metaTitle },
        { name: "description", content: page.metaDescription },
        {
          name: "keywords",
          content:
            "video downloader online, free video downloader, tiktok downloader, youtube video downloader, youtube to mp3, instagram downloader, facebook video downloader, twitter video downloader, creator toolkit",
        },
        { property: "og:title", content: page.title },
        { property: "og:description", content: page.metaDescription },
        { property: "og:url", content: routeUrl },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: page.title },
        { name: "twitter:description", content: page.metaDescription },
      ],
      links: [{ rel: "canonical", href: routeUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(generateFaqSchema(page.faqs)),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            generateHowToSchema({
              title: page.h1,
              description: page.intro,
              image: "https://trakory.com/logo/logo.png",
              steps: page.steps.map((step, idx) => ({
                name: `Step ${idx + 1}`,
                description: step,
              })),
            }),
          ),
        },
      ],
    };
  },
  component: SocialSeoPageRoute,
});

function SocialSeoPageRoute() {
  const { page } = Route.useLoaderData();

  return (
    <ToolPageLayout title={page.h1} description={page.metaDescription}>
      <article className="w-full max-w-4xl space-y-8 rounded-2xl border border-border/60 bg-card/90 p-5 sm:p-7">
        <section>
          <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{page.intro}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground">How to Use</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            {page.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground">Features</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            {page.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground">Benefits & Use Cases</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            {page.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground">Helpful Guide</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{page.seoBlock}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-3">
            {page.faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-border bg-background p-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-foreground">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground">Related Tools</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {page.relatedLinks.map((related) => (
              <Link
                key={related.href}
                to={related.href}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-muted"
              >
                {related.label}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </ToolPageLayout>
  );
}
