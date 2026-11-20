// Validaciones compartidas de formularios
export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const LARGO_MINIMO_CONTRASENA = 8;

// RUT chileno: cuerpo de 7 u 8 dígitos y dígito verificador (0-9 o K),
// con o sin puntos y guion. El dígito se comprueba con el módulo 11.
export function rutValido(rut: string): boolean {
  const limpio = rut.replace(/[.\s-]/g, "").toUpperCase();
  if (!/^\d{7,8}[\dK]$/.test(limpio)) return false;
  const cuerpo = limpio.slice(0, -1);
  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return limpio.endsWith(esperado);
}
