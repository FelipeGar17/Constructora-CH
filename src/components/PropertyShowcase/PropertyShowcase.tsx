"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  Bath,
  BedDouble,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Ruler,
  SearchX,
  X,
} from "lucide-react";
import {
  DEFAULT_FILTERS,
  applyFilters,
  formatPrice,
  getFilterOptions,
  toSrc,
  type Filters,
  type ImageSource,
  type Property,
} from "./propertyFilters";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PropertyFilterBar from "./PropertyFilterBar";
import { properties as catalogProperties } from "@/data/properties";
import type { Property as CatalogProperty } from "@/types/property";

/* ------------------------------------------------------------------ */
/* Adaptador del catálogo real                                         */
/* ------------------------------------------------------------------ */

const AVAILABLE_STATUSES: CatalogProperty["status"][] = [
  "En obra",
  "Disponible en planos",
  "Disponible en venta",
];

const toProperty = (property: CatalogProperty): Property => ({
  id: property.id,
  name: property.title,
  zone: property.location,
  price: property.priceValue ?? Number(property.price?.replace(/[^\d]/g, "") || 0),
  status: property.status,
  highlight: property.highlight,
  description: property.description,
  images: property.gallery?.length ? property.gallery : [property.image],
  beds: property.bedrooms ?? 0,
  baths: property.bathrooms ?? 0,
  area: Number.parseFloat(property.area?.replace(",", ".") ?? "0"),
  mapUrl: property.mapUrl,
});

const AVAILABLE_PROPERTIES: Property[] = catalogProperties
  .filter((property) => AVAILABLE_STATUSES.includes(property.status))
  .map(toProperty);

/* ------------------------------------------------------------------ */
/* Configuración                                                       */
/* ------------------------------------------------------------------ */

// Gestos
const LOCK_MS = 1100;
const WHEEL_THRESHOLD = 40;
const WHEEL_X_THRESHOLD = 60;
const WHEEL_IDLE_MS = 140;
const SWIPE_PX = 50;
const SWIPE_X_PX = 40;
const MAX_DOTS = 8;

// Responsive (ajusta aquí si quieres cambiar cuándo cambia el diseño)
const SPLIT_MIN_W = 720; // ancho mínimo del área para usar 2 columnas (PC / TV / tablet horizontal)
const SPLIT_MIN_RATIO = 1.15; // ancho/alto mínimo para usar 2 columnas
const U_MIN = 12; // tamaño mínimo de la unidad base (px) => texto legible en móvil
const U_MAX = 48; // tamaño máximo (TV / 4K)
const TIGHT_ROWS = 40; // (2 columnas) si caben menos "filas", se oculta la descripción
const TIGHT_H_STACKED = 430; // (móvil) si el área del carrusel mide menos de esto, se oculta la descripción

type Ease = [number, number, number, number];
const EASE_OUT: Ease = [0.22, 1, 0.36, 1];
const EASE_IN_OUT: Ease = [0.65, 0, 0.35, 1];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/* ------------------------------------------------------------------ */
/* Estilos. Todo se dimensiona con --u (px), calculada según el área   */
/* disponible. Móvil: data-layout="stacked". PC/TV: data-layout="split"*/
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/* Variantes de animación                                              */
/* `custom` = { dir, dx, dy, u }: las distancias salen del tamaño real */
/* del área, así el arco se ve bien en móvil, tablet y TV.             */
/* ------------------------------------------------------------------ */

interface Cx {
  dir: number; // 1 baja, -1 sube
  dx: number; // recorrido horizontal (px)
  dy: number; // recorrido vertical (px)
  u: number; // unidad base (px)
}

