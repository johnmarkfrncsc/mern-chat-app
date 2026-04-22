import changeUsername from "../../services/user/ChangeUsernameService.js";

const changeUsernameController = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newUsername = req.body.username;

    const newUser = await changeUsername(userId, newUsername);
    res.status(200).json({
      data: newUser,
      message: "Username changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

export default changeUsernameController;
