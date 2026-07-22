import type { Task } from "@/types/task";

const STORAGE_KEY = "qa-training.tasks.v1";

/**
 * Reads the task list from localStorage. Returns an empty array when running
 * on the server (no `window`) or when nothing has been stored yet.
 */
export function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch {
    // Corrupted or inaccessible storage - fail safe with an empty list.
    return [];
  }
}

/** Persists the full task list to localStorage. */
export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Ignore write failures (e.g. storage disabled or quota exceeded).
  }
}

/** Fired whenever tasks are written from this tab, so subscribers can re-sync. */
export const TASKS_CHANGED_EVENT = "qa-training:tasks-changed";

export function notifyTasksChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(TASKS_CHANGED_EVENT));
}
