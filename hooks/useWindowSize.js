import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleScroll() {
        setWindowSize((prev) => ({
          ...prev,
          height: window.scrollY,
        }));
      }
      function handleResize() {
        setWindowSize((prev) => ({
          ...prev,
          width: window.innerWidth,
        }));
      }
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
      };
    }
  }, []);
  return windowSize;
}
