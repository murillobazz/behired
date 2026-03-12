"use client";

import * as React from "react";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
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
};

export const ProcessForm = ({
  initialValues,
  defaultValues,
  showClosedReason,
  onSubmit,
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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Empresa</Label>
          <Input
            id="company"
            name="company"
            defaultValue={initialValues?.company ?? defaultValues?.company}
            placeholder="Empresa"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Cargo</Label>
          <Input
            id="position"
            name="position"
            defaultValue={initialValues?.position ?? defaultValues?.position}
            placeholder="Cargo"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descricao</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={initialValues?.description ??  defaultValues?.description}
          placeholder="Resumo da vaga"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Data de inicio</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={initialValues?.startDate ?? defaultValues?.startDate}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={initialValues?.status ?? defaultValues?.status ?? "APPLIED"}
            className="h-9 w-full rounded-md border border-[var(--card-border)] bg-white px-3 text-sm shadow-sm outline-none transition-colors focus-visible:border-[var(--brand-green)]"
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
        <div className="space-y-2">
          <Label htmlFor="closedReason">Motivo do encerramento</Label>
          <Textarea
            id="closedReason"
            name="closedReason"
            defaultValue={initialValues?.closedReason ?? defaultValues?.closedReason}
            placeholder="Motivo do encerramento"
          />
        </div>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit">Salvar</Button>
        <Button type="button" variant="outline">
          Cancelar
        </Button>
      </div>
    </form>
  );
};
