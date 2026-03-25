"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ProcessCard } from "@/components/ProcessCard";
import type { Process } from "@/types";

type SortableProcessCardProps = {
  process: Process;
  index?: number;
};

export function SortableProcessCard({ process, index = 0 }: SortableProcessCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: process.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        // CSS.Translate evita conflito com animations CSS que usam transform (scale)
        transform: CSS.Translate.toString(transform),
        transition,
        // Invisível durante drag — DragOverlay renderiza o clone flutuante
        opacity: isDragging ? 0.5 : 1,
        // Impede que o browser intercepte touches como scroll durante drag
        touchAction: "none",
      }}
      {...attributes}
      {...listeners}
      className="w-full sm:max-w-[360px] select-none cursor-grab active:cursor-grabbing"
    >
      {/* Animação de entrada aplicada no filho para não conflitar com transforms do DnD */}
      <div
        className="animate-fade-scale"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <ProcessCard process={process} />
      </div>
    </div>
  );
}
