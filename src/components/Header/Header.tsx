"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import styles from "./Header.module.css";

type HeaderProps = {
  showHero?: boolean;
  solid?: boolean;
};

export default function Header({ showHero = true, solid = false }: HeaderProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${!showHero ? styles.navOnly : ""}`}>
      {showHero && <div className={styles.overlay} />}

      <nav
        className={`${styles.nav} ${solid || hasScrolled ? styles.navScrolled : ""}`}
        aria-label="Navegación principal"
      >
        <div className={styles.location}>
          <FiMapPin aria-hidden="true" />
          <span>AMB · Área Metropolitana de Bucaramanga</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="/">Inicio</Link>
          <Link href="/propiedades">Propiedades</Link>
          <Link href="/vendidas">Vendidas</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/" className={styles.logoLink} aria-label="Ir al inicio">
            <Image
              className={styles.logo}
              src="/images/Logotipacion/Logo.jpeg"
              alt="Constructora Hernandez"
              width={42}
              height={42}
            />
          </Link>
        </div>
      </nav>

      {showHero && <div className={styles.content}>
        <h1>Encuentra el hogar que se adapta a tu estilo de vida.</h1>

        <p className={styles.subtitle}>
          Espacios premium, ubicaciones estratégicas y asesoría personalizada para
          comprar, vender o invertir con confianza.
        </p>

        <Link
          href="/propiedades"
          className={styles.button}

          
          data-text="Ver propiedades"
          aria-label="Ver propiedades"
        >
          <span className={styles.actualText}>&nbsp;Ver propiedades&nbsp;</span>
          <span aria-hidden="true" className={styles.hoverText}>
            &nbsp;Ver propiedades&nbsp;
          </span>
        </Link>
      </div>}
    </header>
  );
}
