import { useCallback, useState } from "react";

import type { LoggedInUser } from "../hooks/useLoggedInUser";
import useTasks from "../hooks/useTasks";
import SearchForm from "./forms/SearchForm";
import TaskList from "./TaskList";

const TaskPanel = ({ user }: { user: LoggedInUser }) => {
  const [searchCriteria, setSearchCriteria] =
    useState<Record<string, string>>();
  const tasks = useTasks(user, searchCriteria);
  const openTasks = tasks.filter((task) => task.status === "OPEN");
  const doneTasks = tasks.filter((task) => task.status === "CLOSED");

  const cbSetSearchCriteria = useCallback(
    (newSearch: Record<string, string>) => {
      setSearchCriteria(newSearch);
    },
    [setSearchCriteria]
  );

  return (
    <>
      <SearchForm
        onCriteriaChange={cbSetSearchCriteria}
      />
      <div className="box-border flex flex-row items-center w-full space-x-2">
        <TaskList title="Open Tasks" tasks={openTasks} />
        <TaskList title="Completed Tasks" tasks={doneTasks} />
      </div>
    </>
  );
};

export default TaskPanel;
