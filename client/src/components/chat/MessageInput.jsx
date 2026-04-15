import { useState } from "react";

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
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleEnterKey}
        className="border p-2 rounded w-full text-white"
        placeholder="Type a message..."
      />

      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
