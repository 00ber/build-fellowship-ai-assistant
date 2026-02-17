/**
 * Hidden keyboard sequence detector.
 *
 * Listens for a specific sequence of keystrokes (e.g. ['l','i','v','e'])
 * and fires `onMatch` when the full sequence is typed within `timeoutMs`.
 *
 * Ignores keystrokes that occur inside input or textarea elements so
 * normal form typing never accidentally triggers the sequence.
 */
import { useEffect, useRef, useCallback } from 'react';

export function useKeySequence(
  sequence: string[],
  onMatch: () => void,
  timeoutMs = 2000,
): void {
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const resetSequence = useCallback(() => {
    indexRef.current = 0;
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore keystrokes when user is typing in an input/textarea
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      if (e.key === sequence[indexRef.current]) {
        indexRef.current++;

        // Reset the timeout for the next keystroke
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(resetSequence, timeoutMs);

        if (indexRef.current === sequence.length) {
          onMatch();
          resetSequence();
        }
      } else {
        resetSequence();
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sequence, onMatch, timeoutMs, resetSequence]);
}
