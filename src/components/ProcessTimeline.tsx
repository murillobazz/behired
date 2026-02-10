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
};

export const ProcessTimeline = ({ stages }: ProcessTimelineProps) => {
  return (
    <div className="mt-6 space-y-4">
      {/* Timeline vertical com etapas do processo */}
      {stages.map((stage, index) => {
        const state = getStageState(stage);
        const indicatorClass =
          state === "completed"
            ? "bg-[#3a5a40]"
            : "border-2 border-[#3a5a40] bg-white";

        return (
          <div key={stage.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`h-3 w-3 rounded-full ${indicatorClass}`}
                aria-hidden
              />
              {index < stages.length - 1 ? (
                <span className="mt-2 h-8 w-px bg-[#cfcfcf]" aria-hidden />
              ) : null}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-azeret text-[16px] font-bold text-[var(--font-primary)]">
                  {stage.name}
                </h3>
                <span className="text-xs text-[var(--font-secondary)]">
                  {formatDate(stage.date)}
                </span>
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
    </div>
  );
};
