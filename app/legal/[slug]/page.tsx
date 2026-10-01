import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { legalDocs, getLegalDoc } from "@/data/legal";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return { title: "Not found" };
  return { title: doc.title, description: doc.description };
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <section aria-labelledby="legal-title" className="py-16 lg:py-24">
      <Container className="max-w-3xl">
        <p className="text-sm text-muted-foreground">Last updated {doc.updated}</p>
        <h1
          id="legal-title"
          className="mt-2 font-heading text-4xl font-semibold tracking-tight text-foreground lg:text-5xl"
        >
          {doc.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{doc.description}</p>

        <div className="mt-12 flex flex-col gap-10">
          {doc.sections.map((section) => (
            <section key={section.heading} aria-labelledby={undefined}>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-3 text-pretty leading-[1.7] text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-pretty leading-[1.7] text-muted-foreground marker:text-primary">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 text-sm">
          {legalDocs
            .filter((other) => other.slug !== doc.slug)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/legal/${other.slug}`}
                className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {other.title}
              </Link>
            ))}
        </div>
      </Container>
    </section>
  );
}
