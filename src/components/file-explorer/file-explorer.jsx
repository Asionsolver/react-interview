import React from "react";
import Sidebar from "./components/sidebar";
import MainContent from "./components/main-content";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const FileExplorer = () => {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const savedWidth = localStorage.getItem("sidebar-width");
    return savedWidth !== null ? parseFloat(savedWidth) : 20; // default to 20% if not found
  });

  const animationFrameId = useRef(null);

  // Save width to localStorage whenever it changes
  useEffect(() => {
    const handle = setTimeout(() => {
      localStorage.setItem("sidebar-width", sidebarWidth.toString()); // convert to string
    }, 300); // debounce to avoid excessive writes
    return () => clearTimeout(handle);
  }, [sidebarWidth]);
  const startResizing = (e) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const doDrag = (e) => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() => {
        const containerWidth = document.documentElement.clientWidth; // full window width
        const deltaX = ((e.clientX - startX) / containerWidth) * 100; //  convert to percentage
        const newWidth = startWidth + deltaX;
        if (newWidth >= 10 && newWidth <= 80) {
          setSidebarWidth(newWidth);
        }
      });
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  };
  return (
    <div className="flex h-screen w-full">
      <Sidebar width={sidebarWidth} handleResize={startResizing} />
      <MainContent />
    </div>
  );
};

export default FileExplorer;
