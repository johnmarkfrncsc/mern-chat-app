import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMONGODB from "./src/config/db.js";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import MessageRoutes from "./src/routes/MessageRoutes.js";

// declare dotenv config
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//route
app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);

//connect mongodb then start the server
connectMONGODB()
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server running to port http:localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in connecting in mongodb", err);
    process.exit(1);
  });

export default app;
