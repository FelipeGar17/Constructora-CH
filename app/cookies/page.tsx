import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import LegalFooter from "@/components/Footer/Legalfooter";
import BrandName from "@/components/BrandName/BrandName";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Información sobre el uso de cookies y tecnologías similares en el sitio web de Constructora Hernandez y cómo controlarlas.",
  alternates: { canonical: "/cookies" },
  openGraph: { url: "/cookies" },
};

export default function CookiesPage() {
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
            Política de cookies
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            Información sobre el uso de cookies y tecnologías similares en este sitio
          </p>
        </div>

        {/* 1. Situación actual */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            1. Uso actual de cookies
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
            <strong className="text-[var(--color-primary)]">Constructora Hernandez no utiliza cookies</strong>{" "}
            en este sitio web para recopilar, almacenar o procesar información personal de los visitantes.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            Este sitio no incorpora herramientas de análisis que instalen cookies en su dispositivo, no
            integra mapas interactivos, reproductores de video, widgets de redes sociales ni ningún otro
            componente de terceros que deposite archivos de seguimiento. Tampoco requiere la creación de
            cuentas de usuario ni mantiene sesiones que dependan de cookies.
          </p>
        </section>

        {/* 2. ¿Qué son las cookies? */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            2. ¿Qué son las cookies?
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
            Una cookie es un archivo de texto que un sitio web envía al navegador del visitante y que
            puede almacenar información sobre la visita. Algunas cookies son esenciales para el
            funcionamiento técnico del sitio; otras, no esenciales, se utilizan para análisis,
            personalización o publicidad y requieren consentimiento previo según la Ley 1581 de 2012 y
            las directrices de la Superintendencia de Industria y Comercio.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-secondary)]">
            En el estado actual de este sitio, <strong className="text-[var(--color-primary)]">no se
            instala ninguna cookie</strong>, ni propias ni de terceros, en el dispositivo del visitante.
          </p>
        </section>

        {/* 3. Cambios futuros y consentimiento */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            3. Cambios futuros y consentimiento
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
            Si en el futuro Constructora Hernandez incorpora cookies no esenciales —por ejemplo, herramientas
            de análisis, contenido embebido o funcionalidades de terceros—, se implementará previamente
            un mecanismo de consentimiento conforme a la ley colombiana. Dicho mecanismo incluirá:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-secondary)]">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>
                Un aviso visible al ingresar al sitio que informe sobre las cookies a utilizar.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>
                Un botón o acción clara que permita al usuario otorgar su consentimiento expreso.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>
                La opción de rechazar las cookies no esenciales sin que ello impida el acceso al sitio.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-gold)]" />
              <span>
                Un enlace a una política de cookies detallada con la identificación de cada cookie, su
                finalidad y duración.
              </span>
            </li>
          </ul>
          <div className="mt-5 border-l-4 border-[var(--color-gold)] bg-[var(--color-white)] p-4">
            <p className="text-sm leading-relaxed text-[var(--color-primary)]">
              <strong>Importante:</strong> el consentimiento para cookies no puede obtenerse por el
              simple uso continuado del sitio. Se requiere una acción afirmativa del usuario.
            </p>
          </div>
        </section>

        {/* 4. Control desde su navegador */}
        <section className="mb-10 border-b border-[var(--color-border)] pb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            4. Control desde su navegador
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
            Independientemente de las cookies que este sitio pueda utilizar en el futuro, usted puede
            configurar su navegador para bloquear o eliminar cookies en cualquier momento. Esta
            configuración se realiza desde las preferencias de privacidad de cada navegador y no afecta
            su capacidad de navegar por este sitio.
          </p>
        </section>

        {/* Pie */}
        <LegalFooter />
      </div>
    </main>
  );
}
