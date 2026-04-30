const ConversationItem = ({
  conv,
  otherUser,
  isOnline,
  onClick,
  isOpen,
  isSelected,
}) => {
  const firstLetter = otherUser?.username.charAt(0).toUpperCase();
  const hasPhoto = otherUser?.profilePhoto && otherUser?.profilePhoto !== "";
  const lastMessage = conv?.lastMessage?.text || "";
  const timestamp = conv?.updatedAt
    ? new Date(conv.updatedAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <>
      {/* Desktop sidebar */}
      {isOpen ? (
        <div
          className={`flex items-center gap-2 cursor-pointer p-1.5 rounded text-black
            ${isSelected ? "bg-[#F7F7F7]" : "hover:bg-[#F7F7F7]"}
            
            md:flex-row md:p-1.5 md:rounded

            flex-row p-3 rounded-xl
          `}
          key={conv._id}
          onClick={onClick}
        >
          {/* Avatar */}
          <div className="relative shrink-0 w-8 h-8">
            {hasPhoto ? (
              <img
                src={otherUser?.profilePhoto}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                {firstLetter}
              </div>
            )}
            <div
              className={`absolute bottom-0 right-0.5 w-2.5 h-2.5 rounded-full
                ring-2 ring-white
                ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-black text-sm truncate">
                {otherUser?.username || "Unknown user"}
              </span>
              {/* Timestamp */}
              {timestamp && (
                <span className="text-xs text-gray-400 shrink-0 ml-2">
                  {timestamp}
                </span>
              )}
            </div>

            {lastMessage && (
              <span className="text-xs text-gray-400 truncate mt-0.5">
                {lastMessage}
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Desktop collapsed sidebar */
        <div
          onClick={onClick}
          className="flex justify-center cursor-pointer py-2"
        >
          <div className="relative w-10 h-10">
            {hasPhoto ? (
              <img
                src={otherUser?.profilePhoto}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full text-amber-50 bg-indigo-500 flex items-center justify-center">
                {firstLetter}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationItem;
