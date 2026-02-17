/**
 * Simulated streaming engine.
 *
 * Emits text character-by-character (or in small chunks) with randomized
 * delays that mimic real LLM token generation. Sentence boundaries get
 * longer pauses so the output feels "believably real."
 */

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SENTENCE_BOUNDARIES = new Set(['.', '!', '?', '\n']);

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };

    function cleanup() {
      signal?.removeEventListener('abort', onAbort);
    }

    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

/**
 * Simulate streaming by emitting chunks of `fullText` with natural-feeling
 * randomized delays.
 *
 * @param fullText     The complete response to stream
 * @param onChunk      Called with the accumulated text so far after each tick
 * @param signal       Optional AbortSignal for cancellation
 */
export async function simulateStream(
  fullText: string,
  onChunk: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  let position = 0;

  while (position < fullText.length) {
    if (signal?.aborted) return;

    const chunkSize = randomBetween(1, 4);
    const nextPosition = Math.min(position + chunkSize, fullText.length);

    onChunk(fullText.slice(0, nextPosition));
    position = nextPosition;

    // Randomized delay: longer at sentence boundaries for a natural cadence
    const lastChar = fullText[position - 1];
    const pauseMs = SENTENCE_BOUNDARIES.has(lastChar ?? '')
      ? randomBetween(80, 200)
      : randomBetween(20, 60);

    try {
      await delay(pauseMs, signal);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      throw err;
    }
  }
}
