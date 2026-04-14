import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./authContext.jsx";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:8080");
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected: ", newSocket.id);
      });
      return () => newSocket.disconnect();
    } else {
      socket?.disconnect();
      setSocket(null);
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
