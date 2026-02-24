# Phase 3: Workshop 3 Materials (Agent Foundations) - Research

**Researched:** 2026-02-24
**Domain:** Jupyter notebook rewrite -- Restaurant Finder agent scenario with W2 structured extraction bridge, v1-v4 agent evolution, ReAct loop, no React demo
**Confidence:** HIGH (single deliverable, well-understood patterns, existing notebook provides proven teaching arc)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Scenario: Restaurant Finder (replaces ER Hospital)
- Replace the ER wait time system with a Restaurant Finder scenario
- More engaging, lighter mood, universally relatable
- Functions chain naturally: wait time, ratings, distance, price, cuisine
- Simulated data for local restaurants (hardcoded dictionaries for structured data, text blurbs for unstructured)
- Queries scale in complexity: "What's the wait at Olive Garden?" -> "Cheapest place within 10 min?" -> "Best-rated Italian place factoring in wait AND travel time?"

#### Structured Extraction as Setup Step (W2 Bridge)
- Restaurant data includes unstructured text (descriptions, review snippets)
- Before building agent tools, students use W2's structured extraction (Pydantic models) to pull out price ranges, cuisine types, etc.
- This is a preprocessing/setup step, NOT an agent tool -- happens before the agent is built
- Shows W2 concepts as real building blocks without needing an explicit bridge section
- Brief W2 recap at the start of the notebook; no dedicated bridge section needed

#### Context/History Visibility
- At key moments in the v4 (ReAct loop) agent, print the full prompt being sent to the LLM
- Students SEE the growing history -- how previous step results feed into the next prompt
- Do NOT call this "memory" or introduce memory vocabulary -- that's Workshop 6
- Just make visible: "the agent re-reads its entire history every step"
- The "show it, don't name it" approach -- W6 will formalize what students already intuitively saw

#### Notebook Structure
- Keep the existing teaching arc with the new scenario:
  1. Brief W2 recap
  2. LLM limitations (can't calculate, can't access data, can only generate text)
  3. But LLMs CAN plan (know what needs to be done)
  4. Structured extraction setup (pull clean data from unstructured restaurant info)
  5. Function calling bridge (LLM generates calls as text -> system executes)
  6. Restaurant Finder scenario with increasing complexity
  7. Agent evolution: v1 (keyword matching) -> v2 (LLM understanding) -> v3 (LLM tool selection) -> v4 (ReAct loop with visible history)
  8. ReAct pattern introduction
  9. Analytics assistant preview / what's next

#### Formatting & Code Readability (Live Teaching)
- W2 quality standards: consistent H1/H2/H3 hierarchy, clean visual structure
- Smaller, focused code cells -- one concept per cell, no walls of code
- Clean variable names and consistent coding style -- must be scannable when projected on screen
- Clean output formatting -- printed output easy to read on a projector
- Standout Key Insight callout blocks at critical teaching moments (not lost in code)

#### Exercises
- No exercises in W3 -- this is a guided instructor-led walkthrough
- Students run cells and follow along
- Exercises begin in Workshop 4

#### Demo
- No React demo for Workshop 3
- The notebook's v1->v4 progression IS the teaching -- building agents from scratch is more powerful than watching one run
- Development time invested in notebook quality instead

### Claude's Discretion
- Key Insight formatting approach (IPython.display, HTML blocks, or other Jupyter-native)
- Restaurant data specifics (which restaurants, exact unstructured text content, number of restaurants)
- Code cell granularity decisions (how to split existing large cells)
- Output formatting approach for clean projector display
- Exact placement and content of "print full prompt" moments in the v4 agent
- Analytics preview section at the end (keep, trim, or adjust to bridge toward W4)
- How structured extraction setup integrates with the rest of the notebook flow

### Deferred Ideas (OUT OF SCOPE)
- "Behind the Curtain" React demo -- originally planned for this phase, dropped after first-principles analysis. The concept (seeing full context window) is addressed by printing prompts in the notebook. Could be revisited as a standalone tool in future milestones if there's demand.
- Node graph visualization of agent reasoning -- discussed as a potential demo approach. Not needed for W3 but could be valuable as a general debugging/teaching tool in future phases.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NOTE-01 (W3) | Visual revamp of Workshop 3 notebook -- clean headers, consistent formatting, visual hierarchy | Full rewrite using W2 quality standards: H1 title, H2 parts, H3 sections, blockquote Key Insights. Existing W3 notebook has inconsistent formatting (mixes emoji headers, lacks hierarchy, has wall-of-code cells). Restaurant Finder scenario provides opportunity for clean slate formatting. |
| NOTE-02 (W3) | Code cleanup of Workshop 3 notebook -- polished examples, consistent style, better inline comments | Full rewrite replaces ER Hospital scenario with Restaurant Finder. All code cells will follow W2 conventions: snake_case variables, consistent f-string printing, focused cells (one concept each), display utilities for formatted output. |
| DEMO-03 | Behind the Curtain demo -- show the full context window the agent actually sends to the LLM | **DROPPED per context decisions.** Replaced by printing full prompts at key moments in the v4 ReAct agent. Students see the same "full context window" concept directly in the notebook's printed output. No React demo needed. |
</phase_requirements>

