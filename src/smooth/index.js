import rAF from "../raf";
import scan from "../accumulator";
import lerp, { lerpAlt } from "../lerp";
import Ease from "../ease";

const smooth = (init, { roundness = 0.1 } = {}) => {
  const state = {
    scan: null,
    loop: null,
    target: init
  };

  const update = v => {
    state.target = v;
  };

  const stop = () => {
    state.raf.stop();
  };

  const start = listener => {
    state.scan = scan(lerp(roundness), init).start(listener);

    state.loop = rAF().start(() => {
      state.scan.next(state.target);
    });

    return { update, stop };
  };

  return { start };
};

// const smooth = (init, { ease = Ease.outQuad, duration = 600 } = {}) => {
//   const state = {
//     startTime: -1,
//     raf: raf(),
//     start: init,
//     current: init,
//     target: init,
//     updateStartTime: true
//   };

//   const update = v => {
//     state.updateStartTime = true;
//     state.start = state.current;
//     state.target = v;
//   };

//   const start = listener => {
//     const stopRaf = state.raf.start(timeStamp => {
//       if (state.updateStartTime) {
//         state.startTime = timeStamp;
//         state.updateStartTime = false;
//       }

//       const deltaTime = timeStamp - state.startTime;
//       const progress = Math.max(Math.min(deltaTime / duration, 1), 0);
//       state.current = lerpAlt(state.start, state.target, ease(progress));

//       listener(state.current);
//     });

//     return {
//       update: update,
//       stop: stopRaf
//     };
//   };

//   return { start };
// };

export default smooth;
