import express from "express";
import cors from "cors";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import MessageRoutes from "./src/routes/MessageRoutes.js";
import SearchUserRoutes from "./src/routes/SearchUserRoutes.js";
import SettingsRoutes from "./src/routes/SettingsRoutes.js";
import UserProfileRoutes from "./src/routes/UserProfileRoute.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//route
app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);
app.use("/api/search", SearchUserRoutes);
app.use("/api/settings", SettingsRoutes);
app.use("/api/profile", UserProfileRoutes);

export default app;
