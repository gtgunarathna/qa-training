"use client";

import { FormEvent, useState } from "react";
import { STATUS_LABELS, TASK_STATUSES, type Task, type TaskInput } from "@/types/task";

interface TaskFormProps {
  /** When provided, the form edits this task; otherwise it creates a new one. */
  initialTask?: Task | null;
  onSubmit: (input: TaskInput) => void;
  onCancel?: () => void;
}

const EMPTY_FORM: TaskInput = {
  title: "",
  description: "",
  dueDate: "",
  status: "pending",
};

function toFormValues(task?: Task | null): TaskInput {
  return task
    ? {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
      }
    : EMPTY_FORM;
}

// NOTE: The parent renders this component with a `key` tied to the task
// being edited (or "new"), so React remounts it and re-runs this lazy
// initializer whenever `initialTask` changes - no effect needed to sync it.
export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [form, setForm] = useState<TaskInput>(() => toFormValues(initialTask));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    onSubmit({ ...form, title: form.title.trim() });

    if (!initialTask) {
      setForm(EMPTY_FORM);
    }
    setError(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-black/20"
    >
      <h2 className="text-lg font-semibold">
        {initialTask ? "Edit Task" : "Add a New Task"}
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g. Write project report"
          className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-white/15 dark:bg-black/30"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Optional details about this task"
          rows={3}
          className="resize-none rounded-md border border-black/15 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-white/15 dark:bg-black/30"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="dueDate" className="text-sm font-medium">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-white/15 dark:bg-black/30"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as TaskInput["status"] })
            }
            className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-white/15 dark:bg-black/30"
          >
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {initialTask ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  );
}
