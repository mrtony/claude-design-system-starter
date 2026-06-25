# DESIGN.md — Anthropic-inspired Design System

This is the single source of truth for how things should look and how they should be
built. Feed it to **Claude Design** as context, and keep it in the repo so **Claude Code**
implements against it. Treat the rules below the way you'd brief a talented but very
literal teammate: be explicit, because the "soft" rules don't live in a color file.

---

## Forbidden — never do these

Hard rules. Failing any one is a defect, **even if the pixels look right**.

- **No magic-number arbitrary values** for spacing / sizing / radius —
  `mt-[13px]`, `w-[347px]`, `rounded-[9px]` are banned. Snap to the scale
  (`mt-3`, `w-80` / `w-full`, `rounded-lg`). If nothing on the scale fits, the
  design — or the token — changes, not the markup.
- **No scattered arbitrary values just to pixel-match a mockup.** Don't reproduce a
  comp 1:1 by sprinkling `[…]` values. Match the system, not the screenshot.
- **No hard-coded colors / brand values** — `bg-[#c96442]`, `text-[var(--theme-fg)]`,
  `border-[rgb(...)]` are banned. Use token utilities only: `bg-primary`,
  `text-muted-foreground`, `bg-coral-500`, `border-border`. Every color comes from
  `globals.css`.

If a genuine one-off need appears, add a **named token** to `globals.css` and use that —
never inline the raw value.

### Allowed exceptions

A genuine, unavoidable exception uses an inline ESLint disable **with a mandatory reason**.
Both `eslint` and `design:check` honor this one escape hatch:

```tsx
{/* eslint-disable-next-line no-restricted-syntax -- third-party embed locked to 640px */}
<iframe className="h-[360px] w-[640px]" src={mapUrl} />
```

The `-- reason` is **required** — it's why the exception exists, and it stays auditable:

```bash
grep -rn "eslint-disable.*no-restricted-syntax" src/
```

A disable **without** a `-- reason` is itself a violation — same as the raw value it would
otherwise hide.

---

## 1. Tech stack (non-negotiable — enforce at Claude Code handoff)

Every page that becomes real code must be built with:

- **React 19** (Server Components where the framework supports it; no `forwardRef` — use ref-as-prop).
- **Tailwind CSS v4**, CSS-first config. All tokens live in `globals.css` via `@theme` /
  `@theme inline`. **Do not** create a `tailwind.config.js`.
- **shadcn/ui + Radix UI** for all interactive primitives (Dialog, Popover, Tabs, Select,
  Dropdown, Tooltip, etc.). Don't hand-roll a11y behavior that Radix already gives you.
  Components use the `data-slot` attribute convention.
- **lucide-react** for icons. Use the **Sparkles** icon as the recurring motif for AI /
  generative / "magic" moments (assistants, suggestions, summaries).
