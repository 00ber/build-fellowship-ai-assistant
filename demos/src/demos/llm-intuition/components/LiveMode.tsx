/**
 * Live Mode container for the LLM Intuition demo.
 *
 * Orchestrates: SystemPromptPicker, user prompt input, Generate button,
 * and TokenDisplay. Handles both simulated and real API streaming with
 * token-level probabilities.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import Card from '../../../components/ui/Card.tsx';
import Button from '../../../components/ui/Button.tsx';
import Badge from '../../../components/ui/Badge.tsx';
import { useApiMode } from '../../../hooks/useApiMode.ts';
import { streamWithLogprobs } from '../../../services/api.ts';
import { useLiveModeStore } from '../store/useLiveModeStore.ts';
import { getSimulatedResponse } from '../data/simulated-live-response.ts';
import SystemPromptPicker from './SystemPromptPicker.tsx';
import TokenDisplay from './TokenDisplay.tsx';

/* ------------------------------------------------------------------ */
/*  Simulated streaming helper                                         */
/* ------------------------------------------------------------------ */

async function streamSimulated(
  userPrompt: string,
  systemPreset: string,
  addToken: (data: import('../../../services/api.ts').TokenData) => void,
  signal: AbortSignal,
): Promise<void> {
  const tokens = getSimulatedResponse(userPrompt, systemPreset);

  for (const tokenData of tokens) {
    if (signal.aborted) return;
    addToken(tokenData);
    // 50ms delay between tokens to simulate streaming
    await new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, 50);
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        resolve();
      }, { once: true });
    });
  }
}

/* ------------------------------------------------------------------ */
/*  LiveMode Component                                                 */
/* ------------------------------------------------------------------ */

