/**
 * Pre-recorded token probability data for Live Mode simulated fallback.
 *
 * When no OpenAI API key is available, the demo uses this data to show
 * realistic token-by-token streaming with probability distributions.
 *
 * NOTE: Probability values are pedagogically convincing, not precisely
 * accurate. The point is showing that probabilities exist and shift with
 * context, not that any specific token has exactly X% probability.
 */

import type { TokenData } from '../../../services/api.ts';

/* ------------------------------------------------------------------ */
/*  Helper to build TokenData with less boilerplate                     */
/* ------------------------------------------------------------------ */

function t(
  token: string,
  probability: number,
  alts: Array<[string, number]>,
): TokenData {
  // Ensure the token itself appears in the alternatives list (always first)
  const topAlternatives = [
    { token, probability },
    ...alts.map(([tok, prob]) => ({ token: tok, probability: prob })),
  ].slice(0, 5);

  return { token, probability, topAlternatives };
}

/* ------------------------------------------------------------------ */
/*  Scenario 1: "What is the capital of France?" — No system prompt    */
/* ------------------------------------------------------------------ */

const capitalOfFrance_none: TokenData[] = [
  t('The', 0.92, [['France', 0.04], ['Paris', 0.02], ['A', 0.01], ['It', 0.005]]),
  t(' capital', 0.88, [[' answer', 0.05], [' city', 0.03], [' largest', 0.02], [' most', 0.01]]),
  t(' of', 0.97, [[' city', 0.01], [',', 0.008], [' is', 0.005], [' for', 0.003]]),
  t(' France', 0.94, [[' the', 0.02], [' modern', 0.01], [' this', 0.008], [' that', 0.005]]),
  t(' is', 0.98, [[',', 0.008], [' has', 0.004], [' was', 0.003], [' remains', 0.002]]),
  t(' Paris', 0.96, [[' the', 0.015], [' officially', 0.008], [' known', 0.005], [' a', 0.003]]),
  t('.', 0.82, [['!', 0.06], [',', 0.05], ['\n', 0.03], [' -', 0.01]]),
  t(' Paris', 0.78, [[' It', 0.08], [' The', 0.05], [' This', 0.03], ['\n', 0.02]]),
  t(' is', 0.85, [[' has', 0.05], [',', 0.04], [' was', 0.02], [' serves', 0.01]]),
  t(' known', 0.55, [[' also', 0.12], [' the', 0.1], [' a', 0.08], [' famous', 0.05]]),
  t(' for', 0.72, [[' as', 0.15], [' worldwide', 0.04], [' globally', 0.03], [' around', 0.02]]),
  t(' its', 0.68, [[' the', 0.1], [' being', 0.06], [' many', 0.05], [' art', 0.03]]),
  t(' rich', 0.45, [[' iconic', 0.15], [' beautiful', 0.12], [' vibrant', 0.08], [' cultural', 0.06]]),
  t(' history', 0.52, [[' culture', 0.2], [' heritage', 0.1], [' cuisine', 0.06], [' architecture', 0.04]]),
  t(',', 0.7, [[' and', 0.1], ['.', 0.08], [';', 0.03], [' as', 0.02]]),
  t(' art', 0.38, [[' culture', 0.18], [' stunning', 0.1], [' beautiful', 0.08], [' iconic', 0.06]]),
  t(',', 0.65, [[' and', 0.15], ['.', 0.08], [';', 0.03], [' museums', 0.02]]),
  t(' and', 0.82, [[' cuisine', 0.05], [' fashion', 0.04], [' its', 0.02], [' as', 0.01]]),
  t(' cuisine', 0.48, [[' fashion', 0.15], [' culture', 0.1], [' architecture', 0.08], [' iconic', 0.05]]),
  t('.', 0.88, [['!', 0.04], [',', 0.03], ['\n', 0.02], [' -', 0.01]]),
];

/* ------------------------------------------------------------------ */
/*  Scenario 2: Same question — Pirate system prompt                   */
/* ------------------------------------------------------------------ */

