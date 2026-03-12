"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Process, ProcessStatus, Stage } from "@/types";
import { MOCK_PROCESSES } from "@/lib/mock-data";
import { generateId } from "@/lib/process-utils";
import { DEFAULT_STAGES } from "@/lib/constants";

// Tipo das funções de ação disponíveis no contexto
type ProcessContextType = {
  processes: Process[];
  createProcess: (data: Omit<Process, "id" | "stages">) => void;
  updateProcess: (id: string, data: Partial<Process>) => void;
  deleteProcess: (id: string) => void;
  closeProcess: (id: string, reason: string, status: ProcessStatus) => void;
  addStage: (processId: string, stage: Omit<Stage, "id">) => void;
  updateStage: (processId: string, stageId: string, data: Partial<Stage>) => void;
  deleteStage: (processId: string, stageId: string) => void;
  getProcessById: (id: string) => Process | undefined;
};

export const ProcessContext = createContext<ProcessContextType | undefined>(undefined);

type ProcessProviderProps = {
  children: ReactNode;
};

/**
 * Provider que gerencia o estado global dos processos seletivos.
 * Mantém dados em memória durante a sessão (reset ao refresh).
 * Preparado para futura integração com backend.
 */
export const ProcessProvider = ({ children }: ProcessProviderProps) => {
  // Estado inicial carregado dos dados mockados
  const [processes, setProcesses] = useState<Process[]>(MOCK_PROCESSES);

  /**
   * Cria um novo processo com stages padrão.
   * Gera ID único e adiciona template de etapas.
   */
  const createProcess = useCallback(
    (data: Omit<Process, "id" | "stages">) => {
      const now = new Date().toISOString();
      const newProcess: Process = {
        ...data,
        id: generateId(),
        lastModified: now,
        currentStageIndex: 0,
        stages: DEFAULT_STAGES.map((name, index) => ({
          id: generateId(),
          name,
          description: "",
          date: data.startDate,
          completed: index === 0, // Primeira etapa já completada
        })),
      };
      setProcesses((prev) => [newProcess, ...prev]);
    },
    [],
  );

  /**
   * Atualiza um processo existente.
   * Permite atualizar qualquer campo incluindo stages.
   */
  const updateProcess = useCallback(
    (id: string, data: Partial<Process>) => {
      const now = new Date().toISOString();
      setProcesses((prev) =>
        prev.map((process) =>
          process.id === id ? { ...process, ...data, lastModified: now } : process,
        ),
      );
    },
    [],
  );

  /**
   * Remove um processo permanentemente.
   */
  const deleteProcess = useCallback((id: string) => {
    setProcesses((prev) => prev.filter((process) => process.id !== id));
  }, []);

  /**
   * Encerra um processo com motivo e atualiza status.
   */
  const closeProcess = useCallback(
    (id: string, reason: string, status: ProcessStatus) => {
      const now = new Date().toISOString();
      setProcesses((prev) =>
        prev.map((process) =>
          process.id === id
            ? {
                ...process,
                status,
                closedReason: reason,
                closedDate: now.split("T")[0],
                lastModified: now,
              }
            : process,
        ),
      );
    },
    [],
  );

  /**
   * Adiciona uma nova stage a um processo.
   */
  const addStage = useCallback(
    (processId: string, stage: Omit<Stage, "id">) => {
      const now = new Date().toISOString();
      setProcesses((prev) =>
        prev.map((process) =>
          process.id === processId
            ? {
                ...process,
                lastModified: now,
                stages: [
                  ...process.stages,
                  { ...stage, id: generateId() },
                ],
              }
            : process,
        ),
      );
    },
    [],
  );

  /**
   * Atualiza uma stage existente de um processo.
   */
  const updateStage = useCallback(
    (processId: string, stageId: string, data: Partial<Stage>) => {
      const now = new Date().toISOString();
      setProcesses((prev) =>
        prev.map((process) =>
          process.id === processId
            ? {
                ...process,
                lastModified: now,
                stages: process.stages.map((stage) =>
                  stage.id === stageId ? { ...stage, ...data } : stage,
                ),
              }
            : process,
        ),
      );
    },
    [],
  );

  /**
   * Remove uma stage de um processo.
   */
  const deleteStage = useCallback((processId: string, stageId: string) => {
    const now = new Date().toISOString();
    setProcesses((prev) =>
      prev.map((process) =>
        process.id === processId
          ? {
              ...process,
              lastModified: now,
              stages: process.stages.filter((stage) => stage.id !== stageId),
            }
          : process,
      ),
    );
  }, []);

  /**
   * Busca um processo por ID.
   * Utilitário para facilitar acesso em componentes.
   */
  const getProcessById = useCallback(
    (id: string) => {
      return processes.find((process) => process.id === id);
    },
    [processes],
  );

  // Memoiza o valor do contexto para evitar re-renders desnecessários
  const value = useMemo(
    () => ({
      processes,
      createProcess,
      updateProcess,
      deleteProcess,
      closeProcess,
      addStage,
      updateStage,
      deleteStage,
      getProcessById,
    }),
    [
      processes,
      createProcess,
      updateProcess,
      deleteProcess,
      closeProcess,
      addStage,
      updateStage,
      deleteStage,
      getProcessById,
    ],
  );

  return (
    <ProcessContext.Provider value={value}>{children}</ProcessContext.Provider>
  );
};
