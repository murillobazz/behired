"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { DEFAULT_STAGES } from "@/lib/constants";
import type { Stage } from "@/types";
import { Dialog } from "./Dialog";

const STAGE_OPTIONS = [...DEFAULT_STAGES, "Outro"];

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

  const getInitialSelect = (name?: string) => {
    if (!name) return DEFAULT_STAGES[0];
    return DEFAULT_STAGES.includes(name) ? name : "Outro";
  };

  const [selectedOption, setSelectedOption] = useState(() => getInitialSelect(initialValues?.name));
  const [customName, setCustomName] = useState(
    initialValues?.name && !DEFAULT_STAGES.includes(initialValues.name)
      ? initialValues.name
      : "",
  );
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [date, setDate] = useState(initialValues?.date ?? today);
  const [completed, setCompleted] = useState(initialValues?.completed ?? false);

  useEffect(() => {
    if (open) {
      setSelectedOption(getInitialSelect(initialValues?.name));
      setCustomName(
        initialValues?.name && !DEFAULT_STAGES.includes(initialValues.name)
          ? initialValues.name
          : "",
      );
      setDescription(initialValues?.description ?? "");
      setDate(initialValues?.date ?? today);
      setCompleted(initialValues?.completed ?? false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const effectiveName = selectedOption === "Outro" ? customName : selectedOption;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveName.trim()) return;
    onConfirm({ name: effectiveName.trim(), description: description.trim(), date, completed });
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
          <Label htmlFor="stage-name">Nome da etapa</Label>
          <select
            id="stage-name"
            className="mt-1 w-full rounded border border-[var(--card-border)] bg-white px-3 py-2 font-azeret text-sm text-[var(--font-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {STAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {selectedOption === "Outro" && (
          <div>
            <Label htmlFor="stage-custom-name">Nome personalizado</Label>
            <Input
              id="stage-custom-name"
              className="mt-1"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Ex: Entrevista com CTO"
              required
              autoFocus
            />
          </div>
        )}

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
