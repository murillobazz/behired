import type { Process } from "@/types";
import { formatDate, getDaysAgo } from "@/lib/date-utils";

const getCurrentStage = (process: Process) => {
  return process.stages[process.currentStageIndex] ?? process.stages[0];
};

export const ProcessCard = ({ process }: { process: Process }) => {
  const currentStage = getCurrentStage(process);
  const isClosed = process.status === "CLOSED";

  return (
    <article
      className={`w-[260px] rounded border border-[var(--card-border)] bg-white px-4 py-3 shadow-[1px_1px_3px_rgba(0,0,0,0.25)] transition-transform ${
        isClosed ? "opacity-50" : "opacity-90 hover:-translate-y-0.5"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-azeret text-[16px] text-[var(--font-primary)]">
            {process.position}
          </p>
          <p className="font-azeret text-[14px] font-bold text-[var(--font-primary)]">
            {process.company}
          </p>
        </div>
        <span className="font-azeret text-[14px] text-[var(--font-primary)]">
          {getDaysAgo(process.startDate)}
        </span>
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
      </div>
    </article>
  );
};
