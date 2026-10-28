import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';

// Luxury cubic-bezier easing curve for smooth exponential deceleration
export const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  as?: string;
  viewportMargin?: string;
  threshold?: number;
  once?: boolean;
  style?: React.CSSProperties;
  // Backward compatibility with existing call sites
  isHeading?: boolean;
  staggerIndex?: number;
  animation?: 'fade-in' | 'slide-up';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  duration = 0.75,
  yOffset = 24,
  className = '',
  as = 'div',
  viewportMargin = '0px 0px -40px 0px',
  threshold = 0.05,
  once = true,
  style = {},
  isHeading,
  staggerIndex,
  animation,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    margin: viewportMargin as any,
    amount: 'some',
    once,
  });

  // Normalize delay: if passed in milliseconds (e.g. 250), convert to seconds (0.25)
  const baseDelay = delay > 10 ? delay / 1000 : delay;
  const computedDelay = baseDelay + (typeof staggerIndex === 'number' ? staggerIndex * 0.08 : 0);
  const computedDuration = duration > 10 ? duration / 1000 : duration;

  // Determine motion component dynamically
  const Component = (motion as any)[as] || motion.div;

  // If heading or fade-in, slight fine-tuning
  const effectiveY = animation === 'fade-in' ? 0 : yOffset;

  return (
    <Component
      ref={ref}
      className={className}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: effectiveY }
      }
      animate={
        isInView
          ? shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0 }
          : undefined
      }
      transition={{
        duration: computedDuration,
        delay: computedDelay,
        ease: LUXURY_EASE,
      }}
      style={{
        ...style,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};

export interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  viewportMargin?: string;
  threshold?: number;
  once?: boolean;
  as?: string;
  style?: React.CSSProperties;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  delayChildren = 0,
  viewportMargin = '0px 0px -40px 0px',
  threshold = 0.05,
  once = true,
  as = 'div',
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    margin: viewportMargin as any,
    amount: 'some',
    once,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren,
      },
    },
  };

  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={style}
    >
      {children}
    </Component>
  );
};

export interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  yOffset?: number;
  as?: string;
  style?: React.CSSProperties;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  duration = 0.75,
  yOffset = 24,
  as = 'div',
  style = {},
}) => {
  const shouldReduceMotion = useReducedMotion();
  const computedDuration = duration > 10 ? duration / 1000 : duration;

  const itemVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: computedDuration,
        ease: LUXURY_EASE,
      },
    },
  };

  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      className={className}
      variants={itemVariants}
      style={{ ...style, willChange: 'opacity, transform' }}
    >
      {children}
    </Component>
  );
};

export const FadeInSection = RevealOnScroll;

export default React.memo(RevealOnScroll);
