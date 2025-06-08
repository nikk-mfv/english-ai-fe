import { MessageList } from "@/containers/conversation/message-list";
import { IMessage } from "@/services/conversation";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface ChatInput {
  message: string;
}

type Prop = {
  isLoading: boolean;
  messages: IMessage[];
  sendMessage: (text: string) => Promise<string>
};

export function ChatBox({ sendMessage, isLoading, messages }: Prop) {
  const { handleSubmit } = useForm<ChatInput>();
  const [textInput, setTextInput] = useState("");

  const { finalTranscript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    setTextInput(finalTranscript);
  }, [finalTranscript]);

  const onSubmit: SubmitHandler<ChatInput> = async () => {
    await sendMessage(textInput);
    setTextInput('')
  };

  const clickMicrophone = () => {
    if (browserSupportsSpeechRecognition) {
      if (listening) {
        SpeechRecognition.stopListening();
      } else {
        SpeechRecognition.startListening();
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <MessageList messages={messages} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-2 min-w-xl max-w-4xl rounded-lg p-4 shadow-lg fixed bottom-[70px] left-[50%] -translate-x-[50%]"
      >
        <h1 className="text-2xl font-medium m-4">What can I help with?</h1>
        <textarea
          className="w-full top-0 left-0  h-auto min-h-[3rem] resize-none focus:outline-none"
          placeholder="Ask anything"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <p className="text-sm text-gray-500">
          Speech Recognition: {listening ? "on" : "off"}
        </p>
        <div className="flex justify-between items-center">
          <fieldset disabled={browserSupportsSpeechRecognition}>
            <Mic onClick={clickMicrophone} className="cursor-pointer" />
          </fieldset>
          <button
            className="self-end btn btn-neutral"
            type="submit"
            disabled={!textInput.trim()}
          >
            {isLoading && (<span className="loading loading-spinner" />)}
            
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
