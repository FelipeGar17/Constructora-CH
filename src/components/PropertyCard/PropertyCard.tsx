"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiDroplet, FiHome, FiMaximize2 } from "react-icons/fi";
import { getPropertyHref } from "@/data/propertySelectors";
import type { Property } from "@/types/property";
import styles from "./PropertyCard.module.css";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      onClick={() => setExpanded((current) => !current)}
      aria-expanded={expanded}
      className={`${styles.card} ${expanded ? styles.cardExpanded : ""}`}
    >
      <button
        type="button"
        aria-label="Cerrar tarjeta"
        onClick={(event) => {
          event.stopPropagation();
          setExpanded(false);
        }}
        className={styles.closeButton}
      >
        ✕
      </button>

      <div className={styles.imageFrame}>
        <img src={property.image} alt={property.title} className={styles.image} />
        <div className={styles.dimLayer} />
      </div>

      <span className={styles.badge}>{property.recentLabel ?? property.status}</span>

      <div className={styles.infoPanel}>
        <p className={styles.location}>{property.location}</p>
        <h3 className={styles.title}>{property.title}</h3>

        <div className={styles.specs}>
          {property.bedrooms !== undefined && (
            <span><FiHome aria-hidden="true" /> {property.bedrooms} hab</span>
          )}
          {property.bathrooms !== undefined && (
            <span><FiDroplet aria-hidden="true" /> {property.bathrooms} baños</span>
          )}
          {property.area && (
            <span><FiMaximize2 aria-hidden="true" /> {property.area}</span>
          )}
        </div>

        <div className={styles.reveal}>
          <div>
            <p className={styles.description}>{property.description}</p>
            {property.highlight && <p className={styles.highlight}>{property.highlight}</p>}
            <Link
              href={getPropertyHref(property)}
              onClick={(event) => event.stopPropagation()}
              className={styles.actionButton}
            >
              <span>Ver propiedad</span>
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
