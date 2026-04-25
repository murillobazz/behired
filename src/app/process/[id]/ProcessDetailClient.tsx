"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { CloseProcessDialog } from "@/components/dialogs/CloseProcessDialog";
import { DeleteAlertDialog } from "@/components/dialogs/DeleteAlertDialog";
import { StageDialog } from "@/components/dialogs/StageDialog";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Badge } from "@/components/ui/Badge";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";
import { formatDate, getDaysAgo } from "@/lib/date-utils";
import { useProcesses } from "@/hooks/use-processes";
import type { ProcessStatus, Stage } from "@/types";

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
  const { getProcessById, deleteProcess, closeProcess, addStage, updateStage, deleteStage } =
    useProcesses();
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<Stage | undefined>();
  const process = getProcessById(id);

  if (!process) {
    return (
      <div className="min-h-screen bg-[var(--bg-light)] px-4 py-6 sm:px-6 md:px-10 md:py-10 animate-fade-in-from-left">
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

  const handleCloseConfirm = (status: ProcessStatus, reason: string) => {
    closeProcess(id, reason || "Encerrado pelo usuário", status);
    setIsCloseDialogOpen(false);
    toast.success("Processo encerrado");
  };

  const handleDeleteConfirm = () => {
    deleteProcess(id);
    setIsDeleteDialogOpen(false);
    toast.success("Processo deletado");
    router.push("/");
  };

  const handleOpenNewStage = () => {
    setEditingStage(undefined);
    setIsStageDialogOpen(true);
  };

  const handleOpenEditStage = (stage: Stage) => {
    setEditingStage(stage);
    setIsStageDialogOpen(true);
  };

  const handleSaveStage = (stageData: Omit<Stage, "id">) => {
    if (editingStage) {
      updateStage(id, editingStage.id, stageData);
      toast.success("Etapa atualizada");
    } else {
      addStage(id, stageData);
      toast.success("Etapa adicionada");
    }
    setIsStageDialogOpen(false);
    setEditingStage(undefined);
  };

  const handleDeleteStage = (stage: Stage) => {
    const confirmed = window.confirm(`Excluir etapa "${stage.name}"?`);
    if (!confirmed) return;
    deleteStage(id, stage.id);
    toast.success("Etapa removida");
  };

  
  return (
    <div className="min-h-screen bg-[var(--bg-light)] px-5 pt-6 pb-12 md:px-10 animate-fade-in-from-left">
      <div className="flex items-center justify-between">
        <Link
          className="font-azeret text-[13px] text-[var(--font-secondary)] underline underline-offset-4 hover:text-[var(--font-primary)] transition-colors"
          href="/"
        >
          ← Voltar
        </Link>
        <nav className="flex items-center gap-5">
          <button
            type="button"
            onClick={handleEdit}
            className="font-azeret text-[13px] text-[var(--font-secondary)] underline underline-offset-4 hover:text-[var(--font-primary)] transition-colors cursor-pointer"
          >
            Editar
          </button>
          {process.status !== "CLOSED" && (
            <button
              type="button"
              onClick={() => setIsCloseDialogOpen(true)}
              className="font-azeret text-[13px] text-[var(--font-secondary)] underline underline-offset-4 hover:text-[var(--font-primary)] transition-colors cursor-pointer"
            >
              Encerrar
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="font-azeret text-[13px] text-red-400 underline underline-offset-4 hover:text-red-600 transition-colors cursor-pointer"
          >
            Excluir
          </button>
        </nav>
      </div>

      {/* Card de informações do processo */}
      <section className="mt-5 w-full max-w-2xl rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.06)]">
        {/* Status + datas */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge color={STATUS_COLORS[process.status]}>
            {STATUS_LABELS[process.status]}
          </Badge>
          <span className="font-azeret text-[11px] text-[var(--font-secondary)] opacity-60 tabular-nums">
            {formatDate(process.startDate)}
          </span>
          <span className="font-azeret text-[11px] text-[var(--font-secondary)] opacity-40 tabular-nums">
            há {getDaysAgo(process.startDate)}
          </span>
        </div>

        {/* Cargo (label) → Empresa (protagonista) */}
        <p className="font-azeret text-[11px] uppercase tracking-[0.1em] text-[var(--font-secondary)] leading-none mb-1.5">
          {process.position}
        </p>
        <h1 className="font-azeret text-[15px] font-bold text-[var(--font-primary)] leading-snug">
          {process.company}
        </h1>

        {process.description ? (
          <>
            <div className="mt-4 mb-3.5 h-px bg-[var(--card-border)] opacity-40" />
            <p className="font-azeret text-[13px] text-[var(--font-secondary)] leading-relaxed">
              {process.description}
            </p>
          </>
        ) : null}
      </section>

      {/* Linha do tempo */}
      <section className="mt-8 w-full max-w-2xl">
        <p className="font-azeret text-[11px] uppercase tracking-[0.1em] text-[var(--font-secondary)] opacity-60 mb-1">
          Linha do tempo
        </p>
        <ProcessTimeline
          stages={process.stages}
          onAddStage={handleOpenNewStage}
          onEditStage={handleOpenEditStage}
          onDeleteStage={handleDeleteStage}
        />
      </section>

      {process.closedReason ? (
        <section className="mt-8 w-full max-w-2xl rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.06)]">
          <p className="font-azeret text-[11px] uppercase tracking-[0.1em] text-[var(--font-secondary)] opacity-60 mb-1.5">Motivo do encerramento</p>
          <p className="font-azeret text-[13px] text-[var(--font-secondary)] leading-relaxed">{process.closedReason}</p>
        </section>
      ) : null}
      <CloseProcessDialog
        open={isCloseDialogOpen}
        onClose={() => setIsCloseDialogOpen(false)}
        onConfirm={handleCloseConfirm}
      />
      <DeleteAlertDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        processName={`${process.position} na ${process.company}`}
      />
      <StageDialog
        open={isStageDialogOpen}
        onClose={() => {
          setIsStageDialogOpen(false);
          setEditingStage(undefined);
        }}
        onConfirm={handleSaveStage}
        initialValues={editingStage}
      />
    </div>
  );
};
