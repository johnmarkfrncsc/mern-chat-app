const validateForm = ({ username, email, password }) => {
  const errors = {};

  if (username !== undefined) {
    if (!username || username.length < 3 || username.length > 20) {
      errors.username = "Username must be 3 - 20 characters";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      errors.username = "Username must contain only letters, numbers, _ and -";
    }
  }

  if (email !== undefined) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email address";
    }
  }

  if (password !== undefined) {
    if (!password || password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Must contain at least 1 uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Must contain at least 1 lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Must contain at least 1 number";
    }
  }

  return errors;
};

const validateRegisterForm = (data) => {
  return validateForm({
    username: data.username,
    email: data.email,
    password: data.password,
  });
};

const validateLogin = (data) => {
  return validateForm({
    email: data.email,
    password: data.password,
  });
};

export { validateLogin, validateRegisterForm };
