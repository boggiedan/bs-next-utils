import { useEffect, useState } from "react";
import { Nullable } from "@/utils/types";

type Options = {
  rootMargin?: string;
  threshold?: number;
};

type Result<T extends Element> = [(ref: Nullable<T>) => void, boolean];

function useInView<T extends Element>(options?: Options): Result<T> {
  const [isIntersecting, setIntersecting] = useState(false);
  const [ref, setRef] = useState<Nullable<T>>(null);

  const threshold = options?.threshold || 0;
  const rootMargin = options?.rootMargin || "0px";

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
      rootMargin,
      threshold,
    });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return [setRef, isIntersecting];
}

export default useInView;
