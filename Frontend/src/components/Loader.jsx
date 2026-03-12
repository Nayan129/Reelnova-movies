const Loader = () => {
  return (
    <div className="flex gap-4 overflow-hidden px-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="min-w-55 bg-slate-800 rounded-lg overflow-hidden animate-pulse"
        >
          <div className="w-full h-75 bg-slate-700"></div>

          <div className="p-3 space-y-2">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-3 bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
