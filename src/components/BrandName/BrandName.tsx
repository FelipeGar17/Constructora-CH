import styles from "./BrandName.module.css";

type BrandNameSize = "sm" | "md" | "lg";

type BrandNameProps = {
  size?: BrandNameSize;
  /** El nombre hereda el color del contenedor; solo el monograma "CH" es dorado. */
  className?: string;
};

/**
 * Marca del sitio: monograma "CH" en dorado + "Constructora Hernandez".
 * El nombre es texto plano para que Google lo lea; el dorado es solo la marca.
 */
export default function BrandName({ size = "md", className }: BrandNameProps) {
  return (
    <span className={`${styles.brand} ${styles[size]} ${className ?? ""}`}>
      <span className={styles.mark}>CH</span>
      <span className={styles.name}>Constructora Hernandez</span>
    </span>
  );
}
