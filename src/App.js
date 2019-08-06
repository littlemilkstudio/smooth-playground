import React, { useMemo } from "react";
import smooth from "./smooth";
import "./App.css";

const App = () => {
  const s = useMemo(() => {
    return smooth({ x: 0, y: 0 }).start(({ x, y }) => {
      document.body.style.setProperty(`--mouse-x`, x);
      document.body.style.setProperty(`--mouse-y`, y);
    });
  }, []);

  const updateCursorPosition = e => {
    s.update({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="App" onMouseMove={updateCursorPosition}>
      <div className="mouse" />
    </div>
  );
};

export default App;
