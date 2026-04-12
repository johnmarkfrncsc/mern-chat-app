import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export default { hashPassword, comparePassword };
