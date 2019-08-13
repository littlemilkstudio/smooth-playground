const rAF = () => {
  const state = {
    listener: () => {},
    animationFrameId: null
  };

  const loop = timeStamp => {
    state.listener(timeStamp);
    state.animationFrameId = requestAnimationFrame(timeStamp => {
      loop(timeStamp);
    });
  };

  const stop = () => {
    cancelAnimationFrame(state.animationFrameId);
  };

  const start = listener => {
    state.listener = listener;
    loop();

    return { stop };
  };

  return { start };
};

export default rAF;
