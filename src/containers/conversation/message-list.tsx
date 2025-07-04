import { IMessage } from "@/services/conversation";
import { FC, useEffect, useRef } from "react";
import { format } from "date-fns";
import Markdown from "react-markdown";

type Prop = {
  messages: IMessage[];
};

export const MessageList: FC<Prop> = ({ messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="min-w-xl max-w-4xl mb-4 overflow-auto"
      style={{ height: "calc(100vh - 400px)" }}
    >
      {messages.map((item) => (
        <div key={item.iD}>
          {/* for AI */}
          {!item.isHuman ? (
            <div className="chat chat-start">
              <div className="chat-header">
                AI Support
                <time className="text-xs opacity-50">
                  {format(new Date(item.createdAt as Date), "dd/MM/yyyy HH:mm")}
                </time>
              </div>
              <div className="chat-bubble">
                <Markdown>{item.message}</Markdown>
              </div>
            </div>
          ) : (
            <div className="chat chat-end">
              <div className="chat-header">
                You
                <time className="text-xs opacity-50">
                  {format(new Date(item.createdAt as Date), "dd/MM/yyyy HH:mm")}
                </time>
              </div>
              <div className="chat-bubble">
                <Markdown>{item.message}</Markdown>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
