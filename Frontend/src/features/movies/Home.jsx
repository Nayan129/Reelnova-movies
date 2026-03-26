import { useEffect, useState } from "react";
import { getTrendingMovies, getPopularMovies, getTVShows } from "./moviesApi";
import MovieCard from "../../components/MovieCard";
import HeroBanner from "../../components/HeroBanner";
import Loader from "../../components/Loader";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  // this will prevent UI blocking, hero load faster
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const trendingRes = await getTrendingMovies();
        const trendingMovies = trendingRes?.data?.movies ?? [];

        setTrending(trendingMovies);

        if (trendingMovies.length) {
          const random =
            trendingMovies[Math.floor(Math.random() * trendingMovies.length)];
          setHero(random);
        }
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    const fetchRest = async () => {
      try {
        const [popularRes, tvRes] = await Promise.all([
          getPopularMovies().catch(() => null),
          getTVShows().catch(() => null),
        ]);

        setPopular(popularRes?.data?.movies ?? []);
        setTvShows(tvRes?.data?.tvShows ?? []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInitial();
    setTimeout(fetchRest, 500);
  }, []);


  return (
    <div className="text-white">
      {/* improve LCP */}
      {hero ? (
        <HeroBanner movie={hero} />
      ) : (
        <div className="h-[60vh] bg-gray-900" />
      )}

      <div className="p-8">
        {/* Trending */}
        <h2 className="text-xl font-bold mb-4">Trending Now</h2>

        <div className="flex gap-6 overflow-x-auto pb-4 mb-10">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <Loader key={i} />)
            : trending
                .slice(0, 10)
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>

        {/* Popular Movies */}
        <h2 className="text-xl font-bold mb-4">Popular Movies</h2>

        <div className="flex gap-6 overflow-x-auto pb-4 mb-10">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <Loader key={i} />)
            : popular
                .slice(0, 10)
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>

        {/* TV Shows */}
        <h2 className="text-xl font-bold mb-4">TV Shows</h2>

        <div className="flex gap-6 overflow-x-auto pb-4 mb-10">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <Loader key={i} />)
            : tvShows.slice(0, 10).map((show) => (
                <MovieCard
                  key={show.id}
                  movie={{
                    ...show,
                    title: show.name,
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
