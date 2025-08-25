# User Onboarding Example - ADCE Workflow

Complete workflow showing ADCE framework for improving user onboarding experience.

## Starting Point: User Research Insight
> "New users are confused by our app - 73% don't complete setup and only 31% return after first session. User interviews show they don't understand the core value proposition."

## Step 1: Shaping Phase (2 days)

**Input to shaper agent**:
```
"Use shaper to create a pitch for: New users are confused and abandoning our app during onboarding - they don't understand the value or how to get started"
```

**Shaper Output**: Appetite-bounded pitch

### Appetite: 4 weeks  
**Problem**: Only 27% of new signups become active users. Exit interviews reveal confusion about app purpose and next steps.

**User Impact**:
- **Business**: Losing 73% of potential customers at onboarding
- **Users**: Frustrating first experience, unclear value proposition  
- **Growth**: Word-of-mouth suffers due to poor first impressions
- **Metrics**: 31% retention vs. 65% industry benchmark

### Solution Sketch
```
Current Flow:
Signup → Dashboard → Confusion → Abandonment

Proposed Flow:
Signup → Welcome → Quick Value Demo → Guided Setup → First Success → Dashboard

Onboarding Sequence:
┌─────────────────────────────────┐
│ Step 1: Welcome & Value Prop    │
│ "Track expenses in 2 minutes"  │
│                                 │
│ Step 2: Quick Demo              │
│ "See how Sarah saves $200/mo"  │
│                                 │  
│ Step 3: Your First Entry        │
│ "Add your coffee purchase"     │
│                                 │
│ Step 4: Instant Insights        │
│ "You spend $X on coffee/week"  │
│                                 │
│ [Continue to Dashboard] ✨      │
└─────────────────────────────────┘
```

### Boundaries
**In Scope**:
- Progressive 4-step onboarding flow
- Interactive demo with sample data
- First success moment with real user data
- Mobile-responsive onboarding screens

**Out of Scope**:
- Account customization and advanced settings
- Integration with external accounts (bank sync)
- Video tutorials or help documentation
- A/B testing different onboarding flows

**Rabbit Holes to Avoid**:
- Perfect animations and micro-interactions  
- Comprehensive tutorial covering all features
- Personalized onboarding based on user type
- Complex progress tracking and analytics

## Step 2: Architecture Review (1 day)

**Input to architect agent**:
```
"Use architect to review this user onboarding pitch for technical feasibility and create implementation PRPs"
```

**Architect Assessment**: ✅ Feasible within 4-week appetite

### Technical Approach
- **Frontend**: New onboarding flow with React Router
- **State Management**: Onboarding progress with local storage  
- **Backend**: Onboarding completion tracking API
- **Database**: Add `onboarding_completed` flag to users table
- **Analytics**: Basic step completion tracking

### Implementation PRPs

#### PRP 1: Onboarding Flow Foundation (1 week)
- Create onboarding route structure and navigation
- Build progressive step component with state management
- Add onboarding completion tracking to user model
- Implement routing logic that shows onboarding vs. dashboard

#### PRP 2: Interactive Demo & Content (1.5 weeks)
- Build sample data demonstration
- Create value proposition content and messaging
- Implement guided first expense entry
- Add instant insight calculation and display

#### PRP 3: Integration & Polish (1 week)  
- Integrate onboarding with existing auth flow
- Add mobile responsiveness and accessibility
- Implement completion tracking and dashboard redirect
- User testing and refinement

#### PRP 4: Deployment & Validation (0.5 weeks)
- Deploy to staging for internal testing
- Production deployment with feature flag
- A/B test setup (old vs. new onboarding)
- Monitor completion rates and user feedback

### Circuit Breakers
**If demo complexity exceeds 1 week**:
→ Replace interactive demo with static preview
→ Use existing dashboard with sample data overlay

**If mobile responsiveness becomes complex**:
→ Desktop-first launch, mobile optimization in next cycle

## Step 3: Implementation (4 weeks)

### Week 1: Foundation (architect + builder)

**PRP 1 Execution**:
```
"Use architect to implement PRP 1: Onboarding Flow Foundation

Context:
- Current auth flow in src/components/Auth/
- Router setup in src/App.js using React Router v6
- User model in src/models/User.js with Sequelize
- State management patterns in src/hooks/useAuth.js

Known Gotchas:  
- ROUTING: Onboarding must intercept dashboard redirect after login
- STATE: Progress must persist if user refreshes page
- AUTH: Don't show onboarding to existing users who already completed it

Success Criteria:
- /onboarding route with step progression (1-4)
- User model tracks onboarding completion status
- Auth flow redirects new users to onboarding instead of dashboard
- Progress persists across page refreshes
"
```

**Implementation Results**:
- ✅ Onboarding route structure with 4-step progression
- ✅ User model updated with onboarding tracking
- ✅ Auth redirect logic working correctly
- ✅ Progress persistence with local storage backup
- ⚡ Completed in 5 days (2 days under estimate)

### Week 2: Demo & Content (builder)

