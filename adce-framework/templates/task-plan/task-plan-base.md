# Task Plan: [Feature Name]

## PRP Reference
**Source PRP**: [Link or file path to the PRP this implements]
**Goal**: [One-sentence summary of what this accomplishes]
**Appetite**: [Time budget from PRP - e.g., "3 days maximum", "1.5 weeks maximum"]

## Overview

**Total Tasks**: [Number] tasks
**Estimated Time**: [Sum of all task estimates] hours ([X] days)
**Complexity**: [Low/Medium/High]
**Parallel Opportunities**: [Number] tasks can run concurrently

### Dependency Graph
```
[Visual representation of task dependencies using ASCII art]

Example:
Task 1 (Foundation)
  ├─→ Task 2 (Core Logic) ──→ Task 5 (Integration)
  │     └─→ Task 4 (API)   ──→ Task 6 (Testing)
  └─→ Task 3 (UI Layer)    ──→ Task 7 (Polish)

Legend:
→ = Dependency (must complete before)
├ = Branches (parallel work possible)
```

### Critical Path
[Identify the longest sequence of dependent tasks]
- Task 1 → Task 2 → Task 5 → Task 6 → [Duration: X hours]
- **Bottleneck**: Task 2 (highest risk/longest duration)

---

## Task Breakdown

### Task 1: [Specific action with concrete outcome]

- **Priority**: P1 (Must Have) / P2 (Should Have) / P3 (Nice to Have)
- **Depends on**: None / Task X, Task Y
- **Enables**: Task X, Task Y, Task Z
- **Estimated time**: [X-Y hours]
- **Complexity**: Low / Medium / High

