import { useEffect, useState } from "react";
import api from "../../api/axios";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/api/favorites");
      setFavorites(res.data.allFavorites || []);
    } catch (err) {
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      await api.delete(`/api/favorites/${id}`);

      setFavorites(favorites.filter((movie) => movie._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-xl font-bold mb-6">Favorites</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((movie) => {
          const poster = `https://image.tmdb.org/t/p/w500${movie.poster}`;

          return (
            <div key={movie._id} className="relative">
              <img src={poster} className="rounded" />

              <button
                onClick={() => removeFavorite(movie._id)}
                className="absolute top-2 right-2 text-xl"
              >
                ❌
              </button>

              <p className="text-sm mt-2">{movie.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorite;
