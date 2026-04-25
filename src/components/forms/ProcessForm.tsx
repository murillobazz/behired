"use client";

import * as React from "react";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import type { ProcessStatus } from "@/types";

export type ProcessFormValues = {
  company: string;
  position: string;
  description: string;
  startDate: string;
  status: ProcessStatus;
  closedReason?: string;
};

type ProcessFormProps = {
  initialValues?: Partial<ProcessFormValues>;
  defaultValues?: Partial<ProcessFormValues>;
  showClosedReason?: boolean;
  onSubmit: (values: ProcessFormValues) => void;
  onCancel?: () => void;
};

const labelClass = "font-azeret text-[10px] uppercase tracking-[0.1em] text-[var(--font-secondary)] opacity-70";
const fieldClass = "font-azeret text-[13px] h-9 w-full rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-3 outline-none transition-colors focus-visible:border-[var(--brand-green)] placeholder:text-[var(--font-secondary)] placeholder:opacity-40";

export const ProcessForm = ({
  initialValues,
  defaultValues,
  showClosedReason,
  onSubmit,
  onCancel,
}: ProcessFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values: ProcessFormValues = {
      company: String(formData.get("company") ?? "").trim(),
      position: String(formData.get("position") ?? "").trim(),
      description: String(formData.get("description") ?? ""),
      startDate: String(formData.get("startDate") ?? ""),
      status: String(formData.get("status") ?? "APPLIED") as ProcessStatus,
      closedReason: String(formData.get("closedReason") ?? "").trim() || undefined,
    };

    onSubmit(values);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company" className={labelClass}>Empresa</Label>
          <Input
            id="company"
            name="company"
            defaultValue={initialValues?.company ?? defaultValues?.company}
            placeholder="Nome da empresa"
            required
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="position" className={labelClass}>Cargo</Label>
          <Input
            id="position"
            name="position"
            defaultValue={initialValues?.position ?? defaultValues?.position}
            placeholder="Título do cargo"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description" className={labelClass}>Descrição</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={initialValues?.description ?? defaultValues?.description}
          placeholder="Resumo da vaga, requisitos, observações…"
          className="font-azeret text-[13px] min-h-[80px] w-full rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2 outline-none transition-colors focus-visible:border-[var(--brand-green)] placeholder:text-[var(--font-secondary)] placeholder:opacity-40 resize-none"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="startDate" className={labelClass}>Data de início</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={initialValues?.startDate ?? defaultValues?.startDate}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="status" className={labelClass}>Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={initialValues?.status ?? defaultValues?.status ?? "APPLIED"}
            className={fieldClass}
          >
            <option value="APPLIED">Aplicado</option>
            <option value="IN_PROGRESS">Em andamento</option>
            <option value="APPROVED">Aprovado</option>
            <option value="REJECTED">Rejeitado</option>
            <option value="CLOSED">Encerrado</option>
          </select>
        </div>
      </div>

      {showClosedReason ? (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="closedReason" className={labelClass}>Motivo do encerramento</Label>
          <Textarea
            id="closedReason"
            name="closedReason"
            defaultValue={initialValues?.closedReason ?? defaultValues?.closedReason}
            placeholder="Descreva o motivo…"
            className="font-azeret text-[13px] min-h-[80px] w-full rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2 outline-none transition-colors focus-visible:border-[var(--brand-green)] placeholder:text-[var(--font-secondary)] placeholder:opacity-40 resize-none"
          />
        </div>
      ) : null}

      <div className="h-px bg-[var(--card-border)] opacity-40" />

      <div className="flex items-center gap-6">
        <button
          type="submit"
          className="font-azeret text-[13px] text-[var(--brand-green)] underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer"
        >
          Salvar
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="font-azeret text-[13px] text-[var(--font-secondary)] underline underline-offset-4 hover:text-[var(--font-primary)] transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
