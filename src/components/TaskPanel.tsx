import type { LoggedInUser } from "../hooks/useLoggedInUser";

import useTasks from "../hooks/useTasks";
import TaskList from "./TaskList";

const TaskPanel = ({ user }: { user: LoggedInUser }) => {
  const tasks = useTasks(user);
  const openTasks = tasks.filter((task) => task.status === "OPEN");
  const doneTasks = tasks.filter((task) => task.status === "CLOSED");

  return (
    <div className="box-border flex flex-row items-center w-full space-x-2">
      <TaskList title="Open Tasks" tasks={openTasks} />
      <TaskList title="Completed Tasks" tasks={doneTasks} />
    </div>
  );
};

export default TaskPanel;
