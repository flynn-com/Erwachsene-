import { BrandPartner } from "@/lib/mock-data/types";
import { Badge } from "@/components/ui/Badge";

export function BrandCooperationBadge({ brand }: { brand: BrandPartner }) {
  return (
    <Badge color={brand.accentColor}>
      <span aria-hidden>✦</span> in Kooperation mit {brand.name}
    </Badge>
  );
}
