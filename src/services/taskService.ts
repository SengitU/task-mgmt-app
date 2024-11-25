import type { Task } from "../hooks/useTasks";

const serviceUrl = `${import.meta.env.VITE_SERVICE_URL}/task`;

const generateSearchParams = (search?: Record<string, string>) => {
  const searchParams = new URLSearchParams();
  if (search?.searchTerm) searchParams.append("searchTerm", search.searchTerm);
  if (search?.dueAt) searchParams.append("dueAt", search.dueAt);
  return searchParams.toString();
};

export const getAll = async (
  token: string,
  search?: Record<string, string>
) => {
  const getTasksResponse = await fetch(
    `${serviceUrl}?${generateSearchParams(search)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (getTasksResponse.status !== 200)
    throw new Error(await getTasksResponse.json());

  return (await getTasksResponse.json()) as Task[];
};

export const createOrUpdate = async (
  token: string,
  updates: Partial<Task>,
  taskId?: number
) => {
  const isCreate = !taskId;
  const resourceUrl = isCreate ? serviceUrl : `${serviceUrl}/${taskId}`;
  const method = isCreate ? "POST" : "PUT";
  const updateTaskResponse = await fetch(resourceUrl, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...(updates.dueAt
        ? { dueAt: new Date(updates.dueAt).toISOString() }
        : {}),
      ...(updates.title ? { title: updates.title } : {}),
      ...(updates.description ? { description: updates.description } : {}),
      ...(updates.status ? { status: updates.status } : {}),
    }),
  });
  if (updateTaskResponse.status === 200 || updateTaskResponse.status === 201)
    return (await updateTaskResponse.json()) as Task;

  throw new Error(await updateTaskResponse.json());
};
