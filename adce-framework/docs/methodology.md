# ADCE Methodology - Complete Guide

**Appetite-Driven Context Engineering (ADCE)** is a systematic approach to AI-assisted software development that combines Shape Up principles, context engineering, and specialized AI agents with dramatically compressed development cycles.

## Core Philosophy

**Problem**: Traditional AI development suffers from vague prompts, endless iteration, and inconsistent results.

**Solution**: Systematic refinement through appetite constraints, context engineering, and specialized agents.

## The Three Pillars

### 1. Appetite-Driven Development (Shape Up)
- **Fixed time, flexible scope** - Set time budgets, adjust features
- **Circuit breakers** - Cut scope when complexity threatens deadlines
- **Hill charts** - Track progress through problem-solving vs. execution phases

### 2. Context Engineering (PRP Method)
- **Comprehensive context** - Provide everything AI needs for first-pass success
- **Known gotchas** - Include critical implementation details
- **Validation frameworks** - Define concrete success criteria

### 3. Specialized Agents (Subagents)
- **Domain expertise** - Each agent specializes in specific responsibilities
- **Consistent methodology** - All agents understand appetite and context principles
- **Collaborative workflow** - Agents work together through structured handoffs

## AI-Acceleration Benefits

**Traditional Timeline vs. AI-Accelerated:**
- **Pitch Creation**: 2 days → Hours to 1 day (5-10x faster)
- **Architecture Review**: 1 day → Hours to same day (3-5x faster)
- **Implementation**: Weeks → Days to weeks (3-5x faster)
- **First-Pass Success**: 40-60% → 80-95% with proper context engineering

**Compressed Appetite Ranges:**
- **Micro Features**: 1-3 days (simple CRUD, UI components, bug fixes)
- **Small Features**: 3-5 days (workflows, integrations, moderate complexity)
- **Medium Features**: 1-2 weeks (complex features, multi-component systems)
- **Large Features**: 2-3 weeks (major features, architectural changes)

## The ADCE Workflow

### Phase 1: Shaping (Hours to 1 day)
**Goal**: Transform broad ideas into appetite-bounded pitches

**Process**:
1. **Problem Definition**: Specific user pain with concrete examples
2. **Appetite Setting**: How much time is this problem worth? (1-6 weeks)
3. **Solution Sketching**: Rough wireframes and user flows
4. **Boundary Setting**: What we're building vs. what we're not
5. **Context Package**: All information needed for implementation

**Output**: Complete pitch document with context for implementation

**Agent**: `shaper` - Turns broad ideas into structured pitches

### Phase 2: Architecture Review (Hours to same day)
**Goal**: Assess technical feasibility and create implementation PRPs with AI acceleration

**Process**:
1. **Feasibility Assessment**: Can this be built in AI-accelerated appetite?
2. **Risk Identification**: What technical unknowns exist with current context?
3. **PRP Creation**: Break pitch into 2-4 focused implementation units optimized for AI agents
4. **Circuit Breaker Planning**: Define scope reduction options with faster thresholds

**Output**: Technical assessment and implementation PRPs

**Agent**: `architect` - Technical leadership and scope management

### Phase 3: Task Planning (1-2 hours per PRP) - OPTIONAL
**Goal**: Break PRPs into specific, sequential, dependency-aware implementation tasks

**When to use**:
- Complex features (1-2 week or 2-3 week appetite)
- Features with many integration points or dependencies
- Work involving multiple developers or AI sessions
- High-risk technical work requiring systematic execution
- Onboarding new team members to the codebase

**When to skip**:
- Simple features (1-3 day appetite, straightforward implementation)
- Well-understood patterns (e.g., another CRUD endpoint)
- Solo developer comfortable working from PRPs directly
- Emergency fixes requiring immediate action

**Process**:
1. **Task Decomposition**: Break PRP goal into 5-15 specific, actionable tasks (1-4 hours each)
2. **Dependency Mapping**: Identify which tasks depend on others, create dependency graph
3. **Time Allocation**: Estimate realistic time per task, ensure total ≤ appetite
4. **Verification Planning**: Define concrete pass/fail criteria for each task
5. **Circuit Breaker Preparation**: Mark tasks as P1 (must have), P2 (should have), P3 (nice to have)

**Output**: Task plan with specific execution steps, dependency graph, time estimates, and verification criteria

**Agent**: `planner` - Transforms PRPs into granular, executable task breakdowns

**Benefits**:
- **Systematic execution**: Clear step-by-step path from start to finish
- **Better AI results**: Specific tasks → specific prompts → better code
- **Parallel work**: Multiple developers can work on independent tasks
- **Progress tracking**: Know exactly where you are (7/12 tasks = 58% done)
- **Early risk detection**: If Task 3 takes 2x estimate, trigger circuit breaker
- **Clearer handoffs**: Easy to delegate or resume work later

### Phase 4: Implementation (Within AI-Accelerated Appetite)
**Goal**: Build features within compressed appetite constraints using AI-first development

**Process**:
1. **PRP or Task Execution**: Implement using comprehensive context (from PRPs or task plans)
2. **Progress Tracking**: Hill charts for PRPs, or task completion for task plans
3. **Circuit Breakers**: Cut scope when appetite threatened (easier with task plans)
4. **Continuous Validation**: Prove it works at each step

**Output**: Working software that delivers user value

**Agents**: `builder` (UI/frontend) and `deployer` (infrastructure/backend)

