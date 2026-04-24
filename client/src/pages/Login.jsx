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
      setError(error.message);
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

      {/* cardbody*/}
      <div
        className="relative z-10 w-full max-w-4xl bg-[#313338] text-white 
        rounded-xl shadow-2xl p-8 flex gap-10"
      >
        {/* left side */}
        <div className="flex-1 relative">
          <h1 className="text-2xl font-bold text-center mb-2">Welcome back!</h1>
          <p className="text-gray-400 text-center mb-6">
            We're so excited to see you again!
          </p>

          <form onSubmit={handleSubmit}>
            {/* email */}
            <div className="relative mb-4">
              <label className="text-xs text-gray-400">Email *</label>

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
            <div className="relative mb-4">
              <label className="text-xs text-gray-400">Password *</label>

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

            <p className="text-xs text-indigo-400 my-2 pt-3 cursor-pointer">
              Forgot your password?
            </p>

            {/* button*/}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] 
                        transition py-2 rounded-md font-semibold mb-4 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-sm text-gray-400">
              Need an account? {""}
              <Link to="/register" className="text-indigo-400 cursor-pointer">
                Register
              </Link>
            </p>

            {error && <p className="text-red-400 text-sm mt-0.5">{error}</p>}
          </form>
        </div>

        {/* right side*/}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* QR */}
          <div className="bg-white p-2 rounded-md mb-4">
            <div className="w-40 h-40 bg-black"></div>
          </div>

          <h2 className="text-lg font-semibold mb-2">Log in with QR Code</h2>

          <p className="text-gray-400 text-sm">
            Scan this with the{" "}
            <span className="font-semibold">mobile app </span>
            to log in instantly.
          </p>

          <p className="text-indigo-400 text-sm mt-2 cursor-pointer">
            Or, sign in with passkey
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
