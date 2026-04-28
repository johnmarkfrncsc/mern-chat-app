import { useEffect, useRef, useState } from "react";
import { uploadPhoto } from "../../../api/settings.js";
import { ImageUp, X } from "lucide-react";

const UploadForm = ({
  formData,
  updateField,
  handleSubmit,
  loading,
  message,
}) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!formData.photo) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(formData.photo);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.photo]);

  const handleRemove = () => {
    updateField("photo", null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

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
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-500 uppercase">
          Profile Photo
        </label>

        {/* hidden input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => updateField("photo", e.target.files[0])}
          className="hidden"
          id="photo-upload"
        />

        {preview ? (
          <div className="relative w-fit">
            <img
              src={preview}
              alt="Preview"
              className="w-28 h-28 rounded-full object-cover border"
            />

            {/* remove button */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-4 cursor-pointer"
            >
              <X size={20} className="text-gray-500 hover:text-red-500" />
            </button>
          </div>
        ) : (
          <label htmlFor="photo-upload" className="cursor-pointer w-fit">
            <ImageUp className="text-gray-500 hover:text-teal-600 transition" />
          </label>
        )}
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
