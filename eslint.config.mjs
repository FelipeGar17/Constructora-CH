import next from "eslint-config-next";

const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      ".open-next/**",
      ".wrangler/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...next,
  {
    rules: {
      // El proyecto usa <img> plano a propósito y en todo el sitio: las carpetas
      // tienen "ñ" en la ruta y `next/image` la codifica como query param de
      // /_next/image, un camino que nunca se ha probado. Ver READMEDESARROLLO.md.
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;