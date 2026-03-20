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
    <div className="min-h-screen bg-[var(--bg-light)] px-4 py-6 sm:px-6 md:px-10 md:py-10 animate-fade-in-from-left">
      <Link href={`/process/${processId}`} className="underline underline-offset-4">
        ← Voltar ao processo
      </Link>
      <section className="mt-6 w-full max-w-3xl rounded border border-[var(--card-border)] bg-white p-4 shadow-[1px_1px_3px_rgba(0,0,0,0.15)] sm:p-6">
        <h1 className="text-[20px] font-semibold text-[var(--font-primary)]">
          Editar processo
        </h1>
        <p className="mt-2 text-sm text-[var(--font-secondary)]">
          Atualize os dados do processo seletivo de {process.position} na {process.company}.
        </p>
        <div className="mt-6">
          <ProcessForm key={processId} initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
      </section>
    </div>
  );
}
