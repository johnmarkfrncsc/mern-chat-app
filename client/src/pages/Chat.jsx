import ChatBox from "../components/chat/ChatBox.jsx";
import ConversationList from "../components/chat/ConversationList.jsx";
import { useState } from "react";

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="h-screen flex overflow-hidden">
      <ConversationList
        setSelectedConversation={setSelectedConversation}
        selectedConversation={selectedConversation}
      />

      <div className="flex flex-col flex-1 bg-[#050A1A]">
        {/* Header */}
        <nav className="border-b border-gray-700 p-4 flex items-center">
          <h3 className="text-white text-lg">
            {selectedConversation?.username || "Select a conversation"}{" "}
          </h3>
        </nav>

        {/* Chat area */}
        <div className="flex-1 overflow-hidden">
          {selectedConversation?.id ? (
            <ChatBox conversationId={selectedConversation?.id} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
