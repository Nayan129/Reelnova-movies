import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../features/movies/Home";
import Favorites from "../features/favorites/Favorite";
import History from "../features/history/History";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import MovieDetails from "../features/movies/MovieDetails";
import SearchPage from "../features/Search/SearchPage";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
