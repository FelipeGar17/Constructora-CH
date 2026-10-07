import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Habla con Constructora Hernandez por teléfono, WhatsApp o correo. Asesoría inmobiliaria para comprar, vender o invertir en el área metropolitana de Bucaramanga.",
  alternates: { canonical: "/contacto" },
  openGraph: { url: "/contacto" },
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Hablemos
        </p>
        <h2 className="mt-3 max-w-2xl text-4xl font-semibold text-[var(--color-primary)] md:text-5xl">
          Encuentra el espacio que quieres construir.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--color-secondary)] md:text-base">
          Estamos disponibles para atender tus consultas sobre propiedades, proyectos y asesoría
          inmobiliaria. Elige el canal que prefieras.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Llamar */}
          <a
            href="tel:3113678896"
            className="group border-t-2 border-[var(--color-border)] bg-[var(--color-white)] p-6 transition-colors hover:border-[var(--color-gold)]"
          >
            <span className="flex h-11 w-11 items-center justify-center border border-[var(--color-border)] text-[var(--color-gold)] transition-colors group-hover:border-[var(--color-gold)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)]">
              Llamar
            </p>
            <p className="mt-1 text-base font-semibold text-[var(--color-primary)]">
              311 367 8896
            </p>
            <p className="mt-2 text-sm text-[var(--color-secondary)]">
              Atención directa en horario comercial.
            </p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/573113678896"
            target="_blank"
            rel="noreferrer"
            className="group border-t-2 border-[var(--color-border)] bg-[var(--color-white)] p-6 transition-colors hover:border-[var(--color-gold)]"
          >
            <span className="flex h-11 w-11 items-center justify-center border border-[var(--color-border)] text-[var(--color-gold)] transition-colors group-hover:border-[var(--color-gold)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)]">
              WhatsApp
            </p>
            <p className="mt-1 text-base font-semibold text-[var(--color-primary)]">
              Escribir ahora
            </p>
            <p className="mt-2 text-sm text-[var(--color-secondary)]">
              Respuesta rápida a tus consultas.
            </p>
          </a>

          {/* Correo */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=fabiohernandezgalvan@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="group border-t-2 border-[var(--color-border)] bg-[var(--color-white)] p-6 transition-colors hover:border-[var(--color-gold)]"
          >
            <span className="flex h-11 w-11 items-center justify-center border border-[var(--color-border)] text-[var(--color-gold)] transition-colors group-hover:border-[var(--color-gold)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="0" />
                <path d="m22 6-10 7L2 6" />
              </svg>
            </span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)]">
              Correo
            </p>
            <p className="mt-1 text-base font-semibold text-[var(--color-primary)]">
              Enviar mensaje
            </p>
            <p className="mt-2 text-sm text-[var(--color-secondary)]">
              Consultas detalladas y documentos.
            </p>
          </a>
        </div>

        {/* Nota de tratamiento de datos */}
        <div className="mt-12 border-l-4 border-[var(--color-gold)] bg-[var(--color-white)] p-5">
          <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
            Al contactarnos por cualquiera de estos canales, los datos que compartas serán utilizados
            únicamente para atender tu solicitud. Consulta nuestra{" "}
            <a
              href="/politica-privacidad"
              className="font-semibold text-[var(--color-primary)] underline decoration-[var(--color-gold)] underline-offset-4"
            >
              Política de privacidad
            </a>{" "}
            para más información.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
