import { useEffect, useRef } from "react";

const usePrevious = (value: unknown) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
