/**
 * Core streaming hook.
 *
 * Provides a unified interface for both simulated and real API streaming.
 * In simulated mode, plays back a pre-recorded response with natural delays.
 * In real mode, calls the OpenAI API.
 *
 * Usage:
 *   const { text, isStreaming, isDone, start, cancel, reset } = useStreamingText({
 *     simulatedResponse: SAMPLE_RESPONSE,
 *     apiPrompt: 'Explain LLMs',
 *     apiSystemPrompt: 'You are a helpful teacher.',
 *   });
 */
import { useState, useCallback, useRef } from 'react';
import { useApiMode } from './useApiMode.ts';
import { simulateStream } from '../services/streaming.ts';
import { streamFromApi } from '../services/api.ts';

export interface StreamingOptions {
  /** Pre-recorded response for simulated mode */
  simulatedResponse: string;
  /** Prompt sent to the API in real mode */
  apiPrompt?: string;
  /** System prompt sent to the API in real mode */
  apiSystemPrompt?: string;
}

export function useStreamingText(options: StreamingOptions) {
  const { isRealMode } = useApiMode();
  const [text, setText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const start = useCallback(async () => {
    // Cancel any in-progress stream
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    setIsStreaming(true);
    setText('');
    setIsDone(false);

    try {
      if (isRealMode && options.apiPrompt) {
        // Real API mode: accumulate deltas
        let accumulated = '';
        await streamFromApi(
          options.apiPrompt,
          options.apiSystemPrompt ?? 'You are a helpful assistant.',
          (chunk) => {
            accumulated += chunk;
            setText(accumulated);
          },
          controller.signal,
        );
      } else {
        // Simulated mode: play back pre-recorded text
        await simulateStream(
          options.simulatedResponse,
          (accumulated) => {
            setText(accumulated);
          },
          controller.signal,
        );
      }

      if (!controller.signal.aborted) {
        setIsDone(true);
      }
    } catch (err: unknown) {
      // Swallow abort errors; re-throw real errors
      if (err instanceof DOMException && err.name === 'AbortError') {
        // Cancelled — do nothing
      } else {
        throw err;
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsStreaming(false);
      }
    }
  }, [isRealMode, options]);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setText('');
    setIsStreaming(false);
    setIsDone(false);
  }, []);

  return { text, isStreaming, isDone, start, cancel, reset } as const;
}
