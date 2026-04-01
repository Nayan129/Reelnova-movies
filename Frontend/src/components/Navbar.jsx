import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMe, logoutUser } from "../features/auth/authApi";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex flex-col md:flex-row md:items-center md:justify-between px-8 py-4 bg-black text-white gap-4">
      <Link to="/" className="text-2xl font-bold text-red-500">
        ReelNova
      </Link>

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/search?q=${query}`);
          }
        }}
        className="bg-slate-800 px-4 py-2 rounded w-full md:w-87.5"
      />

      <div className="flex gap-6 items-center">
        <Link to="/favorites">Favorites</Link>

        <Link to="/history">History</Link>

        {user ? (
          <>
            <span className="text-gray-300">{user.username}</span>

            <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
