"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

type ProcessFiltersProps = {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export const ProcessFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ProcessFiltersProps) => {
  return (
    <section className="mt-0 w-full border-b border-l border-r border-[var(--card-border)] px-4 pb-4 pt-3">
      {/* Gaveta de filtros alinhada ao menu acima */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Label htmlFor="search">Buscar</Label>
          <Input
            id="search"
            placeholder="Buscar por empresa ou cargo"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="h-9 rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] px-3 text-sm shadow-sm outline-none transition-colors focus-visible:border-[var(--brand-green)]"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="">Todos</option>
            <option value="APPLIED">Aplicado</option>
            <option value="IN_PROGRESS">Em andamento</option>
            <option value="APPROVED">Aprovado</option>
            <option value="REJECTED">Rejeitado</option>
            <option value="CLOSED">Encerrado</option>
          </select>
        </div>
      </div>
    </section>
  );
};
