import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PanelRightOpen, PanelRightClose } from "lucide-react";
import useAuth from "../../../hooks/useAuth.js";
import useChat from "../../../hooks/useChat.js";
import useConversation from "../../../hooks/useConversation.js";
import SearchUser from "../SearchUser.jsx";
import ConversationItem from "./ConversationItem.jsx";
import UserCard from "../../ui/UserCard.jsx";
import Settings from "../../ui/Settings.jsx";
import ConversationSkeleton from "./ConversationSkeleton.jsx";

const ConversationList = ({
  setSelectedConversation,
  selectedConversation,
}) => {
  const {
    conversations,
    searchQuery,
    setSearchQuery,
    searchResult,
    handleSelectUser,
    containerRef,
    loading,
  } = useConversation();

  const [isOpen, setIsopen] = useState(true);
  const { user } = useAuth();
  const { onlineUsers } = useChat();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsopen((prev) => !prev);
  };

  return (
    <>
      {isOpen ? (
        <div className="w-full h-screen bg-[#FFFFFF] text-black py-4 flex flex-col justify-between border-r border-[#EBEBEB]">
          <div>
            <header className="flex justify-center md:justify-between px-4">
              <div className="flex">
                <h2 className="text-xl font-bold font-serif text-(--color-accent)">
                  Tsika
                </h2>
                <img src="logo.svg" alt="logo" className="w-9 h-8" />
              </div>

              <button
                onClick={toggleSidebar}
                className="hidden md:block cursor-pointer hover:text-teal-700 transition"
              >
                <PanelRightOpen strokeWidth={1} />
              </button>
            </header>

            <SearchUser
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResult={searchResult}
              handleSelectUser={handleSelectUser}
              containerRef={containerRef}
            />

            <nav className="px-4 mt-10">
              <h5 className="uppercase text-xs text-gray-400">
                Direct Message
              </h5>

              {/* map convo list */}
              <div className="mt-4 flex flex-col gap-1">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <ConversationSkeleton key={i} />
                    ))
                  : conversations.map((conv) => {
                      const otherUser = conv.participants.find(
                        (p) => p._id !== user?._id,
                      );
                      const isOnline = onlineUsers.includes(otherUser?._id);
                      return (
                        <ConversationItem
                          key={conv._id}
                          conv={conv}
                          otherUser={otherUser}
                          isOnline={isOnline}
                          isOpen={isOpen}
                          isSelected={selectedConversation?.id === conv._id}
                          onClick={() =>
                            setSelectedConversation({
                              id: conv._id,
                              userId: otherUser?._id,
                              username: otherUser?.username,
                              profilePhoto: otherUser?.profilePhoto,
                              lastSeen: otherUser?.lastSeen,
                              isOnline: isOnline,
                            })
                          }
                        />
                      );
                    })}
              </div>
            </nav>
          </div>

          <div className="mx-2 my-2">
            <UserCard onSettingsClick={() => setIsSettingsOpen(true)} />
            {isSettingsOpen && (
              <Settings onClose={() => setIsSettingsOpen(false)} />
            )}
          </div>
        </div>
      ) : (
        <div className="w-20 bg-[#FFFFFF] text-black py-4 border-r border-[#EBEBEB]">
          <header className="flex justify-around">
            <button
              onClick={toggleSidebar}
              className="cursor-pointer hover:text-teal-700 transition"
            >
              <PanelRightClose strokeWidth={1} />
            </button>
          </header>
          <nav className="px-4 mt-10">
            <h5 className="uppercase text-xs text-gray-400">Direct Message</h5>

            {/* map convo list */}
            <div className="mt-4 flex flex-col gap-1">
              {conversations.map((conv) => {
                const otherUser = conv.participants.find(
                  (p) => p._id !== user?._id,
                );
                const isOnline = onlineUsers.includes(otherUser?._id);
                return (
                  <ConversationItem
                    key={conv._id}
                    conv={conv}
                    otherUser={otherUser}
                    isOnline={isOnline}
                    isOpen={false}
                    isSelected={selectedConversation?.id === conv._id}
                    onClick={() =>
                      setSelectedConversation({
                        id: conv._id,
                        userId: otherUser?._id,
                        username: otherUser?.username,
                        profilePhoto: otherUser?.profilePhoto,
                        lastSeen: otherUser?.lastSeen,
                        isOnline: isOnline,
                      })
                    }
                  />
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default ConversationList;
