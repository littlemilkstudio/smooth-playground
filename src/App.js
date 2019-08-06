import React, { useEffect } from "react";
import pointer from "./events/pointer";
import smooth from "./smooth";
import value from "./value";
import "./App.css";

function App() {
  useEffect(() => {
    const val = value({ x: 0, y: 0 }).start(
      ({ current, velocity, rotation }) => {
        let styleString = "";
        const keys = Object.keys(current);
        keys.forEach(key => {
          styleString += `--mouse-${key}: ${current[key]};`;
        });

        styleString += `--mouse-v:${Math.min(
          Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2)),
          0.8
        )};`;

        styleString += `--mouse-r:${rotation}`;

        document.body.style.cssText = styleString;
      }
    );

    const s = smooth({ x: 0, y: 0 }).start(v => {
      val.update(v);
    });

    pointer().start(v => s.update(v));
  }, []);

  return (
    <div className="App">
      <div className="mouse" />
    </div>
  );
}

export default App;
