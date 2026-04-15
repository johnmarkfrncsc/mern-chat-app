import ConversationList from "../components/chat/ConversationList.jsx";

const Chat = () => {
  return (
    <div className="min-h-screen  flex">
      <ConversationList />
      <div className="w-full bg-[#050A1A]">
        <nav className="border-b-gray-500 border p-4 gap-2 flex items-center ">
          <div className="h-3 w-3 bg-green-500 rounded-2xl" />
          <h3 className="text-white text-lg">Alex Rivera</h3>
        </nav>

        <main>
          <div></div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
