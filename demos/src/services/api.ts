/**
 * Real API client for OpenAI streaming.
 *
 * Uses the fetch-based SSE approach (no openai npm package) to keep the
 * bundle lightweight. Reads the API key from localStorage.
 */

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-4o-mini';

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
