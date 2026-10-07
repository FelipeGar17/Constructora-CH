import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import LegalFooter from "@/components/Footer/Legalfooter";
import BrandName from "@/components/BrandName/BrandName";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Tratamiento de datos personales conforme a la Ley 1581 de 2012. Conoce cómo tratamos la información que compartes con Constructora Hernandez.",
  alternates: { canonical: "/politica-privacidad" },
  openGraph: { url: "/politica-privacidad" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-ivory)]">
      <Header showHero={false} solid />
      <div className="container mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* Encabezado */}
        <div className="mb-12 border-b-2 border-[var(--color-primary)] pb-8">
          <p className="mb-3 text-[var(--color-secondary)]">
            <BrandName size="md" />
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-primary)] md:text-4xl">
            Política de privacidad
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            Tratamiento de datos personales · Vigente desde el 23 de septiembre de 2026
          </p>
        </div>

        {/* 1. Responsable y contacto */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            1. Responsable del tratamiento
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
            <strong className="text-[var(--color-primary)]">Constructora Hernandez</strong> es responsable del
            tratamiento de los datos personales que usted suministre a través de nuestros canales de
            contacto. Para ejercer sus derechos o realizar cualquier consulta puede escribir a{" "}
            <span className="text-[var(--color-primary)]">fabiohernandezgalvan@gmail.com</span> o llamar al{" "}
            <span className="text-[var(--color-primary)]">+57 311 367 8896</span>.
          </p>
        </section>

        {/* 2. Finalidad del tratamiento */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            2. Finalidad del tratamiento
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            Los datos que usted comparta por teléfono, WhatsApp o correo serán utilizados únicamente para:
          </p>
          <ul className="space-y-2 text-sm text-[var(--color-secondary)]">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Atender consultas sobre propiedades, proyectos y servicios inmobiliarios.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Dar seguimiento comercial a la conversación iniciada.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Compartir información sobre inmuebles de su interés.</span>
            </li>
          </ul>
          <div className="mt-5 border-l-4 border-[var(--color-gold)] bg-[var(--color-white)] p-4">
            <p className="text-sm leading-relaxed text-[var(--color-primary)]">
              Este sitio no requiere registro, no crea cuentas de usuario y no almacena datos en bases de
              datos propias. La información permanece únicamente en los canales de comunicación utilizados.
            </p>
          </div>
        </section>

        {/* 3. Derechos del titular */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            3. Sus derechos
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            De acuerdo con la Ley 1581 de 2012, usted puede en cualquier momento:
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
              <span>Ser informado sobre el uso dado a sus datos.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>Revocar la autorización o solicitar la supresión del dato.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>
                Presentar quejas ante la Superintendencia de Industria y Comercio.
              </span>
            </li>
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-[var(--color-secondary)]">
            Para ejercerlos, envíe su solicitud al correo indicado en el punto 1 con el asunto{" "}
            <em>&ldquo;Protección de Datos&rdquo;</em>. Las consultas se atienden en un máximo de 10 días
            hábiles y los reclamos en 15 días hábiles, prorrogables hasta por 8 días más.
          </p>
        </section>

        {/* Nota final */}
        <LegalFooter />
      </div>
    </main>
  );
}