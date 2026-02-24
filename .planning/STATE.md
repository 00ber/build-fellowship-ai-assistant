# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-16)

**Core value:** Every concept students encounter must be immediately intuitive — if a student leaves a workshop confused about what just happened, the materials failed.
**Current focus:** Phase 3 - Workshop 3 Materials (Agent Foundations)

## Current Position

Phase: 3 of 6 (complete)
Plan: 2 of 2 complete in Phase 03
Status: Phase 03 complete, Phase 04 next
Last activity: 2026-02-24 — Completed 03-02 (Workshop 3 agent evolution v1-v4)

Progress: [███████████░░░░░] 44%

## Performance Metrics

**Velocity:**
- Total plans completed: 8
- Average duration: 6.8 min
- Total execution time: 0.9 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01 | 3/3 | 25 min | 8 min |
| 02 | 3/3 | 14 min | 4.7 min |
| 03 | 2/2 | 15 min | 7.5 min |

**Recent Trend:**
- Last 5 plans: 02-03 (5 min), 02-02 (5 min), 03-01 (5 min), 03-02 (10 min)
- Trend: Consistent (03-02 longer due to complex notebook content)

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Timeline: Cohort 2 starts this week — iterative delivery workshop by workshop
- Demo stack: Same React/Vite/Tailwind app for consistency with existing demos
- Quality approach: Establish baseline standards for ALL workshops before polishing any single one
- Curriculum: Learning objectives derived from actual notebook content, not PLAN.md descriptions
- Curriculum: Workshop 2 notebook covers prompt engineering + code generation loop (not just LLM basics)
- Curriculum: Time allocations follow ~10-12 min demo, ~38-40 min notebook, ~10 min Q&A for teaching workshops
- Demo infra: Hash-based routing for zero-dependency simplicity in demo shell
- Demo infra: DemoRegistry pattern for adding demos (component file + registry entry)
- Demo infra: Tailwind v3 (not v4) to match established scratchpad theme
- Streaming: Fetch-based SSE for OpenAI API (no openai npm package) — lightweight bundle
- Streaming: useStreamingText hook as unified API for all demo streaming
- Streaming: Hidden "live" keyboard toggle approved for instructor-only features
- Display utils: IPython.display (HTML/Markdown) for notebook formatting -- zero external deps
- Notebook pattern: H1 title, H2 parts, H3 sections, blockquote Key Insights
- Exercise pattern: HTML <details> elements for collapsible solutions
- Demo migration: Copy logic verbatim from scratchpad, restyle with Card/Button/Badge + Tailwind
- Per-demo Zustand store pattern in demos/src/demos/{name}/store/ directory
- Logprobs streaming: streamWithLogprobs with onToken callback and TokenData interface
- Simulated fallback: pre-recorded token data with scenario matching for demo without API key
- Token override: store pendingRestream flag triggers component-level re-stream with assistant prefix
- W3 scenario: Restaurant Finder replaces ER Hospital (6 restaurants with structured + unstructured data)
- W3 data: RESTAURANT_DESCRIPTIONS split across two cells to stay under 30-line cell limit
- W3 tools: Case-insensitive lookup in tool functions to handle LLM casing inconsistency
- W3 eval: Restricted namespace {"__builtins__": {}} for eval() of LLM-generated function calls
- W3 agents: 4-version evolution (keyword -> LLM classify -> LLM tool select -> ReAct loop)
- W3 context: Prompt visibility at steps 3-5 shows growing context without using "memory" vocabulary
- W3 ReAct: Named pattern after v4 demonstrates it; Anthropic agent definition referenced
- W3 bridge: Toy tools limitation motivates Workshop 4 real tool design

### Pending Todos

None yet.

### Blockers/Concerns

**Timeline urgency:** Workshop 2 materials needed THIS WEEK (Cohort 2 starts). Phase 1 must complete quickly to enable Phase 2 delivery.

**Demo complexity risk:** New demos (tool use, memory, code sandbox) are hypothesized to produce "aha moments" but not student-tested. Each demo needs clear one-sentence "aha moment" defined before building.

## Session Continuity

Last session: 2026-02-24 (plan execution)
Stopped at: Completed 03-02-PLAN.md (Workshop 3 complete -- all 8 Parts)
Resume file: Phase 04 next