const imageVariants: Variants = {
  enter: (c: Cx) => ({
    x: c.dir * c.dx,
    y: c.dir * c.dy,
    rotateY: c.dir * -38,
    rotateX: c.dir * 14,
    rotateZ: c.dir * 9,
    scale: 0.55,
    opacity: 0,
  }),
  center: {
    x: 0,
    y: 0,
    rotateY: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 1,
    opacity: 1,
    transition: {
      x: { duration: 0.9, ease: EASE_OUT },
      y: { duration: 1.0, ease: EASE_IN_OUT },
      rotateY: { duration: 1.0, ease: EASE_OUT },
      rotateX: { duration: 1.0, ease: EASE_OUT },
      rotateZ: { duration: 1.0, ease: EASE_OUT },
      scale: { duration: 0.9, ease: EASE_OUT },
      opacity: { duration: 0.5, delay: 0.1 },
    },
  },
  exit: (c: Cx) => ({
    x: c.dir * -c.dx,
    y: c.dir * -c.dy,
    rotateY: c.dir * 38,
    rotateX: c.dir * -14,
    rotateZ: c.dir * -9,
    scale: 0.55,
    opacity: 0,
    transition: {
      x: { duration: 0.8, ease: EASE_IN_OUT },
      y: { duration: 0.8, ease: EASE_OUT },
      rotateY: { duration: 0.8, ease: EASE_IN_OUT },
      rotateX: { duration: 0.8, ease: EASE_IN_OUT },
      rotateZ: { duration: 0.8, ease: EASE_IN_OUT },
      scale: { duration: 0.8, ease: EASE_IN_OUT },
      opacity: { duration: 0.5 },
    },
  }),
};

