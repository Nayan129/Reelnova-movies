import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// lazy loaded pages
const Home = lazy(() => import("../features/movies/Home"));
const MovieDetails = lazy(() => import("../features/movies/MovieDetails"));
const Favorites = lazy(() => import("../features/favorites/Favorite"));
const History = lazy(() => import("../features/history/History"));
const Login = lazy(() => import("../features/auth/Login"));
const Register = lazy(() => import("../features/auth/Register"));
const SearchPage = lazy(() => import("../features/Search/SearchPage"));

import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "tv/:id",
        element: <MovieDetails />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
