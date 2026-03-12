import { Link } from "react-router-dom";

const HeroBanner = ({ movie }) => {
  if (!movie) return null;

  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div
      className="h-[60vh] flex items-center px-6 md:px-10 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>

        <p className="mb-6 line-clamp-3">{movie.overview}</p>

        <div className="flex gap-4">
          <Link
            to={`/movie/${movie.id}`}
            className="bg-red-500 px-5 py-2 rounded"
          >
            Watch Trailer
          </Link>

          <Link to={`/movie/${movie.id}`} className="border px-5 py-2 rounded">
            Add To Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
