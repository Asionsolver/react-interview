import { useState } from "react";
import { useToast } from "./useToast";
const MovieForm = ({ addMovie }) => {
  const [movieData, setMovieData] = useState({
    title: "",
    ott: "",
  });
  const { showToast } = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Movie Data Submitted:", movieData);
    if (!movieData?.title.trim() || !movieData?.ott.trim()) {
      showToast("Please fill in all fields!", "warning");
      return;
    }
    addMovie(movieData);
    showToast("Movie added successfully!", "success");
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
      className="flex flex-col  mx-auto md:flex-row gap-2 mb-8 w-full"
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
      <select
        name="ott"
        value={movieData?.ott}
        className="p-2 border border-gray-700 bg-gray-800 rounded text-white"
        onChange={handleChange}
      >
        <option value="">Select OTT Platform</option>
        <option value="netflix">Netflix</option>
        <option value="prime">Amazon Prime</option>
        <option value="disney">Disney+ Hotstar</option>
        <option value="hulu">Hulu</option>
        <option value="hbomax">HBO Max</option>
        <option value="apple">Apple TV+</option>
        <option value="peacock">Peacock</option>
      </select>

      <button
        type="submit"
        className="  bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Movie
      </button>
    </form>
  );
};

export default MovieForm;
