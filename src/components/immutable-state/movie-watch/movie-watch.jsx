import { useState, useEffect } from "react";
import Heading from "./components/heading";
import MovieForm from "./components/movie-form";
import MovieList from "./components/movie-list";
import CurrentTab from "./components/current-tab";
import { useToast } from "./components/useToast";

const MovieWatch = () => {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentTab, setCurrentTab] = useState("all");
  const [editingMovie, setEditingMovie] = useState(null);
  const { showToast } = useToast();
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);
  const handleAddMovie = ({ title, ott }) => {
    const newMovie = {
      id: crypto.randomUUID(),
      title,
      ott,
      rating: null,
      watched: false,
      isDeleted: false,
      watchedDate: null,
    };
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  const handleRateMovie = (movieId, rating) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, rating } : movie
      )
    );
  };

  const handleDeleteMovie = (movieId) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, isDeleted: true } : movie
      )
    );
    showToast("Movie deleted successfully!", "success");
  };

  const handleToggleWatched = (movieId) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? {
              ...movie,
              watched: !movie.watched,
              watchedDate: !movie.watched ? new Date().toISOString() : null,
            }
          : movie
      )
    );
    showToast("Movie toggled successfully!", "success");
  };

  const filteredMovies = movies.filter((movie) => {
    if (currentTab === "watched") return movie.watched && !movie.isDeleted;
    if (currentTab === "unwatched") return !movie.watched && !movie.isDeleted;
    if (currentTab === "deleted") return movie.isDeleted;
    return !movie.isDeleted; // all tab shows all active movies
  });

  const restoreMovie = (id) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isDeleted: false } : m))
    );
    showToast("Movie restored successfully!", "success");
  };

  const permanentDelete = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
    showToast("Movie permanently deleted!", "success");
  };
  const startEdit = (movie) => setEditingMovie(movie);

  const updateMovie = (updatedMovie) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
    );
    setEditingMovie(null);
  };
  return (
    <div className="flex flex-col  w-full max-w-6xl m-3 items-center  p-6 bg-slate-900 text-white rounded-lg shadow-lg">
      <Heading />
      <MovieForm
        addMovie={handleAddMovie}
        updateMovie={updateMovie}
        editingMovie={editingMovie}
        cancelEdit={() => setEditingMovie(null)}
      />
      <CurrentTab currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <MovieList
        movies={filteredMovies}
        rateMovie={handleRateMovie}
        deleteMovie={handleDeleteMovie}
        toggleWatched={handleToggleWatched}
        currentTab={currentTab}
        restoreMovie={restoreMovie}
        permanentDelete={permanentDelete}
        onEdit={startEdit}
      />
      <button
        onClick={() => {
          setMovies([]);
          localStorage.removeItem("movies");
        }}
        className="mt-6 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded"
      >
        Clear All
      </button>
    </div>
  );
};

export default MovieWatch;
