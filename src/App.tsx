import { useState } from "react";
import "./App.css";
import AmbientContainer from "./components/AmbientContainer";

enum FileType {
  VIDEO = "video",
  IMAGE = "image",
  IFRAME = "iframe",
}

function App() {
  const [ambient, setAmbient] = useState<boolean>(false);

  return (
    <div className="page">
      <button onClick={() => setAmbient(!ambient)}>
        Toggle Ambient Mode {!ambient ? "On" : "Off"}
      </button>
      <AmbientContainer ambient={ambient} fileType={FileType.IMAGE} />
      <AmbientContainer ambient={ambient} fileType={FileType.VIDEO} />
    </div>
  );
}

export default App;
