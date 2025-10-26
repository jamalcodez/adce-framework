# Task Plan: Expense Tracking API

## PRP Reference
**Source PRP**: `prp-expense-api.md`
**Goal**: Build RESTful API for expense tracking with CRUD operations, validation, and proper authentication
**Appetite**: 1 week maximum (5 working days, ~40 hours)

## Overview

**Total Tasks**: 12 tasks
**Estimated Time**: 36-40 hours (90-100% of appetite budget)
**Complexity**: Medium
**Parallel Opportunities**: 3 tasks can run concurrently with proper coordination

### Dependency Graph
```
Task 1 (Schema Design)
  └─→ Task 2 (Migration Script)
        └─→ Task 3 (Sequelize Model)
              ├─→ Task 4 (POST endpoint) ──→ Task 8 (Integration Tests)
              ├─→ Task 5 (GET endpoint)  ──→ Task 9 (Auth Testing)
              ├─→ Task 6 (PUT endpoint)  ──→ Task 10 (Validation Tests)
              └─→ Task 7 (DELETE endpoint)
                    └─→ Task 11 (Documentation) ── Task 12 (Deployment Prep)

Parallel Opportunity: Tasks 4, 5, 6, 7 can be worked on simultaneously after Task 3
```

### Critical Path
Task 1 → Task 2 → Task 3 → Task 4 → Task 8 → Task 11 → Task 12
**Duration**: 24-27 hours (60-68% of budget)
**Bottleneck**: Task 3 (Model creation with validations - highest complexity)

---

## Task Breakdown

### Task 1: Design Database Schema for Expenses Table

- **Priority**: P1 (Must Have)
- **Depends on**: None (foundational task)
- **Enables**: Task 2 (Migration)
- **Estimated time**: 2-3 hours
- **Complexity**: Low

**Description**:
Design the PostgreSQL schema for the expenses table including columns, data types, constraints, and indexes. This is the foundation for all data operations.

**Output/Deliverables**:
- Schema design document or SQL DDL
- Column definitions with data types
- Constraint definitions (NOT NULL, CHECK, etc.)
- Index strategy for performance

**Files to Create/Modify**:
- Create: `docs/schema/expenses-table.sql` (design reference)
- Document: Schema decisions and rationale

**Implementation Details**:
```sql
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  category VARCHAR(50) NOT NULL CHECK (category IN ('groceries', 'transport', 'utilities', 'entertainment', 'other')),
  date DATE NOT NULL CHECK (date <= CURRENT_DATE),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_date ON expenses(date);
CREATE INDEX idx_expenses_user_date ON expenses(user_id, date);
```

**Verification Criteria**:
- [ ] Schema includes all required fields (user_id, amount, category, date, description)
- [ ] Constraints enforce business rules (positive amount, valid category, non-future date)
- [ ] Indexes defined for userId and date columns
- [ ] Foreign key relationship to users table defined
- [ ] Schema reviewed against PRP requirements

**Context & Gotchas**:
- **CRITICAL**: Must include `user_id` foreign key to scope expenses to users
- **PERFORMANCE**: Index on `user_id` + `date` for common query pattern
- Use DECIMAL for amount (not FLOAT) to avoid rounding errors
- Category CHECK constraint prevents invalid values at database level

**Appetite Risk**: Low
**Risk Factors**: Well-understood task, standard table design

**Circuit Breaker Plan**:
If exceeds 3 hours:
- **Simplify to**: Basic columns without CHECK constraints (validate in app layer)
- **Alternative**: Copy users table pattern exactly
- **Impact**: Minimal - can add constraints later via migration

---

### Task 2: Write Database Migration Script

- **Priority**: P1 (Must Have)
- **Depends on**: Task 1 (Schema design complete)
- **Enables**: Task 3 (Model creation)
- **Estimated time**: 1-2 hours
- **Complexity**: Low

**Description**:
Create a Sequelize migration file that implements the expense table schema designed in Task 1. Includes up/down methods for deployment and rollback.

**Output/Deliverables**:
- Migration file following Sequelize conventions
- Both `up` (create table) and `down` (drop table) methods
- Successfully runs against development database

**Files to Create/Modify**:
- Create: `src/migrations/YYYYMMDDHHMMSS-create-expenses-table.js`

**Implementation Details**:
```javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expenses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      category: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Add indexes
    await queryInterface.addIndex('expenses', ['user_id']);
    await queryInterface.addIndex('expenses', ['date']);
    await queryInterface.addIndex('expenses', ['user_id', 'date']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('expenses');
  }
};
```

