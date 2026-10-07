import { notFound } from "next/navigation";
import Header from "../../../src/components/Header/Header";
import Footer from "../../../src/components/Footer/Footer";
import { properties } from "../../../src/data/properties";
import { PropertyDetailClient } from "./PropertyDetailClient";

const AVAILABLE_STATUSES = ["En obra", "Disponible en planos", "Disponible en venta"] as const;

const availableProperties = properties.filter((property) =>
  AVAILABLE_STATUSES.includes(property.status as (typeof AVAILABLE_STATUSES)[number])
);

export function generateStaticParams() {
  return availableProperties.map((property) => ({ id: property.id }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = availableProperties.find((item) => item.id === id);

  if (!property) notFound();

  return (
    <>
      <Header showHero={false} solid />
      <PropertyDetailClient property={property} />
      <Footer />
    </>
  );
}
