import React, { useMemo, useEffect } from "react";
import smooth from "./smooth";
import "./App.css";

const App = () => {
  const s = useMemo(() => {
    return smooth({ x: 0, y: 0 }, { roundness: 0.075 }).start(({ x, y }) => {
      document.body.style.setProperty(`--mouse-x`, x);
      document.body.style.setProperty(`--mouse-y`, y);
    });
  }, []);

  useEffect(() => () => s.stop());

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
