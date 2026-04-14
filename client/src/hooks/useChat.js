import { useContext } from "react";
import { SocketContext } from "../context/socketContext.jsx";

const useChat = () => useContext(SocketContext);

export default useChat;
