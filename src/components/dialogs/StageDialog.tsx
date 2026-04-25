"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { DEFAULT_STAGES } from "@/lib/constants";
import type { Stage } from "@/types";
import { Dialog } from "./Dialog";

const labelClass = "font-azeret text-[10px] uppercase tracking-[0.1em] text-[var(--font-secondary)] opacity-70";
const fieldClass = "font-azeret text-[13px] h-9 w-full rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-3 outline-none transition-colors focus-visible:border-[var(--brand-green)] placeholder:text-[var(--font-secondary)] placeholder:opacity-40";

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="stage-name" className={labelClass}>Nome da etapa</Label>
          <select
            id="stage-name"
            className={fieldClass}
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
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="stage-custom-name" className={labelClass}>Nome personalizado</Label>
            <Input
              id="stage-custom-name"
              className={fieldClass}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Ex: Entrevista com CTO"
              required
              autoFocus
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="stage-desc" className={labelClass}>Descrição (opcional)</Label>
          <Textarea
            id="stage-desc"
            className="font-azeret text-[13px] min-h-[72px] w-full rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2 outline-none transition-colors focus-visible:border-[var(--brand-green)] placeholder:text-[var(--font-secondary)] placeholder:opacity-40 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalhes sobre esta etapa"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="stage-date" className={labelClass}>Data</Label>
          <Input
            id="stage-date"
            type="date"
            className={fieldClass}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <input
            id="stage-completed"
            type="checkbox"
            className="accent-[var(--brand-green)] h-3.5 w-3.5 cursor-pointer"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <Label htmlFor="stage-completed" className={`${labelClass} cursor-pointer normal-case tracking-normal text-[12px] opacity-80`}>
            Etapa concluída
          </Label>
        </div>

        <div className="h-px bg-[var(--card-border)] opacity-40" />

        <div className="flex items-center gap-6">
          <button
            type="submit"
            className="font-azeret text-[13px] text-[var(--brand-green)] underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer"
          >
            {isEditing ? "Salvar" : "Adicionar"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="font-azeret text-[13px] text-[var(--font-secondary)] underline underline-offset-4 hover:text-[var(--font-primary)] transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Dialog>
  );
};
