"use client";

import { useRef } from "react";
import { getRecentProperties } from "@/data/propertySelectors";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import styles from "./RecentProperties.module.css";

export default function RecentProperties() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const recentProperties = getRecentProperties();

  const scrollSlider = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector<HTMLElement>("article");
    slider.scrollBy({
      left: direction * ((card?.offsetWidth ?? 360) + 16),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="propiedades"
      className={`${styles.section} pt-6 pb-16 md:pt-8 md:pb-20`}
    >
      <div className="container">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.02em] text-[#b08d57] md:text-5xl">
              Mejores Ofertas!
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#3d5a73]">
              Últimos agregados
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Propiedad anterior"
              onClick={() => scrollSlider(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(15,42,67,0.12)] bg-white text-[#0f2a43] transition hover:bg-[#0f2a43] hover:text-[#f5f3ee]"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Propiedad siguiente"
              onClick={() => scrollSlider(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(15,42,67,0.12)] bg-white text-[#0f2a43] transition hover:bg-[#0f2a43] hover:text-[#f5f3ee]"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className={`${styles.viewport} flex snap-x snap-mandatory gap-4`}
        >
          {recentProperties.map((property) => (
            <div key={property.id} className="snap-start">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
