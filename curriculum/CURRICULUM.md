# Build Fellowship: AI-Powered Data Analytics Assistant Curriculum

## Narrative Arc

The Build Fellowship takes students on an eight-week journey from "I know Python and pandas" to "I built my own AI-powered analytics assistant." The arc is deliberately progressive: each week adds one conceptual layer, and no week asks students to absorb more than they are ready for.

The journey begins with motivation. Workshop 1 reframes what programming looks like in the age of large language models. Students see that the old workflow -- Stack Overflow, copy-paste, debug -- is being replaced by something more direct: describe what you want in plain language and let a model generate the code. This single demonstration sets the emotional stakes for everything that follows. Students leave Workshop 1 knowing the destination and eager to understand the machinery.

Workshops 2 through 6 are the engine of the curriculum. In Workshop 2 students discover that LLMs are pattern-completion machines, not magic boxes. They make raw API calls, experiment with zero-shot and few-shot prompting, see chain-of-thought reasoning emerge, and -- crucially -- write code that executes code the LLM generated. By the end of Workshop 2 they have built a tiny "app" that takes a natural-language question, generates pandas code, runs it, captures the output, and feeds the result back to the model. That app is the seed of the final project. Workshop 3 zooms out. Students ask: "What can't LLMs do?" and discover that models cannot multiply, cannot read files, and cannot check the clock -- they can only generate text. This leads to the core architectural insight of the course: if the LLM tells us what to do and our code actually does it, we have an agent. Students build four progressively smarter versions of an ER-wait-time agent, arriving at a ReAct-style loop (Think-Act-Observe) without yet naming it. Workshop 4 shifts from architecture to craft. Students learn that tool design determines how capable an agent can be. Through live experimentation they discover the "Goldilocks" principle: tools that are too broad confuse the model, tools that are too specific cannot scale, and composable tools with clear parameter contracts and docstring examples hit the sweet spot. They build nine tools for a Pokemon analytics agent and discover the fundamental limitation of pre-built tools -- they cannot chain operations -- setting up Workshop 5. Workshop 5 is the technical climax. Students formalize the ReAct loop with structured outputs (Pydantic models replace fragile string parsing), introduce an artifact store to pass data between tool calls, then pivot entirely to a CodeAgent that generates and safely executes Python code inside a sandboxed environment. The CodeAgent unlocks infinite composability: variables connect steps naturally, no handle-passing required. Security analysis of the sandbox rounds out the session. Workshop 6 completes the foundational arc by making the agent conversational. Students experience the "memory problem" firsthand -- follow-up queries fail because the agent has no conversation history. They build buffer memory (simple list of past turns), discover its unbounded growth, and compress it with LLM-generated summaries. A conceptual survey of long-term memory types (episodic, semantic, procedural) gives students the vocabulary they will encounter in production systems.

Workshops 7 and 8 belong to the students. In Workshop 7, students bring their own datasets and start building their own analytics assistants, applying every concept from the previous six weeks. The instructor shifts from lecturer to coach, running structured check-ins and troubleshooting sessions. Workshop 8 is the capstone: each student presents a five-minute demo of their working agent, explains the architecture, and fields questions. They leave with a portfolio-ready project and the ability to say, in an interview, "I built this from scratch and I can explain every piece."

---

## Workshop 1: The Paradigm Shift -- Introduction and Motivation

### Learning Objectives

1. Understand the paradigm shift from traditional programming to AI-augmented development
2. See a live demonstration contrasting the old workflow (syntax lookup, copy-paste) with the new workflow (natural language to code)
3. Set expectations for the 8-week journey and the portfolio project they will build
4. Select individual datasets for their final projects and configure API access

### Key Topics

- The "before and after" of programming with LLMs
- Job market reality: AI skills as a requirement, not a bonus
- Project preview: what a working AI analytics assistant looks like
- Dataset options: Spotify tracks, e-commerce sales, movies, or custom
- Environment setup: Python, Jupyter, OpenAI/Anthropic API key

### Time Allocation