**Verification Criteria**:
- [ ] Migration runs successfully with `sequelize db:migrate`
- [ ] Table created with correct columns and types
- [ ] Indexes created successfully
- [ ] Rollback works with `sequelize db:migrate:undo`
- [ ] No errors in migration logs

**Context & Gotchas**:
- Follow existing migration pattern in `src/migrations/`
- Use `DATEONLY` for date field (not TIMESTAMP)
- **GOTCHA**: Sequelize doesn't support CHECK constraints directly - will validate in model instead

**Appetite Risk**: Low
**Risk Factors**: Straightforward migration, minimal complexity

**Circuit Breaker Plan**:
If exceeds 2 hours:
- **Simplify to**: Skip indexes initially (add later)
- **Alternative**: Use raw SQL instead of Sequelize methods
- **Impact**: None for basic functionality

---

### Task 3: Create Expense Sequelize Model with Validations

- **Priority**: P1 (Must Have)
- **Depends on**: Task 2 (Migration complete, table exists)
- **Enables**: Tasks 4, 5, 6, 7 (All CRUD endpoints)
- **Estimated time**: 3-4 hours
- **Complexity**: Medium

**Description**:
Create the Sequelize model for Expense with comprehensive validations, associations to User model, and helper methods. This is a critical task that enables all API endpoints.

**Output/Deliverables**:
- Expense model file with validations
- Association to User model (belongsTo)
- Instance methods if needed
- Model can be imported and used in routes

**Files to Create/Modify**:
- Create: `src/models/Expense.js`
- Modify: `src/models/index.js` (register model)
- Modify: `src/models/User.js` (add hasMany association)

**Implementation Details**:
```javascript
// src/models/Expense.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Expense = sequelize.define('Expense', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.01,
        max: 9999999.99,
        isValidAmount(value) {
          if (!/^\d+(\.\d{1,2})?$/.test(value)) {
            throw new Error('Amount must have max 2 decimal places');
          }
        }
      }
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [['groceries', 'transport', 'utilities', 'entertainment', 'other']]
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        notInFuture(value) {
          if (new Date(value) > new Date()) {
            throw new Error('Date cannot be in the future');
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 500] // Max 500 characters
      }
    }
  }, {
    tableName: 'expenses',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Expense.associate = (models) => {
    Expense.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Expense;
};
```

**Verification Criteria**:
- [ ] Model instantiates without errors
- [ ] Validation test: Valid expense passes all validations
- [ ] Validation test: Negative amount throws error
- [ ] Validation test: Invalid category throws error
- [ ] Validation test: Future date throws error
- [ ] Validation test: Amount with >2 decimals throws error
- [ ] Association to User model works (can access expense.user)
- [ ] Can create and save expense to database

**Context & Gotchas**:
- **CRITICAL**: Use `userId` from JWT token when creating expenses (never client input)
- **VALIDATION**: All validation rules from PRP must be enforced here
- **SECURITY**: Sanitize description field to prevent XSS (use validator library)
- Follow User model pattern in `src/models/User.js` for consistency

**Appetite Risk**: Medium (highest complexity so far)
**Risk Factors**:
- Complex validation logic
- Testing all validation scenarios
- Getting decimal validation exactly right

**Circuit Breaker Plan**:
If exceeds 4 hours:
- **Simplify to**: Basic validations only (amount > 0, category in list, date not null)
- **Cut**: Custom validation messages, advanced decimal validation
- **Impact**: Less user-friendly errors, some edge cases not caught

---

### Task 4: Implement POST /api/expenses Endpoint

- **Priority**: P1 (Must Have)
- **Depends on**: Task 3 (Model ready)
- **Enables**: Task 8 (Integration tests)
- **Estimated time**: 2-3 hours
- **Complexity**: Medium

**Description**:
Create the POST endpoint for creating new expenses. Includes authentication, input validation, and proper error handling following existing API patterns.

**Output/Deliverables**:
- POST /api/expenses route handler
- Input validation middleware
- Authentication middleware applied
- Error handling for validation failures
- Returns 201 Created with expense data

**Files to Create/Modify**:
- Create: `src/routes/expenses.js`
- Create: `src/controllers/expenseController.js`
- Modify: `src/app.js` (register expenses routes)

