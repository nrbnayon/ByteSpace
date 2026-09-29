import { createHash } from "node:crypto";

type JsonLdProps = {
  /** Schema.org JSON-LD data object(s). */
  data: object | object[];
};

/**
 * Renders JSON-LD structured data. The script is content-hashed so React
 * hydration stays deterministic across server renders.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data);
  const hash = createHash("sha256").update(json).digest("hex").slice(0, 16);

  return (
    <script
      type="application/ld+json"
      key={hash}
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
