"use client";

import { useCallback, useSyncExternalStore } from "react";
import { loadTasks, notifyTasksChanged, saveTasks, TASKS_CHANGED_EVENT } from "@/lib/storage";
import type { Task, TaskInput } from "@/types/task";

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// Module-level cache so useSyncExternalStore's getSnapshot can return a
// stable reference until the underlying data actually changes.
let cachedTasks: Task[] | null = null;

function getSnapshot(): Task[] {
  if (cachedTasks === null) {
    cachedTasks = loadTasks();
  }
  return cachedTasks;
}

// A stable, shared empty array reference for the server/first-client-render
// snapshot. useSyncExternalStore requires getServerSnapshot to return the
// same reference across calls, otherwise it treats every call as a change
// and re-renders in an infinite loop.
const EMPTY_TASKS: Task[] = [];

function getServerSnapshot(): Task[] {
  return EMPTY_TASKS;
}

function subscribe(onStoreChange: () => void) {
  const handler = () => {
    cachedTasks = loadTasks();
    onStoreChange();
  };
  window.addEventListener(TASKS_CHANGED_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(TASKS_CHANGED_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function commit(nextTasks: Task[]) {
  cachedTasks = nextTasks;
  saveTasks(nextTasks);
  notifyTasksChanged();
}

/**
 * Manages the task list and keeps it in sync with localStorage.
 * All persistence is client-side only; there is no backend/database.
 */
export function useTasks() {
  const tasks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // useSyncExternalStore renders getServerSnapshot's value ([]) on both the
  // server and the client's first pass (avoiding hydration mismatches), then
  // automatically re-renders with the real localStorage snapshot right after
  // mount - so no separate "isLoaded" flag is needed here.

  const addTask = useCallback((input: TaskInput) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: createId(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    commit([newTask, ...getSnapshot()]);
  }, []);

  const updateTask = useCallback((id: string, input: TaskInput) => {
    commit(
      getSnapshot().map((task) =>
        task.id === id
          ? { ...task, ...input, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const markAsDone = useCallback((id: string) => {
    commit(
      getSnapshot().map((task) =>
        task.id === id
          ? { ...task, status: "done", updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    commit(getSnapshot().filter((task) => task.id !== id));
  }, []);

  return { tasks, addTask, updateTask, markAsDone, deleteTask };
}
