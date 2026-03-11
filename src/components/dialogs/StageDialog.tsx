"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import type { Stage } from "@/types";
import { Dialog } from "./Dialog";

type StageDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (stage: Omit<Stage, "id">) => void;
  initialValues?: Stage;
};

export const StageDialog = ({
  open,
  onClose,
  onConfirm,
  initialValues,
}: StageDialogProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [date, setDate] = useState(initialValues?.date ?? today);
  const [completed, setCompleted] = useState(initialValues?.completed ?? false);

  // Reidrata os campos ao abrir o modal para refletir os valores atuais.
  useEffect(() => {
    if (open) {
      setName(initialValues?.name ?? "");
      setDescription(initialValues?.description ?? "");
      setDate(initialValues?.date ?? today);
      setCompleted(initialValues?.completed ?? false);
    }
    // Mantemos apenas "open" para resetar o formulário a cada abertura.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onConfirm({ name: name.trim(), description: description.trim(), date, completed });
  };

  const isEditing = !!initialValues;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEditing ? "Editar etapa" : "Adicionar etapa"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="stage-name">Nome</Label>
          <Input
            id="stage-name"
            className="mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Entrevista técnica"
            required
          />
        </div>
        <div>
          <Label htmlFor="stage-desc">Descrição (opcional)</Label>
          <Textarea
            id="stage-desc"
            className="mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalhes sobre esta etapa"
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="stage-date">Data</Label>
          <Input
            id="stage-date"
            type="date"
            className="mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="stage-completed"
            type="checkbox"
            className="accent-[var(--brand-green)]"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <Label htmlFor="stage-completed" className="cursor-pointer">
            Etapa concluída
          </Label>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{isEditing ? "Salvar" : "Adicionar"}</Button>
        </div>
      </form>
    </Dialog>
  );
};
