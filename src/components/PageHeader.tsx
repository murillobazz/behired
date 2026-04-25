"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { useProcesses } from "@/hooks/use-processes";

type PageHeaderProps = {
  onToggleFilters?: () => void;
  isFiltersOpen?: boolean;
};

const HELP_ITEMS = [
  { label: "+ Novo", description: "Abre o formulário para cadastrar um novo processo seletivo." },
  { label: "< Filtros", description: "Exibe campos para filtrar os processos por nome, empresa ou status." },
  { label: "↓ Importar", description: "Importa um arquivo .json exportado anteriormente, restaurando seus processos." },
  { label: "↑ Exportar", description: "Baixa um arquivo .json com todos os seus processos e etapas para backup." },
];

export const PageHeader = ({
  onToggleFilters,
  isFiltersOpen,
}: PageHeaderProps) => {
  const { exportProcesses, importProcesses } = useProcesses();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importProcesses(file);
      toast.success("Dados importados com sucesso!");
    } catch {
      toast.error("Erro ao importar: arquivo inválido.");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <header className="flex flex-col gap-3">
      <h1 className="font-averia text-[40px] leading-none text-[var(--brand-green)]">
        Behired
      </h1>
      <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-black">
        <Link href="/process/new">
          + <span className="underline underline-offset-4">Novo</span>
        </Link>
        <button
          type="button"
          className="cursor-pointer"
          onClick={onToggleFilters}
        >
          {isFiltersOpen ? "x " : "< "}
          <span className={`cursor-pointer ${isFiltersOpen ? "no-underline" : "underline underline-offset-4"
            }`}>Filtros</span>
        </button>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          ↓ <span className="underline underline-offset-4">Importar</span>
        </button>
        <button
          type="button"
          className="cursor-pointer"
          onClick={exportProcesses}
        >
          ↑ <span className="underline underline-offset-4">Exportar</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />

        {/* Botão de ajuda */}
        <div className="relative flex">
          <button
            type="button"
            aria-label="Ajuda"
            title="Ajuda"
            className="cursor-pointer"
            onClick={() => setHelpOpen((v) => !v)}
          >
            {/* <CircleHelp className="h-4 w-4 text-[var(--font-primary)]" /> */}
            <span className="underline underline-offset-4">{helpOpen ? "x" : "?"}</span>
          </button>

          {helpOpen && (
            <>
              {/* Overlay para fechar ao clicar fora */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setHelpOpen(false)}
              />
              <div className="absolute md:left-0 left-[-85px] top-7 z-20 w-72 rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-[2px_4px_12px_rgba(0,0,0,0.12)]">
                <ul className="space-y-3">
                  {HELP_ITEMS.map((item) => (
                    <li key={item.label}>
                      <span className="font-azeret text-[12px] font-bold text-[var(--font-primary)]">
                        {item.label}
                      </span>
                      <p className="mt-0.5 font-azeret text-[12px] text-[var(--font-secondary)] leading-snug">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
