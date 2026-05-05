import changeTheme from "../../services/user/ChangeThemeService.js";

const changeThemeController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { themeColor } = req.body;
    const updated = await changeTheme(userId, themeColor);
    return res.status(200).json({
      data: updated,
      message: "Theme updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating theme",
    });
  }
};

export default changeThemeController;
