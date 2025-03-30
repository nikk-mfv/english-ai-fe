import { axiosClient } from './axios';

interface IMessage {
  iD: string;
  message: string;
  userId: Date;
  conversationId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt: Date | null;
}

interface IUser {
  iD: string;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IConversation {
  iD: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  deletedAt: Date | null;
  messages?: IMessage[];
  user?: IUser;
}

export const createConversation = async (
  conversation: Pick<IConversation, 'name' | 'userId'>
) => {
  return axiosClient.post<{ data: IConversation }>(
    '/conversation',
    conversation
  );
};
