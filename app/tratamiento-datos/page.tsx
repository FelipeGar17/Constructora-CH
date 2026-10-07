import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import LegalFooter from "@/components/Footer/Legalfooter";
import BrandName from "@/components/BrandName/BrandName";


export const metadata: Metadata = {
  title: "Tratamiento de datos",
  description:
    "Aviso de privacidad y finalidad del tratamiento de datos personales conforme a la Ley 1581 de 2012 y el Decreto 1074 de 2015.",
  alternates: { canonical: "/tratamiento-datos" },
  openGraph: { url: "/tratamiento-datos" },
};

export default function DataTreatmentPage() {
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
            Tratamiento de datos
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            Aviso de privacidad · Ley 1581 de 2012 y Decreto 1074 de 2015
          </p>
        </div>

        {/* 1. Responsable del tratamiento */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            1. Responsable del tratamiento
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
            <strong className="text-[var(--color-primary)]">Constructora Hernandez</strong> es el responsable
            del tratamiento de los datos personales que usted suministre. Para cualquier consulta
            relacionada con el manejo de su información puede contactarnos a través de:
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[var(--color-border)] pt-4 text-sm md:grid-cols-2">
            <p className="text-[var(--color-secondary)]">
              <span className="font-semibold text-[var(--color-primary)]">Correo:</span>{" "}
              fabiohernandezgalvan@gmail.com
            </p>
            <p className="text-[var(--color-secondary)]">
              <span className="font-semibold text-[var(--color-primary)]">Teléfono:</span>{" "}
              +57 311 367 8896
            </p>
          </div>
        </section>

        {/* 2. Formas y fines del tratamiento */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            2. Tratamiento y finalidad
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            Los datos que usted comparta voluntariamente por teléfono, WhatsApp o correo electrónico
            serán tratados únicamente para las siguientes finalidades:
          </p>
          <ul className="space-y-2 text-sm text-[var(--color-secondary)]">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Atender consultas sobre propiedades, proyectos y servicios inmobiliarios.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Dar seguimiento comercial a la conversación iniciada por usted.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Compartir información sobre inmuebles de su interés.</span>
            </li>
          </ul>
          <div className="mt-5 border-l-4 border-[var(--color-gold)] bg-[var(--color-white)] p-4">
            <p className="text-sm leading-relaxed text-[var(--color-primary)]">
              <strong>Importante:</strong> este sitio web no requiere registro, no crea cuentas de
              usuario y no almacena datos en bases de datos propias. La información permanece
              únicamente en los canales de comunicación utilizados y se elimina cuando deja de ser
              necesaria para las finalidades indicadas.
            </p>
          </div>
        </section>

        {/* 3. Derechos del titular */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            3. Sus derechos
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            De conformidad con la Ley 1581 de 2012, como titular de los datos usted tiene derecho a:
          </p>
          <ul className="space-y-2 text-sm text-[var(--color-secondary)]">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Conocer, actualizar y rectificar sus datos personales.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Solicitar prueba de la autorización otorgada.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Ser informado sobre el uso que se ha dado a sus datos.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Revocar la autorización o solicitar la supresión del dato.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Presentar quejas ante la Superintendencia de Industria y Comercio.</span>
            </li>
          </ul>
        </section>

        {/* 4. ¿Cómo consultar la política completa? */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            4. La política completa está disponible en la sección Política de privacidad
          </h2>
        </section>

        {/* 5. Pie de página */}
        <LegalFooter />
      </div>
    </main>
  );
}