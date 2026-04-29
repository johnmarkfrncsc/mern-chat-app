import ChatBox from "../components/chat/ChatBox.jsx";
import ConversationList from "../components/chat/ConversationList.jsx";
import UserProfilePanel from "../components/chat/UserProfilePannel.jsx";
import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/socketContext.jsx";
import useTimeAgo from "../hooks/useTimeAgo.js";
import { Ellipsis } from "lucide-react";

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const { socket } = useContext(SocketContext);
  const timeAgo = useTimeAgo(selectedConversation?.lastSeen);

  // close panel when switching conversations
  useEffect(() => {
    setShowProfile(false);
  }, [selectedConversation?.id]);

  //header refresh
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

      <div className="flex flex-col flex-1 bg-[#FFFFFF] min-w-0">
        {/* Header */}
        <nav className="bg-[#FAFAFA] border-b border-[#E8E8E8] p-4 flex items-center gap-2">
          {selectedConversation ? (
            <>
              <div className="relative w-9 h-9 shrink-0">
                {selectedConversation.profilePhoto ? (
                  <img
                    src={selectedConversation.profilePhoto}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm">
                    {selectedConversation.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-[#2C5B52] text-lg font-semibold tracking-wide leading-tight">
                  {selectedConversation.username}
                </h3>
                <span className="text-xs text-gray-400">
                  {selectedConversation.isOnline
                    ? "Online"
                    : timeAgo || "Offline"}
                </span>
              </div>

              {/* Icon button */}
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                className={`p-1.5 rounded-md transition cursor-pointer
                  ${showProfile ? "bg-[#EFEFEF] text-[#2C5B52]" : "text-gray-400 hover:text-[#2C5B52] hover:bg-[#EFEFEF]"}`}
              >
                <Ellipsis size={20} />
              </button>
            </>
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

      {/* Profile Panel */}
      {showProfile && selectedConversation && (
        <UserProfilePanel
          userId={selectedConversation.userId}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default Chat;
