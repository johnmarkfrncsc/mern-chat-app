import express from "express";
import cors from "cors";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import MessageRoutes from "./src/routes/MessageRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//route
app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);

export default app;
