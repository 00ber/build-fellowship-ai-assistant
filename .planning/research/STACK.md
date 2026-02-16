# Stack Research

**Domain:** AI Agent Education Curriculum — Interactive Demos & Jupyter Notebooks
**Researched:** 2026-02-16
**Confidence:** HIGH (existing stack already chosen, research focused on additions)

## Recommended Stack

### Core Technologies (Already In Place)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 19.1.1 | UI framework for demo app | Already in use, modern features (transitions, suspense) |
| TypeScript | 5.8.3 | Type safety for demo code | Already in use, catches errors early |
| Vite | 7.1.2 | Build tool / dev server | Already in use, fast HMR, minimal config |
| Tailwind CSS | 3.4.17 | Utility-first styling | Already in use, rapid UI development, consistent design |
| Framer Motion | 12.23.12 | Animations and transitions | Already in use, declarative animations perfect for step-by-step demos |
| Zustand | 5.0.8 | State management | Already in use, simple API, good for demo state (current step, selections) |

### Supporting Libraries (Add for New Demos)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-syntax-highlighter | 15.x | Code syntax highlighting in demos | Code Sandbox demo, any demo showing generated code |
| @radix-ui/react-tabs | latest | Accessible tab components | Demos with multiple views (e.g., "Prompt" vs "Response" tabs) |
| lucide-react | latest | Icon set | Consistent icons across demos (tools, memory, code) |

### Jupyter Notebook Stack

| Tool | Version | Purpose | Notes |
|------|---------|---------|-------|
| Jupyter / JupyterLab | 4.4.7+ | Notebook execution environment | Already in use |
| Rich | 13.0+ | Pretty terminal/output formatting | Already a dependency — use for notebook output formatting |
| IPython display | built-in | Custom HTML/Markdown rendering in cells | Use `display(Markdown(...))` for formatted output |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| uv | Python package management | Already in use for Python side |
| npm | JS package management | Already in use for demo app |
| ESLint | Code quality for demos | Already configured |

## Installation

```bash
# New demo dependencies (in scratchpad/demos/)
cd scratchpad/demos
npm install react-syntax-highlighter lucide-react

# TypeScript types
npm install -D @types/react-syntax-highlighter
```

No new Python dependencies needed — Rich and IPython are already available.

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Framer Motion | React Spring | Never for this project — Framer Motion already in use, switching adds cost for no benefit |
| Tailwind CSS | CSS Modules | Never — Tailwind already in use, consistent with existing demos |
| react-syntax-highlighter | Prism.js directly | If you need more control over tokenization — but the React wrapper is simpler |
| Zustand | React Context | For very simple state (single boolean) — but Zustand is already the pattern |
| Rich (Python output) | Custom HTML in notebooks | If you need highly custom visualizations — but Rich covers 90% of pretty output needs |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| D3.js | Massive learning curve, overkill for educational step-by-step demos. D3 is for data visualization, not UI animation. | Framer Motion + Tailwind + custom React components |
| Three.js / WebGL | 3D is not needed for these concepts — adds complexity without pedagogical value | 2D animations with Framer Motion |
| Monaco Editor | Full code editor in demos is an anti-feature — students should experiment in notebooks, not in demos | react-syntax-highlighter for display-only code |
| Reveal.js / Slidev | Slide frameworks — instructor already uses minimal slides, demos + notebooks are the content | Keep current minimal slide approach |
| nbconvert themes | Heavy theming of notebooks — these are lecture companions, not published documents | Light touch: consistent headers, clean code, Rich output |
| Jupyter Widgets (ipywidgets) | Interactive widgets in notebooks sound appealing but are fragile, add setup complexity, and the instructor controls the pace anyway | Web demos for interactivity, notebooks for code |

## Stack Patterns

**For step-by-step concept visualization (Tool Use, Memory, Code Sandbox):**
- Framer Motion `AnimatePresence` + `motion.div` for step transitions
- Zustand store to track current step, selections, state
- Tailwind for layout (grid/flex), colors, typography
- react-syntax-highlighter for any code display

**For notebook visual cleanup:**
- Consistent markdown headers (# Workshop N: Title)
- Rich library for formatted output in code cells
- Inline comments in code (not separate markdown cells) for brief notes
- `IPython.display.Markdown` for formatted output when needed

**For shared demo design system:**
- Tailwind custom theme (colors, fonts) in tailwind.config.js
- Shared layout component (`WorkshopLayout.tsx`)
- Shared animation variants (Framer Motion)
- Consistent navigation between demos

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| React 19.1 | Framer Motion 12.x | Fully compatible |
| React 19.1 | Zustand 5.x | Fully compatible |
| Vite 7.x | TypeScript 5.8.x | Fully compatible |
| Tailwind 3.x | PostCSS 8.x | Already configured |
| react-syntax-highlighter 15.x | React 19.x | Compatible |

## Sources

- Existing package.json in scratchpad/demos/
- Framer Motion documentation (animation patterns for educational UIs)
- React ecosystem best practices for educational/demo applications
- Jupyter/IPython display documentation for notebook formatting

---
*Stack research for: AI Agent Education Curriculum*
*Researched: 2026-02-16*
