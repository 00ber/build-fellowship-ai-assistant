/**
 * Token stream display with clickable tokens and probability alternatives.
 *
 * This is the heart of the "What Else Could It Have Said?" feature:
 * - Tokens render as an inline flowing sequence
 * - Clicking a token expands a Top 5 Alternatives panel
 * - Clicking an alternative triggers re-generation from that point
 */
import { useLiveModeStore } from '../store/useLiveModeStore.ts';
import type { TokenData } from '../../../services/api.ts';

interface TokenSpanProps {
  tokenData: TokenData;
  index: number;
  isSelected: boolean;
  isStreaming: boolean;
  isLastToken: boolean;
  isBranched: boolean;
  onSelect: (index: number | null) => void;
}

function TokenSpan({
  tokenData,
  index,
  isSelected,
  isStreaming,
  isLastToken,
  isBranched,
  onSelect,
}: TokenSpanProps) {
  const isPulsing = isStreaming && isLastToken;

  return (
    <span
      onClick={() => onSelect(isSelected ? null : index)}
      className={`
        inline cursor-pointer px-0.5 py-0.5 rounded transition-colors
        ${isSelected
          ? 'bg-indigo-100 ring-2 ring-indigo-300'
          : 'hover:bg-indigo-50'
        }
        ${isPulsing ? 'animate-pulse' : ''}
        ${isBranched ? 'bg-amber-50/60' : ''}
      `}
      title={`${(tokenData.probability * 100).toFixed(1)}% probability`}
    >
      {tokenData.token}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Alternatives Panel                                                 */
/* ------------------------------------------------------------------ */

interface AlternativesPanelProps {
  tokenData: TokenData;
  tokenIndex: number;
}

function AlternativesPanel({ tokenData, tokenIndex }: AlternativesPanelProps) {
  const restreamFromToken = useLiveModeStore((s) => s.restreamFromToken);
  const isStreaming = useLiveModeStore((s) => s.isStreaming);

  const alternatives = tokenData.topAlternatives;

  // Find max probability for scaling bars
  const maxProb = Math.max(...alternatives.map((a) => a.probability), 0.001);

  // Check if top token dominates
  const topDominates =
    alternatives.length > 0 && alternatives[0].probability > 0.9;

  return (
    <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-border/50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
          Top 5 Alternatives
        </h4>
        {topDominates && (
          <span className="text-[10px] text-text-secondary italic">
            Top token dominates — check percentages
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        {alternatives.map((alt, i) => {
          const isChosen = alt.token === tokenData.token;
          const barWidth = Math.max((alt.probability / maxProb) * 100, 2);
          const pct = (alt.probability * 100).toFixed(1);

          return (
            <button
              key={`${alt.token}-${i}`}
              onClick={() => {
                if (!isChosen && !isStreaming) {
                  restreamFromToken(tokenIndex, alt.token);
                }
              }}
              disabled={isChosen || isStreaming}
              className={`
                w-full flex items-center gap-2 text-left group rounded-lg px-2 py-1.5
                transition-colors
                ${isChosen
                  ? 'cursor-default'
                  : isStreaming
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-white cursor-pointer'
                }
              `}
            >
              {/* Token text */}
              <span
                className={`
                  text-sm font-mono min-w-[80px] truncate
                  ${isChosen ? 'font-semibold text-text-primary' : 'text-text-secondary'}
                `}
              >
                {JSON.stringify(alt.token)}
              </span>

              {/* Probability bar */}
              <div className="flex-1 h-5 bg-gray-200 rounded-md overflow-hidden relative">
                <div
                  className={`
                    h-full rounded-md transition-all duration-300
                    ${isChosen ? 'bg-indigo-500' : 'bg-gray-400 group-hover:bg-indigo-300'}
                  `}
                  style={{ width: `${barWidth}%` }}
                />
              </div>

              {/* Probability percentage */}
              <span
                className={`
                  text-xs tabular-nums min-w-[48px] text-right
                  ${isChosen ? 'font-semibold text-text-primary' : 'text-text-secondary'}
                `}
              >
                {pct}%
              </span>
            </button>
          );
        })}
      </div>

      {!isStreaming && (
        <p className="mt-2 text-[10px] text-text-secondary/60 text-center">
          Click an alternative to re-generate from this point
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main TokenDisplay                                                  */
/* ------------------------------------------------------------------ */

interface TokenDisplayProps {
  /** Index from which tokens were re-generated via branch. -1 = no branch. */
  branchPoint: number;
}

export default function TokenDisplay({ branchPoint }: TokenDisplayProps) {
  const tokens = useLiveModeStore((s) => s.tokens);
  const isStreaming = useLiveModeStore((s) => s.isStreaming);
  const selectedTokenIndex = useLiveModeStore((s) => s.selectedTokenIndex);
  const selectToken = useLiveModeStore((s) => s.selectToken);

  if (tokens.length === 0) return null;

  return (
    <div>
      {/* Token stream */}
      <div className="leading-relaxed text-lg text-text-primary font-serif">
        {tokens.map((tokenData, i) => (
          <TokenSpan
            key={`${i}-${tokenData.token}`}
            tokenData={tokenData}
            index={i}
            isSelected={selectedTokenIndex === i}
            isStreaming={isStreaming}
            isLastToken={i === tokens.length - 1}
            isBranched={branchPoint >= 0 && i >= branchPoint}
            onSelect={selectToken}
          />
        ))}

        {/* Streaming cursor */}
        {isStreaming && (
          <span className="inline-block w-2 h-5 bg-primary/60 animate-pulse rounded-sm ml-0.5 align-middle" />
        )}
      </div>

      {/* Alternatives panel for selected token */}
      {selectedTokenIndex !== null && tokens[selectedTokenIndex] && (
        <AlternativesPanel
          tokenData={tokens[selectedTokenIndex]}
          tokenIndex={selectedTokenIndex}
        />
      )}
    </div>
  );
}
