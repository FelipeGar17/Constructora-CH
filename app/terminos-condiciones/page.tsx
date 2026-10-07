import type { Metadata } from "next";
import LegalFooter from "@/components/Footer/Legalfooter";
import Header from "@/components/Header/Header";
import BrandName from "@/components/BrandName/BrandName";



export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones aplicables al uso del sitio web de Constructora Hernandez. Información sobre el uso del portal y sus contenidos.",
  alternates: { canonical: "/terminos-condiciones" },
  openGraph: { url: "/terminos-condiciones" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-ivory)]">
      <Header showHero={false} solid />
      <div className="container mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* encabezado */}
        <div className="mb-12 border-b-2 border-[var(--color-primary)] pb-8">
          <p className="mb-3 text-[var(--color-secondary)]">
            <BrandName size="md" />
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-primary)] md:text-4xl">
            Términos y condiciones de uso
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            Condiciones aplicables al uso de este sitio web · Vigentes desde el 23 de septiembre de 2026
          </p>
        </div>

        {/* 1. Uso del sitio y propiedad intelectual */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            1. Uso del sitio y propiedad intelectual
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
            Este sitio web tiene como propósito presentar información sobre propiedades y servicios
            inmobiliarios ofrecidos por <strong className="text-[var(--color-primary)]">Constructora Hernandez</strong>.
            Al navegar por él, usted acepta utilizar la información exclusivamente para fines
            informativos y de consulta personal.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            Las fotografías, descripciones, logotipos y demás contenidos de este sitio son propiedad de
            Constructora Hernandez o de sus respectivos titulares. Queda prohibida su reproducción, copia,
            distribución o reutilización sin autorización previa y escrita.
          </p>
        </section>

        {/* 2. Información y responsabilidad */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            2. Información y responsabilidad
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
            La información publicada sobre propiedades, precios, áreas, disponibilidad y características
            es de carácter informativo y puede estar sujeta a cambios sin previo aviso. La publicación
            de un inmueble en este sitio no constituye una oferta comercial vinculante ni un compromiso
            de venta.
          </p>
          <div className="mt-5 border-l-4 border-[var(--color-gold)] bg-[var(--color-white)] p-4">
            <p className="text-sm leading-relaxed text-[var(--color-primary)]">
              Constructora Hernandez no se hace responsable por decisiones tomadas exclusivamente con base en
              la información publicada en este sitio. Recomendamos confirmar todos los detalles
              directamente con nosotros antes de tomar cualquier decisión comercial.
            </p>
          </div>
        </section>

        {/* 3. Legislación aplicable y contacto */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            3. Legislación aplicable y contacto
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
            Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia
            relacionada con el uso de este sitio será sometida a la jurisdicción de los tribunales
            competentes en Colombia.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            Para consultas sobre estos términos, puede escribirnos a{" "}
            <span className="text-[var(--color-primary)]">fabiohernandezgalvan@gmail.com</span> o
            llamarnos al <span className="text-[var(--color-primary)]">+57 311 367 8896</span>.
          </p>
        </section>

        {/* Pie de página */}
        <LegalFooter />
      </div>
    </main>
  );
}
