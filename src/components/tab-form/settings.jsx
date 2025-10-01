const Settings = ({ data, setData }) => {
  const { theme } = data;
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };
  return (
    <div>
      <label htmlFor="theme" className="block mb-2">
        Theme
      </label>
      <select
        id="theme"
        value={theme}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded mb-3"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default Settings;
