import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { getUserConversations } from "../../api/chat.js";
import useAuth from "../../hooks/useAuth.js";
import { AuthContext } from "../../context/authContext.jsx";

const ConversationList = ({ setSelectedConversationId }) => {
  const [isOpen, setIsopen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsopen((prev) => !prev);
  };

  // load convo list
  useEffect(() => {
    const load = async () => {
      const res = await getUserConversations();

      setConversations(res.data);
    };

    load();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {isOpen ? (
        <div className="w-64 bg-[#0A1022] text-gray-200 py-4">
          <header className="flex justify-around">
            <h2 className="text-xl">Next chat</h2>

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

                return (
                  <div
                    key={conv._id}
                    onClick={() => setSelectedConversationId(conv._id)}
                    className="p-2 bg-[#121626] rounded cursor-pointer hover:bg-[#1a213d]"
                  >
                    {otherUser?.username || "Unknown user"}
                  </div>
                );
              })}
            </div>
          </nav>
          <button onClick={handleLogout}>Log out</button>
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
