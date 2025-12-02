import React, { useEffect, useState } from "react";
import { useRef } from "react";

const MultiSelectSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);

  const handleValueChange = (e) => {
    setSearchTerm(e.target.value);
    setHighlightIndex(-1);
  };
  useEffect(() => {
    const fetchUser = () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => console.log(err));
    };

    fetchUser();
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    inputRef.current.focus();
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleRemoveUser = (user) => {
    const filtered = selectedUsers.filter((u) => u.email !== user.email);
    setSelectedUsers(filtered);

    const newSet = new Set(selectedUserSet);
    newSet.delete(user.email);
    setSelectedUserSet(newSet);
  };

  const handleKeyDown = (e) => {
    const key = e.key;

    if (
      key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    }

    if (!suggestions?.users) {
      return;
    }

    const suggestionListLength = suggestions.users.length;

    if (key === "ArrowUp") {
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestionListLength - 1
      );
    }

    if (key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev < suggestionListLength - 1 ? prev + 1 : 0
      );
    }

    if (key === "Enter") {
      const user = suggestions?.users[highlightIndex];

      if (user && !selectedUserSet.has(user.email)) {
        handleSelectUser(user);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100 py-20">
      <div className="w-full relative px-4">
        {/* Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-3 w-full border rounded-full p-2 min-h-[50px] bg-white shadow-sm">
          {selectedUsers.map((user) => (
            <Pill
              key={user.email}
              image={user.image}
              name={`${user.firstName} ${user.lastName}`}
              onRemove={() => handleRemoveUser(user)}
            />
          ))}

          <input
            type="text"
            ref={inputRef}
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleValueChange}
            className="flex-1 outline-none p-2 rounded-full w-full"
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Suggestions */}
        {searchTerm !== "" && (
          <ul className="absolute mt-2 max-h-[300px] overflow-y-auto w-[300px] bg-white border border-gray-100 shadow-lg rounded-lg z-10">
            {suggestions?.users?.map(
              (user, index) =>
                !selectedUserSet.has(user.email) && (
                  <li
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className={`flex gap-3 items-center p-3 cursor-pointer border-b last:border-none ${
                      index === highlightIndex
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <img
                      src={user.image}
                      alt={user.firstName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultiSelectSearch;

const Pill = ({ image, name, onRemove }) => {
  return (
    <div
      onClick={onRemove}
      className="flex items-center bg-blue-600 text-white cursor-pointer py-1 px-3 gap-2 rounded-full shadow-sm h-10"
    >
      <img
        src={image}
        alt={name}
        className="w-6 h-6 rounded-full object-cover"
      />

      <span className="text-sm font-medium whitespace-nowrap">{name}</span>

      <button className="text-lg font-bold leading-none cursor-pointer">
        &times;
      </button>
    </div>
  );
};