const capitalOfFrance_pirate: TokenData[] = [
  t('Arr', 0.42, [['Ahoy', 0.18], ['Aye', 0.12], ['Sh', 0.08], ['Y', 0.05]]),
  t(',', 0.75, [['!', 0.1], ['r', 0.06], ['gh', 0.03], [' me', 0.02]]),
  t(' ye', 0.55, [[' me', 0.15], [' matey', 0.1], [' the', 0.06], [' that', 0.04]]),
  t(' be', 0.48, [[' want', 0.12], [' seek', 0.08], [' ask', 0.07], [' land', 0.05]]),
  t(' askin', 0.35, [[' wonderin', 0.15], [' seekin', 0.12], [' lookin', 0.1], [' wantin', 0.08]]),
  t("'", 0.82, [['g', 0.06], [' about', 0.04], [' of', 0.03], [' fer', 0.02]]),
  t(' about', 0.68, [[' fer', 0.1], [' for', 0.08], [' the', 0.05], [' of', 0.03]]),
  t(' the', 0.72, [[' that', 0.08], [' a', 0.06], [' France', 0.05], [' them', 0.03]]),
  t(' capital', 0.65, [[' land', 0.1], [' treasure', 0.06], [' port', 0.05], [' heart', 0.04]]),
  t(' of', 0.92, [[' city', 0.03], [',', 0.02], [' in', 0.01], [' o', 0.005]]),
  t(' France', 0.88, [[' the', 0.04], [' them', 0.02], [' that', 0.015], [' those', 0.01]]),
  t(',', 0.55, [['!', 0.15], ['?', 0.1], ['.', 0.08], [' eh', 0.04]]),
  t(' aye', 0.35, [[' well', 0.15], [' that', 0.12], [' it', 0.1], [' arr', 0.08]]),
  t('?', 0.4, [['!', 0.2], ['.', 0.15], [',', 0.1], ['...', 0.05]]),
  t(' That', 0.45, [[' It', 0.15], [' The', 0.12], [' Well', 0.08], ['\n', 0.05]]),
  t(' be', 0.72, [[' would', 0.08], ["'d", 0.06], [' is', 0.05], ["'s", 0.03]]),
  t(' Paris', 0.85, [[' the', 0.05], [' none', 0.03], [' a', 0.02], [' that', 0.01]]),
  t(',', 0.6, [['!', 0.15], ['.', 0.1], [' me', 0.05], [' -', 0.03]]),
  t(' me', 0.52, [[' ye', 0.15], [' matey', 0.1], [' a', 0.06], [' that', 0.04]]),
  t(' hearty', 0.45, [[' matey', 0.2], [' bucko', 0.08], [' friend', 0.06], [' lad', 0.05]]),
  t('!', 0.72, [['.', 0.1], [',', 0.06], ['!!', 0.04], ['...', 0.02]]),
  t(' A', 0.38, [[' The', 0.15], ['\n', 0.12], [' That', 0.08], [' It', 0.06]]),
  t(' fine', 0.42, [[' grand', 0.15], [' mighty', 0.1], [' beautiful', 0.08], [' great', 0.06]]),
  t(' port', 0.35, [[' city', 0.25], [' land', 0.1], [' place', 0.08], [' town', 0.06]]),
  t(' for', 0.45, [[' with', 0.12], [' full', 0.1], [',', 0.08], [' of', 0.06]]),
  t(' plunder', 0.3, [[' treasure', 0.2], [' adventure', 0.12], [' rum', 0.1], [' loot', 0.08]]),
  t('!', 0.75, [['.', 0.1], [',', 0.05], ['!!', 0.04], [' and', 0.02]]),
];

/* ------------------------------------------------------------------ */
/*  Scenario 3: "Explain what a variable is" — Data Scientist prompt   */
/* ------------------------------------------------------------------ */

