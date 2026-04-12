import registerUser from "../services/User/AuthRegisterUser.js";

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await registerUser(username, email, password);
    return res.status(201).json({
      data: newUser,
      message: `Registered successfully ${username}`,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

export default registerController;
