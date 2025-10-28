# ADCE Framework Installation Guide

## What is ADCE?

ADCE provides **Claude Code agents** that run INSIDE Claude Code to help you build features systematically. It's NOT a standalone command-line tool.

## Prerequisites

1. **Claude Code** (latest version) - https://claude.ai/code
2. **Node.js 18+** (for the installer)
3. A project where you want to use ADCE agents

## Installation Options

### Option 1: From npm (When Published)

Once published to npm, you'll be able to run:

```bash
cd /path/to/your/project
npx adce-framework
```

**Status**: 🚧 Not yet published to npm

### Option 2: From Git Repository (Current Method)

**Step 1: Clone the repository**
```bash
git clone https://github.com/jamalcodez/adce-framework.git
cd adce-framework
```

**Step 2: Navigate to the framework directory**
```bash
cd adce-framework
```

**Step 3: Install dependencies**
```bash
npm install
```

**Step 4: Run the installer in your project**
```bash
cd /path/to/your/project
node /path/to/adce-framework/adce-framework/install.js
```

The installer will:
- ✅ Check for Claude Code
- ✅ Copy agents to `.claude/agents/`
- ✅ Copy templates to `ADCE/templates/`
- ✅ Copy examples to `ADCE/examples/`
- ✅ Create `CLAUDE.md` configuration

### Option 3: Manual Installation (Quickest)

If you just want the agents without running the installer:

```bash
# In your project directory
mkdir -p .claude/agents

# Copy all agents
cp /path/to/adce-framework/adce-framework/agents/*.md .claude/agents/

# Verify installation
ls -la .claude/agents/
# Should show: shaper.md, architect.md, planner.md, builder.md, deployer.md
```

## Verification

After installation, verify the agents are available:

1. **Open your project in Claude Code**
2. **Try using an agent**:
   ```
   Use shaper to create a pitch for: Adding user authentication to my app
   ```

If the shaper agent responds, you're all set! 🎉

## Usage (Inside Claude Code)

Once installed, interact with agents through natural language:

### Standard Workflow (Simple Features)

```bash
# Step 1: Create a pitch
"Use shaper to create a pitch for: [your idea]"

# Step 2: Technical review
"Use architect to review this pitch for feasibility"

# Step 3: Build it
"Use builder to implement the dashboard components"
"Use deployer to set up production deployment"
```

### Extended Workflow (Complex Features)

```bash
# Step 1: Create a pitch
"Use shaper to create a pitch for: [your idea]"

# Step 2: Technical review & PRPs
"Use architect to review this pitch and create PRPs"

# Step 3: Break into tasks (NEW!)
"Use planner to break down the API PRP into specific implementation tasks"

# Step 4: Execute tasks
"Use builder to implement Task 1: Create database schema"
"Use deployer to implement Task 12: Production deployment"
```

## Publishing to npm (For Maintainers)

To publish the package so `npx adce-framework` works globally:

**Step 1: Log into npm**
```bash
npm login
```

**Step 2: Verify package.json**
- Check version number
- Ensure all files are listed in `files` array
- Test locally first

**Step 3: Test the package locally**
```bash
npm pack
# Creates adce-framework-1.0.0.tgz

# Test in another project
cd /path/to/test/project
npm install /path/to/adce-framework/adce-framework-1.0.0.tgz
npx adce-framework
```

**Step 4: Publish to npm**
```bash
npm publish
```

**Step 5: Test the published package**
```bash
cd /path/to/test/project
npx adce-framework
```

## Troubleshooting

### "Could not determine executable to run"

**Cause**: Package not published to npm yet, or incorrect bin configuration

**Solution**: Use Option 2 (Git Repository) or Option 3 (Manual Installation)

### "Claude Code not found"

**Cause**: `.claude` directory doesn't exist in your project or home directory

**Solution**:
1. Install Claude Code first
2. Create `.claude/agents/` manually: `mkdir -p .claude/agents`
3. Use manual installation (Option 3)

### "Agents not responding"

**Cause**: Agents not properly installed or Claude Code not recognizing them

**Solution**:
1. Verify files exist: `ls -la .claude/agents/`
2. Check file format (should be `.md` files with frontmatter)
3. Restart Claude Code
4. Try explicit agent call: `"Use shaper to help me"`

### "npm install fails"

**Cause**: Missing dependencies or Node.js version mismatch

**Solution**:
1. Ensure Node.js 18+ is installed: `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## Support

- **Issues**: https://github.com/jamalcodez/adce-framework/issues
- **Discussions**: https://github.com/jamalcodez/adce-framework/discussions
- **Documentation**: See `/docs` folder in the repository

## Next Steps

After installation:

1. **Read the methodology**: `cat ADCE/examples/user-dashboard/README.md`
2. **Try the planner**: `cat ADCE/examples/task-breakdown/README.md`
3. **Start your first cycle**: Use shaper to create a pitch for your next feature
4. **Join the community**: Share your experience and learn from others
