import { body, validationResult } from "express-validator";

const validateUsername = body("username")
  .trim()
  .isLength({ min: 3, max: 20 })
  .withMessage("Username must be 3-20 characters")
  .isAlphanumeric()
  .withMessage("Username can only contain letters and numbers");

const validateEmail = body("email")
  .trim()
  .isEmail()
  .withMessage("Invalid Email address")
  .normalizeEmail()
  .isLength({ max: 254 })
  .withMessage("Email is too long");

const validatePassword = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least 1 uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least 1 lowercase letter")
  .matches(/[0-9]/)
  .withMessage("Password must contain at least 1 number");

const handleValidationErrors = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));

  return res.status(400).json({ errors });
};

const validateRegister = [
  validateUsername,
  validateEmail,
  validatePassword,
  handleValidationErrors,
];
const validateLogin = [validateEmail, validatePassword, handleValidationErrors];

export { validateRegister, validateLogin };
