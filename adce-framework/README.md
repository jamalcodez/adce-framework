# ADCE Framework
**Appetite-Driven Context Engineering for AI-First Development**

[![NPM Version](https://img.shields.io/npm/v/adce-framework.svg)](https://npmjs.org/package/adce-framework)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/jamalcodez/adce-framework.svg)](https://github.com/jamalcodez/adce-framework/stargazers)

> Transform vague ideas into production-ready features using AI agents, appetite constraints, and context engineering.

## What is ADCE?

ADCE combines the best of three methodologies:
- **Shape Up**: Appetite setting, circuit breakers, and scope management  
- **Product Requirement Prompts (PRP)**: Context engineering for AI success
- **Subagents**: Specialized AI agents with domain expertise

**Result**: Turn broad ideas into working software within predictable timeframes.

## Quick Start

> **Note**: ADCE provides agents that run INSIDE Claude Code. You need Claude Code installed first.

### 1. Install the Framework

**After npm publication** (coming soon):
```bash
# Global installation (recommended)
npm install -g adce-framework
adce-framework install

# Or use directly
npx adce-framework install
```

**Current installation** (before npm publication):
```bash
# Clone and run installer
git clone https://github.com/jamalcodez/adce-framework.git
cd adce-framework/adce-framework
npm install
cd /path/to/your/project
node /path/to/adce-framework/adce-framework/install.js
```

Or **manual installation** (quickest):
```bash
# Copy agents to your project
mkdir -p .claude/agents
cp /path/to/adce-framework/adce-framework/agents/*.md .claude/agents/
```

See [INSTALL.md](INSTALL.md) for detailed installation instructions.

### 2. Start Your First Cycle
```bash
# 1. Create a pitch from your idea
"Use shaper to create a pitch for: [your broad idea]"

# 2. Review technical feasibility
"Use architect to review this pitch for feasibility"

# 3. Break into specific tasks
"Use planner to break down the PRP into implementation tasks"

# 4. Start building
"Use builder to implement the first task from the plan"
"Use deployer to set up production deployment"
```

**Note**: For very simple features (single file, <2 hour tasks), you may skip step 3 (planner) and go directly from architect to builder/deployer.

## Why ADCE Works

### ❌ Traditional Problems:
- Vague prompts → unusable AI output
- No scope discipline → endless iteration
- Context loss → repeated explanations
- No systematic approach → inconsistent results

### ✅ ADCE Solutions:
- Systematic refinement: Ideas → working software
- Appetite constraints: Prevent scope creep
- Context engineering: Enable AI first-pass success
- Specialized agents: Domain expertise + consistency

## The Five Core Agents
🎯 **shaper** - Turns broad ideas into appetite-bounded pitches with comprehensive context

🏗️ **architect** - Manages technical implementation, architecture decisions, and scope within appetite

📋 **planner** - Breaks PRPs into specific, dependency-aware tasks for complex features (optional)

🎨 **builder** - Handles UI/UX design and frontend development within constraints

🚀 **deployer** - Gets features safely to production and maintains system reliability

## Real Results

**Finance Dashboard**: "Users want better financial insights" → Working dashboard with spending breakdown in 1.5 weeks (AI-accelerated)

**User Onboarding**: "Reduce new user confusion" → Progressive onboarding flow reducing churn 67% in 1 week (AI-accelerated)

## Documentation

- **Getting Started**: Your first ADCE cycle
- **Complete Methodology**: Full framework documentation
- **Real Examples**: Complete workflow walkthroughs
- **Agent Specifications**: Detailed agent docs

## Requirements

- Claude Code (latest version)
- Node.js 18+
- Git

## Community

- **GitHub Discussions**: Framework Q&A
- **Discord Server**: Real-time help and community

## Contributing

We welcome contributions! See CONTRIBUTING.md for guidelines.

## License

MIT License - see LICENSE for details.

---

**Turn your broad ideas into working software with predictable timeframes.**
