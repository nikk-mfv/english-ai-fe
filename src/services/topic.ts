import { axiosClient } from '@/services/axios';

type Topic = {
    name: string;
    userId: number;
}

export function createTopic(topic: Topic){
    axiosClient({
        method: 'post',
        url: '/topic',
        data: topic
      });
}

