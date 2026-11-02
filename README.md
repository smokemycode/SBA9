# Task Management Dashboard

A React + TypeScript task dashboard built with Vite and Tailwind CSS.

## Features

- Create, complete, and delete tasks
- Edit task status inline
- Sort by creation date, priority, due date, or title
- Filter by status and priority
- Search across titles and descriptions
- Overdue task highlighting
- Task statistics (total / to-do / in-progress / done)
- Light / dark theme toggle (persisted)
- Data persistence via `localStorage`
- Export / import tasks as JSON

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Heroicons

## Getting Started

```bash
npm install
npm run dev
Open http://localhost:5173.
```

## Project Structure
```
src/
├── components/
│   ├── Dashboard/    # Owns all state, composes everything
│   ├── TaskForm/     # Controlled form + validation
│   ├── TaskFilter/   # Status/priority filters
│   └── TaskList/     # List + TaskItem
├── types/            # All TypeScript interfaces
├── utils/            # Pure helpers (sort, filter, validate, dates)
└── App.tsx
```

## Scripts
```
npm run dev — start dev server
npm run build — production build
npm run preview — preview production build
```

# REFLECTION
## React and TypeScript Implementation
I built the app around a Dashboard component that owns all shared state. I used functional components everywhere, with useState for tasks, filters, sort, and theme, useEffect for localStorage persistence, and useMemo for derived lists and stats. TypeScript was essential — I typed every prop and used union types (TaskStatus, TaskPriority, SortOption) instead of plain string so the compiler caught typos. I also used Record<string, string> for form errors and cast <select> values with as TaskStatus since the DOM only returns strings.<br />

## Challenges
The biggest challenge was Tailwind v4. I installed tailwindcss but not @tailwindcss/vite, which broke npm run dev with a cryptic module error. The fix was one install — the lesson was to read errors literally. Dark mode was the second big one: the toggle updated state and localStorage correctly but the page didn't change, because Tailwind v4 defaults to prefers-color-scheme. I fixed it with @custom-variant dark in index.css, plus clearing a stale "dark" value in localStorage. Two separate bugs that looked like one. I also hit the stale-state bug with setTasks([task, ...tasks]) before learning to use the functional form setTasks(prev => ...).<br />


## Composition and State Management
My rule was: state lives where it's shared. Dashboard owns tasks, filters, sortBy, and theme; TaskForm keeps local form state; TaskList and TaskItem are fully presentational. Children stay dumb and send updates up via callbacks like onAdd, onDelete, and onUpdateStatus. This made every component easier to read and gave the app one clear source of truth.