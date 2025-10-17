import MovieItem from "./movie-item";

const MovieList = ({
  movies,
  rateMovie,
  deleteMovie,
  toggleWatched,
  restoreMovie,
  permanentDelete,
  currentTab,
  onEdit,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {movies.length === 0 ? (
        <p className="mt-4 text-center text-gray-400">No movies added yet.</p>
      ) : (
        <ul className="  mt-4 flex flex-col gap-4">
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              rateMovie={rateMovie}
              deleteMovie={deleteMovie}
              toggleWatched={toggleWatched}
              restoreMovie={restoreMovie}
              permanentDelete={permanentDelete}
              currentTab={currentTab}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default MovieList;
