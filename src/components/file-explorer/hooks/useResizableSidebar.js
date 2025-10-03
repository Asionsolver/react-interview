import { useState, useRef, useCallback } from "react";

// Custom hook for resizing sidebar
export const useResizableSidebar = (initialWidth) => {
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [tooltipWidth, setTooltipWidth] = useState(initialWidth);
  const animationFrameId = useRef(null);
  const startResizing = useCallback(
    (e) => {
      const startX = e.clientX;
      const startWidth = width;
      const containerWidth = document.documentElement.clientWidth;

      setIsResizing(true);
      setTooltipWidth(startWidth);

      const doDrag = (e) => {
        if (animationFrameId.current)
          cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = requestAnimationFrame(() => {
          const deltaX = ((e.clientX - startX) / containerWidth) * 100;
          const newWidth = startWidth + deltaX;
          if (newWidth >= 10 && newWidth <= 80) {
            setWidth(newWidth);
            setTooltipWidth(newWidth);
          }
        });
      };

      const stopDrag = () => {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
        if (animationFrameId.current)
          cancelAnimationFrame(animationFrameId.current);
        setIsResizing(false);
      };

      document.addEventListener("mousemove", doDrag);
      document.addEventListener("mouseup", stopDrag);
    },
    [width]
  );

  return { width, setWidth, isResizing, tooltipWidth, startResizing };
};
