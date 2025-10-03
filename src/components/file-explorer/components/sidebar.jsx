import { memo } from "react";
import Tooltip from "./tooltip";

const Sidebar = memo(({ width, handleResize, isResizing, tooltipWidth }) => {
  //   console.log("Sidebar render");
  return (
    <div
      className="bg-[#191515] text-white  relative border-r border-[#252121] "
      style={{
        width: `${width}%`,
      }}
    >
      <div className="p-4 font-semibold">📂 Sidebar</div>

      <div
        onMouseDown={handleResize}
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize  hover:bg-blue-500 active:bg-blue-500 overflow-hidden"
      >
        {isResizing && <Tooltip width={tooltipWidth} />}
      </div>
    </div>
  );
});

export default Sidebar;
