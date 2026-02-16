# Architecture Research

**Domain:** AI Agent Education Curriculum — Demo App, Notebooks, Curriculum
**Researched:** 2026-02-16
**Confidence:** MEDIUM

## Component Boundaries

### 1. Demo App (scratchpad/demos/)

**Current state:** React 19 + Vite 7 + Tailwind 3 + Framer Motion 12 + Zustand 5. Two existing demos (LLM Intro, ReAct Intro) with HashRouter routing. TypeScript.

**Structure:**
```
scratchpad/demos/src/
├── App.tsx              # Main router
├── main.tsx             # Entry point
├── index.css            # Global styles
├── components/          # Shared UI components
├── reactIntro/          # ReAct demo page
├── store/               # Zustand state management
├── utils/               # Shared utilities
└── assets/
```

**Recommended structure for new demos:**
```
scratchpad/demos/src/
├── App.tsx              # Router — add routes for new demos
├── components/
│   ├── common/          # Shared across all demos
│   │   ├── WorkshopLayout.tsx    # Standard page layout
│   │   ├── StepDisplay.tsx       # Animated step-by-step viewer
│   │   ├── CodeBlock.tsx         # Syntax-highlighted code
│   │   └── NavigationBar.tsx     # Cross-demo navigation
│   └── ...existing components
├── demos/
│   ├── llm-intro/       # Existing LLM intuition demo
│   ├── react-intro/     # Existing ReAct demo (move from reactIntro/)
│   ├── tool-use/        # NEW: Tool picker visualization
│   ├── memory/          # NEW: Memory timeline visualization
│   └── code-sandbox/    # NEW: Code execution visualization
├── store/               # Zustand stores (per-demo or shared)
└── utils/
```

**Key principle:** Each demo is a self-contained directory with its own components, but shares common layout/UI from `components/common/`.

### 2. Jupyter Notebooks (notebooks/)

**Current state:** 5 notebooks (workshop_02 through workshop_06), functional but visually rough.

**Recommended notebook structure per workshop:**
```
notebooks/
├── workshop_02_prompt_engineering.ipynb
├── workshop_03_building_ai_agents_foundations.ipynb
├── workshop_04_tool_design_for_agents.ipynb
├── workshop_05_react_and_code_agents.ipynb
├── workshop_06_memory_and_conversations.ipynb
└── utils/               # Shared notebook helpers (optional)
    └── display.py       # Pretty-print helpers, rich output formatting
```

**Standard notebook cell structure:**
1. **Header cell** (markdown): Workshop title, "Building on: [previous concept]", learning objectives
2. **Setup cell** (code): Imports, configuration, environment check
3. **Concept sections** (alternating): Brief markdown context → clean code cell → output
4. **Summary cell** (markdown): Key takeaways, link to interactive demo, preview of next workshop

**Visual design principles:**
- Clear section headers with consistent formatting
- Code cells are the star — minimal markdown between them
- Inline comments where code isn't self-explanatory
- Consistent output formatting (use Rich or custom display helpers)
- No long prose blocks — instructor talks through it live

### 3. Curriculum Plan

**Format:** A single markdown document mapping all 8 workshops.

**Structure per workshop:**
```markdown
## Workshop N: [Title]

**Concept:** [One-sentence core idea]
**Building on:** Workshop N-1's [concept]
**Demo:** [which interactive demo, if any]
**Notebook:** [which notebook file]
**Time allocation:**
- 10-15 min: Demo / concept introduction
- 35-40 min: Notebook walkthrough
- 5-10 min: Q&A / preview next workshop
```

### 4. Agent Code (demo/analytics_assistant/)

**Status:** Working, no changes needed. Students build their own version of this in weeks 7-8.

**Role in curriculum:** Reference implementation that notebooks import from and demos visualize.

## Data Flow

### How a Workshop's Materials Connect

```
Curriculum Plan
    │ defines learning objectives for Workshop N
    ↓
Interactive Demo (10-15 min)
    │ builds visual intuition for the concept
    │ students interact, see cause → effect
    ↓
Jupyter Notebook (35-40 min)
    │ students code the concept hands-on
    │ imports from demo/analytics_assistant/ where relevant
    │ instructor walks through live
    ↓
Student Understanding
    │ reinforced by seeing the same concept in two formats
    ↓
Next Workshop
    │ opens with "Building on: [previous concept]"
```

### Cross-Workshop Narrative Arc

