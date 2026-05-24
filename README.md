# Quizzer

A sleek, fast-paced trivia app built with Next.js 15 and React 19. Pick a category, set your question count, and see how much you really know.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)

---

## Features

- **4 categories** — Sports, History, Geography, and Arts
- **Adjustable quiz length** — choose between 5 and 50 questions before you start
- **Shuffled questions** — Fisher-Yates shuffle on every session so no two quizzes are the same
- **Auto-advance** — moves to the next question 300ms after you pick an answer
- **Results screen** — score summary, confetti on a perfect score, and a WhatsApp share button
- **Dark / light theme** — system-aware with a manual toggle

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19 + Shadcn UI (new-york) + Radix UI |
| Styling | Tailwind CSS 4 + OKLch color system |
| Animation | Framer Motion |
| Icons | Lucide React |
| Theming | next-themes |
| Language | TypeScript 5 |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # Run ESLint
```

---

## Project Structure

```
quizzer-v2/
├── app/
│   ├── page.tsx                    # Home — bento grid of categories
│   └── quiz/[category]/
│       ├── page.tsx                # Quiz page
│       ├── layout.tsx              # Quiz layout wrapper
│       └── not-found.tsx           # 404 for unknown categories
├── components/
│   ├── bento-grid/                 # Home page category grid
│   ├── bento-card/                 # Individual category card
│   ├── category-card/              # Category selection card
│   ├── quiz/                       # Quiz container + sub-components
│   │   └── components/
│   │       ├── question/           # Question display
│   │       ├── options/            # Answer options
│   │       └── progress/           # Progress bar
│   ├── questions-length-selection/ # Slider to pick quiz length
│   ├── completed-quiz/             # Results screen
│   ├── fade-in/                    # Reusable fade-in wrapper
│   ├── go-back/                    # Back navigation
│   └── ui/                         # Shadcn primitives
├── configs/
│   ├── categories.ts               # Category metadata
│   └── questions/                  # Question banks
│       ├── sports.ts               # 250 questions
│       ├── history.ts              # 320 questions
│       ├── geography.ts            # 180 questions
│       └── arts.ts                 # 150 questions
├── hooks/
│   └── useQuiz.tsx                 # All quiz state and logic
├── types/
│   └── index.ts                    # Question + Option types
└── utils/
    └── index.ts                    # shuffleArray (Fisher-Yates)
```

---

## Categories

| Category | Questions | Difficulty |
|---|---|---|
| Sports | 250 | Mixed |
| History | 320 | Hard |
| Geography | 180 | Easy |
| Arts | 150 | Medium |

---

## Adding a New Category

1. Create `configs/questions/{category}.ts` exporting a `Question[]` array.
2. Add an entry to `configs/categories.ts` with a unique `id` matching the filename.
3. The dynamic route `/quiz/[category]` picks it up automatically — no routing changes needed.

---

## Types

```typescript
interface Question {
  id: string;
  question: string;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
  correct: boolean;
}
```
