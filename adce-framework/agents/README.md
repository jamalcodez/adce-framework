# ADCE Framework Agents

This directory contains the four core ADCE (Appetite-Driven Context Engineering) agents for Claude Code.

## Quick Installation

```bash
# Copy agents to your Claude Code project
cp agents/*.md .claude/agents/
The Four Core Agents
🎯 shaper

Purpose: Turn broad ideas into appetite-bounded pitches with context
When to use: Starting new features, defining project scope
Example: "Use shaper to create a pitch for user dashboard improvements"

🏗️ architect

Purpose: Technical leadership, architecture decisions, scope management
When to use: Technical feasibility, creating PRPs, managing complexity
Example: "Use architect to review this pitch for technical feasibility"

🎨 builder

Purpose: UI/UX design and frontend implementation with 2025 design patterns
When to use: Building user interfaces, implementing designs, applying modern trends
Example: "Use builder to implement the dashboard components with 2025 design patterns"

🚀 deployer

Purpose: Infrastructure, deployment, production operations
When to use: Getting features to production, managing infrastructure
Example: "Use deployer to set up staging environment"

Usage Workflow

Shaping: shaper creates appetite-bounded pitch
Architecture: architect reviews feasibility and creates PRPs
Building: builder and deployer implement features
Integration: architect manages integration and scope decisions
Deployment: deployer gets features to production

Agent Configuration
Each agent includes:

Specific tools access: Only the tools needed for their role
Context engineering: Comprehensive prompts for AI success
Appetite awareness: Built-in scope and time management
Validation criteria: Clear success metrics and testing

Customization
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
