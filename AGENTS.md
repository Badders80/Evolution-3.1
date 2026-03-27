# Agent Instructions: Evolution Stables 4.0

This file provides critical guidelines for AI agents working on this repository.

## 🎨 Design Philosophy
All frontend changes must adhere to the **Evolution Stables Design Philosophy**. This framework is designed to avoid "AI slop" and ensure institutional-grade visual polish.

**Core Directives:**
- **Consult the Docs:** Before modifying any UI, read `docs/design/DESIGN_PHILOSOPHY.md`.
- **Avoid Generic Patterns:** Do not use default Tailwind colors (e.g., `blue-500`) or standard fonts like Inter.
- **Respect Whitespace:** Maintain generous vertical padding (96px+) between sections.
- **Asymmetric Layouts:** Prioritize asymmetric grids (e.g., 7/5 or 8/4) over standard symmetric columns.
- **Scannable Copy:** Keep information modules bite-sized (<25 words). Use `scripts/scannability_auditor.py` to verify.

## 🛠 Technical Workflow
- **Mobile First:** All UI must be optimized for 375px/428px before being enhanced for desktop.
- **Lucide Icons:** Use Lucide for all iconography.
- **Accessibility:** Ensure semantic HTML and WCAG AA compliance.

## 📝 Anti-Rules (What NOT to do)
- No pure white backgrounds.
- No cluttered or "crowded" layouts.
- No floating blobs or trendy "glassmorphism" without specific brand justification.
- No skipping responsiveness testing.

*Follow these instructions to maintain the premium, institutional character of the Evolution Stables brand.*
