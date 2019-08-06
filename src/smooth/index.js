import raf from "../raf";
import accumulator from "../accumulator";
import linearInterpolation from "../lerp";

const lerp = init => {
  const state = {
    accumulator: accumulator(linearInterpolation(0.4), init),
    raf: raf()
  };

  const update = v => state.accumulator.update(v);

  return {
    start: fn => {
      const stopRaf = state.raf.start(() => {
        state.accumulator.next(fn);
      });

      return {
        update,
        stop: stopRaf
      };
    }
  };
};

export default lerp;
