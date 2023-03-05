import { useLayoutEffect, useState } from "react";

export const useScrollPosition = () => {
  const [scrollPosition, setPosition] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    const updatePosition = () => {
      setPosition({ y: window.scrollY, x: window.scrollX });
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return { scrollPosition };
};
