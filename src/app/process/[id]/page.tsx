import { ProcessDetailClient } from "./ProcessDetailClient";

// Permitir rotas dinamicas que nao sao pre-renderizadas em build time.
export const dynamicParams = true;

type PageProps = {
  // Em Next.js 16+, params é uma Promise e precisa ser await
  params: Promise<{
    id: string;
  }>;
};

// Componente async para receber e processar params como Promise
export default async function ProcessDetailPage({ params }: PageProps) {
  // Fazer await de params para obter os valores reais
  const { id } = await params;

  // Delega renderização para componente cliente com acesso ao contexto
  return <ProcessDetailClient id={id} />;
}
