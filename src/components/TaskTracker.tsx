"use client";

import { useMemo, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { STATUS_LABELS, TASK_STATUSES, type Task, type TaskStatus } from "@/types/task";

const FILTER_ALL = "all" as const;
type Filter = TaskStatus | typeof FILTER_ALL;

export function TaskTracker() {
  const { tasks, addTask, updateTask, markAsDone, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<Filter>(FILTER_ALL);

  const visibleTasks = useMemo(() => {
    const filtered =
      filter === FILTER_ALL ? tasks : tasks.filter((task) => task.status === filter);

    // Show the earliest due date first; tasks without a due date sort last.
    return [...filtered].sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
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
        <h1 className="text-2xl font-bold">Task Tracker</h1>
        <p className="text-sm text-black/60 dark:text-white/60">
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
              ? "bg-blue-600 text-white"
              : "border border-black/15 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
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
                ? "bg-blue-600 text-white"
                : "border border-black/15 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
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
