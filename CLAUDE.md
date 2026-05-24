# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Architecture

Next.js 15 App Router quiz application with React 19, TypeScript 5, and Tailwind CSS 4. No database — all quiz data is static TypeScript arrays.

### Routing

- `/` — Home page with bento grid of quiz categories
- `/quiz/[category]` — Dynamic quiz page (category ID: sports, history, geography, arts)

### Data Flow

1. Categories defined in `configs/categories.ts` drive the home page grid and quiz routing
2. Questions live in `configs/questions/{category}.ts` as typed arrays (`Question[]`)
3. `useQuiz` hook (`hooks/useQuiz.tsx`) manages all quiz state: shuffles questions, tracks score, handles answer selection with 300ms auto-advance, and controls quiz length (5–50 questions)
4. `utils/index.ts` provides `shuffleArray` (Fisher-Yates) used by the quiz hook

### Component Organization

- `components/bento-grid/` + `components/bento-card/` — Home page category cards with themed colors and hover effects
- `components/quiz/` — Quiz container with sub-components: question display, options, progress bar
- `components/questions-length-selection/` — Slider for choosing quiz length before starting
- `components/completed-quiz/` — Results screen with score, confetti on perfect score, WhatsApp share
- `components/ui/` — Shadcn UI primitives (button, card, progress, slider, switch, label)
- `components/header/`, `components/theme-provider/`, `components/switch-toggle-theme/` — App shell and dark/light theming via next-themes

### Key Types (`types/index.ts`)

```typescript
interface Question { id: string; question: string; options: Option[] }
interface Option { id: string; text: string; correct: boolean }
```

## Stack & Tooling

- **UI**: Shadcn UI (new-york style) + Radix UI primitives + Lucide icons
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS 4 with OKLch color system, CSS variables for theming
- **Utilities**: `cn()` from `lib/utils.ts` (clsx + tailwind-merge), `cva` for component variants
- **Path alias**: `@/*` maps to project root
