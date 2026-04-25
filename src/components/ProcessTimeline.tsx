import type { Stage } from "@/types";
import { formatDate } from "@/lib/date-utils";

type ProcessTimelineProps = {
  stages: Stage[];
  onAddStage?: () => void;
  onEditStage?: (stage: Stage) => void;
  onDeleteStage?: (stage: Stage) => void;
};

export const ProcessTimeline = ({
  stages,
  onAddStage,
  onEditStage,
  onDeleteStage,
}: ProcessTimelineProps) => {
  const sortedStages = [...stages].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="mt-4">
      {sortedStages.map((stage, index) => {
        const isDone = stage.completed;
        const isLast = index === sortedStages.length - 1;
        const animationDelay = `${index * 50}ms`;

        return (
          <div
            key={stage.id}
            className="flex items-stretch animate-fade-up"
            style={{ animationDelay }}
          >
            {/* Coluna de data — estilo ledger/arquivo */}
            <div className="w-[68px] shrink-0 pt-[1px] pr-3 text-right">
              <span
                className="font-azeret text-[10px] tabular-nums leading-none tracking-wide text-[var(--font-secondary)] opacity-50"
              >
                {formatDate(stage.date)}
              </span>
            </div>

            {/* Ponto + linha conectora */}
            <div className="flex flex-col items-center">
              <span
                aria-hidden
                className={`mt-[1px] h-[7px] w-[7px] shrink-0 rounded-full transition-colors ${
                  isDone
                    ? "bg-[var(--brand-green)]"
                    : "border border-[var(--brand-green)] bg-[var(--bg-light)]"
                }`}
              />
              {!isLast && (
                <span
                  aria-hidden
                  className="mt-2 flex-1 w-px bg-[var(--card-border)] opacity-40"
                />
              )}
            </div>

            {/* Conteúdo */}
            <div className="group flex-1 pl-4 pb-6">
              <h3 className="font-azeret text-[13px] font-bold text-[var(--font-primary)] leading-none">
                {stage.name}
              </h3>
              {stage.description ? (
                <p className="mt-1.5 font-azeret text-[12px] text-[var(--font-secondary)] leading-relaxed">
                  {stage.description}
                </p>
              ) : null}

              {/* Ações — mesma linguagem do restante do UI */}
              {(onEditStage || onDeleteStage) && (
                <div className="mt-2 flex items-center gap-4">
                  {onEditStage && (
                    <button
                      type="button"
                      onClick={() => onEditStage(stage)}
                      className="font-azeret text-[11px] text-[var(--font-secondary)] underline underline-offset-2 opacity-100 md:opacity-0 md:group-hover:opacity-60 hover:!opacity-100 transition-opacity cursor-pointer"
                    >
                      Editar
                    </button>
                  )}
                  {onDeleteStage && (
                    <button
                      type="button"
                      onClick={() => onDeleteStage(stage)}
                      className="font-azeret text-[11px] text-red-400 underline underline-offset-2 opacity-100 md:opacity-0 md:group-hover:opacity-60 hover:!opacity-100 transition-opacity cursor-pointer"
                    >
                      Excluir
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Botão de adição alinhado à coluna de conteúdo */}
      {onAddStage && (
        <div className="flex items-center">
          <div className="w-[68px] shrink-0" />
          <div className="w-[7px] shrink-0" />
          <button
            type="button"
            onClick={onAddStage}
            className="ml-4 font-azeret text-[12px] text-[var(--font-secondary)] underline underline-offset-4 hover:text-[var(--font-primary)] transition-colors cursor-pointer"
          >
            + Adicionar etapa
          </button>
        </div>
      )}
    </div>
  );
};