## Summary

Phase 3 delivers a single, complete Jupyter notebook rewrite for Workshop 3 (Agent Foundations). The scope is narrower than originally planned: no React demo, no exercises, just the notebook. This means 100% of effort goes into notebook quality.

The notebook replaces the existing ER Hospital Wait Time scenario with a Restaurant Finder scenario. The teaching arc is preserved: LLM limitations -> LLMs can plan -> function calling bridge -> agent evolution (v1 keyword matching -> v2 LLM understanding -> v3 LLM tool selection -> v4 ReAct loop) -> ReAct pattern naming -> analytics assistant preview. Two new elements are added: (1) a structured extraction setup step using Pydantic models to bridge W2 concepts, and (2) full prompt printing in the v4 agent to make context window growth visible.

**Primary recommendation:** Rewrite the notebook from scratch using the Restaurant Finder scenario, following W2 quality standards exactly. Use the existing W3 notebook's proven teaching arc as the skeleton but improve every cell for projector readability, code cleanliness, and formatting consistency.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| openai | 1.107.0 | LLM API calls (generate, structured extraction) | Already installed, used in W2, consistent across workshops |
| pydantic | 2.11.7 | Structured output models for extraction setup step | Already installed, used in W2 exercises, W4/W5/W6 |
| IPython.display | built-in | Notebook formatting (HTML, Markdown) | Zero-dependency, used in W2 display utilities |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| notebooks/utils/display.py | existing | `output_box`, `compare_table`, `llm_response`, `heading`, `separator` | Key Insight callouts, formatted LLM responses, comparison tables |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| IPython.display HTML for Key Insights | Plain markdown blockquotes | HTML blocks allow colored backgrounds and borders that stand out on projectors; blockquotes are simpler but less visually distinct. **Recommendation: Use both.** Markdown blockquotes (`> **Key Insight:**`) for inline insights (W2 pattern), HTML `output_box()` for major teaching moments that need to stand out. |

**No new dependencies needed.** Everything required is already installed.

## Existing Codebase Analysis

### Current Workshop 3 Notebook
**Location:** `notebooks/workshop_03_building_ai_agents_foundations.ipynb`
**Size:** 95KB, approximately 65 cells
**Current scenario:** ER Hospital Wait Time System

**Teaching arc (preserve this structure):**
1. Setup & imports (1 cell)
2. LLM limitation: multiplication (3 cells -- prompt, response, explanation)
3. More LLM limitations: files, time, weather (4 cells)
4. KEY INSIGHT: LLMs can only generate text
5. LLM planning ability: how-to-multiply, how-to-list-files, how-to-get-time (3 cells)
6. KEY INSIGHT: LLMs can plan but not execute
7. Function calling bridge: define functions, LLM generates call text, eval() executes (3 cells)
8. Complete conversation flow (1 cell)
9. WHAT WE DISCOVERED summary
10. ER scenario introduction + tool definitions (2 cells)
11. Tool testing (6 individual test cells)
12. Manual query walkthrough -- simple (1 cell)
13. Manual query walkthrough -- complex (2 cells)
14. LLM planning test (1 cell)
15. Agent v1: keyword matching (1 large cell)
16. Agent v1 failure cases (1 cell)
17. Agent v2: LLM understanding + extraction (2 cells)
18. Agent v2 limitations (1 cell)
19. Agent v3: LLM tool selection (1 large cell)
20. Agent v3 limitations (1 cell)
21. Agent v4: ReAct loop (1 very large cell)
22. Agent v4 testing (2 cells)
23. Agent evolution summary (1 markdown cell)
24. ReAct pattern introduction (1 markdown cell)
25. Anthropic agents definition (1 markdown cell)
26. Analytics assistant preview (1 large markdown cell)

