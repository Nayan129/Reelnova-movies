import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovie } from "../movies/moviesApi";
import MovieCard from "../../components/MovieCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      const res = await searchMovie(query);

      setResults(res.data.movies || res.data.results || []);
    };

    if (query) fetchSearch();
  }, [query]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-6">Search Results for "{query}"</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
