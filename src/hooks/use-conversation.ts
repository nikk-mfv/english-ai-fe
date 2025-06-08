import { createConversation, IConversation } from '@/services/conversation';
import { useState } from 'react';

export const useCreateConversation = () => {
  const [conversation, setConversation] = useState<IConversation | null>(null);

  const handleCreateConversation = async (
    cv: Pick<IConversation, 'name'>
  ) => {
    const response = await createConversation(cv);
    setConversation(response.data.data);
  };

  return {
    conversation,
    handleCreateConversation,
  };
};
