# Agent Specifications - ADCE Framework

Complete specifications for the four core ADCE agents with customization guidelines.

## Agent Architecture

### Common Structure
All ADCE agents follow this structure:

```markdown
---
name: agent-name
description: MUST BE USED for [specific trigger conditions]. [Brief purpose statement]
tools: [Comma-separated list of required tools]
---

[Comprehensive agent prompt with context engineering principles]
```

### Auto-Activation System
Agents automatically activate based on:
- **Keyword matching** in user requests
- **Context analysis** of the current development phase  
- **Domain expertise** required for the task
- **"MUST BE USED"** triggers in descriptions

## Core Agent Specifications

### 🎯 shaper Agent

**Primary Role**: Transform broad ideas into appetite-bounded pitches with comprehensive context

**Auto-Activation Triggers**:
- Keywords: "pitch", "idea", "feature", "problem", "users want", "create a pitch"
- Context: New project initiation, feature planning, problem definition
- Patterns: Vague requirements that need structure

**Core Responsibilities**:
1. **Problem Definition**: Turn vague ideas into specific user problems
2. **Appetite Setting**: Determine appropriate time investment (1-6 weeks)
3. **Solution Sketching**: Create rough wireframes and user flows
4. **Boundary Setting**: Define scope with explicit inclusions/exclusions
5. **Context Engineering**: Package all information needed for implementation

**Required Context Engineering**:
- User research and pain points with concrete examples
- Business value and success metrics
- Technical constraints and architectural considerations  
- Known implementation gotchas and complexity risks
- Reference examples and existing patterns

**Output Quality Standards**:
- Specific user problems with measurable impact
- Realistic appetite based on business value
- Clear solution sketches with user interaction flows
- Explicit boundaries preventing scope creep
- Comprehensive context enabling first-pass AI implementation

**Tools**: Read, Write, Edit

**Customization Points**:
- **Industry-specific templates**: Add domain context (fintech, healthcare, etc.)
- **Appetite calibration**: Adjust time estimates for team velocity
- **Validation frameworks**: Include industry-specific success criteria

### 🏗️ architect Agent

**Primary Role**: Technical leadership, feasibility assessment, and scope management with circuit breaker authority

**Auto-Activation Triggers**:
- Keywords: "technical", "feasibility", "architecture", "review", "PRP", "scope"
- Context: Post-shaping phase, technical assessment needed
- Patterns: Complex technical decisions, integration challenges

**Core Responsibilities**:
1. **Feasibility Assessment**: Evaluate technical reality vs. stated appetite
2. **Architecture Planning**: Design system integration and component structure
3. **Risk Management**: Identify complexity risks and mitigation strategies
4. **PRP Creation**: Break pitches into focused implementation units
5. **Circuit Breaker Decisions**: Cut scope when appetite is threatened

**Authority & Decision Making**:
- **Go/No-Go Power**: Can reject pitches as technically infeasible
- **Scope Cutting Authority**: Can reduce features to meet appetite constraints
- **Architecture Decisions**: Final say on technical approach and patterns
- **Integration Oversight**: Ensures components work together correctly

**Required Context Engineering**:
- Existing system architecture and integration points
- Technical debt and performance implications
- Security and compliance requirements
- Team skill levels and technology constraints
- Historical complexity patterns and lessons learned

**Output Quality Standards**:
- Realistic technical assessment with clear risks
- Focused PRPs with comprehensive implementation context
- Clear circuit breaker criteria and scope reduction options
- Architecture decisions that fit within appetite constraints

**Tools**: Read, Write, Edit, Bash

**Customization Points**:
- **Architecture patterns**: Add company-specific architectural standards
- **Risk assessment**: Include domain-specific technical risks
- **PRP templates**: Customize for different technology stacks

### 🎨 builder Agent  

**Primary Role**: UI/UX design and frontend implementation within appetite constraints

**Auto-Activation Triggers**:
- Keywords: "UI", "component", "design", "frontend", "interface", "user experience"
- Context: User-facing feature development, design system work
- Patterns: Visual design needs, user interaction requirements

**Core Responsibilities**:
1. **Design-While-Building**: Solve interface problems during implementation
2. **Component Development**: Build reusable UI components and patterns
3. **User Experience**: Ensure usable, accessible, and responsive experiences
4. **Design System**: Maintain consistency with existing visual patterns
5. **Frontend Integration**: Connect UI components with backend services

**Design Philosophy for Appetite Constraints**:
- **Functional > Beautiful**: Works reliably over looks perfect
- **Consistent > Novel**: Matches existing patterns over innovative design
- **Clear > Clever**: Users understand immediately over impressive interactions  
- **Fast > Perfect**: Quick interactions over complex animations

**Required Context Engineering**:
- Existing design system patterns and component library
- User research and usability requirements
- Accessibility standards and compliance needs
- Performance budgets and technical constraints
- Brand guidelines and visual consistency requirements

**Output Quality Standards**:
- Functional user interfaces that complete intended workflows
- Consistent design language matching existing product
- Accessible and responsive across devices and browsers
- Performance-conscious implementation within appetite bounds

