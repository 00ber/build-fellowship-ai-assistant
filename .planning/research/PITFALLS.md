# Pitfalls Research

**Domain:** AI Agent Education Curriculum — Interactive Demos & Jupyter Notebooks
**Researched:** 2026-02-16
**Confidence:** MEDIUM (based on domain expertise and cohort 1 learnings)

## Critical Pitfalls

### Pitfall 1: Over-Engineering Demos That Don't Clarify

**What goes wrong:**
Building visually impressive demos that showcase technical capability but don't actually help students understand the concept. The demo becomes a spectacle rather than a learning tool. Students think "that's cool" but can't explain what they just saw.

**Why it happens:**
Builders optimize for "wow factor" instead of "aha moment." It's more fun to build flashy animations than to carefully design for pedagogical clarity. The LLM intuition demo worked because it made something abstract tangible — not because it was flashy.

**How to avoid:**
For each demo, write a one-sentence "aha moment" before building. Example: "Students should realize that an agent decides WHICH tool to use based on the question, not a fixed script." If the demo doesn't directly produce that aha, simplify it.

**Warning signs:**
- Demo takes more than 60 seconds to set up/explain before interaction
- You need to narrate what's happening because the visual doesn't speak for itself
- Students watch passively instead of interacting

**Phase to address:**
Curriculum planning phase — define the learning objective before designing any demo.

---

### Pitfall 2: Polishing Notebooks for Solo Reading When They're Used Live

**What goes wrong:**
Spending significant effort making notebooks self-contained learning resources (long explanations, comprehensive markdown cells) when the instructor walks through them live. The extra text becomes clutter during the lecture and students don't re-read notebooks afterward.

**Why it happens:**
The instinct to make "complete documentation." But these notebooks are lecture companions, not textbooks. The instructor's voice IS the narrative.

**How to avoid:**
Optimize notebooks for live walkthrough: clean visual hierarchy, clear section headers, minimal but purposeful markdown (setup context, not full explanations). Code cells should be the star — clean, well-formatted, with inline comments where the code isn't self-explanatory.

**Warning signs:**
- Markdown cells are longer than 3-4 lines
- You're duplicating what the instructor would say
- Notebook takes >15 minutes to read without the lecture

**Phase to address:**
Notebook revamp phase — establish the "lecture companion" design principle upfront.

---

### Pitfall 3: Conceptual Gaps Between Workshops

**What goes wrong:**
Each workshop makes sense individually, but students can't connect Workshop 3's agent foundations to Workshop 5's ReAct loop. The progressive build-up has invisible gaps that the instructor fills live but students can't reconstruct.

**Why it happens:**
Curriculum designers think in modules, but students think in stories. Without explicit "previously on..." bridges, each workshop feels like a fresh start.

**How to avoid:**
Every workshop starts with a 2-minute recap: "Last time we learned X. Today we're adding Y on top of that." The demo app can have a visual "journey map" showing where students are in the progression. Each notebook opens with a brief "Building on" cell.

**Warning signs:**
- Students ask "why are we doing this?" in week 4+
- Workshop 7 check-in reveals students can't explain the full agent architecture
- Students start their own project and don't know where to begin

**Phase to address:**
Curriculum planning phase — design the narrative arc across all 6 workshops.

---

### Pitfall 4: Demo Complexity Exceeding 1-Hour Workshop Constraints

**What goes wrong:**
Building a demo that takes 20 minutes to walk through, leaving only 40 minutes for the notebook — which isn't enough. Or the demo is so complex that debugging it during class eats into teaching time.

**Why it happens:**
Demos are designed in isolation without time-boxing against the 1-hour constraint. Interaction patterns that work in 5 minutes during development take 15 minutes with 20 students asking questions.

**How to avoid:**
Time-box each demo to 10-15 minutes MAX (including student interaction time). Design demos with a clear "happy path" that takes 2-3 minutes, then optional depth. Always have a static fallback (screenshots/GIFs) in case the demo breaks during class.

**Warning signs:**
- Demo requires more than 3 clicks/interactions to demonstrate the concept
- You can't explain the demo's purpose in one sentence
- Demo depends on external API calls that might fail during class

**Phase to address:**
Demo design phase — establish time budgets before implementation.

---

### Pitfall 5: Inconsistent Quality Across Workshops

**What goes wrong:**
First 2-3 workshops get full attention (polished demos, clean notebooks), later workshops are rushed due to time pressure. Students experience a quality cliff mid-course.

