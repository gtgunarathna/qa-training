import { TaskTracker } from "@/components/TaskTracker";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 justify-center bg-zinc-50 px-4 font-sans dark:bg-black">
      <TaskTracker />
    </div>
  );
}
