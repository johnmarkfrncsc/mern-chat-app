import { useState, useEffect, useRef } from "react";
import { getUserConversations, createConversation } from "../../api/chat.js";
import searchUsers from "../../api/user.js";

const useConversation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [conversations, setConversations] = useState([]);
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
  };
};

export default useConversation;
