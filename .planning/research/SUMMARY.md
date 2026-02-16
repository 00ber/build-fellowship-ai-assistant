# Project Research Summary

**Project:** Build Fellowship AI Assistant Education Curriculum
**Domain:** Interactive Educational Content — AI Agent Workshops
**Researched:** 2026-02-16
**Confidence:** MEDIUM-HIGH

## Executive Summary

This project is an 8-week hands-on AI agent education curriculum delivered through 1-hour weekly workshops. Experts in this domain follow the "explorable explanations" pattern pioneered by 3Blue1Brown and Bret Victor: start with visual intuition through interactive demos, then reinforce with hands-on coding in notebooks. The curriculum builds progressively from LLM fundamentals through to students building their own agents in weeks 7-8.

The recommended approach is iterative delivery aligned with cohort schedule: establish a complete curriculum plan first, then prepare materials one workshop ahead with a consistent baseline quality bar. Interactive demos should be simple "aha moment" tools (10-15 minutes max) that work offline, while Jupyter notebooks serve as lecture companions optimized for live walkthrough rather than solo reading. The existing stack (React 19 + Vite + Tailwind + Framer Motion + Zustand) is solid and needs only minor additions.

The key risk is time pressure leading to inconsistent quality across workshops, where early workshops get polished but later ones feel rushed. This is mitigated by establishing minimal quality standards for ALL workshops before deeply polishing any single one, and maintaining the "one workshop ahead" cadence rather than attempting to build everything upfront. Secondary risks include over-engineering demos that impress but don't teach, and conceptual gaps between workshops that break the narrative arc.

## Key Findings

### Recommended Stack

The existing stack is well-chosen for educational interactive demos and requires minimal additions. React 19 provides modern features like transitions and suspense, Vite offers fast development iteration critical for workshop-driven timelines, and Framer Motion enables declarative animations perfect for step-by-step visualizations. The stack is already in production use with two working demos.

**Core technologies (already in place):**
- React 19.1.1: UI framework — modern features, component-based architecture ideal for isolated demo pages
- TypeScript 5.8.3: Type safety — catches errors early, especially important for educational code that must work reliably
- Vite 7.1.2: Build tool — fast HMR enables rapid iteration during workshop prep
- Tailwind CSS 3.4.17: Styling — utility-first approach allows consistent design system across demos
- Framer Motion 12.23.12: Animations — declarative API perfect for step-by-step concept visualization
- Zustand 5.0.8: State management — simple API for demo state (current step, user selections)

**Additions needed (minimal):**
- react-syntax-highlighter 15.x: Code display in demos (tool use, code sandbox)
- lucide-react: Consistent icon set across all demos
- Rich 13.0+ (Python): Already available, use for pretty notebook output formatting

**What NOT to use:**
- D3.js (overkill for UI animation), Three.js (3D not needed), Monaco Editor (editable code in demos is an anti-feature), Jupyter Widgets (fragile, adds complexity), real API calls in demos (network failures during class)

### Expected Features

The feature landscape divides cleanly into table stakes that students expect from any educational content, differentiators that make this curriculum stand out, and anti-features that sound good but are actually problematic for 1-hour live workshops.

**Must have (table stakes):**
- Clear visual hierarchy in notebooks — students scan structure during live lecture
- Working code that runs top-to-bottom — broken execution destroys trust
- Step-by-step progression in demos — students need to see cause → effect, not just final result
- Immediate visual feedback on interaction — something must happen when they click
- Consistent design across all demos — switching visual styles is disorienting
- Recap/bridge at each workshop start — students forget between sessions

**Should have (differentiators):**
- Interactive concept demos (not just slides) — students build intuition by DOING
- Visual agent loop simulation — see Think → Act → Observe animate with real data
- Tool picker visualization — understand how agents choose tools based on the question
- Memory timeline visualization — see conversation context accumulate
- Code sandbox visualization — see LLM generate code → validate → execute → result
- Workshop journey map — always know where you are in the 8-week arc

**Anti-features (defer or avoid):**
- Real API calls in demos — fails during class, costs money, slow
- Editable code in web demos — students break demos, debugging eats class time
- Comprehensive written explanations in notebooks — these are lecture companions, not textbooks
- Gamification (quizzes, scores) — 1-hour sessions don't leave room
- Student login/progress tracking — overkill for 8-week cohort