**Issues to fix:**
1. **Wall-of-code cells:** Agent v1, v3, v4 are each 40-80 lines in a single cell. Must split.
2. **Inconsistent formatting:** Uses emojis inconsistently, mixes H2/H3 poorly, KEY INSIGHT blocks are plain markdown (not visually distinct).
3. **ER scenario needs full replacement:** All 6 tool functions, test cells, agent versions, and test queries must be rewritten for Restaurant Finder.
4. **No structured extraction bridge:** Must add Pydantic extraction setup step between W2 recap and tool definitions.
5. **No prompt visibility:** v4 agent does not print what it sends to the LLM. Must add full prompt printing at steps 3+.
6. **Output uses raw print + emoji:** Must use display utilities for clean projector-ready formatting.
7. **eval() for tool execution:** Current approach uses bare `eval()` which is fragile. Keep for simplicity (teaching context) but with a controlled namespace (already done in existing code).

### Workshop 2 Notebook (Quality Standard)
**Location:** `notebooks/workshop_02_prompt_engineering.ipynb`
**Size:** 67KB, approximately 40 cells

**Patterns to match:**
- **Header hierarchy:** `# Workshop 2: Title` (H1), `## Part N: Section` (H2), `### Subsection` (H3)
- **Key Insight blocks:** `> **Key Insight:** description` (markdown blockquote)
- **Display utilities:** Imports `from utils.display import output_box, compare_table, llm_response, heading, separator`
- **Generate helper:** Simple `generate(prompt)` function with `temperature=0`, consistent across notebook
- **Code cells:** Focused, 10-30 lines each, one concept per cell
- **Output formatting:** Clean f-strings, no raw `print("="*50)` separators (use `separator()` utility instead)
- **Variable naming:** Consistent snake_case, descriptive names

### Display Utilities Available
**Location:** `notebooks/utils/display.py`
**Functions:**
- `heading(title, level)` -- Formatted section heading
- `output_box(content, label, style)` -- Styled box (info/success/warning/error)
- `compare_table(rows, headers)` -- Comparison table
- `llm_response(response_text, label)` -- LLM response box (info style)
- `separator(text)` -- Visual separator with optional text

### OpenAI API Pattern (from W2)
```python
# Simple generate helper (used throughout)
def generate(prompt, temperature=0):
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=temperature
    )
    return response.choices[0].message.content.strip()

# Structured extraction (W2 pattern)
from pydantic import BaseModel

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

completion = client.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[...],
    response_format=CalendarEvent,
)
event = completion.choices[0].message.parsed
```

**Note:** W2 uses `client.chat.completions.parse()` (non-beta). W4/W5/W6 use `openai_client.beta.chat.completions.parse()`. The non-beta version is the newer, recommended API. Use `client.chat.completions.parse()` for W3 to match W2.

## Architecture Patterns

### Pattern 1: Restaurant Data Design

**What:** 5-7 fictional restaurants with both structured data (dictionaries) and unstructured text (descriptions, review snippets).

**Why:** The CONTEXT decisions require simulated data with both structured and unstructured components. The unstructured text enables the W2 structured extraction bridge. 5-7 restaurants is sufficient for variety without overwhelming output.

**Recommended restaurant data structure:**

```python
# Structured data -- used directly by agent tools
RESTAURANTS = {
    "Olive Garden": {"cuisine": "Italian", "price_range": "$$", "rating": 4.2, "distance_miles": 2.5},
    "Sushi Palace": {"cuisine": "Japanese", "price_range": "$$$", "rating": 4.7, "distance_miles": 5.0},
    "Burger Barn": {"cuisine": "American", "price_range": "$", "rating": 3.8, "distance_miles": 1.0},
    "Taj Mahal": {"cuisine": "Indian", "price_range": "$$", "rating": 4.5, "distance_miles": 3.2},
    "Dragon Wok": {"cuisine": "Chinese", "price_range": "$", "rating": 4.0, "distance_miles": 4.5},
    "La Piazza": {"cuisine": "Italian", "price_range": "$$$", "rating": 4.8, "distance_miles": 6.0},
}

# Wait times -- simulated real-time data (changes every minute in theory)
WAIT_TIMES = {
    "Olive Garden": 25,
    "Sushi Palace": 45,
    "Burger Barn": 5,
    "Taj Mahal": 15,
    "Dragon Wok": 30,
    "La Piazza": 60,
}

# Unstructured text -- used for W2 extraction bridge
RESTAURANT_DESCRIPTIONS = {
    "Olive Garden": """A family-friendly Italian chain known for their unlimited breadsticks
    and pasta. Typical dinner runs $15-25 per person. The lunch specials are a steal at
    $9.99. Vegetarian options available. Located on Main Street, about 5 minutes drive
    from downtown. Open until 10 PM on weekdays.""",
    # ... etc for each restaurant
}
```

**Design rationale:**
- Separate structured data from unstructured text so the extraction step has a clear purpose
- Wait times in a separate dict to simulate "real-time" data (analogous to the ER queue lengths)
- Price ranges use `$`/`$$`/`$$$` convention (universally understood)
- Distances in miles, ratings on 5-star scale (universally understood)
- 6 restaurants: enough variety for interesting queries, not so many that output is overwhelming