| Segment | Duration | Description |
|---------|----------|-------------|
| Welcome and Introductions | 15 min | Fellow intro, student intros (name, background, one goal), logistics |
| The Paradigm Shift | 20 min | Live demo: traditional vs. AI-augmented data analysis |
| Why This Matters Now | 15 min | Job market, skill convergence, "understanding the HOW" |
| Project Preview and Dataset Selection | 10 min | Final agent demo, dataset options, week-by-week preview, homework |

### Suggested Talking Points

1. "You're not learning to use AI tools. You're learning to build AI tools."
2. Emphasize that by Week 8, each student will have created something that would have required a team of engineers just five years ago.
3. Frame the course as progressive: each week adds one new concept, nothing more.
4. Acknowledge the range of backgrounds (theorists, practitioners, explorers) and reassure students that the course meets them wherever they start.
5. Set the expectation: theory is minimal, building is maximal.

### Activity Descriptions

- **Live Demo**: Instructor shows a complex data task ("Find correlations between features") done the traditional way (20+ lines, syntax lookups) versus the AI way (one natural-language query). Students observe the time and cognitive difference.
- **Dataset Selection**: Students browse four pre-loaded dataset options and choose one. They receive setup instructions as homework.

### Transition Notes

Workshop 1 creates desire ("I want to build that"); Workshop 2 provides the first tool ("Here is how LLMs actually work"). The paradigm-shift demo planted the question "How does this actually work?" -- Workshop 2 answers it.

### Key Aha Moments

- "Wait, the AI just did in one sentence what took me 20 lines of code?"
- "I'm going to build this, not just use it."

### Associated Demos

- **Final Agent Preview** (live CLI demo): Shows the finished analytics assistant so students see the destination before the journey.

---

## Workshop 2: LLMs as Pattern Machines -- Prompt Engineering

### Learning Objectives

1. Understand that LLMs are statistical pattern-completion engines, not reasoning machines
2. Distinguish between zero-shot, one-shot, few-shot, and chain-of-thought prompting and know when each is appropriate
3. Use system prompts to control LLM behavior and persona
4. Force structured output using both prompt-based JSON extraction and Pydantic structured outputs
5. Write code that generates code, executes it, captures output, feeds results back to the LLM, and auto-fixes errors -- closing the generative loop

### Key Topics

- LLMs as next-token predictors: temperature, tokens, context windows
- Zero-shot prompting and its limitations
- One-shot and few-shot prompting for pattern reinforcement
- Chain-of-thought (CoT) prompting: zero-shot CoT ("think step-by-step") and few-shot CoT
- System prompts as "job descriptions" for the model
- Structured output: prompt-based JSON, Pydantic models with OpenAI's `.parse()` API
- Code generation: LLM writes pandas code as text
- Code execution: `exec()` to run generated code programmatically
- Output capture and feedback loop: feeding execution results back to the model
- Error self-correction: LLM debugging its own generated code
- Building a simple "App" class that ties it all together
- Tool selection via structured outputs (Exercise 3 -- foreshadows Workshop 3)

### Time Allocation

| Segment | Duration | Description |
|---------|----------|-------------|
| Demo | 12 min | LLM Intuition demo + Prompt Anatomy demo + Side-by-Side Compare |
| Notebook / Hands-on | 38 min | Walk through prompting techniques, system prompts, structured output, code generation loop, exercises |
| Q&A / Discussion | 10 min | Comparison of techniques, what makes prompts reliable, preview of next week |

### Suggested Talking Points

1. "LLMs don't understand -- they predict. Temperature is the randomness knob."
2. Show the comparison table: zero-shot got the wrong answer, CoT got it right. Ask students why.
3. Emphasize structured outputs as the bridge from "text generator" to "programmable tool."
4. The moment students run `exec()` on LLM-generated code, pause and name what just happened: "You just made a program that writes programs."
5. Exercise 3 (tool selection) is a deliberate foreshadowing -- "Next week we'll build a full system around this idea."

### Activity Descriptions

