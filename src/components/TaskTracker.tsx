"use client";

import { useMemo, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { STATUS_LABELS, TASK_STATUSES, type Task, type TaskStatus } from "@/types/task";

const FILTER_ALL = "all" as const;
type Filter = TaskStatus | typeof FILTER_ALL;

function getDueTimestamp(task: Task): number | null {
  if (!task.dueDate) return null;
  const dueTime = task.dueTime || "23:59";
  const timestamp = new Date(`${task.dueDate}T${dueTime}:00`).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}

export function TaskTracker() {
  const { tasks, addTask, updateTask, markAsDone, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<Filter>(FILTER_ALL);

  const visibleTasks = useMemo(() => {
    const filtered =
      filter === FILTER_ALL ? tasks : tasks.filter((task) => task.status === filter);

    // Show earliest due datetime first; tasks without a due date sort last.
    return [...filtered].sort((a, b) => {
      const aDue = getDueTimestamp(a);
      const bDue = getDueTimestamp(b);
      if (aDue === null && bDue === null) return 0;
      if (aDue === null) return 1;
      if (bDue === null) return -1;
      return aDue - bDue;
    });
  }, [tasks, filter]);

  function handleSubmit(input: Parameters<typeof addTask>[0]) {
    if (editingTask) {
      updateTask(editingTask.id, input);
      setEditingTask(null);
    } else {
      addTask(input);
    }
  }

  function handleDelete(id: string) {
    if (editingTask?.id === id) setEditingTask(null);
    deleteTask(id);
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6 py-10">
      <header>
        <h1 className="text-2xl font-bold text-[#000258]">Task Tracker</h1>
        <p className="text-sm text-[#475569]">
          Tasks are saved in your browser&apos;s local storage.
        </p>
      </header>

      <TaskForm
        key={editingTask?.id ?? "new"}
        initialTask={editingTask}
        onSubmit={handleSubmit}
        onCancel={editingTask ? () => setEditingTask(null) : undefined}
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Filter:</span>
        <button
          type="button"
          onClick={() => setFilter(FILTER_ALL)}
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            filter === FILTER_ALL
              ? "bg-[#000258] text-white"
              : "border border-[#d8d8d8] hover:bg-white"
          }`}
        >
          All
        </button>
        {TASK_STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              filter === status
                ? "bg-[#000258] text-white"
                : "border border-[#d8d8d8] hover:bg-white"
            }`}
          >
            {STATUS_LABELS[status]}
          </button>
        ))}
      </div>

      <TaskList
        tasks={visibleTasks}
        onEdit={setEditingTask}
        onDelete={handleDelete}
        onMarkAsDone={markAsDone}
      />
    </div>
  );
}
