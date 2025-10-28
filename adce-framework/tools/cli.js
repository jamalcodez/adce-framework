#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

class ADCECli {
  constructor() {
    this.projectRoot = process.cwd();
    this.commands = {
      install: this.install.bind(this),
      'setup-project': this.setupProject.bind(this),
      'validate-agents': this.validateAgents.bind(this),
      status: this.status.bind(this),
      help: this.help.bind(this)
    };
  }

  async run() {
    const args = process.argv.slice(2);
    const command = args[0] || 'help';

    if (!this.commands[command]) {
      console.log(chalk.red(`Unknown command: ${command}`));
      this.help();
      return;
    }

    try {
      await this.commands[command](args.slice(1));
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  }

  async install(args) {
    const ADCEInstaller = require('../install.js');
    const installer = new ADCEInstaller();
    await installer.install();
  }

  async setupProject(args) {
    console.log(chalk.blue('🔧 Setting up ADCE project configuration...'));
    
    // Check if .claude directory exists
    const claudeDir = path.join(this.projectRoot, '.claude');
    if (!fs.existsSync(claudeDir)) {
      console.log(chalk.yellow('Creating .claude directory...'));
      await fs.ensureDir(claudeDir);
    }

    // Create CLAUDE.md if it doesn't exist
    const claudeMd = path.join(this.projectRoot, 'CLAUDE.md');
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

    console.log(chalk.green('✅ Project setup complete!'));
  }

  async validateAgents(args) {
    console.log(chalk.blue('🔍 Validating ADCE agents...'));
    
    const agentsDir = path.join(this.projectRoot, '.claude', 'agents');
    const requiredAgents = ['shaper.md', 'architect.md', 'builder.md', 'deployer.md'];
    
    let allValid = true;

    for (const agentFile of requiredAgents) {
      const agentPath = path.join(agentsDir, agentFile);
      
      if (!fs.existsSync(agentPath)) {
        console.log(chalk.red(`❌ Missing: ${agentFile}`));
        allValid = false;
        continue;
      }

      const content = await fs.readFile(agentPath, 'utf8');
      
      // Validate agent structure
      const hasName = content.includes('name:');
      const hasDescription = content.includes('description:');
      const hasTools = content.includes('tools:');
      const hasMustBeUsed = content.includes('MUST BE USED');

      if (hasName && hasDescription && hasTools && hasMustBeUsed) {
        console.log(chalk.green(`✓ ${agentFile} - Valid structure`));
      } else {
        console.log(chalk.yellow(`⚠️ ${agentFile} - Missing required fields`));
        if (!hasName) console.log(chalk.gray('  - Missing name field'));
        if (!hasDescription) console.log(chalk.gray('  - Missing description field'));
        if (!hasTools) console.log(chalk.gray('  - Missing tools field'));
        if (!hasMustBeUsed) console.log(chalk.gray('  - Missing MUST BE USED in description'));
      }
    }

    if (allValid) {
      console.log(chalk.green.bold('\n✅ All agents are valid!'));
    } else {
      console.log(chalk.red.bold('\n❌ Some agents need attention'));
      process.exit(1);
    }
  }

  async status(args) {
    console.log(chalk.blue.bold('📊 ADCE Framework Status\n'));
    
    // Check installation
    const claudeDir = path.join(this.projectRoot, '.claude');
    const agentsDir = path.join(claudeDir, 'agents');
    const templatesDir = path.join(this.projectRoot, 'ADCE', 'templates');
    
    console.log(chalk.blue('Installation Status:'));
    console.log(`Claude directory: ${fs.existsSync(claudeDir) ? chalk.green('✓') : chalk.red('✗')}`);
    console.log(`Agents installed: ${fs.existsSync(agentsDir) ? chalk.green('✓') : chalk.red('✗')}`);
    console.log(`Templates available: ${fs.existsSync(templatesDir) ? chalk.green('✓') : chalk.red('✗')}`);
    
    // Check agents
    if (fs.existsSync(agentsDir)) {
      console.log(chalk.blue('\nAgent Status:'));
      const requiredAgents = ['shaper.md', 'architect.md', 'builder.md', 'deployer.md'];
      
      for (const agent of requiredAgents) {
        const exists = fs.existsSync(path.join(agentsDir, agent));
        const name = agent.replace('.md', '');
        console.log(`${name}: ${exists ? chalk.green('✓') : chalk.red('✗')}`);
      }
    }

    // Check project configuration
    console.log(chalk.blue('\nProject Configuration:'));
    const claudeMd = path.join(this.projectRoot, 'CLAUDE.md');
    console.log(`CLAUDE.md: ${fs.existsSync(claudeMd) ? chalk.green('✓') : chalk.red('✗')}`);
    
    console.log(chalk.blue('\nNext Steps:'));
    if (!fs.existsSync(claudeDir)) {
      console.log(chalk.yellow('• Run: adce install'));
    } else {
      console.log(chalk.green('• Ready to start: "Use shaper to create a pitch for: [your idea]"'));
    }
  }

  help() {
    console.log(chalk.blue.bold('ADCE Framework CLI\n'));
    console.log('Commands:');
    console.log('  install           Install ADCE framework');
    console.log('  setup-project     Setup project configuration');
    console.log('  validate-agents   Validate installed agents');
    console.log('  status            Show framework status');
    console.log('  help              Show this help message\n');
    console.log('Examples:');
    console.log('  adce install');
    console.log('  adce status');
    console.log('  adce validate-agents\n');
    console.log('Visit https://github.com/jamalcodez/adce-framework for documentation');
  }
}

if (require.main === module) {
  const cli = new ADCECli();
  cli.run();
}

module.exports = ADCECli;