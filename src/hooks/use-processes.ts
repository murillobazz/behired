"use client";

import { useContext } from "react";

import { ProcessContext } from "@/contexts/ProcessContext";

/**
 * Hook customizado para acessar o contexto de processos.
 * Lança erro se usado fora do ProcessProvider.
 * 
 * @example
 * const { processes, createProcess } = useProcesses();
 */
export const useProcesses = () => {
  const context = useContext(ProcessContext);

  if (!context) {
    throw new Error(
      "useProcesses deve ser usado dentro de um ProcessProvider",
    );
  }

  return context;
};
