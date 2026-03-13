import { useEffect, useState } from "react";
import api from "../../api/axios";

const History = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/api/history");

      setHistory(res.data.history || []);
    } catch (err) {
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const clearAllHistory = async () => {
    try {
      await api.delete("/api/history/clear");

      setHistory([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Watch History</h1>

        <button
          onClick={clearAllHistory}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {history.map((movie) => {
          const poster = `https://image.tmdb.org/t/p/w500${movie.poster}`;

          return (
            <div key={movie._id}>
              <img src={poster} className="rounded" />

              <p className="text-sm mt-2">{movie.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
