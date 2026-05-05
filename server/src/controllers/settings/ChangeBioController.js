import changeBio from "../../services/settings/ChangeBio.js";

const changeBioController = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { bio } = req.body;
    const updatedUser = await changeBio(userId, bio);

    return res.status(200).json({
      data: updatedUser,
      message: "Bio updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: error.message || "Failed to update bio",
    });
  }
};

export default changeBioController;
