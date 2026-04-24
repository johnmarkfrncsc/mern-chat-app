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
    bg-linear-to-br from-[#2b2d31] via-[#1e1f22] to-[#5865F2]"
    >
      {/* Background glow effects */}
      <div className="absolute w-125 h-125 bg-purple-600 opacity-30 blur-3xl rounded-full -top-25 -left-25" />
      <div className="absolute w-100 h-100 bg-indigo-500 opacity-30 blur-3xl rounded-full -bottom-25 -right-25" />

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex">
        {/* left: (gradient visual panel) */}
        <div className="hidden md:flex flex-1 items-center justify-center relative">
          {/* extra glow inside panel */}
          <div className="absolute w-96 h-96 bg-indigo-500 opacity-20 blur-3xl rounded-full" />
          <div className="absolute w-80 h-80 bg-purple-500 opacity-20 blur-3xl rounded-full top-20 left-10" />

          <div className="relative text-center px-6">
            <h2 className="text-3xl font-bold text-white mb-3">Join Us 🚀</h2>
            <p className="text-gray-300">
              Create your account and start your journey with us.
            </p>
          </div>
        </div>

        {/* right: (form) */}
        <div className="flex-1 bg-[#313338] text-white p-8">
          <h1 className="text-2xl font-bold mb-2">Create an account</h1>

          <form onSubmit={handleSubmit}>
            {/* username */}
            <div className="relative mb-4">
              <label className="text-xs text-gray-400">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-md bg-[#1e1f22]
                border border-gray-700 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-red-400 text-xs absolute left-0 top-full mt-1 h-4">
                {errors.username || ""}
              </p>
            </div>

            {/* email */}
            <div className="relative mb-4 pt-2">
              <label className="text-xs text-gray-400">Email address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-md bg-[#1e1f22]
                border border-gray-700 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-red-400 text-xs absolute left-0 top-full mt-1 h-4">
                {errors.email || ""}
              </p>
            </div>

            {/* password */}
            <div className="relative mb-4 pt-2">
              <label className="text-xs text-gray-400">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-md bg-[#1e1f22]
                border border-gray-700 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-red-400 text-xs absolute left-0 top-full mt-1 h-4">
                {errors.password || ""}
              </p>
            </div>

            {/* button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] 
            transition py-2 mt-4 rounded-md font-semibold mb-4 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create account"}
            </button>

            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400">
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
