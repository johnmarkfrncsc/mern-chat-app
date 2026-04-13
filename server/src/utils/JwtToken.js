import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1d",
  });
  return token;
};

const verifyToken = (token) => {
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  return decode;
};

export { generateToken, verifyToken };
