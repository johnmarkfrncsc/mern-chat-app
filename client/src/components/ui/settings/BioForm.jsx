import { changeBio } from "../../../api/settings.js";

const BioForm = ({ formData, updateField, handleSubmit, loading, message }) => {
  const charCount = formData.bio?.length || 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(
          () => changeBio(formData.bio),
          "Bio updated successfully",
          true,
        );
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Bio</label>
        <textarea
          placeholder="Tell something about yourself..."
          value={formData.bio || ""}
          onChange={(e) => updateField("bio", e.target.value)}
          maxLength={190}
          rows={4}
          className="bg-[#F6F6F6] border border-gray-700 rounded px-3 py-2 text-sm
            focus:outline-none focus:border-teal-700 resize-none"
        />
        {/* character counter */}
        <span
          className={`text-xs self-end ${charCount >= 190 ? "text-red-500" : "text-gray-400"}`}
        >
          {charCount}/190
        </span>
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

export default BioForm;
