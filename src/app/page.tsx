"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { ProcessCard } from "@/components/ProcessCard";
import { ProcessFilters } from "@/components/ProcessFilters";
import { useProcesses } from "@/hooks/use-processes";

export default function Home() {
  // Estados de busca e filtro local
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Busca processos do contexto global
  const { processes } = useProcesses();

  // Filtra processos baseado nos critérios de busca
  const filteredProcesses = useMemo(() => {
    return processes.filter((process) => {
      const matchesSearch =
        process.company.toLowerCase().includes(search.toLowerCase()) ||
        process.position.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status ? process.status === status : true;

      return matchesSearch && matchesStatus;
    });
  }, [processes, search, status]);

  return (
    <div className="min-h-screen bg-[var(--bg-light)] text-[var(--font-primary)]">
      <main className="px-12 pb-20 pt-10">
        <div className="inline-flex w-fit flex-col items-start">
          <PageHeader
            isFiltersOpen={showFilters}
            onToggleFilters={() => setShowFilters((prev) => !prev)}
          />
          {showFilters ? (
            <ProcessFilters
              search={search}
              status={status}
              onSearchChange={setSearch}
              onStatusChange={setStatus}
            />
          ) : null}
        </div>
        <section className="mt-8 flex flex-col gap-4">
          {/* Lista mockada de processos para validar UI/UX */}
          {filteredProcesses.length > 0 ? (
            filteredProcesses.map((process) => (
              <ProcessCard key={process.id} process={process} />
            ))
          ) : (
            <p className="text-sm text-[var(--font-secondary)]">
              Nenhum processo encontrado.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
