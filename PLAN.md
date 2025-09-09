# Build Fellowship Project Plan: AI-Powered Data Analytics Assistant

## Project Context & Analysis

### Project Overview
- **Title**: AI-Powered Data Exploration: Build Your Own Analytics Assistant
- **Duration**: 8 weeks (September 8 - October 27, 2025)
- **Format**: Weekly 60-minute workshops (Tuesdays 4PM ET)
- **Deliverable**: Working AI agent that translates natural language to pandas code

### Student Cohort Analysis

#### Cohort Profile (10 Students)
Based on analysis of student profiles, this is a **builder's cohort** with the following characteristics:

**Technical Background:**
- All students have Python programming experience (loops, functions, pandas basics)
- 9/10 have taken ML/AI courses (ranging from basic to advanced NLP/Deep Learning)
- Mix of undergraduate, Master's students, and professionals
- Several have 2+ years of professional experience

**Key Insight**: These are not beginners learning to code. They are intermediate programmers who have learned ABOUT AI and now want to learn to BUILD WITH AI.

#### Student Learning Objectives (Common Themes)
1. **Practical Implementation** - "hands-on experience" appears in 70% of profiles
2. **Bridge Theory to Practice** - Students know ML theory, want to build real tools
3. **Portfolio Development** - Need demonstrable projects for job applications
4. **GenAI/LLM Skills** - Specifically want prompt engineering and LLM integration

#### Three Student Archetypes

**Type A: The Theorists** (40% of cohort)
- Have extensive ML/DL coursework
- Want practical implementation experience
- Need: Connection between theory and building

**Type B: The Practitioners** (40% of cohort)
- Have coding/professional experience
- Want to add AI to their toolkit
- Need: Structured path to AI development

**Type C: The Explorers** (20% of cohort)
- Have basic foundation
- Want to understand the landscape
- Need: Confidence and clear direction

### Pedagogical Decisions

#### Core Teaching Philosophy
**"Build from first principles, then professionalize with frameworks"**

Students will:
1. Build an agent from scratch (Weeks 2-5) to understand fundamentals
2. Learn industry frameworks (Week 6) to see best practices
3. Create unique implementations (Week 7) for portfolio differentiation

#### Why Build From Scratch First?
- **Understanding > Using**: Students need to know HOW agents work, not just use them
- **Debugging Capability**: When things break, they can fix them
- **Interview Strength**: Can explain architecture decisions
- **Confidence Building**: "I built this" vs "I used a library"

#### Progressive Abstraction Approach
```
Week 2-3: Raw LLM calls → Understanding basics
Week 4-5: Custom agent class → Understanding architecture
Week 6: Framework introduction → Understanding industry patterns
Week 7: Framework extension → Understanding customization
```

### Project Constraints & Considerations

#### Time Constraints
- 60 minutes per session (very limited)
- 2-3 hours homework per week
- 8 total sessions (1 intro, 6 teaching, 1 presentations)

#### Technical Constraints
- Students have varying API access (OpenAI, Anthropic, etc.)
- Need to work in Jupyter notebooks for accessibility
- Must handle different operating systems

#### Success Metrics
- Each student has a unique, working agent by Week 8
- Students can explain how their agent works
- Students can debug and extend their agent
- Portfolio-ready project with documentation

---

## Workshop Plans

### Workshop 1: The Paradigm Shift - Introduction & Motivation
**Date**: September 8, 2025
**Duration**: 60 minutes

#### Learning Objectives
- Understand the paradigm shift from traditional programming to AI-augmented development
- Set expectations for the 8-week journey
- Build excitement about practical AI implementation
- Choose datasets for individual projects

#### Session Structure

**Part 1: Welcome & Introductions (15 min)**
- Fellow introduction and background
- Student introductions (name, background, one goal)
- Project overview and logistics

**Part 2: The Paradigm Shift (20 min)**

*The Before Times (Pre-2020):*
```python
# The old way: memorize syntax
# Stack Overflow → Copy/Paste → Debug → Repeat
# "How do I groupby in pandas again?"
```

*The Breakthrough (2020-2024):*
```python
# The new way: describe intent
query = "Show me average sales by region"
# AI understands and generates perfect code
```

