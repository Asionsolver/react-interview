const Profile = ({ data, setData, formErrors }) => {
  const { name, email, age } = data;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className=" font-semibold">
        <label className="block mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="w-full border border-gray-300 p-2 rounded mb-3"
          type="text"
          id="name"
          value={name}
          onChange={handleChange}
        />
        {formErrors.name && (
          <span className="text-red-500 text-sm">{formErrors.name}</span>
        )}
        <br />
        <label className="block mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="w-full border border-gray-300 p-2 rounded mb-3"
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        {formErrors.email && (
          <span className="text-red-500 text-sm">{formErrors.email}</span>
        )}
        <br />
        <label className="block mb-2" htmlFor="age">
          Age
        </label>
        <input
          className="w-full border border-gray-300 p-2 rounded mb-3"
          type="number"
          id="age"
          value={age}
          onChange={handleChange}
        />
        {formErrors.age && (
          <span className="text-red-500 text-sm">{formErrors.age}</span>
        )}
      </div>
    </div>
  );
};

export default Profile;
