/// <reference types="vite/client" />

// Variables de entorno de la app (ver .env.example). API_DESTINO no aparece
// porque solo la lee vite.config.ts.
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
