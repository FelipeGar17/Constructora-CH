import { properties } from "@/data/properties";
import type { Property } from "@/types/property";

// Selectores centrales: cada vista pide los registros que necesita sin duplicar data.
export const getHomeProperties = (): Property[] =>
  properties.filter((property) => property.showOnHome);

export const getRecentProperties = (): Property[] =>
  properties.filter((property) => property.isRecent);

export const getAvailableProperties = (): Property[] =>
  properties.filter(
    (property) =>
      property.status === "Disponible en venta" ||
      property.status === "Disponible en arriendo" ||
      property.status === "Disponible en planos" ||
      property.status === "En obra"
  );

export const getSoldProperties = (): Property[] =>
  properties.filter((property) => property.status === "Vendida");

export const getRentedProperties = (): Property[] =>
  properties.filter((property) => property.status === "Arrendada");

export const getPropertyById = (id: string): Property | undefined =>
  properties.find((property) => property.id === id);

// Estados que tienen ficha propia en /propiedades/[id]. Esta lista NO es la de
// getAvailableProperties: "Disponible en arriendo" se ofrece en el catálogo pero
// aún no tiene ficha, así que incluirla aquí mandaría a un 404.
export const DETAIL_STATUSES: Property["status"][] = [
  "En obra",
  "Disponible en venta",
  "Disponible en planos",
];

export const getDetailProperties = (): Property[] =>
  properties.filter((property) => DETAIL_STATUSES.includes(property.status));

// Destino del botón "Ver propiedad": a la ficha si existe, y si no, al listado de
// vendidas apuntando con ancla a la tarjeta exacta.
export const getPropertyHref = (property: Property): string =>
  DETAIL_STATUSES.includes(property.status)
    ? `/propiedades/${property.id}`
    : `/vendidas#${property.id}`;
