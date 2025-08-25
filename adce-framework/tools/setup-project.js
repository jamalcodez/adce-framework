#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function setupProject() {
  console.log(chalk.blue('🔧 Setting up ADCE project...'));
  
  const projectRoot = process.cwd();
  
  // Ensure .claude directory exists
  const claudeDir = path.join(projectRoot, '.claude');
  await fs.ensureDir(claudeDir);
  
  // Create ADCE directory structure
  const adceDir = path.join(projectRoot, 'ADCE');
  await fs.ensureDir(path.join(adceDir, 'templates'));
  await fs.ensureDir(path.join(adceDir, 'examples'));
  await fs.ensureDir(path.join(adceDir, 'docs'));
  
  console.log(chalk.green('✓ Created ADCE directory structure'));
  
  // Create project configuration files
  const claudeMd = path.join(projectRoot, 'CLAUDE.md');
  if (!fs.existsSync(claudeMd)) {
    const template = `# Project Guidelines for ADCE Framework

## Core Principles
- KISS (Keep It Simple, Stupid)
- YAGNI (You Aren't Gonna Need It)  
- Build for users, not for perfection

## Architecture
- Follow existing patterns in src/
- Prefer composition over inheritance
- Keep functions small and focused

## Code Style
- Use meaningful variable names
- Comment complex business logic
- Write tests for core functionality

## Development Commands
\`\`\`bash
npm test        # Run tests
npm run lint    # Check code style
npm run build   # Build for production
\`\`\`

## ADCE Workflow
1. Use \`shaper\` to create appetite-bounded pitches
2. Use \`architect\` to review feasibility and create PRPs
3. Use \`builder\` and \`deployer\` to implement features
4. Track progress with hill charts, not task completion
`;
    await fs.writeFile(claudeMd, template);
    console.log(chalk.green('✓ Created CLAUDE.md'));
  }
  
  // Create hill chart template
  const hillChartTemplate = path.join(adceDir, 'templates', 'hill-chart.md');
  if (!fs.existsSync(hillChartTemplate)) {
    const template = `# Hill Chart Template

## Project: [Project Name]
**Week**: [Current Week] of [Total Appetite]

### Problem Hills
*What we're figuring out*

- **[Problem 1]**: [0-33%] - Still researching approach
- **[Problem 2]**: [0-33%] - Exploring solutions

### Solution Hills  
*What we're building*

- **[Feature 1]**: [34-66%] - Implementation in progress
- **[Feature 2]**: [67-100%] - Testing and polish

### Notes
- Circuit breaker risks: [Any appetite concerns]
- Scope adjustments: [What we've cut or simplified]
- Next week focus: [Main priorities]

### Legend
- **0-33%**: Problem solving (figuring things out)
- **34-66%**: Solution building (making progress)  
- **67-100%**: Finishing up (validating and shipping)
`;
    await fs.writeFile(hillChartTemplate, template);
    console.log(chalk.green('✓ Created hill chart template'));
  }
  
  console.log(chalk.green.bold('\n✅ Project setup complete!'));
  console.log(chalk.yellow('\nNext steps:'));
  console.log('1. Install agents: npm run install-framework');
  console.log('2. Start your first cycle: "Use shaper to create a pitch for: [your idea]"');
}

if (require.main === module) {
  setupProject().catch(console.error);
}

module.exports = setupProject;