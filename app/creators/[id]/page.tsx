import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { CreatorProfile } from "@/components/creators/creator-profile";
import { creators, getCreator } from "@/data/creators";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return creators.map((creator) => ({ id: creator.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const creator = getCreator(id);
  if (!creator) return { title: "Creator not found" };
  return {
    title: creator.name,
    description: creator.tagline,
  };
}

export default async function CreatorPage({ params }: PageProps) {
  const { id } = await params;
  const creator = getCreator(id);
  if (!creator) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: creator.name,
            description: creator.tagline,
            jobTitle: creator.role,
          },
        }}
      />
      <CreatorProfile creator={creator} />
    </>
  );
}