**With Task Planning**: Execute tasks sequentially based on dependencies, mark complete with verification
**Without Task Planning**: Work from PRP directly, track progress via hill chart

### Phase 5: Integration & Validation
**Goal**: Ensure everything works together and delivers promised value

**Process**:
1. **Integration Testing**: Components work together correctly
2. **User Acceptance**: Delivers promised user value
3. **Performance Validation**: Meets basic performance requirements
4. **Deployment**: Gets to users safely

## Key Principles

### Appetite Management
- **Time boxes are sacred** - Fixed time, flexible scope
- **Circuit breakers activate early** - Cut features, not deadlines  
- **"Good enough" trumps "perfect"** - Ship working solutions
- **User value first** - Technical elegance is secondary

### Context Engineering
- **Front-load context** - Provide comprehensive information upfront
- **Include gotchas** - Share known implementation challenges
- **Reference patterns** - Show existing code examples to follow
- **Validate assumptions** - Test that context actually works

### Agent Coordination
- **Single responsibility** - Each agent has clear, non-overlapping role
- **Structured handoffs** - Clear deliverables between agents
- **Collaborative decisions** - Agents can consult each other when needed
- **Quality gates** - Each agent validates their work before handoff

## Implementation Patterns

### Problem Requirements Prompts (PRPs)
Each PRP includes:

```markdown
## Goal
[Specific implementable objective]

## Appetite Constraint  
[Time allocation with clear boundary]

## All Needed Context
- Documentation links with why each matters
- Existing code patterns to follow
- Known gotchas that break implementation
- Validation criteria that prove success

## Circuit Breakers
[What to cut if complexity grows]
```

### Hill Chart Progress
- **0-33%**: Problem solving (figuring out approach)
- **34-66%**: Solution building (executing with clear direction)
- **67-100%**: Finishing up (validation, integration, polish)

### Circuit Breaker Decision Tree
1. **First to cut**: Polish and nice-to-have features
2. **Next to cut**: Advanced functionality for power users
3. **Last resort**: Simplify core user workflow (but preserve value)
4. **Never cut**: Data safety, security basics, core user value

## Success Metrics

### Development Velocity
- **Time to first working version** - How quickly can we validate ideas?
- **Appetite adherence** - Percentage of cycles completed on time
- **Scope discipline** - How often do we cut scope vs. extend time?

### Quality & User Value
- **First-pass success rate** - AI implementation success with PRPs
- **User adoption** - Do shipped features get used?
- **Technical debt** - Are we building sustainable solutions?

### Team Effectiveness  
- **Context reuse** - Can we leverage patterns across projects?
- **Agent specialization** - Are agents becoming more effective over time?
- **Methodology refinement** - How is our process improving?

## Common Patterns

### Feature Development
1. **Shaper**: "Users can't see their spending patterns" → Complete pitch with 4-week appetite
2. **Architect**: Technical assessment → 4 PRPs (API, UI components, integration, deployment)
3. **Builder**: Implement UI components with responsive design
4. **Deployer**: Set up data pipeline and production deployment
5. **Integration**: All components work together, user value delivered

### Bug Investigation
1. **Architect**: Analyze bug reports → Root cause investigation PRP
2. **Builder/Deployer**: Implement fix using comprehensive context
3. **Validation**: Prove fix works without breaking existing functionality

### Technical Debt
1. **Architect**: Assess technical debt → Refactoring pitch with appetite
2. **Shaper**: (if needed) Frame as user problem with business value
3. **Implementation**: Systematic improvements within time constraints

## Anti-Patterns to Avoid

### Scope Creep
- **Symptom**: "While we're at it, let's also..."  
- **Prevention**: Strict appetite discipline, circuit breakers
- **Recovery**: Cut additions, focus on original user value

### Context Starvation
- **Symptom**: AI agents need repeated clarification
- **Prevention**: Front-load comprehensive context in PRPs
- **Recovery**: Pause implementation, gather needed context

### Perfect Implementation
- **Symptom**: Spending appetite time on polish vs. core functionality
- **Prevention**: "Good enough" mindset, user value focus
- **Recovery**: Circuit breaker activation, scope reduction

### Agent Confusion
- **Symptom**: Unclear which agent should handle specific work
- **Prevention**: Clear agent descriptions, structured handoffs
- **Recovery**: Explicit agent selection, role clarification

## Advanced Techniques

### Multi-Cycle Features
For features requiring more than 6 weeks:
1. **Break into separate appetites** - Each cycle delivers user value
2. **Progressive enhancement** - Build foundational value first
3. **User feedback loops** - Validate before building more complexity

### Cross-Team Coordination  
When multiple teams use ADCE:
1. **Shared context libraries** - Reuse PRPs and patterns across teams
2. **Agent customization** - Adapt agents for domain-specific needs
3. **Methodology refinement** - Share learnings and improvements

### Legacy Integration
When working with existing codebases:
1. **Pattern identification** - Document existing approaches to follow
2. **Gradual adoption** - Start with new features, expand to refactoring
3. **Context archaeology** - Discover and document tribal knowledge

---

This methodology transforms how teams build software with AI assistance, enabling predictable delivery of user value within fixed time constraints.

## Next Steps

- **Try the methodology**: Start with [getting started guide](./getting-started.md)
- **See examples**: Review complete workflows in [examples](../examples/)
- **Join community**: Share experiences and learn from others
- **Contribute**: Help improve the framework and methodology