const textVariants: Variants = {
  enter: (c: Cx) => ({ opacity: 0, y: c.dir * c.u * 5 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
  exit: (c: Cx) => ({
    opacity: 0,
    y: c.dir * -c.u * 3.5,
    transition: { duration: 0.4, ease: EASE_IN_OUT },
  }),
};

const slideVariants: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const endStepVariants: Variants = {
  enter: (c: Cx) => ({ opacity: 0, y: c.dir * c.dy * 0.25 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
  exit: (c: Cx) => ({
    opacity: 0,
    y: c.dir * c.dy * 0.25,
    transition: { duration: 0.6, ease: EASE_IN_OUT },
  }),
};

// Cambio de foto (custom = dirección numérica; usa % para escalar con la tarjeta)
const galleryVariants: Variants = {
  galleryIn: (dir: number) => ({ x: `${dir * 30}%`, opacity: 0 }),
  galleryShow: { x: "0%", opacity: 1, transition: { duration: 0.45, ease: EASE_OUT } },
  galleryOut: (dir: number) => ({
    x: `${dir * -30}%`,
    opacity: 0,
    transition: { duration: 0.3, ease: EASE_IN_OUT },
  }),
};

const reducedVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Mide el área real de un elemento (no la ventana): se adapta a barras del navegador, header, rotación, etc. */
function useBox(ref: RefObject<HTMLElement | null>) {
  const [box, setBox] = useState({ w: 0, h: 0 });
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setBox((b) => (b.w === w && b.h === h ? b : { w, h }));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("orientationchange", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", update);
    };
  }, [ref]);
  return box;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [query]);
  return matches;
}

/* ------------------------------------------------------------------ */
/* Componente principal                                                */
/* ------------------------------------------------------------------ */

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ViewerState {
  seq: number;
  rect: Rect;
  name: string;
  images: ImageSource[];
  startIndex: number;
}

interface PropertyShowcaseProps {
  properties?: Property[];
  /** Alto de tu header fijo: número (px) o cualquier valor CSS, p. ej. "4.5rem" o "var(--header-h)". */
  headerHeight?: number | string;
  /** Tu footer: se muestra como último paso, tras la última propiedad. */
  footer?: ReactNode;
  /** Modo controlado (opcional). */
  filters?: Filters;
  onFiltersChange?: (f: Filters) => void;
  /**
   * Acción opcional para abrir una ficha propia de la propiedad.
   */
  onViewDetail?: (property: Property) => void;
}

export default function PropertyShowcase({
  properties = AVAILABLE_PROPERTIES,
  headerHeight = 72,
  footer = <Footer />,
  filters: filtersProp,
  onFiltersChange,
  onViewDetail,
}: PropertyShowcaseProps) {
  /* ---- Medición y modo de layout ---- */
  const mainRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const box = useBox(mainRef); // todo el espacio bajo tu header (decide el modo)
  const sbox = useBox(sceneRef); // solo el área del carrusel (decide tamaños)
  const ready = sbox.w > 0 && sbox.h > 0;

  const split = box.w >= SPLIT_MIN_W && box.w / Math.max(box.h, 1) >= SPLIT_MIN_RATIO;
  const u = ready
    ? clamp(
      split ? Math.min(sbox.w / 66, sbox.h / 46) : Math.min(sbox.w / 28, sbox.h / 52),
      U_MIN,
      U_MAX
    )
    : 16;
  const tight = ready && (split ? sbox.h / u < TIGHT_ROWS : sbox.h < TIGHT_H_STACKED);

  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const isCoarse = useMediaQuery("(pointer: coarse)");

  /* ---- Filtros ---- */
  const [innerFilters, setInnerFilters] = useState<Filters>(DEFAULT_FILTERS);
  const filters = filtersProp ?? innerFilters;
  const setFilters = onFiltersChange ?? setInnerFilters;

  const options = useMemo(() => getFilterOptions(properties), [properties]);
  const visible = useMemo(() => applyFilters(properties, filters), [properties, filters]);
  const visibleKey = visible.map((p) => p.id).join("|");

  /* ---- Estado del carrusel ---- */
  const [[step, direction], setPage] = useState<[number, number]>([0, 1]);
  const [[imgIdx, imgDir], setGallery] = useState<[number, number]>([0, 1]);

  const [prevKey, setPrevKey] = useState(visibleKey);
  if (prevKey !== visibleKey) {
    setPrevKey(visibleKey);
    setPage([0, 1]);
    setGallery([0, 1]);
  }

  /* ---- Visor ampliado ---- */
  const [viewer, setViewer] = useState<ViewerState | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const seqRef = useRef(0);

  const listRef = useRef(visible);
  const stepRef = useRef(step);
  const imgIdxRef = useRef(imgIdx);
  const lockedRef = useRef(false);
  const viewerOpenRef = useRef(false);

  useEffect(() => {
    listRef.current = visible;
    stepRef.current = step;
    imgIdxRef.current = imgIdx;
    viewerOpenRef.current = viewerOpen;
  }, [visible, step, imgIdx, viewerOpen]);

  const reduceMotion = useReducedMotion();
  const canTilt = canHover && !reduceMotion;

  /* ---- Inclinación 3D (solo con mouse) ---- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });

  /* ---- Navegación ---- */
  const goTo = useCallback((target: number): boolean => {
    if (lockedRef.current) return false;
    if (target < 0 || target > listRef.current.length) return false;
    if (target === stepRef.current) return false;

    lockedRef.current = true;
    const dir = target > stepRef.current ? 1 : -1;
    stepRef.current = target;
    setGallery([0, 1]);
    setPage([target, dir]);
    window.setTimeout(() => {
      lockedRef.current = false;
    }, LOCK_MS);
    return true;
  }, []);

  const changeImage = useCallback((delta: number) => {
    const p = listRef.current[stepRef.current];
    if (!p || p.images.length < 2) return;
    setGallery(([i]) => [(i + delta + p.images.length) % p.images.length, delta > 0 ? 1 : -1]);
  }, []);

  /* Abre el visor desde la tarjeta (solo si el carrusel no está en transición) */
  const openViewer = useCallback((el: HTMLElement) => {
    if (lockedRef.current || viewerOpenRef.current) return;
    const p = listRef.current[stepRef.current];
    if (!p) return;
    const r = el.getBoundingClientRect();
    viewerOpenRef.current = true;
    setViewer({
      seq: ++seqRef.current,
      rect: { x: r.left, y: r.top, w: r.width, h: r.height },
      name: p.name,
      images: p.images,
      startIndex: imgIdxRef.current,
    });
    setViewerOpen(true);
  }, []);

  const closeViewer = useCallback((index: number) => {
    viewerOpenRef.current = false;
    setViewerOpen(false);
    setGallery([index, 1]); // el carrusel queda en la última foto vista
  }, []);

  /* ---- Bloqueo de scroll y captura de gestos ---- */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      hOverflow: html.style.overflow,
      bOverflow: body.style.overflow,
      hOverscroll: html.style.overscrollBehavior,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    const inNoSnap = (t: EventTarget | null) =>
      !!(t as HTMLElement | null)?.closest?.("[data-no-snap]");

    const v = { acc: 0, last: 0, lastAbs: 0, lastSign: 0, needIdle: false };
    const h = { acc: 0, last: 0, done: false };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (inNoSnap(e.target)) return; // panel de filtros / visor
      e.preventDefault();
      if (viewerOpenRef.current) return;

      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= window.innerHeight;
      const now = performance.now();

      if (Math.abs(e.deltaX) > Math.abs(dy)) {
        if (now - h.last > WHEEL_IDLE_MS) {
          h.acc = 0;
          h.done = false;
        }
        h.last = now;
        if (h.done) return;
        h.acc += e.deltaX;
        if (Math.abs(h.acc) >= WHEEL_X_THRESHOLD) {
          changeImage(h.acc > 0 ? 1 : -1);
          h.acc = 0;
          h.done = true;
        }
        return;
      }

      if (dy === 0) return;
      const abs = Math.abs(dy);
      const sign = Math.sign(dy);

      if (now - v.last > WHEEL_IDLE_MS) {
        v.acc = 0;
        v.needIdle = false;
      } else if (
        !lockedRef.current &&
        (sign !== v.lastSign || (abs > v.lastAbs * 1.6 && abs >= 30))
      ) {
        v.acc = 0;
        v.needIdle = false;
      }
      v.last = now;
      v.lastAbs = abs;
      v.lastSign = sign;

      if (lockedRef.current || v.needIdle) return;

      v.acc += dy;
      if (Math.abs(v.acc) >= WHEEL_THRESHOLD) {
        const dir = v.acc > 0 ? 1 : -1;
        v.acc = 0;
        v.needIdle = goTo(stepRef.current + dir);
      }
    };

    const t = { sx: 0, sy: 0, axis: null as "x" | "y" | null, active: false };

    const onTouchStart = (e: TouchEvent) => {
      t.active = e.touches.length === 1 && !inNoSnap(e.target) && !viewerOpenRef.current;
      t.axis = null;
      t.sx = e.touches[0].clientX;
      t.sy = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (inNoSnap(e.target)) return;
      e.preventDefault();
      if (!t.active || t.axis) return;
      const dx = e.touches[0].clientX - t.sx;
      const dy = e.touches[0].clientY - t.sy;
      if (Math.max(Math.abs(dx), Math.abs(dy)) > 10) {
        t.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!t.active || viewerOpenRef.current) return;
      t.active = false;
      const dx = t.sx - e.changedTouches[0].clientX;
      const dy = t.sy - e.changedTouches[0].clientY;
      if (t.axis === "x" && Math.abs(dx) > SWIPE_X_PX) changeImage(dx > 0 ? 1 : -1);
      else if (t.axis === "y" && Math.abs(dy) > SWIPE_PX) goTo(stepRef.current + (dy > 0 ? 1 : -1));
    };
    const onTouchCancel = () => {
      t.active = false;
    };

    // Teclado y control remoto de TV (las flechas llegan como ArrowUp/Down/Left/Right)
    const onKey = (e: KeyboardEvent) => {
      if (viewerOpenRef.current) return; // el visor maneja sus propias teclas
      if (e.key === "Escape") {
        return;
      }
      const tag = (e.target as HTMLElement | null)?.tagName ?? "";
      if (["INPUT", "SELECT", "TEXTAREA"].includes(tag)) return;
      if (e.key === " " && ["BUTTON", "A"].includes(tag)) return;

      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(stepRef.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(stepRef.current - 1);
      } else if (e.key === "ArrowRight") changeImage(1);
      else if (e.key === "ArrowLeft") changeImage(-1);
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      html.style.overflow = prev.hOverflow;
      body.style.overflow = prev.bOverflow;
      html.style.overscrollBehavior = prev.hOverscroll;
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("keydown", onKey);
    };
  }, [goTo, changeImage]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  /* ---- Qué se muestra ---- */
  const isEmpty = visible.length === 0;
  const isFooterStep = !isEmpty && step >= visible.length;
  const property = !isEmpty && !isFooterStep ? visible[step] : null;

  const cx = useMemo<Cx>(
    () => ({ dir: direction, dx: sbox.w * 0.36, dy: sbox.h * 0.62, u }),
    [direction, sbox.w, sbox.h, u]
  );
  const imgVariants = reduceMotion ? reducedVariants : imageVariants;
  const txt = reduceMotion ? reducedVariants : textVariants;
  const endVariants = reduceMotion ? reducedVariants : endStepVariants;

  const progress = `${((Math.min(step, Math.max(visible.length - 1, 0)) + 1) / Math.max(visible.length, 1)) * 100}%`;

  /* Botones de la propiedad: Ver detalle (principal), Agendar visita, ubicación */
  const renderActions = (p: Property) => (
    <div className="ps-actions">
      {onViewDetail ? (
        <button className="ps-btn ps-btn-primary" onClick={() => onViewDetail(p)}>
          Ver más
        </button>
      ) : (
        <a className="ps-btn ps-btn-primary" href={`/propiedades/${p.id}`}>
          Ver más
        </a>
      )}
      <a className="ps-btn ps-btn-ghost" href="/contacto">
        Contactar
      </a>
      {p.mapUrl && (
        <a
          className={`ps-btn ps-btn-ghost ${split ? "" : "ps-btn-icon"}`}
          href={p.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir en Google Maps"
          aria-label={`Ver ubicación de ${p.name} en Google Maps`}
        >
          <MapPin />
          {split && "Ver ubicación"}
        </a>
      )}
    </div>
  );

  const renderPrice = (p: Property) => (
    <span className="ps-price ps-serif">
      {formatPrice(p.price)}
      <small>COP</small>
    </span>
  );

  return (
    <>
      <Header showHero={false} solid />
      <main
      ref={mainRef}
      className="ps fixed inset-x-0 bottom-0 z-10 touch-none overflow-hidden overscroll-none bg-[#F5F3EE] text-[#0F2A43]"
      data-layout={split ? "split" : "stacked"}
      data-density={tight ? "tight" : "normal"}
      style={
        {
          top: headerHeight,
          "--u": `${u}px`,
          fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
        } as CSSProperties
      }
    >

      {/* Barra superior: filtros + contador */}
      <div className={`ps-top${isFooterStep ? " ps-top-footer" : ""}`}>
        <PropertyFilterBar
          filters={filters}
          setFilters={setFilters}
          options={options}
          resultCount={visible.length}
          hidden={isFooterStep}
          closeSignal={step}
          trailing={
            !isEmpty ? (
              <span className="ps-count" style={{ opacity: isFooterStep ? 0 : 1 }}>
                {String(Math.min(step + 1, visible.length)).padStart(2, "0")} /{" "}
                {String(visible.length).padStart(2, "0")}
              </span>
            ) : undefined
          }
        />
      </div>

      {/* Escena con perspectiva proporcional al área */}
      <div
        ref={sceneRef}
        className="ps-scene"
        style={{ perspective: Math.max(sbox.w, sbox.h) * 1.3 }}
      >
        {ready && (
          <AnimatePresence mode="popLayout" custom={cx}>
            {property ? (
              <motion.article
                key={property.id}
                custom={cx}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="ps-article"
              >
                {/* Información: en 2 columnas va todo aquí; en móvil solo precio, resumen y botones */}
                <div className="ps-info">
                  {split && (
                    <>
                      <motion.span custom={cx} variants={txt} className="ps-badge">
                        {property.status}
                      </motion.span>
                      <motion.h2 custom={cx} variants={txt} className="ps-title ps-serif">
                        {property.name}
                      </motion.h2>
                      <motion.p custom={cx} variants={txt} className="ps-zone">
                        {property.zone}
                        {property.city ? `, ${property.city}` : ""}
                      </motion.p>
                      {property.highlight && (
                        <motion.p custom={cx} variants={txt} className="ps-highlight">
                          {property.highlight}
                        </motion.p>
                      )}
                    </>
                  )}

                  {!split && (
                    <motion.div custom={cx} variants={txt}>
                      {renderPrice(property)}
                    </motion.div>
                  )}

                  <motion.p custom={cx} variants={txt} className="ps-desc">
                    {property.description}
                  </motion.p>

                  {split && (
                    <motion.div custom={cx} variants={txt}>
                      <Stats p={property} />
                    </motion.div>
                  )}

                  {split ? (
                    <motion.div custom={cx} variants={txt} className="ps-buy">
                      {renderPrice(property)}
                      {renderActions(property)}
                    </motion.div>
                  ) : (
                    <motion.div custom={cx} variants={txt}>
                      {renderActions(property)}
                    </motion.div>
                  )}
                </div>

                {/* Galería: tarjeta 3D (solo imagen) + capa plana de controles */}
                <div
                  className="ps-media"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.div
                    custom={cx}
                    variants={imgVariants}
                    className="ps-card-box"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <GalleryCard
                      name={property.name}
                      images={property.images}
                      index={imgIdx}
                      dir={imgDir}
                      tiltX={tiltX}
                      tiltY={tiltY}
                      tilt={canTilt}
                      overlay={
                        !split ? (
                          <div className="ps-overlay">
                            <span className="ps-badge">{property.status}</span>
                            <h2 className="ps-title ps-serif">{property.name}</h2>
                            <p className="ps-zone">
                              {property.zone}
                              {property.city ? `, ${property.city}` : ""}
                            </p>
                            {property.highlight && (
                              <p className="ps-highlight">{property.highlight}</p>
                            )}
                            <Stats p={property} />
                          </div>
                        ) : undefined
                      }
                    />
                  </motion.div>

                  <motion.div custom={cx} variants={txt} className="ps-controls">
                    <div>
                      {/* Toda la tarjeta abre el visor ampliado */}
                      <button
                        className="ps-open"
                        onClick={(e) => openViewer(e.currentTarget)}
                        aria-label={`Ampliar fotos de ${property.name}`}
                      />
                      <span className="ps-expand-ic" aria-hidden>
                        <Maximize2 />
                      </span>

                      {property.images.length > 1 && (
                        <>
                          <button
                            className="ps-nav"
                            data-side="prev"
                            onClick={() => changeImage(-1)}
                            aria-label="Foto anterior"
                          >
                            <ChevronLeft />
                          </button>
                          <button
                            className="ps-nav"
                            data-side="next"
                            onClick={() => changeImage(1)}
                            aria-label="Foto siguiente"
                          >
                            <ChevronRight />
                          </button>
                          <span className="ps-photo-count">
                            {Math.min(imgIdx, property.images.length - 1) + 1} /{" "}
                            {property.images.length}
                          </span>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            ) : isEmpty ? (
              <motion.section
                key="empty-step"
                custom={cx}
                variants={endVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="ps-end"
              >
                <div className="ps-end-body">
                  <SearchX className="ps-empty-icon" aria-hidden="true" />
                  <h2 className="ps-serif">Ningún proyecto coincide con tus filtros</h2>
                  <p>En este momento no contamos con una propiedad disponible con esas características.</p>
                  <div className="ps-actions">
                    <button
                      className="ps-btn ps-btn-primary"
                      onClick={() => setFilters(DEFAULT_FILTERS)}
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              </motion.section>
            ) : (
              <motion.section
                key="footer-step"
                custom={cx}
                variants={endVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="ps-end"
              >
                <div className="ps-end-footer">
                  <div className="ps-end-intro">
                    <ArrowUp className="ps-end-intro-icon" aria-hidden="true" />
                    <div className="ps-end-intro-copy">
                      <p className="ps-end-intro-kicker">¿Buscas tu próximo espacio?</p>
                      <p className="ps-end-intro-text">Desliza hacia arriba para volver a ver nuestros proyectos.</p>
                      <button type="button" className="ps-end-back" onClick={() => goTo(0)}>
                        <ArrowUp aria-hidden="true" />
                        Ver propiedades
                      </button>
                    </div>
                  </div>
                  <div data-no-snap className="ps-end-footer-content">{footer ?? <Footer />}</div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Indicador: puntos (2 columnas, pocos proyectos) o barra de progreso */}
      {visible.length > 1 &&
        (split && visible.length <= MAX_DOTS ? (
          <nav className="ps-dots" aria-label="Proyectos">
            {visible.map((p, i) => (
              <button
                key={p.id}
                className="ps-dot"
                onClick={() => goTo(i)}
                aria-label={`Ver ${p.name}`}
                aria-current={i === step}
              >
                <i />
              </button>
            ))}
          </nav>
        ) : (
          <div className="ps-prog" aria-hidden>
            <i style={{ "--p": progress } as CSSProperties} />
          </div>
        ))}

      <p className="ps-hint" style={{ opacity: step === 0 && !isEmpty ? 1 : 0 }}>
        {isCoarse ? "Desliza" : "Desplázate"} para ver el siguiente proyecto
      </p>

      {/* Visor ampliado */}
      {viewer && (
        <PhotoViewer
          key={viewer.seq}
          open={viewerOpen}
          name={viewer.name}
          images={viewer.images}
          startIndex={viewer.startIndex}
          rect={viewer.rect}
          onRequestClose={closeViewer}
          onClosed={() => setViewer(null)}
        />
      )}
      </main>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Habitaciones, baños y área                                          */
/* ------------------------------------------------------------------ */

function Stats({ p }: { p: Property }) {
  return (
    <dl className="ps-stats">
      <div>
        <BedDouble />
        <dt className="sr-only">Habitaciones</dt>
        <dd>{p.beds} hab.</dd>
      </div>
      <div>
        <Bath />
        <dt className="sr-only">Baños</dt>
        <dd>{p.baths} baños</dd>
      </div>
      <div>
        <Ruler />
        <dt className="sr-only">Área</dt>
        <dd>{p.area} m²</dd>
      </div>
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Tarjeta de galería: solo se renderiza (y descarga) la foto visible  */
/* ------------------------------------------------------------------ */

interface GalleryCardProps {
  name: string;
  images: ImageSource[];
  index: number;
  dir: number;
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
  tilt: boolean;
  /** Información que va DENTRO de la imagen (móvil). */
  overlay?: ReactNode;
}

function GalleryCard({ name, images, index, dir, tiltX, tiltY, tilt, overlay }: GalleryCardProps) {
  const i = Math.min(index, images.length - 1);
  const src = toSrc(images[i]);

  return (
    <motion.div className="ps-card" style={tilt ? { rotateX: tiltX, rotateY: tiltY } : undefined}>
      <AnimatePresence initial={false} custom={dir}>
        <motion.img
          key={src}
          src={src}
          alt={`${name}, foto ${i + 1} de ${images.length}`}
          custom={dir}
          variants={galleryVariants}
          initial="galleryIn"
          animate="galleryShow"
          exit="galleryOut"
          decoding="async"
          draggable={false}
        />
      </AnimatePresence>
      {overlay ?? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12201B]/60 via-transparent to-transparent" />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Visor ampliado                                                      */
/* <dialog> modal: fondo oscuro, Esc y foco gratis, y va en la capa    */
/* superior del navegador (por encima de tu header/footer y sin sufrir */
/* las transformaciones 3D del carrusel).                              */
/* ------------------------------------------------------------------ */

interface PhotoViewerProps {
  open: boolean;
  name: string;
  images: ImageSource[];
  startIndex: number;
  rect: Rect;
  onRequestClose: (index: number) => void;
  onClosed: () => void;
}

function PhotoViewer({
  open,
  name,
  images,
  startIndex,
  rect,
  onRequestClose,
  onClosed,
}: PhotoViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const axisRef = useRef<"x" | "y" | null>(null);
  const n = images.length;
  const [[idx, dir], setView] = useState<[number, number]>([Math.min(startIndex, n - 1), 1]);

  // Abre el <dialog> (con respaldo para navegadores sin showModal, p. ej. TV antiguas)
  useIsoLayoutEffect(() => {
    const d = dialogRef.current;
    if (!open || !d || d.open) return;
    if (typeof d.showModal === "function") d.showModal();
    else d.setAttribute("open", "");
  }, [open]);

  const step = useCallback(
    (delta: number) => {
      if (n < 2) return;
      setView(([i]) => [(i + delta + n) % n, delta > 0 ? 1 : -1]);
    },
    [n]
  );

  // La foto "crece" desde la posición y tamaño de la tarjeta
  const origin = useMemo(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: rect.x + rect.w / 2 - vw / 2,
      y: rect.y + rect.h / 2 - vh / 2,
      scale: clamp(rect.w / vw, 0.25, 0.95),
      opacity: 0,
    };
  }, [rect]);

  if (typeof document === "undefined") return null;

  const src = toSrc(images[idx] ?? images[0]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="ps-viewer"
      data-no-snap
      aria-label={`Fotos de ${name}`}
      onCancel={(e) => {
        e.preventDefault(); // Esc: que cierre con animación
        onRequestClose(idx);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        else if (e.key === "ArrowLeft") step(-1);
      }}
    >
      <AnimatePresence
        onExitComplete={() => {
          const d = dialogRef.current;
          if (d?.open) {
            if (typeof d.close === "function") d.close();
            else d.removeAttribute("open");
          }
          onClosed();
        }}
      >
        {open && (
          // El shell "espera" a que terminen las animaciones de salida de sus hijos
          <motion.div
            key="shell"
            className="ps-v-shell"
            exit={{ opacity: 1, transition: { duration: 0.45 } }}
          >
            <motion.div
              className="ps-v-back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => onRequestClose(idx)}
            />

            {/* Arrastrar de lado = cambiar de foto · arrastrar hacia abajo/arriba = cerrar */}
            <motion.div
              className="ps-v-photo"
              drag
              dragDirectionLock
              dragElastic={0.3}
              dragSnapToOrigin
              onDirectionLock={(a) => {
                axisRef.current = a;
              }}
              onDragEnd={(_, info) => {
                const axis = axisRef.current;
                axisRef.current = null;
                if (axis === "y") {
                  if (Math.abs(info.offset.y) > 110 || Math.abs(info.velocity.y) > 700) {
                    onRequestClose(idx);
                  }
                } else if (axis === "x" && n > 1) {
                  if (info.offset.x < -60 || info.velocity.x < -500) step(1);
                  else if (info.offset.x > 60 || info.velocity.x > 500) step(-1);
                }
              }}
              initial={origin}
              animate={{ x: 0, y: 0, scale: 1, opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } }}
              exit={{ ...origin, transition: { duration: 0.4, ease: EASE_IN_OUT } }}
            >
              <AnimatePresence initial={false} custom={dir}>
                <motion.img
                  key={src}
                  src={src}
                  alt={`${name}, foto ${idx + 1} de ${n}`}
                  custom={dir}
                  variants={galleryVariants}
                  initial="galleryIn"
                  animate="galleryShow"
                  exit="galleryOut"
                  decoding="async"
                  draggable={false}
                />
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="ps-v-chrome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ps-v-bar">
                <span>
                  {idx + 1} / {n}
                </span>
                <button
                  className="ps-v-btn"
                  onClick={() => onRequestClose(idx)}
                  aria-label="Cerrar visor"
                >
                  <X />
                </button>
              </div>

              {n > 1 && (
                <>
                  <button
                    className="ps-v-btn ps-v-arrow"
                    data-side="prev"
                    onClick={() => step(-1)}
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    className="ps-v-btn ps-v-arrow"
                    data-side="next"
                    onClick={() => step(1)}
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>,
    document.body
  );
}

/* ------------------------------------------------------------------ */
