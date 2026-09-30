import { equipment } from "@/lib/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EquipmentCard } from "@/components/partner/EquipmentCard";

export default function MarktplatzPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="Marktplatz"
        title="Equipment mieten"
        description="Statt jedes Gerät selbst anzuschaffen, mieten Franchise-Standorte Kursequipment direkt über CRAFTY."
      />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {equipment.map((item) => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
