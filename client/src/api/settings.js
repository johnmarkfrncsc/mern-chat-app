import api from "./axios.js";

const changeUsername = async (username) => {
  const response = await api.put("/settings/username", {
    username: username,
  });
  return response.data;
};

const changePassword = async (currentPassword, newPassword) => {
  const response = await api.put("/settings/password", {
    currentPassword: currentPassword,
    newPassword: newPassword,
  });
  return response.data;
};

const uploadPhoto = async (file) => {
  const formData = new FormData();
  formData.append("photo", file);
  const response = await api.put("/settings/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export { changePassword, changeUsername, uploadPhoto };