### Architecture Approach

The architecture follows a three-layer separation: interactive demos live in a React SPA with HashRouter navigation, Jupyter notebooks serve as lecture companions with consistent cell structure, and a curriculum plan document maps the 8-week narrative arc. Each demo is self-contained but shares common UI components. Notebooks are optimized for live walkthrough with minimal markdown and clean code cells.

**Major components:**

1. **Demo App (scratchpad/demos/)** — React 19 SPA with per-concept interactive pages. New structure: `demos/[concept-name]/` directories with shared `components/common/` for layouts, step displays, code blocks, navigation. Each demo self-contained but visually consistent.

2. **Jupyter Notebooks (notebooks/)** — One per workshop (workshops 2-6), optimized for live lecture. Standard structure: header cell (title, learning objectives), setup cell (imports), concept sections (brief markdown → code → output), summary cell (takeaways, link to demo, preview next workshop). Code is the star, not prose.

3. **Curriculum Plan** — Single markdown document mapping all 8 workshops with learning objectives, time allocations, and narrative bridges. Defines what each workshop covers, which determines notebook content and demo requirements.

4. **Agent Code (demo/analytics_assistant/)** — Reference implementation students build toward in weeks 7-8. Working, no changes needed.

**Data flow:** Curriculum plan defines learning objectives → Interactive demo (10-15 min) builds visual intuition → Jupyter notebook (35-40 min) provides hands-on coding → Next workshop builds on previous concept.

### Critical Pitfalls

Research identified six critical pitfalls that could derail workshop quality or student learning, all grounded in cohort 1 feedback and educational design principles.

1. **Over-engineering demos that don't clarify** — Building visually impressive demos that showcase technical capability but don't produce "aha moments." Students think "that's cool" but can't explain what they learned. Prevention: write one-sentence "aha moment" for each demo before building, if demo doesn't directly produce it, simplify.

2. **Polishing notebooks for solo reading when they're used live** — Spending effort on long explanations and comprehensive markdown when the instructor walks through them live. Extra text becomes clutter. Prevention: optimize notebooks for live walkthrough with clean visual hierarchy, minimal markdown, code cells as the star.

3. **Conceptual gaps between workshops** — Each workshop makes sense individually but students can't connect the concepts. They can't reconstruct the progression. Prevention: every workshop starts with "previously on..." recap, demo app shows visual journey map, notebooks open with "Building on" cell.

4. **Demo complexity exceeding 1-hour constraints** — Building demos that take 20 minutes to walk through, leaving insufficient time for notebooks. Or demos so complex that debugging during class eats teaching time. Prevention: time-box demos to 10-15 min max, design clear "happy path" taking 2-3 minutes, always have static fallback.

5. **Inconsistent quality across workshops** — First 2-3 workshops get full attention while later ones are rushed. Students experience quality cliff mid-course. Prevention: establish minimal quality bar for ALL workshops before polishing any single one. Consistent "good" beats alternating "excellent" and "rough."

6. **Demos that work locally but break during class** — Interactive demos depend on network calls, browser states, or timing that fails in classroom with projector lag or network issues. Prevention: all demos work fully offline with mock data, never make real API calls, deploy to static hosting, test at projector resolution (1024x768).

## Implications for Roadmap

Based on research, the roadmap should follow workshop schedule with iterative delivery. The critical insight is that materials are consumed weekly in sequence, so the build order must align with cohort timeline while maintaining quality consistency.

### Phase 1: Curriculum Foundation (Week 1)
**Rationale:** Must come first — defines what each workshop covers, which determines all subsequent work. Low effort, high value. Cannot build workshop materials without knowing the learning objectives and narrative arc.
**Delivers:** Complete 8-workshop curriculum plan with learning objectives, time allocations, narrative bridges between workshops.
**Addresses:** Conceptual gaps pitfall (establishes narrative arc upfront), inconsistent quality pitfall (defines baseline standards).
**Avoids:** Building demos or polishing notebooks before understanding the full curriculum story.

