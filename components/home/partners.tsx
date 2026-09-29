import Image from "next/image";
import { partners } from "@/data/testimonials";

export function Partners() {
  return (
    <section aria-label="Trusted by leading companies" className="bg-muted py-10 sm:py-12 lg:py-16">
      <div className="partners-marquee relative w-full overflow-hidden">
        <div className="partners-marquee-track">
          {[false, true].map((isDuplicate) => (
            <ul
              key={isDuplicate ? "duplicate" : "partners"}
              className="partners-marquee-group"
              aria-hidden={isDuplicate || undefined}
            >
              {partners.map((partner) => (
                <li key={partner.id} className="shrink-0">
                  <Image
                    src={partner.logo}
                    alt={isDuplicate ? "" : `${partner.name} logo`}
                    width={partner.width}
                    height={partner.height}
                    className="h-6 w-auto opacity-65 grayscale transition-opacity hover:opacity-100 sm:h-8 lg:h-9 dark:invert"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
