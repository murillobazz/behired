import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Process } from "@/types";
import { STATUS_COLORS } from "@/lib/constants";
import { formatDate, getDaysAgo } from "@/lib/date-utils";

const getCurrentStage = (process: Process) => {
  return process.stages[process.currentStageIndex] ?? process.stages[0];
};

export const ProcessCard = ({ process }: { process: Process }) => {
  const currentStage = getCurrentStage(process);
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
        <div>
          <p className="font-azeret text-[16px] text-[var(--font-primary)]">
            {process.position}
          </p>
          <p className="font-azeret text-[14px] font-bold text-[var(--font-primary)]">
            {process.company}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="font-azeret text-[14px] text-[var(--font-primary)]">
            {getDaysAgo(process.startDate)}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-4 w-2 items-center justify-center">
            {/* Indicador simples da etapa atual */}
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--font-primary)]" />
          </span>
          <span className="font-azeret text-[14px] text-[var(--font-secondary)]">
            {currentStage?.name}
          </span>
        </div>
        <span className="font-azeret text-[14px] text-[var(--font-primary)]">
          {currentStage ? formatDate(currentStage.date) : "-"}
        </span>
        <Link
          href={`/process/${process.id}`}
          aria-label={`Ver detalhes: ${process.position} na ${process.company}`}
          className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-[var(--font-secondary)] text-[var(--font-secondary)] transition-all hover:bg-[var(--brand-green)] hover:text-white hover:border-[var(--brand-green)]"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};
