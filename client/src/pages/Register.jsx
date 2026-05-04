import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { register, login } from "../api/auth.js";
import { validateRegisterForm } from "../utils/validators/authValidators.js";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login: authlogin } = useAuth();
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

    const formErrors = validateRegisterForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);

      const { data: userData, token } = await login(
        formData.email,
        formData.password,
      );

      authlogin(userData, token);
      navigate("/chat");
    } catch (err) {
      setError(err.message);
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
      {/* Card Container */}
      <div className="relative z-10 w-100 rounded-xl shadow-2xl overflow-hidden flex">
        {/* right: (form) */}
        <div className="flex-1 bg-white p-8">
          {/* logo header */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center mb-3">
              <img
                src="logo.svg"
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="text-2xl font-bold text-[#29665B] text-center">
              Create an account
            </h1>

            <p className="text-gray-400 text-sm text-center">
              Join us and start chatting
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* username */}
            <div className="relative mb-4">
              <label className="text-xs  font-medium text-gray-400">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-md
                border border-gray-700 focus:outline-none focus:border-teal-600"
              />
              <p className="text-red-400 text-xs absolute left-0 top-full mt-1 h-4">
                {errors.username || ""}
              </p>
            </div>

            {/* email */}
            <div className="relative mb-4 pt-2">
              <label className="text-xs font-medium text-gray-400">
                Email address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-md
                border border-gray-700 focus:outline-none focus:border-teal-600"
              />
              <p className="text-red-400 text-xs absolute left-0 top-full mt-1 h-4">
                {errors.email || ""}
              </p>
            </div>

            {/* password */}
            <div className="relative mb-4 pt-2">
              <label className="text-xs font-medium text-gray-400">
                Password
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

            {/* button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-700 hover:bg-[#29665B] text-white
            transition py-2 mt-4 rounded-md font-semibold mb-4 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create account"}
            </button>

            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#29665B] font-medium">
                Log in
              </Link>
            </p>
            {error && <p className="text-red-400 text-sm mt-0.5">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
