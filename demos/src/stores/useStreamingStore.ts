/**
 * Zustand store for streaming mode state.
 *
 * Persists `isRealMode` to localStorage so the mode survives page refreshes.
 * Defaults to simulated mode (isRealMode: false).
 */
import { create } from 'zustand';

const STORAGE_KEY = 'streaming_mode';

interface StreamingState {
  isRealMode: boolean;
  toggleMode: () => void;
  apiKey: string | null;
  setApiKey: (key: string) => void;
}

function loadPersistedMode(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'real';
  } catch {
    return false;
  }
}

function persistMode(isReal: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, isReal ? 'real' : 'simulated');
  } catch {
    // localStorage not available (SSR, private browsing, etc.)
  }
}

export const useStreamingStore = create<StreamingState>((set) => ({
  isRealMode: loadPersistedMode(),

  toggleMode: () =>
    set((state) => {
      const next = !state.isRealMode;
      persistMode(next);
      return { isRealMode: next };
    }),

  apiKey: localStorage.getItem('openai_api_key'),

  setApiKey: (key: string) => {
    localStorage.setItem('openai_api_key', key);
    set({ apiKey: key });
  },
}));
