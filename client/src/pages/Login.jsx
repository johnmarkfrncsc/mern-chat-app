import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { login } from "../api/auth.js";
import { validateLoginForm } from "../utils/validators/authValidators.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setError(null);

    const formErrors = validateLoginForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    try {
      const data = await login(formData.email, formData.password);
      authLogin(data.data, data.token);
      navigate("/chat");
    } catch (error) {
      setErrors({
        email: "Email or Password is invalid",
        password: "Email or Password is invalid",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderError = (field) =>
    errors[field] && (
      <p className="text-red-400 text-xs ml-0.5">{errors[field]}</p>
    );

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden
      bg-linear-to-br from-[#FFFFFF] via-teal-100 to-[#29665B]"
    >
      {/* cardbody*/}
      <div
        className="relative z-10 w-100 max-w-4xl bg-white text-[#29665B]
        rounded-xl shadow-2xl p-8 flex gap-10"
      >
        <div className="flex-1 relative">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <img src="logo.svg" alt="" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">
              Welcome back!
            </h1>
            <p className="text-gray-400 text-center">
              We're so excited to see you again!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* email */}
            <div className="relative mb-4">
              <label className="text-xs font-medium text-gray-500">
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-md 
                border border-gray-700 focus:outline-none focus:border-teal-600"
              />
            </div>

            {/* password */}
            <div className="relative mb-4">
              <label className="text-xs font-medium text-gray-500">
                Password *
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-md
                border border-gray-700 focus:outline-none focus:border-teal-600"
              />
              <p className="text-red-400 text-xs absolute left-0 top-full mt-1 h-4">
                {errors.password || ""}
              </p>
            </div>

            {/* button*/}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-700 hover:bg-[#29665B] text-white pt-3 my-2
                        transition py-2 rounded-md font-semibold mb-4 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-sm text-gray-500">
              Need an account? {""}
              <Link to="/register" className="text-[#29665B] font-medium">
                Register
              </Link>
            </p>
            {error && <p className="text-red-400 text-sm mt-0.5">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
