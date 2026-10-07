export const siteName = "Constructora Hernandez";

// Placeholder: reemplazar por el dominio real antes de publicar.
export const siteUrl = "https://dominio-pendiente.example.com";

export const siteDescription =
  "Asesoría inmobiliaria y proyectos residenciales en el área metropolitana de Bucaramanga. Compra, vende o invierte con Constructora Hernandez.";

export const whatsappNumber = "573113678896";

export function buildWhatsAppMessage(params: {
  propertyTitle: string;
  propertyUrl?: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}): string {
  const lines = [
    `Hola Constructora Hernandez, me gustaría conocer más sobre esta propiedad:`,
    `Propiedad: ${params.propertyTitle}`,
    params.propertyUrl ? `Enlace: ${params.propertyUrl}` : undefined,
    params.name ? `Nombre: ${params.name}` : undefined,
    params.phone ? `Teléfono: ${params.phone}` : undefined,
    params.email ? `Correo: ${params.email}` : undefined,
    params.message ? `Mensaje: ${params.message}` : undefined,
  ].filter(Boolean);

  return lines.join("\n");
}

export function buildWhatsAppUrl(text: string): string {
  const clean = text.replace(/\r\n/g, "\n");
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(clean)}`;
}
