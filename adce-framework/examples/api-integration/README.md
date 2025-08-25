# API Integration Example - ADCE Workflow

Complete workflow showing ADCE framework for integrating a third-party API.

## Starting Point: Business Need
> "We need to integrate with Stripe for payments, but our current checkout flow is confusing users and causing cart abandonment."

## Step 1: Shaping Phase (1 day)

**Input to shaper agent**:
```
"Use shaper to create a pitch for: Users are abandoning checkout because payment processing is confusing and unreliable"
```

**Shaper Output**: Appetite-bounded pitch

### Appetite: 3 weeks
**Problem**: 67% cart abandonment rate at checkout, user research shows confusion about payment security and process reliability.

**User Impact**:
- Lost revenue: ~$45K/month in abandoned carts
- User frustration: Support tickets about "broken checkout"  
- Business risk: Competitors have smoother payment flows

### Solution Sketch
```
Current Flow:
Add items → Cart → Manual payment form → Errors/confusion → Abandonment

Proposed Flow:  
Add items → Cart → Stripe Checkout → Payment confirmation → Success

UI Sketch:
┌─────────────────────────────────┐
│ Cart Summary                    │
│ [Item 1] - $29.99              │
│ [Item 2] - $19.99              │
│                                 │
│ Total: $49.98                   │
│                                 │
│ [Continue to Secure Payment]    │ ← Stripe Checkout
└─────────────────────────────────┘
```

### Boundaries
**In Scope**:
- Stripe Checkout integration for credit cards
- Order confirmation and email receipts
- Basic error handling and user feedback

**Out of Scope**:
- Multiple payment providers (PayPal, Apple Pay)
- Subscription billing (separate 4-week cycle)
- Advanced fraud detection (use Stripe defaults)

**Rabbit Holes to Avoid**:
- Custom payment form design (use Stripe Checkout)
- Complex tax calculation (use Stripe Tax later)
- Multi-currency support (USD only for launch)

## Step 2: Architecture Review (1 day)

**Input to architect agent**:
```
"Use architect to review this Stripe integration pitch for technical feasibility and create implementation PRPs"
```

**Architect Assessment**: ✅ Feasible within 3-week appetite

### Technical Approach
- **Frontend**: Replace checkout form with Stripe Checkout redirect
- **Backend**: New `/api/checkout` endpoint using Stripe SDK  
- **Database**: Add `payment_status` and `stripe_session_id` to orders table
- **Integration**: Webhook handling for payment confirmation

### Implementation PRPs

#### PRP 1: Backend Stripe Integration (1 week)
- Set up Stripe SDK and webhook endpoints
- Create checkout session API endpoint
- Handle payment success/failure webhooks
- Update order status workflow

#### PRP 2: Frontend Checkout Flow (1 week)
- Replace payment form with Stripe Checkout button
- Handle redirect flows and loading states
- Update order confirmation page
- Add error handling for failed payments

#### PRP 3: Testing & Deployment (1 week)  
- Test with Stripe test mode
- Deploy to staging environment
- User acceptance testing
- Production deployment with monitoring

### Circuit Breakers
**If week 1 backend work takes > 5 days**:
→ Use Stripe Payment Links instead of custom integration
→ Defer webhook handling to manual order processing

## Step 3: Implementation (3 weeks)

### Week 1: Backend Integration (architect + deployer)

**PRP 1 Execution**:
```
"Use architect to implement PRP 1: Backend Stripe Integration

Context:
- Existing order model in src/models/Order.js
- Payment processing in src/services/PaymentService.js
- Follow patterns from src/api/orders.js for API endpoints
- Use environment variables for Stripe keys (see .env.example)

Known Gotchas:
- CRITICAL: Webhook signature verification prevents fraud
- INTEGRATION: Order status must sync with Stripe session status
- SECURITY: Never store credit card data, use Stripe tokens only

Success Criteria:
- /api/checkout endpoint creates Stripe sessions
- Webhooks update order status correctly
- Test mode integration passes all test cases
"
```

**Implementation Results**:
- ✅ Stripe SDK integrated with proper error handling
- ✅ Checkout session endpoint with order tracking
- ✅ Webhook endpoint with signature verification
- ✅ Order status synchronization working
- ⚠️ Required 6 days (1 day over estimate due to webhook testing complexity)

