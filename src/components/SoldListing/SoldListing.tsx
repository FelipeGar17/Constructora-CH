import type { Property } from "@/types/property";
import SoldCard from "@/components/SoldCard/SoldCard";
import styles from "./SoldListing.module.css";

type SoldListingProps = {
  title: string;
  eyebrow: string;
  description: string;
  properties: Property[];
};

export default function SoldListing({
  title,
  eyebrow,
  description,
  properties,
}: SoldListingProps) {
  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.list}>
        {properties.map((property) => (
          <SoldCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}