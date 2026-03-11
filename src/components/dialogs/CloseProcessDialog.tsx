"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { STATUS_LABELS } from "@/lib/constants";
import type { ProcessStatus } from "@/types";
import { Dialog } from "./Dialog";

const CLOSE_STATUSES: ProcessStatus[] = ["APPROVED", "REJECTED", "CLOSED"];

type CloseProcessDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (status: ProcessStatus, reason: string) => void;
};

export const CloseProcessDialog = ({
  open,
  onClose,
  onConfirm,
}: CloseProcessDialogProps) => {
  const [selectedStatus, setSelectedStatus] = useState<ProcessStatus>("CLOSED");
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(selectedStatus, reason.trim());
    setReason("");
    setSelectedStatus("CLOSED");
  };

  const handleClose = () => {
    setReason("");
    setSelectedStatus("CLOSED");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} title="Encerrar processo">
      <div className="space-y-4">
        <div>
          <Label>Resultado</Label>
          <div className="mt-2 space-y-2">
            {CLOSE_STATUSES.map((s) => (
              <label key={s} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="close-status"
                  value={s}
                  checked={selectedStatus === s}
                  onChange={() => setSelectedStatus(s)}
                  className="accent-[var(--brand-green)]"
                />
                <span className="text-sm text-[var(--font-primary)]">
                  {STATUS_LABELS[s]}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="close-reason">Motivo (opcional)</Label>
          <Textarea
            id="close-reason"
            className="mt-1"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Descreva o motivo do encerramento..."
            rows={3}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Encerrar</Button>
        </div>
      </div>
    </Dialog>
  );
};
