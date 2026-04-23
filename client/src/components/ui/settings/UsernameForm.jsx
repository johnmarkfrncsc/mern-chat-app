import { changeUsername } from "../../../api/settings.js";

const UsernameForm = ({
  formData,
  updateField,
  handleSubmit,
  loading,
  message,
}) => {
  return (
    <>
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
          <label className="text-xs font-bold text-gray-500 uppercase">
            New Username
          </label>
          <input
            type="text"
            placeholder="Enter new username"
            value={formData.username}
            onChange={(e) => updateField("username", e.target.value)}
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
    </>
  );
};

export default UsernameForm;
