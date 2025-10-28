#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

class ADCEInstaller {
  constructor() {
    this.projectRoot = process.cwd();
    this.frameworkRoot = __dirname;
  }

  async install() {
    console.log(chalk.blue.bold('\n🚀 ADCE Framework Installer\n'));
    
    if (!this.checkClaudeCode()) {
      console.log(chalk.red('❌ Claude Code not found. Please install Claude Code first.'));
      console.log(chalk.yellow('   Visit: https://claude.ai/code'));
      return;
    }

    const options = await this.getInstallationOptions();
    
    await this.installAgents(options);
    await this.installTemplates(options);
    await this.installProjectFiles(options);
    
    if (options.includeExamples) {
      await this.installExamples();
    }

    console.log(chalk.green.bold('\n✅ ADCE Framework installed successfully!\n'));
    this.printNextSteps();
  }

  checkClaudeCode() {
    return fs.existsSync(path.join(this.projectRoot, '.claude')) || 
           fs.existsSync(path.join(process.env.HOME || process.env.USERPROFILE || '', '.claude'));
  }

  async getInstallationOptions() {
    return await inquirer.prompt([
      {
        type: 'confirm',
        name: 'installAgents',
        message: 'Install ADCE agents to .claude/agents/?',
        default: true
      },
      {
        type: 'confirm', 
        name: 'installTemplates',
        message: 'Install PRP and pitch templates?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeExamples', 
        message: 'Include example workflows?',
        default: true
      },
      {
        type: 'confirm',
        name: 'setupProject',
        message: 'Create project configuration files (CLAUDE.md, etc.)?',
        default: true
      }
    ]);
  }

  async installAgents(options) {
    if (!options.installAgents) return;

    console.log(chalk.blue('📦 Installing ADCE agents...'));
    
    const agentsDir = path.join(this.projectRoot, '.claude', 'agents');
    await fs.ensureDir(agentsDir);
    
    const agentFiles = ['shaper.md', 'architect.md', 'planner.md', 'builder.md', 'deployer.md'];

    for (const file of agentFiles) {
      const source = path.join(this.frameworkRoot, 'agents', file);
      const dest = path.join(agentsDir, file);
      
      await fs.copy(source, dest);
      console.log(chalk.green(`   ✓ Installed ${file}`));
    }
  }

  async installTemplates(options) {
    if (!options.installTemplates) return;

    console.log(chalk.blue('📋 Installing templates...'));
    
    const templatesDir = path.join(this.projectRoot, 'ADCE');
    await fs.ensureDir(templatesDir);
    
    await fs.copy(
      path.join(this.frameworkRoot, 'templates'),
      path.join(templatesDir, 'templates')
    );
    
    console.log(chalk.green('   ✓ Templates installed to ADCE/templates/'));
  }

  async installProjectFiles(options) {
    if (!options.setupProject) return;

    console.log(chalk.blue('⚙️  Setting up project configuration...'));
    
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
npm test
npm run lint
npm run build
\`\`\`

## ADCE Workflow

### Standard Flow (Simple Features)
1. Use shaper to create appetite-bounded pitches
2. Use architect to review feasibility and create PRPs
3. Use builder and deployer to implement features
4. Track progress with hill charts

### Extended Flow (Complex Features)
1. Use shaper to create appetite-bounded pitches
2. Use architect to review feasibility and create PRPs
3. Use planner to break PRPs into specific tasks (optional)
4. Use builder and deployer to execute tasks
5. Track progress with task completion
`;
      await fs.writeFile(claudeMd, template);
      console.log(chalk.green('   ✓ Created CLAUDE.md'));
    }
  }

  async installExamples() {
    console.log(chalk.blue('📚 Installing example workflows...'));
    
    const examplesDir = path.join(this.projectRoot, 'ADCE', 'examples');
    await fs.copy(
      path.join(this.frameworkRoot, 'examples'),
      examplesDir
    );
    
    console.log(chalk.green('   ✓ Examples installed to ADCE/examples/'));
  }

  printNextSteps() {
    console.log(chalk.yellow.bold('🎯 Next Steps:\n'));
    console.log('1. Start your first cycle:');
    console.log(chalk.cyan('   "Use shaper to create a pitch for: [your idea]"\n'));
    console.log('2. Review the methodology:');
    console.log(chalk.cyan('   cat ADCE/examples/user-dashboard/README.md\n'));
    console.log('3. Join the community:');
    console.log(chalk.cyan('   https://github.com/jamalcodez/adce-framework/discussions\n'));
  }
}

if (require.main === module) {
  const installer = new ADCEInstaller();
  installer.install().catch(console.error);
}

module.exports = ADCEInstaller;
