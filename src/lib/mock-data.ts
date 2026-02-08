import type { Process } from "@/types";

// Dados mockados para validar a UI antes do backend.
export const MOCK_PROCESSES: Process[] = [
  {
    id: "process-1",
    company: "Nubank",
    position: "Software Engineer II",
    description: "Backend com foco em pagamentos e integracoes.",
    status: "IN_PROGRESS",
    startDate: "2025-06-22",
    currentStageIndex: 3,
    stages: [
      {
        id: "stage-1",
        name: "Aplicacao",
        description: "Envio do curriculo e portfolio.",
        date: "2025-06-22",
        completed: true,
      },
      {
        id: "stage-2",
        name: "Triagem",
        description: "Contato inicial com recrutador.",
        date: "2025-06-24",
        completed: true,
      },
      {
        id: "stage-3",
        name: "Entrevista RH",
        description: "Conversas sobre cultura e expectativas.",
        date: "2025-06-26",
        completed: true,
      },
      {
        id: "stage-4",
        name: "Entrevista tecnica",
        description: "Arquitetura e resolucao de problemas.",
        date: "2025-07-01",
        completed: false,
      },
    ],
  },
  {
    id: "process-2",
    company: "Mercado Livre",
    position: "Software Architect",
    description: "Lideranca tecnica e evolucao da plataforma.",
    status: "IN_PROGRESS",
    startDate: "2025-06-26",
    currentStageIndex: 1,
    stages: [
      {
        id: "stage-5",
        name: "Aplicacao",
        description: "Envio do curriculo.",
        date: "2025-06-26",
        completed: true,
      },
      {
        id: "stage-6",
        name: "Entrevista RH",
        description: "Alinhamento de escopo.",
        date: "2025-07-05",
        completed: false,
      },
    ],
  },
  {
    id: "process-3",
    company: "Outra Empresa Inc.",
    position: "Web Developer",
    description: "Projeto de marketing com foco em performance.",
    status: "CLOSED",
    startDate: "2025-06-15",
    currentStageIndex: 1,
    closedReason: "Processo encerrado por decisao interna.",
    closedDate: "2025-07-10",
    stages: [
      {
        id: "stage-7",
        name: "Aplicacao",
        description: "Envio do curriculo.",
        date: "2025-06-15",
        completed: true,
      },
      {
        id: "stage-8",
        name: "Entrevista RH",
        description: "Conversa inicial.",
        date: "2025-07-05",
        completed: false,
      },
    ],
  },
];
