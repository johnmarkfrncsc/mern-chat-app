import { useRef } from "react";
import { uploadPhoto } from "../../../api/settings.js";
import { ImageUp } from "lucide-react";

const UploadForm = ({
  formData,
  updateField,
  handleSubmit,
  loading,
  message,
}) => {
  const fileInputRef = useRef(null);

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
        <label className="text-xs font-bold text-gray-500 uppercase">
          Profile Photo
        </label>

        {/* Hidden input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => updateField("photo", e.target.files[0])}
          className="hidden"
        />

        {/* Clickable icon */}
        <ImageUp
          size={28}
          className="text-gray-400 cursor-pointer hover:text-teal-600 transition"
          onClick={() => fileInputRef.current?.click()}
        />
      </div>

      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm w-fit transition cursor-pointer"
      >
        Upload Photo
      </button>
    </form>
  );
};

export default UploadForm;
