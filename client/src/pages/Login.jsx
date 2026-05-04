import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setError(null);
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
    } catch (err) {
      setError("Email or password is invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-teal-100 to-[#29665B]">
      {/* card */}
      <div className="w-full max-w-md bg-white text-[#29665B] rounded-xl shadow-2xl p-8">
        {/* header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center mb-3">
            <img src="logo.svg" alt="logo" />
          </div>

          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-gray-400 text-center">
            We're so excited to see you again!
          </p>
        </div>

        {/* error message */}
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* email */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-500">Email *</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-teal-600"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* password */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-500">
              Password *
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-teal-600"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 hover:bg-[#29665B] text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* register */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Need an account?{" "}
            <Link to="/register" className="text-[#29665B] font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
