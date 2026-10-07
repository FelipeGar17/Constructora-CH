"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Legalfooter.module.css";

const LINKS = [
  { href: "/politica-privacidad", label: "Política de privacidad" },
  { href: "/tratamiento-datos", label: "Tratamiento de datos" },
  { href: "/terminos-condiciones", label: "Términos y condiciones" },
  { href: "/cookies", label: "Política de cookies" },
];

export default function LegalFooter() {
  const pathname = usePathname();
  const visibles = LINKS.filter((l) => l.href !== pathname);

  return (
    <footer className="mt-12 border-t-2 border-[var(--color-primary)] pt-6">
      <p className="text-xs leading-relaxed text-[var(--color-muted)]">
        Esta política se complementa con{" "}
        {visibles.map((l, i) => {
          const esUltimo = i === visibles.length - 1;
          const esPenultimo = i === visibles.length - 2;

          let separador = ", ";
          if (esUltimo) separador = " de este sitio. ";
          else if (esPenultimo) separador = " y ";

          return (
            <span key={l.href}>
              <Link className={styles.link} href={l.href}>
                {l.label}
              </Link>
              {separador}
            </span>
          );
        })}
        Ley 1581 de 2012 · Decreto 1074 de 2015.
      </p>
    </footer>
  );
}