**Implementation Details**:
```javascript
// src/controllers/expenseController.js
const { Expense } = require('../models');

exports.createExpense = async (req, res, next) => {
  try {
    const { amount, category, date, description } = req.body;
    const userId = req.user.id; // From JWT auth middleware

    const expense = await Expense.create({
      userId,
      amount,
      category,
      date,
      description
    });

    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        error: error.errors.map(e => e.message)
      });
    }
    next(error);
  }
};

// src/routes/expenses.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { createExpense } = require('../controllers/expenseController');

router.post('/', authenticate, createExpense);

module.exports = router;
```

**Verification Criteria**:
- [ ] POST request with valid data creates expense (returns 201)
- [ ] Created expense has correct userId from JWT token
- [ ] Invalid data returns 400 with validation errors
- [ ] Missing auth token returns 401 Unauthorized
- [ ] Response format matches API conventions
- [ ] Database record actually created (check with DB query)

**Context & Gotchas**:
- **CRITICAL**: Use `req.user.id` from auth middleware, NEVER `req.body.userId`
- **SECURITY**: Sanitize description field before saving
- Follow error handling pattern in `src/middleware/errorHandler.js`
- Use existing authentication middleware from `src/middleware/auth.js`

**Appetite Risk**: Medium
**Risk Factors**: Getting error handling right, testing auth flows

**Circuit Breaker Plan**:
If exceeds 3 hours:
- **Simplify to**: Basic error handling only (no custom validation messages)
- **Cut**: Input sanitization (add post-launch)
- **Impact**: Less secure, less user-friendly errors

---

### Task 5: Implement GET /api/expenses Endpoint with Filtering

- **Priority**: P1 (Must Have)
- **Depends on**: Task 3 (Model ready)
- **Enables**: Task 8 (Integration tests)
- **Estimated time**: 3-4 hours
- **Complexity**: Medium

**Description**:
Create GET endpoint that returns authenticated user's expenses with optional date range filtering. Must be scoped to user's expenses only.

**Output/Deliverables**:
- GET /api/expenses route handler
- Query parameter parsing for date filtering (startDate, endDate)
- Returns expenses scoped to authenticated user
- Proper error handling and validation

**Files to Create/Modify**:
- Modify: `src/controllers/expenseController.js` (add getExpenses function)
- Modify: `src/routes/expenses.js` (add GET route)

**Implementation Details**:
```javascript
exports.getExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    const where = { userId };

    // Add date filtering if provided
    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date[Op.gte] = startDate;
      }
      if (endDate) {
        where.date[Op.lte] = endDate;
      }
    }

    const expenses = await Expense.findAll({
      where,
      order: [['date', 'DESC'], ['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    next(error);
  }
};

// Route
router.get('/', authenticate, getExpenses);
```

