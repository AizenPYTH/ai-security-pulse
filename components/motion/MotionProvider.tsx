"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type MotionContextValue = {
  reduceMotion: boolean;
};

const MotionContext = createContext<MotionContextValue>({ reduceMotion: false });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <MotionContext.Provider value={{ reduceMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function usePrefersReducedMotion() {
  return useContext(MotionContext).reduceMotion;
}

export function useSafeMotion() {
  const reduceMotion = usePrefersReducedMotion();
  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    [reduceMotion]
  );
  return { reduceMotion, transition };
}

export function useMountedCallback<T extends (...args: never[]) => void>(cb: T) {
  return useCallback(cb, [cb]);
}
