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
  });

  const sections = [
    { key: "username", label: "Change Username" },
    { key: "password", label: "Change Password" },
    { key: "photo", label: "Upload Profile" },
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
      setMessage(error.message);
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
