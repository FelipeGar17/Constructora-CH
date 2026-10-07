export type Property = {
  id: string;
  title: string;
  location: string;
  mapUrl?: string;
  price?: string;
  priceValue?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  status:
    | "Vendida"
    | "Disponible en venta"
    | "Disponible en arriendo"
    | "Arrendada"
    | "Disponible en planos"
    | "En obra";
  image: string;
  highlight?: string;
  description: string;
  propertyType?: "apartamento" | "casa" | "proyecto";
  showOnHome?: boolean;
  showOnProperties?: boolean;
  showOnSold?: boolean;
  privacyMode?: "publico" | "reservado";
  isRecent?: boolean;
  recentLabel?: string;
  gallery?: string[];
  testimonial?: {
    text: string;
    ownerName?: string;
    ownerDetail?: string;
    privacy: "reservado" | "libre";
    rating?: number;
  };
};
