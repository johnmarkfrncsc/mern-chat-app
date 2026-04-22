import { useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth.js";

const MessageList = ({ messages }) => {
  const { user } = useAuth();

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 px-4">
        <p className="text-md">No messages yet</p>
        <p className="text-sm mt-1">Start the conversation, Say hi👋</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {messages.map((message) => {
        const isOwn = message.sender._id === user?._id;

        return (
          <div
            key={message._id}
            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-1.5 rounded-lg shadow text-sm wrap-break-word whitespace-pre-wrap ${
                isOwn
                  ? "bg-green-500 text-right border border-[#54cd84] text-white"
                  : "bg-[#FAFAFA] text-left border border-[#E8EAEC] text-gray-700"
              }`}
            >
              {/* Message text */}
              <div>{message.text}</div>

              {/* Time */}
              <div
                className={`text-[10px] mt-1 
                  ${isOwn ? "text-right text-gray-100" : "text-left text-gray-400"}`}
              >
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
