import { getAllConversation, IConversation } from "@/services/conversation";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [conversation, setConversation] = useState<IConversation[]>([]);

  const navigate = useNavigate();

  const handleGetAllConversation = async () => {
    const { data } = await getAllConversation();
    setConversation(data.data);
  };

  useEffect(() => {
    handleGetAllConversation();
  }, []);

  if (!conversation || conversation.length === 0)
    return (
      <div>
        <div>
          <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold">Create your new conversation</h1>
            <div className="max-w-sx mb-5">
              <button className="btn w-full mt-5" onClick={() => navigate("/")}>
                Create
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center">History List</h1>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-center">
            No history has found
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-[700px] mx-auto">
      <h2 className="text-2xl font-bold ">Conversation history</h2>

      <ul className="list bg-base-100 rounded-box shadow-md">
        {conversation.map((item, index) => (
          <li className="list-row" key={item.iD}>
            <div className="text-4xl font-thin opacity-30 tabular-nums">
              {index + 1}
            </div>
            <div className="list-col-grow">
              <div>{item.name}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {new Date(item.createdAt).toDateString()}
              </div>
            </div>
            <button
              onClick={() => navigate(`/conversation/${item.iD}`)}
              className="btn btn-square btn-ghost"
            >
              <MessageCircle />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
