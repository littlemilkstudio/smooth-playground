import { statement } from "@babel/template";

const shapeToZero = init =>
  Object.keys(init).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

const value = init => {
  let state = {
    current: init,
    velocity: shapeToZero(init),
    time: Date.now(),
    rotation: 0
  };

  return {
    start: fn => {
      state.time = Date.now();

      return {
        update: v => {
          const newTime = Date.now();
          const velocity = Object.keys(state.current).reduce((acc, key) => {
            const delta = v[key] - state.current[key];
            const time = newTime - state.time;

            acc[key] = delta / time;
            return acc;
          }, {});

          const x1 = state.current.x;
          const x2 = v.x;
          const y1 = state.current.y;
          const y2 = v.y;
          const radians = Math.atan2(y2 - y1, x2 - x1);
          const rotation = radians * (180 / Math.PI);

          state = {
            current: v,
            velocity,
            rotation,
            time: newTime
          };

          fn({
            current: state.current,
            velocity: state.velocity,
            rotation: state.rotation
          });

          return;
        }
      };
    }
  };
};

export default value;