### Pattern 2: Structured Extraction Setup (W2 Bridge)

**What:** Before defining agent tools, students extract structured data from the unstructured restaurant descriptions using Pydantic models.

**When to use:** Early in the notebook, after the W2 recap and before the agent section.

**Example flow:**

```python
# Step 1: Show unstructured text
print(RESTAURANT_DESCRIPTIONS["Olive Garden"])

# Step 2: Define Pydantic model for extraction
class RestaurantInfo(BaseModel):
    price_per_person_low: int
    price_per_person_high: int
    has_vegetarian: bool
    closing_time: str
    special_notes: str

# Step 3: Extract using OpenAI structured outputs
completion = openai_client.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "Extract restaurant information from the description."},
        {"role": "user", "content": RESTAURANT_DESCRIPTIONS["Olive Garden"]}
    ],
    response_format=RestaurantInfo,
)
info = completion.choices[0].message.parsed
print(f"Price range: ${info.price_per_person_low}-${info.price_per_person_high}")
```

**Key insight to surface:** "This is the same structured extraction we learned last week. Now we're using it as a building block -- extracting clean data that our agent tools can use."

**Scope boundary:** This step is a preprocessing demonstration, NOT integrated into the agent loop. Students see extraction happen, understand it connects to W2, but the agent tools use the pre-built structured dictionaries directly. This keeps the agent code clean and focused.

### Pattern 3: Agent Tool Functions for Restaurant Finder

**What:** 6-8 tool functions that mirror the ER scenario's function set but use restaurant data.

**Recommended tools:**

```python
def get_wait_time(restaurant: str) -> int:
    """Get current wait time in minutes at a restaurant."""

def get_rating(restaurant: str) -> float:
    """Get the rating (1-5 stars) for a restaurant."""

def get_distance(restaurant: str) -> float:
    """Get distance in miles to the restaurant."""

def get_cuisine(restaurant: str) -> str:
    """Get the cuisine type of a restaurant."""

def get_price_range(restaurant: str) -> str:
    """Get the price range ($, $$, $$$) of a restaurant."""

def calculate_travel_time(distance: float) -> float:
    """Calculate travel time in minutes (assumes 2 min per mile)."""

def list_restaurants() -> list:
    """Get a list of all nearby restaurants."""
```

**Design principles:**
- Each function does exactly one thing (single-responsibility)
- Parameters are simple types (str, float) that an LLM can generate reliably
- Return types are simple (str, int, float, list) -- no complex objects
- Function names are descriptive and self-documenting
- Docstrings tell the LLM exactly what each function does

### Pattern 4: v4 Agent with Prompt Visibility

**What:** The ReAct loop agent that prints the full prompt at key moments.

**When to print:** At step 3+ of the loop (when history contains enough for the growing context to be visually interesting).

**Implementation approach:**

```python
def restaurant_agent_v4(query, max_steps=10):
    history = []

    for step in range(max_steps):
        # Build the prompt
        prompt = f"""
        Query: {query}

        Previous steps: {history}

        Available tools:
        - get_wait_time(restaurant) - ...
        - get_rating(restaurant) - ...
        [etc.]

        What's the next step? If done, say "DONE".
        Otherwise, give the exact function call.
        """

        # Print full prompt at step 3+ to show growing context
        if step >= 2:
            print(f"\n{'='*60}")
            print(f"FULL PROMPT SENT TO LLM (Step {step + 1}):")
            print(f"{'='*60}")
            print(prompt)
            print(f"{'='*60}")
            print(f"Notice: The prompt includes ALL previous step results.")
            print(f"The agent re-reads its entire history every step.")

        response = generate(prompt)
        # ... rest of loop
```

**Critical constraint:** Do NOT use the word "memory" when explaining this. The CONTEXT decisions are explicit: call it "history" or "previous steps." W6 will introduce memory vocabulary. At this point, just show the phenomenon and let students observe.

### Pattern 5: Key Insight Formatting

**What:** Visually distinct callout blocks at critical teaching moments.

**Recommendation:** Use W2's pattern of markdown blockquotes for most insights, plus `output_box()` from display utilities for the 2-3 most important teaching moments.

**Standard insight (use for most):**
```markdown
> **Key Insight:** LLMs can only generate text. They cannot perform calculations,
> access files, check the time, or fetch live data.
```