- **Part 1 -- Prompting Techniques**: Students run the same acronym task with zero-shot, one-shot, few-shot, and CoT prompts, then compare results in a side-by-side table.
- **Part 2 -- Beyond Text Generation**: Students experiment with system prompts (pirate, Shakespeare, data scientist), force JSON output, generate executable pandas code, run it with `exec()`, capture output, and feed it back to the LLM. They see the LLM fix its own errors.
- **Capstone -- The App Class**: A combined demonstration showing all capabilities (system prompt + code generation + execution + error recovery) working together on a sales dataset.
- **Exercises**: (1) Math word problem with different prompting strategies, (2) Structured data extraction from food orders using text prompts, JSON prompts, and Pydantic models, (3) Tool selection -- LLM chooses which function to call given a user query.

### Transition Notes

Workshop 2 proved that LLMs can generate, execute, and self-correct code. But students noticed something: every time they asked the LLM to "list files" or "get the time," it said "I can't do that." Workshop 3 starts exactly there -- what CAN'T LLMs do, and how do we give them capabilities?

### Key Aha Moments

- "Adding 'think step-by-step' changed the answer from wrong to right."
- "The LLM just fixed its own bug by reading the error message."
- "We built a program that writes and runs programs -- that's the seed of an agent."

### Associated Demos

- **LLM Intuition** (W2): "LLMs predict the next word based on patterns, not understanding."
- **Prompt Anatomy** (W2): Toggle prompt parts on/off and see how the response changes.
- **Side-by-Side Compare** (W2): Two prompts streaming simultaneously so students see how small wording differences produce different outputs.

---

## Workshop 3: Building AI Agents -- Foundations

### Learning Objectives

1. Articulate what LLMs cannot do (calculate, access files, check time, fetch live data) and why this matters
2. Understand that LLMs can plan what needs to be done even though they cannot execute actions themselves
3. Build a function-calling pattern: LLM selects a function as text, system executes it, result feeds back
4. Evolve from a rigid keyword-matching agent (v1) through LLM-powered understanding (v2) and LLM tool selection (v3) to a full ReAct loop agent (v4)
5. Recognize the ReAct pattern (Think-Act-Observe) as the foundation for autonomous multi-step agents

### Key Topics

- LLM limitations: multiplication errors, no file access, no real-time data
- Key insight: LLMs are excellent planners but cannot execute
- Function calling as bridge: LLM generates call text, `eval()` executes it
- The Think-Plan-Execute pattern: user query to LLM plan to system execution to LLM response
- Agent evolution: keyword matching to LLM intent classification to LLM tool selection to multi-step loop
- The ReAct pattern: Think, Act, Observe, loop until done
- Anthropic's definition of "agents" (referenced in notebook)
- Designing the analytics assistant: composable tool philosophy, initial tool sketches

### Time Allocation

| Segment | Duration | Description |
|---------|----------|-------------|
| Demo | 10 min | Behind the Curtain demo -- what the agent actually sends to the LLM |
| Notebook / Hands-on | 40 min | LLM limitations, function calling, agent v1-v4 evolution, ReAct pattern |
| Q&A / Discussion | 10 min | Agent definition, analytics assistant design preview, homework |

### Suggested Talking Points

1. "LLMs learned what math looks like, but never learned the multiplication algorithm."
2. The agent evolution (v1 to v4) is a live teaching arc: let students feel why keyword matching breaks, why LLM understanding helps, and why looping is necessary.
3. Name the ReAct pattern explicitly after students have built it: "What you just built has a name in AI research."
4. Emphasize the pseudocode: `while not done: think, act, observe, update context` -- this loop is the skeleton of every agent they will encounter.
5. Preview the analytics assistant: "Next week we start building the real thing. Think about what 3-5 queries you'd ask your dataset."

### Activity Descriptions

- **LLM Limitations Exploration**: Students ask the LLM to multiply, list files, tell the time, and check weather -- all fail. Then they ask the LLM how to do each task and get useful instructions.
- **Function Calling Demo**: Students define `add_ints`, `multiply_ints`, `divide_ints`. The LLM selects the right function and arguments as text; `eval()` executes the call; the LLM formats the result.
- **ER Wait-Time Agent (v1-v4)**: Students build four versions of an agent for comparing hospital emergency room wait times, progressively replacing keyword matching with LLM intelligence and looping.
- **Analytics Assistant Preview**: Students see the composable tool design for the final project and think about queries for their own datasets.

