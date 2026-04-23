import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import useAuth from "../../hooks/useAuth.js";
import useChat from "../../hooks/useChat.js";
import useConversation from "../../hooks/useConversation.js";
import SearchUser from "./SearchUser.jsx";
import ConversationItem from "./ConversationItem.jsx";
import UserCard from "../ui/UserCard.jsx";
import SettingsModal from "../ui/SettingsModal.jsx";

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
        <div className="w-64 h-screen bg-[#FFFFFF] text-black py-4 flex flex-col justify-between border-r border-[#EBEBEB]">
          <div>
            <header className="flex justify-around">
              <h2 className="text-xl font-bold font-serif text-[#29665B]">
                Next chat
              </h2>
              <button onClick={toggleSidebar}>
                <Plus />
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
                      isOpen={isOpen}
                      isSelected={selectedConversation?.id === conv._id}
                      onClick={() =>
                        setSelectedConversation({
                          id: conv._id,
                          username: otherUser?.username,
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
              <SettingsModal onClose={() => setIsSettingsOpen(false)} />
            )}
          </div>
        </div>
      ) : (
        <div className="w-20 bg-[#FFFFFF] text-black py-4">
          <header className="flex justify-around">
            <button onClick={toggleSidebar}>
              <Plus />
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
                        username: otherUser?.username,
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
