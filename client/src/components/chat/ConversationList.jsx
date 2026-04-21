import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { AuthContext } from "../../context/authContext.jsx";
import useAuth from "../../hooks/useAuth.js";
import useChat from "../../hooks/useChat.js";
import useConversation from "../../hooks/useConversation.js";
import SearchUser from "./SearchUser.jsx";
import ConversationItem from "./ConversationItem.jsx";

const ConversationList = ({ setSelectedConversation }) => {
  const {
    conversations,
    searchQuery,
    setSearchQuery,
    searchResult,
    handleSelectUser,
    containerRef,
  } = useConversation();

  const [isOpen, setIsopen] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { onlineUsers } = useChat();
  const { logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsopen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {isOpen ? (
        <div className="w-64 h-screen bg-[#0A1022] text-gray-200 py-4 flex flex-col justify-between">
          <div>
            <header className="flex justify-around">
              <h2 className="text-xl">Next chat</h2>
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
              <div className="mt-4 flex flex-col gap-2">
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

          <div className="px-4">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-md text-sm font-medium
                 bg-[#050A1A] text-gray-300
                 hover:bg-[#0A1022] hover:text-white
                 transition-all duration-200
                 border border-transparent
                 hover:border-red-500/30
                 hover:shadow-[0_0_10px_rgba(239,68,68,0.15)]"
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className="w-20 bg-[#0A1022] text-gray-200 py-4">
          <header className="flex justify-around">
            <button onClick={toggleSidebar}>
              <Plus />
            </button>
          </header>
          <nav className="px-4 mt-10">
            <h5 className="uppercase text-xs text-gray-400">Direct Message</h5>

            {/* map convo list */}
            <div className="mt-4 flex flex-col gap-2">
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