*Live Demonstration:*
- Complex data task: "Find correlations between features"
- Traditional approach: 20+ lines of code, syntax lookups
- AI approach: One natural language query

**Part 3: Why This Matters Now (15 min)**
- Job market reality: AI skills are now required
- The skill convergence: LLMs + Code Generation + Agents
- Your advantage: Understanding the HOW, not just the WHAT

**Part 4: Project Preview & Dataset Selection (10 min)**
- Show final agent demo
- Dataset options: Spotify tracks, sales data, movies, or custom
- Week-by-week preview
- Homework: Install dependencies, test API access

#### Deliverables
- Environment setup confirmation
- Dataset selected
- API key configured

#### Materials Needed
- Slide deck with paradigm shift visualization
- Live demo notebook
- Setup instructions document
- Dataset examples

---

### Workshop 2: LLMs as Pattern Machines
**Date**: September 15, 2025
**Duration**: 60 minutes

#### Learning Objectives
- Understand LLMs as pattern completion engines
- Make first API calls to an LLM
- See how prompts affect outputs
- Generate first pandas code with AI

#### Pre-Session Preparation
```python
# Starter notebook with:
- API setup code
- Basic prompt templates
- Test datasets loaded
- Exercise scaffolding
```

#### Session Structure

**Part 1: Demystifying LLMs (10 min)**
```python
# LLMs are pattern completers
patterns = [
    "2, 4, 6, ___",              # → 8
    "df.head() shows ___",        # → first 5 rows
    "SELECT * FROM ___",          # → table_name
]
# It's all the same to the LLM!
```

Key concepts:
- No consciousness, just statistics
- Temperature and randomness
- Tokens and context windows

**Part 2: First LLM Interactions (15 min)**
```python
import openai

def get_completion(prompt, temperature=0):
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature
    )
    return response.choices[0].message.content

# Exercise 1: Complete patterns
# Exercise 2: Generate pandas code
# Exercise 3: See temperature effects
```

**Part 3: Generating Pandas Code (25 min)**
```python
def generate_pandas_code(natural_language_query):
    prompt = f"""
    Convert this request to pandas code:
    Request: {natural_language_query}
    Use 'df' as the dataframe name.
    Return only executable Python code.
    """
    
    code = get_completion(prompt)
    return extract_code_block(code)

# Students try different queries
# "show me the first 5 rows"
# "count missing values"
# "get column names"
```

**Part 4: Understanding Failures (10 min)**
- Hallucinated methods demonstration
- Ambiguous prompts failing
- Importance of specificity

#### Homework
- Generate 5 working pandas operations
- Find 3 prompts that fail or hallucinate
- Document what makes prompts reliable

#### Deliverables
- Working notebook with LLM calls
- List of reliable prompts
- Understanding of LLM limitations

---

### Workshop 3: Prompt Engineering - Programming the Probabilistic Computer
**Date**: September 22, 2025
**Duration**: 60 minutes

#### Learning Objectives
- Master prompt engineering techniques
- Build reliable code generation
- Implement error handling
- Create reusable prompt templates

#### Session Structure

**Part 1: Prompt Engineering Principles (10 min)**
```python
# System vs User prompts
system = "You are a pandas code generator"
user = "Show me the data"

# Few-shot learning
examples = [
    ("show columns", "df.columns.tolist()"),
    ("count rows", "len(df)"),
]
```

**Part 2: Building Reliable Prompts (20 min)**
```python
class CodeGenerator:
    def __init__(self):
        self.system_prompt = """
        You are a pandas expert.
        Rules:
        1. Output ONLY executable Python code
        2. Use 'df' as the dataframe name
        3. No explanations or markdown
        4. Handle edge cases gracefully
        """
        
        self.examples = [
            # Few-shot examples
        ]
    
    def generate(self, query):
        prompt = self.build_prompt(query)
        code = get_completion(prompt)
        return self.extract_code(code)
```

**Part 3: Testing and Validation (20 min)**
```python
def validate_code(code):
    """Check if generated code is safe and valid"""
    # Check for dangerous operations
    dangerous = ['exec', 'eval', '__import__', 'open']
    for word in dangerous:
        if word in code:
            return False, f"Dangerous operation: {word}"
    
    # Try parsing
    try:
        ast.parse(code)
        return True, "Valid Python"
    except SyntaxError as e:
        return False, f"Syntax error: {e}"
```

