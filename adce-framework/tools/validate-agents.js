#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class AgentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  async validate() {
    console.log(chalk.blue('🔍 Validating ADCE agents...\n'));
    
    const agentsDir = path.join(__dirname, '..', 'agents');
    const requiredAgents = [
      { name: 'shaper', file: 'shaper.md' },
      { name: 'architect', file: 'architect.md' },
      { name: 'builder', file: 'builder.md' },
      { name: 'deployer', file: 'deployer.md' }
    ];

    for (const agent of requiredAgents) {
      await this.validateAgent(agentsDir, agent);
    }

    this.printResults();
    
    if (this.errors.length > 0) {
      process.exit(1);
    }
  }

  async validateAgent(agentsDir, agent) {
    const agentPath = path.join(agentsDir, agent.file);
    
    console.log(chalk.blue(`Validating ${agent.name}...`));
    
    if (!fs.existsSync(agentPath)) {
      this.errors.push(`Missing agent file: ${agent.file}`);
      console.log(chalk.red(`❌ File not found`));
      return;
    }

    const content = await fs.readFile(agentPath, 'utf8');
    
    // Validate frontmatter
    this.validateFrontmatter(content, agent.name);
    
    // Validate structure
    this.validateStructure(content, agent.name);
    
    // Validate content quality
    this.validateContent(content, agent.name);
    
    console.log(chalk.green(`✓ ${agent.name} validation complete`));
  }

  validateFrontmatter(content, agentName) {
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) {
      this.errors.push(`${agentName}: Missing frontmatter`);
      return;
    }

    const frontmatter = frontmatterMatch[1];
    
    // Check required fields
    const requiredFields = ['name', 'description', 'tools'];
    
    for (const field of requiredFields) {
      if (!frontmatter.includes(`${field}:`)) {
        this.errors.push(`${agentName}: Missing required frontmatter field: ${field}`);
      }
    }

    // Validate name matches
    if (frontmatter.includes(`name: ${agentName}`)) {
      // Name matches
    } else {
      this.errors.push(`${agentName}: Frontmatter name doesn't match filename`);
    }

    // Check for MUST BE USED
    if (!frontmatter.includes('MUST BE USED')) {
      this.warnings.push(`${agentName}: Description should include "MUST BE USED" for auto-activation`);
    }
  }

  validateStructure(content, agentName) {
    const sections = [
      'Your Core Responsibilities',
      'Your',  // Flexible section matching
      'Quality Standards',
      'Remember:'
    ];

    let foundSections = 0;
    
    for (const section of sections) {
      if (content.includes(section)) {
        foundSections++;
      }
    }

    if (foundSections < 2) {
      this.warnings.push(`${agentName}: Consider adding more structured sections for clarity`);
    }

    // Check for code examples or templates
    if (!content.includes('```') && !content.includes('`')) {
      this.warnings.push(`${agentName}: Consider adding code examples or command templates`);
    }
  }

  validateContent(content, agentName) {
    const wordCount = content.split(/\s+/).length;
    
    if (wordCount < 200) {
      this.warnings.push(`${agentName}: Agent content seems brief (${wordCount} words). Consider adding more context.`);
    }

    if (wordCount > 2000) {
      this.warnings.push(`${agentName}: Agent content is quite long (${wordCount} words). Consider condensing for better AI processing.`);
    }

    // Check for appetite-related content
    if (!content.toLowerCase().includes('appetite')) {
      this.warnings.push(`${agentName}: Should mention appetite constraints for ADCE methodology`);
    }

    // Check for context engineering
    if (!content.toLowerCase().includes('context')) {
      this.warnings.push(`${agentName}: Should reference context engineering principles`);
    }
  }

  printResults() {
    console.log(chalk.blue('\n📊 Validation Results:\n'));
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(chalk.green.bold('✅ All agents are valid and well-structured!'));
      return;
    }

    if (this.errors.length > 0) {
      console.log(chalk.red.bold(`❌ Errors (${this.errors.length}):`));
      for (const error of this.errors) {
        console.log(chalk.red(`  • ${error}`));
      }
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow.bold(`⚠️ Warnings (${this.warnings.length}):`));
      for (const warning of this.warnings) {
        console.log(chalk.yellow(`  • ${warning}`));
      }
    }

    if (this.errors.length === 0) {
      console.log(chalk.green.bold('\n✅ No errors found. Agents are valid!'));
    }
  }
}

if (require.main === module) {
  const validator = new AgentValidator();
  validator.validate().catch(console.error);
}

module.exports = AgentValidator;