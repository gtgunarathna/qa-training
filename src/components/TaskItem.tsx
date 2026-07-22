"use client";

import { STATUS_LABELS, type Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMarkAsDone: (id: string) => void;
}

const STATUS_BADGE_CLASSES: Record<Task["status"], string> = {
  pending: "bg-[#ebeefe] text-[#000258]",
  "in-progress": "bg-[#dfe4ff] text-[#020346]",
  done: "bg-[#ecfacf] text-[#2f4a00]",
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

function formatDueTime(dueTime: string): string {
  if (!dueTime) return "";
  const date = new Date(`2000-01-01T${dueTime}`);
  if (Number.isNaN(date.getTime())) return dueTime;
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function TaskItem({ task, onEdit, onDelete, onMarkAsDone }: TaskItemProps) {
  const isDone = task.status === "done";

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-[#d8d8d8] bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between">
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
          <p className="text-sm text-[#475569]">{task.description}</p>
        )}
        <p className="text-xs text-[#64748b]">
          Due: {formatDueDate(task.dueDate)}
          {task.dueDate && task.dueTime ? ` at ${formatDueTime(task.dueTime)}` : ""}
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        {!isDone && (
          <button
            type="button"
            onClick={() => onMarkAsDone(task.id)}
            className="rounded-md border border-[#78bc43] bg-[#ecfacf] px-3 py-1.5 text-xs font-medium text-[#2f4a00] hover:bg-[#e3f8bb]"
          >
            Mark as Done
          </button>
        )}
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-md border border-[#d8d8d8] px-3 py-1.5 text-xs font-medium hover:bg-[#f6f5f8]"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-md border border-red-500 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