### Transition Notes

Workshop 3 established that agents = LLM planning + system execution + observation loops. But the ER agent used toy tools. Workshop 4 tackles the real craft question: how do you design tools that an LLM can actually use well?

### Key Aha Moments

- "The LLM can't multiply, but it can tell us to call `multiply_ints(1234, 5678)` -- and that gives the right answer."
- "The loop keeps going until the agent decides it has enough information. No hardcoded steps."
- "This is how ChatGPT, Claude, and every AI assistant actually work under the hood."

### Associated Demos

- **Behind the Curtain** (W3): "The full context window the agent sends to the LLM is much more than just the user's question."

---

## Workshop 4: Tool Design for Data Analysis Agents

### Learning Objectives

1. Apply a design-thinking process: start with user queries, extract core capabilities, then design tools
2. Understand tool granularity and why it is the most critical design decision (too broad, too specific, composable)
3. Build nine composable data analysis tools spanning exploration, analysis, and visualization
4. Experience the fundamental limitation of pre-built tools -- they cannot chain operations -- and understand why code generation is the next step
5. Use Python introspection (`inspect.signature`) to auto-generate tool descriptions from docstrings

### Key Topics

- Design thinking: 13 potential queries collapse into 4 core capabilities (exploration, filtering, analysis, visualization)
- Tool granularity experiment: Design A (too broad -- `analyze_data(**params)`), Design B (too specific -- `get_fire_pokemon()`), Design C (composable -- `filter_rows(condition)`)
- Tool design principles: clear docstrings, examples in docstrings, error handling, individual testing
- Nine tools: `load_csv`, `show_info`, `show_data`, `filter_rows`, `calculate_statistics`, `aggregate_by`, `create_bar_chart`, `create_scatter_plot`, `create_histogram`
- The composability problem: pre-built tools return strings, so filtered data cannot flow into visualization tools
- Auto-generating tool descriptions with `generate_tool_descriptions()` using `inspect`
- Pokemon dataset as a universally familiar, domain-simple test bed

### Time Allocation

| Segment | Duration | Description |
|---------|----------|-------------|
| Demo | 10 min | Tool Use demo -- visualize how an agent evaluates, selects, and calls tools |
| Notebook / Hands-on | 40 min | Design thinking exercise, granularity experiments, build 9 tools, composability limitation |
| Q&A / Discussion | 10 min | When pre-built tools work vs. when you need code generation, preview of next week |

### Suggested Talking Points

1. "Tool design makes or breaks AI agents. A well-described tool is used correctly; a vague tool confuses the model."
2. Run the granularity experiment live: let students see Design A and B fail before showing Design C succeed.
3. Emphasize that the docstring is the tool's instruction manual for the LLM: examples are not optional.
4. When hitting the composability wall, let students feel the frustration before revealing the solution: "This is why next week we switch to code generation."
5. "The patterns we explore today work identically with customer data, medical records, financial data. We use Pokemon to keep the focus on design, not domain complexity."

### Activity Descriptions

- **Design Thinking Exercise**: Students list potential user queries, group them into capabilities, and propose how many tools are needed.
- **Granularity Experiment**: Students test three tool designs (too broad, too specific, composable) by asking the LLM to generate calls for each.
- **Tool Building**: Students build all nine tools, test each individually, and see them work via `generate_tool_descriptions()`.
- **Composability Limitation**: Students try to ask "Show me a bar chart of average attack for Fire-type Pokemon" and discover that filter + visualize cannot chain with string-returning tools.

### Transition Notes

Workshop 4 gave students well-designed tools but showed that pre-built tools hit a ceiling. Workshop 5 introduces two solutions: (1) an artifact store for passing data between tool calls, and (2) a CodeAgent that generates Python code directly, making composability natural.

### Key Aha Moments

- "Thirteen queries, but only four capabilities. The tools should match the capabilities, not the queries."
- "The LLM couldn't use the vague tool (Design A) but nailed the composable one (Design C) -- because the docstring told it exactly what to pass."
- "Pre-built tools can't chain. That's why real agents generate code."

