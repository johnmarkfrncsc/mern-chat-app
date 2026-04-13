import { verifyToken } from "../utils/JwtToken.js";

const protectRoute = async (req, res, next) => {
  try {
    const getToken = req.headers.authorization?.split(" ")[1];

    if (!getToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decoded = verifyToken(getToken);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default protectRoute;
