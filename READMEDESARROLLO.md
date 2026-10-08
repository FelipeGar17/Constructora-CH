# README DE DESARROLLO — Portafolio Finca Raíz V2

> **Estado actualizado: 2026-10-06.** El sitio está desplegado en Cloudflare Workers
> mediante OpenNext. El Worker activo es `constructora-ch` y su URL temporal es
> `https://constructora-ch.fevora.workers.dev`. Esta URL puede indexarse en buscadores,
> aunque antes de SEO definitivo se debe reemplazar `siteUrl` por la URL pública elegida.

> **Esta es la guía operativa del proyecto**: dónde vive cada cosa, qué texto se edita en
> qué archivo y qué falta hacer. Acá está **la única lista de pendientes** del repositorio.
>
> Lo ya resuelto no se lista. Para el historial de qué se hizo y por qué, ver `Desarrollo.md`.

Otros documentos y para qué sirve cada uno:

| Documento | Rol |
| --- | --- |
| **`READMEDESARROLLO.md`** (este) | Guía operativa + lista de pendientes. Punto de partida para modificar el sitio. |
| `Desarrollo.md` | Bitácora cronológica: qué se hizo, por qué y cómo se verificó. Sin lista de pendientes. |
| `PLAN_INICIO.md` | Documento histórico de arranque. **Desactualizado**, no usar como referencia del estado actual. |
| `README.md` | Vacío (0 bytes). No usar. |

---

## 🚀 CÓMO CORRER EL PROYECTO

```bash
npm install        # solo la primera vez
npm run dev        # entorno local → http://localhost:3000
npm run build      # compilación de producción (verifica que todo funcione)
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

`next lint` **ya no existe** en esta versión de Next, por eso `lint` llama a `eslint` directo.

---

## 🗂️ ESTRUCTURA GENERAL (dónde vive cada cosa)

```
app/                                  → páginas (rutas) + globales
  layout.tsx          → <html>/<body>, fuentes, SEO base, favicon e iconos del sitio
  globals.css         → colores, tipografía, contenedor (variables)
  page.tsx            → HOME
  not-found.tsx       → 404 (con Header y Footer)
  robots.ts           → /robots.txt (se genera solo, no se edita a mano)
  sitemap.ts          → /sitemap.xml (lista de rutas para buscadores)
  propiedades/        → página "Propiedades" (en venta/arriendo/planos)
  propriedades/[id]/  → ficha de UNA propiedad (solo las que tienen ficha)
  vendidas/           → página "Vendidas"
  contacto/           → página "Contacto"
  politica-privacidad | tratamiento-datos | terminos-condiciones | cookies
                      → páginas legales
eslint.config.mjs     → reglas de lint (extiende eslint-config-next)
src/
  components/
    Header/           → navegación superior + hero de cada página
    Footer/           → pie de página (enlaces, teléfono, WhatsApp, correo)
    Footer/Legalfooter → enlaces cruzados entre las 4 páginas legales
    BrandName/         → la marca "CH + Constructora Hernandez" (ver más abajo)
    PropertyCard/     → tarjeta interactive (home y propiedades)
    PropertyListing/  → listado en grid (propiedades)
    RecentProperties/ → carrusel "Mejores ofertas" del home
    SoldCard/         → tarjeta grande de vendidas (foto + info + testimonio)
    SoldListing/      → lista de tarjetas de vendidas (una por fila)
  data/
    properties.ts        → EL catálogo único de todas las propiedades
    propertySelectors.ts → filtros por vista (recientes, disponibles, vendidas…)
  lib/
    site.ts            → nombre, dominio y descripción del sitio (fuente única del SEO)
  types/
    property.ts          → campos que puede tener una propiedad
public/images/
  hero/               → foto del hero (autoalojada, sin terceros)
  properties/         → fotos del catálogo
