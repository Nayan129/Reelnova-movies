import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await api.get("/api/auth/get-me");
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) return null;

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
