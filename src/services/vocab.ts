import { axiosClient } from "@/services/axios";
import { ITopic } from "./topic";
export interface IVocabulary {
  iD: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  definition: string;
  example: string;
  pronunciation: string;
  topicIds?: number[];
  topics?: ITopic[];
}

export const createVocabulary = async (
  vocabulary: Pick<IVocabulary, "name" | "definition" | "example" | "pronunciation" | "topicIds">
) => {
  const response = await axiosClient.post("/vocab", vocabulary);
  return response.data;
};

export const getVocabulary = async (page: number) => {
  const response = await axiosClient.get<{
    data: IVocabulary[];
    paging: {
      total: number;
    };
  }>(`/vocab?page=${page}`);
  return response.data;
};

export const deleteVocabulary = async (id: number) => {
  const response = await axiosClient.delete(`/vocab/${id}`);
  return response.data;
};

export const updateVocabulary = async (
  id: number,
  vocabulary: Pick<IVocabulary, "name" | "definition" | "example" | "pronunciation" | "topicIds" >
) => {
  const response = await axiosClient.put(`/vocab/${id}`, vocabulary);
  return response.data;
};
