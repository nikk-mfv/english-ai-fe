import { axiosClient } from "@/services/axios";

export interface ITopic {
  name: string;
  userId: number;
}

export function createTopic<ITopic>(topic: ITopic) {
  return axiosClient.post("/topic", topic);
}

export function getTopics() {
  return axiosClient.get("/topic");
}
