import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { getMessages, sendMessage } from "../../api/chat.js";
import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";
import useChat from "../../hooks/useChat.js";

const ChatBox = ({ conversationId, senderId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { socket } = useChat();

  // load msg
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const res = await getMessages(conversationId, senderId);
      setMessages(res.data);
      setLoading(false);
    };

    if (conversationId) fetchMessages();
  }, [conversationId]);

  // listen to msg real time
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket]);

  // join conversation
  useEffect(() => {
    if (!socket || !conversationId) return;
    socket.emit("joinRoom", conversationId);
  }, [socket, conversationId]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    socket.emit("sendMessage", {
      conversationId,
      senderId: user._id,
      text,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar">
        <MessageList messages={messages} loading={loading} />
      </div>
      <div className="pt-2">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatBox;