**Part 4: Advanced Techniques (10 min)**
- Chain-of-thought prompting
- Output formatting (JSON structure)
- Prompt chaining for complex operations

#### Homework
- Create a prompt template for your domain
- Test edge cases and document failures
- Build a prompt library with 10+ operations

#### Deliverables
- Robust code generator class
- Validated prompt templates
- Error handling implementation

---

### Workshop 4: From Prompts to Agents - Adding State and Tools
**Date**: September 29, 2025
**Duration**: 60 minutes

#### Learning Objectives
- Understand agent architecture
- Implement tools and tool selection
- Add memory/conversation state
- Build first working agent

#### Session Structure

**Part 1: The Agent Mental Model (10 min)**
```python
# Humans vs Agents exercise
"""
Human: Sees data → Analyzes → Takes action
Agent: No senses → Needs tools → Takes action
"""

class AgentArchitecture:
    """
    Components:
    1. Brain (LLM)
    2. Memory (State)
    3. Tools (Capabilities)
    4. Loop (Think-Act-Observe)
    """
```

**Part 2: Building Tools (15 min)**
```python
class DataTools:
    def __init__(self, df):
        self.df = df
    
    def load_data(self, filepath):
        """Tool: Load CSV data"""
        self.df = pd.read_csv(filepath)
        return f"Loaded {len(self.df)} rows"
    
    def show_info(self):
        """Tool: Show dataframe info"""
        return str(self.df.info())
    
    def get_statistics(self):
        """Tool: Get summary statistics"""
        return self.df.describe().to_string()
```

**Part 3: Agent Implementation (25 min)**
```python
class DataAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.memory = []  # Conversation history
    
    def process(self, query):
        # Add to memory
        self.memory.append(("user", query))
        
        # Determine needed tool
        tool_name = self.select_tool(query)
        
        # Execute tool
        if tool_name in self.tools:
            result = self.tools[tool_name]()
            self.memory.append(("tool", result))
            return result
        else:
            # Generate code if no tool matches
            code = self.generate_code(query)
            result = self.execute_code(code)
            self.memory.append(("code", result))
            return result
```

**Part 4: Testing the Agent (10 min)**
- Process multi-step queries
- Show memory persistence
- Demonstrate tool selection

#### Homework
- Add 3 custom tools for your domain
- Implement conversation memory
- Test multi-turn interactions

#### Deliverables
- Working agent with tools
- Memory implementation
- Tool selection logic

---

### Workshop 5: Complex Workflows - Multi-Step Reasoning
**Date**: October 6, 2025
**Duration**: 60 minutes

#### Learning Objectives
- Decompose complex queries into steps
- Implement pipeline execution
- Handle intermediate results
- Build sophisticated data workflows

#### Session Structure

**Part 1: Query Decomposition (10 min)**
```python
# Complex query example
query = "Find the artist with highest average energy in rock genre"

# Decomposed steps:
steps = [
    "Filter for rock genre",
    "Group by artist", 
    "Calculate average energy",
    "Find maximum"
]
```

**Part 2: Pipeline Architecture (20 min)**
```python
class QueryPipeline:
    def __init__(self, agent):
        self.agent = agent
        self.intermediate_results = {}
    
    def decompose_query(self, complex_query):
        """Use LLM to break down query into steps"""
        prompt = f"""
        Break this complex query into simple steps:
        Query: {complex_query}
        
        Return a numbered list of pandas operations.
        """
        steps = self.agent.llm.generate(prompt)
        return self.parse_steps(steps)
    
    def execute_pipeline(self, steps):
        """Execute each step and track results"""
        for i, step in enumerate(steps):
            code = self.agent.generate_code(step)
            result = self.agent.execute_code(code)
            self.intermediate_results[f"step_{i}"] = result
        return self.intermediate_results
```

**Part 3: Advanced Execution Patterns (20 min)**
```python
class SmartExecutor:
    def execute_with_recovery(self, code):
        """Execute with error recovery"""
        try:
            result = exec(code, {"df": self.df, "pd": pd})
            return {"success": True, "result": result}
        except Exception as e:
            # Try to fix common errors
            fixed_code = self.auto_fix_code(code, str(e))
            if fixed_code:
                return self.execute_with_recovery(fixed_code)
            return {"success": False, "error": str(e)}
    
    def auto_fix_code(self, code, error):
        """Use LLM to fix errors"""
        prompt = f"""
        This code failed:
        {code}
        
        Error: {error}
        
        Provide fixed code:
        """
        return self.llm.generate(prompt)
```

