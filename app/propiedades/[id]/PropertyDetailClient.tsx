"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { Lightbox, type LightboxImage } from "../../../src/components/Lightbox/Lightbox";
import { ContactForm } from "../../../src/components/PropertyDetail/ContactForm";
import type { Property } from "../../../src/types/property";
import styles from "./PropertyDetail.module.css";

interface PropertyDetailClientProps {
  property: Property;
}

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const images = property.gallery?.length ? property.gallery : [property.image];
  const lightboxImages: LightboxImage[] = images.map((src, index) => ({
    src,
    alt: `${property.title}, foto ${index + 1} de ${images.length}`,
  }));

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://dominio-pendiente.example.com";
  const propertyUrl = `${siteUrl}/propiedades/${property.id}`;

  return (
    <main className="min-h-[calc(100dvh-72px)] bg-[var(--color-ivory)] text-[var(--color-primary)]">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14 lg:py-16">
        <div className="mb-8">
          <Link href="/propiedades" className={styles.backLink}>
            <ArrowLeft size={18} className={styles.arrowIcon} />
            Volver a propiedades
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className={styles.galleryContainer}>
            {images.map((image, index) => (
              <GalleryImage
                key={image}
                src={image}
                alt={`${property.title}, foto ${index + 1} de ${images.length}`}
                index={index}
                lightboxImages={lightboxImages}
              />
            ))}
          </div>

          <div className={styles.card}>
            <span className={styles.statusBadge}>{property.status}</span>
            <h1 className={styles.title}>{property.title}</h1>
            <p className={styles.location}>{property.location}</p>
            {property.highlight && (
              <p className={styles.highlight}>{property.highlight}</p>
            )}
            <p className={styles.description}>{property.description}</p>

            <div className={styles.specsList}>
              {property.bedrooms !== undefined && property.bedrooms !== null && (
                <div className={styles.specItem}>
                  <Bed size={22} className={styles.specIcon} />
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Habitaciones</span>
                    <span className={styles.specValue}>{property.bedrooms}</span>
                  </div>
                </div>
              )}
              {property.bathrooms !== undefined && property.bathrooms !== null && (
                <div className={styles.specItem}>
                  <Bath size={22} className={styles.specIcon} />
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Baños</span>
                    <span className={styles.specValue}>{property.bathrooms}</span>
                  </div>
                </div>
              )}
              {property.area && (
                <div className={styles.specItem}>
                  <Square size={22} className={styles.specIcon} />
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Área</span>
                    <span className={styles.specValue}>{property.area}</span>
                  </div>
                </div>
              )}
              {property.propertyType && (
                <div className={styles.specItem}>
                  <Building2 size={22} className={styles.specIcon} />
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Tipo</span>
                    <span className={styles.specValue}>{property.propertyType}</span>
                  </div>
                </div>
              )}
            </div>

            <p className={styles.price}>{property.price ?? "Consultar precio"}</p>

            <div className={styles.actions}>
              <a
                href="#contacto"
                className={styles.primaryButton}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contacto")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Contactar
              </a>
              {property.mapUrl && (
                <a
                  href={property.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ghostButton}
                >
                  <MapPin size={18} />
                  Ver ubicación
                  <ArrowUpRight size={18} className={styles.arrowRight} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.sectionDivider} />

        <div id="contacto">
          <ContactForm propertyTitle={property.title} propertyUrl={propertyUrl} />
        </div>
      </div>
    </main>
  );
}

function GalleryImage({
  src,
  alt,
  index,
  lightboxImages,
}: {
  src: string;
  alt: string;
  index: number;
  lightboxImages: LightboxImage[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.galleryImage}
        onClick={() => setIsOpen(true)}
        aria-label={`Ampliar imagen ${index + 1}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
          className={styles.image}
        />
      </button>
      <Lightbox
        images={lightboxImages}
        initialIndex={index}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
