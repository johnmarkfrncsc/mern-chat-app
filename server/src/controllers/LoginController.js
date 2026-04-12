import loginUser from "../services/User/AuthLoginUser.js";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({
      data: user,
      token,
      message: "Log in successful",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

export default loginController;
