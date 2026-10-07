# 🏠 PORTAFOLIO INMOBILIARIO - PLAN DE INICIO V2

## 📋 RESUMEN DEL PROYECTO

**Objetivo:** Crear un sitio web de portafolio inmobiliario (finca raíz) para mostrar propiedades en venta y vendidas, con formulario de contacto.

**Stack confirmado:**

- Next.js (App Router)
- React + TypeScript
- CSS Modules (CSS separado por componente)
- SIN base de datos
- SIN autenticación

---

## 🎨 PALETA DE COLORES (BASE DEL DISEÑO)

```
COLORES PRINCIPALES:
─────────────────────────────────────────
Azul marino          #0F2A43   → Encabezados, nav, fondos principales
Azul acero           #3D5A73   → Subtítulos, iconos, líneas divisorias
Gris piedra          #8C97A0   → Texto secundario, bordes, fondos
Blanco hueso         #F5F3EE   → Fondo general (cálido, no clínico)
Dorado apagado       #B08D57   → Botones, links activos, ACENTOS
─────────────────────────────────────────
```

**Uso en el diseño:**

- **Fondo general:** Blanco hueso (#F5F3EE)
- **Titulos principales:** Azul marino (#0F2A43)
- **Subtítulos:** Azul acero (#3D5A73)
- **Botones CTA:** Dorado apagado (#B08D57)
- **Texto secundario:** Gris piedra (#8C97A0)
- **Navegación:** Azul marino (#0F2A43)

---

## 🛠️ CÓMO TRABAJA FELIPE (CONVENCIONES)

### 1. **CSS SEPARADO POR COMPONENTE**

- Cada componente tiene su propio archivo `.module.css`
- **NO usamos Tailwind en componentes reutilizables**
- CSS limpio, variables, fácil de modificar

```
Ejemplo:
src/components/Header/
├── Header.tsx           (componente)
└── Header.module.css    (estilos)
```

### 2. **ESTRUCTURA MODULAR**

- Componentes reutilizables en `src/components/`
- Datos en `src/data/`
- Tipos en `src/types/`
- Cada cosa en su carpeta

### 3. **CONCRETO Y DOCUMENTADO**

- Cuando creo algo: "Creé X en ruta Y con función Z"
- Todo documentado para no perder tiempo buscando
- README actualizado

### 4. **PASO A PASO, SIN ADELANTARSE**

- NO crear 10 archivos sin preguntar
- Planificamos JUNTOS antes de codear
- Iterativo: diseño → código → prueba → siguiente

### 5. **RESPONSIVE DESIGN**

- Mobile first
- CSS Modules con media queries
- Sin Tailwind (control total)

---

## 📐 PLAN DE DESARROLLO (ORDEN)

### **FASE 1: ESTRUCTURA BASE** (Ahora empezamos aquí)

1. ✅ Crear `src/styles/globals.css` con variables de color
2. ⏳ Crear componente **Header** (hero section)
3. ⏳ Crear componente **Footer**
4. ⏳ Crear tipo TypeScript para Propiedad
5. ⏳ Crear datos JSON de ejemplo

### **FASE 2: PÁGINAS PRINCIPALES**

6. Página Home (con Header + stats + propiedades destacadas)
7. Página Propiedades (listado en venta)
8. Página Propiedades Vendidas
9. Página Contacto

### **FASE 3: DETALLE Y FUNCIONALIDAD**

10. Página Detalle de Propiedad
11. Galería de fotos
12. Navegación entre propiedades

### **FASE 4: REFINAMIENTO**

13. Responsive design
14. Animaciones
15. SEO
16. Deploy

---

## 🎯 PRÓXIMO PASO (INMEDIATO)

**Vamos a crear:**

1. **`src/styles/globals.css`**
   - Variables CSS con la paleta de colores
   - Reset de estilos
   - Tipografía base
   - Utilidades (spacing, etc.)

2. **`src/components/Header/`**
   - `Header.tsx` → Componente hero section
   - `Header.module.css` → Estilos

   Con estas características:
   - ✅ Imagen de fondo
   - ✅ Overlay oscuro
   - ✅ Navegación en top (logo + links)
   - ✅ Título + Subtítulo centrados
   - ✅ Botón CTA (dorado)
   - ✅ Responsive

---

## 📝 REFERENCIA RÁPIDA

**Preguntas que Felipe hace:**

- "¿Qué hiciste y dónde?"
- "¿Qué hace cada archivo?"
- "¿Cómo se usa?"

**Felipe NO quiere:**

- Múltiples archivos sin avisar
- Tailwind en componentes reutilizables
- Código sin documentar
- Adelantarse en desarrollo

---

**¿Listo para empezar el Header?** 👇
