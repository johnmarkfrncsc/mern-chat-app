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
        <label className="text-xs font-bold text-gray-500 uppercase">
          Current Password
        </label>
        <input
          type="password"
          placeholder="Enter current password"
          value={formData.currentPassword}
          onChange={(e) => updateField("currentPassword", e.target.value)}
          className="bg-[#F6F6F6] border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-teal-700"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase">
          New Password
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          value={formData.newPassword}
          onChange={(e) => updateField("newPassword", e.target.value)}
          className="bg-[#F6F6F6] border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-teal-700"
        />
      </div>
      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm w-fit transition cursor-pointer"
      >
        Save Changes
      </button>
    </form>
  );
};

export default PasswordForm;
