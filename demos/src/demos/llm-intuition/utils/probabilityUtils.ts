/**
 * Apply temperature scaling to probabilities
 */
export function applyTemperature(
  probabilities: Map<string, number>,
  temperature: number
): Map<string, number> {
  if (temperature === 1 || probabilities.size === 0) return probabilities;

  const adjustedProbs = new Map<string, number>();
  const entries = Array.from(probabilities.entries());

  // Apply temperature to log probabilities
  const logits = entries.map(([word, prob]) => {
    const logit = Math.log(prob + 1e-10) / temperature;
    return { word, logit };
  });

  // Find max for numerical stability
  const maxLogit = Math.max(...logits.map(l => l.logit));

  // Apply softmax
  const expValues = logits.map(({ word, logit }) => ({
    word,
    exp: Math.exp(logit - maxLogit)
  }));

  const sumExp = expValues.reduce((sum, { exp }) => sum + exp, 0);

  expValues.forEach(({ word, exp }) => {
    adjustedProbs.set(word, exp / sumExp);
  });

  return adjustedProbs;
}

/**
 * Sample a word from probability distribution
 */
export function sampleFromDistribution(
  probabilities: Map<string, number>
): string {
  const random = Math.random();
  let cumulative = 0;

  for (const [word, prob] of probabilities.entries()) {
    cumulative += prob;
    if (random <= cumulative) {
      return word;
    }
  }

  // Fallback to last word
  return Array.from(probabilities.keys())[probabilities.size - 1];
}

/**
 * Get top K words from probability distribution
 */
export function getTopK(
  probabilities: Map<string, number>,
  k: number = 5
): Array<{ word: string; probability: number; count?: number }> {
  return Array.from(probabilities.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([word, probability]) => ({ word, probability }));
}

/**
 * Format probability as percentage
 */
export function formatProbability(prob: number): string {
  return `${(prob * 100).toFixed(1)}%`;
}

/**
 * Format as fraction
 */
export function formatAsFraction(count: number, total: number): string {
  return `${count}/${total}`;
}
