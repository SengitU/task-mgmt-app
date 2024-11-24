import type { Task } from "../hooks/useTasks";

const serviceUrl = "http://localhost:3000/task";

export const getAll = async (token: string) => {
  const getTasksResponse = await fetch(serviceUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (getTasksResponse.status !== 200)
    throw new Error(await getTasksResponse.json());

  return await getTasksResponse.json();
};
// TODO: createOrUpdate
export const update = async (token: string, updates: Partial<Task>, taskId: number) => {
  const updateTaskResponse = await fetch(`${serviceUrl}/${taskId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates)
  });
  if (updateTaskResponse.status !== 200)
    throw new Error(await updateTaskResponse.json());

  return await updateTaskResponse.json() as Task;
};
