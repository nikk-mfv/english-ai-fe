import { axiosClient } from '@/services/axios';

export interface IVocabulary {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  definition: string;
  pronunciation: string;
}

export const createVocabulary = async (
  vocabulary: Pick<IVocabulary, 'name' | 'definition' | 'pronunciation'>
) => {
  const response = await axiosClient.post('/vocab', vocabulary);
  return response.data;
};

export const getVocabulary = async () => {
  const response = await axiosClient.get<IVocabulary[]>('/vocab');
  return response.data;
};
