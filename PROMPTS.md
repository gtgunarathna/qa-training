# Development Prompt Log

This file records the prompts used to develop the Task Tracker application via an AI coding assistant (GitHub Copilot CLI).

## 1. Initial request

> i want to create a web application to track my task, it should be able to add task and edit, once done marks as done, and delete a task. i need taks to have title, description, due date, status. once done a change it shuld get saved
> i want to develop using nextJS, this just for demo purpose, no need to use DB persistancy. if you have questions ask from me

**Clarifying questions asked and answers given:**
- Persistence mechanism: **Browser localStorage** (vs. in-memory server state or no persistence)
- Language: **TypeScript** (vs. plain JavaScript)
- Styling approach: **Tailwind CSS** (vs. plain CSS Modules)

## 2. Bug report — hydration mismatch

> i saw two errros can you fix them

Followed by the pasted error:

```
Hydration failed because the server rendered text didn't match the client.
...
No tasks yet. Add one above to get started. / Loading tasks…
```

**Fix**: Removed the manual `isLoaded` flag (`typeof window !== "undefined"`), which produced different text on server vs. first client render. Relied on `useSyncExternalStore`'s built-in SSR-safe snapshot behavior instead.

## 3. Bug report — getServerSnapshot infinite loop

Pasted error:

```
The result of getServerSnapshot should be cached to avoid an infinite loop
```

**Fix**: `getServerSnapshot` was returning a new `[]` literal on every call, which isn't referentially stable. Replaced with a single shared `EMPTY_TASKS` constant array reference.

## 4. Feature request — sort by due date

> order the list by due date

**Change**: Updated the sort in `TaskTracker.tsx` from "most recently updated first" to ascending due date, with tasks that have no due date pushed to the end of the list.

## 5. Documentation request — README

> update the readme file with how to start the application

**Change**: Rewrote `README.md` to describe the actual Task Tracker app (features, prerequisites, `npm install` / `npm run dev` steps, other commands, project structure, and localStorage persistence notes) instead of the default `create-next-app` boilerplate text.

## 6. Meta request — dump the prompts

> dump the prompt used to develop this application

**Change**: Created this file (`PROMPTS.md`) summarizing the prompts above.

---

## Tech stack summary

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Persistence**: Browser `localStorage` only (no backend/database) — via `useSyncExternalStore` in `src/hooks/useTasks.ts`
