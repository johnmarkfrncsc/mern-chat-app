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
