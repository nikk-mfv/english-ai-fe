import { createMessage, IMessage } from "@/services/conversation";
import { useState } from "react";

export const useMessage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const sendMessage = async (message: string, conversationId: number) => {
    try {
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
    }
  };

  return {
    messages,
    sendMessage,    
  }
};
