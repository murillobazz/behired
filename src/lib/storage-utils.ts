import type { Process } from "@/types";

export const STORAGE_KEY = "behired_processes";

/**
 * Evento customizado para notificar changes na mesma aba.
 * O evento nativo `storage` só dispara em outras abas.
 */
const BEHIRED_CHANGE_EVENT = "behired:processes:change";

/**
 * Cache em memória do snapshot atual.
 * Evita JSON.parse em cada chamada de getProcessesSnapshot().
 * Invalidado em cross-tab changes; atualizado em persist para same-tab.
 */
let cachedSnapshot: Process[] | null = null;

/**
 * Array vazio memoizado para SSR (evita loop infinito em useSyncExternalStore).
 */
const EMPTY_PROCESSES: Process[] = [];

/**
 * Persiste o array de processos no localStorage e notifica subscribers.
 * Atualiza o cache e dispara BEHIRED_CHANGE_EVENT para a mesma aba.
 */
export function persistProcesses(processes: Process[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(processes));
    cachedSnapshot = processes;
    window.dispatchEvent(new Event(BEHIRED_CHANGE_EVENT));
  } catch (error) {
    console.error("[storage] Falha ao salvar processos:", error);
  }
}

/**
 * Snapshot atual dos processos para useSyncExternalStore.
 * Usa cache para evitar re-parse; retorna [] no primeiro acesso (localStorage vazio).
 */
export function getProcessesSnapshot(): Process[] {
  if (cachedSnapshot === null) {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      cachedSnapshot = data ? (JSON.parse(data) as Process[]) : [];
    } catch {
      cachedSnapshot = [];
    }
  }
  return cachedSnapshot;
}

/**
 * Snapshot server-side para useSyncExternalStore (SSR).
 * Retorna a mesma referência de array vazio para evitar loop infinito.
 */
export function getServerProcessesSnapshot(): Process[] {
  return EMPTY_PROCESSES;
}

/**
 * Função de subscribe para useSyncExternalStore.
 * Escuta BEHIRED_CHANGE_EVENT (mesma aba) e `storage` (outras abas).
 */
export function subscribeToProcesses(callback: () => void): () => void {
  const handleSameTab = () => callback();
  const handleCrossTab = () => {
    cachedSnapshot = null; // Invalida cache para re-ler o localStorage
    callback();
  };

  window.addEventListener(BEHIRED_CHANGE_EVENT, handleSameTab);
  window.addEventListener("storage", handleCrossTab);

  return () => {
    window.removeEventListener(BEHIRED_CHANGE_EVENT, handleSameTab);
    window.removeEventListener("storage", handleCrossTab);
  };
}

/**
 * Remove os processos salvos do localStorage e limpa o cache.
 */
export function clearProcesses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    cachedSnapshot = null;
    window.dispatchEvent(new Event(BEHIRED_CHANGE_EVENT));
  } catch (error) {
    console.error("[storage] Falha ao limpar processos:", error);
  }
}
