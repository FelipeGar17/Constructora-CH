"use client";

import { Check, RotateCcw } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_FILTERS, countActiveFilters, type FilterOptions, type Filters } from "./propertyFilters";

type FilterFieldId = "beds" | "baths" | "price" | "area" | "zone" | "status";

type PriceRange = {
  label: string;
  short: string;
  min: number | null;
  max: number | null;
};

type AreaStep = {
  label: string;
  short: string;
  min: number | null;
};

type Option = {
  key: string;
  label: string;
  selected: boolean;
  apply: Partial<Filters>;
};

type Field = {
  id: FilterFieldId;
  label: string;
  value: string;
  options: Option[];
};

const PRICE_RANGES: PriceRange[] = [
  { label: "Cualquiera", short: "", min: null, max: null },
  { label: "Hasta $400 M", short: "≤ 400 M", min: null, max: 400_000_000 },
  { label: "$400 M a $700 M", short: "400–700 M", min: 400_000_000, max: 700_000_000 },
  { label: "$700 M a $1.200 M", short: "700–1.200 M", min: 700_000_000, max: 1_200_000_000 },
  { label: "Más de $1.200 M", short: "> 1.200 M", min: 1_200_000_000, max: null },
];

const AREA_STEPS: AreaStep[] = [
  { label: "Cualquiera", short: "", min: null },
  { label: "Desde 60 m²", short: "60+ m²", min: 60 },
  { label: "Desde 100 m²", short: "100+ m²", min: 100 },
  { label: "Desde 200 m²", short: "200+ m²", min: 200 },
  { label: "Desde 300 m²", short: "300+ m²", min: 300 },
];

const FIELD_IDS: FilterFieldId[] = ["beds", "baths", "price", "area", "zone", "status"];

function buildFields(filters: Filters, options: FilterOptions): Field[] {
  const fields: Field[] = [];
  const minimum = (id: "beds" | "baths", label: string, key: "minBeds" | "minBaths", max: number) => {
    const current = filters[key];
    fields.push({
      id,
      label,
      value: current == null ? "" : `${current}+`,
      options: [
        { key: "all", label: id === "beds" ? "Todas" : "Todos", selected: current == null, apply: { [key]: null } },
        ...Array.from({ length: Math.min(Math.max(max, 1), 6) }, (_, index) => index + 1).map((value) => ({
          key: String(value),
          label: `${value}+`,
          selected: current === value,
          apply: { [key]: value } as Partial<Filters>,
        })),
      ],
    });
  };

  minimum("beds", "Habitaciones", "minBeds", options.maxBeds);
  minimum("baths", "Baños", "minBaths", options.maxBaths);

  const price = PRICE_RANGES.find((range) => range.min === filters.minPrice && range.max === filters.maxPrice);
  fields.push({
    id: "price",
    label: "Precio",
    value: price?.short ?? (filters.minPrice != null || filters.maxPrice != null ? "Personalizado" : ""),
    options: PRICE_RANGES.map((range, index) => ({
      key: String(index),
      label: range.label,
      selected: range === price,
      apply: { minPrice: range.min, maxPrice: range.max },
    })),
  });

  const area = AREA_STEPS.find((step) => step.min === filters.minArea);
  fields.push({
    id: "area",
    label: "Área",
    value: area?.short ?? (filters.minArea != null ? `${filters.minArea}+ m²` : ""),
    options: AREA_STEPS.map((step, index) => ({
      key: String(index),
      label: step.label,
      selected: step === area,
      apply: { minArea: step.min },
    })),
  });

  if (options.zones.length) {
    fields.push({
      id: "zone",
      label: "Ubicación",
      value: filters.zones.length === 1 ? filters.zones[0] : filters.zones.length ? `${filters.zones.length} zonas` : "",
      options: [
        { key: "all", label: "Todas", selected: !filters.zones.length, apply: { zones: [] } },
        ...options.zones.map((zone) => ({
          key: zone,
          label: zone,
          selected: filters.zones.length === 1 && filters.zones[0] === zone,
          apply: { zones: [zone] },
        })),
      ],
    });
  }

  if (options.statuses.length) {
    fields.push({
      id: "status",
      label: "Estado",
      value: filters.statuses.length === 1 ? filters.statuses[0] : filters.statuses.length ? `${filters.statuses.length} estados` : "",
      options: [
        { key: "all", label: "Todos", selected: !filters.statuses.length, apply: { statuses: [] } },
        ...options.statuses.map((status) => ({
          key: status,
          label: status,
          selected: filters.statuses.length === 1 && filters.statuses[0] === status,
          apply: { statuses: [status] },
        })),
      ],
    });
  }
  return fields;
}

type PropertyFilterBarProps = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  options: FilterOptions;
  resultCount: number;
  hidden?: boolean;
  closeSignal?: unknown;
  trailing?: ReactNode;
};

export default function PropertyFilterBar({
  filters,
  setFilters,
  options,
  resultCount,
  hidden = false,
  closeSignal,
  trailing,
}: PropertyFilterBarProps) {
  const [open, setOpen] = useState<FilterFieldId | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Partial<Record<FilterFieldId, HTMLButtonElement | null>>>({});
  const fields = useMemo(() => buildFields(filters, options), [filters, options]);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    // El carrusel cambia esta señal al navegar; cualquier menú abierto debe desaparecer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    close();
  }, [closeSignal, hidden, close]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node) && !panelRef.current?.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useLayoutEffect(() => {
    if (!open || !panelRef.current) return;
    const trigger = triggerRefs.current[open];
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    panelRef.current.style.minWidth = `${Math.max(rect.width, 176)}px`;
    panelRef.current.style.top = `${rect.bottom}px`;
    panelRef.current.style.left = `${Math.min(Math.max(rect.left, 8), window.innerWidth - panelRef.current.offsetWidth - 8)}px`;
  }, [open]);

  return (
    <div ref={rootRef} className="ps-filter-bar" data-hidden={hidden} data-no-snap>
      <div className="ps-filter-scroll" role="toolbar" aria-label="Filtros">
        {fields.map((field) => {
          const isOpen = open === field.id;
          return (
            <div key={field.id} className="ps-filter-item" data-open={isOpen}>
              <button
                ref={(element) => {
                  triggerRefs.current[field.id] = element;
                }}
                type="button"
                className="ps-filter-trigger"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : field.id)}
              >
                <span>{field.label}</span>
                {field.value && <span className="ps-filter-value">{field.value}</span>}
              </button>
              {isOpen && (
                <div ref={panelRef} className="ps-filter-panel" data-no-snap>
                  <div className="ps-filter-panel-inner" role="menu" aria-label={field.label}>
                    {field.options.map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        className="ps-filter-option"
                        role="menuitemradio"
                        aria-checked={option.selected}
                        onClick={() => {
                          setFilters({ ...filters, ...option.apply });
                          close();
                        }}
                      >
                        {option.label}
                        {option.selected && <Check aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="ps-filter-clear"
          disabled={countActiveFilters(filters) === 0}
          aria-label={`Limpiar filtros (${resultCount} resultados)`}
          onClick={() => {
            setFilters(DEFAULT_FILTERS);
            close();
          }}
        >
          <RotateCcw aria-hidden="true" />
        </button>
      </div>
      {trailing && <div className="ps-filter-trailing">{trailing}</div>}
    </div>
  );
}
