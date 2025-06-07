import { axiosClient } from "./axios"
import { IMessage } from "./conversation"

export const getAllMessages = (conversationId: number) => {
    return axiosClient.get<{data: IMessage[]}>(`/message?conversation_id=${conversationId}`)
}