**Major insight (use sparingly -- 2-3 per notebook):**
```python
output_box(
    "LLMs are excellent at understanding and describing what needs to be done. "
    "What if instead of asking LLMs to DO things, we ask them to tell us "
    "WHAT NEEDS TO BE DONE?",
    label="KEY INSIGHT",
    style="warning"  # Yellow background for emphasis
)
```

### Anti-Patterns to Avoid

- **Wall-of-code cells:** The existing v1, v3, v4 agents are each 40-80 lines in single cells. Split into: (1) function definition cell, (2) test cell, (3) failure demonstration cell. Each cell should be scannable on a projector in 5 seconds.

- **Mixing concerns in one cell:** Do not define a function AND test it AND explain the result in the same cell. Separate definition, testing, and explanation.

- **Using "memory" vocabulary:** The CONTEXT decisions explicitly forbid this. Use "history," "previous steps," or "what happened so far." W6 will formalize the memory concept.

- **Over-explaining the extraction step:** The structured extraction bridge should be 3-4 cells max (show text, define model, extract, brief insight). It is setup, not a teaching section. Do not re-teach Pydantic -- reference W2.

- **Hardcoded prompts that break with model updates:** Use consistent prompt patterns that are robust to minor model behavior changes. Include explicit format instructions ("Respond with ONLY the function call" or "Respond with DONE").

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Output formatting | Custom print wrappers | `utils.display` functions (`output_box`, `separator`, `llm_response`) | Already built, consistent with W2, tested |
| Structured extraction | Manual JSON parsing from LLM | OpenAI `chat.completions.parse()` with Pydantic models | Guaranteed valid structure, W2 already teaches this |
| LLM API calls | Custom HTTP request code | `openai` Python package with `generate()` helper | Already installed, consistent helper pattern across workshops |

**Key insight:** The notebook needs NO new utility code. Everything required exists in the project already.

## Common Pitfalls

### Pitfall 1: Restaurant Name Casing Mismatch
**What goes wrong:** LLM generates `get_wait_time("olive garden")` but the dictionary key is `"Olive Garden"`. The tool returns 0 or raises KeyError.
**Why it happens:** LLMs are inconsistent with capitalization, especially for multi-word names.
**How to avoid:** Add case-insensitive lookup in tool functions:
```python
def get_wait_time(restaurant: str) -> int:
    # Case-insensitive lookup
    for name, time in WAIT_TIMES.items():
        if name.lower() == restaurant.lower():
            return time
    return f"Restaurant '{restaurant}' not found."
```
**Warning signs:** Agent returns "not found" for restaurants that exist.

### Pitfall 2: eval() Security in Tool Execution
**What goes wrong:** Using bare `eval()` to execute LLM-generated function calls is a security risk.
**Why it happens:** The existing W3 notebook uses `eval(response, tools)` which is simple but technically unsafe.
**How to avoid:** Use a restricted namespace that only exposes the tool functions:
```python
result = eval(response, {"__builtins__": {}}, tools)
```
This is acceptable for a teaching context. Production code would use `ast.literal_eval()` or structured function calling. The security concern is explicitly addressed in W5 (safe code execution).
**Warning signs:** None in teaching context, but worth a brief comment in the notebook.

### Pitfall 3: LLM Generating Inconsistent Function Call Format
**What goes wrong:** LLM sometimes wraps function call in code blocks (```python ... ```) or adds explanation text before the call.
**Why it happens:** Without explicit format instructions, LLMs default to verbose, explanation-heavy responses.
**How to avoid:** Include explicit format instructions in the prompt: "Respond with ONLY the function call, no explanation, no code blocks." The existing W3 notebook already does this but could be more explicit. Also strip markdown code fences in post-processing:
```python
response = response.strip()
if response.startswith("```"):
    response = response.split("\n")[1]  # Skip first line
    if response.endswith("```"):
        response = response[:-3]
```
**Warning signs:** `eval()` errors on responses that include explanation text.

### Pitfall 4: v4 Agent Infinite Loop
**What goes wrong:** The ReAct loop never terminates because the LLM does not say "DONE" or keeps calling the same function.
**Why it happens:** Prompt does not clearly define what "done" means, or the LLM loses track of what it has already done.
**How to avoid:** (1) Set `max_steps=10` as a safety limit. (2) Include explicit stopping criteria in the prompt: "If you have enough information to answer the original query, say DONE." (3) Include the history of previous steps so the LLM knows what it has already done.
**Warning signs:** Agent output showing repeated calls to the same function, or reaching max_steps without completing.

### Pitfall 5: Projector Readability of Printed Output
**What goes wrong:** Long output strings (e.g., restaurant lists, full prompts) are unreadable when projected.
**Why it happens:** Small font + long lines + dense output = unreadable on projector.
**How to avoid:** (1) Use `output_box()` for formatted blocks with clear labels. (2) Truncate long outputs with `[:500]` and "..." when appropriate. (3) Use fixed-width formatting for tables. (4) Add `\n` line breaks generously. (5) When printing the full prompt in v4, frame it visually with `="*60` separators and a label.
**Warning signs:** Output cells with more than ~20 lines of dense text.

