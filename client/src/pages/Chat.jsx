import ChatBox from "../components/chat/ChatBox.jsx";
import ConversationList from "../components/chat/ConversationList.jsx";
import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/socketContext.jsx";
import useTimeAgo from "../hooks/useTimeAgo.js";

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { socket } = useContext(SocketContext);
  const timeAgo = useTimeAgo(selectedConversation?.lastSeen);

  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const handleOnlineUsers = (users) => {
      const isOnline = users.includes(selectedConversation.id);
      setSelectedConversation((prev) => (prev ? { ...prev, isOnline } : prev));
    };

    const handleUserLastSeen = ({ userId, lastSeen }) => {
      if (userId === selectedConversation.id) {
        setSelectedConversation((prev) =>
          prev ? { ...prev, lastSeen, isOnline: false } : prev,
        );
      }
    };

    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("userLastSeen", handleUserLastSeen);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("userLastSeen", handleUserLastSeen);
    };
  }, [socket, selectedConversation?.id]);

  return (
    <div className="h-screen flex overflow-hidden">
      <ConversationList
        setSelectedConversation={setSelectedConversation}
        selectedConversation={selectedConversation}
      />

      <div className="flex flex-col flex-1 bg-[#FFFFFF]">
        {/* Header */}
        <nav className="bg-[#FAFAFA] border-b border-[#E8E8E8] p-4 flex items-center">
          {selectedConversation ? (
            <div className="flex flex-col">
              <h3 className="text-[#2C5B52] text-lg font-semibold tracking-wide">
                {selectedConversation.username}
              </h3>
              <span className="text-xs text-gray-400">
                {selectedConversation.isOnline
                  ? "Online"
                  : timeAgo || "Offline"}
              </span>
            </div>
          ) : (
            <h3 className="text-[#2C5B52] text-lg font-semibold tracking-wide">
              Select a conversation
            </h3>
          )}
        </nav>

        {/* Chat area */}
        <div className="flex-1 overflow-hidden">
          {selectedConversation?.id ? (
            <ChatBox conversationId={selectedConversation?.id} />
          ) : (
            <div className="flex-1 flex items-center h-screen justify-center text-black">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
