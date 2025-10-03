import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
const MAX_RECENT = 5; // save last 5 searches
const AutoSearchBar = () => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const cacheRef = useRef(cache);
  const [highlightIndex, setHighlightIndex] = useState(-1); // for keyboard navigation
  const [recentSearches, setRecentSearches] = useState([]);
  // keep ref always in sync with cache
  useEffect(() => {
    // console.log("Cache updated:", cache);
    cacheRef.current = cache;
  }, [cache]);

  // Load recent searches from localStorage once
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(stored);
  }, []);

  const saveRecentSearch = (query) => {
    if (!query.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q !== query); // remove duplicates
      const updated = [query, ...filtered].slice(0, MAX_RECENT); // keep last N
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };
  const fetchData = useCallback(
    async (input) => {
      if (!input.trim()) return;

      //  Check cache first
      if (cacheRef.current[input]) {
        setResults(cacheRef.current[input]);
        return; // API call skip
      }

      //  Optional: check recentSearches
      if (recentSearches.includes(input)) {
        // show query instantly from recent searches
        setResults([{ name: input }]); // or merge with real API result later
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/recipes/search?q=${input}`
        );
        const data = await response.json();
        // console.log(data);
        setResults(data?.recipes);
        setCache((prevCache) => ({ ...prevCache, [input]: data?.recipes }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    },
    [recentSearches]
  );

  useEffect(() => {
    // If input is empty (""), no need to fetch.
    if (!input.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      fetchData(input);
    }, 300);

    return () => clearTimeout(timer);
  }, [input, fetchData]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setHighlightIndex(-1); // reset highlight index on input change
  };
  useEffect(() => {
    console.log("fetchData changed");
    console.log("Rendering");
  }, [fetchData]);

  const handleKeyDown = (event) => {
    const totalResults =
      (input.trim() ? results : []).length +
      (input.trim() ? 0 : recentSearches.length);
    if (!showResults || totalResults === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % totalResults);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + totalResults) % totalResults);
    } else if (event.key === "Enter") {
      event.preventDefault();
      let selected;
      if (input.trim()) {
        selected = results[highlightIndex];
      } else {
        selected = { name: recentSearches[highlightIndex] };
      }
      if (selected) {
        setInput(selected.name);
        saveRecentSearch(selected.name);
        setShowResults(false);
      }
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<mark>$1</mark>`);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Auto Complete Search</h1>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 p-2 rounded w-2xl"
          value={input}
          onChange={handleInputChange}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 150)}
          onKeyDown={handleKeyDown} // keyboard navigation
        />
        {showResults && input.trim() !== "" && (
          <div className="border border-gray-300 p-2 rounded w-2xl mt-2 bg-white h-auto overflow-y-auto">
            {loading ? (
              <div className="p-2 text-center text-gray-500">Loading...</div>
            ) : results.length > 0 ? (
              results.map((search, index) => (
                <div
                  key={index}
                  className={`p-2 hover:bg-gray-100 cursor-pointer ${
                    highlightIndex === index ? "bg-gray-100" : ""
                  }`}
                  onMouseDown={() => {
                    setInput(search.name);
                    saveRecentSearch(search.name);
                    setShowResults(false);
                  }}
                >
                  <IoSearchOutline className="inline-block mr-2" />
                  {/*Highlight matching text */}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(search.name, input),
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-gray-400" key={"no-result"}>
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoSearchBar;
