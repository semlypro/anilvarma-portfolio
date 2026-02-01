# Claude Code Instructions for Anil Varma Portfolio

## CRITICAL: Ralph Usage Policy

**NEVER perform backend development tasks yourself when the user asks to use Ralph.**

When the user requests to use Ralph (e.g., `ralph-start`, `ralph --monitor`, or any Ralph command):

1. **DO NOT** offer to do the work yourself as an alternative
2. **DO NOT** start implementing backend tasks if Ralph fails to run
3. **ALWAYS** troubleshoot and fix Ralph installation/execution issues
4. **ALWAYS** persist until Ralph is actually running

### If Ralph fails to run:
1. Check if Ralph is installed: `which ralph`
2. Check Ralph help: `ralph --help`
3. Verify .ralph/ directory exists with proper configuration
4. Try alternative Ralph commands:
   - `ralph --live` (non-tmux mode)
   - `ralph --verbose`
   - Run ralph_loop.sh directly if needed
5. Ask the user for guidance if you cannot get Ralph running

### Ralph Configuration
- Config file: `ralph.config.json`
- Tasks file: `BACKEND_TASKS.md`
- Ralph directory: `.ralph/`
- Prompt file: `.ralph/PROMPT.md`
- Fix plan: `.ralph/fix_plan.md`

## Project Structure

This is a Next.js 14 portfolio website for Anil Varma (SEO Expert).

### Division of Work
- **Frontend (Cowork)**: UI components, pages, styling - `app/(site)/`, `components/`, `styles/`
- **Backend (Ralph)**: Sanity schemas, API routes, lib functions - `sanity/`, `app/api/`, `lib/`

### Key Files
- `PROJECT_PLAN.md` - Full architecture and design system
- `BACKEND_TASKS.md` - Ralph's task list for autonomous development
- `types/index.ts` - Shared TypeScript types (already defined)

## Tech Stack
- Next.js 14 (App Router)
- Sanity CMS v3
- TypeScript
- Tailwind CSS
- Resend (email)
- Claude Sonnet API

## Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run tests
ralph --live         # Start Ralph (non-tmux mode)
ralph --monitor      # Start Ralph with tmux monitoring
```
