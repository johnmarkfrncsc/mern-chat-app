import useAuth from "../../hooks/useAuth.js";
import { Settings } from "lucide-react";

const UserCard = ({ onSettingsClick }) => {
  const { user } = useAuth();

  const firstLetter = user?.username?.charAt(0).toUpperCase();
  const hasPhoto = user?.profilePhoto && user?.profilePhoto !== "";

  return (
    <div className="bg-[#0A1022] flex items-center justify-between w-full px-3 py-2">
      {hasPhoto ? (
        <img
          src={user.profilePhoto}
          alt=""
          className="w-8 h-8 rounded-lg object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
          {firstLetter}
        </div>
      )}
      <span>{user.username}</span>
      <div>
        <Settings
          onClick={onSettingsClick}
          className="cursor-pointer hover:text-white text-gray-400 transition"
        />
      </div>
    </div>
  );
};

export default UserCard;
