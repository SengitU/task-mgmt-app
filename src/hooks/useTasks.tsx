import { useSuspenseQuery } from "@tanstack/react-query";

import { getAll } from "../services/taskService";
import { LoggedInUser } from "./useLoggedInUser";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  dueAt: string;
};

const useTasks = (user: LoggedInUser) => {
  const tasksQuery = useSuspenseQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => getAll(user.token),
    retry: 1,
  });
  return tasksQuery.data;
};

export default useTasks;
