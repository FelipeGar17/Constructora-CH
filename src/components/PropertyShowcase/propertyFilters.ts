/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

/**
 * Una imagen puede ser:
 *  - una ruta de /public:         "/propiedades/casa-aurora/1.webp"
 *  - una URL remota:              "https://..."
 *  - un import de tu bundler:     import foto from "./1.webp"
 *    (en Next.js es un objeto { src, width, height }; en Vite es un string)
 */
export type ImageSource = string | { src: string };

export interface Property {
  id: number | string;
  name: string;
  /** Barrio o sector. Es el valor que usa el filtro de ubicación. */
  zone: string;
  city?: string;
  /** Precio numérico en COP (se formatea al mostrarlo). */
  price: number;
  status: string;
  highlight?: string;
  description: string;
  images: ImageSource[];
  beds: number;
  baths: number;
  area: number;
  /** Enlace de Google Maps. Si falta, el botón no se muestra. */
  mapUrl?: string;
  /** Ruta de la ficha completa (botón "Ver detalle"). Alternativa: prop onViewDetail del carrusel. */
  detailHref?: string;
}

export type SortKey = "default" | "priceAsc" | "priceDesc" | "areaDesc";

/**
 * Todos los criterios soportados por `applyFilters`.
 * Agregar uno nuevo = añadir el campo aquí, en DEFAULT_FILTERS y en applyFilters.
 * El carrusel no necesita cambios.
 */
export interface Filters {
  query: string;
  minBeds: number | null;
  minBaths: number | null;
  minArea: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  zones: string[];
  statuses: string[];
  sort: SortKey;
}

export const DEFAULT_FILTERS: Filters = {
  query: "",
  minBeds: null,
  minBaths: null,
  minArea: null,
  minPrice: null,
  maxPrice: null,
  zones: [],
  statuses: [],
  sort: "default",
};

/* ------------------------------------------------------------------ */
/* Lógica                                                              */
/* ------------------------------------------------------------------ */

export function applyFilters(list: Property[], f: Filters): Property[] {
  const q = f.query.trim().toLowerCase();

  const out = list.filter(
    (p) =>
      (!q || `${p.name} ${p.zone} ${p.city ?? ""}`.toLowerCase().includes(q)) &&
      (f.minBeds == null || p.beds >= f.minBeds) &&
      (f.minBaths == null || p.baths >= f.minBaths) &&
      (f.minArea == null || p.area >= f.minArea) &&
      (f.minPrice == null || p.price >= f.minPrice) &&
      (f.maxPrice == null || p.price <= f.maxPrice) &&
      (f.zones.length === 0 || f.zones.includes(p.zone)) &&
      (f.statuses.length === 0 || f.statuses.includes(p.status))
  );

  switch (f.sort) {
    case "priceAsc":
      out.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      out.sort((a, b) => b.price - a.price);
      break;
    case "areaDesc":
      out.sort((a, b) => b.area - a.area);
      break;
  }
  return out;
}

export function countActiveFilters(f: Filters): number {
  return [
    f.query.trim() !== "",
    f.minBeds != null,
    f.minBaths != null,
    f.minArea != null,
    f.minPrice != null,
    f.maxPrice != null,
    f.zones.length > 0,
    f.statuses.length > 0,
  ].filter(Boolean).length;
}

export interface FilterOptions {
  zones: string[];
  statuses: string[];
  minPrice: number;
  maxPrice: number;
  maxBeds: number;
  maxBaths: number;
  maxArea: number;
}

/** Opciones disponibles, calculadas a partir de tus propiedades reales. */
export function getFilterOptions(list: Property[]): FilterOptions {
  const uniq = (v: string[]) => [...new Set(v)].sort((a, b) => a.localeCompare(b, "es"));
  const prices = list.map((p) => p.price);
  return {
    zones: uniq(list.map((p) => p.zone)),
    statuses: uniq(list.map((p) => p.status)),
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
    maxBeds: Math.max(0, ...list.map((p) => p.beds)),
    maxBaths: Math.max(0, ...list.map((p) => p.baths)),
    maxArea: Math.max(0, ...list.map((p) => p.area)),
  };
}

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

export const toSrc = (img: ImageSource): string =>
  typeof img === "string" ? img : img.src;

/**
 * Genera las rutas de fotos locales numeradas:
 * localImages("casa-aurora", 4) =>
 *   /propiedades/casa-aurora/1.webp ... /propiedades/casa-aurora/4.webp
 * (los archivos viven en  public/propiedades/casa-aurora/)
 */
export const localImages = (slug: string, count: number, base = "/propiedades"): string[] =>
  Array.from({ length: count }, (_, i) => `${base}/${slug}/${i + 1}.webp`);

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);