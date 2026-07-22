import { TaskTracker } from "@/components/TaskTracker";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 justify-center px-4 font-sans">
      <TaskTracker />
    </div>
  );
}
