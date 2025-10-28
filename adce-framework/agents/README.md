# ADCE Framework Agents

This directory contains the five core ADCE (Appetite-Driven Context Engineering) agents for Claude Code.

## Quick Installation

```bash
# Copy agents to your Claude Code project
cp agents/*.md .claude/agents/
```

## The Five ADCE Agents
🎯 shaper

Purpose: Turn broad ideas into appetite-bounded pitches with context
When to use: Starting new features, defining project scope
Example: "Use shaper to create a pitch for user dashboard improvements"

🏗️ architect

Purpose: Technical leadership, architecture decisions, scope management
When to use: Technical feasibility, creating PRPs, managing complexity
Example: "Use architect to review this pitch for technical feasibility"

📋 planner

Purpose: Break PRPs into specific, sequential, dependency-aware tasks
When to use: Complex features needing granular execution steps, coordinating parallel work
Example: "Use planner to break down the API PRP into specific implementation tasks"

🎨 builder

Purpose: UI/UX design and frontend implementation with 2025 design patterns
When to use: Building user interfaces, implementing designs, applying modern trends
Example: "Use builder to implement the dashboard components with 2025 design patterns"

🚀 deployer

Purpose: Infrastructure, deployment, production operations
When to use: Getting features to production, managing infrastructure
Example: "Use deployer to set up staging environment"

## Usage Workflow

### Standard Flow (Simple Features)
1. **Shaping**: shaper creates appetite-bounded pitch
2. **Architecture**: architect reviews feasibility and creates PRPs
3. **Building**: builder and deployer implement features
4. **Integration**: architect manages integration and scope decisions
5. **Deployment**: deployer gets features to production

### Extended Flow (Complex Features)
1. **Shaping**: shaper creates appetite-bounded pitch
2. **Architecture**: architect reviews feasibility and creates PRPs
3. **Planning**: planner breaks PRPs into specific, dependency-aware tasks (NEW)
4. **Building**: builder and deployer execute tasks systematically
5. **Integration**: architect manages integration and scope decisions
6. **Deployment**: deployer gets features to production

## Agent Configuration
Each agent includes:

- Specific tools access: Only the tools needed for their role
- Context engineering: Comprehensive prompts for AI success
- Appetite awareness: Built-in scope and time management
- Validation criteria: Clear success metrics and testing

## When to Use the Planner

### Always Use For:
- Complex features (1-2 week or 2-3 week appetite)
- Features with many integration points or dependencies
- Work involving multiple developers or AI sessions
- High-risk technical work with unknowns
- Onboarding new team members to the codebase

### Consider Skipping For:
- Simple features (1-3 day appetite, straightforward implementation)
- Well-understood patterns (e.g., another CRUD endpoint)
- Solo developer comfortable working from PRPs directly
- Emergency bug fixes requiring immediate action

### Benefits of Task Planning:
- **Systematic execution**: Clear step-by-step path from start to finish
- **Better AI results**: Specific tasks → specific prompts → better code
- **Parallel work**: Multiple developers can work on independent tasks
- **Progress tracking**: Know exactly where you are (7/12 tasks = 58% done)
- **Early risk detection**: If Task 3 takes 2x estimate, trigger circuit breaker
- **Clearer handoffs**: Easy to delegate or resume work later

## Customization
You can customize agents by:

Modifying the description field for different trigger conditions
Adjusting tools access for your specific needs
Adding domain-specific context to the agent prompts
Including your team's specific patterns and gotchas

Troubleshooting
Agent not triggering automatically?

Check the description field includes "MUST BE USED for..."
Ensure your request matches the agent's purpose
Try explicitly calling: "Use [agent-name] to..."

Agent giving generic responses?

Add more specific context to your request
Include relevant files and documentation in your prompt
Reference existing code patterns and examples

Need help?

Check the examples directory for complete workflows
Read the methodology documentation
Join our community discussions
