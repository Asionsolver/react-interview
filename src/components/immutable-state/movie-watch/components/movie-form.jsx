import { useState } from "react";
import { useToast } from "./useToast";
import CustomDropdown from "./custom-dropdown";
import { useEffect } from "react";
const OTT_OPTIONS = [
  { value: "netflix", label: "Netflix" },
  { value: "prime", label: "Amazon Prime" },
  { value: "disney", label: "Disney+ Hotstar" },
  { value: "hulu", label: "Hulu" },
  { value: "hbomax", label: "HBO Max" },
  { value: "apple", label: "Apple TV+" },
  { value: "peacock", label: "Peacock" },
];
const MovieForm = ({ addMovie, updateMovie, editingMovie }) => {
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
    if (!movieData?.title.trim() || !movieData?.ott.trim()) {
      showToast("Please fill in all fields!", "warning");
      return;
    }

    if (editingMovie) {
      updateMovie({ ...editingMovie, ...movieData });
      showToast("Movie updated successfully!", "success");
    } else {
      addMovie(movieData);
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
    </form>
  );
};

export default MovieForm;
