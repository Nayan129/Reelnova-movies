import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useLocation } from "react-router-dom";
import {
  getMovieDetails,
  getMovieTrailer,
  getTVDetails,
  getTVTrailer,
} from "./moviesApi";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [favorite, setFavorite] = useState(false);

  const isTV = location.pathname.includes("/tv/");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        let details;
        let video;

        if (isTV) {
          details = await getTVDetails(id);
        } else {
          details = await getMovieDetails(id);
        }

        const data = details.data.movie || details.data;

        setMovie(data);

        try {
          if (isTV) {
            video = await getTVTrailer(id);
          } else {
            video = await getMovieTrailer(id);
          }

          setTrailer(video.data.trailer);
        } catch {
          setTrailer(null);
        }

        await api.post("/api/history", {
          tmdbId: data.id,
          title: data.title || data.name,
          poster: data.poster_path,
        });
      } catch (error) {
        console.log("Movie fetch failed:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const res = await api.post("/api/favorites/toggle", {
        tmdbId: movie.id,
        title: movie.title,
        poster: movie.poster_path,
      });

      if (res.data.action === "added") {
        setFavorite(true);
      }

      if (res.data.action === "removed") {
        setFavorite(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!movie) return <div className="p-6 text-white">Loading...</div>;

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="p-8 flex flex-col md:flex-row gap-10 text-white">
      <img
        src={poster}
        className="w-62.5 rounded"
        loading="lazy"
        decoding="async"
      />

      <div>
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

        <p className="mb-4">{movie.overview}</p>

        <button
          onClick={toggleFavorite}
          className="bg-red-500 px-4 py-2 rounded mb-4"
        >
          {favorite ? "Remove From Favorites" : "Add To Favorites"}
        </button>

        {trailer && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer}`}
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
