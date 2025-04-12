import { ChatBox } from "@/components/chatbox";
import { useParams } from "react-router-dom";

export default function Conversation() {
  const { id } = useParams();

  return (
    <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      <ChatBox conversationId={Number(id)} />
    </div>
  );
}
