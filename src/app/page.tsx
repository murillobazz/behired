import { PageHeader } from "@/components/PageHeader";
import { ProcessCard } from "@/components/ProcessCard";
import { MOCK_PROCESSES } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)] text-[var(--font-primary)]">
      <main className="px-12 pb-20 pt-10">
        <PageHeader />
        <section className="mt-10 flex flex-col gap-4">
          {/* Lista mockada de processos para validar UI/UX */}
          {MOCK_PROCESSES.map((process) => (
            <ProcessCard key={process.id} process={process} />
          ))}
        </section>
      </main>
    </div>
  );
}