```
W2: LLM Fundamentals & Prompt Engineering
    "LLMs are next-token predictors you can steer with prompts"
    ↓
W3: Agent Foundations
    "An agent wraps an LLM with a loop: think → decide → act"
    ↓
W4: Tool Design
    "Tools give agents capabilities — the agent CHOOSES which tool to use"
    ↓
W5: ReAct Loop & Code Agents
    "ReAct = Think → Act → Observe, repeated. Code agents generate and run code."
    ↓
W6: Memory & Conversations
    "Memory lets agents use context from previous turns"
    ↓
W7: Student Check-in
    "Now YOU build an agent — all the pieces connect"
    ↓
W8: Presentations
    "Show what you built"
```

## Suggested Build Order

Given cohort starts THIS WEEK and iterative delivery:

### Week 1 Priority: Workshop 2 Materials

Workshop 1 (intro) is already done. The first real content workshop is Workshop 2.

1. **Curriculum plan** (all workshops) — LOW effort, HIGH value. Do this first to see the full arc.
2. **Workshop 2 notebook revamp** — students see this first, sets the quality bar
3. **Shared demo design system** — common layout/navigation for all future demos
4. **Existing demos polish** — ensure LLM intro + ReAct demos match new quality bar

### Week 2: Workshop 3 Materials
1. Workshop 3 notebook revamp
2. New demo if needed (agent foundations may not need a standalone demo — existing ReAct demo may cover it)

### Weeks 3-4: Workshops 4-5 + New Demos
1. Workshop 4 notebook revamp + **Tool Use demo** (highest-value new demo)
2. Workshop 5 notebook revamp + **Code Sandbox demo**

### Weeks 5-6: Workshop 6 + Final Demo
1. Workshop 6 notebook revamp + **Memory demo**
2. Polish all materials for workshops 7-8

### Critical Path
```
Curriculum Plan → All notebooks → All demos
       ↓                ↓              ↓
    (Week 1)      (1 per week)   (Weeks 3-6)
```

**The curriculum plan must come first** — it defines what each workshop covers, which determines what each notebook and demo needs.

**Notebooks are the critical path** — one must be ready each week before the workshop happens.

**Demos can lag by 1 week** — if a demo isn't ready, the notebook + instructor explanation is sufficient. Demos enhance but aren't strictly required for any single workshop.

## Patterns to Follow

### Pattern 1: Demo as "Explorable Explanation"
Each demo should follow the Bret Victor / Nicky Case pattern:
- Start with a concrete scenario (not abstract theory)
- Let students manipulate ONE variable at a time
- Show immediate visual feedback
- Build complexity progressively (start simple, add layers)

### Pattern 2: Notebook as "Guided Lab"
Notebooks should feel like a lab session:
- Brief context (what we're doing and why)
- Working code to run (observe)
- Code to modify (experiment)
- Clean output formatting (understand results)

### Pattern 3: Shared Components Across Demos
Build reusable components early:
- `WorkshopLayout` — consistent page structure, navigation
- `StepDisplay` — animated step-by-step visualization (reused in ReAct, Tool Use, Code Sandbox)
- `CodeBlock` — syntax-highlighted code display
- `AnimatedTransition` — Framer Motion wrappers for consistent animations

### Pattern 4: Offline-First Demos
All demos must work without network:
- Simulated LLM responses (pre-recorded, realistic delays)
- No fetch() to external APIs
- Static data for all visualizations
- Works on projector resolution (1024x768+)

## Anti-Patterns to Avoid

| Anti-Pattern | Why Bad | Instead |
|-------------|---------|---------|
| Demo-first development | May visualize wrong concept | Notebook first → demo visualizes what notebook teaches |
| Monolithic demo components | Hard to ship incrementally | Isolated per-demo directories with shared components |
| Real API calls in demos | Fails during class, costs money | Pre-recorded simulated responses |
| Long markdown blocks in notebooks | Clutter during live walkthrough | Brief context, code is the star |
| Building all workshops upfront | No time to incorporate feedback | One workshop ahead, iterate |

## Sources

- Existing codebase analysis (scratchpad/demos/ structure, package.json)
- Explorable explanations design principles (Bret Victor, Nicky Case)
- Educational content delivery patterns
- React SPA architecture best practices
- Cohort 1 feedback (LLM demo success, ReAct demo neutral)

---
*Architecture research for: AI Agent Education Curriculum*
*Researched: 2026-02-16*
