import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import RecentProperties from "@/components/RecentProperties/RecentProperties";
import { SiGmail } from "react-icons/si";

export default function Home() {
  return (
    <main>
      <Header />

      {/*
        Bloque de beneficios: mantiene la tarjeta compacta y centrada bajo el header.
        Si quieres cambiar la amplitud, modifica el max-w o los paddings de este bloque.
      */}
      <section className="relative z-10 -mt-6 mb-0 md:-mt-10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="overflow-hidden rounded-lg bg-[#0f2a43] shadow-[0_30px_60px_rgba(15,42,67,0.25)]">
            <div className="grid grid-cols-2 divide-x divide-y divide-[rgba(245,243,238,0.12)] md:grid-cols-4 md:divide-y-0">
              {[
                { title: "Arquitectura moderna", icon: "⌂" },
                { title: "Vivienda ecológica", icon: "◎" },
                { title: "Comunidad segura", icon: "▣" },
                { title: "Diseños seguros", icon: "◈" },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col items-center justify-center gap-2 px-3 py-4 text-center md:px-4 md:py-5"
                >
                  <div className="text-[#b08d57]">{benefit.icon}</div>
                  <p className="text-xs font-medium leading-tight text-[#f5f3ee] md:text-sm">
                    {benefit.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*
        Texto intro para separar visualmente las secciones del home.
        Aquí puedes cambiar el mensaje editorial o eliminarlo si prefieres una composición más directa.
      */}
      <section className="container pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[22px] border border-[rgba(15,42,67,0.08)] bg-[#f5f3ee] p-6 shadow-[0_12px_30px_rgba(15,42,67,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3d5a73]">
              Habitar mejor
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[#0f2a43] md:text-3xl">
              Espacios pensados para vivir con calma.
            </h3>
          </div>

          <div className="rounded-[22px] border border-[rgba(15,42,67,0.08)] bg-white p-6 shadow-[0_12px_30px_rgba(15,42,67,0.04)]">
            <p className="text-sm leading-relaxed text-[#3d5a73]">
              Diseñamos propiedades para quienes buscan equilibrio entre comodidad,
              ubicación y una experiencia de compra clara, segura y premium.
            </p>
          </div>
        </div>
      </section>

      <RecentProperties />

      <section id="vendidas" className="bg-[#0f2a43] py-20 text-white">
        <div className="container grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b08d57]">
              Resultados sólidos
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Más de 130 propiedades entregadas con satisfacción real.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-3xl font-semibold text-white">+280</p>
              <span className="mt-2 block text-sm text-white/70">
                Clientes atendidos
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-3xl font-semibold text-white">50</p>
              <span className="mt-2 block text-sm text-white/70">
                Proyectos cerrados
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-3xl font-semibold text-white">1 - 6 Meses </p>
              <span className="mt-2 block text-sm text-white/70">
                Promedios de entrega
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="container py-20">
        {/* Cierre editorial sin tarjeta: conecta la compra con una decisión de vida. */}
        <div className="border-y border-[rgba(15,42,67,0.12)] py-12 text-center md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3d5a73]">
            Una inversión para toda la vida
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[#0f2a43] md:text-5xl">
            Invierte en tu comodidad, construye tu patrimonio y deja un hogar para
            tu familia.
          </h2>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=fabiohernandezgalvan@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#3d5a73] transition hover:text-[#0f2a43]"
          >
            <SiGmail aria-hidden="true" className="text-[#c84b3c]" />
            Invierte en tu comodidad
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
