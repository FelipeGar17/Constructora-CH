# Bitácora de desarrollo

## 2026-10-06

### Filtros de propiedades

- Se reemplazó la barra de filtros por una implementación basada en la plantilla funcional
  recibida.
- Los campos se construyen desde `Filters` y `FilterOptions` reales: habitaciones, baños,
  precio, área, ubicación y estado.
- Los menús son flotantes y no empujan el carrusel.
- Al seleccionar una opción, pulsar fuera, presionar `Escape` o cambiar de slide, el menú se
  cierra.
- Los estilos de la plantilla quedaron integrados en `app/propiedades/properties.css`.
- La barra se oculta durante el paso del footer.
- En móvil el indicador del carrusel se movió a una barra vertical lateral para no cortar el
  texto de los filtros.

### Estados vacíos y footer

- Cuando una combinación de filtros no encuentra propiedades, se muestra un estado vacío con
  icono `SearchX`, mensaje explicativo y botón para limpiar filtros.
- El footer conserva la división de pantalla 50 % beige y 50 % footer.
- La mitad beige incluye una llamada a la acción para volver a ver propiedades.
- La mitad del footer mantiene scroll interno y `data-no-snap` para no interferir con el carrusel.

### Header, logo e iconos

- Se añadió el logo circular junto al enlace `Contacto` en
  `src/components/Header/Header.tsx`.
- El logo usa `public/images/Logotipacion/Logo.jpeg` y conserva sus proporciones con
  `object-fit: cover`.
- El fondo del hero del header se cambió temporalmente a ese logo; usa `background-size: contain`,
  sin repetición y con fondo azul institucional.
- Se reemplazó el favicon de plantilla por `app/icon.jpeg`, generado a partir del logo.
- `app/layout.tsx` declara los iconos `icon`, `shortcut` y `apple`.

### Despliegue y documentación

- Se confirmó el despliegue en Cloudflare Workers mediante OpenNext.
- Worker activo: `constructora-ch`.
- URL temporal: `https://constructora-ch.fevora.workers.dev`.
- Se corrigió la inconsistencia entre `constructora-ch` y `constructorach` en la configuración
  del proyecto de Cloudflare.
- Los artefactos `.open-next/`, `.wrangler/`, `.dev.vars`, `.next/`, logs y temporales quedan
  excluidos por `.gitignore`.
- Se documentó el uso temporal del subdominio gratuito para Search Console y SEO.

### Validación

- `npm run build` completado correctamente después de los cambios.
- `npm run typecheck` completado correctamente; en ocasiones fue necesario ejecutarlo después de
  `next build` porque Next.js regenera tipos internos en `.next`.
- ESLint validado en los componentes modificados.