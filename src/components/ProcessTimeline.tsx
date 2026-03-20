import { Button } from "@/components/ui/button";
import type { Stage } from "@/types";
import { formatDate } from "@/lib/date-utils";

const getStageState = (stage: Stage) => {
  if (stage.completed) {
    return "completed";
  }
  return "current";
};

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
  // Ordena as etapas do processo da mais recente para a mais antiga
  const sortedStages = [...stages].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="mt-3 space-y-4">
      {/* Timeline vertical com etapas do processo */}
      {sortedStages.map((stage, index) => {
        const state = getStageState(stage);
        const indicatorClass =
          state === "completed"
            ? "bg-[#3a5a40]"
            : "border-2 border-[#3a5a40] bg-white";

        const animationDelay = `${index * 50}ms`;

        return (
          <div key={stage.id} className="flex items-start gap-4 animate-fade-up" style={{ animationDelay }}>
            <div className="flex flex-col items-center">
              <span
                className={`h-3 w-3 rounded-full ${indicatorClass}`}
                aria-hidden
              />
              {index < sortedStages.length - 1 ? (
                <span className="mt-2 h-8 w-px bg-[#cfcfcf]" aria-hidden />
              ) : null}
            </div>
            <div className="group rounded px-1 py-1 transition-colors hover:bg-[#f7f7f5]">
              <div className="flex items-center gap-3">
                <h3 className="font-azeret text-[16px] font-bold text-[var(--font-primary)]">
                  {stage.name}
                </h3>
                <span className="text-xs text-[var(--font-secondary)]">
                  {formatDate(stage.date)}
                </span>
                {onEditStage ? (
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => onEditStage(stage)}
                  >
                    Editar
                  </Button>
                ) : null}
                {onDeleteStage ? (
                  <Button
                    size="xs"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => onDeleteStage(stage)}
                  >
                    Excluir
                  </Button>
                ) : null}
              </div>
              {stage.description ? (
                <p className="mt-1 text-sm text-[var(--font-secondary)]">
                  {stage.description}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
      {onAddStage ? (
        <Button variant="outline" className="mt-2" onClick={onAddStage}>
          + Adicionar etapa
        </Button>
      ) : null}
    </div>
  );
};
