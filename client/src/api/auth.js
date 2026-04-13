import api from "./axios.js";

const register = async (username, email, password) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
};

const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email: email,
    password: password,
  });

  return response.data;
};

export { register, login };
