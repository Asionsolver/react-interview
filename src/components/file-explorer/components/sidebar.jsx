const Sidebar = ({ width, handleResize }) => {
  return (
    <div
      className="bg-gray-950 text-white  relative"
      style={{ width: `${width}%` }}
    >
      <div className="p-4 font-semibold">📂 Sidebar</div>
      <ul className="p-2 space-y-2">
        <li className="p-2 bg-gray-800 rounded">Menu 1</li>
        <li className="p-2 bg-gray-800 rounded">Menu 2</li>
        <li className="p-2 bg-gray-800 rounded">Menu 3</li>
      </ul>
      <div
        onMouseDown={handleResize}
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-600"
      />
    </div>
  );
};

export default Sidebar;
