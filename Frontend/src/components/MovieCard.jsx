import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

const MovieCard = ({ movie }) => {
  const [fav, setFav] = useState(false);

  const title = movie.title || movie.name;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  const mediaType = movie.media_type || "movie";

  const toggleFavorite = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/favorites/toggle", {
        tmdbId: movie.id,
        title: title,
        poster: movie.poster_path,
      });

      setFav(!fav);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link to={`/${mediaType}/${movie.id}`}>
      <div className="relative min-w-55 bg-slate-800 rounded-lg overflow-hidden hover:scale-105 transition">
        <img src={poster} alt={title} className="w-full h-75 object-cover" />

        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 text-2xl"
        >
          <i
            className={
              fav ? "ri-heart-fill text-red-500" : "ri-heart-line text-white"
            }
          />
        </button>

        <div className="p-3">
          <h3 className="text-sm font-semibold mb-1">{title}</h3>

          <div className="flex items-center gap-2 text-yellow-400 text-sm">
            ⭐ ⭐ ⭐ ⭐ <span className="text-white">{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
