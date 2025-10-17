import { useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([
    {
      id: crypto.randomUUID(),
      name: "Alice",
      age: 25,
      address: { city: "Wonderland", zip: "12345" },
      hobbies: ["reading", "traveling"],
    },
  ]);

  const handleChangeUser = (id, name, age, address) => {
    // Implement this function to update user details immutably
    const updatedUsers = users.map((user) =>
      user.id === id
        ? {
            ...user,
            name: name,
            age: age,
            address: { city: address.city, zip: address.zip },
          }
        : user
    );
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    // Implement this function to add a new user immutably
    const newUser = {
      id: crypto.randomUUID(),
      name: "Bob",
      age: 30,
      address: { city: "Builderland", zip: "67890" },
    };
    setUsers([...users, newUser]);
  };

  const handleRemoveUser = (id) => {
    // Implement this function to remove a user immutably
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <ul className="w-full max-w-3xl space-y-4">
        {!users.length ? (
          <p className="text-center text-gray-500">No users available.</p>
        ) : (
          users.map((user) => (
            <li
              key={user.id}
              className="bg-white shadow-md rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-gray-800">
                <p className="text-lg font-semibold mb-1">
                  {user.name}{" "}
                  <span className="font-normal text-gray-600">lives in</span>{" "}
                  {user.address.city}
                </p>
                <p className="text-sm text-gray-600">Age: {user.age}</p>
                <p className="text-sm text-gray-600">Zip: {user.address.zip}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-8000" cHC>
                    Hobbies:{" "}
                  </span>
                  <span className="flex flex-wrap gap-2">
                    {user.hobbies ? (
                      user.hobbies.map((hobby, index) => (
                        <span key={index} className="px-2 py-1 bg-amber-400">
                          {hobby}
                        </span>
                      ))
                    ) : (
                      <span className="px-2 py-1 bg-amber-400">None</span>
                    )}
                  </span>
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 active:bg-green-700 transition-colors duration-150"
                  onClick={() =>
                    handleChangeUser(user.id, "Asion", 28, {
                      city: "New Wonderland",
                      zip: "54321",
                    })
                  }
                >
                  Edit
                </button>

                <button
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors duration-150"
                  onClick={handleAddUser}
                >
                  Add User
                </button>

                <button
                  className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors duration-150"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserList;
