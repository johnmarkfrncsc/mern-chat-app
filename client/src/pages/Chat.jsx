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

      <div className="flex flex-col flex-1 bg-[#FFFFFF]">
        {/* Header */}
        <nav className="bg-[#FAFAFA] border-b border-[#E8E8E8] p-4 flex items-center">
          <h3 className="text-[#2C5B52] text-lg font-semibold tracking-wide">
            {selectedConversation?.username || "Select a conversation"}{" "}
          </h3>
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
    </div>
  );
};

export default Chat;