- **Sonner** for all toasts / notifications (replaces shadcn's deprecated `toast`).
  Add via `npx shadcn@latest add sonner`; render a single `<Toaster />` at the app root.
  It inherits the design tokens (`--popover` / `--popover-foreground` / `--border` + brand
  radius); success → teal, error → `destructive`. Wire its `theme` prop to your `.dark`
  toggle so toasts follow light/dark. Don't hand-roll a notification system.
- TypeScript, `cn()` helper (`clsx` + `tailwind-merge`), and a light/dark switch that
  toggles the `.dark` class on `<html>`.

> When you build a page, always express color, radius, and type through the tokens in
> `globals.css` (e.g. `bg-primary`, `text-muted-foreground`, `bg-coral-500`, `rounded-2xl`).
> Never hard-code hex values in components.

---

## 2. Brand essence (the "feel")

Warm, editorial, and calm — closer to a quality print magazine than a typical SaaS
dashboard. Generous whitespace, soft corners, restrained motion, one confident accent at a
time. It should feel considered, not busy.

- **Whitespace ratio:** lean roomy. Section padding ≥ 64px on desktop; never let content
  run edge-to-edge. Breathing room is part of the brand.
- **Corner softness:** soft, not pill-everywhere. Cards/panels use `rounded-2xl`; inputs and
  small controls `rounded-lg` or `rounded-md`; **only buttons and tags use the full pill**
  (`rounded-full`).
- **Restraint:** one hero idea per screen. Spend boldness in a single place; keep everything
  around it quiet.

---

## 3. Color — when to use what

| Token / scale            | Use it for                                                        |
|--------------------------|-------------------------------------------------------------------|
| `background` / `ivory-*` | Page and section surfaces (warm off-white, never pure `#fff` bg). |
| `card` / `popover`       | Raised surfaces: cards, popovers, menus.                          |
| `primary` (coral-500)    | The **one** primary action per view. Don't scatter coral around.  |
| `secondary` / `muted`    | Quiet surfaces, table headers, inactive states.                   |
| `warm-*`                 | Text + neutral UI (warm grays). `foreground` = `warm-950`.        |
| `teal-*`                 | Success, positive status, secondary data accent.                 |
| `purple-*`               | Links, focus ring, tertiary accent, AI/Sparkles moments.         |
| `olive-*` / `gold-*`     | Charts, tags, warning (`gold` = caution).                        |

**Soft rules the model tends to get wrong:**

- Coral is the **brand action** color first. Use it sparingly — a screen with three coral
  buttons has no primary action.
- **Known overlap:** `destructive` is also coral-derived (coral-600). For genuinely
  destructive actions (delete, etc.), make them visually distinct from the coral primary
  CTA — e.g. outline + `text-destructive`, or a more saturated red if you add one. Don't let
  "Delete" and "Get started" look identical.
- Accent colors (teal/purple) appear **as accents**, not as large fills. No multi-color
  gradient soup.

---

## 4. Typography

Faces (all free via Google Fonts; the Latin face leads each stack, 繁中 falls through):

- **Latin (sans / UI / body):** Hanken Grotesk
- **繁體中文:** Noto Sans TC (body) · Noto Serif TC (display)
- **Mono (code / data / tokens):** IBM Plex Mono

Roles:

- **Display / headings** → `font-serif`. Big, `tracking-tight`, used with restraint — the
  signature voice. Latin renders in Hanken Grotesk; Chinese renders in **Noto Serif TC**, so
  the serif character shows on 繁體中文 headings.
- **Body / UI** → `font-sans` (Hanken Grotesk + Noto Sans TC).
- **Code / data** → `font-mono` (IBM Plex Mono; CJK falls back to Noto Sans TC).

Loading: via Google Fonts CDN — `globals.css` already ships the `@import`, which works in
both the Claude Design canvas and a Vite/React repo. If a context wants an HTML `<link>`
instead, put the same family list in the document `<head>`.

> Decision to confirm: per "拉丁使用 Hanken Grotesk", the **serif/display role uses Hanken
> Grotesk for Latin** (a grotesk), with serif reserved for Chinese (Noto Serif TC). If you'd
> rather have a true Latin serif for display headings, name one (e.g. Source Serif 4, Lora)
> and it leads `--font-serif` instead.

---

## 5. Component conventions

- **Buttons:** pill (`rounded-full`). Primary = coral fill + dark text. Secondary = dark
  (`warm-950`) fill + ivory text (this is an **inverse** button, *not* shadcn's `secondary`
  surface). Tertiary = ghost/outline.
- **Cards / panels:** `rounded-2xl`, hairline `border`, `shadow-sm` resting, `shadow-md`
  when elevated.
- **Focus:** always visible. Purple ring (`ring-ring`), 2px offset. Never remove outlines.
- **Motion:** ~140–220ms, ease-out (`cubic-bezier(.2,.8,.2,1)`). Micro-interactions only;
  no gratuitous animation — it reads as AI-generated.

---

## 6. Quality floor (every screen)

Responsive down to mobile · visible keyboard focus · `prefers-reduced-motion` respected ·
WCAG AA contrast · semantic HTML + Radix for behavior.

---

## 7. Avoid the generic-AI look

This palette (warm cream + serif display + terracotta accent) is *also* the default look a
lot of AI tools converge on. To stay distinctive, spend the freedom you have on layout and
one signature element per page (an unusual grid, a typographic moment, a meaningful data
visual) rather than another centered hero with a gradient blob. If a layout feels like the
default you'd produce for any landing page, change it.
