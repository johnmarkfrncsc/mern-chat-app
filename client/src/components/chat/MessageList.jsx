import { useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth.js";

const MessageList = ({ messages }) => {
  const { user } = useAuth();

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              className={`max-w-xs px-4 py-1.5 rounded-lg shadow text-sm ${
                isOwn
                  ? "bg-green-500 text-right text-white"
                  : "bg-gray-600 text-left text-white"
              }`}
            >
              {/* Username (only for received messages) */}
              {!isOwn && (
                <div className="text-xs font-semibold text-gray-200 mb-1">
                  {message.sender.username}
                </div>
              )}

              {/* Message text */}
              <div>{message.text}</div>

              {/* Time */}
              <div className="text-[10px] text-gray-200 mt-1 text-right">
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
