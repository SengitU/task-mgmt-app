import { useMutation } from "@tanstack/react-query";

import { createOrUpdate } from "../services/taskService";
import useLoggedInUser from "./useLoggedInUser";

import type { Task } from "./useTasks";
import queryClient from "../queryClient";

const useSubmitTask = (taskId?: number) => {
  const { user } = useLoggedInUser();
  const mutation = useMutation<Task, unknown, Partial<Task>>({
    mutationFn: (updates: Partial<Task>) =>
      createOrUpdate(user!.token, updates, taskId),
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return mutation;
};

export default useSubmitTask;
