# PRP: Expense Tracking API

## Goal
Build a RESTful API for expense tracking that allows users to create, read, update, and delete expenses with proper validation and error handling.

## AI-Accelerated Appetite Constraint
**1 week maximum** (5 working days)

This is part of the larger user dashboard project (2-week total appetite). This PRP covers backend API only.

## Why This Matters
Users need to track their expenses to understand spending patterns. Without a reliable API, the dashboard UI (built in parallel) has no data to display. This is the foundational piece that enables all financial insights features.

**Business Value**: Core feature - 70% of users cite expense tracking as primary reason for using the app.

## What Success Looks Like

### Must Have (Core Value)
- Users can create expenses with amount, category, date, description
- Users can view all their expenses with filtering by date range
- Users can update expense details
- Users can delete expenses
- All operations properly authenticated and authorized
- Data validation prevents invalid expenses
- Error handling provides clear feedback

### Nice to Have (Can Cut)
- Bulk expense upload via CSV
- Advanced filtering (by category, amount range)
- Expense search by description
- Export expenses to CSV

## All Needed Context

### Documentation & References
- **API Framework**: Express.js (Node.js)
  - url: https://expressjs.com/en/guide/routing.html
  - why: We use Express for all backend APIs
- **Database**: PostgreSQL with Sequelize ORM
  - url: https://sequelize.org/docs/v6/core-concepts/model-basics/
  - why: Pattern for defining models and associations
- **Authentication**: JWT tokens (already implemented)
  - file: `src/middleware/auth.js`
  - why: Use existing auth middleware for all protected routes

### Current Codebase Context
- **Existing pattern**: User API follows RESTful conventions
  - file: `src/routes/users.js`
  - why: Follow same structure for consistency
- **Database connection**: Already configured
  - file: `src/config/database.js`
  - why: Use existing connection pool
- **Error handling**: Centralized error middleware
  - file: `src/middleware/errorHandler.js`
  - why: Use consistent error responses across all APIs

### Known Gotchas
**CRITICAL**:
- Expenses must be scoped to authenticated user (prevent users from seeing others' expenses)
- Use `userId` from JWT token, never trust client-provided userId

**PERFORMANCE**:
- Filtering expenses can get slow with large datasets
- Add database index on `userId` and `date` columns

**VALIDATION**:
- Amount must be positive number with max 2 decimal places
- Date must not be in the future
- Category must be from predefined list (groceries, transport, utilities, entertainment, other)

**SECURITY**:
- Sanitize description field to prevent XSS
- Rate limit expense creation to prevent abuse (max 100/hour per user)

## AI-Accelerated Implementation Blueprint

### Days 1-2: Foundation (40% of time)
1. Design database schema for expenses table
2. Create Sequelize model with validations
3. Write and test database migrations
4. Set up basic route structure

### Days 3-4: Core Functionality (40% of time)
5. Implement CRUD endpoints (POST, GET, PUT, DELETE)
6. Add authentication and authorization middleware
7. Implement validation and error handling
8. Add date range filtering for GET endpoint

### Day 5: Testing & Documentation (20% of time)
9. Write integration tests for all endpoints
10. Add API documentation
11. Manual testing and bug fixes
12. Code review and deployment preparation

## Circuit Breaker Points

### If database model complexity takes more than 4 hours:
→ Use simpler schema without foreign keys initially
→ Cut advanced validations (implement post-launch)
→ Use existing User model pattern without customization

### If filtering implementation exceeds 6 hours:
→ Implement basic date filtering only
→ Cut category filtering to post-launch
→ Cut amount range filtering to post-launch

### If testing takes more than 1 day:
→ Focus on happy path tests only
→ Cut edge case testing
→ Manual testing instead of automated for nice-to-haves

### Scope Reduction Priority:
1. **First to cut**: Bulk upload, CSV export, advanced search (P3)
2. **Next to cut**: Advanced filtering by category/amount (P2)
3. **Last resort**: Simplify validation rules, reduce error handling coverage (P2)

### Never Cut:
- Basic CRUD operations (create, read, update, delete)
- User authentication and authorization
- Data validation for amount and date
- Basic error handling

## Validation Loop

### Level 1: Basic Functionality
```bash
# Create expense
curl -X POST /api/expenses -H "Authorization: Bearer $TOKEN" \
  -d '{"amount": 42.50, "category": "groceries", "date": "2024-10-20", "description": "Weekly shopping"}'

# Get expenses
curl -X GET /api/expenses -H "Authorization: Bearer $TOKEN"

# Update expense
curl -X PUT /api/expenses/1 -H "Authorization: Bearer $TOKEN" \
  -d '{"amount": 45.00}'

# Delete expense
curl -X DELETE /api/expenses/1 -H "Authorization: Bearer $TOKEN"
```

### Level 2: Integration Testing
- Verify expenses are scoped to correct user
- Test date range filtering works correctly
- Confirm validation errors return 400 status
- Check unauthorized access returns 401 status

### Level 3: User Acceptance
- User can create expense and see it in their list
- User can edit expense amount and see update
- User can delete expense and it's removed from list
- User cannot see or modify other users' expenses

## Success Criteria

### Must Have (Core Value)
- [ ] POST /api/expenses creates expense (with auth, validation)
- [ ] GET /api/expenses returns user's expenses (with date filtering)
- [ ] PUT /api/expenses/:id updates expense (with auth, validation)
- [ ] DELETE /api/expenses/:id removes expense (with auth)
- [ ] All validation rules enforced (amount, date, category)
- [ ] All operations scoped to authenticated user only
- [ ] Integration tests cover core CRUD operations
- [ ] API responds within 200ms for typical requests

### Nice to Have (Cut if Needed)
- [ ] Advanced filtering (category, amount range)
- [ ] Search by description (full-text search)
- [ ] Bulk upload via CSV
- [ ] Export to CSV
- [ ] Pagination for large result sets
- [ ] Comprehensive edge case test coverage
