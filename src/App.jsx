import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const allowedKeys = "0123456789+-*/.";
      if (allowedKeys.includes(e.key)) {
        setInput((prev) => prev + e.key);
      } else if (e.key === "Enter") handleCalculate();
      else if (e.key === "Backspace") handleBackspace();
      else if (e.key === "Escape") handleClear();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, history]);

  const handleClick = (value) => setInput(input + value);
  const handleClear = () => setInput("");
  const handleBackspace = () => setInput(input.slice(0, -1));
  const handleCalculate = () => {
    try {
      if (input.trim() === "") return;
      const result = eval(input).toString();
      setHistory([{ expression: input, result }, ...history]);
      setInput(result);
    } catch {
      setInput("Error");
    }
  };
  const handleClearHistory = () => setHistory([]);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "calculator dark" : "calculator"}>
      
      <h1>React Calculator</h1>
      <button className="mode-btn" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <input type="text" value={input} readOnly />

      <div className="buttons">
        {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map((btn) =>
          btn === "=" ? (
            <button key={btn} onClick={handleCalculate}>{btn}</button>
          ) : (
            <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
          )
        )}
        <button onClick={handleClear}>C</button>
        <button onClick={handleBackspace}>⌫</button>
        <button onClick={handleClearHistory}>Clear History</button>
      </div>

      <div className="history">
        <h2>History</h2>
        {history.length === 0 && <p>No calculations yet.</p>}
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.expression} = {item.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