### Pitfall 6: Structured Extraction Overcomplicating the Notebook
**What goes wrong:** The W2 bridge section becomes a mini-lesson on Pydantic, derailing the agent teaching arc.
**Why it happens:** Temptation to fully explain structured outputs again when bridging from W2.
**How to avoid:** Keep it to 3-4 cells: (1) "Remember from last week?" brief recap, (2) show unstructured restaurant text, (3) define Pydantic model + extract, (4) brief "this is a building block" insight. Total section time: 3-4 minutes of notebook walkthrough. Do not re-explain Pydantic BaseModel or the parse API -- just use them.
**Warning signs:** More than 4 cells dedicated to extraction, or explanatory markdown that re-teaches W2 concepts.

## Code Examples

### Generate Helper (Consistent Pattern Across Workshops)
```python
# Source: notebooks/workshop_02_prompt_engineering.ipynb, cell fcfae7e5
from utils.display import output_box, compare_table, llm_response, heading, separator
from openai import OpenAI

openai_client = OpenAI()

def generate(prompt, temperature=0):
    """Generate a response from the LLM. Uses temperature=0 for deterministic output."""
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=temperature
    )
    return response.choices[0].message.content.strip()
```

### Structured Extraction (W2 Bridge Pattern)
```python
# Source: notebooks/workshop_02_prompt_engineering.ipynb, cell 3f670e2f
from pydantic import BaseModel

class RestaurantInfo(BaseModel):
    price_per_person_low: int
    price_per_person_high: int
    has_vegetarian: bool
    closing_time: str

completion = openai_client.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "Extract restaurant information from the text."},
        {"role": "user", "content": description_text}
    ],
    response_format=RestaurantInfo,
)
info = completion.choices[0].message.parsed
```

### Tool Function with Case-Insensitive Lookup
```python
# Defensive tool pattern for restaurant lookup
def get_wait_time(restaurant: str) -> int:
    """Get current wait time in minutes at a restaurant."""
    for name, wait in WAIT_TIMES.items():
        if name.lower() == restaurant.lower():
            return wait
    available = ", ".join(WAIT_TIMES.keys())
    return f"Restaurant '{restaurant}' not found. Available: {available}"
```

### ReAct Agent v4 with Prompt Visibility
```python
# Key pattern: printing full prompt at step 3+ to show growing context
def restaurant_agent_v4(query, max_steps=10):
    tools = {
        "get_wait_time": get_wait_time,
        "get_rating": get_rating,
        "get_distance": get_distance,
        "get_cuisine": get_cuisine,
        "get_price_range": get_price_range,
        "calculate_travel_time": calculate_travel_time,
        "list_restaurants": list_restaurants,
    }

    history = []

    for step in range(max_steps):
        prompt = f"""Query: {query}

Previous steps: {history}

Available tools:
- get_wait_time(restaurant) - Get current wait time in minutes
- get_rating(restaurant) - Get rating (1-5 stars)
- get_distance(restaurant) - Get distance in miles
- get_cuisine(restaurant) - Get cuisine type
- get_price_range(restaurant) - Get price range ($, $$, $$$)
- calculate_travel_time(distance) - Get travel time in minutes
- list_restaurants() - Get list of all restaurants

What's the next step? If done, say "DONE".
Otherwise, respond with ONLY the function call."""

        # Show the full prompt at step 3+ when history is interesting
        if step >= 2:
            separator(f"Full prompt sent to LLM (Step {step + 1})")
            print(prompt)
            separator()

        response = generate(prompt).strip()
        # ... handle response, execute tool, update history
```

### Key Insight Block Pattern
```markdown
> **Key Insight:** LLMs are excellent at understanding and planning what needs to be done.
> What if instead of asking LLMs to DO things, we ask them to tell us WHAT NEEDS TO BE DONE?
```

## Notebook Structure Recommendation

### Recommended Cell Breakdown (approximately 50-55 cells total)

