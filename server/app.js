import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMONGODB from "../server/src/config/db.js";

// declare dotenv config

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

//simple route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Api is running" });
});

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
