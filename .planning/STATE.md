# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-16)

**Core value:** Every concept students encounter must be immediately intuitive — if a student leaves a workshop confused about what just happened, the materials failed.
**Current focus:** Phase 2 - Workshop 2 Materials (LLM Fundamentals & Prompt Engineering)

## Current Position

Phase: 2 of 6 (Workshop 2 Materials)
Plan: 3 of 3 in current phase
Status: Plan 02-03 complete
Last activity: 2026-02-17 — Completed 02-03-PLAN.md (Notebook Polish & Display Utilities)

Progress: [███░░░░░░░] 22%

## Performance Metrics

**Velocity:**
- Total plans completed: 5
- Average duration: 7 min
- Total execution time: 0.5 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01 | 3/3 | 25 min | 8 min |
| 02 | 2/3 | 9 min | 4.5 min |

**Recent Trend:**
- Last 5 plans: 01-02 (5 min), 01-03 (15 min), 02-01 (4 min), 02-03 (5 min)
- Trend: Accelerating

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

### Pending Todos

None yet.

### Blockers/Concerns

**Timeline urgency:** Workshop 2 materials needed THIS WEEK (Cohort 2 starts). Phase 1 must complete quickly to enable Phase 2 delivery.

**Demo complexity risk:** New demos (tool use, memory, code sandbox) are hypothesized to produce "aha moments" but not student-tested. Each demo needs clear one-sentence "aha moment" defined before building.

## Session Continuity

Last session: 2026-02-17 (phase execution)
Stopped at: Completed 02-01-PLAN.md (LLM Intuition N-gram Demo) and 02-03-PLAN.md
Resume file: None
