import Link from "next/link";

export const PageHeader = () => {
  return (
    <header className="flex flex-col gap-3">
      <h1 className="font-averia text-[40px] leading-none text-[var(--brand-green)]">
        Behired
      </h1>
      <nav className="flex items-center gap-6 text-[16px] text-black">
        <Link className="underline underline-offset-4" href="#">
          + Novo processo
        </Link>
        <Link className="underline underline-offset-4" href="/login">
          &gt; Sair
        </Link>
      </nav>
    </header>
  );
};
