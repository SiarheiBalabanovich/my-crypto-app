import { useEffect, useRef, useState, type RefObject } from "react";

type UseInViewOnceOptions = {
  threshold?: number;
  root?: Element | Document | null;
  rootMargin?: string;
};

type UseInViewOnceReturn<TElement extends HTMLElement> = readonly [
  RefObject<TElement | null>,
  boolean,
];

const DEFAULT_THRESHOLD = 0.4;

export function useInViewOnce<TElement extends HTMLElement = HTMLDivElement>(
  options: UseInViewOnceOptions = {},
): UseInViewOnceReturn<TElement> {
  const {
    threshold = DEFAULT_THRESHOLD,
    root = null,
    rootMargin = "0px",
  } = options;

  const ref = useRef<TElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || inView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setInView(true);
        observer.disconnect();
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [inView, root, rootMargin, threshold]);

  return [ref, inView] as const;
}