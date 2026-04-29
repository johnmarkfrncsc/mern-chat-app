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

  return (
    <>
      {isOpen ? (
        <div
          className={`flex items-center gap-2 cursor-pointer p-1.5 rounded text-black
          ${isSelected ? "bg-[#F7F7F7]" : "hover:bg-[#F7F7F7]"}`}
          key={conv._id}
          onClick={onClick}
        >
          <div className="relative w-8 h-8 shrink-0">
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
              className={`absolute bottom-0 right-0.5 w-2 h-2 rounded-full 
                ring-2 ring-[#DFE1E5]
                ${isOnline ? "bg-green-500" : "bg-gray-500"}`}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-black tracking-wide text-sm truncate">
              {otherUser?.username || "Unknown user"}
            </span>
          </div>
        </div>
      ) : (
        <div
          onClick={onClick}
          className="flex justify-center cursor-pointer py-2"
        >
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
      )}
    </>
  );
};

export default ConversationItem;
