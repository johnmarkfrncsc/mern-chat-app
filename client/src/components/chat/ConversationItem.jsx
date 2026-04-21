const ConversationItem = ({ conv, otherUser, isOnline, onClick, isOpen }) => {
  const firstLetter = otherUser?.username.charAt(0).toUpperCase();
  const hasPhoto = otherUser?.profilePhoto && otherUser?.profilePhoto !== "";

  return (
    <>
      {isOpen ? (
        <div
          key={conv._id}
          onClick={onClick}
          className="p-2 bg-[#121626] rounded cursor-pointer hover:bg-[#1a213d] flex items-center gap-2"
        >
          {hasPhoto ? (
            <img
              src={otherUser?.profilePhoto}
              className="w-10 h-10  object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg text-amber-50 bg-indigo-500 flex items-center justify-center">
              {firstLetter}
            </div>
          )}
          <div
            className={`h-2 w-2 rounded-full items-center mt-1 ${isOnline ? "bg-green-500" : "bg-gray-500"}`}
          />
          {otherUser?.username || "Unknown user"}
        </div>
      ) : (
        <div
          onClick={onClick}
          className="flex justify-center cursor-pointer py-2"
        >
          {hasPhoto ? (
            <img
              src={otherUser?.profilePhoto}
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg text-amber-50 bg-indigo-500 flex items-center justify-center">
              {firstLetter}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ConversationItem;
