"use client";

import Link from "next/link";

type PageHeaderProps = {
  onToggleFilters?: () => void;
  isFiltersOpen?: boolean;
};

export const PageHeader = ({
  onToggleFilters,
  isFiltersOpen,
}: PageHeaderProps) => {
  return (
    <header className="flex flex-col gap-3">
      <h1 className="font-averia text-[40px] leading-none text-[var(--brand-green)]">
        Behired
      </h1>
      <nav className="flex items-center gap-6 text-[16px] text-black">
        <Link className="underline underline-offset-4" href="/process/new">
          + Novo processo
        </Link>
        <button
          type="button"
          className={`cursor-pointer ${
            isFiltersOpen ? "no-underline" : "underline underline-offset-4"
          }`}
          onClick={onToggleFilters}
        >
          {isFiltersOpen ? "x Filtros" : "< Filtros"}
        </button>
        <Link className="underline underline-offset-4" href="/login">
          &gt; Sair
        </Link>
      </nav>
    </header>
  );
};
