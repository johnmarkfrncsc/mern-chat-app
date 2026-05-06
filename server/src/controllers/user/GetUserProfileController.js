import getUserProfile from "../../services/User/GetUserProfile.js";

const getUserProfileController = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.id;

    const profile = await getUserProfile(targetUserId, currentUserId);

    return res.status(200).json({
      data: profile,
      message: "Profile fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: error.message || "Failed to fetch profile",
    });
  }
};

export default getUserProfileController;
