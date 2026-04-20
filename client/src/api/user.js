import api from "./axios.js";

const searchUsers = async (username) => {
  const response = await api.get(`/search/search?username=${username}`);
  return response.data;
};

export default searchUsers;
