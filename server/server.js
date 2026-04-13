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

const server = http.createServer(app);

const io = createSocketServer(server);
registerSocketEvents(io);

connectMONGODB()
  .then(() => {
    server.listen(PORT);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
