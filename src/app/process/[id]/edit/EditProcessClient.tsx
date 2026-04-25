"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "sonner";

import { ProcessForm, type ProcessFormValues } from "@/components/forms/ProcessForm";
import { useProcesses } from "@/hooks/use-processes";

/**
 * Client Component para edição de processo.
 * Busca o processo do contexto e permite atualização.
 */
export default function EditProcessClient({ processId }: { processId: string }) {
  const router = useRouter();
  const { getProcessById, updateProcess } = useProcesses();
  const process = getProcessById(processId);

  if (!process) {
    notFound();
  }
  const initialValues: ProcessFormValues = {
    company: process.company,
    position: process.position,
    description: process.description ?? "",
    status: process.status,
    startDate: process.startDate,
  };

  const handleSubmit = (values: ProcessFormValues) => {
    // Atualiza o processo através do contexto
    updateProcess(processId, {
      company: values.company,
      position: values.position,
      description: values.description,
      status: values.status,
      startDate: values.startDate,
    });
    toast.success("Alterações salvas");

    // Redireciona para o detalhe após salvar
    router.push(`/process/${processId}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)] px-5 pt-6 pb-12 md:px-10 animate-fade-in-from-left">
      <Link
        href={`/process/${processId}`}
        className="font-azeret text-[13px] text-[var(--font-secondary)] underline underline-offset-4 hover:text-[var(--font-primary)] transition-colors"
      >
        ← Voltar
      </Link>
      <section className="mt-5 w-full max-w-2xl rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="mb-5">
          <p className="font-azeret text-[11px] uppercase tracking-[0.1em] text-[var(--font-primary)] leading-none mb-1.5">
            {process.position}
          </p>
          <p className="font-azeret text-[15px] font-bold text-[var(--font-primary)] leading-snug">
            {process.company}
          </p>
        </div>
        <ProcessForm key={processId} initialValues={initialValues} onSubmit={handleSubmit} onCancel={() => router.push(`/process/${processId}`)} />
      </section>
    </div>
  );
}
