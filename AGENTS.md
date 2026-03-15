# Auto-generated file. Do not edit directly.
# Edit /home/evo/00_DNA/agents/AGENTS.core.md and/or /home/evo/projects/Evolution_Platform/AGENTS.local.md then re-run sync.

=== CORE ===

# Codex Workflow: UI Tweaks & Fast Iteration

# DNA Status: Stable (2026-Q1)
Core rules should not be modified casually.
Structural changes require explicit reasoning.

## EVOLUTION BUILD PROTOCOL (EBP) - Critical Additions

### E-01: STOP AND TELL (Hard Stop Triggers)
When ANY of the following occur, STOP immediately and get explicit user confirmation:

1. **Gateway/agent spawning fails** → Report: "Can't spawn [agent]. Options: A) Fix auth B) Solo mode C) Pause"
2. **User says "review" or "assess"** → Confirm: "Review mode. No code will be written. Confirm: Y/N"
3. **Task >2 files OR API change** → Draft spec first. Will NOT proceed until "Green light on spec"
4. **Phase complete** → State status, ask: "Next: A) Verify B) Continue C) Pause"

**Never:** Role-play, fake coordination, or "helpfully" continue when blocked.

### E-02: Mode Confirmation Required
Before switching modes (review→build, plan→execute): "Switching to [mode]. Confirm: Y/N"

### E-03: RESEARCH BEFORE BUILD (Anti-Reinvention Rule)
Before building ANY feature:
1. Check `skills/registry/approved_sources.md` - curated solutions (single source of truth for all repos)
2. Search for existing solutions (GitHub, npm, etc.)
3. Check n8n workflows, DNA skills
4. If solution exists: Adapt > Integrate > Build from scratch
5. Document why custom build was chosen if no existing solution used

**Violation of this rule = stop, research, replan.**

### E-04: CHECKPOINT & ROLLBACK
Before heavy execution phases, create a quick checkpoint (e.g., `git commit --allow-empty -m "EBP checkpoint: pre-phase-X"` or a zip backup of key directories) to make rollback trivial if a fatal error cascades.

### E-05: ERROR CLASSIFICATION & FEEDBACK
When reading console output, explicitly categorize errors (e.g., "X11 fatal → graphics/driver issue", "npm ERR! → dep conflict") to feed patterns back into long-term memory for preemptive scanning.

### E-06: DYNAMIC SPEC UPDATES
Allow lightweight spec amendments mid-execution if existing partial implementations are discovered, maintaining momentum without losing discipline.

### E-07: METRICS / POST-MORTEM LITE
After verification, log 2-3 lines detailing time taken, API costs (if applicable), and surprises encountered to continually optimize the EBP.

### E-08: AGENT HANDOFF BOUNDARIES
Define explicit data handoff formats (e.g., strict JSON schemas) when delegating tasks to other agents (e.g., Firecrawl) to reduce misinterpretation during result ingestion.

## Default Behaviour
- [C-01] Prefer surgical patches over architectural improvements.
- [C-02] Minimal diffs; no refactors unless explicitly asked.
- [C-03] Change only what is necessary to achieve the stated outcome.
- [C-04] Before edits: show a brief plan (max 3 bullets).
- [C-05] After edits: do not run tests/builds unless explicitly asked. If asked, run the fastest relevant check only and state the exact command.

## Goal-Aware Behaviour
Before editing code:
1) [C-06] Restate the goal in one sentence (what "done" looks like).
2) [C-07] List up to 3 assumptions you are making.
3) [C-08] Propose the smallest viable change.
4) [C-09] If there are multiple valid approaches, present 2 options with a recommendation.
5) [C-10] Then implement, keeping the diff small.

- [C-11] If the request is ambiguous, ask 1-2 targeted questions rather than expanding scope.
- [C-12] If the requested change would introduce architectural debt, briefly flag it before proceeding.
- [C-37] If a LOCAL OVERRIDE references a Core ID, the LOCAL OVERRIDE is authoritative for that ID.

## UI Tweak Mode
Use for small UI/layout/copy changes:
- [C-13] Ask for the target file/component if unclear.
- [C-14] Prefer editing one component at a time.
- [C-15] Keep patch size tiny (aim <30 LOC unless unavoidable).
- [C-16] Avoid reformatting unrelated code.
- [C-17] If checks/build are slow, propose a "smoke check" alternative (e.g., typecheck only, lint only, or targeted test).

## Surgical Edit Rules (Low Mode)
When reasoning level is set to Low, follow these constraints strictly:
1) [C-18] Edit the minimum number of files possible.
2) [C-19] Prefer modifying existing code over rewriting components.
3) [C-20] Do not refactor structure unless explicitly requested.
4) [C-21] Keep diffs under ~30 lines unless unavoidable.
5) [C-22] Do not rename variables/props/functions unless required.
6) [C-23] Do not introduce new abstractions.
7) [C-24] Avoid reformatting unrelated code.
8) [C-25] Do not run tests/builds unless explicitly asked.
9) [C-26] If unsure, ask a targeted question instead of widening scope.
10) [C-27] After edits: list exactly what files changed and why (briefly).

## Escalation
- [C-28] If a change fails twice, switch to medium/high reasoning, expand the search radius, and propose a structured debug plan (steps + likely causes).
- [C-29] Summarise what you changed.
- [C-30] If a deeper refactor is the best fix, propose it first (do not do it silently).

## Model Selection
- [C-31] For tiny UI edits and rapid iteration, prefer Codex-Spark when available.
- [C-32] If Spark is unavailable, use low reasoning effort for quick, surgical changes.
- [C-33] Use medium/high reasoning effort only for multi-file debugging, refactors, or complex failures.

Reasoning Level Decision Rule
- [C-34] Use LOW for single-file edits, UI tweaks, and changes under ~30 LOC.
- [C-35] Use MEDIUM for scripts, cross-file logic, workflow updates, or guardrail design.
- [C-36] Use HIGH/EXTRA HIGH for unknown failures, architectural changes, or multi-repo reasoning.
- [C-38] For specialized tasks, check /home/evo/00_DNA/skills/INDEX.md for relevant skill files and follow them before proceeding.
- [C-39] For tasks >30 LOC or affecting >1 file: write a compact Execution Spec first (Goal / Constraints / Files / Verification). If the approach is non-obvious or touches critical paths, explicitly ask for approval before implementing. Otherwise, show the spec and proceed.
- [C-40] Do not introduce new structural layers, frameworks, or conventions unless explicitly approved. Prefer existing patterns over new abstractions.
- [C-41] Core rules should not be modified without stating the reason in a one-line comment above the change.

=== LOCAL OVERRIDES ===

## Overrides

## Additions
ADD: Stack: Next.js
ADD: Commands: lint `pnpm lint`, typecheck `pnpm typecheck`, dev `pnpm dev`
