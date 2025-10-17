const CurrentTab = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="flex gap-4 mb-6">
      {["all", "watched", "unwatched", "deleted"].map((tab) => (
        <button
          key={tab}
          onClick={() => setCurrentTab(tab)}
          className={`px-4 py-2 rounded ${
            currentTab === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CurrentTab;
