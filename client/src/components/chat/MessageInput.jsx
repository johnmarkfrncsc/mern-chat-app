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
    <div className="bg-[#FFFFFF] p-2">
      <div className="relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleEnterKey}
          className="w-full border-2 rounded-full py-2 pl-4 pr-10 text-black bg-[#F6F6F6] border-[#DFE1E5] focus:outline-none"
          placeholder="Type a message..."
        />

        <SendHorizontal
          onClick={handleSend}
          className="w-5 h-5 text-[#29665B] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-white transition"
        />
      </div>
    </div>
  );
};

export default MessageInput;
