import chatSocket from "./chatSocket.js";

const registerSocketEvents = (io) => {
  chatSocket(io);
};

export default registerSocketEvents;
