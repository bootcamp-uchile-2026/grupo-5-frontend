import { useEffect } from "react";

// Título de la pestaña del navegador: "<página> | LeeConNos"
export function useTituloPagina(titulo: string) {
  useEffect(() => {
    document.title = `${titulo} | LeeConNos`;
  }, [titulo]);
}
