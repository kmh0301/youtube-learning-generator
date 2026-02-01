# Project Memory & Learned Skills

## Spec-Kit Workflow with Claude Code
- **Initialization**: Use `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git` followed by `specify init . --ai claude` to bootstrap a project.
- **Session Management**: `claude` CLI sessions can lock up. It's best to generate a unique UUID (`uuidgen`) for each major interaction sequence using `--session-id <UUID>` to avoid "Session ID already in use" errors.
- **Permissions**: When running in automation, use `--dangerously-skip-permissions` to avoid interactive prompts blocking execution.
- **Spec-Kit Commands**:
  - `/speckit.specify`: Define functional requirements.
  - `/speckit.plan`: Define tech stack (e.g., React, Supabase, Vercel) and architecture.
  - `/speckit.tasks`: Break down into actionable steps.
  - `/speckit.implement`: Execute the code generation.
- **Output Handling**: `claude` CLI output can be buffered. Running with `pty=true` or checking logs frequently is necessary.

## Tech Stack Preferences (YouTube Learning App)
- **Frontend**: React + TypeScript + Tailwind CSS + shadcn-ui.
- **Backend/DB**: Supabase (PostgreSQL, Auth).
- **Deployment**: Vercel.
