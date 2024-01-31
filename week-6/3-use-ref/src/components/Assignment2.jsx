import { useState, useCallback, useRef, useEffect } from "react";

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
  console.log("Assignment-2");
  const [, forceRender] = useState(0);
  const dataRef = useRef(0);

  useEffect(() => {
    dataRef.current += 1;
  });

  const handleReRender = useCallback(() => {
    // Update state to force re-render
    forceRender(Math.random());
  }, []);

  return (
    <div>
      <p>
        This component has rendered <span>{dataRef.current}</span> times.
      </p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  );
}