```

---

## 🎨 COLORES (cambiar aquí)

Todos los colores del sitio están en `app/globals.css` como variables. Cambiarlos ahí
los actualiza en TODO el sitio automáticamente:

```
--color-primary:   #0f2a43  (azul marino: fondos oscuros, títulos)
--color-secondary: #3d5a73  (azul acero: subtítulos, iconos)
--color-muted:     #8c97a0  (gris piedra: texto secundario, bordes)
--color-ivory:     #f5f3ee  (blanco hueso: fondo general)
--color-gold:      #b08d57  (dorado: botones, acentos)
--color-white:     #ffffff
```

---

## ✍️ DÓNDE SE EDITA CADA TEXTO

| Cosa que quieres cambiar | Archivo |
| --- | --- |
| Título y descripción de la HOME (y de todas las páginas por defecto) | `app/layout.tsx` |
| Título y descripción de cada página | el `export const metadata` de su `page.tsx` |
| Nombre, dominio y descripción del sitio | `src/lib/site.ts` |
| Rutas que se mandan a Google | `app/sitemap.ts` |
| Hero de la home (frase grande, subtítulo, botón) | `src/components/Header/Header.tsx` — se apaga con `<Header showHero={false} />` |
| Foto de fondo del hero | la URL está en `src/components/Header/Header.module.css`; actualmente usa `public/images/Logotipacion/Logo.jpeg` con `contain` para mostrar el logo completo |
| Menú de navegación (Inicio, Propiedades, Vendidas, Contacto y logo) | `src/components/Header/Header.tsx` — `solid` lo pone opaco cuando no hay foto detrás |
| Logo circular del menú | `public/images/Logotipacion/Logo.jpeg`, usado por `Header.tsx` y estilizado en `Header.module.css` |
| Favicon e icono de dispositivos | `app/icon.jpeg` y `metadata.icons` en `app/layout.tsx` |
| Beneficios bajo el hero (Arquitectura moderna, etc.) | `app/page.tsx` |
| Texto "Habitar mejor" del home | `app/page.tsx` |
| Título y cifras de la sección azul (clientes, proyectos…) | `app/page.tsx` |
| Cierre editorial + enlace "Invierte en tu comodidad" | `app/page.tsx` |
| Título del carrusel "Mejores ofertas!" | `src/components/RecentProperties/RecentProperties.tsx` |
| Cabecera de `/propiedades` (eyebrow, título, descripción) | `app/propiedades/page.tsx` |
| Cabecera de `/vendidas` | `app/vendidas/page.tsx` |
| Teléfono, WhatsApp, correo y textos de `/contacto` | `app/contacto/page.tsx` |
| Enlaces, teléfono, WhatsApp, correo y copyright del pie | `src/components/Footer/Footer.tsx` |
| Política de privacidad | `app/politica-privacidad/page.tsx` |
| Tratamiento de datos | `app/tratamiento-datos/page.tsx` |
| Términos y condiciones | `app/terminos-condiciones/page.tsx` |
| Cookies | `app/cookies/page.tsx` |

### 🔠 LA MARCA DEL SITIO — "CH + Constructora Hernandez"

**Cambio del 2026-10-05.** El nombre anterior era "Constructora HG"; ya no aparece en ningún
archivo del proyecto (20 ocurrencias reemplazadas en 9 archivos). Ahora la marca se dibuja
siempre con el mismo componente:

**`src/components/BrandName/BrandName.tsx`** — monograma **"CH"** en dorado + **"Constructora
Hernandez"** en el color del contenedor. El nombre va en texto plano a propósito, para que
Google lo lea igual que siempre.

```tsx
<BrandName size="md" />   // "sm" en línea de texto · "md" eyebrow · "lg" para bloque grande
```

**Dónde se usa:**

| Lugar | Tamaño |
| --- | --- |
| Bloque de marca del pie | `md` |
| Copyright del pie | `sm` |
| Eyebrow de las 4 páginas legales | `md` |

**Lo que NO usa el componente** (porque son cadenas, no JSX) y por lo tanto llevan el nombre
completo escrito a mano: `src/lib/site.ts` (`siteName`, `siteDescription`), los `description` de
los `metadata` y las frases de los textos legales. **Si se cambia el nombre de la empresa hay que
cambiar esos dos lados**; el componente no los cubre.

**Para cambiar el aspecto de la marca:** todo está en `src/components/BrandName/BrandName.module.css`
(el monograma dorado y con borde en `.mark`, el espaciado en `.brand`). No hay logo en imagen: la
"CH" es texto con CSS, así que es nítida en cualquier pantalla y no hay archivo que actualizar.

---

## 🏠 LAS PROPIEDADES (lo más importante)

**Todo el catálogo vive en `src/data/properties.ts`.** No existen catálogos separados:
vender/recientes/disponibles se controlan con banderas en cada registro.

**Los filtros por vista están en `src/data/propertySelectors.ts`:**
- `getSoldProperties()` → estado `"Vendida"` (página /vendidas)
- `getAvailableProperties()` → disponibles en venta/arriendo/planos (página /propiedades)
- `getHomeProperties()` → bandera `showOnHome`
- `getRecentProperties()` → bandera `isRecent` (carrusel del home)
- `getRentedProperties()` → estado `"Arrendada"`
- `getPropertyById(id)` → un registro por `id` (lo usa la ruta de detalle)
- `DETAIL_STATUSES` → los estados que **sí** tienen ficha en `/propiedades/[id]`
- `getDetailProperties()` → los registros de esos estados
- `getPropertyHref(property)` → **destino del botón "Ver propiedad"** (ver abajo)

### Campos de una propiedad (`src/types/property.ts`)

| Campo | Qué hace | Obligatorio |
| --- | --- | --- |
| `id` | Identificador único (no repetir) | ✅ |
| `title` | Nombre mostrado | ✅ |
| `location` | Zona general (no dirección exacta) | ✅ |
| `price` | Precio (string, ej. `"$125.000.000"`) | — |
| `bedrooms` / `bathrooms` / `area` | Habitaciones, baños y área | — |
| `status` | `"Vendida" \| "Disponible en venta" \| "Disponible en arriendo" \| "Arrendada" \| "Disponible en planos" \| "En obra"` | ✅ |
| `image` | Foto principal (portada) | ✅ |
| `highlight` | Frase corta de acento (ej. "Estrato 3") | — |
| `description` | Descripción corta | ✅ |
| `propertyType` | `"apartamento" \| "casa" \| "proyecto"` | — |
| `privacyMode` | `"publico"` o `"reservado"` (afecta lo que se muestra) | — |
| `isRecent` | `true` → aparece en el carrusel del home | — |
| `recentLabel` | Badge en la tarjeta del home (ej. "Vendido") | — |
| `gallery` | Lista de fotos del carrusel de vendidas (solo se carga la visible) | — |
| `testimonial` | Comentario del propietario (ver abajo) | — |
| `showOnSold` / `showOnHome` | Banderas de visibilidad por vista | — |
| `priceValue` | Precio como número, solo para filtrar y ordenar | — |
| `mapUrl` | Enlace opcional a la ubicación en Google Maps | — |
| `municipality` / `barrio` / `address` | **Pendiente de crear.** Zona estructurada para el filtro. La dirección exacta solo se publica en disponibles | — |

> ⚠️ `showOnProperties` está declarado en el tipo pero **ningún selector lo usa** y
> ningún registro lo trae. **Decisión del 2026-10-04: no se conectó a ningún filtro**, porque
> respetarlo no cambia nada hoy y sí puede esconder una propiedad sin que se note. Queda como
> campo reservado. Si algún día se usa, revisa que no esconda propiedades por accidente.

### Testimonio (sección inferior de vendidas)

```ts
testimonial: {
  text: "Texto del comentario…",
  ownerName: "Familia García",        // SOLO si el propietario autoriza (privacy "libre")
  ownerDetail: "Compradora · Apto 5-01",
  privacy: "reservado" | "libre",     // "reservado" → sin nombre; "libre" → muestra nombre
  rating: 5,                          // calificación de estrellas (1 a 5)
}
```

- Sin testimonio → la tarjeta muestra un aviso "Confidencial…".
- Con `testimonial` → muestra estrellas, nota de autorización y (si es "libre") los datos del propietario.

---

## 📷 IMÁGENES

- La foto del hero está **autoalojada** en `public/images/hero/hero-portada.jpg` y se referencia
  desde `Header.module.css`. El proyecto **no pide ninguna imagen a terceros**: las 60 fotos del
  catálogo y el hero son locales. Mantenerlo así es lo que hace verdadera la política de cookies.
- Cada propiedad tiene su carpeta en `public/images/properties/<carpeta-del-inmueble>/`.
- Ejemplos reales: `Gael-28-501/`, `Briceño-501/`, `Camila-501/`.
- El campo `gallery` debe listar los archivos `.webp` en orden.
- El carrusel de vendidas **solo carga la foto que se está mostrando** (no sobrecarga la página).
- **No vuelvas a dejar archivos originales (`.zip`, `.psd`, `.jpg` pesados) dentro de `public/`:**
  Next los sirve como estáticos públicos en rutas adivinables y cualquiera que sepa el nombre los
  descarga. Las fotos van en `.webp` y ya convertidas.

### ¿Dónde se controla el tamaño de la foto en pantalla?

Todo en `src/components/SoldCard/SoldCard.module.css`:
- `.top` → `grid-template-columns: minmax(0, 480px) minmax(0, 1fr)` → el **`480px`** es el ancho de la imagen en desktop.
- `.media` → `aspect-ratio: 4 / 3` → la forma de la foto (prueba `1/1` o `16/9` para cambiar la proporción).

---

## ➕ AGREGAR / ❌ ELIMINAR / ✏️ MODIFICAR

**Agregar una propiedad vendida:**
1. Copia las fotos a `public/images/properties/<carpeta>/`.
2. Agrega un objeto nuevo en `src/data/properties.ts` con: `id` único, `title`, `location`, `status: "Vendida"`, `image` (portada), `gallery` (fotos en orden), y opcional `testimonial`.
3. Corre `npm run dev` y revisa `/vendidas`.

**Agregar una propiedad en venta:**
1. Mismo paso 1.
2. Nuevo objeto con `status: "Disponible en venta"` (o arriendo/planos/`"En obra"`).
3. Revisa `/propiedades`. Aparecerá automáticamente porque el filtro usa el `status`.

**Mostrar una propiedad en el carrusel del home:** agrega `isRecent: true` (y `recentLabel` con el texto del badge). **Para quitarla del carrusel** borra `isRecent` (o ponla `false`).

**Eliminar una propiedad:** borra su objeto completo en `src/data/properties.ts`. (La carpeta de imágenes ya no se usa, pero las fotos se suben igual a producción.)

**Cambiar el precio/título/descripción:** edita el campo en `src/data/properties.ts`.

**Cambiar los datos de contacto:** revisa `src/components/Footer/Footer.tsx` y `app/contacto/page.tsx`.

---

## ⚠️ REGLAS DE PRIVACIDAD (importantes para vendidas)

- Las propiedades vendidas **no usan dirección exacta ni Google Maps**.
- **No publicar** nombres de compradores ni datos de contacto **sin autorización**.
- Los testimonios solo pueden mostrar nombre/detalle del propietario si el registro tiene `privacy: "libre"`.

---

## ⏳ PENDIENTES

> **Única lista de pendientes del repositorio.** Si algo aparece anotado en otro `.md`,
> es contexto histórico, no una tarea vigente.

### 1. Plan de propiedades — para desplegar falta solo el sitemap (punto 8)

> Además de este plan hay dos pendientes sueltos que **no bloquean el despliegue**: el CSS de
> la ficha (**1.c**) y el botón "Contactar" (**1.d**).

**Alcance ya decidido el 2026-09-25.** No hay más qué preguntar:

- La ficha de una propiedad es una **página dedicada**, no una vista emergente. Google solo
  indexa URLs, un modal no se puede compartir por WhatsApp y para construirlo habría que
  mandar al navegador los datos y las fotos de todo el catálogo.
- **Una sola ruta dinámica** `app/propiedades/[id]/page.tsx` atiende las propiedades con ficha:
  una URL por `id`, no un archivo por propiedad.
- **Esa ruta solo sirve las que tienen ficha** (`DETAIL_STATUSES`: `"En obra"`,
  `"Disponible en venta"`, `"Disponible en planos"`). Una vendida da 404 a propósito: las
  vendidas se ven en `/vendidas` y **no** se publica una URL por cada una, porque el
  proyecto tiene reglas de privacidad para esas (sin dirección exacta, sin mapa, y sin
  exponer testimonios en una página indexable).
- **El botón "Ver propiedad" enruta según el estado** (decisión del 2026-10-05, ver
  `getPropertyHref`). Este punto **cambió**: antes decía que todos los botones iban siempre
  a la ficha, y las vendidas no tienen ficha.
- `/propiedades` debe ser un **catálogo con filtro completo**, no una lista estática.

### 🔀 Cómo enruta "Ver propiedad" (decisión del 2026-10-05)

El carrusel "Mejores ofertas" del home mezcla **dos sitios distintos** a propósito, así que un
enlace fijo no serviría. `getPropertyHref(property)` en `src/data/propertySelectors.ts` es el
único lugar que decide:

| Estado del registro | Destino | Ejemplo |
| --- | --- | --- |
| `"En obra"`, `"Disponible en venta"`, `"Disponible en planos"` | su ficha | `/propiedades/obra-piedecuesta-piso-2` |
| `"Vendida"` (y cualquier otro) | `/vendidas` **con ancla a esa tarjeta** | `/vendidas#sold-gadiel-28-501` |

