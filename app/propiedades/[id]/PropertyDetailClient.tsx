"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Ruler,
  X,
} from "lucide-react";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  siteUrl,
  whatsappNumber,
} from "@/lib/site";
import type { Property } from "@/types/property";
import styles from "./PropertyDetail.module.css";

/* ------------------------------------------------------------------ */
/* Configuración                                                       */
/* ------------------------------------------------------------------ */

const BACK_HREF = "/propiedades";
const CONTACT = { whatsapp: whatsappNumber, phone: `+${whatsappNumber}` };
const MAP_PROVIDER = "google" as "google" | "osm";

/* ------------------------------------------------------------------ */
/* Adaptador: convierte TU objeto de propiedad en lo que usa la vista  */
/* ------------------------------------------------------------------ */

interface SpecView {
  icon: typeof BedDouble;
  label: string;
  value: string;
}

interface PropertyView {
  id: string;
  title: string;
  status: string;
  location: string;
  highlight?: string;
  description: string;
  price: string;
  images: { src: string | StaticImageData; alt: string }[];
  specs: SpecView[];
  lat?: number;
  lng?: number;
  address?: string;
  mapUrl?: string;
}

type Raw = Record<string, any>;

// Saca lat/lng de un enlace largo de Google Maps (los enlaces cortos no se pueden leer)
function coordsFromUrl(url: string): [number, number] | null {
  const patterns = [
    /@(-?\d+\.\d+),(-?\d+\.\d+)/,
    /[?&](?:q|query|ll)=(-?\d+\.\d+),(-?\d+\.\d+)/,
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return [Number(m[1]), Number(m[2])];
  }
  return null;
}

function toView(p: Raw): PropertyView {
  const pick = (...keys: string[]) =>
    keys.map((k) => p[k]).find((x) => x !== undefined && x !== null && x !== "");
  const num = (x: unknown) => {
    const n = Number(x);
    return x !== undefined && x !== null && x !== "" && Number.isFinite(n) ? n : undefined;
  };

  const title = String(pick("title", "name") ?? "");

  const priceRaw = pick("price", "precio");
  const priceValue = num(pick("priceValue", "precioValor"));
  const price =
    priceRaw !== undefined
      ? String(priceRaw)
      : priceValue !== undefined
        ? new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          }).format(priceValue)
        : "";

  const gallery = pick("gallery", "images", "photos");
  const single = pick("image", "foto");
  const rawImages: any[] = Array.isArray(gallery) && gallery.length
    ? gallery
    : single
      ? [single]
      : [];
  const images = rawImages.map((img, i) => {
    const isStatic = img && typeof img === "object" && "width" in img && "height" in img;
    const src = typeof img === "string" || isStatic ? img : img?.src;
    return { src: src as string | StaticImageData, alt: `${title}, foto ${i + 1}` };
  });

  const specs: SpecView[] = [];
  const push = (icon: typeof BedDouble, label: string, value: unknown, suffix = "") => {
    if (value === undefined || value === null || value === "") return;
    specs.push({
      icon,
      label,
      value: typeof value === "number" ? `${value}${suffix}` : String(value),
    });
  };
  push(BedDouble, "Habitaciones", pick("bedrooms", "habitaciones"));
  push(Bath, "Baños", pick("bathrooms", "banos"));
  push(Ruler, "Área", pick("area", "areaM2", "size"), " m²");

  const mapUrl = pick("mapUrl", "mapsUrl", "googleMapsUrl", "mapLink") as string | undefined;
  let lat = num(pick("lat", "latitude"));
  let lng = num(pick("lng", "lon", "longitude"));
  if ((lat === undefined || lng === undefined) && mapUrl) {
    const c = coordsFromUrl(mapUrl);
    if (c) [lat, lng] = c;
  }

  const zone = pick("location", "zone");
  const city = pick("city");
  const location = [zone, city && !String(zone ?? "").includes(String(city)) ? city : null]
    .filter(Boolean)
    .join(", ");

  return {
    id: String(pick("id") ?? title),
    title,
    status: String(pick("status", "estado") ?? ""),
    location,
    highlight: pick("highlight", "tagline", "subtitle") as string | undefined,
    description: String(pick("description", "descripcion") ?? ""),
    price,
    images,
    specs,
    lat,
    lng,
    address: pick("address", "direccion") as string | undefined,
    mapUrl,
  };
}

