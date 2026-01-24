# Workflow: Working with AI Agents

Evolution Stables is built with an "Agent-First" philosophy. These patterns ensure consistent, high-quality code when working with agents like Jules, Claude, or Cursor.

---

## 1. The Outcome-Oriented Prompt
Instead of giving prescriptive steps, describe the desired outcome and the constraints.
- **Good**: "Build an email capture form that validates with Zod, uses our brand gold for the button, and logs submissions to Sanity."
- **Bad**: "Create a file in src/components, add a form tag, use these specific 20 lines of CSS..."

## 2. Using the "Single Source of Truth" (SSOT)
When starting a major feature, always refer the AI to our SSOT (located in `README.md` and `docs/`).
- "Refer to `/docs/brand/BRAND_GUIDELINES.md` for voice and spelling requirements."
- "Ensure the implementation follows the patterns in `/docs/decisions/ARCHITECTURE.md`."

## 3. Atomic Changes & Verification
Ask the AI to:
1. Propose a plan.
2. Implement in small, verifiable steps.
3. Run `npm run build` or specific tests after each step.
4. Take screenshots for UI changes using Playwright.

## 4. Brand Alignment
AI agents must follow:
- **British English**: Ensure the agent's system prompt or your instructions mandate British spelling.
- **Understated Authority**: Review AI-generated copy for marketing hyperbole and exclamation marks.

## 5. Directory for Tools
Agents are encouraged to create their own Python tools in `/home/jules/self_created_tools` to aid their workflow, especially for data processing or mass refactoring.