El ancla funciona porque cada `SoldCard` lleva `id={property.id}` en su `<article>`, y
`.card` tiene `scroll-margin-top: 7rem` para que la tarjeta no quede bajo el `nav` fijo
(`Header.module.css` lo pone en `position: fixed`).

Hoy el carrusel trae 5 tarjetas: 2 "En obra" y 3 "Vendida".

**No reutilices `getAvailableProperties()` para decidir el destino:** esa lista incluye
`"Disponible en arriendo"`, que **no** tiene ficha. Mandaría a un 404. Para los botones usa
siempre `DETAIL_STATUSES`.

**Orden de ejecución (respetar el orden).** Los pasos 1, 2, 3, 4, 5, 6 y 7 están resueltos
(4 y 7 el 2026-10-05). **Solo queda el paso 8.**

- [x] **1. Autoalojar la imagen del hero.** Hecho: `public/images/hero/hero-portada.jpg` (369 KB),
      y en `Header.module.css` solo se cambió la URL de `background-image`. Se conservaron
      `background-size: cover` y `background-position: center`. Verificado en el CSS compilado y
      en runtime (200, `image/jpeg`). **El proyecto ya no pide nada a terceros.**
- [x] **2. Sacar los `.zip` de `public/`.** Hecho. Eran **2** archivos, no 6: `Briceño-501_1.zip`
      (1.2 MB) y `Gael-28-202/28-201_11.zip` (669 KB).
