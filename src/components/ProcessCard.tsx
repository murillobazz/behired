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
      className={`relative w-full rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.09),0_1px_4px_rgba(0,0,0,0.07)] ${
        isClosed ? "opacity-40" : ""
      }`}
    >
      {/* Indicador de status no canto — linha fina em L */}
      <span
        aria-hidden
        className="absolute right-0 top-0 h-5 w-5 rounded-tr border-r border-t"
        style={{ borderColor: STATUS_COLORS[process.status] }}
      />

      {/* Linha superior: cargo + empresa / data de início */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <p className="font-azeret text-[11px] uppercase tracking-[0.1em] text-[var(--font-secondary)] leading-none mb-1.5 truncate">
            {process.position}
          </p>
          <p className="font-azeret text-[15px] font-bold text-[var(--font-primary)] truncate leading-snug">
            {process.company}
          </p>
        </div>
        <p className="font-azeret text-[11px] text-[var(--font-secondary)] opacity-60 shrink-0 leading-none mt-0.5 tabular-nums">
          há {getDaysAgo(process.startDate)}
        </p>
      </div>

      {/* Divisória sutil */}
      <div className="mt-4 mb-3.5 h-px bg-[var(--card-border)] opacity-40" />

      {/* Linha inferior: etapa atual / data / link */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-[6px] w-[6px] shrink-0 rounded-full"
          style={{ backgroundColor: STATUS_COLORS[process.status] }}
        />
        <span className="font-azeret text-[13px] text-[var(--font-secondary)] min-w-0 flex-1 truncate">
          {displayStage?.name ?? "—"}
        </span>
        <span className="font-azeret text-[12px] text-[var(--font-secondary)] opacity-50 shrink-0 tabular-nums">
          {displayStage ? formatDate(displayStage.date) : "—"}
        </span>
        <Link
          href={`/process/${process.id}`}
          aria-label={`Ver detalhes: ${process.position} na ${process.company}`}
          className="ml-0.5 inline-flex shrink-0 items-center justify-center h-7 w-7 rounded-full border border-[var(--card-border)] text-[var(--font-secondary)] transition-all hover:bg-[var(--brand-green)] hover:text-white hover:border-[var(--brand-green)]"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
};
