import searchUser from "../../services/user/SearchUser.js";

const searchUserController = async (req, res) => {
  try {
    const { username } = req.query;
    const currentUserId = req.user.id;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const users = await searchUser(username, currentUserId);
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

export default searchUserController;
