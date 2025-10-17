import { useState } from "react";
import { useToast } from "./useToast";
import CustomDropdown from "./custom-dropdown";
import { useEffect } from "react";
import { OTT_OPTIONS } from "../../../../data/ott";

const MovieForm = ({ addMovie, updateMovie, editingMovie, cancelEdit }) => {
  const [movieData, setMovieData] = useState({
    title: "",
    ott: "",
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (editingMovie) {
      setMovieData({
        title: editingMovie.title,
        ott: editingMovie.ott,
      });
    } else {
      setMovieData({
        title: "",
        ott: "",
      });
    }
  }, [editingMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Movie Data Submitted:", movieData);
    const trimmedTitle = movieData.title.trim();
    const trimmedOtt = movieData.ott.trim();

    if (!trimmedTitle || !trimmedOtt) {
      showToast("Please fill in all fields!", "warning");
      return;
    }

    if (editingMovie) {
      if (
        trimmedTitle === editingMovie.title &&
        trimmedOtt === editingMovie.ott
      ) {
        showToast("No changes made to update!", "info");
        return;
      }
      const updatedMovie = {
        ...editingMovie,
        title: trimmedTitle,
        ott: trimmedOtt,
      };
      updateMovie(updatedMovie);
      showToast("Movie updated successfully!", "success");
    } else {
      addMovie({ title: trimmedTitle, ott: trimmedOtt });
      showToast("Movie added successfully!", "success");
    }
    // Reset form
    setMovieData({ title: "", ott: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className={`flex flex-col mx-auto md:flex-row gap-2 mb-8 w-full ${
        editingMovie ? "border-2 border-yellow-400 p-2 rounded" : ""
      }`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter movie name..."
        name="title"
        value={movieData?.title}
        className="flex-1 p-2 border border-gray-700 bg-gray-800 rounded text-white"
        onChange={handleChange}
      />

      <CustomDropdown
        id="ott-dropdown"
        value={movieData?.ott}
        onChange={(val) => setMovieData((prev) => ({ ...prev, ott: val }))}
        options={OTT_OPTIONS}
        placeholder="Select OTT Platform"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {editingMovie ? "Update Movie" : "Add Movie"}
      </button>

      {editingMovie && (
        <button
          type="button"
          onClick={cancelEdit}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default MovieForm;
