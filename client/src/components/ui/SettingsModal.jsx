import { useState } from "react";
import {
  changeUsername,
  changePassword,
  uploadPhoto,
} from "../../api/settings.js";
import { X } from "lucide-react";
import useAuth from "../../hooks/useAuth.js";

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

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
      {/* Modal Container */}
      <div className="bg-[#313338] rounded-xl w-187 h-125 flex overflow-hidden relative">
        {/* X Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer z-10"
        >
          <X size={20} />
        </button>

        {/* Left Sidebar */}
        <div className="w-55 bg-[#2B2D31] p-4 flex flex-col gap-1">
          <p className="text-xs font-bold text-gray-400 uppercase px-2 mb-1">
            My Account
          </p>
          {sections.slice(0, 2).map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`text-left px-2 py-1.5 rounded text-sm transition
            ${
              activeSection === section.key
                ? "bg-[#404249] text-white"
                : "text-gray-300 hover:bg-[#35373C] hover:text-white"
            }`}
            >
              {section.label}
            </button>
          ))}

          <p className="text-xs font-bold text-gray-400 uppercase px-2 mt-4 mb-1">
            Profile
          </p>
          {sections.slice(2).map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`text-left px-2 py-1.5 rounded text-sm transition
            ${
              activeSection === section.key
                ? "bg-[#404249] text-white"
                : "text-gray-300 hover:bg-[#35373C] hover:text-white"
            }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-8 text-white overflow-y-auto">
          {/* Section Title */}
          <h2 className="text-xl font-bold mb-6">
            {sections.find((s) => s.key === activeSection)?.label}
          </h2>

          {/* Username Form */}
          {activeSection === "username" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(
                  () => changeUsername(formData.username),
                  "Username changed successfully",
                  true,
                );
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  New Username
                </label>
                <input
                  type="text"
                  placeholder="Enter new username"
                  value={formData.username}
                  onChange={(e) => updateField("username", e.target.value)}
                  className="bg-[#1E1F22] border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm w-fit transition"
              >
                Save Changes
              </button>
            </form>
          )}

          {/* Password Form */}
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
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    updateField("currentPassword", e.target.value)
                  }
                  className="bg-[#1E1F22] border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={(e) => updateField("newPassword", e.target.value)}
                  className="bg-[#1E1F22] border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm w-fit transition"
              >
                Save Changes
              </button>
            </form>
          )}

          {/* Photo Form */}
          {activeSection === "photo" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(
                  () => uploadPhoto(formData.photo),
                  "Profile uploaded successfully",
                  true,
                );
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Profile Photo
                </label>
                <input
                  type="file"
                  onChange={(e) => updateField("photo", e.target.files[0])}
                  className="text-sm text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm w-fit transition"
              >
                Upload Photo
              </button>
            </form>
          )}

          {/* Message */}
          {loading && <p className="text-gray-400 text-sm mt-4">Loading...</p>}
          {message && <p className="text-green-400 text-sm mt-4">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
