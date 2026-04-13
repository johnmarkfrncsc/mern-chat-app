import api from "./axios.js";

const createConversation = async (receiverId) => {
  const response = await api.post(`/message/${receiverId}/conversation`);
  return response.data;
};

const getUserConversations = async () => {
  const response = await api.get(`/message/conversations`);
  return response.data;
};

const sendMessage = async (conversationId, text) => {
  const response = await api.post(`/message/${conversationId}`, {
    text,
  });
  return response.data;
};

const getMessages = async (conversationId) => {
  const response = await api.get(`/message/${conversationId}`);
  return response.data;
};

export { createConversation, getUserConversations, sendMessage, getMessages };