### Associated Demos

- **Tool Use** (W4): "The agent evaluates the question, considers available tools, selects the right one, and shows you why."

---

## Workshop 5: ReAct and Code Agents

### Learning Objectives

1. Build a multi-step ReAct agent using Pydantic structured outputs (replacing fragile string parsing)
2. Understand why tool-based agents break when operations need to chain, and implement an artifact store as one solution
3. Build a CodeAgent that generates and executes Python code, unlocking infinite composability
4. Implement a safe execution environment (sandboxed `exec()`) with import blocking, limited builtins, and output capture
5. Analyze the security tradeoffs of code execution and know about production sandbox solutions (E2B, Docker)

### Key Topics

- ReAct loop formalization: Thought-Action-Observation with Pydantic models for reliable parsing
- Structured outputs vs. string parsing: why Pydantic eliminates fragile regex/split logic
- The chaining problem: `filter_rows` returns a string, so `calculate_statistics` operates on the global dataframe, not the filtered one
- Artifact store: assigning IDs to intermediate results so tools can reference previous outputs
- CodeAgent: instead of calling pre-built tools, the LLM writes Python code that chains operations naturally using variables
- Safe code execution: `SimpleSafeExecutor` with restricted `__builtins__`, import blocking, print capture
- Security analysis: what the sandbox blocks (imports, file access) vs. what it does not block (DataFrame `.to_csv()`, `.to_sql()`)
- Production sandboxes: E2B, Docker containers, WebAssembly runtimes

### Time Allocation

| Segment | Duration | Description |
|---------|----------|-------------|
| Demo | 12 min | ReAct Loop demo (polished) + Code Sandbox demo |
| Notebook / Hands-on | 38 min | ReAct agent, artifact store, CodeAgent, safe executor, security analysis |
| Q&A / Discussion | 10 min | ReAct vs. CodeAgent tradeoffs, security discussion, preview of memory |

### Suggested Talking Points

1. "Structured outputs with Pydantic mean the agent's response is always valid -- no more string parsing nightmares."
2. Walk through the artifact store as an intermediate solution: "It works, but notice how much bookkeeping we need."
3. Then show the CodeAgent: "What if we just let the agent write code? Variables naturally connect steps."
4. On security: "We block imports and dangerous builtins, but `df.to_csv('hack.csv')` would still work. In production, you'd use a sandbox like E2B."
5. "ReAct agents and CodeAgents are not competitors -- they solve different problems. ReAct is great for discrete tool calls; CodeAgents shine when operations need to compose."

### Activity Descriptions

- **ReAct Agent Build**: Students implement a multi-step ReAct agent with Pydantic-typed responses. They test it on "Which Pokemon type has the highest average attack?" and see it succeed with multi-step reasoning.
- **Chaining Failure**: Students ask "What is the average attack for Fire-type Pokemon?" and watch the ReAct agent give the wrong answer because `calculate_statistics` ignores the filter.
- **Artifact Store Fix**: Students add artifact tracking so tools can pass data by ID. The same query now succeeds.
- **CodeAgent Build**: Students build `SimpleSafeExecutor` and a code-generating agent. The Fire-type query works naturally because `fire_pokemon = filter_rows_v3("type_1 == 'Fire'")` feeds directly into `calculate_statistics_v3(fire_pokemon, ...)`.
- **Security Testing**: Students try importing `os`, opening files, and using `eval()` inside the sandbox -- all blocked. Then they discover DataFrame methods that are still accessible and discuss mitigation strategies.

### Transition Notes

Workshop 5 gave students a working CodeAgent that can handle any composable query. But students will notice something in Workshop 6: if they ask a follow-up question ("Now show me Water types"), the agent has no idea what "now" refers to. Workshop 6 adds memory to close that gap.

### Key Aha Moments

- "Structured outputs guarantee the agent's response is always parseable -- no more regex."
- "The CodeAgent just wrote pandas code like I would, and it worked. Variables naturally chain operations."
- "The sandbox blocks imports and file access, but `df.to_csv()` still works -- security is harder than it looks."

