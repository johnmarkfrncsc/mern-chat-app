import { useState } from "react";
import { Plus } from "lucide-react";

const ConversationList = () => {
  const [isOpen, setIsopen] = useState(false);

  const ToogleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  return (
    <>
      <div className="flex h-screen">
        {isOpen === true ? (
          <div className="w-64 bg-[#0A1022] text-gray-200 py-4">
            <header className="flex justify-around">
              <h2 className="text-xl tracking-wide">Next chat</h2>
              <button
                className="bg-[#121626] px-1 py-0.5 hover:cursor-pointer"
                onClick={ToogleSidebar}
              >
                <Plus />
              </button>
            </header>
            <nav className="px-4 mt-10">
              <h5 className="uppercase text-xs font-bold text-gray-400 pl-3">
                Direct Message
              </h5>
            </nav>
          </div>
        ) : (
          <div className="w-20 bg-[#0A1022] text-gray-200 py-4">
            <header className="flex justify-around">
              <button
                className="bg-[#121626] px-1 py-0.5 hover:cursor-pointer"
                onClick={ToogleSidebar}
              >
                <Plus />
              </button>
            </header>
            <div className="border border-black mt-4" />
            <nav className="flex flex-col items-center justify-center mt-4 gap-2"></nav>
          </div>
        )}
      </div>
    </>
  );
};

export default ConversationList;
