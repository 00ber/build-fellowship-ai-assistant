/**
 * Sample pre-recorded LLM response for the streaming demo.
 *
 * Exercises multiple markdown features: headers, bold, italic,
 * numbered lists, fenced code blocks, and blockquotes.
 */
export const SAMPLE_STREAMING_RESPONSE = `# Understanding LLMs

Large Language Models work by predicting the **next token** in a sequence. They don't "think" the way humans do — they calculate probabilities across their entire vocabulary and pick the most likely continuation.

## How It Works

1. The model receives your input as *tokens*
2. It calculates probabilities for every possible next token
3. It selects one and adds it to the sequence
4. Steps 2-3 repeat until the model produces a stop token

\`\`\`python
response = model.predict(
    input_tokens=tokenize("Hello, how are"),
    temperature=0.7
)
# Output: "you"
\`\`\`

## Why Temperature Matters

The \`temperature\` parameter controls randomness:

- **Low temperature** (0.1-0.3): More predictable, focused responses
- **Medium temperature** (0.5-0.7): Balanced creativity and coherence
- **High temperature** (0.8-1.0): More creative but potentially less accurate

> The key insight: LLMs don't "understand" language — they predict patterns. But those patterns are so sophisticated that the output *feels* like understanding.

This is why prompt engineering matters: you're shaping the **pattern context** to guide the model toward the output you want.`;
