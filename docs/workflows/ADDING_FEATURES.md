# Workflow: Adding Features

This guide explains how to add new pages, components, and data integrations to Evolution 4.0.

---

## 1. Adding a New Page

1. Create a new directory in `src/app/` (e.g., `src/app/contact/`).
2. Create a `page.tsx` file inside that directory.
3. Use the `constructMetadata` utility for SEO:
   ```tsx
   import { constructMetadata } from "@/lib/seo";
   export const metadata = constructMetadata({ title: "Contact Us" });
   ```
4. Build the page using reusable components from `src/components/shared` or `src/components/ui`.

## 2. Creating a New Component

Follow our Feature-Based Atomic Design:
- **UI Components**: Place in `src/components/ui/shadcn/` (use `npx shadcn@latest add`).
- **Shared Components**: Place in `src/components/shared/` (Navbar, Footer, etc.).
- **Feature Components**: Place in `src/components/features/` (domain-specific logic).

### Component Pattern
```tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
  className?: string;
}

export function MyComponent({ className }: MyComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {/* Content */}
    </div>
  );
}
```

## 3. Database Integration (Phase 2+)

1. Define the model in `prisma/schema.prisma`.
2. Run `npx prisma generate` and `npx prisma db push`.
3. Create a service in `src/services/` to handle queries.
4. Fetch data in Server Components and pass it to Client Components only when needed for interactivity.

## 4. Typography & Styling

- Always use the tokens defined in `TYPOGRAPHY_SYSTEM.md`.
- Use Tailwind classes like `heading-section`, `body-standard`, etc., for consistency.
- Avoid arbitrary values; if a new value is needed, add it to `tailwind.config.ts`.
