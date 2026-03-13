import { useState } from "react";
import { loginUser, registerUser } from "./authApi";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);

      await loginUser({
        email: form.email,
        password: form.password,
      });

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-10 rounded-lg w-105 shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 bg-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 bg-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 bg-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button className="bg-red-500 w-full py-3 rounded font-semibold hover:bg-red-600 transition">
          Register
        </button>

        <p className="text-sm text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-red-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
