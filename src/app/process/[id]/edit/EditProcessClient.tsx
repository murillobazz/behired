"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";

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

    // Redireciona para o detalhe após salvar
    router.push(`/process/${processId}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)] px-12 py-10">
      <Link href={`/process/${processId}`} className="underline underline-offset-4">
        ← Voltar ao processo
      </Link>
      <section className="mt-6 max-w-3xl rounded border border-[var(--card-border)] bg-white p-6 shadow-[1px_1px_3px_rgba(0,0,0,0.15)]">
        <h1 className="text-[20px] font-semibold text-[var(--font-primary)]">
          Editar processo
        </h1>
        <p className="mt-2 text-sm text-[var(--font-secondary)]">
          Atualize os dados do processo seletivo de {process.position} na {process.company}.
        </p>
        <div className="mt-6">
          <ProcessForm initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
      </section>
    </div>
  );
}
