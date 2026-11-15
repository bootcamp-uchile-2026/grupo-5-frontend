import type { SuscribirNewsletterDto, SuscripcionResponseDto } from "../tipos/comunidad";
import { solicitar, usarApi } from "./api";

// Newsletter del Home. Con API: POST /newsletter/suscripciones (suscribir dos
// veces el mismo correo no es un error). Sin API: solo simula la espera.

const pausa = () => new Promise((resolver) => setTimeout(resolver, 300));

export async function suscribirNewsletter(email: string): Promise<void> {
  if (!usarApi) {
    await pausa();
    return;
  }
  const cuerpo: SuscribirNewsletterDto = { email: email.trim() };
  await solicitar<SuscripcionResponseDto>("/newsletter/suscripciones", {
    metodo: "POST",
    cuerpo,
  });
}
