import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Process } from "@/types";
import { STATUS_COLORS } from "@/lib/constants";
import { formatDate, getDaysAgo } from "@/lib/date-utils";

/**
 * Retorna a próxima etapa incompleta do processo.
 * Se todas estiverem concluídas, retorna a mais recente por data.
 */
const getDisplayStage = (process: Process) => {
  const nextIncomplete = process.stages.find((s) => !s.completed);
  if (nextIncomplete) return nextIncomplete;
  return [...process.stages].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0] ?? null;
};

export const ProcessCard = ({ process }: { process: Process }) => {
  const displayStage = getDisplayStage(process);
  const isClosed = process.status === "CLOSED";

  return (
    <article
      className={`relative w-full rounded border border-[var(--card-border)] bg-white px-4 py-3 shadow-[1px_1px_3px_rgba(0,0,0,0.25)] ${
        isClosed ? "opacity-50" : "opacity-90"
      }`}
    >
      <span
        aria-hidden
        className="absolute right-0 top-0 h-4 w-4 rounded-tr border-r-2 border-t-2"
        style={{ borderColor: STATUS_COLORS[process.status] }}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-azeret text-[16px] text-[var(--font-primary)] truncate">
            {process.position}
          </p>
          <p className="font-azeret text-[14px] font-bold text-[var(--font-primary)] truncate">
            {process.company}
          </p>
        </div>
        <div className="">
          <span className="font-azeret text-xs text-[var(--font-secondary)] opacity-60 leading-tight">
            Início há{" "}
          </span>
          <span className="font-azeret text-xs text-[var(--font-primary)] leading-tight">
            {getDaysAgo(process.startDate)}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="inline-flex h-4 w-2 shrink-0 items-center justify-center">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--font-primary)]" />
        </span>
        <span className="font-azeret text-[14px] text-[var(--font-secondary)] min-w-0 flex-1 truncate">
          {displayStage?.name ?? "-"}
        </span>
        <span className="font-azeret text-[13px] text-[var(--font-primary)] shrink-0">
          {displayStage ? formatDate(displayStage.date) : "-"}
        </span>
        <Link
          href={`/process/${process.id}`}
          aria-label={`Ver detalhes: ${process.position} na ${process.company}`}
          className="inline-flex shrink-0 items-center justify-center h-8 w-8 rounded-full border border-[var(--font-secondary)] text-[var(--font-secondary)] transition-all hover:bg-[var(--brand-green)] hover:text-white hover:border-[var(--brand-green)]"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};
