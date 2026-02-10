import EditProcessClient from "./EditProcessClient";

// Permitir rotas dinamicas que nao sao pre-renderizadas em build time.
export const dynamicParams = true;

type PageProps = {
  // Em Next.js 16+, params é uma Promise e precisa ser await
  params: Promise<{
    id: string;
  }>;
};

/**
 * Server component que resolve o ID do parâmetro dinâmico
 * e delega para o client component.
 */
export default async function EditProcessPage({ params }: PageProps) {
  const { id } = await params;
  return <EditProcessClient processId={id} />;
}
