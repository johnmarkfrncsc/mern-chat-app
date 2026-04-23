import { X } from "lucide-react";
import { useContext } from "react";
import useSettings from "../../hooks/useSettings.js";
import UsernameForm from "../ui/settings/UsernameForm.jsx";
import PasswordForm from "../ui/settings/PasswordForm.jsx";
import UploadForm from "../ui/settings/UploadForm.jsx";
import { AuthContext } from "../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const SettingsModal = ({ onClose }) => {
  const {
    activeSection,
    setActiveSection,
    loading,
    message,
    formData,
    updateField,
    handleSubmit,
    sections,
  } = useSettings();

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
      {/* Modal Container */}
      <div className="bg-[#FAFAFA] rounded-xl w-187 h-125 flex overflow-hidden relative">
        {/* X Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer z-10"
        >
          <X size={20} />
        </button>

        {/* Left Sidebar */}
        <div className="w-55 bg-[#F6F6F6] border-r border-[#E2E2E2] p-4 flex flex-col gap-1">
          <p className="text-xs font-bold text-[#29665B] uppercase px-2 mb-1">
            My Account
          </p>
          {sections.slice(0, 2).map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`text-left px-2 py-1.5 rounded text-sm transition
            ${
              activeSection === section.key
                ? "bg-[#E2E2E2] text-gray-800"
                : "text-gray-700 hover:bg-[#EBEBEB] hover:text-gray-800"
            }`}
            >
              {section.label}
            </button>
          ))}

          <p className="text-xs font-bold text-[#29665B] uppercase px-2 mt-4 mb-1">
            Profile
          </p>
          {sections.slice(2).map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`text-left px-2 py-1.5 rounded text-sm transition cursor-pointer
            ${
              activeSection === section.key
                ? "bg-[#E2E2E2] text-gray-800"
                : "text-gray-700 hover:bg-[#EBEBEB] hover:text-gray-800"
            }`}
            >
              {section.label}
            </button>
          ))}

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-md text-sm font-medium cursor-pointer
                 bg-[#FAFAFA] text-gray-700
                 hover:bg-[#F7F7F7] hover:text-gray-700
                 transition-all duration-200
                 border border-[#dfdddd]
                 hover:border-red-500/50
                 hover:shadow-[0_0_10px_rgba(239,68,68,0.15)]"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-8 text-gray-700 overflow-y-auto">
          {/* Section Title */}
          <h2 className="text-xl font-bold mb-6">
            {sections.find((s) => s.key === activeSection)?.label}
          </h2>

          {/* Username Form */}
          {activeSection === "username" && (
            <UsernameForm
              formData={formData}
              updateField={updateField}
              handleSubmit={handleSubmit}
              loading={loading}
              message={message}
            />
          )}

          {/* Password Form */}
          {activeSection === "password" && (
            <PasswordForm
              formData={formData}
              updateField={updateField}
              handleSubmit={handleSubmit}
              loading={loading}
              message={message}
            />
          )}

          {/* Photo Form */}
          {activeSection === "photo" && (
            <UploadForm
              formData={formData}
              updateField={updateField}
              handleSubmit={handleSubmit}
              loading={loading}
              message={message}
            />
          )}

          {/* Message */}
          {loading && <p className="text-gray-700 text-sm mt-4">Loading...</p>}
          {message && <p className="text-green-400 text-sm mt-4">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
