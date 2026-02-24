# Phase 3: Workshop 3 Materials (Agent Foundations) - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver complete Workshop 3 notebook showing students what agents are and how they work — from LLM limitations through the ReAct loop. No demo for this phase; the notebook is the sole deliverable. The notebook uses a Restaurant Finder scenario and incorporates W2 structured extraction as a building block.

**Scope change from original roadmap:** DEMO-03 (Behind the Curtain) is dropped. The notebook's code progression teaches agent concepts more effectively than a visual demo — students BUILD agents from scratch (v1→v4), which is more powerful than watching a pre-built agent run. The "Behind the Curtain" concept (seeing what the agent sends to the LLM) is addressed by printing the full prompt at key moments in the v4 agent, making the growing context visible without needing a separate React app.

</domain>

<decisions>
## Implementation Decisions

### Scenario: Restaurant Finder (replaces ER Hospital)
- Replace the ER wait time system with a Restaurant Finder scenario
- More engaging, lighter mood, universally relatable
- Functions chain naturally: wait time, ratings, distance, price, cuisine
- Simulated data for local restaurants (hardcoded dictionaries for structured data, text blurbs for unstructured)
- Queries scale in complexity: "What's the wait at Olive Garden?" → "Cheapest place within 10 min?" → "Best-rated Italian place factoring in wait AND travel time?"

### Structured Extraction as Setup Step (W2 Bridge)
- Restaurant data includes unstructured text (descriptions, review snippets)
- Before building agent tools, students use W2's structured extraction (Pydantic models) to pull out price ranges, cuisine types, etc.
- This is a preprocessing/setup step, NOT an agent tool — happens before the agent is built
- Shows W2 concepts as real building blocks without needing an explicit bridge section
- Brief W2 recap at the start of the notebook; no dedicated bridge section needed

### Context/History Visibility
- At key moments in the v4 (ReAct loop) agent, print the full prompt being sent to the LLM
- Students SEE the growing history — how previous step results feed into the next prompt
- Do NOT call this "memory" or introduce memory vocabulary — that's Workshop 6
- Just make visible: "the agent re-reads its entire history every step"
- The "show it, don't name it" approach — W6 will formalize what students already intuitively saw

### Notebook Structure
- Keep the existing teaching arc with the new scenario:
  1. Brief W2 recap
  2. LLM limitations (can't calculate, can't access data, can only generate text)
  3. But LLMs CAN plan (know what needs to be done)
  4. Structured extraction setup (pull clean data from unstructured restaurant info)
  5. Function calling bridge (LLM generates calls as text → system executes)
  6. Restaurant Finder scenario with increasing complexity
  7. Agent evolution: v1 (keyword matching) → v2 (LLM understanding) → v3 (LLM tool selection) → v4 (ReAct loop with visible history)
  8. ReAct pattern introduction
  9. Analytics assistant preview / what's next

### Formatting & Code Readability (Live Teaching)
- W2 quality standards: consistent H1/H2/H3 hierarchy, clean visual structure
- Smaller, focused code cells — one concept per cell, no walls of code
- Clean variable names and consistent coding style — must be scannable when projected on screen
- Clean output formatting — printed output easy to read on a projector
- Standout Key Insight callout blocks at critical teaching moments (not lost in code)

### Exercises
- No exercises in W3 — this is a guided instructor-led walkthrough
- Students run cells and follow along
- Exercises begin in Workshop 4

### Demo
- No React demo for Workshop 3
- The notebook's v1→v4 progression IS the teaching — building agents from scratch is more powerful than watching one run
- Development time invested in notebook quality instead

### Claude's Discretion
- Key Insight formatting approach (IPython.display, HTML blocks, or other Jupyter-native)
- Restaurant data specifics (which restaurants, exact unstructured text content, number of restaurants)
- Code cell granularity decisions (how to split existing large cells)
- Output formatting approach for clean projector display
- Exact placement and content of "print full prompt" moments in the v4 agent
- Analytics preview section at the end (keep, trim, or adjust to bridge toward W4)
- How structured extraction setup integrates with the rest of the notebook flow

</decisions>

<specifics>
## Specific Ideas

- The v1→v4 agent evolution is the core teaching arc — keyword matching breaks on variations, LLM understanding fixes it, tool selection adds flexibility, ReAct loop enables multi-step reasoning
- Structured extraction from unstructured restaurant text reinforces W2 without an explicit bridge lecture
- Printing the full prompt at step 3+ of the v4 agent (when history is interesting enough) shows students HOW the agent "knows" what happened — sets up W6's memory concepts implicitly
- The limitation discovered at the end of W3 (agents can call tools but the scenario is toy/simple) naturally leads into W4's "let's design REAL tools for REAL data"
- Each workshop's limitation→solution chain is confirmed sound: W3→W4→W5→W6

</specifics>

<deferred>
## Deferred Ideas

- "Behind the Curtain" React demo — originally planned for this phase, dropped after first-principles analysis. The concept (seeing full context window) is addressed by printing prompts in the notebook. Could be revisited as a standalone tool in future milestones if there's demand.
- Node graph visualization of agent reasoning — discussed as a potential demo approach. Not needed for W3 but could be valuable as a general debugging/teaching tool in future phases.

</deferred>

---

*Phase: 03-workshop-3-materials*
*Context gathered: 2026-02-24*
