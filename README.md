# Task Tracker

A simple task tracking web app built with [Next.js](https://nextjs.org), TypeScript, and Tailwind CSS.

This is a **demo project** — there is no backend or database. Tasks are stored entirely in the browser's `localStorage`, so they persist across page reloads but are tied to a single browser on a single machine.

## Features

- Add a task with a title, description, due date, due time, and status
- Edit an existing task
- Mark a task as done
- Delete a task
- Filter tasks by status (All / Pending / In Progress / Done)
- Tasks are sorted by due date/time (earliest first; tasks with no due date appear last)
- Changes are saved automatically to `localStorage` as you make them

## Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later (Node 20+ recommended)
- npm (comes bundled with Node.js)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser. The page auto-updates as you edit the code.

## Other Commands

```bash
npm run build   # Create an optimized production build
npm run start   # Run the production build (requires `npm run build` first)
npm run lint    # Run ESLint
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages and layout
├── components/           # UI components (TaskForm, TaskItem, TaskList, TaskTracker)
├── hooks/useTasks.ts      # Task state management, synced with localStorage
├── lib/storage.ts         # localStorage read/write helpers
└── types/task.ts          # Task and status type definitions
```

## Notes

- Since there is no database, clearing your browser's site data (or using a different browser/device) will reset the task list.
- This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load the [Geist](https://vercel.com/font) font family.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
