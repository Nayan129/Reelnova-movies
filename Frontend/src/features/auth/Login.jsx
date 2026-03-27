import { useState } from "react";
import { loginUser } from "./authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(form);

      localStorage.setItem("auth", Date.now());
      window.dispatchEvent(new Event("authChange"));

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-10 rounded-lg w-100 shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <input
          placeholder="Email"
          className="w-full mb-4 p-3 bg-slate-700 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 bg-slate-700 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-red-500 w-full py-3 rounded font-semibold">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
