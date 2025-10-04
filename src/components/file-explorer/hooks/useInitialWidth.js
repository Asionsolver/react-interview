import { useRef } from "react";

export const useInitialWidth = (initialWidth) => {
  const calculatedWidth = useRef(() => {
    if (typeof initialWidth === "function") {
      return initialWidth();
    }
    return initialWidth;
  }).current();

  return calculatedWidth;
};