**Why it happens:**
Iterative delivery with a tight timeline. Cohort starts this week, so early workshops get more preparation time.

**How to avoid:**
Establish minimal quality bar for ALL workshops before deeply polishing any single one. A consistent "good" is better than alternating "excellent" and "rough." Define a checklist: each workshop must have [clean notebook + section headers + working code + optional demo].

**Warning signs:**
- Workshop 5's notebook still has rough formatting while Workshop 2 has custom styling
- You're spending more than 2x time on early workshops vs. later ones
- Later workshops feel like afterthoughts

**Phase to address:**
Curriculum planning phase — define the minimum viable workshop template first.

---

### Pitfall 6: Demos That Work Locally But Break During Class

**What goes wrong:**
Interactive demos depend on network calls, specific browser states, or timing that works in development but fails during a live presentation with projector lag, different browser settings, or network issues.

**Why it happens:**
Development environment is controlled; classroom environment is not. Vite dev server, API keys, CORS issues — all potential failure points.

**How to avoid:**
All demos should work fully offline with mock/simulated data. Never make real API calls during a demo — simulate LLM responses with pre-recorded data. Deploy to static hosting (already done at build-fellowship-demos.00ber.dev) and test on projector resolution.

**Warning signs:**
- Demo uses `fetch()` to external APIs
- Demo behavior changes based on response latency
- Demo hasn't been tested at 1024x768 resolution

**Phase to address:**
Demo implementation phase — "offline-first" as a hard requirement.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoded demo data | Faster demo development | Can't easily update examples | Always — demos should use curated, static data |
| Copy-paste between notebooks | Quick consistency | Updates need to propagate manually | MVP — extract shared utilities later if needed |
| Single-file React components | Faster initial build | Hard to maintain as demos grow | Only if demo is <200 lines |
| Skipping mobile responsiveness | Save development time | Students can't review on phones | Always — these are classroom projector demos |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Too many interactive controls at once | Students don't know where to look or what to click | Progressive disclosure — start with one interaction, reveal more as concept builds |
| Text-heavy demo explanations | Students read instead of interacting; disengagement | Use visual cues and labels, let the interaction teach, minimal text |
| No visual feedback on interaction | Students unsure if their click/input did anything | Immediate animation/highlight on every interaction |
| Tiny fonts on projector | Back-row students can't read code or labels | Minimum 18px for body text, 14px for code, test at 1024x768 |

## "Looks Done But Isn't" Checklist

- [ ] **Demo:** Often missing keyboard navigation — verify demo works without mouse clicks
- [ ] **Demo:** Often missing loading states — verify demo shows something while "processing"
- [ ] **Notebook:** Often missing setup cell (imports/config) — verify notebook runs top-to-bottom
- [ ] **Notebook:** Often missing clear section headers — verify a student can scan structure in 10 seconds
- [ ] **Curriculum:** Often missing recap at workshop start — verify each workshop references the previous one
- [ ] **Curriculum:** Often missing the "so what" — verify each concept links to the final agent project

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Demo too complex | LOW | Strip to core interaction, add depth as "bonus" section |
| Notebook quality inconsistent | MEDIUM | Apply template retroactively, focus on code cleanup over prose |
| Conceptual gap between workshops | MEDIUM | Add bridge slides/cells, update demo journey map |
| Demo breaks in class | LOW | Switch to static screenshots, explain concept verbally, fix for next session |
| Over-polished early, rough late | MEDIUM | Pause polish, bring all workshops to baseline, then iterate |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Over-engineered demos | Curriculum planning | Each demo has a one-sentence "aha moment" documented |
| Wrong notebook optimization | Notebook revamp | Notebooks tested in live-walkthrough simulation (not solo read) |
| Conceptual gaps | Curriculum planning | Narrative arc documented, each workshop has "building on" context |
| Time overflow | Demo design | Each demo time-boxed to 10-15 min with happy path tested |
| Inconsistent quality | All phases | Minimum quality checklist applied before any deep polish |
| Demos break in class | Demo implementation | All demos tested offline, no external API dependencies |

## Sources

- Cohort 1 feedback and instructor observations
- Educational technology design principles (constructivist learning theory)
- Interactive visualization best practices (explorable explanations community)
- Live coding/demo failure patterns from conference presentations

---
*Pitfalls research for: AI Agent Education Curriculum*
*Researched: 2026-02-16*
