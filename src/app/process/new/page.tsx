"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { ProcessForm, type ProcessFormValues } from "@/components/forms/ProcessForm";
import { useProcesses } from "@/hooks/use-processes";

/**
 * Página de criação de novo processo seletivo.
 * Usa contexto global para persistir o processo criado.
 */
export default function NewProcessPage() {
  const router = useRouter();
  const { createProcess } = useProcesses();

  const handleSubmit = (values: ProcessFormValues) => {
    // Cria o processo através do contexto
    createProcess({
      company: values.company,
      position: values.position,
      description: values.description,
      status: values.status,
      startDate: values.startDate,
      currentStageIndex: 0,
    });
    toast.success("Processo criado com sucesso!");

    // Redireciona para a lista após criar
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)] px-12 py-10 animate-fade-in-from-left">
      <Link className="underline underline-offset-4" href="/">
        ← Voltar para processos
      </Link>
      <section className="mt-6 max-w-3xl rounded border border-[var(--card-border)] bg-white p-6 shadow-[1px_1px_3px_rgba(0,0,0,0.15)]">
        <h1 className="text-[20px] font-semibold text-[var(--font-primary)]">
          Criar novo processo
        </h1>
        <p className="mt-2 text-sm text-[var(--font-secondary)]">
          Preencha os dados principais da vaga.
        </p>
        <div className="mt-6">
          <ProcessForm onSubmit={handleSubmit} />
        </div>
      </section>
    </div>
  );
}
