const pointer = () => {
  return {
    start: next => {
      const mouseHandler = ({ clientX: x, clientY: y }) => next({ x, y });
      window.addEventListener("mousemove", mouseHandler, { passive: true });

      const touchHandler = ({ touches }) => {
        const { clientX: x, clientY: y } = touches[0];
        next({ x, y });
      };

      return () => {
        window.removeEventListener("mousemove", mouseHandler, {
          passive: true
        });
        window.removeEventListener("mousemove", touchHandler, {
          passive: true
        });
      };
    }
  };
};

export default pointer;
