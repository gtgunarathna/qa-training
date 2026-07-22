export const TASK_STATUSES = ["pending", "in-progress", "done"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string (yyyy-mm-dd)
  dueTime: string; // 24h time string (HH:mm)
  status: TaskStatus;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export type TaskInput = Pick<Task, "title" | "description" | "dueDate" | "dueTime" | "status">;

export const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pending",
  "in-progress": "In Progress",
  done: "Done",
};
