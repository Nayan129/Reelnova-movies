import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    document.title = "ReelNova";
  }, []);

  return (
    <div>
      <Navbar />

      <Outlet />
    </div>
  );
}

export default App;