**Part 4: Optimization and Caching (10 min)**
- Result caching strategies
- Query optimization
- Parallel execution concepts

#### Homework
- Implement complex query for your dataset
- Add error recovery
- Create 3-step pipeline demonstration

#### Deliverables
- Pipeline execution system
- Error recovery implementation
- Complex query demonstration

---

### Workshop 6: Industry Patterns - Frameworks and Best Practices
**Date**: October 13, 2025
**Duration**: 60 minutes

#### Learning Objectives
- Understand industry frameworks (smolagents, LangChain)
- Compare DIY vs framework approaches
- Learn production patterns
- See what we built vs what frameworks provide

#### Session Structure

**Part 1: Framework Introduction (10 min)**
```python
# What we built
our_agent = DataAgent(llm, tools)

# Industry framework
from smolagents import CodeAgent
framework_agent = CodeAgent(tools=[], model=model)

# Compare and contrast
```

**Part 2: Framework Deep Dive (20 min)**
```python
# Smolagents patterns
from smolagents import Tool, CodeAgent

@tool
def analyze_data(df: pd.DataFrame, operation: str) -> str:
    """Analyze dataframe with specified operation"""
    # Framework handles:
    # - Type validation
    # - Error handling
    # - Result formatting
    
# What the framework adds:
# 1. Robust error handling
# 2. Token management
# 3. Streaming responses
# 4. Built-in tools
```

**Part 3: Production Patterns (20 min)**
```python
class ProductionAgent:
    def __init__(self):
        self.rate_limiter = RateLimiter(calls_per_minute=20)
        self.cache = TTLCache(maxsize=100, ttl=300)
        self.logger = self.setup_logging()
        
    async def process_async(self, query):
        """Production-ready processing"""
        # Check cache
        if query in self.cache:
            return self.cache[query]
        
        # Rate limiting
        await self.rate_limiter.acquire()
        
        # Process with monitoring
        with self.monitor_latency():
            result = await self.agent.process(query)
        
        # Cache result
        self.cache[query] = result
        return result
```

**Part 4: Best Practices Discussion (10 min)**
- When to use frameworks vs custom
- Security considerations
- Cost optimization
- Monitoring and observability

#### Homework
- Rebuild agent using smolagents
- Compare performance and features
- Document pros/cons of each approach

#### Deliverables
- Framework implementation
- Comparison documentation
- Best practices checklist

---

### Workshop 7: Personalization & Production Polish
**Date**: October 20, 2025
**Duration**: 60 minutes

#### Learning Objectives
- Customize agent for specific domain
- Add production features
- Polish user experience
- Prepare for final presentations

#### Session Structure

**Part 1: Domain Customization (15 min)**
```python
class DomainSpecificAgent(CodeAgent):
    """Customize for your specific dataset"""
    
    def __init__(self, domain="music"):
        super().__init__()
        self.domain = domain
        self.custom_tools = self.load_domain_tools()
        self.domain_prompt = self.create_domain_prompt()
    
    def create_domain_prompt(self):
        if self.domain == "music":
            return """
            You analyze music data.
            Columns: artist, genre, tempo, energy, valence
            Common queries: popularity, audio features, recommendations
            """
        # Add other domains
```

**Part 2: Advanced Features (20 min)**
```python
class EnhancedAgent:
    def explain_code(self, code):
        """Generate explanations for learning"""
        prompt = f"Explain this pandas code:\n{code}"
        return self.llm.generate(prompt)
    
    def suggest_visualizations(self, data_summary):
        """Recommend appropriate charts"""
        prompt = f"""
        Given this data summary:
        {data_summary}
        
        Suggest 3 appropriate visualizations.
        """
        return self.llm.generate(prompt)
    
    def export_analysis(self, results, format="markdown"):
        """Export results in various formats"""
        if format == "markdown":
            return self.to_markdown(results)
        elif format == "json":
            return self.to_json(results)
```

