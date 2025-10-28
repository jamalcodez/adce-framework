# Task Breakdown Example - Expense Tracking API

This example demonstrates how to use the **planner** agent to break down a Product Requirement Prompt (PRP) into specific, dependency-aware implementation tasks.

## Scenario

You have a PRP for building an expense tracking API (from the larger user dashboard project). The PRP is comprehensive but still high-level. You need granular, sequential tasks to execute systematically.

## Workflow Demonstrated

```
PRP (High-level goal) → Planner Agent → Task Plan (5-15 specific tasks)
```

## Files in This Example

1. **`prp-expense-api.md`** - The original PRP from architect
   - High-level goal and context
   - Success criteria and appetite
   - Still conceptual ("build API endpoints")

2. **`task-plan-expense-api.md`** - The task plan created by planner
   - 12 specific, sequential tasks
   - Dependency graph showing relationships
   - Time estimates and verification criteria
   - Circuit breaker plan

3. **`implementation-log.md`** - Execution notes
   - Which tasks were completed
   - Time tracking (estimate vs. actual)
   - Circuit breaker decision made at 75% time
   - What got cut and why

## Key Learnings

### What Task Planning Provides

**Before (PRP only)**:
- "Build expense tracking API with CRUD operations"
- Unclear where to start
- Hard to track progress
- Difficult to parallelize work

**After (Task Plan)**:
- Task 1: Create database schema
- Task 2: Write migration script
- Task 3: Create Expense model
- Task 4: Implement POST /expenses endpoint
- ...and 8 more specific tasks

### Benefits Demonstrated

1. **Clear Dependencies**: Can't build API endpoints (Task 4) before creating model (Task 3)
2. **Parallel Opportunities**: UI work (separate tasks) can happen while API is being built
3. **Progress Tracking**: 7/12 tasks complete = 58% done (vs. "mostly done?")
4. **Risk Detection**: Task 3 took 2x estimate → triggered appetite review
5. **Circuit Breaker**: At 75% time, cut Task 11 (advanced filtering) to meet deadline

### When This Approach Shines

- **Complex features**: Multiple integration points, many dependencies
- **Team coordination**: Multiple developers working in parallel
- **New codebases**: Team unfamiliar with existing patterns
- **High stakes**: Production systems where mistakes are costly

### When to Skip It

- **Simple features**: Single CRUD endpoint, well-understood pattern
- **Solo + experienced**: Developer knows codebase and prefers working from PRPs
- **Time pressure**: Emergency fix needs immediate action

## How to Use This Example

### Step 1: Review the PRP
Read `prp-expense-api.md` to understand the high-level goal and constraints.

### Step 2: See the Task Breakdown
Read `task-plan-expense-api.md` to see how the planner agent transformed the PRP into 12 specific tasks with:
- Clear dependencies
- Time estimates
- Verification criteria
- Risk management

### Step 3: Study the Execution
Read `implementation-log.md` to see:
- How tasks were completed sequentially
- Where estimates were wrong (and why)
- When circuit breaker was triggered
- Impact of scope reduction

### Step 4: Apply to Your Work

When you have a complex PRP:

```bash
# In Claude Code, with ADCE agents installed
"Use planner to break down the [PRP name] into specific implementation tasks"
```

The planner will:
1. Read your PRP
2. Identify logical work chunks
3. Sequence them by dependencies
4. Add time estimates and verification
5. Create a task plan document

## Prompt Examples

### Creating the Task Plan
```
"Use planner to break down the Expense API PRP into specific implementation tasks"
```

### Executing Tasks
```
"Let's implement Task 1 from the expense API task plan: Create database schema for expenses table"

"Now implement Task 2: Write migration script (depends on Task 1)"
```

### Tracking Progress
```
"Update the task plan - Task 1 complete (took 2 hours, estimated 2-3h).
Moving to Task 2."
```

### Triggering Circuit Breaker
```
"We're at 75% of appetite (5.5/7 days) with only 6/12 tasks complete.
Use planner to update task plan with circuit breaker actions - cut P3 tasks."
```

## Comparison: With vs. Without Task Planning

### Without Task Planning (PRP → Code)
```
Day 1: "Start building expense API..." (vague, unclear progress)
Day 2: "Working on database and endpoints..." (still vague)
Day 3: "Almost done, just need to finish..." (famous last words)
Day 4: "Found issues, need more time..." (appetite exceeded)
```

### With Task Planning (PRP → Tasks → Code)
```
Day 1: ✅ Task 1, 2, 3 complete (DB schema, migration, model) - 3/12 done
Day 2: ✅ Task 4, 5 complete (POST, GET endpoints) - 5/12 done
Day 3: ✅ Task 6, 7, 8 complete (PUT, DELETE, validation) - 8/12 done
Day 3.5: ⚠️ 75% time used, 8/12 done → Cut Tasks 11, 12 (nice-to-haves)
Day 4: ✅ Task 9, 10 complete (testing, docs) - Core value delivered!
```

## Metrics from This Example

- **Tasks planned**: 12
- **Tasks completed**: 10
- **Tasks cut**: 2 (at 75% time checkpoint)
- **Appetite**: 1 week
- **Actual time**: 4.5 days (90% of appetite)
- **Core value delivered**: ✅ Yes
- **Estimates accuracy**: 80% (2 tasks took longer, 3 tasks faster)

## Next Steps

After reviewing this example:

1. Install the planner agent in your project
2. Try it on your next complex PRP
3. Track actual vs. estimated times to improve future planning
4. Share learnings with your team

For more examples:
- `/examples/user-dashboard/` - Full ADCE workflow without task planning
- `/examples/user-onboarding/` - Medium complexity feature
- `/examples/api-integration/` - High-risk technical work
