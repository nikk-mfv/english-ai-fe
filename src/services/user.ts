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
