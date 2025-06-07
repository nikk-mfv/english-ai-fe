import { createMessage, IMessage } from "@/services/conversation";
import { useEffect, useState } from "react";
import { getAllMessages } from "@/services/message";

export const useMessage = (conversationId: number) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetMessages = async () => {
    const res = await getAllMessages(conversationId)
    setMessages(res.data.data)
    return messages
  }

  useEffect(() => {
    handleGetMessages()
  }, [])

  const sendMessage = async (message: string, conversationId: number) => {
    try {
      setIsLoading(true)
      const res = await createMessage(message, conversationId);

      const newMessages: IMessage[] = [
        {
          iD: Math.random(),
          message,
          isHuman: true,
          conversationId,
          userId: 1, // TODO: handle after authenticate feature
          createdAt: new Date()
        },
        {
          ...res.data.data,
        },
      ];

      setMessages([...messages, ...newMessages]);
    } catch (error) {
        throw new Error('error')
    } finally {
      setIsLoading(false)
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,    
  }
};
