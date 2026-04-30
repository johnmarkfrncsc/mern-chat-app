import ChatBox from "../components/chat/ChatBox.jsx";
import ConversationList from "../components/chat/conversation/ConversationList.jsx";
import UserProfilePanel from "../components/chat/UserProfilePannel.jsx";
import ChatHeader from "../components/chat/ChatHeader.jsx";
import { useState, useContext, useEffect, useRef } from "react";
import { SocketContext } from "../context/socketContext.jsx";
import useTimeAgo from "../hooks/useTimeAgo.js";

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileView, setMobileView] = useState("list");
  const { socket } = useContext(SocketContext);
  const timeAgo = useTimeAgo(selectedConversation?.lastSeen);

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 60 && mobileView === "chat") {
      setMobileView("list");
      setShowProfile(false);
    }
    touchStartX.current = null;
  };

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
    setMobileView("chat");
  };

  useEffect(() => {
    setShowProfile(false);
  }, [selectedConversation?.id]);

  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const handleOnlineUsers = (users) => {
      const isOnline = users.includes(selectedConversation.userId);
      setSelectedConversation((prev) => (prev ? { ...prev, isOnline } : prev));
    };

    const handleUserLastSeen = ({ userId, lastSeen }) => {
      if (userId === selectedConversation.userId) {
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
    <div
      className="h-screen flex overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Conversation List */}
      <div
        className={`shrink-0 w-full md:w-auto ${mobileView === "chat" ? "hidden" : "flex"} md:flex`}
      >
        <ConversationList
          setSelectedConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
        />
      </div>

      {/* Chat area */}
      <div
        className={`flex flex-col flex-1 bg-[#FFFFFF] min-w-0 ${mobileView === "list" ? "hidden" : "flex"} md:flex`}
      >
        <nav className="bg-[#FAFAFA] border-b border-[#E8E8E8] p-4 flex items-center gap-2">
          <ChatHeader
            selectedConversation={selectedConversation}
            timeAgo={timeAgo}
            showProfile={showProfile}
            setShowProfile={setShowProfile}
            onBack={() => {
              setMobileView("list");
              setShowProfile(false);
            }}
          />
        </nav>

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
        <div className="fixed inset-0 z-50 md:static md:inset-auto md:z-auto flex">
          <div
            className="flex-1 bg-black/40 md:hidden"
            onClick={() => setShowProfile(false)}
          />
          <UserProfilePanel
            userId={selectedConversation.userId}
            onClose={() => setShowProfile(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
