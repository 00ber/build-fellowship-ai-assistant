# Roadmap: Build Fellowship AI Curriculum Revamp (Cohort 2)

## Overview

This roadmap delivers a revamped 8-week AI agent curriculum through iterative workshop-by-workshop development. The journey starts with curriculum planning and shared infrastructure, then builds materials one workshop ahead of the cohort schedule. Each phase delivers complete workshop materials (notebooks and demos) aligned with the weekly teaching timeline, ensuring students experience consistent quality from Workshop 2 through Workshop 6.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Curriculum Documentation + Demo Infrastructure** - Document existing workshop structure, add narrative arc, build shared demo design system
- [ ] **Phase 2: Workshop 2 Materials (LLM Fundamentals & Prompt Engineering)** - Polish LLM demo, build Prompt Anatomy + Side-by-side demos, revamp W2 notebook
- [ ] **Phase 3: Workshop 3 Materials (Agent Foundations)** - Build Behind the Curtain demo, revamp W3 notebook
- [ ] **Phase 4: Workshop 4 Materials (Tool Design)** - Build Tool Use demo, revamp W4 notebook
- [ ] **Phase 5: Workshop 5 Materials (ReAct & Code Agents)** - Polish ReAct demo, build Code Sandbox demo, revamp W5 notebook
- [ ] **Phase 6: Workshop 6 Materials (Memory & Conversations)** - Build Memory demo, revamp W6 notebook

## Phase Details

### Phase 1: Curriculum Documentation + Demo Infrastructure
**Goal**: Document existing workshop structure with narrative arc, and build shared demo design system and live LLM streaming capability
**Depends on**: Nothing (first phase)
**Requirements**: CURR-01, CURR-02, CURR-03, INFR-01, INFR-03
**Success Criteria** (what must be TRUE):
  1. Instructor can view the documented 8-workshop plan with learning objectives, topics, and time allocations for each workshop
  2. Instructor can see the narrative arc showing how each workshop builds on previous concepts
  3. Shared demo design system exists with common layout, navigation, and Tailwind theme
  4. Live LLM streaming capability works with both simulated and real API modes, token-by-token display
**Plans:** 3 plans
- [ ] 01-01-PLAN.md — Curriculum documentation (narrative arc + 8 workshop sections + demo catalog)
- [ ] 01-02-PLAN.md — Demo app shell with sidebar navigation and shared design system
- [ ] 01-03-PLAN.md — LLM streaming infrastructure (simulated + real API + hidden toggle)

### Phase 2: Workshop 2 Materials (LLM Fundamentals & Prompt Engineering)
**Goal**: Deliver complete Workshop 2 materials — upgrade LLM demo with live mode showing real token probabilities, revamp notebook — setting the quality baseline for all subsequent workshops
**Depends on**: Phase 1
**Requirements**: INFR-02 (LLM demo), NOTE-01 (W2 portion), NOTE-03, DEMO-01 (dropped), DEMO-02 (dropped)
**Success Criteria** (what must be TRUE):
  1. Existing LLM intuition demo polished to match new shared design system with N-gram tab working
  2. Live mode tab shows real token probabilities, system prompt presets, and "What Else Could It Have Said?" interaction
  3. Workshop 2 notebook has clean visual hierarchy with consistent headers, formatting, and code style
  4. Workshop 2 notebook uses shared Python display utilities for pretty formatted output
  5. Exercise solutions are hidden behind collapsible elements
  6. Instructor can walk through Workshop 2 notebook in 35-40 minutes during live lecture
**Plans:** 3 plans
- [ ] 02-01-PLAN.md — Migrate and restyle N-gram demo into new demo shell with tab structure
- [ ] 02-02-PLAN.md — Build Live Mode with logprobs streaming, token picking, system prompt presets
- [ ] 02-03-PLAN.md — Shared Python display utilities + Workshop 2 notebook revamp

### Phase 3: Workshop 3 Materials (Agent Foundations)
**Goal**: Deliver complete Workshop 3 materials showing students what agents actually see and send to LLMs
**Depends on**: Phase 2
**Requirements**: NOTE-01 (W3 portion), NOTE-02 (W3 portion), DEMO-03
**Success Criteria** (what must be TRUE):
  1. Students can use Behind the Curtain demo to see the full context window an agent sends to the LLM, not just the user's question
  2. Workshop 3 notebook follows the same visual design and code quality standards as Workshop 2
  3. Workshop 3 notebook shows clear "building on" connection to Workshop 2 concepts
  4. Students can distinguish between "what the user types" and "what the agent sends to the LLM"
**Plans**: TBD

### Phase 4: Workshop 4 Materials (Tool Design)
**Goal**: Deliver complete Workshop 4 materials showing students how agents select and call tools
**Depends on**: Phase 3
**Requirements**: NOTE-01 (W4 portion), NOTE-02 (W4 portion), DEMO-04
**Success Criteria** (what must be TRUE):
  1. Students can interact with Tool Use demo to see an agent evaluate a question, consider available tools, select appropriate tools, and display results
  2. Tool Use demo visualizes the decision-making process step-by-step with clear "why this tool" reasoning
  3. Workshop 4 notebook follows established quality standards and shows "building on" connection to Workshop 3
  4. Students understand that agents choose tools based on the question, not follow predetermined scripts
**Plans**: TBD

### Phase 5: Workshop 5 Materials (ReAct & Code Agents)
**Goal**: Deliver complete Workshop 5 materials — polish existing ReAct demo, build Code Sandbox demo, revamp notebook
**Depends on**: Phase 4
**Requirements**: INFR-02 (ReAct demo), NOTE-01 (W5 portion), NOTE-02 (W5 portion), DEMO-06
**Success Criteria** (what must be TRUE):
  1. Existing ReAct loop demo polished to match shared design system
  2. Students can interact with Code Sandbox demo to see code generation, AST validation, sandboxed execution, and result display
  3. Code Sandbox demo visualizes the safety mechanisms that prevent dangerous code execution
  4. Workshop 5 notebook follows established quality standards and shows "building on" connection to Workshop 4
  5. Students understand the difference between generating code and safely executing it
**Plans**: TBD

### Phase 6: Workshop 6 Materials (Memory & Conversations)
**Goal**: Deliver complete Workshop 6 materials showing students how conversation context accumulates and affects agent responses
**Depends on**: Phase 5
**Requirements**: NOTE-01 (W6 portion), NOTE-02 (W6 portion), DEMO-05
**Success Criteria** (what must be TRUE):
  1. Students can interact with Memory demo to see a timeline of conversation turns and what the agent remembers at each step
  2. Memory demo visualizes how context accumulates and affects future responses
  3. Workshop 6 notebook follows established quality standards and completes the foundational learning arc before student projects
  4. Students can explain why agents need to track conversation history and what happens without it
  5. All workshop materials (W2-W6) are complete and ready for student project phase (Workshops 7-8)
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Curriculum Documentation + Demo Infrastructure | 0/TBD | Not started | - |
| 2. Workshop 2 Materials (LLM Fundamentals & Prompt Engineering) | 0/TBD | Not started | - |
| 3. Workshop 3 Materials (Agent Foundations) | 0/TBD | Not started | - |
| 4. Workshop 4 Materials (Tool Design) | 0/TBD | Not started | - |
| 5. Workshop 5 Materials (ReAct & Code Agents) | 0/TBD | Not started | - |
| 6. Workshop 6 Materials (Memory & Conversations) | 0/TBD | Not started | - |
