# CSV Data Analytics Agent

A ReAct-based AI agent that can analyze CSV files through natural language queries. Built with code generation, safe execution, and conversational memory.

## Quick Start

### 1. Setup Environment

```bash
# Install dependencies with uv
uv sync

# Or with pip
pip install -e .
```

### 2. Configure API Key

Choose one provider:

```bash
# For OpenAI
export OPENAI_API_KEY='your-key-here'

# For Anthropic
export ANTHROPIC_API_KEY='your-key-here'
```

### 3. Run the Agent

**Interactive Mode allowing ad-hoc queries** (default):
```bash
python demo.py
# or with Anthropic
python demo.py --provider anthropic
```

**Quick Demo with preset queries** (5 minutes):
```bash
python demo.py --scenario quick
```

**Full Demo with preset queries** (15 minutes):
```bash
python demo.py --scenario full
```

## Usage

### Interactive CLI

The CLI supports natural language queries and special commands:

**Commands:**
- `/load <filepath> [alias]` - Load a CSV file
- `/list` - Show all loaded datasets
- `/clear` - Clear conversation history
- `/help` - Show help
- `/exit` - Exit the CLI

**Example Session:**
```
> /load data/ecommerce_sales.csv sales
> What are the top 5 products by revenue?
> Show me a bar chart of revenue by category
> Which regions have the highest sales?
```

### Demo Datasets

Three sample datasets are included in `data/`:
- `ecommerce_sales.csv` - 10,000 sales records
- `customers.csv` - 500 customer profiles
- `pokemon.csv` - 800 Pokemon stats

## Architecture

**Code-First Hybrid ReAct Agent:**
- **ReAct Loop**: Think → Act → Observe pattern for multi-step reasoning
- **Code Generation**: Dynamic pandas/matplotlib code for flexible analytics
- **Safe Execution**: RestrictedPython sandbox with AST validation and 5s timeout
- **Conversation Memory**: Context tracking across multiple turns

**Tools (5):**
1. `load_csv` - Load CSV files
2. `list_datasets` - View loaded datasets
3. `inspect_dataset` - Examine schema and statistics
4. `analyze` - Generate and execute pandas code
5. `visualize` - Generate and execute matplotlib/seaborn code

## Example Queries

**Data Exploration:**
- "What columns are in the sales dataset?"
- "Show me the first 10 rows"
- "Give me statistics for all numeric columns"

**Analytics:**
- "What's the total revenue?"
- "Show top 10 products by sales"
- "Calculate average order value by region"
- "Which category has the highest profit margin?"

**Multi-Table:**
- "Join sales and customers on customer_id"
- "Show revenue by customer segment"
- "Which Premium customers spent the most?"

**Visualizations:**
- "Create a bar chart of revenue by category"
- "Show a scatter plot of price vs quantity"
- "Plot monthly revenue trend as a line chart"
- "Generate a pie chart of sales by region"

**Time Series:**
- "Show monthly revenue for 2024"
- "What was the revenue trend in Q3?"
- "Compare sales across quarters"

## Project Structure

```
demo/
├── analytics_assistant/       # Main package
│   ├── agent.py              # ReAct orchestrator
│   ├── prompts.py            # LLM prompts (996 lines)
│   ├── executor.py           # Safe code execution
│   ├── memory.py             # Conversation memory
│   ├── cli.py                # Interactive CLI
│   └── tools/                # Tool implementations
│       ├── base.py           # BaseTool interface
│       ├── dataset.py        # Dataset management
│       └── analytics.py      # Analysis & visualization
├── data/                     # Demo datasets
├── outputs/                  # Generated visualizations
├── demo.py                   # Demo script
└── README.md                 # This file
```

## Troubleshooting

**API Key Issues:**
```bash
# Check if key is set
echo $OPENAI_API_KEY

# Set it if missing
export OPENAI_API_KEY='sk-...'
```

**Missing Data:**
If demo data files are missing, they should be in the `data/` directory.

**Import Errors:**
```bash
# Reinstall dependencies
uv sync --force
```

**Execution Timeout:**
The safe executor has a 5-second timeout. Complex queries may need simplification.
