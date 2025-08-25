# Contributing to ADCE Framework

Thank you for your interest in contributing to the ADCE (Appetite-Driven Context Engineering) Framework! 

## Ways to Contribute

### 🐛 Report Bugs
- Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml)
- Include version, environment, and reproduction steps
- Check existing issues before creating new ones

### 💡 Suggest Features  
- Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml)
- Explain the user problem and proposed solution
- Consider how it fits with ADCE methodology

### 📖 Improve Documentation
- Fix typos, clarify instructions, add examples
- Update getting started guides and methodology docs
- Improve agent descriptions and context

### 🔧 Code Contributions
- Agent improvements and new specialized agents
- Template enhancements and new templates
- Tool improvements and new utilities
- Example workflows and case studies

## Development Process

### 1. Fork & Clone
```bash
git clone https://github.com/yourusername/adce-framework.git
cd adce-framework
npm install
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Follow existing code style and patterns
- Add tests for new functionality
- Update documentation as needed

### 4. Test Your Changes
```bash
# Run validation tests
npm test

# Test installation process
npm run install-framework
adce validate-agents

# Test with real example
mkdir test-project
cd test-project
node ../install.js
# Try the agents in Claude Code
```

### 5. Submit Pull Request
- Use descriptive commit messages
- Reference any related issues
- Include before/after examples for agent changes
- Update CHANGELOG.md if applicable

## Agent Development Guidelines

### Agent Structure
All agents must include:
```markdown
---
name: agent-name
description: MUST BE USED for... [clear trigger conditions]
tools: Read, Write, Edit, [specific tools needed]
---

[Comprehensive agent prompt with context engineering]
```

### Agent Quality Standards
- **Clear Purpose**: Specific, non-overlapping responsibilities
- **Context Rich**: Include patterns, gotchas, and examples
- **Appetite Aware**: Reference scope and time constraints
- **Action Oriented**: Focus on doing work, not just explaining

### Testing Agents
1. **Validation**: `npm run validate-agents`
2. **Manual Testing**: Try agents in Claude Code with real scenarios
3. **Integration**: Test with other agents in complete workflows

## Documentation Standards

### Style Guide
- Use clear, actionable language
- Include concrete examples and code snippets
- Structure with headings and lists for scannability
- Test all instructions with fresh users

### Template Updates
- Maintain backward compatibility when possible
- Include migration notes for breaking changes
- Test templates with various project types

## Community Guidelines

### Communication
- Be respectful and constructive in discussions
- Focus on user problems and solutions
- Share context and reasoning for suggestions
- Ask clarifying questions when unclear

### Code of Conduct
- Welcoming and inclusive environment
- No harassment, discrimination, or personal attacks
- Assume positive intent and give constructive feedback
- Report concerning behavior to maintainers

## Recognition

Contributors will be:
- Listed in CHANGELOG.md for their contributions
- Mentioned in release notes for significant features
- Invited to join the core contributor team for sustained contributions

## Questions?

- **GitHub Discussions**: General questions and framework discussion
- **Discord**: Real-time help and community chat
- **Email**: Direct contact for sensitive issues

---

**Ready to improve AI-assisted development? Let's build something great together!**