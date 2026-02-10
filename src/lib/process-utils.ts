import type { Process, ProcessStatus, Stage } from "@/types";

/**
 * Retorna a stage atual do processo baseada no índice.
 * Se o índice for inválido, retorna a primeira stage.
 */
export const getCurrentStage = (process: Process): Stage | undefined => {
  return process.stages[process.currentStageIndex] ?? process.stages[0];
};

/**
 * Retorna a cor associada a um status de processo.
 * Usado para badges e indicadores visuais.
 */
export const getStatusColor = (status: ProcessStatus): string => {
  const colors: Record<ProcessStatus, string> = {
    APPLIED: "#3b82f6",
    IN_PROGRESS: "#f59e0b",
    APPROVED: "#16a34a",
    REJECTED: "#ef4444",
    CLOSED: "#6b7280",
  };
  return colors[status];
};

/**
 * Retorna o label em português para um status.
 */
export const getStatusLabel = (status: ProcessStatus): string => {
  const labels: Record<ProcessStatus, string> = {
    APPLIED: "Aplicado",
    IN_PROGRESS: "Em andamento",
    APPROVED: "Aprovado",
    REJECTED: "Rejeitado",
    CLOSED: "Encerrado",
  };
  return labels[status];
};

/**
 * Gera um ID único para novos processos ou stages.
 * Compatível com backend futuro (formato UUID).
 */
export const generateId = (): string => {
  return crypto.randomUUID();
};
