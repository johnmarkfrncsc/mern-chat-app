import api from "./axios.js";

const searchUsers = async (username) => {
  const response = await api.get(`/search/search?username=${username}`);
  return response.data;
};

const getUserProfile = async (userId) => {
  const response = await api.get(`/profile/${userId}`);
  return response.data;
};

export { searchUsers, getUserProfile };
