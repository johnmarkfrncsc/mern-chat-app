import changePassword from "../../services/user/ChangePasswordService.js";

const changePasswordController = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { currentPassword, newPassword } = req.body;

    await changePassword(userId, currentPassword, newPassword);

    res.status(200).json({
      message: "You've successfully changed your password",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

export default changePasswordController;
