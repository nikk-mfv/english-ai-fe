import { axiosClient } from "@/services/axios";

export interface ITopic {
  iD: number;
  name: string;
  userId: number;
}

export function createTopic(topic: Pick<ITopic, "name" | "userId">) {
  return axiosClient.post("/topic", topic);
}

export function getTopics(page: number) {
  return axiosClient.get<{
    data: ITopic[];
    paging: {
      total: number;
    };
  }>(`/topic?page=${page}`);
}