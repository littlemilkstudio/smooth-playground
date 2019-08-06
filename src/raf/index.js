const raf = () => {
  const state = {
    start: null,
    animationFrameId: null
  };

  const loop = (handleTick, timeStamp) => {
    const elapsed = timeStamp - state.start;
    handleTick(elapsed);
    state.animationFrameId = requestAnimationFrame(timeStamp =>
      loop(handleTick, timeStamp)
    );
  };

  const stop = () => cancelAnimationFrame(state.animationFrameId);

  const start = handleTick => {
    state.start = Date.now();
    loop(handleTick, state.start);
    return {
      stop
    };
  };

  return {
    start
  };
};

export default raf;
