import type { Task } from "../hooks/useTasks";

import TaskCard from "./TaskCard";

const TaskList = ({ tasks, title }: { tasks: Task[]; title: string }) => {
  return (
    <div className="flex flex-col items-center w-1/2 h-full border border-gray-200 rounded-lg p-3">
      <h3 className="mb-2 text-xl font-semi-bold leading-tight tracking-tight text-gray-900">
        {title}
      </h3>
      <div className="flex flex-row w-full h-full flex-wrap overflow-y-auto max-h-[650px] md:max-h-[500px] sm:max-h-[300px] justify-around">
        {tasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