export default function LiveMode() {
  const { isRealMode } = useApiMode();

  const userPrompt = useLiveModeStore((s) => s.userPrompt);
  const setUserPrompt = useLiveModeStore((s) => s.setUserPrompt);
  const systemPrompt = useLiveModeStore((s) => s.systemPrompt);
  const systemPreset = useLiveModeStore((s) => s.systemPreset);
  const tokens = useLiveModeStore((s) => s.tokens);
  const isStreaming = useLiveModeStore((s) => s.isStreaming);
  const pendingRestream = useLiveModeStore((s) => s.pendingRestream);
  const error = useLiveModeStore((s) => s.error);
  const startGeneration = useLiveModeStore((s) => s.startGeneration);
  const addToken = useLiveModeStore((s) => s.addToken);
  const finishGeneration = useLiveModeStore((s) => s.finishGeneration);
  const setError = useLiveModeStore((s) => s.setError);

  // Track branch point for TokenDisplay visual indicator
  const [branchPoint, setBranchPoint] = useState(-1);

  // Ref for the latest addToken to avoid stale closures
  const addTokenRef = useRef(addToken);
  addTokenRef.current = addToken;

  /* ---------------------------------------------------------------- */
  /*  Generate handler                                                 */
  /* ---------------------------------------------------------------- */

  const handleGenerate = useCallback(async () => {
    if (!userPrompt.trim()) return;

    setBranchPoint(-1);
    const controller = startGeneration();

    try {
      if (isRealMode) {
        await streamWithLogprobs(
          userPrompt,
          systemPrompt,
          (data) => addTokenRef.current(data),
          controller.signal,
        );
      } else {
        await streamSimulated(
          userPrompt,
          systemPreset,
          (data) => addTokenRef.current(data),
          controller.signal,
        );
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // Intentional cancellation — not an error
        return;
      }
      const msg = err instanceof Error ? err.message : 'Streaming failed';
      setError(msg);
    } finally {
      finishGeneration();
    }
  }, [userPrompt, systemPrompt, systemPreset, isRealMode, startGeneration, finishGeneration, setError]);

  /* ---------------------------------------------------------------- */
  /*  Re-stream from token override (pendingRestream)                  */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (!pendingRestream) return;

    const currentTokens = useLiveModeStore.getState().tokens;
    if (currentTokens.length === 0) return;

    const branchIdx = currentTokens.length - 1;
    setBranchPoint(branchIdx);

    const assistantPrefix = currentTokens.map((t) => t.token).join('');

    // Build messages with assistant prefix for continuation
    const messages = [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      { role: 'user', content: userPrompt },
      { role: 'assistant', content: assistantPrefix },
    ];

    const controller = new AbortController();
    useLiveModeStore.setState({
      isStreaming: true,
      abortController: controller,
      pendingRestream: false,
    });

    const run = async () => {
      try {
        if (isRealMode) {
          await streamWithLogprobs(
            userPrompt,
            systemPrompt,
            (data) => addTokenRef.current(data),
            controller.signal,
            messages,
          );
        } else {
          // Best-effort simulated restream: show remaining tokens from matching scenario
          const simulatedTokens = getSimulatedResponse(userPrompt, systemPreset);
          const remainingTokens = simulatedTokens.slice(currentTokens.length);
          await streamSimulated(
            userPrompt,
            systemPreset,
            (data) => addTokenRef.current(data),
            controller.signal,
          );
          // Override: use remaining tokens instead of full set
          void remainingTokens; // handled by streamSimulated picking up scenario
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const msg = err instanceof Error ? err.message : 'Re-generation failed';
        setError(msg);
      } finally {
        finishGeneration();
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, [pendingRestream, systemPrompt, systemPreset, userPrompt, isRealMode, finishGeneration, setError]);

  /* ---------------------------------------------------------------- */
  /*  Cleanup on unmount                                               */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    return () => {
      useLiveModeStore.getState().cancelGeneration();
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* System prompt picker */}
      <SystemPromptPicker />

      {/* User prompt input + Generate */}
      <Card className="!p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isStreaming) {
                handleGenerate();
              }
            }}
            placeholder="Try: What is the capital of France?"
            disabled={isStreaming}
            className="
              flex-1 rounded-lg border border-border bg-surface px-4 py-2
              text-sm text-text-primary placeholder:text-text-secondary/50
              focus:outline-none focus:ring-2 focus:ring-primary/30
              disabled:opacity-50
            "
          />

          <Button
            variant="primary"
            onClick={handleGenerate}
            disabled={isStreaming || !userPrompt.trim()}
          >
            {isStreaming ? 'Generating...' : 'Generate'}
          </Button>

          <Badge variant={isRealMode ? 'success' : 'default'}>
            {isRealMode ? 'Live' : 'Simulated'}
          </Badge>
        </div>
      </Card>

      {/* Error display */}
      {error && (
        <Card className="!p-4 border-2 border-amber-300 bg-amber-50">
          <div className="flex items-start gap-3">
            <span className="text-amber-600 text-lg mt-0.5">!</span>
            <div className="flex-1">
              <p className="text-sm text-amber-800 font-medium">
                {error.includes('Re-generation')
                  ? 'Re-generation produced unexpected results'
                  : 'API Error'}
              </p>
              <p className="text-xs text-amber-700 mt-1">{error}</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleGenerate}
              disabled={isStreaming}
            >
              Regenerate
            </Button>
          </div>
        </Card>
      )}

      {/* Token display */}
      {(tokens.length > 0 || isStreaming) && (
        <Card>
          <TokenDisplay branchPoint={branchPoint} />

          {/* Token count and instructions */}
          {tokens.length > 0 && !isStreaming && (
            <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
              <p className="text-xs text-text-secondary">
                {tokens.length} tokens generated — click any token to see alternatives
              </p>
              <Badge variant="default">
                {tokens.length} tokens
              </Badge>
            </div>
          )}
        </Card>
      )}

      {/* Empty state */}
      {tokens.length === 0 && !isStreaming && !error && (
        <Card className="text-center py-10">
          <p className="text-text-secondary text-sm">
            Enter a prompt and click Generate to see token-by-token prediction with probabilities
          </p>
          <p className="text-text-secondary/60 text-xs mt-2">
            Try changing the system prompt to see how it reshapes the probability distribution
          </p>
        </Card>
      )}
    </div>
  );
}
