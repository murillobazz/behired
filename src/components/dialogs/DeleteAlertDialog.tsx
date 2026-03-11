"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "./Dialog";

type DeleteAlertDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  processName: string;
};

export const DeleteAlertDialog = ({
  open,
  onClose,
  onConfirm,
  processName,
}: DeleteAlertDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} title="Excluir processo">
      <p className="mb-6 text-sm text-[var(--font-secondary)]">
        Tem certeza que deseja excluir{" "}
        <strong className="text-[var(--font-primary)]">{processName}</strong>?
        Esta ação não pode ser desfeita.
      </p>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Sim, excluir
        </Button>
      </div>
    </Dialog>
  );
};
