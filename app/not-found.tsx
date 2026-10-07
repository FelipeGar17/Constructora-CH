import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// `not-found.tsx` no admite exportar `metadata` en esta versión de Next,
// así que el 404 hereda el título del layout raíz.
export default function NotFound() {
  return (
    <main>
      <Header showHero={false} solid />
      <section className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Error 404
        </p>
        {/* Sin hero, el <h1> de esta página es el titular de abajo. */}
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold text-[var(--color-primary)] md:text-5xl">
          Esta página no existe.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--color-secondary)] md:text-base">
          La dirección que buscas cambió o nunca estuvo disponible. Te dejamos las secciones
          principales para que sigas navegando.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Link
            href="/propiedades"
            className="group border-t-2 border-[var(--color-border)] bg-[var(--color-white)] p-6 transition-colors hover:border-[var(--color-gold)]"
          >
            <span className="text-lg font-semibold text-[var(--color-primary)]">
              Propiedades
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-[var(--color-secondary)]">
              Proyectos disponibles en venta, arriendo y en planos.
            </span>
          </Link>

          <Link
            href="/vendidas"
            className="group border-t-2 border-[var(--color-border)] bg-[var(--color-white)] p-6 transition-colors hover:border-[var(--color-gold)]"
          >
            <span className="text-lg font-semibold text-[var(--color-primary)]">
              Vendidas
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-[var(--color-secondary)]">
              Proyectos entregados, con información general y respetando la privacidad.
            </span>
          </Link>

          <Link
            href="/contacto"
            className="group border-t-2 border-[var(--color-border)] bg-[var(--color-white)] p-6 transition-colors hover:border-[var(--color-gold)]"
          >
            <span className="text-lg font-semibold text-[var(--color-primary)]">
              Contacto
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-[var(--color-secondary)]">
              Habla con un asesor por teléfono, WhatsApp o correo.
            </span>
          </Link>
        </div>

        <p className="mt-12 text-sm text-[var(--color-secondary)]">
          ¿Prefieres volver al inicio?{" "}
          <Link
            href="/"
            className="font-semibold text-[var(--color-primary)] underline underline-offset-4 transition-colors hover:text-[var(--color-gold)]"
          >
            Ir al inicio
          </Link>
        </p>
      </section>
      <Footer />
    </main>
  );
}