import type { Property } from "@/types/property";
import PropertyCard from "@/components/PropertyCard/PropertyCard";

type PropertyListingProps = {
  title: string;
  eyebrow: string;
  description: string;
  properties: Property[];
};

export default function PropertyListing({ title, eyebrow, description, properties }: PropertyListingProps) {
  return (
    <section className="container py-16 md:py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b08d57]">{eyebrow}</p>
        <h2 className="mt-3 text-4xl font-semibold text-[#0f2a43] md:text-5xl">{title}</h2>
        <p className="mt-4 text-[#3d5a73]">{description}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
