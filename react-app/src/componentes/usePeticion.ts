import { useEffect, useRef, useState } from "react";

type Resultado<T> = { clave: string; datos?: T; error?: unknown };

// Ejecuta una petición a un servicio y entrega datos, error y estado de carga.
// Se repite cuando cambia "clave" (por ejemplo, los filtros) o al reintentar.
// Mientras carga, conserva los datos anteriores para no dejar la vista en blanco.
export function usePeticion<T>(cargar: () => Promise<T>, clave: string) {
  const cargarRef = useRef(cargar);
  const [intento, setIntento] = useState(0);
  const [resultado, setResultado] = useState<Resultado<T>>();
  const claveActual = `${clave}#${intento}`;

  useEffect(() => {
    cargarRef.current = cargar;
  });

  useEffect(() => {
    let vigente = true;
    cargarRef.current().then(
      (datos) => vigente && setResultado({ clave: claveActual, datos }),
      (error: unknown) =>
        vigente &&
        setResultado((anterior) => ({ clave: claveActual, datos: anterior?.datos, error })),
    );
    return () => {
      vigente = false;
    };
  }, [claveActual]);

  const cargando = resultado?.clave !== claveActual;

  return {
    datos: resultado?.datos,
    error: cargando ? undefined : resultado?.error,
    cargando,
    reintentar: () => setIntento((actual) => actual + 1),
  };
}
