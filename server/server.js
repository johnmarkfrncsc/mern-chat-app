import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectMONGODB from "./src/config/db.js";
import { createSocketServer } from "./src/config/socket.js";
import registerSocketEvents from "./src/socket/index.js";

// env
dotenv.config();

// port
const PORT = process.env.PORT || 8080;

// server
const server = http.createServer(app);

// io
const io = createSocketServer(server);
registerSocketEvents(io);

//connect to db
connectMONGODB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

/*
-- SERVER TESTING -- 

TERMMINAL : 

Connected to MONGODB successfully
Server running on http://localhost:8080
a user connected NjxwuIMy16DPCgF7AAAB
a user joined room : 69dc7d1a78918a27e46fae95
user disconnected: NjxwuIMy16DPCgF7AAAB
a user connected X3GMiU3Qsq1TgvamAAAD
user disconnected: NjxwuIMy16DPCgF7AAAB
a user connected X3GMiU3Qsq1TgvamAAAD
a user connected X3GMiU3Qsq1TgvamAAAD
a user joined room : 69dc7d1a78918a27e46fae95 

CONSOLE: 

{conversationId: '69dc7d1a78918a27e46fae95', 
sender: '69dc76822e6b8e78053a5a21', 
text: 'hello from socket', 
isRead: false, _id: '69dcba31a637deea186b3ba6', …}
*/
