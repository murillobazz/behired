"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { ProcessFilters } from "@/components/ProcessFilters";
import { SortableProcessCard } from "@/components/SortableProcessCard";
import { useProcesses } from "@/hooks/use-processes";

export default function Home() {
  const { processes } = useProcesses();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Ordem manual dos cards via drag and drop (inicializa com a ordem dos dados)
  const [orderedIds, setOrderedIds] = useState<string[]>(() =>
    processes.map((p) => p.id),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Exige 8px de movimento antes de ativar o drag, preservando cliques normais.
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Deriva a ordem final fundindo a ordem manual com processos novos/removidos
  const mergedIds = useMemo(() => {
    const allIds = processes.map((p) => p.id);
    const kept = orderedIds.filter((id) => allIds.includes(id));
    const fresh = allIds.filter((id) => !kept.includes(id));
    return [...kept, ...fresh];
  }, [processes, orderedIds]);

  const filteredProcesses = useMemo(() => {
    const indexMap = new Map(mergedIds.map((id, i) => [id, i]));
    return processes
      .filter((process) => {
        const matchesSearch =
          process.company.toLowerCase().includes(search.toLowerCase()) ||
          process.position.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status ? process.status === status : true;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const ai = indexMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
        const bi = indexMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;
        return ai - bi;
      });
  }, [processes, search, status, mergedIds]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // Atualiza a ordem completa, mantendo consistência com filtros e itens novos.
    const next = mergedIds.filter((id) => id !== activeId);
    const targetIndex = next.indexOf(overId);
    if (targetIndex < 0) {
      next.push(activeId);
    } else {
      next.splice(targetIndex, 0, activeId);
    }
    setOrderedIds(next);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)] text-[var(--font-primary)]">
      <main className="px-5 py-6 md:px-10 animate-fade-in-from-left">
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
          {filteredProcesses.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredProcesses.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                {filteredProcesses.map((process, index) => (
                  <SortableProcessCard key={process.id} process={process} index={index} />
                ))}
              </SortableContext>
            </DndContext>
          ) : processes.length === 0 ? (
            <EmptyState
              title="Bem-vindo ao Behired!"
              description="Organize e acompanhe seus processos seletivos em um só lugar. Crie seu primeiro processo agora mesmo."
              action={
                <div className="flex flex-col gap-4">
                  <Link
                    href="/process/new"
                    className="font-azeret text-sm underline text-[var(--brand-green)] hover:opacity-70 transition-opacity"
                  >
                    + Criar primeiro processo
                  </Link>
                  <p className="text-xs text-[var(--font-secondary)] max-w-xs">
                    💾 Seus dados ficam salvos automaticamente no seu navegador — sem conta, sem servidor.
                  </p>
                </div>
              }
            />
          ) : (
            <EmptyState
              icon={<SearchX className="h-5 w-5" />}
              title="Nenhum processo encontrado"
              description="Tente ajustar os filtros ou crie seu primeiro processo seletivo."
            />
          )}
        </section>
      </main>
    </div>
  );
}
