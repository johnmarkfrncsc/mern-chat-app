import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { getUserConversations, createConversation } from "../../api/chat.js";
import useAuth from "../../hooks/useAuth.js";
import useChat from "../../hooks/useChat.js";
import { AuthContext } from "../../context/authContext.jsx";
import searchUsers from "../../api/user.js";

const ConversationList = ({
  setSelectedConversationId,
  setSelectedUsername,
}) => {
  const [isOpen, setIsopen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth();
  const { onlineUsers } = useChat();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsopen((prev) => !prev);
  };

  const containerRef = useRef(null);

  // load convo list
  useEffect(() => {
    const load = async () => {
      const res = await getUserConversations();

      setConversations(res.data);
    };

    load();
  }, []);

  //debouncing
  useEffect(() => {
    if (!searchQuery) {
      setSearchResult([]);
      return;
    }
    const timer = setTimeout(async () => {
      const result = await searchUsers(searchQuery);
      setSearchResult(result.data);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  //ref for clickoutside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSearchQuery("");
        setSearchResult([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectUser = async (userId) => {
    await createConversation(userId);
    const res = await getUserConversations();
    setConversations(res.data);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResult([]);
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

            <div ref={containerRef} className="w-full max-w-xl mt-10 px-3">
              {/* Search Bar */}
              <div
                className="flex items-center bg-[#1A213D] border border-[#2b2d31] rounded-xl px-3 py-2
               focus-within:border-blue-600"
              >
                <Search className="text-gray-400 mr-2" size={18} />

                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm text-gray-200 w-full placeholder-gray-400"
                />
              </div>

              {/* Results */}
              {searchQuery && (
                <div className="mt-2 bg-[#1A213D] border border-[#2b2d31] rounded-lg overflow-hidden">
                  {searchResult.length > 0 ? (
                    searchResult.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => handleSelectUser(user._id)}
                        className="px-3 py-2 text-sm text-gray-200 cursor-pointer hover:bg-[#2b2d31]"
                      >
                        {user.username}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-400">
                      No user found
                    </div>
                  )}
                </div>
              )}
            </div>

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
                    <div
                      key={conv._id}
                      onClick={() => {
                        setSelectedConversationId(conv._id);
                        setSelectedUsername(otherUser?.username);
                      }}
                      className="p-2 bg-[#121626] rounded cursor-pointer hover:bg-[#1a213d] flex items-center gap-2"
                    >
                      <div
                        className={`h-2 w-2 rounded-full items-center mt-1 ${isOnline ? "bg-green-500" : "bg-gray-500"}`}
                      />
                      {otherUser?.username || "Unknown user"}
                    </div>
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
        </div>
      )}
    </>
  );
};

export default ConversationList;