- [x] **3. Selectores.** Hecho: se agregó `getPropertyById(id)` a `src/data/propertySelectors.ts`.
      **Decisión sobre `showOnProperties`: NO se conectó a ningún filtro, a propósito.** Está
      declarado en el tipo pero ningún registro lo trae, así que respetarlo no cambia nada hoy y
      sí puede esconder una propiedad sin que se note. Queda como campo reservado.
- [x] **4. `app/propiedades/[id]/page.tsx`.** Hecho el 2026-10-05: galería, precio, specs,
      descripción, "Contactar" y "Ver ubicación", con `notFound()` para ids desconocidos y
      `generateStaticParams()` sobre los registros de `DETAIL_STATUSES`. **`params` se hace
      `await`**, como exige la v16. ⚠️ Le falta `dynamicParams = false`: sin eso, un build con
      `output: "export"` falla. Ver pendiente en la sección 6.
- [x] **5. `app/not-found.tsx`** con Header y Footer. Hecho: la página 404 ya no sale suelta.
      Recuerda que **no admite exportar `metadata`**, así que hereda el título del layout.
- [x] **6. Catálogo con filtro** en `/propiedades`. Hecho: la vista es un carrusel a pantalla
      completa con filtros de estado, tipo, precio, habitaciones y búsqueda por texto.
- [x] **7. Botones a `Link`.** Hecho el 2026-10-05. El "Ver propiedad" de `PropertyCard` pasó a
      `<Link href={getPropertyHref(property)}>` conservando el `stopPropagation` para que no
      alterne la expansión de la tarjeta. **No quedó fijo a `/propiedades/[id]`**: enruta por
      estado (ver la tabla de arriba). Como el ancla es un destino distinto del botón en sí,
      la etiqueta "Ver propiedad" sigue siendo cierta en los dos casos.
- [ ] **8. `app/sitemap.ts`** con las rutas de detalle. **Es lo único que falta de este plan.**
      Tiene que usar `getDetailProperties()`, NO `getAvailableProperties()`: si se mete una
      propiedad en arriendo, su URL no tiene ficha y devolvería 404 en el sitemap.

**El catálogo ya no está vacío.** Este párrafo estaba aquí porque `/propiedades` no tenía nada
que mostrar; ya no aplica. Hoy `src/data/properties.ts` tiene **9 registros**: 7 `"Vendida"` y
**2 `"En obra"`** (`obra-piedecuesta-piso-2` y `obra-piedecuesta-piso-3`, los dos con precio
de $205.000.000, separación desde $70.000.000 y entrega mayo de 2027). Son los dos únicos que
tienen ficha y los dos que salen en el carrusel del home con destino a `/propiedades/[id]`.