### Associated Demos

- **ReAct Loop** (W5): "Step through the Think-Act-Observe cycle and see exactly what the agent reasons at each step."
- **Code Sandbox** (W5): "Watch code get generated, validated, and executed inside a safe sandbox -- and see what happens when dangerous code is attempted."

---

## Workshop 6: Memory and Conversations

### Learning Objectives

1. Experience the "memory problem" firsthand: follow-up queries fail because the agent has no conversation history
2. Implement buffer memory (store recent conversation turns) and understand its strengths and limitations
3. Implement summary memory (compress older turns with an LLM) to manage token cost and context window size
4. Understand the three types of long-term memory (episodic, semantic, procedural) and when each applies
5. Know that the pattern "Store, Retrieve, Inject" underlies every memory implementation

### Key Topics

- The memory problem: each query goes to the LLM in isolation; pronouns ("that", "those results") and iterative refinement fail
- Buffer memory (SimpleMemory): store all turns, inject recent ones into the prompt
- Scalability problem: unbounded buffer growth leads to cost and speed issues
- Summary memory (SummaryMemory): compress older turns into LLM-generated summaries, keep recent turns verbatim
- Persistent namespace: the executor maintains variables across turns within a session
- Long-term memory types (conceptual overview, not implementation):
  - Episodic: specific past experiences with timestamps ("Last Tuesday you analyzed Fire Pokemon")
  - Semantic: facts and preferences ("User prefers concise answers", "Dataset has 800 rows")
  - Procedural: rules and workflows ("Always call `show_info` before filtering unknown data")
- Memory type taxonomy: short-term (buffer + compression) vs. long-term (episodic, semantic, procedural)
- When to use which memory type: single-session analytics vs. multi-session chatbot vs. production agent

### Time Allocation

| Segment | Duration | Description |
|---------|----------|-------------|
| Demo | 10 min | Memory Timeline demo -- see how context builds across conversation turns |
| Notebook / Hands-on | 40 min | Memory problem demo, buffer memory, scalability problem, summary memory, long-term memory survey |
| Q&A / Discussion | 10 min | Memory type selection, when short-term is enough, preview of project week |

### Suggested Talking Points

1. Start by demonstrating the failure: ask a follow-up question without memory and let students see it break. "The agent can't see previous conversation turns -- every query is isolated."
2. "Buffer memory is the simplest fix: store turns, inject them. But watch what happens at turn 20."
3. "Summary memory mimics how humans remember: recent events are vivid, older ones compress into gist."
4. On long-term memory: "We won't build this today, but knowing these three types -- episodic, semantic, procedural -- gives you the vocabulary for production systems."
5. "Agent memory = Store, Retrieve, Inject. Every memory system follows this pattern."

### Activity Descriptions

- **Memory Problem Demo**: Students run a single query successfully, then try a follow-up ("Now show me the stats for that") and watch it fail.
- **Buffer Memory Build**: Students implement `SimpleMemory`, integrate it with the CodeAgent, and see follow-ups work. They run a multi-turn conversation with references to previous results.
- **Scalability Exploration**: Students run a 4+ turn conversation and observe token counts growing linearly.
- **Summary Memory Build**: Students implement `SummaryMemory` with LLM-based compression of older turns. After six turns, they see older messages compressed into summaries while recent turns remain in full detail.
- **Long-Term Memory Survey**: Conceptual discussion of episodic, semantic, and procedural memory with concrete examples from analytics contexts.

### Transition Notes

Workshop 6 completes the foundational arc. Students now have every piece: LLM understanding, agent architecture, tool design, code execution, and memory. Workshop 7 is where they apply it all to their own datasets and build their own analytics assistants.

### Key Aha Moments

- "The agent forgot everything! Each query was sent in isolation -- no wonder follow-ups failed."
- "Buffer memory works, but at turn 20 we're sending 4,000 tokens of history just to ask a simple question."
- "Summary memory is like how humans remember: the gist of old conversations plus vivid recent ones."

### Associated Demos

- **Memory Timeline** (W6): "Watch how context accumulates across conversation turns and see exactly what the agent remembers at each step."

