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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const animationDelay = `${index * 50}ms`;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        animationDelay,
      }}
      {...attributes}
      {...listeners}
      className="w-full sm:max-w-[360px] select-none touch-manipulation cursor-grab active:cursor-grabbing animate-fade-scale"
    >
      <ProcessCard process={process} />
    </div>
  );
}
