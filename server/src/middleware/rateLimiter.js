import rateLimit from "express-rate-limit";

const createLimiter = (max, errorMessage) =>
  rateLimit({
    windowMs: 60 * 1000,
    max,
    message: { error: errorMessage },
    standardHeaders: true,
    legacyHeaders: false,
  });

const loginLimiter = createLimiter(
  5,
  "Too many log in attempts. Please try again later.",
);

const registerLimiter = createLimiter(
  3,
  "Too many register attempts. Please try again later",
);

export { loginLimiter, registerLimiter };
