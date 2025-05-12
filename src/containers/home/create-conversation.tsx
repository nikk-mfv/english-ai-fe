import { useCreateConversation } from "@/hooks/use-conversation";
import { MessageCircleMore } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const CreateConversation = memo(() => {
  const navigate = useNavigate();
  const { conversation, handleCreateConversation } = useCreateConversation();
  const [conversationName, setConversationName] = useState<string>('')

  const submit = async (e: any) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (!conversationName || conversationName.length > 30) return
    try {
      await handleCreateConversation({
        name: conversationName,
        userId: 1,
      });
      toast.success("Conversation created successfully", {
        description: "You can now start chatting with your new conversation",
        duration: 3000,
        position: "bottom-left",
      });
    } catch (error) {
      toast.error("Failed to create conversation", {
        description: `Error: ${error}`,
        duration: 3000,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    if (conversation) {
      navigate(`/conversation/${conversation.iD}`);
    }
  }, [conversation, navigate]);

  return (
    <form onSubmit={submit} className="text-center">
      <button className="btn mb-2" type="submit">
        New Conversation
        <MessageCircleMore />
      </button>

      <input
        value={conversationName}
        onChange={e => setConversationName(e.target.value)}
        type="text"
        className="input validator"
        required
        placeholder="Conversation name"
        minLength={1}
        maxLength={30}
        title="Only letters, numbers or dash"
      />
      <p className="validator-hint">
        Must be 1 to 30 characters
        <br />
        containing only letters, numbers or dash
      </p>
    </form>
  );
});

CreateConversation.displayName = "CreateConversation";
