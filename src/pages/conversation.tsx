import AudioChatPopup from "@/components/audio-chat-popup";
import { ChatBox } from "@/components/chatbox";
import { useMessage } from "@/hooks/use-message";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Conversation() {
  const { id } = useParams();
  const [openVoiceChat, setOpenVoiceChat] = useState<boolean>(false);
  const { sendMessage, isLoading, messages } = useMessage(Number(id));

  return (
    <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      <ChatBox
        sendMessage={sendMessage}
        messages={messages}
        isLoading={isLoading}
      />

      <button
        className="btn btn-primary btn-circle btn-lg fixed bottom-2 right-[30%] z-50 shadow-lg animate-pulse transition-transform hover:scale-110"
        onClick={() => setOpenVoiceChat(true)}
        aria-label="Trò chuyện audio với AI BOT"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18v2m6-2a6 6 0 0 1-12 0m6-15a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z"
          />
        </svg>
      </button>
      {openVoiceChat && (
        <AudioChatPopup
          open={openVoiceChat}
          onClose={() => {
            setOpenVoiceChat(false);
          }}
          isLoading={isLoading}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
}