### 1.b ✅ `/propiedades` fue reemplazada por una plantilla externa — RESUELTO (2026-10-05)

**Esto no estaba en el plan.** El 2026-10-04 se verificó que `app/propiedades/page.tsx` (~1.019
líneas) y `app/propiedades/propertyFilters.ts` (155 líneas) **no eran código de este proyecto**:
venían de un showcase de pantalla completa con `framer-motion`, con 4 inmuebles de ejemplo y fotos
remotas.

Quedó así:

- `app/propiedades/page.tsx` es ahora un **server component mínimo** que solo renderiza
  `<PropertyShowcase />`. El cliente vive en `src/components/PropertyShowcase/`.
- **Lee el catálogo real** vía `src/components/PropertyShowcase/propertyCatalog.ts`, que adapta
  `Property` de `src/types/property.ts` al tipo que la vista consume. Ya no hay dos tipos
  `Property` en conflicto.
- **Ya no pide terceros:** cero `@import` de Google Fonts y cero fotos remotas. Todas las imágenes
  salen de `public/`.
- **Usa las variables `--color-*`**, sin hex sueltos.
- El pie de página ya no dice "Altavista Inmobiliaria": se pasa por la prop `footer`.
- `npm run lint` está en **0 errores** (los 3 de `react-hooks/refs` que mutaban refs durante el
  render se eliminaron al reescribir el componente).

**Lo que sigue pendiente acá** (auditado en runtime el 2026-10-05, sigue abierto):

- 🔴 **`/propiedades` no declara ni un `<h1>`** (0 en el HTML; los nombres de propiedad van en
  `<h2>`). Es la página comercial más importante del sitio.
- 🔴 **Su `canonical` y su `og:url` apuntan a la raíz**, no a `/propiedades`. Como la página no
  exporta `metadata`, hereda `alternates.canonical: "/"` del layout. Verificado en runtime:
  `<link rel="canonical" href="https://dominio-pendiente.example.com"/>`. **Esto le dice a
  Google que `/propiedades` es duplicado de la home**, justo lo contrario de lo que se quiere.
  Se arregla en el server component (`app/propiedades/page.tsx`), no en el cliente.
- Su `<title>` también es el de la home: "Constructora Hernandez | Propiedades en Bucaramanga".
- Falta revisar el resultado en pantalla en los distintos tamaños.

> Nota: `next.config.ts` **no tiene** `metadataBase` propio; sale de `siteUrl` en
> `app/layout.tsx`. Al corregir el dominio (§4) estos tres valores se actualizan solos, pero
> el `canonical` seguirá apuntando a la raíz hasta que `/propiedades` exporte su `metadata`.
### 1.c 🎨 La ficha `/propiedades/[id]` no tiene CSS — PENDIENTE

`app/propiedades/[id]/page.tsx` es el único archivo de la ruta y **no importa ningún CSS**.
Todo el estilo va en clases de Tailwind sueltas (`max-w-6xl`, `rounded-2xl`,
`shadow-[0_18px_40px_rgba(15,42,67,0.12)]`, `lg:grid-cols-[1.15fr_0.85fr]`…). Funciona, pero:

- Rompe la convención del proyecto: los componentes reutilizables llevan **CSS Module**
  (`Componente.tsx` + `Componente.module.css`). La ficha mezcla las dos: Tailwind en el
  `<main>` y el grid, y **hex sueltos** en el `hover` del botón (`hover:bg-[#c19d68]`),
  que la regla del proyecto prohíbe.
- No hay archivo donde ajustar el espaciado o el grid de una vez: hay que editar el JSX.
- La galería son todas las fotos en una cuadrícula fija de 2 columnas, sin visor, sin
  fotos highlighted y sin pie de foto. `/vendidas` sí tiene carrusel (`SoldCard`), así que
  las dos vistas se sienten de paquetes distintos.

**Lo que hay que hacer:** crear `src/components/PropertyDetail/` (o
`app/propiedades/[id]/ficha.module.css`) y mover ahí el estilo, usando solo variables
`--color-*`. Se puede dejar Tailwind para lo que ya funciona y solo extraer lo que se quiera
retocar; no hace falta reescribir la página entera.

> Nota: `/propiedades` (la vista carrusel) **sí** tiene su CSS, en
> `app/propiedades/properties.css`. La ficha es la que quedó sin él.

### 1.d 📞 Siguiente paso acordado: el botón "Contactar" — PENDIENTE (con el otro agente)

Hoy los dos botones "Contactar" son **enlaces muertos a la página de contacto**: obligan a
saltar de la ficha o del carrusel a `/contacto` y a explicar a mano de qué propiedad se
trata.

| Archivo | Línea | Estado actual |
| --- | --- | --- |
| `app/propiedades/[id]/page.tsx` | 84, 87 | `<Link href="/contacto">Contactar</Link>` |
| `src/components/PropertyShowcase/PropertyShowcase.tsx` | 595 | `<a className="ps-btn ps-btn-ghost" href="/contacto">Contactar</a>` |

**Lo que hay que hacer:** convertirlos en **enlace directo a WhatsApp con el mensaje ya
escrito**, usando el número que ya está en el Footer y en `/contacto` (`573113678896`):

```
https://wa.me/573113678896?text=<mensaje con el nombre de la propiedad>
```

El mensaje debería incluir el `title` de la ficha para que el asesor sepa de entrada de qué se
trata, y conviene `encodeURIComponent` (los títulos llevan `·`, `ñ` y acentos).

