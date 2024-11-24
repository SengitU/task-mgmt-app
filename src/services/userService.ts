import type { LoggedInUser, User } from "../hooks/useLoggedInUser";

const serviceUrl = "http://localhost:3000/user";

export const register = async (user: Omit<User, "id" | "token">) => {
  const newUserResponse = await fetch(serviceUrl, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (newUserResponse.status !== 201)
    throw new Error(await newUserResponse.json());

  return await newUserResponse.json();
};

export const login = async (email: string, password: string) => {
  const loginResponse = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (loginResponse.status !== 200) throw new Error(await loginResponse.json());

  return (await loginResponse.json()) as LoggedInUser;
};
