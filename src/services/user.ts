import { axiosClient } from "@/services/axios";

export interface IUser {
  iD: number;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createAccount = async (
  user: Pick<IUser, "username" | "password">
) => {
  const response = await axiosClient.post("/user/create-account", user);
  return response.data;
};

export const login = async (user: Pick<IUser, "username" | "password">) => {
  const response = await axiosClient.post("/user/log-in", user);
  return response.data;
};

export const getUser = async () => {
  // Get the token from local storage
  const token = localStorage.getItem("token");

  const res = await axiosClient.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