**Por qué toca las dos vistas a la vez:** el número y el formato del mensaje tienen que ser
idénticos, o el cliente recibe mensajes de dos formas distintas según por dónde entró. Por eso
va **con el otro agente**, no por separado. Lo natural es dejar el número y el texto del
mensaje en `src/lib/site.ts` (o en un `src/lib/whatsapp.ts`) para que las dos vistas lo
importen del mismo sitio.

**Decisión que falta tomar:** ¿el botón abre WhatsApp directo, o sigue yendo a `/contacto` y
*además* ofrece WhatsApp? La segunda es menos agressiva (no todo el mundo usa WhatsApp) pero
obliga al interesado a dar dos pasos.

---

### 2. Cambios al modelo de datos

- [x] **`priceValue?: number` agregado a `Property`.** Ya está en `src/types/property.ts` y lo usan
      los 2 registros "En obra" (`priceValue: 205000000`), que son los que necesita el filtro de
      precio del carrusel. Los 7 vendidos no lo tienen, y no lo necesitan mientras no se filtren.
- [ ] **Agregar campos de zona a `Property`**: municipio, barrio y dirección. Hoy `location` es
      texto libre y los 7 vendidos dicen lo mismo ("Área Metropolitana de Bucaramanga"); los 2 de
      "En obra" sí dicen "Piedecuesta, Santander". El filtro por ubicación del carrusel tiene
      con lo que trabajar, pero no hay estructura para afinar.
      **Regla de privacidad:** la dirección exacta solo se publica en propiedades
      **disponibles**. Las vendidas nunca muestran dirección exacta ni mapa, según las reglas
      de privacidad de este proyecto. El filtro por zona debe funcionar igual con los dos grupos.

### 3. Contenido pendiente del cliente

- [ ] **Cargar propiedades disponibles.** El catálogo tiene 7 registros y todos son `"Vendida"`,
      así que `/propiedades` se ve vacía. Hasta que se carguen, la sección queda con su estado
      vacío.
- [ ] **Reemplazar los testimonios demo** por los reales. Hoy 2 son demo
      (`sold-gadiel-28-501` y `sold-camila-garcia-501`) y los otros 5 muestran un placeholder
      de confidencialidad.
- [ ] **Crear una imagen Open Graph**: hoy las páginas no tienen `og:image` porque no existe el
      recurso, así que los enlaces compartidos salen sin miniatura.

### 4. Despliegue en Cloudflare

**Ruta elegida: Workers + OpenNext (2026-10-06).** El proyecto se compila con `next build`,
OpenNext genera `.open-next/worker.js` y Wrangler publica el Worker.

| Opción | Qué implica |
| --- | --- |
| **Export estático** | `output: "export"` en `next.config.ts` + `assets.directory` en `wrangler.jsonc`. Cero cómputo. Es lo más simple: el proyecto es 100 % estático (13 rutas, data local, sin server actions ni middleware) y la ruta de detalle future funciona con `generateStaticParams`. **Es la recomendación.** Contra: `output: "export"` es una restricción permanente si algún día quieren SSR o ISR |
| **Workers + vinext** | Es lo que **recomienda Cloudflare** para apps nuevas de Next.js (su guía de Next en Workers, ago-2026). No destructivo: `vinext init` sobre la app existente y `next dev` sigue funcionando |
| **Workers + OpenNext** | Ruta activa. Cloudflare ejecuta la migración automática y publica `.open-next/worker.js`. |

- [x] **Decidir la ruta de deploy.** Resuelto: Workers + OpenNext. Cloudflare genera
      `wrangler.jsonc`, `open-next.config.ts` y `.dev.vars` durante la migración; los artefactos
      locales permanecen ignorados y no se deben subir con secretos.
- [ ] **Reemplazar el dominio placeholder** de `src/lib/site.ts`
      (`https://dominio-pendiente.example.com`) por el real. **Es bloqueante**: afecta canonical,
      Open Graph, `robots.txt` y `sitemap.xml`. Mientras no haya dominio propio, se puede usar
      temporalmente `https://constructora-ch.fevora.workers.dev`, pero debe cambiarse antes del
      SEO definitivo.
- [x] **Publicar el Worker.** Verificado el 2026-10-06: `constructora-ch` desplegado en
      `https://constructora-ch.fevora.workers.dev`, con `ASSETS`, `IMAGES` y
      `WORKER_SELF_REFERENCE` funcionando.
- [ ] **Confirmar los nameservers del dominio.** Los Workers con dominio propio exigen que la
      zona esté en Cloudflare. Si el DNS queda en otro proveedor, esa vía no sirve y habría que
      publicar en Cloudflare Pages.
- [x] ~~Revisar las 4 legales en dispositivo real~~ → pendiente solo de confirmación visual; ya no
      tienen hero publicitario (ver nota de `Header` más abajo).
- [ ] **`/propiedades` no tiene `<h1>`** (genera `h1=0`): al quitarle el hero se quedó sin titular
      principal y usa `<h2>` para los nombres de propiedad. Es la página comercial más importante,
      así que conviene poner un `<h1>` tipo "Propiedades disponibles".
- [ ] **Opcional:** mover `Header` y `Footer` al `app/layout.tsx` raíz para dejar de repetirlos
      en las 7 páginas. **Ya no hace falta separar el hero**: `Header` expone `showHero` y `solid`,
      y las 4 legales usan `<Header showHero={false} solid />`. Habría que revisar que la home,
      `/vendidas` y `/contacto` sigan pidiendo `showHero`.
