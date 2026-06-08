import { useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth.js";

const MessageSkeleton = ({ isOwn }) => (
  <div
    className={`flex ${isOwn ? "justify-end" : "justify-start"} animate-pulse`}
  >
    <div
      className={`h-8 rounded-4xl w-40 pl-3 pr-2.5 py-1.5 ${
        isOwn ? "bg-(--color-accent) opacity-30 rounded-br-md" : "rounded-bl-md"
      }`}
      style={
        !isOwn
          ? { backgroundColor: "var(--color-other-bubble)", opacity: 0.5 }
          : {}
      }
    />
  </div>
);

const MessageList = ({ messages, loading }) => {
  const { user } = useAuth();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-4">
        <MessageSkeleton isOwn={false} />
        <MessageSkeleton isOwn={true} />
        <MessageSkeleton isOwn={false} />
        <MessageSkeleton isOwn={true} />
        <MessageSkeleton isOwn={false} />
        <MessageSkeleton isOwn={true} />
      </div>
    );
  }

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
            <div>
              <div
                className={`max-w-xs pl-3 pr-2.5 py-1.5 shadow text-sm text-center wrap-break-word whitespace-pre-wrap ${
                  isOwn
                    ? "bg-(--color-accent) border border-(--color-hover) text-right text-white rounded-4xl rounded-br-md shadow-sm"
                    : "text-left text-gray-700 rounded-4xl rounded-bl-md shadow-sm"
                }`}
                style={
                  !isOwn
                    ? {
                        backgroundColor: "var(--color-other-bubble)",
                        borderColor: "var(--color-other-bubble)",
                      }
                    : {}
                }
              >
                <div>{message.text}</div>
              </div>
              <div
                className={`text-[10px] mt-1 text-gray-500
                  ${isOwn ? "text-right mr-0.5" : "text-left ml-0.5"}`}
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
