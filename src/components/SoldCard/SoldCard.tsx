"use client";

import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDroplet,
  FiHome,
  FiMapPin,
  FiMaximize2,
  FiShield,
  FiStar,
  FiUser,
} from "react-icons/fi";
import type { Property } from "@/types/property";
import styles from "./SoldCard.module.css";

type SoldCardProps = {
  property: Property;
};

export default function SoldCard({ property }: SoldCardProps) {
  const [index, setIndex] = useState(0);
  const gallery = property.gallery?.length ? property.gallery : [property.image];
  const total = gallery.length;
  const testimonial = property.testimonial;
  const rating = testimonial?.rating ?? 5;

  const privacyNote =
    testimonial?.privacy === "libre"
      ? "Testimonio y datos publicados con autorización del propietario"
      : testimonial
        ? "Testimonio publicado con autorización · Identidad reservada"
        : "Confidencial · Experiencia del propietario no publicada";

  return (
    <article id={property.id} className={styles.card}>
      <div className={styles.top}>
        <div className={styles.media}>
          <img
            key={gallery[index]}
            src={gallery[index]}
            alt={`${property.title} · Foto ${index + 1}`}
            className={styles.image}
            loading="lazy"
          />
          {total > 1 && (
            <div className={styles.carouselNav}>
              <button
                type="button"
                aria-label="Foto anterior"
                onClick={() => setIndex((current) => (current - 1 + total) % total)}
                className={styles.navButton}
              >
                <FiChevronLeft aria-hidden="true" />
              </button>
              <span className={styles.counter}>
                {index + 1}/{total}
              </span>
              <button
                type="button"
                aria-label="Foto siguiente"
                onClick={() => setIndex((current) => (current + 1) % total)}
                className={styles.navButton}
              >
                <FiChevronRight aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.infoTop}>
            <span className={styles.badge}>Vendido</span>
            <span className={styles.location}>
              <FiMapPin aria-hidden="true" />
              {property.location}
            </span>
          </div>

          <h3 className={styles.title}>{property.title}</h3>

          {property.price && (
            <p className={styles.price}>
              <span className={styles.priceLabel}>Precio de venta</span>
              <span className={styles.priceValue}>{property.price}</span>
            </p>
          )}

          {property.highlight && (
            <p className={styles.highlight}>{property.highlight}</p>
          )}

          <p className={styles.description}>{property.description}</p>

          <ul className={styles.specs}>
            {property.bedrooms !== undefined && (
              <li>
                <FiHome aria-hidden="true" /> {property.bedrooms} habitaciones
              </li>
            )}
            {property.bathrooms !== undefined && (
              <li>
                <FiDroplet aria-hidden="true" /> {property.bathrooms} baños
              </li>
            )}
            {property.area && (
              <li>
                <FiMaximize2 aria-hidden="true" /> {property.area}
              </li>
            )}
          </ul>

          <p className={styles.note}>
            <FiShield aria-hidden="true" />
            Información general · No se publican datos sensibles del propietario.
          </p>
        </div>
      </div>

      <footer className={styles.testimonial}>
        <div className={styles.testimonialHeader}>
          <span className={styles.testimonialBadge}>
            <FiShield aria-hidden="true" />
            {privacyNote}
          </span>
          {testimonial && (
            <span
              className={styles.testimonialRating}
              aria-label={`Calificación ${rating} de 5`}
            >
              {Array.from({ length: 5 }).map((_, star) => (
                <FiStar
                  key={star}
                  aria-hidden="true"
                  className={`${styles.star} ${star < rating ? styles.starFilled : ""}`}
                />
              ))}
              <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
            </span>
          )}
        </div>

        <div className={styles.testimonialMain}>
          <span className={styles.testimonialIcon} aria-hidden="true">
            <FiUser />
          </span>
          <div className={styles.testimonialBody}>
            <p className={styles.testimonialText}>
              {testimonial
                ? `“${testimonial.text}”`
                : "Proceso privado · Los detalles de esta entrega se manejan bajo confidencialidad por petición del propietario."}
            </p>
            {testimonial?.privacy === "libre" && testimonial.ownerName && (
              <p className={styles.testimonialOwner}>
                <span className={styles.ownerDivider} aria-hidden="true" />
                {testimonial.ownerName}
                {testimonial.ownerDetail ? ` · ${testimonial.ownerDetail}` : ""}
              </p>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
}