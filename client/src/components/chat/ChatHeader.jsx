import { ArrowLeft, Ellipsis } from "lucide-react";

const ChatHeader = ({
  selectedConversation,
  timeAgo,
  showProfile,
  setShowProfile,
  onBack,
}) => {
  if (!selectedConversation) {
    return (
      <h3 className="text-[#2C5B52] text-lg font-semibold tracking-wide">
        Select a conversation
      </h3>
    );
  }

  return (
    <>
      <button
        onClick={onBack}
        className="md:hidden text-gray-400 hover:text-[#2C5B52] mr-1"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="relative w-9 h-9 shrink-0">
        {selectedConversation.profilePhoto ? (
          <img
            src={selectedConversation.profilePhoto}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm">
            {selectedConversation.username?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <h3
          className="text-lg font-semibold tracking-wide leading-tight"
          style={{ color: "var(--color-accent)" }}
        >
          {selectedConversation.username}
        </h3>
        <span className="text-xs text-gray-400">
          {selectedConversation.isOnline ? "Online" : timeAgo || "Offline"}
        </span>
      </div>

      <button
        onClick={() => setShowProfile((prev) => !prev)}
        className={`p-1.5 rounded-md transition cursor-pointer
    hover:text-(--color-accent) hover:bg-[#EFEFEF]
    ${showProfile ? "text-(--color-accent) bg-[#EFEFEF]" : "text-gray-400"}`}
      >
        <Ellipsis size={20} />
      </button>
    </>
  );
};

export default ChatHeader;
