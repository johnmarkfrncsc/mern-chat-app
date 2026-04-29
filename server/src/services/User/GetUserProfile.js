import UserModel from "../../models/UserModel.js";
import ConversationModel from "../../models/ConversationModel.js";

const getUserProfile = async (targetUserId, currentUserId) => {
  const user = await UserModel.findById(targetUserId).select(
    "username profilePhoto bio createdAt",
  );
  if (!user) throw new Error("User not found");

  const currentUserConvos = await ConversationModel.find({
    participants: currentUserId,
  }).select("participants");

  const targetUserConvos = await ConversationModel.find({
    participants: targetUserId,
  }).select("participants");

  const currentUserFriendIds = currentUserConvos
    .flatMap((c) => c.participants.map((p) => p.toString()))
    .filter((id) => id !== currentUserId.toString());

  const targetUserFriendIds = targetUserConvos
    .flatMap((c) => c.participants.map((p) => p.toString()))
    .filter((id) => id !== targetUserId.toString());

  const mutualIds = currentUserFriendIds.filter((id) =>
    targetUserFriendIds.includes(id),
  );

  const mutuals = await UserModel.find({ _id: { $in: mutualIds } }).select(
    "username profilePhoto",
  );

  return { ...user.toObject(), mutuals };
};

export default getUserProfile;
