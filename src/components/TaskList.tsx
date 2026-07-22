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
      <p className="rounded-lg border border-dashed border-[#d8d8d8] bg-white/70 p-8 text-center text-sm text-[#64748b]">
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
