import { useState } from "react";
import useAuth from "./useAuth.js";

const useSettings = () => {
  const [activeSection, setActiveSection] = useState("username");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    photo: null,
    bio: "",
  });

  const sections = [
    { key: "username", label: "Change Username", group: "account" },
    { key: "password", label: "Change Password", group: "account" },
    { key: "photo", label: "Upload Profile", group: "profile" },
    { key: "bio", label: "Edit Bio", group: "profile" },
    { key: "theme", label: "Theme", group: "appearance" },
  ];

  const { updateUser } = useAuth();

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (
    callback,
    successText,
    shouldUpdateUser = false,
  ) => {
    try {
      setLoading(true);
      setMessage("");
      const result = await callback();
      if (shouldUpdateUser && result?.data) {
        updateUser(result.data);
      }
      setMessage(successText);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    activeSection,
    setActiveSection,
    loading,
    message,
    formData,
    updateField,
    handleSubmit,
    sections,
  };
};

export default useSettings;
