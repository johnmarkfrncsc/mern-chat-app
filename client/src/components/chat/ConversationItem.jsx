const ConversationItem = ({ conv, otherUser, isOnline, onClick }) => {
  return (
    <div
      key={conv._id}
      onClick={onClick}
      className="p-2 bg-[#121626] rounded cursor-pointer hover:bg-[#1a213d] flex items-center gap-2"
    >
      <div
        className={`h-2 w-2 rounded-full items-center mt-1 ${isOnline ? "bg-green-500" : "bg-gray-500"}`}
      />
      {otherUser?.username || "Unknown user"}
    </div>
  );
};

export default ConversationItem;
