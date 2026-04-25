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
      lastModified: new Date().toISOString(),
      currentStageIndex: 0,
    });
    toast.success("Processo criado com sucesso!");

    // Redireciona para a lista após criar
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)] px-5 pt-6 pb-12 md:px-10 animate-fade-in-from-left">
      <Link
        className="font-azeret text-[13px] text-[var(--font-secondary)] underline underline-offset-4 hover:text-[var(--font-primary)] transition-colors"
        href="/"
      >
        ← Voltar
      </Link>
      <section className="mt-5 w-full max-w-2xl rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.06)]">
        <p className="font-azeret text-[11px] uppercase tracking-[0.1em] text-[var(--font-primary)] mb-5">
          Novo processo
        </p>
        <ProcessForm onSubmit={handleSubmit} onCancel={() => router.push("/")} />
      </section>
    </div>
  );
}