---

## Workshop 7: Project Week -- Build Your Own Agent

### Learning Objectives

1. Apply the complete agent architecture (LLM + tools + ReAct/CodeAgent + memory) to a personal dataset
2. Make independent design decisions: which tools to build, what granularity, whether to use ReAct or CodeAgent
3. Debug and extend their agent with instructor guidance
4. Prepare a demo-ready prototype for Workshop 8 presentations

### Key Topics

- Individual project work with chosen datasets
- Design decisions: tool selection, agent type, memory strategy
- Debugging common issues: tool description clarity, prompt failures, sandbox errors
- Feature prioritization: what to polish vs. what to skip given time constraints
- Demo preparation: structure, talking points, technical explanation practice

### Time Allocation

| Segment | Duration | Description |
|---------|----------|-------------|
| Check-in | 10 min | Quick round: where each student is, what's working, what's stuck |
| Individual Work | 35 min | Students build while instructor circulates for troubleshooting |
| Demo Prep | 10 min | Presentation structure guidance, what to highlight, Q&A practice |
| Wrap-up | 5 min | Status check, homework: finalize agent, prepare 5-minute demo |

### Suggested Talking Points

1. "You have every building block now. This week is about choosing which ones your project needs."
2. Encourage students to keep it simple: "A working agent with three good tools beats a broken agent with ten."
3. Remind students that the goal is portfolio-ready: "An interviewer should be able to watch your demo and understand what you built and why."
4. Common pitfalls to preempt: vague tool descriptions, no error handling, trying to do too much.
5. "If something isn't working, check the tool docstring first. Nine times out of ten, the LLM is confused because the description is unclear."

### Activity Descriptions

- **Check-in Round**: Each student gives a 30-second update: chosen dataset, current progress, primary blocker.
- **Guided Work Session**: Students build their agents independently. Instructor circulates, answers questions, helps debug. Focus areas: custom tool design, testing with real queries, error handling.
- **Demo Preparation**: Students practice explaining their architecture in under two minutes. Instructor provides a demo template: (1) show the dataset, (2) ask three queries of increasing complexity, (3) explain one architectural decision.

### Transition Notes

Workshop 7 produces working prototypes. Workshop 8 is the presentation: students refine their demos, add any final polish, and prepare for a live audience.

### Key Aha Moments

- "I just asked my agent a question about my own data and it answered correctly. I built this."
- "My tool descriptions were too vague -- once I added examples to the docstring, everything worked."

### Associated Demos

- No instructor demos. Students build their own.

---

## Workshop 8: Final Presentations

### Learning Objectives

1. Present a working AI analytics assistant in a structured 5-minute demo
2. Explain architectural decisions (tool design, agent type, memory strategy) clearly to a non-expert audience
3. Field technical questions about implementation choices
4. Reflect on the 8-week journey and identify what they would do differently

### Key Topics

- Live demonstration of each student's agent
- Architectural explanation: what components they used and why
- Technical Q&A from peers and instructor
- Retrospective: what worked, what was hard, what they would change

### Time Allocation

| Segment | Duration | Description |
|---------|----------|-------------|
| Presentation Block | 50 min | 5 minutes per student (demo + explanation + Q&A) for up to 10 students |
| Retrospective | 10 min | Group reflection: highlights, challenges, advice for future cohorts |

### Suggested Talking Points

1. "Every agent in this room is different -- same building blocks, different designs. That's the point."
2. Celebrate the range: some students will have polished UIs, others will have sophisticated tool chains, others will have creative datasets. All are valid.
3. Encourage constructive Q&A: "Ask about decisions, not just features."
4. Close with the resume framing: "You built an AI-powered data analysis agent from scratch. You can explain how agents work. That's a rare skill."
5. Remind students their notebooks and code form a portfolio-ready project.

### Activity Descriptions

- **Student Presentations**: Each student gives a 5-minute presentation: (1) dataset overview, (2) live demo of 2-3 queries, (3) architectural decision walkthrough, (4) peer Q&A.
- **Group Retrospective**: Open discussion: what was the most valuable workshop, what concept was hardest, what would they tell a future cohort.

