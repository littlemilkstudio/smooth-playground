// const lerp = roundness => (accum, target) => {
//   return Object.keys(accum).reduce((acc, key) => {
//     acc[key] = (1 - roundness) * accum[key] + target[key] * roundness;
//     return acc;
//   }, {});
// };

const singleLerp = (accum, target, roundness) => {
  return (1 - roundness) * accum + roundness * target;
};

const lerp = roundness => (accum, target) => {
  return {
    x: singleLerp(accum.x, target.x, roundness),
    y: singleLerp(accum.y, target.y, roundness)
  };
};

export const lerpAlt = (start, end, progress) => {
  return Object.keys(start).reduce((acc, key) => {
    const delta = end[key] - start[key];
    acc[key] = start[key] + delta * progress;

    return acc;
  }, {});
};

export default lerp;