```
# Workshop 3: Building AI Agents                          (H1 markdown)

## Part 1: Quick Recap and LLM Limitations                (H2 markdown)
  - Setup & imports cell                                   (code)
  - W2 recap markdown (2-3 sentences)                      (markdown)
  - LLM multiplication test                                (code)
  - Multiplication result explanation                      (markdown)
  - More limitations: files, time, weather (3 code cells)  (code x3)
  - KEY INSIGHT: LLMs can only generate text               (markdown)

## Part 2: LLMs Can Plan                                  (H2 markdown)
  - LLM plans how to multiply                              (code)
  - LLM plans how to list files, get time                  (code)
  - KEY INSIGHT: LLMs plan, systems execute                (markdown)

## Part 3: Structured Extraction (W2 Bridge)              (H2 markdown)
  - Show unstructured restaurant description               (code)
  - Define Pydantic model                                  (code)
  - Extract structured data                                (code)
  - KEY INSIGHT: W2 extraction as building block           (markdown)

## Part 4: From Planning to Execution                     (H2 markdown)
  - Define simple math functions                           (code)
  - LLM generates function call as text                    (code)
  - Execute the function call                              (code)
  - Complete flow: user -> LLM plan -> execute -> respond  (code)
  - WHAT WE DISCOVERED                                     (markdown)

## Part 5: Restaurant Finder -- The Scenario              (H2 markdown)
  - Scenario introduction                                  (markdown)
  - Restaurant data definitions                            (code)
  - Tool function definitions                              (code)
  - Tool testing (3-4 cells testing individual tools)      (code x4)
  - Manual query walkthroughs (simple, then complex)       (code x2)
  - LLM planning test                                      (code)

## Part 6: Building the Agent                             (H2 markdown)
  ### Agent v1: Keyword Matching                           (H3)
  - v1 definition                                          (code)
  - v1 success test                                        (code)
  - v1 failure cases                                       (code)

  ### Agent v2: LLM Understanding                          (H3)
  - understand_query function                              (code)
  - extract_restaurant function                            (code)
  - v2 definition                                          (code)
  - v2 test (previously failing queries now work)          (code)
  - v2 limitation (complex queries)                        (code)

  ### Agent v3: LLM Tool Selection                         (H3)
  - v3 definition                                          (code)
  - v3 test                                                (code)
  - v3 limitation (multi-step)                             (markdown)

  ### Agent v4: The Loop                                   (H3)
  - v4 definition (with prompt printing)                   (code)
  - v4 test: simple query                                  (code)
  - v4 test: complex query (shows growing context)         (code)
  - v4 test: very complex query                            (code)

## Part 7: The ReAct Pattern                              (H2 markdown)
  - Agent evolution summary                                (markdown)
  - ReAct pattern naming and diagram                       (markdown)
  - Anthropic agent definition reference                   (markdown)

## Part 8: What's Next                                    (H2 markdown)
  - Analytics assistant preview                            (markdown)
  - W4 bridge: limitations of toy tools -> real tools      (markdown)
```

**Total estimated cells: ~50-55** (versus current ~65 cells with walls-of-code). Fewer cells but each more focused.

## Discretion Recommendations

### Key Insight Formatting
**Recommendation:** Match W2's pattern exactly: `> **Key Insight:** text` as markdown blockquotes. Use `output_box()` only for the 2-3 biggest moments (LLMs can only generate text, LLMs can plan, the ReAct loop pseudocode).
**Rationale:** Consistency with W2 is more important than visual distinctiveness. Blockquotes render well on projectors. Overusing styled boxes dilutes their impact.

### Restaurant Data Specifics
**Recommendation:** 6 restaurants. Names should be recognizable but fictional enough to avoid confusion with real chains: "Olive Garden" (well-known Italian), "Sushi Palace" (generic Japanese), "Burger Barn" (casual American), "Taj Mahal" (Indian), "Dragon Wok" (Chinese), "La Piazza" (upscale Italian). Two Italian places enables interesting comparison queries ("Best Italian place?").
**Rationale:** 6 provides enough variety for complex multi-step queries without making output overwhelming. Two of the same cuisine enables "compare" and "best of type" queries. Price range spread ($, $$, $$$) enables filtering queries.

### Code Cell Granularity
**Recommendation:** Maximum 30 lines per code cell. If a function definition exceeds 30 lines, it gets its own cell. Testing is always a separate cell. Failure demonstration is always a separate cell.
**Rationale:** Projector readability. The instructor needs to be able to point at a cell and have students see the whole thing without scrolling. The current v4 agent cell is 40+ lines -- split into definition cell and test cells.

### Output Formatting for Projector
**Recommendation:** Use `output_box()` for LLM responses and important results. Use `separator()` between agent steps. Use f-strings with clear labels for step-by-step output. Avoid dense tabular output -- prefer labeled lines.
**Rationale:** A projector at the back of a classroom needs large, well-spaced text. Dense tables are unreadable. Labeled output with clear visual separation between steps is scannable.

