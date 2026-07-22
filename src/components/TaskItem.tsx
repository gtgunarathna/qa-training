"use client";

import { STATUS_LABELS, type Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMarkAsDone: (id: string) => void;
}

const STATUS_BADGE_CLASSES: Record<Task["status"], string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  done: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
};

function formatDueDate(dueDate: string): string {
  if (!dueDate) return "No due date";
  const date = new Date(`${dueDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dueDate;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function TaskItem({ task, onEdit, onDelete, onMarkAsDone }: TaskItemProps) {
  const isDone = task.status === "done";

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black/20 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`font-semibold ${isDone ? "line-through opacity-60" : ""}`}>
            {task.title}
          </h3>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE_CLASSES[task.status]}`}
          >
            {STATUS_LABELS[task.status]}
          </span>
        </div>
        {task.description && (
          <p className="text-sm text-black/70 dark:text-white/70">{task.description}</p>
        )}
        <p className="text-xs text-black/50 dark:text-white/50">
          Due: {formatDueDate(task.dueDate)}
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        {!isDone && (
          <button
            type="button"
            onClick={() => onMarkAsDone(task.id)}
            className="rounded-md border border-green-600 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
          >
            Mark as Done
          </button>
        )}
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-md border border-black/15 px-3 py-1.5 text-xs font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-md border border-red-600 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
