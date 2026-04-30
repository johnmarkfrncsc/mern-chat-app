import { useState, useEffect, useRef } from "react";
import { getUserConversations, createConversation } from "../api/chat.js";
import { searchUsers } from "../api/user.js";
import useChat from "./useChat.js";

const useConversation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [conversations, setConversations] = useState([]);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const { socket } = useChat();

  // load convo list
  useEffect(() => {
    const load = async () => {
      const res = await getUserConversations();
      setConversations(res.data);
    };

    load();
  }, []);

  // new conversation
  useEffect(() => {
    if (!socket) return;

    const handleNewConversation = (conversation) => {
      setConversations((prev) => {
        // prevent duplicate
        const exists = prev.find((c) => c._id === conversation._id);
        if (exists) return prev;

        return [conversation, ...prev];
      });
    };

    socket.on("newConversation", handleNewConversation);

    return () => {
      socket.off("newConversation", handleNewConversation);
    };
  }, [socket]);

  // profile photo update
  useEffect(() => {
    if (!socket) return;

    const handleUserUpdated = ({ _id, profilePhoto, username }) => {
      setConversations((prev) =>
        prev.map((conv) => ({
          ...conv,
          participants: conv.participants.map((p) =>
            p._id === _id ? { ...p, profilePhoto, username } : p,
          ),
        })),
      );
    };

    socket.on("userUpdated", handleUserUpdated);

    return () => {
      socket.off("userUpdated", handleUserUpdated);
    };
  }, [socket]);

  // user last seen update
  useEffect(() => {
    if (!socket) return;

    const handleUserLastSeen = ({ userId, lastSeen }) => {
      setConversations((prev) =>
        prev.map((conv) => ({
          ...conv,
          participants: conv.participants.map((p) =>
            p._id === userId ? { ...p, lastSeen } : p,
          ),
        })),
      );
    };

    socket.on("userLastSeen", handleUserLastSeen);
    return () => socket.off("userLastSeen", handleUserLastSeen);
  }, [socket]);

  // last message update
  useEffect(() => {
    if (!socket) return;

    const handleConversationUpdated = (updatedConversation) => {
      setConversations((prev) => {
        const exists = prev.find((c) => c._id === updatedConversation._id);
        if (!exists) return prev;

        // move updated conversation to top with new lastMessage
        const filtered = prev.filter((c) => c._id !== updatedConversation._id);
        return [updatedConversation, ...filtered];
      });
    };

    socket.on("conversationUpdated", handleConversationUpdated);
    return () => socket.off("conversationUpdated", handleConversationUpdated);
  }, [socket]);

  // debouncing search
  useEffect(() => {
    if (!searchQuery) {
      setSearchResult([]);
      return;
    }

    const timer = setTimeout(async () => {
      const result = await searchUsers(searchQuery);
      setSearchResult(result.data);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // click outside
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

  //loading state
  useEffect(() => {
    const load = async () => {
      const res = await getUserConversations();
      setConversations(res.data);
      setLoading(false);
    };
    load();
  }, []);

  const handleSelectUser = async (userId) => {
    await createConversation(userId);

    const res = await getUserConversations();
    setConversations(res.data);

    setSearchQuery("");
    setSearchResult([]);
  };

  return {
    conversations,
    searchQuery,
    setSearchQuery,
    searchResult,
    handleSelectUser,
    containerRef,
    loading,
  };
};

export default useConversation;
