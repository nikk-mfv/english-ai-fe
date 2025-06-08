import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type AudioChatPopupProp = {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  sendMessage: (text: string) => Promise<string>;
};

const AudioChatPopup = ({
  open = false,
  isLoading,
  onClose,
  sendMessage,
}: AudioChatPopupProp) => {
  const { user } = useAuth();
  const {
    listening,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSendMessage = async () => {
    if (finalTranscript) {
      const AIMess = await sendMessage(finalTranscript);
      handleSpeech(AIMess);
    }
  };

  const handleSpeech = (text: string) => {
    if (!text) return;

    const value = new SpeechSynthesisUtterance(text);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.speak(value);
      setIsSpeaking(true);
      value.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  const handleClose = async () => {
    resetTranscript();
    console.log(listening, "listening");
    if (listening) SpeechRecognition.stopListening();
    window.speechSynthesis.cancel();

    onClose();
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition || isLoading || isSpeaking)
      return;

    SpeechRecognition.startListening({ continuous: false, language: "en-US" });
  }, [browserSupportsSpeechRecognition, isLoading, isSpeaking]);

  useEffect(() => {
    handleSendMessage();
  }, [finalTranscript]);

  if (!open) return null;

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="modal modal-open">
        <div className="modal-box bg-base-100 flex flex-col items-center gap-4">
          <span className="text-3xl mb-2 font-semibold flex items-center gap-2">
            <span className="avatar online">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://api.dicebear.com/6.x/initials/svg?seed=User"
                  alt="User"
                />
              </div>
            </span>
            {user?.username}
            <span className="mx-2 animate-pulse text-primary">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="currentColor"
                  opacity="0.15"
                />
                <path
                  d="M12 18v2m6-2a6 6 0 0 1-12 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect
                  x="9"
                  y="8"
                  width="6"
                  height="7"
                  rx="3"
                  fill="currentColor"
                />
              </svg>
            </span>
            BOT AI
            <span className="avatar online">
              <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://api.dicebear.com/6.x/bottts/svg"
                  alt="AI Bot"
                />
              </div>
            </span>
          </span>
          <div className="flex flex-col items-center gap-2">
            <span className="text-lg text-base-content">
              You are in a calling...
            </span>
            <span className="loading loading-bars loading-lg text-primary"></span>
            <button
              type="button"
              className={`btn btn-error btn-circle`}
              aria-label="Stop speech"
              onClick={() => {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }}
            >
              {/* Heroicons solid stop icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <rect width="12" height="12" x="4" y="4" rx="2" />
              </svg>
            </button>
          </div>
          <div className="modal-action">
            <button className="btn btn-sm btn-error" onClick={handleClose}>
              End calling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioChatPopup;
