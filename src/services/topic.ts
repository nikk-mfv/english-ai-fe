import { axiosClient } from "@/services/axios";
export interface ITopic {
  iD: number;
  name: string;
}

export function createTopic(topic: Pick<ITopic, "name">) {
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

export function updateTopic(id: number, topic: Pick<ITopic, "name">) {
  return axiosClient.put(`/topic/${id}`, topic);
}

export function deleteTopic(id: number) {
  return axiosClient.delete(`/topic/${id}`);
}
