/**
 * Zustand store for Live Mode state.
 *
 * Manages token stream, streaming status, system prompt selection,
 * selected token expansion, and "What Else Could It Have Said?" re-streaming.
 */
import { create } from 'zustand';
import type { TokenData } from '../../../services/api.ts';

export type { TokenData };

/* ------------------------------------------------------------------ */
/*  System prompt presets                                               */
/* ------------------------------------------------------------------ */

export const SYSTEM_PRESETS: Record<string, string> = {
  None: '',
  'Helpful Assistant': 'You are a helpful, concise assistant.',
  Pirate: 'You are a pirate. Always respond in pirate speak.',
  'Data Scientist':
    'You are a data scientist. Use precise technical language and include relevant statistical concepts.',
  'JSON Only': 'You must respond with valid JSON only. No other text.',
  Custom: '',
};

export const PRESET_NAMES = Object.keys(SYSTEM_PRESETS);

/* ------------------------------------------------------------------ */
/*  Store types                                                        */
/* ------------------------------------------------------------------ */

interface LiveModeState {
  /** Accumulated token stream. */
  tokens: TokenData[];
  /** Currently streaming? */
  isStreaming: boolean;
  /** Current user input. */
  userPrompt: string;
  /** Current system prompt text. */
  systemPrompt: string;
  /** Selected preset name. */
  systemPreset: string;
  /** Which token index is expanded (null = none). */
  selectedTokenIndex: number | null;
  /** For cancellation of in-flight streams. */
  abortController: AbortController | null;
  /** Indicates the store is ready for a re-stream from a token override. */
  pendingRestream: boolean;
  /** Error message from last API call, if any. */
  error: string | null;

  /* -- Actions ---------------------------------------------------- */

  setUserPrompt: (prompt: string) => void;
  setSystemPrompt: (prompt: string, presetName: string) => void;
  startGeneration: () => AbortController;
  addToken: (tokenData: TokenData) => void;
  finishGeneration: () => void;
  selectToken: (index: number | null) => void;
  cancelGeneration: () => void;
  restreamFromToken: (index: number, alternativeToken: string) => void;
  setError: (msg: string | null) => void;
  reset: () => void;
}

/* ------------------------------------------------------------------ */
/*  Store implementation                                               */
/* ------------------------------------------------------------------ */

export const useLiveModeStore = create<LiveModeState>((set, get) => ({
  tokens: [],
  isStreaming: false,
  userPrompt: '',
  systemPrompt: '',
  systemPreset: 'None',
  selectedTokenIndex: null,
  abortController: null,
  pendingRestream: false,
  error: null,

  /* -- Setters ---------------------------------------------------- */

  setUserPrompt: (prompt: string) => {
    set({ userPrompt: prompt });
  },

  setSystemPrompt: (prompt: string, presetName: string) => {
    // Cancel any in-flight stream when the system prompt changes
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
    }
    set({
      systemPrompt: prompt,
      systemPreset: presetName,
      abortController: null,
      isStreaming: false,
      selectedTokenIndex: null,
      error: null,
      // Tokens are NOT auto-cleared here — LiveMode shows a "prompt changed"
      // indicator and lets the user regenerate explicitly.
    });
  },

  /* -- Streaming lifecycle ---------------------------------------- */

  startGeneration: () => {
    const { abortController: prev } = get();
    if (prev) prev.abort();

    const controller = new AbortController();
    set({
      abortController: controller,
      isStreaming: true,
      tokens: [],
      selectedTokenIndex: null,
      pendingRestream: false,
      error: null,
    });
    return controller;
  },

  addToken: (tokenData: TokenData) => {
    set((state) => ({ tokens: [...state.tokens, tokenData] }));
  },

  finishGeneration: () => {
    set({ isStreaming: false, abortController: null, pendingRestream: false });
  },

  /* -- Token interaction ------------------------------------------ */

  selectToken: (index: number | null) => {
    set({ selectedTokenIndex: index });
  },

  cancelGeneration: () => {
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
    }
    set({ isStreaming: false, abortController: null, pendingRestream: false });
  },

  /**
   * "What Else Could It Have Said?" — replace a token with an alternative
   * and trigger re-generation from that point.
   *
   * 1. Cancels any in-progress stream.
   * 2. Replaces `tokens[index]` with the alternative token.
   * 3. Truncates everything after `index`.
   * 4. Sets `pendingRestream = true` — the LiveMode component detects this
   *    and starts a new stream with assistant prefix continuation.
   */
  restreamFromToken: (index: number, alternativeToken: string) => {
    const { abortController, tokens } = get();

    // 1. Cancel current stream
    if (abortController) abortController.abort();

    // 2-3. Find probability of the alternative from the original top_logprobs
    const originalToken = tokens[index];
    const altData = originalToken.topAlternatives.find(
      (a) => a.token === alternativeToken,
    );
    const altProbability = altData?.probability ?? 0;

    const replacementToken: TokenData = {
      token: alternativeToken,
      probability: altProbability,
      topAlternatives: originalToken.topAlternatives,
    };

    const updatedTokens = [
      ...tokens.slice(0, index),
      replacementToken,
    ];

    set({
      tokens: updatedTokens,
      isStreaming: false,
      abortController: null,
      selectedTokenIndex: null,
      pendingRestream: true,
      error: null,
    });
  },

  setError: (msg: string | null) => {
    set({ error: msg });
  },

  reset: () => {
    const { abortController } = get();
    if (abortController) abortController.abort();
    set({
      tokens: [],
      isStreaming: false,
      userPrompt: '',
      systemPrompt: '',
      systemPreset: 'None',
      selectedTokenIndex: null,
      abortController: null,
      pendingRestream: false,
      error: null,
    });
  },
}));
