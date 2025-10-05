// import { useTheme } from "./hooks/useTheme";

// const Theme = () => {
//   const { theme, setTheme } = useTheme();

//   return (
//     // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-indigo-50 p-4">
//     //   <div className="w-full max-w-md bg-primary-background-color shadow-xl rounded-2xl p-6">
//     //     {/* Header */}
//     //     <div className="flex items-center justify-between mb-6">
//     //       <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//     //         ✍️ My Todo List
//     //       </h1>
//     //     </div>

//     //     {/* Input */}
//     //     <div className="flex gap-2">
//     //       <input
//     //         type="text"
//     //         placeholder="What's on the agenda?"
//     //         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//     //       />
//     //       <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">
//     //         Add
//     //       </button>
//     //     </div>

//     //     {/* Todo Items */}
//     //     <div className="mt-6">
//     //       <ul className="space-y-3">
//     //         <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
//     //           <input type="checkbox" className="h-5 w-5" />
//     //           <span className="text-gray-700">Learn React</span>
//     //         </li>
//     //         <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
//     //           <input type="checkbox" className="h-5 w-5" />
//     //           <span className="text-gray-700">Build a Todo App</span>
//     //         </li>
//     //       </ul>
//     //     </div>
//     //   </div>
//     // </div>

//     <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center animate-cross-fade transition-colors duration-500 ease-in-out">
//       <h1 className="text-3xl">Current Theme: {theme}</h1>
//       <div className="flex gap-2 mt-4">
//         <button
//           onClick={() => setTheme("light")}
//           className={`px-3 py-1 rounded ${
//             theme === "light" ? "bg-primary text-white" : "bg-gray-200"
//           }`}
//         >
//           Light
//         </button>
//         <button
//           onClick={() => setTheme("dark")}
//           className={`px-3 py-1 rounded ${
//             theme === "dark" ? "bg-primary text-white" : "bg-gray-200"
//           }`}
//         >
//           Dark
//         </button>
//         <button
//           onClick={() => setTheme("green")}
//           className={`px-3 py-1 rounded ${
//             theme === "green" ? "bg-primary text-white" : "bg-gray-200"
//           }`}
//         >
//           Green
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Theme;
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const [circle, setCircle] = useState(false);
  const [nextBg, setNextBg] = useState("");
  const [coords, setCoords] = useState({ x: "50%", y: "50%" });
  const [contentKey, setContentKey] = useState(0);

  const themeColors = {
    light: "#ffffff",
    dark: "#0f172a",
    green: "#f0fdf4",
  };

  const themes = Object.keys(themeColors);

  const changeTheme = (newTheme, e) => {
    if (e) {
      const clickX = e.clientX;
      const clickY = e.clientY;
      const xPercent = (clickX / window.innerWidth) * 100 + "%";
      const yPercent = (clickY / window.innerHeight) * 100 + "%";
      setCoords({ x: xPercent, y: yPercent });
    } else {
      setCoords({ x: "50%", y: "50%" }); // keyboard default center
    }

    setNextBg(themeColors[newTheme]);
    setCircle(true);

    setTimeout(() => {
      setTheme(newTheme);
      setCircle(false);
      setContentKey((k) => k + 1);
    }, 700);
  };

  // Keyboard navigation: arrow keys to switch theme
  useEffect(() => {
    const handleKey = (e) => {
      let idx = themes.indexOf(theme);
      if (e.key === "ArrowRight") {
        idx = (idx + 1) % themes.length;
        changeTheme(themes[idx]);
      } else if (e.key === "ArrowLeft") {
        idx = (idx - 1 + themes.length) % themes.length;
        changeTheme(themes[idx]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [theme]);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center ">
      {circle && (
        <div
          className="circle-overlay animate-circle-reveal"
          style={{
            backgroundColor: nextBg,
            "--x": coords.x,
            "--y": coords.y,
          }}
        ></div>
      )}

      <div
        key={contentKey}
        className="animate-content-fade flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold mb-4">Current Theme: {theme}</h1>
        <div className="flex gap-2 mt-4 flex-wrap justify-center">
          {themes.map((t) => (
            <button
              key={t}
              onClick={(e) => changeTheme(t, e)}
              className={`px-4 py-2 rounded transition-colors duration-500 ease-in-out ${
                theme === t ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <p className="mt-4 text-gray-500 text-sm">
          Use Arrow Keys ← → to switch theme
        </p>
      </div>
    </div>
  );
};

export default Theme;
