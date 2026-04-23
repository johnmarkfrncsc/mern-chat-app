import { useState } from "react";
import {
  changeUsername,
  changePassword,
  uploadPhoto,
} from "../../api/settings.js";
import { X } from "lucide-react";

const SettingsModal = ({ onClose }) => {
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

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (callback, succcessText) => {
    try {
      setLoading(true);
      setMessage("");

      await callback();

      setMessage(succcessText);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-100 space-y-4 relative">
        <X
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        />

        <div className="flex gap-4">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className="text-sm"
            >
              {section.label}
            </button>
          ))}
        </div>

        {activeSection === "username" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(
                () => changeUsername(formData.username),
                "Username changed successfully",
              );
            }}
          >
            <input
              type="text"
              placeholder="New username"
              value={formData.username}
              onChange={(e) => updateField("username", e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        )}

        {activeSection === "password" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(
                () =>
                  changePassword(
                    formData.currentPassword,
                    formData.newPassword,
                  ),
                "Password changed successfully",
              );
            }}
          >
            <input
              type="password"
              placeholder="Current password"
              value={formData.currentPassword}
              onChange={(e) => updateField("currentPassword", e.target.value)}
            />

            <input
              type="password"
              placeholder="New password"
              value={formData.newPassword}
              onChange={(e) => updateField("newPassword", e.target.value)}
            />

            <button type="submit">Save</button>
          </form>
        )}

        {activeSection === "photo" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(
                () => uploadPhoto(formData.photo),
                "Profile uploaded successfully",
              );
            }}
          >
            <input
              type="file"
              onChange={(e) => updateField("photo", e.target.files[0])}
            />
            <button type="submit">Upload</button>
          </form>
        )}

        {loading && <p>Loading...</p>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SettingsModal;
