export const formatDate = (isoDate: string) => {
  // Formata data no padrao dd/MM/yyyy para UI.
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
};

export const getDaysAgo = (isoDate: string) => {
  // Retorna a diferenca em dias para exibir no card.
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  return `${diffDays}d`;
};
