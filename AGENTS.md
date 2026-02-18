# Auto-generated file. Do not edit directly.
# Edit /home/evo/00_DNA/AGENTS.core.md and/or /home/evo/projects/Evolution-3.1/AGENTS.local.md then re-run sync.

=== CORE ===

# Codex Workflow: UI Tweaks & Fast Iteration

# DNA Status: Stable (2026-Q1)
Core rules should not be modified casually.
Structural changes require explicit reasoning.

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