**Circuit Breaker Decision**: Continue with current approach, absorb 1-day overage from remaining weeks.

### Week 2: Frontend Integration (builder)

**PRP 2 Execution**:
```
"Use builder to implement PRP 2: Frontend Checkout Flow

Context:
- Current checkout form in src/components/CheckoutForm.jsx
- Order confirmation page in src/pages/OrderConfirmation.jsx  
- Use React patterns from src/components/ProductCard.jsx
- State management with useState/useEffect (no Redux for this feature)

Known Gotchas:
- UX: Loading states prevent user confusion during redirect
- PERFORMANCE: Stripe checkout loads async, show spinner
- ERROR: Handle Stripe errors gracefully with user-friendly messages

Success Criteria:
- Stripe Checkout button replaces payment form
- Smooth redirect flow with proper loading states
- Order confirmation shows payment status correctly
- Error handling provides clear user guidance
"
```

**Implementation Results**:
- ✅ Stripe Checkout integration with clean UI
- ✅ Loading states and error handling implemented  
- ✅ Order confirmation updated with payment status
- ✅ Responsive design working on mobile and desktop
- ⚡ Completed in 4 days (3 days under estimate)

### Week 3: Testing & Deployment (deployer + architect)

**PRP 3 Execution**:
```
"Use deployer to implement PRP 3: Testing & Deployment

Context:
- Staging environment at staging.ourapp.com
- Production deployment via GitHub Actions (.github/workflows/deploy.yml)
- Database migrations in migrations/ directory
- Monitoring setup with DataDog (see config/monitoring.js)

Known Gotchas:
- CRITICAL: Test webhooks work in production environment
- PERFORMANCE: Stripe API calls add latency, monitor response times
- SECURITY: Environment variables must be set in production

Success Criteria:
- Staging deployment with full Stripe test integration
- Production deployment with monitoring and alerting
- User acceptance testing shows improved checkout experience
- Cart abandonment rate reduces by 20%+ within 2 weeks post-launch
"
```

**Implementation Results**:
- ✅ Staging deployment with comprehensive testing
- ✅ Production deployment with proper monitoring
- ✅ User acceptance testing passed (6/6 test scenarios)
- ✅ Webhook validation working in production
- 📊 Early metrics: 31% reduction in cart abandonment (exceeded target)

## Step 4: Results & Retrospective

### Delivered Value
- **User Experience**: Streamlined checkout with secure Stripe processing
- **Business Impact**: $14K additional monthly revenue from reduced abandonment
- **Technical Quality**: Clean integration with proper error handling and monitoring
- **Timeline**: Completed within 3-week appetite despite 1-day overage in week 1

### What We Cut (Circuit Breaker Decisions)
- ❌ **Custom payment form styling** → Used Stripe Checkout defaults
- ❌ **Advanced error analytics** → Basic error logging only
- ❌ **Payment method icons** → Stripe handles payment method display

### Key Learnings

**Context Engineering Success**:
- Including specific file references enabled 90% first-pass implementation
- Known gotchas about webhook signature verification prevented security vulnerability
- Existing code patterns accelerated development consistency

**Appetite Discipline**:
- Circuit breaker decision (absorb 1-day overage) kept project on track
- Cutting custom styling for default Stripe UI saved 2-3 days
- Focus on core user value (secure checkout) over polish features

**Agent Coordination**:
- architect + deployer collaboration in week 1 worked well
- builder solo execution in week 2 was efficient  
- Multi-agent coordination in week 3 ensured quality deployment

### Files in This Example
- `01-business-need.md` - Original problem statement
- `02-shaper-pitch.md` - Complete appetite-bounded pitch
- `03-architect-assessment.md` - Technical feasibility and PRP breakdown
- `04-prp-backend.md` - Backend integration PRP with context
- `05-prp-frontend.md` - Frontend implementation PRP with context
- `06-prp-deployment.md` - Testing and deployment PRP with context
- `07-hill-chart-progress.md` - Weekly progress tracking
- `08-retrospective.md` - Lessons learned and methodology insights

**Outcome**: Successful integration that improved user experience and business metrics within appetite constraints using ADCE methodology.