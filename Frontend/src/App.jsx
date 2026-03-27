import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";


function App() {

  // (prevents cold start delay)
  useEffect(() => {
    const warmUp = async () => {
      try {
        await fetch("https://reelnova-movie-app.onrender.com");
      } catch (err) {}
    };

    warmUp();
  }, []);

  useEffect(() => {
    document.title = "ReelNova";
  }, []);

  return (
    <div>
      <Navbar /> <Outlet />
    </div>
  );
}

export default App;
