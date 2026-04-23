import { uploadPhoto } from "../../../api/settings.js";

const UploadForm = ({
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
  );
};

export default UploadForm;