### Phase 2: Workshop 2 Materials (Week 1)
**Rationale:** Workshop 1 is done (intro), Workshop 2 is the first real content. Sets quality bar students will expect. Cohort starts THIS WEEK, this is the immediate deliverable.
**Delivers:** Revamped Workshop 2 notebook (clean visual design, polished code), shared demo design system (Tailwind theme, WorkshopLayout component), polished existing demos (LLM intuition, ReAct loop).
**Addresses:** Table stakes features (clear visual hierarchy, consistent design), inconsistent quality pitfall (establishes baseline).
**Uses:** Existing stack (React, Tailwind, Framer Motion), adds react-syntax-highlighter and lucide-react.
**Implements:** Notebook standard structure, demo shared components pattern.

### Phase 3: Workshop 3 Materials (Week 2)
**Rationale:** One workshop ahead of cohort schedule. Workshop 3 covers agent foundations, may not need new standalone demo (existing ReAct demo covers the concept).
**Delivers:** Revamped Workshop 3 notebook applying baseline quality standards.
**Addresses:** On-schedule delivery, maintains quality consistency.
**Avoids:** Time pressure leading to rushed materials.

### Phase 4: Workshop 4 Materials + Tool Use Demo (Week 3)
**Rationale:** Workshop 4 covers tool design for agents — this is the highest-value new demo (students must understand agents CHOOSE tools). Time to introduce first net-new interactive demo.
**Delivers:** Revamped Workshop 4 notebook, new tool picker visualization demo (shows question → tool options → selection → result).
**Addresses:** Differentiator features (tool picker visualization), aha moment pattern (agents don't follow scripts).
**Uses:** Shared demo design system from Phase 2, StepDisplay component for step-by-step visualization.
**Implements:** Demo as "explorable explanation" pattern, offline-first demo architecture.
**Avoids:** Demo complexity pitfall (10-15 min time-box enforced).

### Phase 5: Workshop 5 Materials + Code Sandbox Demo (Week 4)
**Rationale:** Workshop 5 covers ReAct loop and code agents. Code execution is a new concept requiring visualization (how agents generate and safely run code).
**Delivers:** Revamped Workshop 5 notebook, code sandbox visualization demo (LLM generates code → AST validation → sandboxed execution → result).
**Addresses:** Differentiator features (code sandbox visualization).
**Uses:** react-syntax-highlighter for code display, shared StepDisplay component.
**Implements:** Offline-first pattern (pre-recorded code generation examples).

### Phase 6: Workshop 6 Materials + Memory Demo (Week 5)
**Rationale:** Workshop 6 covers memory and conversations. Memory timeline visualization helps students understand context accumulation across turns.
**Delivers:** Revamped Workshop 6 notebook, memory timeline demo (shows what agent "remembers" at each turn).
**Addresses:** Differentiator features (memory timeline visualization).
**Uses:** Framer Motion for timeline animation, Zustand for conversation state.
**Implements:** Progressive disclosure pattern (start with one turn, build complexity).

### Phase 7: Workshop 7-8 Polish (Week 6)
**Rationale:** Workshops 7-8 are student check-in and presentations. No new concepts, but materials need to support student project work.
**Delivers:** Student project starter template (optional), demo gallery page showing all available demos, any final polish on workshop materials.
**Addresses:** Journey map feature (students see full curriculum arc), support for student project phase.

### Phase Ordering Rationale

- **Curriculum first, always:** Cannot build materials without knowing learning objectives and narrative arc. This prevents conceptual gaps and inconsistent framing.
- **Align with cohort schedule:** Materials delivered one workshop ahead, prevents time pressure and maintains quality consistency. Iterative delivery allows incorporating feedback.
- **Establish baseline before polish:** Phase 2 sets quality standards (notebook structure, demo design system) that all subsequent phases follow. Prevents alternating excellent/rough quality.
- **Demos follow notebook concepts:** New demos in phases 4-6 visualize concepts already taught in notebooks. Demo enhances but isn't required — notebook + instructor explanation is sufficient fallback.
- **Dependencies respected:** Tool use demo (Phase 4) requires agent foundations from Workshop 3. Memory demo (Phase 6) requires agent loop concept. Build order follows conceptual dependencies.

### Research Flags

**Phases likely needing deeper research:**
- **Phase 4 (Tool Use Demo):** May need UX research on tool selection visualization patterns — how to show decision-making process intuitively. Standard patterns exist (decision trees, flow diagrams) but may need testing for "aha moment" effectiveness.
- **Phase 6 (Memory Demo):** Timeline visualization patterns for conversational context — may need research on how to visually represent accumulated memory without clutter.

**Phases with standard patterns (skip research-phase):**
- **Phase 2 (Workshop 2 Materials):** Notebook formatting and demo design systems are well-established patterns. React component libraries and Tailwind design systems have extensive documentation.
- **Phase 3 (Workshop 3 Materials):** Notebook revamp following established template, no new patterns.
- **Phase 5 (Code Sandbox Demo):** Code display and syntax highlighting are solved problems (react-syntax-highlighter). Execution flow visualization follows standard "pipeline stages" pattern.
- **Phase 7 (Polish):** Gallery pages and project templates are standard web dev patterns.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Existing stack already proven with cohort 1, only minor additions needed. All technologies have extensive documentation and community support. |
| Features | MEDIUM | Feature identification based on cohort 1 implicit feedback and educational design principles, but not explicit student surveys. Anti-features grounded in domain expertise. |
| Architecture | MEDIUM | Architecture follows established patterns (React SPA, Jupyter notebooks, progressive curriculum) but specific implementation choices for new demos not yet validated. |
| Pitfalls | MEDIUM | Pitfalls based on cohort 1 observations and educational technology domain knowledge, but not all failure modes experienced directly. Offline-first demos is a strong mitigation. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

Research was thorough but several areas need validation during implementation:

- **Demo "aha moment" effectiveness:** Each new demo (tool picker, memory timeline, code sandbox) has a hypothesized learning outcome, but actual student comprehension won't be validated until Workshop 2 starts. Mitigation: build clear metrics into Workshop 7 check-in (can students explain tool selection? memory accumulation? code execution safety?).

- **Time allocation accuracy:** 10-15 min demo time-boxes are estimates based on existing demos, but new demos with more complexity may take longer with 20 students asking questions. Mitigation: dry-run each demo with timer, have static fallback (screenshots/GIFs), design clear "happy path" for minimal time.

- **Notebook readability during live lecture:** Optimizing notebooks for "lecture companion" not "solo reading" is based on teaching best practices, but specific formatting choices (header styles, code cell length, markdown density) need validation. Mitigation: test notebook walkthrough in Week 1 with Workshop 2 materials, iterate format based on flow.

- **Progressive narrative arc success:** Recaps and "building on" cells are hypothesized to bridge conceptual gaps, but effectiveness unknown until Workshop 7 check-in reveals whether students can connect concepts. Mitigation: explicit check-in questions in Workshop 7 testing conceptual connections.

- **React 19 + Framer Motion 12 compatibility edge cases:** While documented as compatible, specific animation patterns for educational step-by-step demos may hit undocumented edge cases. Mitigation: existing ReAct demo proves basic patterns work, stick to established motion variants.

## Sources

### Primary (HIGH confidence)
- Existing codebase (scratchpad/demos/, notebooks/) — verified versions, working demos, actual package.json dependencies
- Cohort 1 instructor direct observations — LLM demo success, ReAct demo neutral reception, time pressure patterns
- React 19 official documentation — compatibility, new features
- Framer Motion 12 documentation — animation patterns for step-by-step UIs
- Jupyter/IPython documentation — notebook display and formatting options

### Secondary (MEDIUM confidence)
- Educational design principles — explorable explanations community (Bret Victor, Nicky Case), 3Blue1Brown pedagogical approach
- Interactive visualization best practices — progressive disclosure, immediate feedback patterns
- fast.ai teaching philosophy — practical-first learning, top-down approach
- React SPA architecture best practices — component isolation, shared design systems

### Tertiary (LOW confidence, needs validation)
- Workshop time allocation estimates — based on existing demos but not validated with new content
- "Aha moment" hypotheses for new demos — based on domain expertise but not student-tested
- Optimal notebook formatting for live lecture — based on teaching principles but specific choices not validated

---
*Research completed: 2026-02-16*
*Ready for roadmap: yes*