- [ ] **Agregar cabeceras de seguridad** (`_headers` en `public/`, que Cloudflare lee de forma
      nativa) **solo al final**: hoy una CSP tendría que permitir `picsum.photos` y Google Fonts
      por la plantilla de `/propiedades`, y quedaría whitelistando terceros que se van a quitar.

### 4.a SEO con subdominio gratuito

El subdominio `workers.dev` puede compartirse e indexarse sin comprar un dominio. Para hacerlo:

1. Confirmar que funcionen `/robots.txt` y `/sitemap.xml`.
2. Registrar la URL como propiedad de prefijo en Google Search Console.
3. Enviar `https://constructora-ch.fevora.workers.dev/sitemap.xml`.
4. Solicitar la indexación de `/`, `/propiedades` y `/contacto`.
5. Comprobar resultados con `site:constructora-ch.fevora.workers.dev`.

La indexación no es inmediata ni está garantizada. Para SEO comercial definitivo se recomienda
un dominio propio y actualizar `src/lib/site.ts`.

### 5. Legal (revisar con asesoría jurídica antes de publicar)

- [ ] **Completar la identificación del responsable**: las páginas legales no indican la razón
      social completa, el NIT ni una dirección física. La Ley 1581 de 2012 (art. 10) exige
      identificar al responsable con, mínimo, sus datos de contacto **y ubicación**.
- [ ] **Revisar los plazos y la transferencia a terceros**: los plazos de 10/15 días están
      correctos, pero no hay sección de plazos de conservación ni de transferencia a terceros.
- [x] ~~Revisar la afirmación de "sin terceros"~~ → **resuelto.** El hero está autoalojado desde
      el 2026-10-04, así que el proyecto ya no hace ningún request automático a un tercero:
      todas las fotos (las 60 del catálogo y el hero) y las fuentes (autoalojadas por `next/font`
      en build) son locales. **Ojo:** esto vuelve a ser cierto mientras `/propiedades` siga siendo
      la plantilla externa, que hoy carga Google Fonts y `picsum.photos`. Ver el aviso 1.b.

### 6. Calidad y housekeeping

- [x] Scripts `typecheck` y `lint` agregados. `npm run lint` usa `eslint` directo porque
      `next lint` fue eliminado en la v16. Config en `eslint.config.mjs`.
- [x] Borrados los 5 SVG de plantilla de create-next-app (`file.svg`, `globe.svg`, `next.svg`,
      `vercel.svg`, `window.svg`) y la carpeta vacía `public/images/sold-properties/`.
- [x] `next` actualizado de 16.3.4 a **16.3.8** por una RCE crítica en `next/og`
      (GHSA-vcvr-r3jv-pc5j, afecta 16.2.0–16.3.5).
- [x] `.gitignore` con `.open-next/`, `.wrangler/` y `.dev.vars` para los artefactos de Cloudflare.
- [ ] **`npm run lint` sale con código 1.** No es culpa de la configuración, pero hay que
      resolverlo antes de tomar el lint como puerta de calidad. Lo que falta:
      - 3 errores `react-hooks/refs` en `app/propiedades/page.tsx` (líneas 293, 295 y 298:
        muta refs durante el render). Se arreglan cuando se integre la plantilla.
      - 1 warning `jsx-a11y/role-supports-aria-props` en `PropertyCard.tsx:16`: `aria-expanded`
        sobre un `<article>`, que no lo soporta. El artículo es clicable **y no accesible por
        teclado**. Arreglarlo bien significa cambiar la semántica (y el CSS), no es un cambio de
        una línea.
- [ ] **El catálogo tiene 2 registros casi idénticos.** `obra-piedecuesta-piso-2` y
      `obra-piedecuesta-piso-3` tienen el mismo precio, la misma descripción, el mismo
      `mapUrl` y las mismas dos fotos; solo cambia el piso en el título. Es contenido duplicado
      y el cliente lo va a notar en el carrusel. O se differentiate (fotos y texto propios) o
      se deja uno solo.
- [ ] **`"Disponible en arriendo"` rompería el catálogo.** La lista de estados con ficha está
      escrita en 3 archivos y **las 3 no coinciden**:

      | Archivo | ¿Incluye arriendo? |
      | --- | --- |
      | `src/data/propertySelectors.ts` (`getAvailableProperties`) | ✅ sí |
      | `app/propiedades/[id]/page.tsx` (su `AVAILABLE_STATUSES` local) | ❌ no |
      | la vista de `/propiedades` (su `AVAILABLE_STATUSES` local) | ❌ no |

      Si el cliente carga una propiedad en arriendo, **no sale en `/propiedades` y su ficha da
      404**. Ahora hay una cuarta lista (`DETAIL_STATUSES` en `propertySelectors.ts`) que sí
      está centralizada, pero las otras dos siguen duplicadas. Habría que hacer que las tres
      consuman `DETAIL_STATUSES`.
- [ ] **Código muerto de la plantilla de `/propiedades`**: `src/components/PropertyListing/`
      no lo usa nadie (solo se importa a sí mismo), y en `src/components/PropertyShowcase/`
      sobran `propertyAnimations.ts` (0 bytes) y `properties.module.css`. Conviene revisarlo
      cuando termine el retoque visual.
- [ ] `README.md` está vacío (0 bytes).
- [ ] `PLAN_INICIO.md` está desactualizado: conservar como histórico o eliminar.
- [ ] `src/styles/globals.css` **ya no existe** (antes estaba vacío y sin importarse). Este
      punto quedó obsoleto: el archivo se borró.