**Part 3: User Experience Polish (15 min)**
```python
class UserFriendlyAgent:
    def process_with_feedback(self, query):
        """Provide progressive feedback"""
        print(f"🤔 Understanding your request...")
        steps = self.decompose(query)
        
        print(f"📋 I'll need to: {', '.join(steps)}")
        
        for i, step in enumerate(steps, 1):
            print(f"⚙️ Step {i}: {step}")
            result = self.execute(step)
            print(f"✅ Completed: {self.summarize(result)}")
        
        return self.format_final_result(result)
```

**Part 4: Presentation Preparation (10 min)**
- Demo structure guidance
- Unique features to highlight
- Technical explanation practice
- Q&A preparation

#### Homework
- Finalize unique features
- Prepare 5-minute demo
- Create project documentation
- Practice technical explanation

#### Deliverables
- Polished, domain-specific agent
- Demo presentation ready
- Documentation complete
- Unique features implemented

---

## Assessment & Success Criteria

### Individual Success Metrics
1. **Technical Implementation** (40%)
   - Working agent that processes natural language
   - Handles errors gracefully
   - Implements memory/state

2. **Understanding** (30%)
   - Can explain how their agent works
   - Understands prompt engineering principles
   - Knows when to use frameworks vs custom

3. **Customization** (20%)
   - Domain-specific features
   - Unique implementation choices
   - Creative problem solving

4. **Presentation** (10%)
   - Clear demonstration
   - Technical explanation
   - Professional delivery

### Portfolio Outcome
Each student will have:
```
project/
├── notebooks/
│   ├── week2_llm_basics.ipynb
│   ├── week3_prompt_engineering.ipynb
│   ├── week4_agent_architecture.ipynb
│   ├── week5_pipelines.ipynb
│   ├── week6_frameworks.ipynb
│   └── week7_final_agent.ipynb
├── src/
│   ├── agent_from_scratch.py
│   ├── agent_with_framework.py
│   └── domain_customization.py
├── data/
│   └── [their chosen dataset]
├── docs/
│   ├── README.md
│   ├── architecture.md
│   └── usage_examples.md
└── presentation/
    └── demo_slides.pdf
```

### Resume Bullet Points
Students can claim:
- "Built an AI-powered data analysis agent that translates natural language queries into executable pandas code"
- "Implemented prompt engineering techniques achieving 95% code generation accuracy"
- "Developed both from-scratch and framework-based implementations to understand core architectures"
- "Integrated LLMs into data science workflows, reducing analysis time by 70%"

---

## Resources & Materials

### Required Tools
- Python 3.8+
- Jupyter Notebook/Lab
- OpenAI or Anthropic API key
- pandas, numpy, matplotlib
- (Week 6+) smolagents library

### Datasets Provided
- Spotify tracks (music analysis)
- E-commerce sales (business analysis)
- Movie ratings (recommendation systems)
- Custom dataset (student's choice)

### Weekly Materials
Each week includes:
- Starter notebook with scaffolding
- Solution notebook (released after class)
- Conceptual slides (5-10 slides max)
- Additional reading resources

### Support Structure
- Office hours: 30 min after each session
- Discord/Slack channel for questions
- Peer programming encouraged
- Code review opportunities

---

## Risk Mitigation

### Common Challenges & Solutions

**Challenge**: API rate limits/costs
**Solution**: Provide fallback responses, implement caching, use smaller models for testing

**Challenge**: Different skill levels
**Solution**: Provide "basic" and "advanced" tracks in homework, pair programming

**Challenge**: Technical issues during class
**Solution**: Pre-recorded backup demos, offline notebooks ready

**Challenge**: Students falling behind
**Solution**: Cumulative notebooks that build on working code, catch-up office hours

---

## Final Notes for Implementation

### Week-by-Week Fellow Preparation
1. Test all code examples with multiple APIs
2. Prepare debugging scenarios
3. Have backup plans for technical failures
4. Create cheat sheets for common issues

### Key Success Factors
- Keep theory minimal, focus on building
- Celebrate failures as learning opportunities
- Show real-world applications constantly
- Emphasize that everyone's agent will be unique

### The Core Message
"You're not learning to use AI tools. You're learning to build AI tools. By Week 8, you'll have created something that would have required a team of engineers just 5 years ago."