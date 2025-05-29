import { useEffect, useState } from "react";

const scrollIncrementation = 0.1;

function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  function handleScroll(e: WheelEvent) {
    const isScrollingDown = e.deltaY > 0;

    setScrollProgress((prev) => {
      // Normalized value
      if (prev + scrollIncrementation <= 1 && isScrollingDown)
        return Number((prev + scrollIncrementation).toFixed(2));
      if (prev - scrollIncrementation >= 0 && !isScrollingDown)
        return Number((prev - scrollIncrementation).toFixed(2));

      return prev;
    });
  }

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);

    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  return scrollProgress;
}

export default useScrollProgress;