- [ ] **`dynamicParams = false` en `app/propiedades/[id]/page.tsx`.** Si el deploy termina
      siendo `output: "export"` (ver sección 4), el build falla sin esto, porque la ruta dinámica
      no puede generar páginas que no estén en `generateStaticParams()`. Si en cambio se usa
      Workers + vinext, no hace falta, pero sigue siendo lo correcto para una ruta que solo
      debe servir ids conocidos.
- [ ] **Las 5 vulnerabilidades `high` que reporta `npm audit` están en `braces`/`fast-glob`**,
      cadena que solo afecta al plugin de ESLint en desarrollo. **No correr
      `npm audit fix --force`**: propone bajar `eslint-config-next` a 14.2.35 y rompe el lint.
- [ ] El proyecto sigue **sin runner de tests**.

---

## 📐 CONVENCIONES DEL PROYECTO

- Next.js (App Router) + React + TypeScript.
- CSS Modules por componente: `Componente.tsx` + `Componente.module.css`. Todos los componentes reutilizables ya lo cumplen, incluido `Footer`.
- Tailwind sí se usa, pero solo en las páginas (`app/**/page.tsx`) y en `RecentProperties`. Los componentes reutilizables llevan CSS Module.
- Colores: siempre desde las variables `--color-*` de `app/globals.css`, nunca hex sueltos.
- SEO: cada página exporta su `metadata`; el título se completa solo con la plantilla de `app/layout.tsx`. El dominio está centralizado en `src/lib/site.ts`.
- Antes de dar por terminado un cambio: `npm run typecheck` y `npm run build`.
- Si tocaste `public/`: ninguna imagen puede venir de un tercero, y nada de `.zip` ni archivos
  originales puede quedar dentro de `public/`.
- Un `<h1>` por página. `Header` aporta el `<h1>` del hero **solo si se lo pide**: con
  `showHero` (por defecto `true`) el hero es el titular y lo de abajo empieza en `<h2>`; con
  `<Header showHero={false} solid />` la página define su propio `<h1>` y usa `solid` para que el
  menú sea legible sobre fondo claro. Hoy: 4 legales y el 404 con su propio `<h1>`; `/`, `/vendidas`
  y `/contacto` con el `<h1>` del hero. **Pendiente: `/propiedades` no tiene ninguno.**

---

## ⚠️ ESTA VERSIÓN DE NEXT CAMBIÓ VARIAS APIs (Next 16.3.8)

El `AGENTS.md` del repo lo advierte: **esta versión de Next tiene breaking changes frente a lo que
"ya se conoce"**. Antes de escribir código nuevo, leer la documentación real en
`node_modules/next/dist/docs/` y no confiar en la memoria. Lo verificado el 2026-09-25:

| API | Estado en esta versión |
| --- | --- |
| `params` en page y `generateMetadata` | **Es un `Promise`. Hay que `await`.** El acceso síncrono se eliminó por completo en la v16 (en v15 era una compatibilidad temporal). |
| `searchParams` | También `Promise`. Solo existe en `page.tsx`, no en `generateMetadata`. |
| `PageProps<'/ruta'>` / `LayoutProps<'/ruta'>` | Disponibles globalmente, sin importar. Los tipos ya se generan en `next dev`/`next build`. `app/layout.tsx:65` ya usa `LayoutProps<"/">`. |
| `generateStaticParams` | Sin cambios. |
| `MetadataRoute` (`sitemap.ts`, `robots.ts`) | Sin cambios. La firma actual del proyecto es correcta. |
| `notFound()` | `import { notFound } from "next/navigation"`. **Sin `return`** y **fuera de `try/catch`**. |
| `not-found.tsx` | **No admite exportar `metadata`.** Ese export solo existe en `global-not-found.js`, que es experimental. El 404 heredará el título del layout. |
| Caching | `cacheComponents` es el flag nuevo de la v16 y está en `false` por defecto. Un page que lee un array local queda **estático sin declarar nada**. No escribir `dynamic`, `revalidate` ni `dynamicParams` (este último es incompatible con `cacheComponents`). |
| `next/image` | `priority` está deprecado en favor de `preload`. `qualities` es `[75]`: un `quality={85}` se coacciona a 75 con warning. |
| `next lint` | **Eliminado.** `next build` ya no lintea, por eso `npm run build` no detecta problemas de estilo. |

**El proyecto no usa `next/image` en ningún lado:** todo es `<img>` plano. Conviene mantenerlo así
al menos hasta el deploy. La carpeta `Briceño-501` tiene `ñ` en la ruta y `next/image` la
codifica como query param de `/_next/image?url=...`; como nadie ha pasado por el optimizador
nunca, ese camino está sin probar. La regla `@next/next/no-img-element` está **desactivada** en
`eslint.config.mjs` para que el lint no insista en algo que el proyecto decidió no hacer.

### Motivo del salto 16.3.4 → 16.3.8 (2026-10-04)

No fue por funcionalidad, fue por seguridad: **GHSA-vcvr-r3jv-pc5j**, ejecución remota de código
en `next/og` (`ImageResponse`), que afecta `next` 16.2.0 a 16.3.5. El proyecto no usa `next/og`,
así que el riesgo real era bajo, pero se aplicó el parche igual. Aplicado sin cambios de
comportamiento: las 13 rutas siguen generándose igual.
