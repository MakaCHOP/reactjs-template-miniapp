import {
  KeyframeOptions,
  animate,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import React, { useRef } from "react";

interface AnimatedCounterType {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
  setFromBalance: React.Dispatch<React.SetStateAction<number>>;
}

const AnimatedCounter = ({
                           from,
                           to,
                           animationOptions,
                           setFromBalance,
                         }: AnimatedCounterType) => {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.textContent = String(from);

    const controls = animate(from, to, {
      duration: 2.5,
      ease: "easeOut",
      ...animationOptions,
      onUpdate(value) {
        element.textContent = value.toFixed(0);
      },
    });

    // set from balance to last balance
    return () => {
      controls.stop();
    };
  }, [ref, to]);

  setFromBalance(to);

  return <span ref={ref} />;
};

export default AnimatedCounter;
