import type { ProcessStatus } from "@/types";

// Labels e cores centralizadas para status do processo.
export const STATUS_LABELS: Record<ProcessStatus, string> = {
  APPLIED: "Aplicado",
  IN_PROGRESS: "Em andamento",
  APPROVED: "Aprovado",
  REJECTED: "Rejeitado",
  CLOSED: "Encerrado",
};

export const STATUS_COLORS: Record<ProcessStatus, string> = {
  APPLIED: "#3b82f6",
  IN_PROGRESS: "#f59e0b",
  APPROVED: "#16a34a",
  REJECTED: "#ef4444",
  CLOSED: "#6b7280",
};

export const DEFAULT_STAGES = [
  "Aplicacao",
  "Triagem",
  "Entrevista RH",
  "Desafio tecnico",
  "Entrevista tecnica",
  "Entrevista cultural",
  "Proposta",
];
