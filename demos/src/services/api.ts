/**
 * Real API client for OpenAI streaming.
 *
 * Uses the fetch-based SSE approach (no openai npm package) to keep the
 * bundle lightweight. Reads the API key from localStorage.
 */

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-4o-mini';

/* ------------------------------------------------------------------ */
/*  Token-level probability data for Live Mode                         */
/* ------------------------------------------------------------------ */

/** A single alternative token with its probability. */
export interface TokenAlternative {
  token: string;
  probability: number;
}

/** Data emitted for each token during logprobs streaming. */
export interface TokenData {
  /** The token text as generated. */
  token: string;
  /** Probability of this token (0-1, derived from logprob via Math.exp). */
  probability: number;
  /** Top 5 alternative tokens with probabilities. */
  topAlternatives: TokenAlternative[];
}

function getApiKey(): string {
  const key =
    import.meta.env.VITE_OPENAI_API_KEY ||
    localStorage.getItem('openai_api_key');

  if (!key) {
    throw new Error(
      'No OpenAI API key found. Set VITE_OPENAI_API_KEY in your environment or store a key via localStorage.setItem("openai_api_key", "sk-...")',
    );
  }

  return key as string;
}

/**
 * Stream a chat completion from OpenAI and deliver content deltas via
 * `onChunk`.
 *
 * @param prompt        The user message
 * @param systemPrompt  The system message
 * @param onChunk       Called with each content delta as it arrives
 * @param signal        Optional AbortSignal for cancellation
 */
export async function streamFromApi(
  prompt: string,
  systemPrompt: string,
  onChunk: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const apiKey = getApiKey();

  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    }),
    signal,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`OpenAI API error ${response.status}: ${body}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Response body is not readable');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      // Keep the last (possibly incomplete) line in the buffer
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const data = trimmed.slice(6); // strip "data: "
        if (data === '[DONE]') return;

        try {
          const parsed = JSON.parse(data) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            onChunk(content);
          }
        } catch {
          // Skip malformed JSON lines
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/* ------------------------------------------------------------------ */
/*  streamWithLogprobs — Live Mode logprobs streaming                   */
/* ------------------------------------------------------------------ */

/**
 * Stream a chat completion from OpenAI with token-level logprobs enabled.
 *
 * Each SSE chunk yields a `TokenData` with the generated token, its probability,
 * and the top 5 alternative tokens.
 *
 * @param userPrompt    The user message
 * @param systemPrompt  The system message
 * @param onToken       Called for each token with probability data
 * @param signal        Optional AbortSignal for cancellation
 * @param messages      Optional override message array (used for assistant prefix continuation)
 */
export async function streamWithLogprobs(
  userPrompt: string,
  systemPrompt: string,
  onToken: (data: TokenData) => void,
  signal?: AbortSignal,
  messages?: Array<{ role: string; content: string }>,
): Promise<void> {
  const apiKey = getApiKey();

  const chatMessages =
    messages ??
    [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      { role: 'user', content: userPrompt },
    ];

  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      stream: true,
      logprobs: true,
      top_logprobs: 5,
      messages: chatMessages,
    }),
    signal,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`OpenAI API error ${response.status}: ${body}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Response body is not readable');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const data = trimmed.slice(6);
        if (data === '[DONE]') return;

        try {
          const parsed = JSON.parse(data) as {
            choices?: Array<{
              delta?: { content?: string };
              logprobs?: {
                content?: Array<{
                  token: string;
                  logprob: number;
                  top_logprobs: Array<{ token: string; logprob: number }>;
                }>;
              };
            }>;
          };

          const logprobsContent = parsed.choices?.[0]?.logprobs?.content;
          if (!logprobsContent || logprobsContent.length === 0) continue;

          const entry = logprobsContent[0];
          const tokenText = entry.token;
          const probability = Math.exp(entry.logprob);

          const topAlternatives: TokenAlternative[] = entry.top_logprobs.map(
            (alt) => ({
              token: alt.token,
              probability: Math.exp(alt.logprob),
            }),
          );

          onToken({
            token: tokenText,
            probability,
            topAlternatives,
          });
        } catch {
          // Skip malformed JSON lines
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
