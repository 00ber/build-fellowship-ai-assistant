/**
 * Hook for accessing the current API mode (simulated vs real).
 *
 * Wraps the Zustand store for a cleaner consumer API.
 */
import { useStreamingStore } from '../stores/useStreamingStore.ts';

export function useApiMode() {
  const isRealMode = useStreamingStore((s) => s.isRealMode);
  const toggleMode = useStreamingStore((s) => s.toggleMode);
  return { isRealMode, toggleMode } as const;
}
