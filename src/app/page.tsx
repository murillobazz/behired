"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { ProcessCard } from "@/components/ProcessCard";
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

  // Estado do card sendo arrastado e largura capturada do elemento real
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overlayWidth, setOverlayWidth] = useState<number | null>(null);
  // Snapshot da ordem antes do drag para restaurar no caso de cancel
  const preDragOrder = useRef<string[]>([]);

  const activeProcess = activeId
    ? (processes.find((p) => p.id === activeId) ?? null)
    : null;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Exige 8px de movimento antes de ativar o drag, preservando cliques normais.
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      // Long press de 250ms para diferenciar drag de scroll no mobile.
      activationConstraint: { delay: 250, tolerance: 12 },
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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
    preDragOrder.current = [...orderedIds];
    // Captura a largura exata do card arrastado para o overlay replicar
    const rect = event.active.rect.current?.initial;
    if (rect) setOverlayWidth(rect.width);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedId = String(active.id);
    const overId = String(over.id);

    // Reordena em tempo real para que os outros cards se movam enquanto arrasta
    setOrderedIds((prev) => {
      const allIds = processes.map((p) => p.id);
      const merged = [
        ...prev.filter((id) => allIds.includes(id)),
        ...allIds.filter((id) => !prev.includes(id)),
      ];
      const from = merged.indexOf(draggedId);
      const to = merged.indexOf(overId);
      if (from === -1 || to === -1) return prev;
      return arrayMove(merged, from, to);
    });
  };

  const handleDragEnd = () => {
    // A ordem já foi atualizada progressivamente em onDragOver
    setActiveId(null);
    setOverlayWidth(null);
  };

  const handleDragCancel = () => {
    // Restaura a ordem original se o drag foi cancelado
    setActiveId(null);
    setOverlayWidth(null);
    setOrderedIds(preDragOrder.current);
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
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext
                items={filteredProcesses.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                {filteredProcesses.map((process, index) => (
                  <SortableProcessCard key={process.id} process={process} index={index} />
                ))}
              </SortableContext>
              <DragOverlay dropAnimation={null}>
                {activeProcess ? (
                  <div
                    style={{
                      width: overlayWidth ?? undefined,
                      transform: "rotate(1.5deg) scale(1.03)",
                      boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
                      cursor: "grabbing",
                    }}
                  >
                    <ProcessCard process={activeProcess} />
                  </div>
                ) : null}
              </DragOverlay>
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