**PRP 2 Execution**:  
```
"Use builder to implement PRP 2: Interactive Demo & Content

Context:
- Existing expense categories in src/data/categories.js
- Expense entry component in src/components/ExpenseForm.jsx
- Calculation utilities in src/utils/calculations.js
- Design system components in src/components/ui/

Known Gotchas:
- UX: Demo must feel interactive but not save real data
- PERFORMANCE: Pre-populate demo data, don't calculate in real-time
- CONTENT: Value proposition must be clear and compelling

Success Criteria:
- Welcome step with clear value proposition
- Interactive demo showing expense tracking workflow
- Guided first expense entry with real user data
- Instant insight showing spending pattern from entry
"
```

**Implementation Results**:
- ✅ Welcome step with compelling value proposition copy
- ✅ Interactive demo using pre-built sample scenarios
- ✅ Guided expense entry with helpful prompts
- ✅ Real-time calculation showing spending insights
- ⚠️ Required 8 days (1 day over due to content iteration)

**Circuit Breaker Decision**: Content refinement taking longer than expected, but user value is high. Absorb overage from remaining weeks.

### Week 3: Integration (builder + architect)

**PRP 3 Execution**:
```
"Use architect to implement PRP 3: Integration & Polish

Context:
- Auth flow in src/hooks/useAuth.js
- Dashboard component in src/pages/Dashboard.jsx
- Responsive patterns in src/styles/responsive.css  
- Accessibility standards from src/components/ui/Button.jsx

Known Gotchas:
- INTEGRATION: Must handle both new user onboarding and existing user flows
- MOBILE: Touch targets must be 44px minimum for iOS
- ACCESSIBILITY: Screen reader announcements for step progression

Success Criteria:
- Seamless transition from onboarding to dashboard
- Mobile-responsive design working on iOS and Android
- Accessibility compliance for screen readers
- Onboarding completion rate >60% (vs. current 27%)
"
```

**Implementation Results**:
- ✅ Clean integration with existing auth and dashboard flows
- ✅ Mobile-responsive design with touch-friendly interactions
- ✅ Accessibility features including screen reader support
- ✅ Internal testing shows 67% completion rate
- ⚡ Completed in 6 days (1 day under estimate)

### Week 4: Deployment (deployer)

**PRP 4 Execution**:
```
"Use deployer to implement PRP 4: Deployment & Validation

Context:
- Feature flag system in src/config/features.js
- A/B testing with LaunchDarkly integration
- Production deployment via Vercel
- Analytics tracking with Google Analytics

Known Gotchas:
- DEPLOYMENT: Feature flag must allow gradual rollout (10% → 50% → 100%)
- ANALYTICS: Track completion rates by step to identify drop-off points
- PERFORMANCE: Onboarding images must be optimized for mobile

Success Criteria:
- Feature flag deployment with 10% user rollout
- A/B test comparing old vs. new onboarding flows
- Analytics showing completion rates and drop-off points
- Zero critical errors in production monitoring
"
```

**Implementation Results**:
- ✅ Feature flag deployment with gradual rollout
- ✅ A/B testing infrastructure with proper user bucketing
- ✅ Analytics tracking with detailed step-by-step insights
- ✅ Production deployment with monitoring and alerting
- 📊 Initial results: 62% completion rate (128% improvement over baseline)

## Step 4: Results & Retrospective

### Delivered Value
- **User Experience**: Clear, progressive onboarding that demonstrates value
- **Business Impact**: 62% onboarding completion (vs. 27% baseline) 
- **Product Metrics**: 43% day-7 retention (vs. 31% baseline)
- **Timeline**: Completed within 4-week appetite despite content iteration

### What We Cut (Circuit Breaker Decisions)
- ❌ **Advanced animations** → Simple fade transitions only
- ❌ **Comprehensive feature tour** → Focus on core value demonstration
- ❌ **Personalization** → Single onboarding flow for all user types
- ❌ **Help documentation integration** → Standalone onboarding experience

### Key Learnings

**User Research Validation**:
- Clear value proposition in step 1 reduced immediate abandonment
- Interactive demo (step 2) increased engagement and understanding
- First success moment (step 4) created positive momentum for dashboard usage
- Mobile responsiveness critical (68% of signups on mobile)

**Context Engineering Success**:
- Reference to existing auth patterns prevented integration bugs
- Accessibility standards from ui components ensured consistency
- Performance gotchas about mobile image optimization prevented issues
- Analytics integration patterns enabled proper measurement

**Appetite Discipline**:
- Content iteration overage (1 day) was valuable investment in user experience
- Circuit breaker decisions on animations saved 2-3 days of development
- Focus on core workflow over comprehensive features delivered measurable impact

### Files in This Example  
- `01-user-research.md` - Original user research and problem identification
- `02-shaper-pitch.md` - Complete appetite-bounded pitch with solution
- `03-architect-assessment.md` - Technical feasibility and PRP breakdown
- `04-prp-foundation.md` - Onboarding infrastructure PRP with context
- `05-prp-demo.md` - Interactive demo and content PRP with context
- `06-prp-integration.md` - System integration and polish PRP with context
- `07-prp-deployment.md` - Deployment and validation PRP with context
- `08-hill-chart-tracking.md` - Weekly progress and problem-solving phases
- `09-results-analysis.md` - Metrics, user feedback, and business impact
- `10-retrospective.md` - Lessons learned and methodology refinements

**Outcome**: Successful onboarding redesign that more than doubled completion rates and improved user retention using ADCE methodology within appetite constraints.