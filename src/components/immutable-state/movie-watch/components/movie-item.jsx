import ReactStars from "react-stars";
import { RiDeleteBinLine } from "react-icons/ri";
import { LiaToggleOffSolid } from "react-icons/lia";
import { LiaToggleOnSolid } from "react-icons/lia";
import { MdOutlineRestore } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
const MovieItem = ({
  movie,
  rateMovie,
  deleteMovie,
  toggleWatched,
  restoreMovie,
  permanentDelete,
  currentTab,
}) => {
  const handleRatingChange = (newRating) => {
    rateMovie(movie.id, newRating);
  };

  return (
    <li
      className="group flex items-center gap-4 p-4 sm:p-5 w-full
                   bg-gradient-to-r from-gray-800/60 to-gray-900/60
                   hover:from-gray-700 hover:to-gray-900 rounded-xl
                   border border-gray-700 shadow-sm hover:shadow-lg
                   transition-transform duration-200 transform hover:-translate-y-0.5"
    >
      <div
        aria-hidden="true"
        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-md
                   bg-gradient-to-br from-indigo-600 to-pink-500
                   flex items-center justify-center text-white font-semibold
                   text-sm sm:text-base"
      >
        {movie.title?.charAt(0)?.toUpperCase() ?? "M"}
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className={`truncate text-sm sm:text-base font-semibold ${
              movie.watched ? "text-gray-400 line-through" : "text-white"
            }`}
          >
            {movie.title}
          </h3>

          <span className="text-xs text-gray-400">on</span>

          <span
            className="ml-1 inline-flex items-center text-xs sm:text-sm
                       text-indigo-100 bg-indigo-900/30 px-2 py-0.5 rounded-full
                       truncate max-w-[10rem]"
            title={movie.ott}
          >
            {movie.ott}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={18}
              value={movie?.rating || 0}
              color2={"#ffd700"}
              half={false}
            />
            <span className="text-xs text-gray-400">
              {movie.rating ? `${movie.rating}/5` : "Not rated"}
            </span>
          </div>

          <span
            className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full
                        ${
                          movie.watched
                            ? "bg-green-700 text-green-100"
                            : "bg-yellow-700 text-yellow-100"
                        }`}
            aria-hidden="true"
          >
            {movie.watched ? "Watched" : "Unwatched"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-2">
        {currentTab === "deleted" ? (
          <>
            <button
              onClick={() => restoreMovie(movie.id)}
              title="Restore movie"
              className="p-2 rounded-md bg-green-600/10 text-green-400 hover:bg-green-600/20
                         hover:text-green-200 transition-colors"
            >
              <MdOutlineRestore size={20} />
            </button>

            <button
              onClick={() => permanentDelete(movie.id)}
              title="Delete permanently"
              className="p-2 rounded-md bg-red-600/10 text-red-400 hover:bg-red-600/20
                         hover:text-red-200 transition-colors"
            >
              <MdOutlineDeleteForever size={20} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => toggleWatched(movie.id)}
              className="p-2 rounded-md text-green-400 hover:text-green-200 hover:bg-gray-700/40"
            >
              {movie.watched ? (
                <LiaToggleOnSolid size={28} />
              ) : (
                <LiaToggleOffSolid size={28} />
              )}
            </button>

            <button
              onClick={() => deleteMovie(movie.id)}
              className="p-2 rounded-full bg-red-600/10 text-red-400 hover:bg-red-600/20
                         hover:text-red-200"
            >
              <RiDeleteBinLine size={20} />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default MovieItem;
