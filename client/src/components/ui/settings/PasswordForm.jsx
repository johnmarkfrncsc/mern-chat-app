import { changePassword } from "../../../api/settings.js";

const PasswordForm = ({
  formData,
  updateField,
  handleSubmit,
  loading,
  message,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(
          () => changePassword(formData.currentPassword, formData.newPassword),
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
          onChange={(e) => updateField("currentPassword", e.target.value)}
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
  );
};

export default PasswordForm;
