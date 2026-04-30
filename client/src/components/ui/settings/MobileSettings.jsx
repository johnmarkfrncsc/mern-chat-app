import { X, ArrowLeft } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useSettings from "../../../hooks/useSettings.js";
import UsernameForm from "./UsernameForm.jsx";
import PasswordForm from "./PasswordForm.jsx";
import UploadForm from "./UploadForm.jsx";
import BioForm from "./BioForm.jsx";
import { AuthContext } from "../../../context/authContext.jsx";

const MobileSettings = ({ onClose }) => {
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
    <div className="fixed inset-0 bg-black/70 z-50 flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 bg-[#FAFAFA] border-b border-[#E2E2E2]">
        {activeSection ? (
          <button
            onClick={() => setActiveSection(null)}
            className="text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
        ) : (
          <div />
        )}

        <h2 className="text-md font-bold text-gray-700 pl-4 ml-2">
          {activeSection
            ? sections.find((s) => s.key === activeSection)?.label
            : "Settings"}
        </h2>

        <button onClick={onClose} className="text-gray-500">
          <X size={20} />
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 bg-[#FAFAFA] overflow-y-auto p-4 flex flex-col">
        {/* LIST VIEW */}
        {!activeSection && (
          <>
            {/* My Account */}
            <p className="text-xs font-bold text-[#29665B] uppercase px-2 mb-2">
              My Account
            </p>

            {sections.slice(0, 2).map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className="text-left text-sm text-gray-700 px-3 py-3 rounded-lg font-medium bg-white border border-[#E2E2E2] mb-2"
              >
                {section.label}
              </button>
            ))}

            {/* Profile */}
            <p className="text-xs font-bold text-[#29665B] uppercase px-2 mt-4 mb-2">
              Profile
            </p>

            {sections.slice(2).map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className="text-left text-sm text-gray-700 px-3 py-3 rounded-lg font-medium bg-white border border-[#E2E2E2] mb-2"
              >
                {section.label}
              </button>
            ))}

            {/* LOGOUT */}
            <div className="mt-auto pt-4">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded-lg text-sm font-medium
                  bg-[#FAFAFA] text-gray-700 border border-[#dfdddd]
                  hover:border-red-500/50"
              >
                Log out
              </button>
            </div>
          </>
        )}

        {/* FORM VIEW */}
        {activeSection && (
          <div className="flex flex-col">
            {activeSection === "username" && (
              <UsernameForm
                formData={formData}
                updateField={updateField}
                handleSubmit={handleSubmit}
                loading={loading}
                message={message}
              />
            )}

            {activeSection === "password" && (
              <PasswordForm
                formData={formData}
                updateField={updateField}
                handleSubmit={handleSubmit}
                loading={loading}
                message={message}
              />
            )}

            {activeSection === "photo" && (
              <UploadForm
                formData={formData}
                updateField={updateField}
                handleSubmit={handleSubmit}
                loading={loading}
                message={message}
              />
            )}

            {activeSection === "bio" && (
              <BioForm
                formData={formData}
                updateField={updateField}
                handleSubmit={handleSubmit}
                loading={loading}
                message={message}
              />
            )}

            {loading && (
              <p className="text-gray-700 text-sm mt-4">Loading...</p>
            )}
            {message && <p className="text-teal-600 text-sm mt-4">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSettings;
