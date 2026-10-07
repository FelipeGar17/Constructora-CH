import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import BrandName from "@/components/BrandName/BrandName";
import styles from "./Footer.module.css";

function FooterIcon({ name }: { name: "home" | "building" | "sold" | "contact" | "phone" | "whatsapp" | "email" | "privacy" | "data" | "terms" | "cookies" }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></>,
    building: <><path d="M4 21V4h16v17" /><path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" /></>,
    sold: <><path d="M4 20V9l8-6 8 6v11" /><path d="m8 14 3 3 5-6" /></>,
    contact: <><path d="M4 5h16v14H4z" /><path d="m4 7 8 6 8-6" /></>,
    phone: <path d="M6 3h3l2 5-2 2a14 14 0 0 0 5 5l2-2 5 2v3c0 1-1 2-2 2C10 20 4 14 4 5c0-1 1-2 2-2z" />,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-12 7L4 20l1.5-4A8 8 0 1 1 20 11.5z" /><path d="M9 9c.3 2 1.5 3.2 3.5 4" /></>,
    email: <><path d="M4 5h16v14H4z" /><path d="m4 7 8 6 8-6" /></>,
    privacy: <><path d="M12 3 5 6v5c0 4.5 3 7.5 7 10 4-2.5 7-5.5 7-10V6l-7-3z" /><path d="m9 12 2 2 4-4" /></>,
    data: <><path d="M6 3h9l3 3v15H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
    terms: <><path d="M6 3h12v18H6z" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
    cookies: <><path d="M19 13a6 6 0 1 1-8-8 4 4 0 0 0 8 8z" /><circle cx="9" cy="14" r="1" /><circle cx="13" cy="17" r="1" /></>,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.icon} fill="none" stroke="currentColor" strokeWidth="1.5">
      {paths[name]}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Bloque principal: marca, navegación y canales de contacto. */}
        <div className={styles.grid}>
          <div>
            <p className={styles.brandEyebrow}>
              <BrandName size="md" />
            </p>
            <h2 className={styles.brandTitle}>
              Espacios para construir una vida mejor.
            </h2>
            <p className={styles.brandText}>
              Asesoría inmobiliaria y proyectos pensados para vivir, invertir y
              encontrar un hogar con confianza.
            </p>
          </div>

          {/* Estas rutas corresponden al menú principal del header. */}
          <nav aria-label="Navegación del pie de página">
            <p className={styles.sectionLabel}>
              Navegación
            </p>
            <div className={styles.linkList}>
              <Link className={styles.link} href="/">
                <FooterIcon name="home" />
                Inicio
              </Link>
              <Link className={styles.link} href="/propiedades">
                <FooterIcon name="building" />
                Propiedades
              </Link>
              <Link className={styles.link} href="/vendidas">
                <FooterIcon name="sold" />
                Vendidas
              </Link>
              <Link className={styles.link} href="/contacto">
                <FooterIcon name="contact" />
                Contacto
              </Link>
            </div>
          </nav>

          {/* Contactos funcionales: teléfono, WhatsApp y correo. */}
          <div>
            <p className={styles.sectionLabel}>
              Hablemos
            </p>
            <div className={styles.contactList}>
              <a className={styles.link} href="tel:3113678896">
                <FooterIcon name="phone" />
                311 367 8896
              </a>
              <a
                className={styles.link}
                href="https://wa.me/573113678896"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp aria-hidden="true" className={`${styles.icon} ${styles.whatsappIcon}`} />
                WhatsApp
              </a>
              <a
                className={`${styles.link} ${styles.linkBreak}`}
                href="https://mail.google.com/mail/?view=cm&fs=1&to=fabiohernandezgalvan@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <SiGmail aria-hidden="true" className={`${styles.icon} ${styles.gmailIcon}`} />
                fabiohernandezgalvan@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Separador visual entre la información comercial y la información legal. */}
        <div className={styles.separator} />

        {/* Avisos informativos; conviene revisarlos con asesoría legal antes de publicar. */}
        <div className={styles.legalGrid}>
          <div className={styles.legalText}>
            <p className={styles.legalHeading}>
              Información legal y tratamiento de datos
            </p>
            <p className={styles.legalBody}>
              Al contactarnos por teléfono, WhatsApp o correo, los datos entregados
              serán utilizados únicamente para atender solicitudes, brindar
              información sobre propiedades y dar seguimiento comercial. No se
              solicitan cuentas de usuario ni se almacenan datos en una base de datos
              dentro de este sitio.
            </p>
          </div>

          <div className={styles.legalLinks}>
            <Link className={styles.link} href="/politica-privacidad">
              <FooterIcon name="privacy" />
              Política de privacidad
            </Link>
            <Link className={styles.link} href="/tratamiento-datos">
              <FooterIcon name="data" />
              Tratamiento de datos
            </Link>
            <Link className={styles.link} href="/terminos-condiciones">
              <FooterIcon name="terms" />
              Términos y condiciones
            </Link>
            <Link className={styles.link} href="/cookies">
              <FooterIcon name="cookies" />
              Cookies
            </Link>
          </div>
        </div>

        <div className={styles.copyright}>
          © {new Date().getFullYear()} <BrandName size="sm" />. Todos los derechos reservados.
        </div>

        <div className={styles.imageNotice}>
          Las fotografías e imágenes de este sitio son propiedad de sus respectivos titulares. Prohibida su reproducción, copia o reutilización sin autorización.
        </div>
      </div>
    </footer>
  );
}
