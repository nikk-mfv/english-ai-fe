import { useCreateConversation } from '@/hooks/use-conversation';
import { MessageCircleMore } from 'lucide-react';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const CreateConversation = memo(() => {
  const navigate = useNavigate();
  const { conversation, handleCreateConversation } = useCreateConversation();

  const submit = async () => {
    try {
      await handleCreateConversation({
        name: 'New Conversation',
        userId: 1,
      });
      toast.success('Conversation created successfully', {
        description: 'You can now start chatting with your new conversation',
        duration: 3000,
        position: 'bottom-left',
      });
    } catch (error) {
      toast.error('Failed to create conversation', {
        description: `Error: ${error}`,
        duration: 3000,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    if (conversation) {
      navigate(`/conversation/${conversation.iD}`);
    }
  }, [conversation, navigate]);

  return (
    <button className='btn' onClick={submit}>
      New Conversation
      <MessageCircleMore />
    </button>
  );
});

CreateConversation.displayName = 'CreateConversation';