### Transition Notes

This is the final workshop. Students leave with a working project, portfolio documentation, and the ability to articulate how AI agents work from first principles.

### Key Aha Moments

- "I built this from scratch and I can explain every piece."
- "Everyone's agent is different because we made different design decisions -- and they all work."

### Associated Demos

- No instructor demos. Student presentations only.

---

## Demo Catalog

### 1. LLM Intuition

- **Aha Moment**: "LLMs predict the next word based on patterns, not understanding -- they are statistical engines, not thinking machines."
- **Workshop(s)**: Workshop 2
- **Description**: An interactive visualization that shows students how an LLM processes text as token prediction. Students can input text and see probability distributions over next tokens, making the "pattern machine" concept tangible. Cohort 1 feedback: this was the most impactful demo.

### 2. Prompt Anatomy

- **Aha Moment**: "Every part of a prompt -- system message, examples, constraints, the question itself -- changes the output, and you can toggle each on and off to see exactly how."
- **Workshop(s)**: Workshop 2
- **Description**: Students toggle prompt components (system prompt, few-shot examples, output format instructions, the user query) on and off and immediately see how the LLM's response changes. Demonstrates that prompt engineering is not guessing -- it is systematic construction.

### 3. Side-by-Side Compare

- **Aha Moment**: "Small wording differences in prompts produce dramatically different outputs -- you can see it happening in real time with streaming."
- **Workshop(s)**: Workshop 2
- **Description**: Two prompts stream simultaneously side by side. Students write or modify one prompt and see how subtle changes (word choice, structure, examples) produce different tokens in real time. Makes the non-deterministic, pattern-driven nature of LLMs visible.

### 4. Behind the Curtain

- **Aha Moment**: "The agent sends much more than your question to the LLM -- it sends a system prompt, tool descriptions, conversation history, and the user query all combined into one context window."
- **Workshop(s)**: Workshop 3
- **Description**: Visualizes the full context window that an agent constructs before sending to the LLM. Students see that their one-line question becomes a multi-section prompt with system instructions, available tools, memory, and the actual query. Demystifies the "magic" of agent responses.

### 5. Tool Use

- **Aha Moment**: "The agent evaluates the question, considers all available tools, selects the best one based on the descriptions you wrote, and shows you its reasoning -- it is not following a script."
- **Workshop(s)**: Workshop 4
- **Description**: Step-by-step visualization of how an agent receives a query, reads tool descriptions, evaluates which tool matches the intent, selects it, formats the arguments, and displays the result. Students see that better tool descriptions lead to better tool selection.

### 6. ReAct Loop

- **Aha Moment**: "The agent doesn't just call one tool -- it thinks, acts, observes the result, and decides whether to keep going or stop. It reasons through multi-step problems."
- **Workshop(s)**: Workshop 5
- **Description**: Students step through the Think-Act-Observe cycle one iteration at a time. At each step they see the agent's thought ("I need to filter first"), the action it takes (tool call or code execution), and the observation (result). They can advance step-by-step or let it run to completion. Shows that agents are loops, not linear scripts.

### 7. Code Sandbox

- **Aha Moment**: "The agent writes real Python code, but it runs inside a sandbox that blocks dangerous operations -- you can see exactly what is allowed and what gets caught."
- **Workshop(s)**: Workshop 5
- **Description**: Visualizes the code generation, AST validation, and sandboxed execution pipeline. Students see generated code appear, watch it pass through safety checks (import blocking, builtin restrictions), and see the execution result. When dangerous code is attempted, the sandbox catches it and shows why it was blocked.

### 8. Memory Timeline

- **Aha Moment**: "Without memory, every question is asked in isolation -- the agent forgets everything. With memory, context accumulates and the agent gets smarter with each turn."
- **Workshop(s)**: Workshop 6
- **Description**: Shows a timeline of conversation turns with what the agent "remembers" at each step. Students see how buffer memory stores full turns, how summary memory compresses older ones, and how the agent's effective context changes over time. Makes the abstract concept of "conversation memory" visual and concrete.
