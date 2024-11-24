import { useCallback, useState } from "react";

export type User = {
  id: number;
  email: string;
  name: string;
};

export type LoggedInUser = {
  user: User;
  token: string;
};

const USER_STORAGE_KEY = "task-mgmt-app-user";

const getUserFromStorage = () => {
  const item = localStorage.getItem(USER_STORAGE_KEY);
  if (!item) return null;
  return JSON.parse(item) as LoggedInUser;
};
const setUserToStorage = (user: LoggedInUser) =>
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

const useLoggedInUser = () => {
  const [user, setUser] = useState(getUserFromStorage());

  const setLoggedInUser = useCallback(
    (user: LoggedInUser) => {
      setUserToStorage(user);
      setUser(user);
    },
    [setUser]
  );

  return { user, setLoggedInUser };
};

export default useLoggedInUser;