/* ------------------------------------------------------------------ */
/* Envío del formulario: abre WhatsApp con el mensaje prellenado       */
/* ------------------------------------------------------------------ */

interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  propertyTitle: string;
  propertyUrl?: string;
}

async function submitContact(data: ContactData): Promise<void> {
  const text = buildWhatsAppMessage({
    propertyTitle: data.propertyTitle,
    propertyUrl: data.propertyUrl,
    name: data.name.trim() || undefined,
    phone: data.phone.trim() || undefined,
    email: data.email.trim() || undefined,
    message: data.message.trim(),
  });
  window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
}

/* ------------------------------------------------------------------ */
/* Componente principal                                                */
/* ------------------------------------------------------------------ */

export function PropertyDetailClient({ property }: { property: Property }) {
  const v = useMemo(() => toView(property as Raw), [property]);

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const n = v.images.length;

  const onStripScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return;
    setCurrent(Math.min(n - 1, Math.round(el.scrollLeft / (first.offsetWidth + 8))));
  };

  return (
    <main className={styles.page}>
      <div className={styles.topRow}>
        <Link href={BACK_HREF} className={styles.backLink}>
          <ArrowLeft size={16} className={styles.arrowIcon} aria-hidden />
          Volver al catálogo
        </Link>
      </div>

      {/* Cabecera: identidad a la izquierda, precio y acciones a la derecha */}
      <header className={styles.head}>
        <div className={styles.headMain}>
          {v.status && <span className={styles.statusBadge}>{v.status}</span>}
          <h1 className={styles.title}>{v.title}</h1>
          {v.location && (
            <p className={styles.location}>
              <MapPin size={16} aria-hidden />
              {v.location}
            </p>
          )}
        </div>

        <div className={styles.headSide}>
          {v.price && (
            <p className={styles.price}>
              {v.price}
              <small>COP</small>
            </p>
          )}
          <div className={styles.actions}>
            <a href="#contacto" className={styles.primaryButton}>
              Agendar visita
            </a>
            <a href="#ubicacion" className={styles.ghostButton}>
              <MapPin size={16} aria-hidden />
              Cómo llegar
            </a>
          </div>
        </div>
      </header>

      {/* Galería: mosaico en PC, carrusel deslizable en celular (mismo HTML) */}
      {n > 0 && (
        <section className={styles.gallery} aria-label="Galería de fotos">
          <div
            className={styles.galleryGrid}
            data-n={Math.min(n, 5)}
            onScroll={onStripScroll}
          >
            {v.images.map((img, i) => (
              <button
                key={i}
                type="button"
                className={styles.tile}
                onClick={() => setLightbox(i)}
                aria-label={`Ampliar foto ${i + 1} de ${n}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  preload={i === 0}
                  sizes="(max-width: 719px) 92vw, (max-width: 1200px) 50vw, 660px"
                  className={styles.tileImg}
                />
              </button>
            ))}
          </div>
          <span className={styles.counter}>
            {current + 1} / {n}
          </span>
          <button type="button" className={styles.seeAll} onClick={() => setLightbox(0)}>
            <Maximize2 size={15} aria-hidden />
            Ver {n > 5 ? `las ${n} fotos` : "en grande"}
          </button>
        </section>
      )}

      {/* Franja de datos */}
      {v.specs.length > 0 && (
        <ul
          className={styles.specs}
          style={{ "--n": Math.min(v.specs.length, 6) } as CSSProperties}
        >
          {v.specs.slice(0, 6).map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.label} className={styles.spec}>
                <Icon size={22} className={styles.specIcon} aria-hidden />
                <div className={styles.specText}>
                  <span className={styles.specValue}>{s.value}</span>
                  <span className={styles.specLabel}>{s.label}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Descripción: a todo el ancho, en dos columnas si es larga */}
      {(v.highlight || v.description) && (
        <section className={styles.section}>
          <SectionHead>Sobre la propiedad</SectionHead>
          {v.highlight && <p className={styles.highlight}>{v.highlight}</p>}
          <p
            className={`${styles.description} ${v.description.length > 420 ? styles.twoCols : ""}`}
            data-collapsed={!expanded}
          >
            {v.description}
          </p>
          {v.description.length > 220 && (
            <button
              type="button"
              className={styles.readMore}
              onClick={() => setExpanded((e) => !e)}
            >
              {expanded ? "Leer menos" : "Leer más"}
            </button>
          )}
        </section>
      )}

      <MapBlock v={v} />

      <ContactBand v={v} />

      {/* Barra fija inferior (solo celular) */}
      <div className={styles.stickyBar}>
        <div>
          <p className={styles.stickyLabel}>Precio</p>
          <p className={styles.stickyPrice}>{v.price}</p>
        </div>
        <a href="#contacto" className={styles.primaryButton}>
          Agendar visita
        </a>
      </div>

      {lightbox !== null && (
        <Lightbox
          images={v.images}
          index={lightbox}
          onIndex={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </main>
  );
}

function SectionHead({ children }: { children: string }) {
  return <h2 className={styles.sectionHead}>{children}</h2>;
}

/* ------------------------------------------------------------------ */
/* Mapa incrustado                                                     */
/* ------------------------------------------------------------------ */

function embedUrl(v: PropertyView): string | null {
  const hasCoords = v.lat !== undefined && v.lng !== undefined;
  if (hasCoords && MAP_PROVIDER === "osm") {
    const d = 0.004;
    const [lat, lng] = [v.lat as number, v.lng as number];
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d},${lat - d},${lng + d},${lat + d}&layer=mapnik&marker=${lat},${lng}`;
  }
  const q = hasCoords ? `${v.lat},${v.lng}` : v.address;
  if (!q) return null;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed&hl=es`;
}

function MapBlock({ v }: { v: PropertyView }) {
  const [active, setActive] = useState(false);
  const embed = embedUrl(v);
  const hasCoords = v.lat !== undefined && v.lng !== undefined;
  const openUrl =
    v.mapUrl ??
    (hasCoords
      ? `https://www.google.com/maps/search/?api=1&query=${v.lat},${v.lng}`
      : v.address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.address)}`
        : undefined);

  if (!embed && !openUrl) return null;

  return (
    <section id="ubicacion" className={styles.section}>
      <SectionHead>Ubicación</SectionHead>

      <div className={styles.mapFrame} onMouseLeave={() => setActive(false)}>
        {embed ? (
          <>
            <iframe
              className={styles.mapIframe}
              src={embed}
              title={`Mapa de ${v.title}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* El mapa se activa con un clic/toque para no atrapar el scroll de la página */}
            {!active ? (
              <button
                type="button"
                className={styles.mapShield}
                onClick={() => setActive(true)}
                aria-label="Activar mapa para explorarlo"
              >
                <span className={styles.mapHint}>Explorar mapa</span>
              </button>
            ) : (
              <button type="button" className={styles.mapDone} onClick={() => setActive(false)}>
                Listo
              </button>
            )}
          </>
        ) : (
          <div className={styles.mapFallback}>
            <MapPin size={32} aria-hidden />
          </div>
        )}

        <div className={styles.mapCard}>
          <p className={styles.mapCardText}>
            <MapPin size={16} aria-hidden />
            {v.address ?? v.location}
          </p>
          {openUrl && (
            <a
              className={styles.mapOpen}
              href={openUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir en Google Maps
              <ArrowUpRight size={15} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contacto                                                            */
/* ------------------------------------------------------------------ */

function ContactBand({ v }: { v: PropertyView }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hola, me interesa ${v.title}. Quisiera agendar una visita.`,
  });

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContact({
        ...form,
        propertyId: v.id,
        propertyTitle: v.title,
        propertyUrl: `${siteUrl}/propiedades/${v.id}`,
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const waHref = CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hola, me interesa ${v.title}.`)}`
    : null;

  return (
    <section id="contacto" className={styles.contact}>
      <div className={styles.contactIntro}>
        <h2 className={styles.contactTitle}>Agenda tu visita a {v.title}</h2>
        <p className={styles.contactText}>
          Déjanos tus datos y un asesor te contactará para coordinar la visita y resolver
          tus dudas.
        </p>
        {(waHref || CONTACT.phone) && (
          <div className={styles.contactLinks}>
            {waHref && (
              <a
                className={styles.ghostLight}
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            )}
            {CONTACT.phone && (
              <a className={styles.ghostLight} href={`tel:${CONTACT.phone}`}>
                Llamar
              </a>
            )}
          </div>
        )}
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="c-name">
              Nombre
            </label>
            <input
              id="c-name"
              className={styles.input}
              required
              autoComplete="name"
              value={form.name}
              onChange={set("name")}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="c-phone">
              Teléfono
            </label>
            <input
              id="c-phone"
              className={styles.input}
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={set("phone")}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="c-email">
            Correo electrónico
          </label>
            <input
              id="c-email"
              className={styles.input}
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={set("email")}
            />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="c-msg">
            Mensaje
          </label>
          <textarea id="c-msg" className={styles.textarea} value={form.message} onChange={set("message")} />
        </div>

        <div className={styles.formFoot}>
          <button
            className={styles.primaryButton}
            type="submit"
            disabled={status === "sending" || status === "sent"}
          >
            {status === "sending" ? "Enviando…" : status === "sent" ? "Enviado" : "Solicitar visita"}
          </button>
          <p className={styles.formNote} role="status" aria-live="polite">
            {status === "sent" && "¡Listo! Se abrió WhatsApp con tu mensaje."}
            {status === "error" && "No se pudo abrir WhatsApp. Inténtalo de nuevo."}
          </p>
        </div>
      </form>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Visor de fotos (<dialog> modal)                                     */
/* ------------------------------------------------------------------ */

function Lightbox({
  images,
  index,
  onIndex,
  onClose,
}: {
  images: PropertyView["images"];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const startX = useRef<number | null>(null);
  const ignoreCloseEvent = useRef(false);
  const n = images.length;

  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      ignoreCloseEvent.current = true;
      document.body.style.overflow = prev;
      if (d?.open) d.close();
    };
  }, []);

  const handleClose = () => {
    if (ignoreCloseEvent.current) {
      ignoreCloseEvent.current = false;
      return;
    }
    onClose();
  };

  const step = (delta: number) => onIndex((index + delta + n) % n);
  const img = images[index];

  return (
    <dialog
      ref={ref}
      className={styles.lightbox}
      aria-label="Galería de fotos"
      onClose={handleClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        else if (e.key === "ArrowLeft") step(-1);
      }}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
    >
      <div className={styles.lbBar}>
        <span>
          {index + 1} / {n}
        </span>
        <button type="button" className={styles.lbBtn} onClick={handleClose} aria-label="Cerrar">
          <X size={22} />
        </button>
      </div>

      <div
        className={styles.lbStage}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <Image key={index} src={img.src} alt={img.alt} fill sizes="100vw" className={styles.lbImg} />
      </div>

      {n > 1 && (
        <>
          <button
            type="button"
            className={`${styles.lbBtn} ${styles.lbArrow} ${styles.lbPrev}`}
            onClick={() => step(-1)}
            aria-label="Foto anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            className={`${styles.lbBtn} ${styles.lbArrow} ${styles.lbNext}`}
            onClick={() => step(1)}
            aria-label="Foto siguiente"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </dialog>
  );
}