const explainVariable_datascientist: TokenData[] = [
  t('A', 0.45, [['In', 0.2], ['From', 0.08], ['Within', 0.06], ['The', 0.05]]),
  t(' variable', 0.88, [[' statistical', 0.04], [' data', 0.03], [' mathematical', 0.02], [' quantitative', 0.01]]),
  t(',', 0.55, [[' is', 0.25], [' in', 0.08], [' represents', 0.04], [' -', 0.02]]),
  t(' in', 0.72, [[' from', 0.08], [' within', 0.06], [' mathematically', 0.04], [' statistically', 0.03]]),
  t(' the', 0.65, [[' a', 0.12], [' statistical', 0.08], [' data', 0.05], [' computational', 0.03]]),
  t(' context', 0.58, [[' field', 0.12], [' domain', 0.08], [' realm', 0.06], [' discipline', 0.04]]),
  t(' of', 0.95, [[' for', 0.02], [',', 0.01], [' and', 0.005], [' within', 0.003]]),
  t(' data', 0.62, [[' statistics', 0.15], [' statistical', 0.08], [' computer', 0.05], [' computational', 0.03]]),
  t(' science', 0.82, [[' analysis', 0.08], [' modeling', 0.03], [' engineering', 0.02], [' processing', 0.01]]),
  t(' and', 0.55, [[',', 0.2], [' or', 0.08], ['.', 0.05], [' /\\', 0.03]]),
  t(' statistics', 0.7, [[' programming', 0.1], [' machine', 0.06], [' computation', 0.04], [' mathematics', 0.03]]),
  t(',', 0.82, [['.', 0.06], [' -', 0.04], [';', 0.03], [' is', 0.02]]),
  t(' is', 0.75, [[' refers', 0.08], [' represents', 0.06], [' denotes', 0.03], [' can', 0.02]]),
  t(' a', 0.72, [[' any', 0.08], [' an', 0.06], [' essentially', 0.04], [' formally', 0.03]]),
  t(' symbolic', 0.28, [[' named', 0.2], [' measurable', 0.15], [' quantifiable', 0.1], [' storage', 0.08]]),
  t(' representation', 0.45, [[' container', 0.15], [' reference', 0.1], [' placeholder', 0.08], [' name', 0.06]]),
  t(' of', 0.72, [[' for', 0.1], [' that', 0.06], [' -', 0.03], [',', 0.02]]),
  t(' a', 0.68, [[' some', 0.08], [' an', 0.06], [' any', 0.05], [' data', 0.04]]),
  t(' data', 0.55, [[' value', 0.18], [' quantity', 0.08], [' measurable', 0.06], [' numeric', 0.04]]),
  t(' point', 0.42, [[' value', 0.2], [' element', 0.1], [' item', 0.08], [' attribute', 0.05]]),
  t(' or', 0.65, [[',', 0.12], ['.', 0.06], [' that', 0.05], [' which', 0.03]]),
  t(' value', 0.72, [[' quantity', 0.08], [' measurement', 0.06], [' attribute', 0.04], [' observation', 0.03]]),
  t(' that', 0.58, [['.', 0.15], [',', 0.08], [' which', 0.06], [' capable', 0.03]]),
  t(' can', 0.72, [[' may', 0.1], [' is', 0.06], [' varies', 0.04], [' changes', 0.02]]),
  t(' change', 0.55, [[' vary', 0.2], [' take', 0.08], [' assume', 0.06], [' be', 0.04]]),
  t(' or', 0.48, [[',', 0.15], [' across', 0.1], [' between', 0.06], [' over', 0.05]]),
  t(' vary', 0.62, [[' be', 0.1], [' fluctuate', 0.08], [' differ', 0.06], [' shift', 0.04]]),
  t(' across', 0.45, [[' over', 0.15], [' within', 0.1], [' between', 0.08], [' among', 0.05]]),
  t(' observations', 0.52, [[' samples', 0.15], [' data', 0.1], [' measurements', 0.06], [' experiments', 0.04]]),
  t('.', 0.85, [['!', 0.04], [',', 0.04], [';', 0.02], ['\n', 0.01]]),
];

/* ------------------------------------------------------------------ */
/*  Scenario map and lookup                                            */
/* ------------------------------------------------------------------ */

/** Scenario key format: `{promptKey}_{presetKey}` */
const SIMULATED_SCENARIOS: Record<string, TokenData[]> = {
  capital_None: capitalOfFrance_none,
  capital_Pirate: capitalOfFrance_pirate,
  variable_DataScientist: explainVariable_datascientist,
};

/**
 * Normalize a user prompt to a scenario key fragment.
 */
function normalizePromptKey(userPrompt: string): string {
  const lower = userPrompt.toLowerCase().trim();
  if (lower.includes('capital') && lower.includes('france')) return 'capital';
  if (lower.includes('variable')) return 'variable';
  return '';
}

/**
 * Normalize a preset name to a scenario key fragment.
 */
function normalizePresetKey(presetName: string): string {
  return presetName.replace(/\s+/g, '');
}

/**
 * Get the best-matching simulated response for a given prompt and system preset.
 *
 * Falls back through: exact match -> same prompt any preset -> default scenario.
 */
export function getSimulatedResponse(
  userPrompt: string,
  systemPreset: string,
): TokenData[] {
  const promptKey = normalizePromptKey(userPrompt);
  const presetKey = normalizePresetKey(systemPreset);

  // Try exact match
  const exactKey = `${promptKey}_${presetKey}`;
  if (SIMULATED_SCENARIOS[exactKey]) {
    return SIMULATED_SCENARIOS[exactKey];
  }

  // Try same prompt with any available preset
  for (const key of Object.keys(SIMULATED_SCENARIOS)) {
    if (key.startsWith(`${promptKey}_`)) {
      return SIMULATED_SCENARIOS[key];
    }
  }

  // Default: return the "capital of France with no prompt" scenario
  return capitalOfFrance_none;
}

/** All available simulated scenarios for reference. */
export { SIMULATED_SCENARIOS };
