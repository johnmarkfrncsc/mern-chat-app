import { useState } from "react";
import { SendHorizontal } from "lucide-react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="bg-[#0A1022] p-2">
      <div className="relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleEnterKey}
          className="w-full border rounded-full py-2 pl-4 pr-10 text-white bg-[#1e1f22] focus:outline-none"
          placeholder="Type a message..."
        />

        <SendHorizontal
          onClick={handleSend}
          className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-white transition"
        />
      </div>
    </div>
  );
};

export default MessageInput;
