import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type ProxyOptions } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // API_DESTINO viene de .env.development (pnpm dev) o .env.production
  // (pnpm preview). Sin ella no hay proxy.
  const { API_DESTINO } = loadEnv(mode, process.cwd(), '')

  // La app llama a /api/... en su propio origen y Vite reenvía la llamada a la
  // API sin el prefijo. Para el navegador la API es el mismo sitio, así que
  // guarda y envía las cookies HttpOnly de la sesión (SameSite=Lax) aunque la
  // API use HTTP. La cookie de refresh viene con Path=/auth: se reescribe a
  // /api/auth para que el navegador la envíe a /api/auth/refresh y logout.
  const proxy: Record<string, ProxyOptions> = API_DESTINO
    ? {
        '/api': {
          target: API_DESTINO,
          changeOrigin: true,
          rewrite: (ruta) => ruta.replace(/^\/api/, ''),
          cookiePathRewrite: { '/auth': '/api/auth' },
        },
      }
    : {}

  return {
    plugins: [react()],
    server: { proxy },
    preview: { proxy },
  }
})
