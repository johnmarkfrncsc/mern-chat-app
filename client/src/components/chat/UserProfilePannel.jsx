import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getUserProfile } from "../../api/user.js";

const UserProfilePanel = ({ userId, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getUserProfile(userId);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [userId]);

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="w-72 h-screen border-l border-[#E8E8E8] bg-[#FAFAFA] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5.5 mb-0.5">
        <span className="text-md font-semibold text-gray-600">
          User Profile
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
          Loading...
        </div>
      ) : !profile ? (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
          Failed to load profile
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {/* Profile photo banner */}
          <div className="bg-[#2C5B52] h-20 w-full" />
          <div className="px-4 pb-4">
            <div className="-mt-8 mb-3">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-[#FAFAFA]"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl ring-4 ring-[#FAFAFA]">
                  {profile.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Username */}
            <h3 className="text-lg font-bold text-gray-800">
              {profile.username}
            </h3>

            {/* Bio */}
            {profile.bio && (
              <div className="mt-3 bg-white border border-[#E8E8E8] rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                  Bio
                </p>
                <p className="text-sm text-gray-700 wrap-break-word">
                  {profile.bio}
                </p>
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                    Member Since
                  </p>
                  <p className="text-xs text-gray-700">{memberSince}</p>
                </div>
              </div>
            )}

            {/* Member since */}
            <div className="mt-3 bg-white border border-[#E8E8E8] rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                Member Since
              </p>
              <p className="text-xs text-gray-700">{memberSince}</p>
            </div>

            {/* Mutuals */}
            {profile.mutuals?.length > 0 && (
              <div className="mt-3 bg-white border border-[#E8E8E8] rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                  Mutuals — {profile.mutuals.length}
                </p>
                <div className="flex flex-col gap-2">
                  {profile.mutuals.map((mutual) => (
                    <div key={mutual._id} className="flex items-center gap-2">
                      {mutual.profilePhoto ? (
                        <img
                          src={mutual.profilePhoto}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">
                          {mutual.username?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm text-gray-700">
                        {mutual.username}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePanel;
