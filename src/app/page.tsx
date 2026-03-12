"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { ProcessCard } from "@/components/ProcessCard";
import { ProcessFilters } from "@/components/ProcessFilters";
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
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

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

  const handleDrop = (targetId: string) => {
    if (!draggingId || draggingId === targetId) return;
    // Usa a ordem já mesclada para manter consistência com filtros e novos itens.
    const snapshot = mergedIds;
    const next = snapshot.filter((id) => id !== draggingId);
    const targetIndex = next.indexOf(targetId);
    if (targetIndex < 0) {
      next.push(draggingId);
    } else {
      next.splice(targetIndex, 0, draggingId);
    }
    setOrderedIds(next);
    setDraggingId(null);
    setDragOverId(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)] text-[var(--font-primary)]">
      <main className="px-5 py-6 md:px-10">
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
            filteredProcesses.map((process) => (
              <div
                key={process.id}
                draggable
                onDragStart={(e) => {
                  setDraggingId(process.id);
                  document.body.classList.add("dnd-grabbing");
                  const el = e.currentTarget;
                  const rect = el.getBoundingClientRect();
                  // Clona fora da tela com opacidade total para evitar
                  // que navegadores (especialmente Chromium) escureçam o ghost.
                  const clone = el.cloneNode(true) as HTMLElement;
                  clone.style.position = "fixed";
                  clone.style.top = "-9999px";
                  clone.style.left = "-9999px";
                  clone.style.width = `${rect.width}px`;
                  clone.style.opacity = "1";
                  document.body.appendChild(clone);
                  // Ancora o ghost exatamente no ponto em que o usuário clicou.
                  e.dataTransfer.setDragImage(
                    clone,
                    e.clientX - rect.left,
                    e.clientY - rect.top,
                  );
                  requestAnimationFrame(() => document.body.removeChild(clone));
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dragOverId !== process.id) setDragOverId(process.id);
                }}
                onDrop={() => handleDrop(process.id)}
                onDragEnd={() => {
                  document.body.classList.remove("dnd-grabbing");
                  setDraggingId(null);
                  setDragOverId(null);
                }}
                className={[
                  "w-full select-none transition-opacity",
                  draggingId === process.id ? "cursor-grabbing opacity-40" : "cursor-grab opacity-100",
                  dragOverId === process.id && draggingId !== process.id
                    ? "rounded outline outline-2 outline-offset-2 outline-[var(--brand-green)]"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <ProcessCard process={process} />
              </div>
            ))
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