**Tools**: Read, Write, Edit, Bash

**Customization Points**:
- **Design system integration**: Connect with company design systems
- **Accessibility standards**: Include specific compliance requirements
- **Performance budgets**: Set company-specific performance constraints

### 🚀 deployer Agent

**Primary Role**: Infrastructure, deployment, and production operations within appetite constraints

**Auto-Activation Triggers**:
- Keywords: "deploy", "infrastructure", "production", "environment", "hosting"
- Context: Feature ready for deployment, infrastructure needs
- Patterns: Production readiness, infrastructure automation

**Core Responsibilities**:
1. **Infrastructure Planning**: Design deployment and hosting architecture
2. **Deployment Automation**: Create reliable deployment pipelines
3. **Production Operations**: Ensure system reliability and monitoring
4. **Security Implementation**: Apply security best practices and compliance
5. **Performance Operations**: Monitor and optimize production performance

**Appetite-Aware Operations Philosophy**:
- **Working > Perfect**: Get features to users over infrastructure elegance
- **Automated > Manual**: Reduce manual deployment overhead
- **Secure > Convenient**: Security requirements are non-negotiable
- **Monitored > Blind**: Essential observability over comprehensive analytics

**Required Context Engineering**:
- Existing infrastructure patterns and deployment procedures
- Security and compliance requirements for production
- Performance and scalability requirements
- Budget constraints and resource limitations
- Team operational capabilities and on-call procedures

**Output Quality Standards**:
- Reliable deployment process with rollback capabilities
- Production monitoring and alerting for critical issues
- Security implementation meeting compliance requirements
- Scalable architecture that can handle expected load

**Tools**: Read, Write, Edit, Bash

**Customization Points**:
- **Cloud provider integration**: Configure for AWS, GCP, Azure, etc.
- **Security compliance**: Add industry-specific security requirements
- **Monitoring integration**: Connect with company observability stack

## Agent Collaboration Patterns

### Sequential Handoffs
**Standard Flow**: shaper → architect → builder/deployer → integration

1. **Shaper Output**: Appetite-bounded pitch with comprehensive context
2. **Architect Input**: Review pitch for technical feasibility 
3. **Architect Output**: PRPs with implementation context and scope management
4. **Builder/Deployer Input**: Execute PRPs with clear boundaries and context
5. **Integration**: architect oversees component integration and final validation

### Parallel Execution
**When Appropriate**: Independent PRPs that don't have blocking dependencies

- **builder** and **deployer** can work simultaneously on frontend and backend
- **architect** provides coordination and integration oversight
- Regular check-ins ensure components will integrate correctly

### Consultative Support
**Cross-Agent Expertise**: Agents can consult each other when needed

- **builder** asks **architect** about technical integration challenges
- **deployer** consults **builder** on frontend performance optimization  
- **architect** gets **shaper** clarification on user requirements

## Customization Guidelines

### Domain-Specific Adaptations

**Enterprise SaaS**:
- Add compliance requirements (SOX, GDPR, HIPAA)
- Include enterprise security standards
- Reference enterprise architecture patterns

**Mobile Applications**:
- Add mobile-specific performance constraints
- Include app store deployment requirements
- Reference mobile design patterns

**Open Source Projects**:
- Include community contribution workflows
- Add documentation requirements for contributors
- Reference open source licensing considerations

### Team-Specific Customization

**Startup Teams**:
- Emphasize MVP and user validation focus
- Include resource constraint awareness
- Reference lean startup methodologies

**Enterprise Teams**:
- Add change management and approval processes
- Include risk assessment and compliance checks
- Reference enterprise governance requirements

**Consulting Teams**:
- Add client communication requirements
- Include project handoff procedures
- Reference client-specific constraints and preferences

### Technology Stack Integration

**React/Next.js**:
```markdown
## React Patterns Context
- Use functional components with hooks
- Follow Next.js file-based routing conventions
- Implement with TypeScript for type safety
- Use Tailwind CSS for styling consistency
```

**Python/Django**:
```markdown
## Django Patterns Context  
- Follow Django REST framework conventions
- Use class-based views for complex logic
- Implement proper Django ORM relationships
- Follow Python PEP 8 style guidelines
```

## Agent Quality Assurance

### Validation Checklist
- [ ] Frontmatter includes all required fields
- [ ] Description includes "MUST BE USED" trigger
- [ ] Tools list matches agent responsibilities  
- [ ] Content includes appetite awareness
- [ ] Context engineering principles applied
- [ ] Clear output quality standards defined

### Testing Procedures
1. **Automated Validation**: `npm run validate-agents`
2. **Manual Testing**: Try agents with realistic scenarios in Claude Code
3. **Integration Testing**: Test agent collaboration in complete workflows
4. **User Testing**: Get feedback from developers using the agents

### Continuous Improvement
- Monitor agent effectiveness and first-pass success rates
- Gather user feedback on agent behavior and outputs
- Refine agent prompts based on real-world usage patterns
- Update context engineering based on new learnings

---

These specifications enable teams to build, customize, and maintain effective ADCE agents for their specific development contexts and requirements.