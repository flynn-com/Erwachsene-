import Image from "next/image";
import { BrandPartner } from "@/lib/mock-data/types";

function LogoRow({ brands, hidden = false }: { brands: BrandPartner[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-16 pr-16 sm:gap-24 sm:pr-24" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <li key={brand.id} className="flex h-12 shrink-0 items-center">
          {brand.logoSrc ? (
            <Image
              src={brand.logoSrc}
              alt={hidden ? "" : brand.name}
              width={160}
              height={48}
              className="h-full w-auto max-w-[160px] object-contain"
            />
          ) : (
            <span className="whitespace-nowrap text-lg font-bold text-[var(--crafty-ink)]">{brand.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function PartnerMarquee({ brands }: { brands: BrandPartner[] }) {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        <LogoRow brands={brands} />
        <LogoRow brands={brands} hidden />
      </div>
    </div>
  );
}