**Verification Criteria**:
- [ ] GET without filters returns all user's expenses
- [ ] GET with startDate filters correctly
- [ ] GET with endDate filters correctly
- [ ] GET with both dates returns correct range
- [ ] User only sees their own expenses (never other users')
- [ ] Results ordered by date descending
- [ ] Invalid date format returns 400 error
- [ ] Missing auth returns 401

**Context & Gotchas**:
- **CRITICAL**: Always filter by userId - NEVER show other users' expenses
- **PERFORMANCE**: Use indexed columns (userId, date) for filtering
- Validate date format before querying (use date validation library)
- Consider adding pagination if dataset grows (not P1, but document as future enhancement)

**Appetite Risk**: Medium
**Risk Factors**:
- Date filtering logic complexity
- Testing various filter combinations
- Edge cases (invalid dates, future dates, etc.)

**Circuit Breaker Plan**:
If exceeds 4 hours:
- **Simplify to**: Return all expenses without filtering
- **Cut**: Date range filtering (add post-launch)
- **Impact**: Users can't filter by date (must load all expenses)

---

### Task 6: Implement PUT /api/expenses/:id Endpoint

- **Priority**: P1 (Must Have)
- **Depends on**: Task 3 (Model ready)
- **Enables**: Task 8 (Integration tests)
- **Estimated time**: 2-3 hours
- **Complexity**: Medium

**Description**:
Create PUT endpoint for updating existing expenses. Must verify user owns the expense before allowing update.

**Output/Deliverables**:
- PUT /api/expenses/:id route handler
- Ownership verification (expense.userId === req.user.id)
- Update validation through model
- Returns updated expense data

**Files to Create/Modify**:
- Modify: `src/controllers/expenseController.js` (add updateExpense function)
- Modify: `src/routes/expenses.js` (add PUT route)

**Implementation Details**:
```javascript
exports.updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { amount, category, date, description } = req.body;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    // CRITICAL: Verify ownership
    if (expense.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this expense'
      });
    }

    await expense.update({
      amount,
      category,
      date,
      description
    });

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        error: error.errors.map(e => e.message)
      });
    }
    next(error);
  }
};

router.put('/:id', authenticate, updateExpense);
```

**Verification Criteria**:
- [ ] Valid update modifies expense and returns updated data
- [ ] Update triggers model validations
- [ ] Non-existent ID returns 404
- [ ] User cannot update another user's expense (403 Forbidden)
- [ ] Invalid data returns 400 with errors
- [ ] Missing auth returns 401
- [ ] Updated_at timestamp changes

**Context & Gotchas**:
- **CRITICAL**: Always verify `expense.userId === req.user.id` before updating
- **SECURITY**: Don't allow updating userId (model should not allow it)
- Validate all fields through model validation
- Return 403 Forbidden (not 404) when user doesn't own expense (security best practice)

**Appetite Risk**: Low
**Risk Factors**: Mostly straightforward, follows standard pattern

**Circuit Breaker Plan**:
If exceeds 3 hours:
- **Simplify to**: Allow updating amount only (not all fields)
- **Impact**: Less flexible updates, but core functionality preserved

---

### Task 7: Implement DELETE /api/expenses/:id Endpoint

- **Priority**: P1 (Must Have)
- **Depends on**: Task 3 (Model ready)
- **Enables**: Task 8 (Integration tests)
- **Estimated time**: 1-2 hours
- **Complexity**: Low

**Description**:
Create DELETE endpoint for removing expenses. Must verify ownership before allowing deletion.

**Output/Deliverables**:
- DELETE /api/expenses/:id route handler
- Ownership verification
- Returns success confirmation

**Files to Create/Modify**:
- Modify: `src/controllers/expenseController.js` (add deleteExpense function)
- Modify: `src/routes/expenses.js` (add DELETE route)

**Implementation Details**:
```javascript
exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    if (expense.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this expense'
      });
    }

    await expense.destroy();

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

router.delete('/:id', authenticate, deleteExpense);
```

**Verification Criteria**:
- [ ] Valid delete removes expense from database
- [ ] Non-existent ID returns 404
- [ ] User cannot delete another user's expense (403)
- [ ] Missing auth returns 401
- [ ] Deleted record no longer in database

**Context & Gotchas**:
- **CRITICAL**: Verify ownership before deletion
- Consider soft delete vs. hard delete (use hard delete for now, document for future)
- Follow same auth/ownership pattern as PUT endpoint

**Appetite Risk**: Low
**Risk Factors**: Straightforward implementation

**Circuit Breaker Plan**:
If exceeds 2 hours:
- **Simplify to**: Use raw SQL delete
- **Impact**: None

---

### Task 8: Write Integration Tests for CRUD Operations

- **Priority**: P1 (Must Have)
- **Depends on**: Tasks 4, 5, 6, 7 (All endpoints implemented)
- **Enables**: Task 11 (Documentation)
- **Estimated time**: 4-5 hours
- **Complexity**: Medium

**Description**:
Create comprehensive integration tests covering all CRUD operations, authentication, and authorization scenarios.

**Output/Deliverables**:
- Test file with all endpoint tests
- Test database setup/teardown
- Mock authentication tokens
- All tests passing

**Files to Create/Modify**:
- Create: `tests/integration/expenses.test.js`
- Modify: `tests/setup.js` (add test data helpers)

**Implementation Details**:
```javascript
describe('Expense API Integration Tests', () => {
  let authToken;
  let userId;
  let otherUserToken;

  beforeAll(async () => {
    // Setup test users and auth tokens
  });

  describe('POST /api/expenses', () => {
    test('creates expense with valid data', async () => {
      // Test implementation
    });

    test('returns 400 for invalid amount', async () => {
      // Test implementation
    });

    test('returns 401 without auth token', async () => {
      // Test implementation
    });

    // More tests...
  });

  describe('GET /api/expenses', () => {
    test('returns user expenses only', async () => {
      // Verify scoping to user
    });

    test('filters by date range', async () => {
      // Test filtering
    });

    // More tests...
  });

  // PUT and DELETE tests...
});
```

**Verification Criteria**:
- [ ] All happy path tests pass (create, read, update, delete)
- [ ] Authentication tests pass (401 for missing token)
- [ ] Authorization tests pass (403 for wrong user)
- [ ] Validation tests pass (400 for invalid data)
- [ ] Test coverage >80% for expense routes/controllers
- [ ] Tests run in isolation (no dependencies between tests)

**Context & Gotchas**:
- Use separate test database (configure in test env)
- Clean up test data after each test
- Mock JWT tokens for authentication
- Test both success and failure scenarios

**Appetite Risk**: Medium
**Risk Factors**:
- Setting up test environment
- Creating comprehensive test scenarios
- Debugging failing tests

**Circuit Breaker Plan**:
If exceeds 5 hours:
- **Simplify to**: Happy path tests only
- **Cut**: Edge case testing, validation error scenarios
- **Impact**: Less test coverage, potential bugs in edge cases

---

### Task 9: Add Rate Limiting and Security Middleware

- **Priority**: P2 (Should Have)
- **Depends on**: Tasks 4, 5, 6, 7 (Endpoints exist)
- **Enables**: Task 10 (Validation tests)
- **Estimated time**: 2-3 hours
- **Complexity**: Low

**Description**:
Add rate limiting to prevent abuse and input sanitization for XSS protection.

**Output/Deliverables**:
- Rate limiting middleware (100 requests/hour per user)
- Input sanitization for description field
- Applied to all expense endpoints

**Files to Create/Modify**:
- Create: `src/middleware/rateLimiter.js`
- Modify: `src/routes/expenses.js` (apply middleware)
- Install: express-rate-limit, xss-clean packages

**Verification Criteria**:
- [ ] Rate limit blocks after 100 requests/hour
- [ ] Rate limit returns 429 Too Many Requests
- [ ] XSS attempts in description are sanitized
- [ ] Normal requests not affected

**Appetite Risk**: Low
**Risk Factors**: Well-defined task, libraries handle complexity

**Circuit Breaker Plan**:
If exceeds 3 hours:
- **Cut entirely**: Add post-launch
- **Impact**: Potential abuse, XSS vulnerability (mitigated by frontend validation)

---

### Task 10: Add Input Validation Tests

- **Priority**: P2 (Should Have)
- **Depends on**: Task 8 (Integration tests exist)
- **Enables**: Task 11 (Documentation)
- **Estimated time**: 2-3 hours
- **Complexity**: Low

**Description**:
Comprehensive tests for all validation rules and edge cases.

**Output/Deliverables**:
- Tests for all validation scenarios
- Edge case coverage
- All tests passing

**Verification Criteria**:
- [ ] Test: Amount with 3 decimals rejected
- [ ] Test: Negative amount rejected
- [ ] Test: Invalid category rejected
- [ ] Test: Future date rejected
- [ ] Test: Missing required fields rejected
- [ ] Test: Description >500 chars rejected

**Appetite Risk**: Low
**Circuit Breaker Plan**:
If exceeds 3 hours:
- **Cut**: Document validation rules instead of testing all

---

### Task 11: Write API Documentation

- **Priority**: P2 (Should Have)
- **Depends on**: Tasks 4-7 (All endpoints implemented)
- **Enables**: Task 12 (Deployment)
- **Estimated time**: 2-3 hours
- **Complexity**: Low

**Description**:
Document all API endpoints with request/response examples, authentication requirements, and error codes.

**Output/Deliverables**:
- API documentation in Markdown
- Request/response examples
- Error code reference

**Files to Create/Modify**:
- Create: `docs/api/expenses.md`

**Verification Criteria**:
- [ ] All endpoints documented
- [ ] Examples for all CRUD operations
- [ ] Error codes listed
- [ ] Authentication explained

**Appetite Risk**: Low
**Circuit Breaker Plan**:
If exceeds 3 hours:
- **Simplify to**: Basic endpoint list only
- **Cut**: Detailed examples

---

### Task 12: Deployment Preparation and Final Testing

- **Priority**: P1 (Must Have)
- **Depends on**: Tasks 8, 11 (Tests passing, docs complete)
- **Enables**: Production deployment
- **Estimated time**: 2-3 hours
- **Complexity**: Low

**Description**:
Final manual testing, code review, and preparation for deployment to production.

**Output/Deliverables**:
- Manual test checklist completed
- Code reviewed
- Environment variables documented
- Migration ready for production

**Verification Criteria**:
- [ ] Manual testing checklist complete
- [ ] All automated tests passing
- [ ] Code reviewed by peer
- [ ] Environment setup documented
- [ ] Migration tested in staging

**Appetite Risk**: Low
**Circuit Breaker Plan**:
If time runs out:
- **Simplify to**: Deploy to staging only (not production)

---

## Progress Tracking

### Task Checklist
- [ ] Task 1: Design database schema - Est: 2-3h - Status: Not Started
- [ ] Task 2: Write migration script - Est: 1-2h - Status: Not Started
- [ ] Task 3: Create Sequelize model - Est: 3-4h - Status: Not Started
- [ ] Task 4: POST /api/expenses - Est: 2-3h - Status: Not Started
- [ ] Task 5: GET /api/expenses - Est: 3-4h - Status: Not Started
- [ ] Task 6: PUT /api/expenses/:id - Est: 2-3h - Status: Not Started
- [ ] Task 7: DELETE /api/expenses/:id - Est: 1-2h - Status: Not Started
- [ ] Task 8: Integration tests - Est: 4-5h - Status: Not Started
- [ ] Task 9: Rate limiting (P2) - Est: 2-3h - Status: Not Started
- [ ] Task 10: Validation tests (P2) - Est: 2-3h - Status: Not Started
- [ ] Task 11: API documentation (P2) - Est: 2-3h - Status: Not Started
- [ ] Task 12: Deployment prep - Est: 2-3h - Status: Not Started

### Time Budget Status
- **Total Budget**: 40 hours (1 week @ 8hrs/day)
- **Committed Time**: 28-40 hours
- **P1 Tasks**: 22-29 hours (core must-haves)
- **P2 Tasks**: 6-11 hours (nice-to-haves, can cut)
- **Buffer**: 0-12 hours (0-30% buffer)

### Circuit Breaker Thresholds
- ⚠️ **50% Time Warning** (20 hrs): Should have Tasks 1-5 complete (7 tasks minimum)
- ⚠️ **75% Time Warning** (30 hrs): Should have Tasks 1-8 complete, consider cutting P2 tasks
- 🚨 **90% Time Critical** (36 hrs): Must have P1 tasks complete, cut all P2

---

## Parallel Work Opportunities

### After Task 3 Completes (Model ready):
**Developer A**: Tasks 4 → 5 (POST, GET endpoints)
**Developer B**: Tasks 6 → 7 (PUT, DELETE endpoints)

Both can work simultaneously with no conflicts.

### After Tasks 4-7 Complete:
**Developer A**: Task 8 (Integration tests)
**Developer B**: Task 9 (Rate limiting)

Can work in parallel.

---

## Circuit Breaker Execution Plan

### At 50% time (20 hours) with <5 tasks complete:
**Warning Status - Review Progress**
- Identify which tasks took longer than expected
- Simplify remaining tasks where possible
- Put P2 tasks (9, 10, 11) on watch list

### At 75% time (30 hours) with <8 tasks complete:
**Critical - Execute Circuit Breaker**
**Actions**:
1. **Cut Tasks 9 & 10 immediately** (rate limiting, extra validation tests)
2. Simplify Task 11 (basic docs only)
3. Focus exclusively on P1 tasks

**Justification**: Core CRUD API is more valuable than rate limiting or exhaustive tests

### At 90% time (36 hours) with <10 tasks complete:
**Emergency Mode**
**Actions**:
1. Cut Task 11 entirely (no docs)
2. Minimal testing in Task 8 (happy path only)
3. Deploy basic working API

**Minimum Viable**: Tasks 1-7 + basic tests = functional API

---

## Success Criteria

### Must Have (P1 - Cannot ship without)
- [ ] Database schema created and migrated
- [ ] Expense model with validations
- [ ] POST /api/expenses works (authenticated)
- [ ] GET /api/expenses works (filtered by user)
- [ ] PUT /api/expenses/:id works (with ownership check)
- [ ] DELETE /api/expenses/:id works (with ownership check)
- [ ] Basic integration tests passing
- [ ] API responds <200ms for typical requests

### Should Have (P2 - Important but can cut)
- [ ] Date range filtering on GET
- [ ] Rate limiting middleware
- [ ] Comprehensive validation tests
- [ ] API documentation

### Nice to Have (P3 - Already cut from PRP)
- [ ] Advanced filtering (category, amount)
- [ ] Search by description
- [ ] Bulk upload
- [ ] CSV export
- [ ] Pagination

---

## Notes & Learnings

### Time Tracking
(Update as tasks complete)

| Task | Estimated | Actual | Variance | Notes |
|------|-----------|--------|----------|-------|
| Task 1 | 2-3h | - | - | - |
| Task 2 | 1-2h | - | - | - |
| ... | ... | ... | ... | ... |

### Circuit Breaker Decisions
(Document what was cut and when)

---

**Status**: Ready to execute
**Next Action**: Begin Task 1 (Schema Design)
