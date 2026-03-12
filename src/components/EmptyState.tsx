import type { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
};

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <section className="rounded border border-dashed border-[var(--card-border)] bg-white/70 p-8 text-center">
      {icon ? <div className="mb-3 flex justify-center text-[var(--font-secondary)]">{icon}</div> : null}
      <h2 className="font-azeret text-[18px] font-semibold text-[var(--font-primary)]">{title}</h2>
      <p className="mt-2 text-sm text-[var(--font-secondary)]">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </section>
  );
};
