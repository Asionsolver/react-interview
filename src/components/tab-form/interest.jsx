const Interest = ({ data, setData, formErrors }) => {
  const { interests } = data;

  const handleChange = (e) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      interests: e.target.checked
        ? [...prevData.interests, value]
        : prevData.interests.filter((interest) => interest !== value),
    }));
  };

  console.log(interests);
  return (
    <div className="flex flex-col gap-4">
      <div className=" font-semibold">
        <label htmlFor="coding" className="block mb-2">
          <input
            type="checkbox"
            id="coding"
            value="Coding"
            onChange={handleChange}
            checked={interests.includes("Coding")}
          />
          <span className="ml-2">Coding</span>
        </label>

        <label htmlFor="music" className="block mb-2">
          <input
            type="checkbox"
            id="music"
            value="Music"
            onChange={handleChange}
            checked={interests.includes("Music")}
          />
          <span className="ml-2">Music</span>
        </label>

        <label htmlFor="cricket" className="block mb-2">
          <input
            type="checkbox"
            id="cricket"
            value="Cricket"
            onChange={handleChange}
            checked={interests.includes("Cricket")}
          />
          <span className="ml-2">Cricket</span>
        </label>

        <label htmlFor="football" className="block mb-2">
          <input
            type="checkbox"
            id="football"
            value="Football"
            onChange={handleChange}
            checked={interests.includes("Football")}
          />
          <span className="ml-2">Football</span>
        </label>

        {formErrors.interests && (
          <span className="text-red-500 text-sm">{formErrors.interests}</span>
        )}
      </div>
    </div>
  );
};

export default Interest;
