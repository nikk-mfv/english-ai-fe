import { axiosClient } from "@/services/axios";

export interface ITopic {
  name: string;
  userId: number;
}

export function CreateTopic<ITopic>(topic: ITopic) {
  return axiosClient.post("/topic", topic);
}
