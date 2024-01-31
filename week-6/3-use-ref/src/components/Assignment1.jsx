import { useEffect, useRef, useState } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
  console.log("Assignment-1");
  const focusRef = useRef();
  const [value, setValue] = useState("");

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const handleButtonClick = () => {
    focusRef.current.focus();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter text here"
        ref={focusRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
}