### Prompt Printing Placement in v4
**Recommendation:** Print the full prompt starting at step 3 (when the history contains at least 2 prior tool calls and their results). Print only the first 2-3 times to avoid output explosion. After step 5, stop printing and just show a note: "Prompt continues to grow with each step..."
**Rationale:** Step 1-2 prompts are boring (short history). Step 3+ shows interesting growth. After 3 printings, the pattern is clear. Continuing to print makes the notebook output too long and students lose focus.

### Analytics Preview / What's Next
**Recommendation:** Keep the analytics assistant preview section but trim it to 1 markdown cell. Focus on: (1) what we built today (agents with toy tools), (2) what's next (real tools for real data), (3) the limitation that motivates W4 (our tools are fun but toy-like -- how do we design tools for actual data analysis?).
**Rationale:** The bridge to W4 needs to feel natural. The current W3 notebook has a long analytics preview section that goes into tool design philosophy (which is W4's territory). Trim to just the "limitation -> next workshop" hook.

### Structured Extraction Integration
**Recommendation:** Place the extraction section as Part 3, after LLM limitations but before function calling. The flow is: (1) LLMs can't do things, (2) but they can plan AND they can extract structured data from text (W2 callback), (3) now let's use both abilities to build something. The extraction output is NOT used by the agent tools (they use pre-built dictionaries). The extraction section is a bridge moment, not a functional dependency.
**Rationale:** Placing extraction between "limitations" and "function calling" creates a natural narrative: "LLMs have limitations, but they have strengths too -- planning AND extraction. Let's combine these strengths." Keeping the extraction results separate from agent tools avoids coupling and keeps the agent code clean for teaching.

## Open Questions

1. **LLM response consistency for tool calls**
   - What we know: gpt-4o-mini reliably generates simple function calls when instructed to respond with "ONLY the function call."
   - What's unclear: Whether the Restaurant Finder scenario introduces any names or formats that cause the LLM to deviate from clean function call output (e.g., restaurant names with special characters).
   - Recommendation: Test with the chosen restaurant names during implementation. If any name causes issues, rename the restaurant.

2. **eval() handling of quoted strings in function calls**
   - What we know: The existing W3 notebook uses `eval(response, tools)` to execute LLM-generated function calls. This works for `get_queue_length("General Hospital")`.
   - What's unclear: Whether the LLM will consistently use the correct quoting style for restaurant names (single vs double quotes, escaping apostrophes).
   - Recommendation: Use restaurant names without apostrophes or special characters to avoid quoting issues. Test during implementation.

3. **Optimal number of "print full prompt" steps in v4**
   - What we know: Should start at step 3+ per CONTEXT decisions.
   - What's unclear: Whether 2-3 printings is enough to convey the concept, or whether students need to see more.
   - Recommendation: Start with printing at steps 3, 4, and 5. After step 5, print only a count: "Prompt now includes {len(history)} previous steps." Adjust based on how complex the test queries are.

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis: `notebooks/workshop_03_building_ai_agents_foundations.ipynb` -- all 65 cells read and analyzed
- Existing codebase analysis: `notebooks/workshop_02_prompt_engineering.ipynb` -- quality standard patterns extracted
- Existing codebase analysis: `notebooks/workshop_04_tool_design_for_agents.ipynb` -- W4 bridge requirements understood
- Existing codebase analysis: `notebooks/utils/display.py` -- all 5 functions documented
- Existing codebase analysis: `.planning/phases/03-workshop-3-materials/03-CONTEXT.md` -- user decisions locked
- Existing codebase analysis: `curriculum/CURRICULUM.md` -- W3 learning objectives and teaching flow

### Secondary (MEDIUM confidence)
- OpenAI Structured Outputs documentation -- `chat.completions.parse()` API confirmed current and stable
- ReAct pattern implementations -- well-established pattern, multiple implementations confirm the Think-Act-Observe loop approach

### Tertiary (LOW confidence, needs validation)
- Restaurant name handling by gpt-4o-mini in function call generation -- not tested with specific names chosen
- Optimal prompt printing frequency in v4 agent -- pedagogical judgment, needs instructor feedback

## Metadata

**Confidence breakdown:**
- Notebook structure and teaching arc: HIGH -- proven in existing W3, just needs scenario swap and quality upgrade
- W2 bridge (structured extraction): HIGH -- uses exact same Pydantic pattern already in W2
- Restaurant data design: HIGH -- straightforward simulated data, no external dependencies
- Agent v1-v4 evolution: HIGH -- proven teaching arc, just new scenario
- Prompt visibility in v4: HIGH -- simple print statements, well-defined placement
- Formatting quality: HIGH -- W2 patterns fully documented and available to follow

**Research date:** 2026-02-24
**Valid until:** 2026-03-24
