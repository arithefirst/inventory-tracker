'use client';

import { motion } from 'motion/react';

interface BlurInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  key?: string | number;
}

/**
 * Adds a "Blur in" animation the component's child
 * @param className optional CSS classes
 * @param duration animation duration in ms (defaults to 300)
 * @param delay animation delay in ms (defaults to 100)
 * @returns
 */
export function BlurIn({ children, className, duration, delay, key }: BlurInProps) {
  duration = duration ? duration / 1000 : 300 / 1000;
  delay = delay ? delay / 1000 : 100 / 1000;

  return (
    <motion.div
      className={className}
      initial={{ filter: 'blur(30px)', opacity: 0, translateY: 6 }}
      animate={{ filter: 'blur(0px)', opacity: 1, translateY: 0 }}
      transition={{ duration, delay }}
      key={key}
    >
      {children}
    </motion.div>
  );
}
