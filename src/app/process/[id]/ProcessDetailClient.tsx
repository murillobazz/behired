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
import { Button } from "@/components/ui/button";
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
      <div className="min-h-screen bg-[var(--bg-light)] px-12 py-10 animate-fade-in-from-left">
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
      <Link className="underline underline-offset-4" href="/">
        ← Voltar para processos
      </Link>
      {/* Botões de ação */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={handleEdit} variant="outline">
          Editar
        </Button>
        {process.status !== "CLOSED" && (
          <Button onClick={() => setIsCloseDialogOpen(true)} variant="outline">
            Fechar
          </Button>
        )}
        <Button onClick={() => setIsDeleteDialogOpen(true)} variant="destructive">
          Excluir
        </Button>
      </div>
      <section className="w-fit mt-6 rounded border border-[var(--card-border)] bg-white p-6 shadow-[1px_1px_3px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-3">
          <Badge color={STATUS_COLORS[process.status]}>
            {STATUS_LABELS[process.status]}
          </Badge>
          <span className="text-xs text-[var(--font-secondary)]">
            Início: {formatDate(process.startDate)}
          </span>
          <span className="text-xs text-[var(--font-secondary)]">
            {getDaysAgo(process.startDate)}
          </span>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
          <div>
            <h1 className="font-azeret text-[20px] font-bold text-[var(--font-primary)]">
              {process.position}
            </h1>
            <p className="text-sm text-[var(--font-secondary)]">
              {process.company}
            </p>
          </div>
        </div>
        {process.description ? (
          <p className="text-sm text-[var(--font-secondary)]">
            {process.description}
          </p>
        ) : null}
      </section>
      <section className="mt-6 w-fit">
        <h2 className="font-semibold text-[var(--font-primary)]">
          Linha do tempo
        </h2>
        <ProcessTimeline
          stages={process.stages}
          onAddStage={handleOpenNewStage}
          onEditStage={handleOpenEditStage}
          onDeleteStage={handleDeleteStage}
        />
      </section>
      {process.closedReason ? (
        <section className="mt-8 rounded border border-[var(--card-border)] bg-white p-4 text-sm text-[var(--font-secondary)]">
          <span className="font-semibold">Motivo do encerramento:</span>{" "}
          {process.closedReason}
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
