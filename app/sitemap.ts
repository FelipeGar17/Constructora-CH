import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getDetailProperties } from "@/data/propertySelectors";

const routes = [
  "",
  "/propiedades",
  "/vendidas",
  "/contacto",
  "/politica-privacidad",
  "/tratamiento-datos",
  "/terminos-condiciones",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const detailRoutes = getDetailProperties().map((property) => ({
    url: `${siteUrl}/propiedades/${property.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...detailRoutes,
  ];
}
