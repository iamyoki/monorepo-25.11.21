import { greet } from "@iamyoki/monorepo-25.11.21-greet";
import { MyButton } from "@iamyoki/monorepo-25.11.21-my-components";
import { randomChoice } from "@iamyoki/monorepo-25.11.21-random-choice";
import { useState } from "react";
import "./app.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <MyButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </MyButton>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>
        {greet()}, {randomChoice(["apple", "orange"])}
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
