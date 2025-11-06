import React, { useState } from "react";

function Car31() {
  // Step 1: ek state banao color ke liye
  const [color, setColor] = useState("black");

  // Step 2: ek function banao jo color change kare
  const changeColor = () => {
    // Random color generate karega
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  };

  return (
    <>
      <h1 style={{ color: color }}>This is Car31 Component</h1>

      {/* Step 3: buttons */}
      <button onClick={changeColor}>Submit</button>
      <button onClick={changeColor}>Click</button>
      <button onClick={changeColor}>Check</button>
    </>
  );
}

export default Car31;
