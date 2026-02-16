# Feature Research

**Domain:** AI Agent Education Curriculum — Interactive Demos & Polished Notebooks
**Researched:** 2026-02-16
**Confidence:** MEDIUM (based on cohort 1 experience and educational design principles)

## Feature Landscape

### Table Stakes (Students Expect These)

Features that must be present or the learning experience feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear visual hierarchy in notebooks | Students scan structure during live lecture — messy notebooks = lost students | LOW | Headers, consistent spacing, grouped cells |
| Working code that runs top-to-bottom | Students re-run notebooks to review — broken execution order destroys trust | LOW | Every notebook must `Run All` cleanly |
| Step-by-step progression within each demo | Students need to see cause → effect, not just the final result | MEDIUM | Demos should have clear "steps" or stages |
| Immediate visual feedback on interaction | Students must see something happen when they click/type in a demo | LOW | Animations, highlights, state changes on every input |
| Consistent design across all demos | Switching visual styles between workshops is disorienting | MEDIUM | Shared Tailwind theme, same layout patterns, navigation |
| Recap/bridge at each workshop start | Students forget between sessions — need "previously on..." context | LOW | Brief cell or demo screen showing where they are in the journey |
| Mobile-friendly? No — projector-friendly | These are classroom tools, not phone apps — optimize for 1024x768+ | LOW | Large fonts, high contrast, no tiny controls |

### Differentiators (What Makes This Curriculum Stand Out)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Interactive concept demos (not just slides) | Students build intuition by DOING, not watching — the LLM demo proved this | HIGH | React/Vite/Tailwind app with per-concept interactive pages |
| Visual agent loop simulation | Students SEE the Think → Act → Observe cycle animate in real-time with actual data | HIGH | Existing ReAct demo is a starting point — extend with tool use visualization |
| Tool picker visualization | Students understand agents choose tools based on the question — demystifies "AI magic" | MEDIUM | Show the decision process: question → tool options → selection → result |
| Memory timeline visualization | Students see how conversation context accumulates and affects responses | MEDIUM | Timeline/stack showing what the agent "remembers" at each turn |
| Code sandbox visualization | Students see generated code, understand what "safe execution" means, see results | MEDIUM | Show: LLM generates code → AST validation → sandboxed execution → result |
| Workshop journey map | Students always know where they are in the 8-week arc and what each piece connects to | LOW | Visual progression in the demo app — "You are here" across all workshops |
| Clean, branded notebook experience | Professional feel signals investment in students; rough notebooks signal "quick and dirty" | MEDIUM | Consistent formatting, syntax highlighting, clear output formatting |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Real API calls in demos | "See the real thing work" | Fails during class (network, keys, rate limits), costs money, slow | Simulated responses with realistic delays and pre-recorded LLM outputs |
| Editable code in web demos | "Let students experiment" | Students break demos, debugging eats class time, scope creep | Keep demos focused on visualization; experimentation happens in notebooks |
| Comprehensive written explanations in notebooks | "Students can self-study" | Notebooks are lecture companions, not textbooks — text clutter hurts live use | Minimal markdown, focus on code + inline comments, verbal explanation fills gaps |
| Gamification (quizzes, scores, badges) | "Increase engagement" | 1-hour sessions don't leave room; adds significant implementation complexity | Engagement through interaction and "aha moments", not game mechanics |
| Video recordings embedded in demos | "Students can review at home" | High production cost, quickly outdated, large file sizes | Demo app is self-explanatory; notebooks serve as review material |
| Student login / progress tracking | "Know where each student is" | Authentication complexity, privacy concerns, overkill for 8-week cohort | Instructor observes engagement in class; Workshop 7 check-in catches gaps |

## Feature Dependencies

```
[Workshop Journey Map]
    └──enhances──> [All individual demos]

[Consistent demo design system]
    └──requires──> [Shared Tailwind theme + component library]
                       └──enhances──> [Every new demo built faster]

[Tool Picker Demo]
    └──requires──> [Agent concept from Workshop 3 notebook]
    └──enhances──> [ReAct Demo understanding]

[Memory Timeline Demo]
    └──requires──> [Basic agent loop concept]
    └──enhances──> [Students' own agent project (Workshop 7)]

[Code Sandbox Demo]
    └──requires──> [Tool use concept]
    └──enhances──> [Understanding of SafeCodeExecutor in notebooks]
```

### Dependency Notes

- **Tool Picker Demo requires Agent Foundations (Workshop 3):** Students need to understand what an agent IS before seeing how it picks tools
- **Memory Timeline requires basic agent loop:** Without understanding the loop, memory is just "a list of stuff"
- **Shared design system enhances all demos:** Build this first, every subsequent demo benefits
- **Journey Map enhances all demos:** Gives every demo context in the larger curriculum

## MVP Definition

### Launch With (v1 — Workshop 2)

Minimum needed for the first workshop of cohort 2.

- [ ] Revised curriculum plan — know what each workshop covers
- [ ] Workshop 2 notebook revamped — clean visual design, polished code
- [ ] Existing demos working and accessible — LLM intuition + ReAct loop
- [ ] Shared demo design system — consistent Tailwind theme for new demos

### Add After Validation (v1.x — Workshops 3-5)

Build alongside the cohort schedule.

- [ ] Tool use interactive demo — for workshop covering agent tools
- [ ] Memory timeline demo — for workshop covering conversations
- [ ] Code sandbox demo — for workshop covering code execution
- [ ] Remaining notebook revamps (workshops 3-6) — one per week

### Future Consideration (v2+)

Features to consider for cohort 3 or beyond.

- [ ] Workshop journey map — visual progression across all 8 weeks
- [ ] Student starter template — pre-configured project skeleton for Workshop 7
- [ ] Demo gallery page — single entry point showing all available demos

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Curriculum plan | HIGH | LOW | P1 |
| Notebook visual revamp (all 5) | HIGH | MEDIUM | P1 |
| Shared demo design system | HIGH | MEDIUM | P1 |
| Tool use demo | HIGH | HIGH | P1 |
| Memory timeline demo | HIGH | HIGH | P1 |
| Code sandbox demo | MEDIUM | HIGH | P2 |
| Workshop journey map | MEDIUM | LOW | P2 |
| Notebook code quality cleanup | MEDIUM | MEDIUM | P2 |
| Student starter template | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for cohort 2 quality bar
- P2: Should have, add as time allows
- P3: Nice to have, consider for cohort 3

## Competitor Feature Analysis

| Feature | fast.ai | DeepLearning.AI | 3Blue1Brown | Our Approach |
|---------|---------|-----------------|-------------|--------------|
| Interactive visualizations | Minimal — notebook-heavy | Video + playground | Exceptional animated explanations | Interactive web demos (closest to 3B1B in spirit) |
| Hands-on coding | Notebooks from day 1 | Labs in platform | N/A (explainer only) | Notebooks as lecture companions, own project in weeks 7-8 |
| Concept progression | Top-down (build first, theory later) | Bottom-up (theory first) | Concept-by-concept | Progressive build-up with demos making each concept tangible |
| Student engagement | Community forums | Graded assignments | YouTube comments | 1-hour live workshops with interactive demos + instructor |

## Sources

- Cohort 1 instructor observations and implicit student feedback
- Explorable explanations community (Nicky Case, Bret Victor principles)
- 3Blue1Brown pedagogical approach (visual intuition before formalism)
- fast.ai teaching philosophy (practical-first learning)
- Educational UX design principles (progressive disclosure, immediate feedback)

---
*Feature research for: AI Agent Education Curriculum*
*Researched: 2026-02-16*
