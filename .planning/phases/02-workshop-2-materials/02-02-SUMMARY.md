---
phase: 02-workshop-2-materials
plan: 02
subsystem: ui
tags: [react, zustand, openai, logprobs, streaming, token-probabilities, tailwind]

# Dependency graph
requires:
  - phase: 01-curriculum-documentation-demo-infrastructure
    provides: "Demo shell with DemoRegistry, DemoLayout, Card/Button/Badge components, Tailwind theme"
  - phase: 02-workshop-2-materials
    plan: 01
    provides: "LLM Intuition demo with tab structure and Simulated (N-gram) tab"
provides:
  - "Live Mode tab with streaming logprobs and token-level probability display"
  - "streamWithLogprobs API function for OpenAI streaming with top_logprobs"
  - "TokenDisplay component with clickable tokens and Top 5 alternatives panel"
  - "SystemPromptPicker with 6 presets (None, Helpful Assistant, Pirate, Data Scientist, JSON Only, Custom)"
  - "useLiveModeStore Zustand store with full token state management and restream support"
  - "Simulated fallback with 3 pre-recorded scenarios (77 tokens total)"
  - "'What Else Could It Have Said?' feature via restreamFromToken"
affects: [workshop-2-demo-delivery]

# Tech tracking
tech-stack:
  added: []
  patterns: [logprobs-streaming, token-level-probability-visualization, assistant-prefix-continuation, simulated-fallback-pattern]

key-files:
  created:
    - demos/src/demos/llm-intuition/components/LiveMode.tsx
    - demos/src/demos/llm-intuition/components/TokenDisplay.tsx
    - demos/src/demos/llm-intuition/components/SystemPromptPicker.tsx
    - demos/src/demos/llm-intuition/store/useLiveModeStore.ts
    - demos/src/demos/llm-intuition/data/simulated-live-response.ts
  modified:
    - demos/src/services/api.ts
    - demos/src/demos/llm-intuition/index.tsx

key-decisions:
  - "Used pendingRestream flag in store to coordinate token override with async streaming"
  - "TokenData interface exported from api.ts and re-exported from useLiveModeStore for single import"
  - "Probability bars use linear scale with maxProb normalization for visual clarity"
  - "Assistant prefix continuation via messages override parameter in streamWithLogprobs"
  - "Simulated restream shows full default scenario as best-effort since exact branching cannot be pre-recorded"

patterns-established:
  - "Logprobs streaming: streamWithLogprobs function with onToken callback and TokenData interface"
  - "Simulated fallback: getSimulatedResponse with scenario matching and delayed token emission"
  - "Token override pattern: store sets pendingRestream flag, component detects via useEffect and initiates new stream"

requirements-completed: [INFR-02]

# Metrics
duration: 5min
completed: 2026-02-17
---

# Phase 02 Plan 02: LLM Intuition Live Mode Summary

**Live Mode tab with OpenAI logprobs streaming, clickable token alternatives, system prompt presets, and simulated fallback for the "aha moment" delivery**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-17T05:43:48Z
- **Completed:** 2026-02-17T05:48:54Z
- **Tasks:** 2
- **Files modified:** 7 (5 created, 2 modified)

## Accomplishments
- Extended api.ts with streamWithLogprobs function that parses OpenAI SSE chunks for token-level logprobs with top 5 alternatives
- Built useLiveModeStore Zustand store managing full live mode lifecycle: tokens, streaming, system prompts, token selection, and restreamFromToken for "What Else Could It Have Said?"
- Created 3 simulated scenarios (77 tokens total) for capital-of-France (no prompt), capital-of-France (pirate), and explain-variable (data scientist) with realistic probability distributions
- Built TokenDisplay component rendering inline flowing token stream with click-to-expand probability bars and alternative selection
- Built SystemPromptPicker with 6 presets, custom textarea, preview area, and "prompt changed" indicator
- Built LiveMode container orchestrating prompt input, generate button, simulated/live badge, error handling, and restream coordination
- Wired LiveMode into demo entry point replacing placeholder, with tab-switch stream cancellation

## Task Commits

Each task was committed atomically:

1. **Task 1: Build logprobs streaming API, live mode store, and simulated data** - `f1cb797` (feat)
2. **Task 2: Build LiveMode UI components and wire into demo tabs** - `d2dd3bd` (feat)

## Files Created/Modified
- `demos/src/services/api.ts` - Added TokenData interface and streamWithLogprobs function for OpenAI logprobs streaming
- `demos/src/demos/llm-intuition/store/useLiveModeStore.ts` - Zustand store for live mode state with restreamFromToken support
- `demos/src/demos/llm-intuition/data/simulated-live-response.ts` - Pre-recorded token probabilities for 3 scenarios
- `demos/src/demos/llm-intuition/components/LiveMode.tsx` - Main live mode container with simulated/real API orchestration
- `demos/src/demos/llm-intuition/components/TokenDisplay.tsx` - Clickable token stream with Top 5 alternatives probability bars
- `demos/src/demos/llm-intuition/components/SystemPromptPicker.tsx` - System prompt preset selector with custom textarea
- `demos/src/demos/llm-intuition/index.tsx` - Updated to render LiveMode in Live tab with stream cancellation on tab switch

## Decisions Made
- Used `pendingRestream` boolean flag in store rather than direct function call to coordinate async token override with component-level streaming logic
- Exported `TokenData` interface from api.ts and re-exported from useLiveModeStore for cleaner imports in component tree
- Probability bars use linear scale normalized to max probability rather than absolute scale, ensuring even low-probability alternatives are visually distinguishable
- Assistant prefix continuation for restream uses `messages` override parameter in streamWithLogprobs rather than a separate function
- Simulated restream shows full default scenario tokens as best-effort fallback since exact branching paths cannot be pre-recorded

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required. Live mode requires OpenAI API key only when instructor activates hidden "live" toggle (existing infrastructure from Plan 01-03).

## Next Phase Readiness
- Live Mode tab fully functional with simulated fallback for any environment
- When instructor enables hidden "live" toggle, demo uses real OpenAI API with actual token probabilities
- All Workshop 2 demo materials complete (N-gram simulated mode + Live mode + notebook)

## Self-Check: PASSED

- All 7 files verified on disk
- Both task commits (f1cb797, d2dd3bd) verified in git history
- TypeScript compilation: zero errors
- Production build: successful

---
*Phase: 02-workshop-2-materials*
*Completed: 2026-02-17*
