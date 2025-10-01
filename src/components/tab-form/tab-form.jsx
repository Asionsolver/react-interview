import { useState } from "react";
import Interest from "./interest";
import Profile from "./profile";
import Settings from "./settings";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({
    name: "ashis",
    age: "22",
    email: "ashis@example.com",
    interests: ["Coding", "Music", "Cricket"],
    theme: "dark",
  });

  const [formErrors, setFormErrors] = useState({});
  // config driven approach
  const tabs = [
    {
      id: 1,
      name: "Profile",
      component: Profile,
      validate: () => {
        const errors = {};
        if (!data.name) {
          errors.name = "Name is required";
        } else if (data.name.length < 2) {
          errors.name = "Name must be at least 2 characters long";
        }

        if (!data.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!data.age) {
          errors.age = "Age is required";
        } else if (isNaN(data.age) || data.age <= 0) {
          errors.age = "Age must be a positive number";
        } else if (data.age < 18) {
          errors.age = "Age must be at least 18";
        }
        setFormErrors(errors);
        return errors.name || errors.email || errors.age ? false : true;
      },
    },
    {
      id: 2,
      name: "Settings",
      component: Settings,
      validate: () => true,
    },
    {
      id: 3,
      name: "Interest",
      component: Interest,
      validate: () => {
        const errors = {};
        if (data.interests.length === 0) {
          errors.interests = "At least one interest must be selected";
        }
        setFormErrors(errors);
        return errors.interests ? false : true;
      },
    },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  const handleTabClick = (id) => {
    // validate current tab
    if (tabs[activeTab].validate()) {
      setActiveTab(id);
    }
  };

  const handlePrevious = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    // validate current tab

    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <div className="max-w-lg mx-auto p-4 border border-amber-300 mt-20 rounded">
      <div className="flex bg-amber-200 p-2 gap-2 rounded">
        {tabs.map((tab) => (
          <div
            onClick={() => handleTabClick(tab.id - 1)}
            className={`cursor-pointer px-4 py-2   rounded ${
              activeTab === tab.id - 1 ? "bg-amber-600 text-white" : ""
            }`}
            key={tab.id}
          >
            {tab.name}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <ActiveTabComponent
          data={data}
          setData={setData}
          formErrors={formErrors}
        />
      </div>

      <div>
        {/* previous button */}
        {activeTab > 0 && (
          <button
            className="mt-4 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 mr-2"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}

        {/* next button */}
        {activeTab < tabs.length - 1 && (
          <button
            className="mt-4 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
            onClick={handleNext}
          >
            Next
          </button>
        )}
        {/* submit button */}
        {activeTab === tabs.length - 1 && (
          <button
            className="mt-4 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default TabForm;
