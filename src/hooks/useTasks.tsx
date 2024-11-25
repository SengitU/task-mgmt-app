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

const useTasks = (user: LoggedInUser, search?: Record<string, string>) => {
  const tasksQuery = useSuspenseQuery<Task[]>({
    queryKey: ["tasks", search],
    queryFn: () => getAll(user.token, search),
    retry: 1,
  });
  return tasksQuery.data;
};

export default useTasks;
