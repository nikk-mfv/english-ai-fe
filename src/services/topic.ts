import { axiosClient } from '@/services/axios';

export interface ITopic {
    name: string;
    userId: number;
}

export function createTopic (topic: ITopic) {
    return axiosClient.post(
        '/topic',
        topic
      );
}

// export const getTopics = async() => {
//     const respone = await axiosClient.get<[ITopic]>('/topic')
//     return respone.data
// }
