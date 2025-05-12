import { axiosClient } from "./axios";

export interface IMessage {
  iD: number;
  message: string;
  userId: number;
  conversationId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isHuman: boolean;
}

interface IUser {
  iD: number;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IConversation {
  iD: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  deletedAt: Date | null;
  messages?: IMessage[];
  user?: IUser;
}

export const createConversation = async (
  conversation: Pick<IConversation, "name" | "userId">
) => {
  return axiosClient.post<{ data: IConversation }>(
    "/conversation",
    conversation
  );
};

export const createMessage = async (
  message: string,
  conversationId: number
) => {
  return axiosClient.post<{data: IMessage}>("/message", { message, conversationId });
};
