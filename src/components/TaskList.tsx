"use client";

import type { Task } from "@/types/task";
import { TaskItem } from "@/components/TaskItem";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMarkAsDone: (id: string) => void;
}

export function TaskList({ tasks, onEdit, onDelete, onMarkAsDone }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-black/15 p-8 text-center text-sm text-black/50 dark:border-white/15 dark:text-white/50">
        No tasks yet. Add one above to get started.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onMarkAsDone={onMarkAsDone}
        />
      ))}
    </ul>
  );
}