**Description**:
[2-3 sentence description of what this task accomplishes and why it's needed]

**Output/Deliverables**:
- [Specific file, feature, or component created]
- [Concrete functionality implemented]
- [Tests or documentation produced]

**Files to Create/Modify**:
- Create: `path/to/new/file.js`
- Modify: `path/to/existing/file.js` (add function X, update class Y)
- Create: `tests/path/to/test.test.js`

**Implementation Details**:
```
[Code snippet, API endpoint spec, or pseudocode showing what to build]

Example:
- Function signature: `async function getUserById(userId)`
- Returns: `{ id, name, email, createdAt }`
- Error handling: Throw 404 if user not found
```

**Verification Criteria**:
- [ ] [Specific test that must pass]
- [ ] [Integration check that proves it works]
- [ ] [Manual verification step if applicable]
- [ ] [Performance or quality benchmark if relevant]

**Context & Gotchas**:
- [Important implementation detail to remember]
- [Known pitfall to avoid]
- [External dependency or API quirk]

**Appetite Risk**: Low / Medium / High
**Risk Factors**: [What could make this take longer than estimated]

**Circuit Breaker Plan**:
If this task exceeds [X hours] or hits complexity:
- **Simplify to**: [Reduced scope version]
- **Alternative approach**: [Simpler way to deliver core value]
- **Impact of cutting**: [What user value is lost]

---

### Task 2: [Specific action with concrete outcome]

[Repeat the above structure for each task]

---

### Task 3: [Specific action with concrete outcome]

[Continue for all tasks...]

---

## Progress Tracking

### Task Checklist
- [ ] Task 1: [Task name] - Est: X hrs - Status: Not Started / In Progress / Complete
- [ ] Task 2: [Task name] - Est: Y hrs - Status: Not Started / In Progress / Complete
- [ ] Task 3: [Task name] - Est: Z hrs - Status: Not Started / In Progress / Complete
[Continue for all tasks...]

### Time Budget Status
- **Total Budget**: [X hours from appetite]
- **Committed Time**: [Sum of estimates] hours
- **Buffer**: [Budget - Committed] hours ([X]% buffer)
- **Consumed**: [Actual time spent] hours
- **Remaining**: [Budget - Consumed] hours

### Circuit Breaker Thresholds
- ⚠️ **50% Time Warning**: At [X hours], should have [Y] tasks complete
- ⚠️ **75% Time Warning**: At [Z hours], should have [W] tasks complete
- 🚨 **90% Time Critical**: At [A hours], must cut P3 tasks if not [B]% complete

### Current Status
- **Progress**: [X/Total] tasks complete ([Y]%)
- **Time Used**: [Z] hours ([W]% of budget)
- **On Track**: Yes / No / At Risk
- **Circuit Breaker Status**: Green / Yellow / Red

---

## Parallel Work Opportunities

### Concurrent Task Groups
**Group 1** (can work simultaneously after Task 1 completes):
- Task 2: [Description]
- Task 3: [Description]

**Group 2** (can work simultaneously after Task 2 and Task 3 complete):
- Task 4: [Description]
- Task 5: [Description]

### Developer Allocation
If multiple developers or AI sessions:
- **Developer A / Session 1**: Tasks 1 → 2 → 5 → 6
- **Developer B / Session 2**: Tasks 3 → 4 → 7

---

## Implementation Strategy

### Phase 1: Foundation ([X]% of time)
Tasks: [List foundational tasks]
- Build core data structures
- Set up infrastructure
- Create base components

### Phase 2: Core Functionality ([Y]% of time)
Tasks: [List core feature tasks]
- Implement main user workflow
- Build critical business logic
- Integrate components

### Phase 3: Integration & Testing ([Z]% of time)
Tasks: [List integration tasks]
- Connect all components
- Run integration tests
- Validate user acceptance criteria

### Phase 4: Polish & Deploy ([W]% of time)
Tasks: [List finishing tasks]
- UI polish and edge cases
- Performance optimization
- Production deployment

---

## Risk Management

### High-Risk Tasks
1. **Task X**: [Why it's risky]
   - **Mitigation**: [How to reduce risk]
   - **Contingency**: [What to do if it fails]

2. **Task Y**: [Why it's risky]
   - **Mitigation**: [How to reduce risk]
   - **Contingency**: [What to do if it fails]

### Unknown Complexity Areas
- [Area where time estimate is uncertain]
  - **Spike plan**: Timebox investigation to [X hours]
  - **Decision point**: Continue or pivot after spike

### External Dependencies
- [Third-party API, library, or service this depends on]
  - **Risk**: [What could go wrong]
  - **Backup plan**: [Alternative approach]

---

## Circuit Breaker Execution Plan

### If at 50% time with <40% tasks complete:
**Actions**:
1. Simplify remaining P2 and P3 tasks
2. Review all estimates and cut buffer time
3. Focus only on critical path tasks

**Tasks to Simplify**:
- Task X: [Reduced scope version]
- Task Y: [Simpler alternative]

### If at 75% time with <60% tasks complete:
**Actions**:
1. **Cut all P3 tasks immediately**
2. Simplify P2 tasks to bare minimum
3. Alert stakeholders about scope reduction

**Tasks to Cut**:
- Task X: [Impact of cutting]
- Task Y: [Impact of cutting]

### If at 90% time with <80% tasks complete:
**Actions**:
1. **Emergency scope reduction**
2. Cut even P2 tasks if needed
3. Ship minimum viable version

**Minimum Viable Scope**:
- Keep: [Core P1 tasks that deliver user value]
- Cut: [Everything else]
- Impact: [What users won't get]

---

## Success Criteria

### Must Achieve (P1 - Cannot ship without)
- [ ] [Core user workflow works end-to-end]
- [ ] [Critical business logic is correct]
- [ ] [Data safety and security requirements met]
- [ ] [System stability under normal load]

### Should Achieve (P2 - Important but can simplify)
- [ ] [Enhanced user experience feature]
- [ ] [Performance optimization]
- [ ] [Additional validation or error handling]

### Nice to Achieve (P3 - Polish, first to cut)
- [ ] [UI polish and micro-interactions]
- [ ] [Advanced edge case handling]
- [ ] [Optional convenience features]

---

## Validation & Testing

### Unit Testing
- Task X requires: [Specific unit tests]
- Task Y requires: [Specific unit tests]
- Coverage target: [X]%

### Integration Testing
- [ ] [End-to-end user workflow test]
- [ ] [API integration test]
- [ ] [Database integration test]

### User Acceptance Testing
- [ ] [Manual test scenario 1]
- [ ] [Manual test scenario 2]
- [ ] [Performance benchmark check]

### Quality Gates
Before marking plan complete:
- [ ] All P1 tasks verified complete
- [ ] Integration tests passing
- [ ] User acceptance criteria met
- [ ] No critical bugs or blockers

---

## Notes & Learnings

### Implementation Notes
[Track key decisions, deviations from plan, and lessons learned during execution]

### Time Tracking
[Record actual time spent vs. estimates to improve future planning]

| Task | Estimated | Actual | Variance | Notes |
|------|-----------|--------|----------|-------|
| Task 1 | 2h | 2.5h | +25% | [Reason for difference] |
| Task 2 | 3h | 2h | -33% | [Reason for difference] |

### What Went Well
- [Things that worked better than expected]
- [AI acceleration wins]
- [Good planning decisions]

### What Could Improve
- [Estimation misses and why]
- [Unexpected complexity sources]
- [Process improvements for next time]

### Circuit Breaker Decisions Made
- [What got cut and when]
- [Impact on user value]
- [Lessons for future appetite setting]

---

## Completion Status

- **Start Date**: [Date]
- **Target End Date**: [Date based on appetite]
- **Actual End Date**: [Date]
- **Final Status**: Complete / Partially Complete / Scope Reduced
- **User Value Delivered**: [Assessment of whether core value was achieved]
- **Lessons Learned**: [Key takeaways for next cycle]
