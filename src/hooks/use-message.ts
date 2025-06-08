import { createMessage, IMessage } from "@/services/conversation";
import { useEffect, useState } from "react";
import { getAllMessages } from "@/services/message";
import { useAuth } from "./use-auth";

export const useMessage = (conversationId: number) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth()

  const handleGetMessages = async () => {
    const res = await getAllMessages(conversationId)
    setMessages(res.data.data)
    return messages
  }

  useEffect(() => {
    handleGetMessages()
  }, [])

  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true)
      const res = await createMessage(message, conversationId);

      const newMessages: IMessage[] = [
        {
          iD: Math.random(),
          message,
          isHuman: true,
          conversationId,
          userId: user?.userId || 0,
          createdAt: new Date()
        },
        {
          ...res.data.data,
        },
      ];

      setMessages([...messages, ...newMessages]);
      return res.data.data.message
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
