import { useState } from "react";
import "./App.css";
import AmbientContainer from "./components/AmbientContainer";

function App() {
  const [ambient, setAmbient] = useState<boolean>(false);

  return (
    <div className="page">
      <button onClick={() => setAmbient(!ambient)}>Toggle Ambient Mode</button>
      <AmbientContainer ambient={ambient} />
      <AmbientContainer ambient={ambient} />
      <AmbientContainer ambient={ambient} />
      <AmbientContainer ambient={ambient} />
      <AmbientContainer ambient={ambient} />
      <AmbientContainer ambient={ambient} />
    </div>
  );
}

export default App;
