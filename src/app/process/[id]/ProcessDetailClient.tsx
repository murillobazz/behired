"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";
import { formatDate, getDaysAgo } from "@/lib/date-utils";
import { useProcesses } from "@/hooks/use-processes";

type ProcessDetailClientProps = {
  id: string;
};

/**
 * Componente cliente que exibe os detalhes de um processo.
 * Busca dados do contexto global usando o hook useProcesses.
 */
export const ProcessDetailClient = ({ id }: ProcessDetailClientProps) => {
  const router = useRouter();
  // Busca o processo pelo ID através do contexto
  const { getProcessById, deleteProcess, closeProcess } = useProcesses();
  const process = getProcessById(id);

  if (!process) {
    return (
      <div className="min-h-screen bg-[var(--bg-light)] px-12 py-10">
        <Link className="underline underline-offset-4" href="/">
          ← Voltar para processos
        </Link>
        <p className="mt-6">Processo não encontrado.</p>
      </div>
    );
  }
/**
   * Redireciona para a página de edição do processo
   */
  const handleEdit = () => {
    router.push(`/process/${id}/edit`);
  };

  /**
   * Fecha o processo com um motivo fornecido pelo usuário
   */
  const handleClose = () => {
    const reason = prompt("Motivo do encerramento:");
    if (reason) {
      closeProcess(id, reason);
    }
  };

  /**
   * Exclui o processo após confirmação e redireciona para a home
   */
  const handleDelete = () => {
    const confirmed = confirm(
      `Tem certeza que deseja excluir o processo "${process.position}" na empresa "${process.company}"?`
    );
    if (confirmed) {
      deleteProcess(id);
      router.push("/");
    }
  };

  
  return (
    <div className="min-h-screen bg-[var(--bg-light)] px-12 py-10">
        
        {/* Botões de ação */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={handleEdit} variant="outline">
            Editar processo
          </Button>
          {process.status !== "CLOSED" && (
            <Button onClick={handleClose} variant="outline">
              Fechar processo
            </Button>
          )}
          <Button onClick={handleDelete} variant="destructive">
            Excluir processo
          </Button>
        </div>
      <Link className="underline underline-offset-4" href="/">
        ← Voltar para processos
      </Link>
      <section className="mt-6 rounded border border-[var(--card-border)] bg-white p-6 shadow-[1px_1px_3px_rgba(0,0,0,0.15)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-azeret text-[20px] font-bold text-[var(--font-primary)]">
              {process.position}
            </h1>
            <p className="text-sm text-[var(--font-secondary)]">
              {process.company}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge color={STATUS_COLORS[process.status]}>
              {STATUS_LABELS[process.status]}
            </Badge>
            <span className="text-sm text-[var(--font-secondary)]">
              Início: {formatDate(process.startDate)}
            </span>
            <span className="text-sm text-[var(--font-secondary)]">
              {getDaysAgo(process.startDate)}
            </span>
          </div>
        </div>
        {process.description ? (
          <p className="mt-4 text-sm text-[var(--font-secondary)]">
            {process.description}
          </p>
        ) : null}
      </section>
      <section className="mt-8">
        <h2 className="text-[18px] font-semibold text-[var(--font-primary)]">
          Linha do tempo
        </h2>
        <ProcessTimeline stages={process.stages} />
      </section>
      {process.closedReason ? (
        <section className="mt-8 rounded border border-[var(--card-border)] bg-white p-4 text-sm text-[var(--font-secondary)]">
          <span className="font-semibold">Motivo do encerramento:</span>{" "}
          {process.closedReason}
        </section>
      ) : null}
    </div>
  );
};
