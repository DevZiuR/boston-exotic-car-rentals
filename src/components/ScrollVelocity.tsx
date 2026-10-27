import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
    useReducedMotion
} from 'framer-motion';

function useElementWidth(ref: React.RefObject<HTMLElement>) {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        function updateWidth() {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [ref]);

    return width;
}

interface ScrollVelocityProps {
    scrollContainerRef?: React.RefObject<HTMLElement>;
    texts?: string[];
    velocity?: number;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    velocityMapping?: { input: number[]; output: number[] };
    parallaxClassName?: string;
    scrollerClassName?: string;
    parallaxStyle?: React.CSSProperties;
    scrollerStyle?: React.CSSProperties;
}

interface VelocityTextProps {
    children: React.ReactNode;
    baseVelocity?: number;
    scrollContainerRef?: React.RefObject<HTMLElement>;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    velocityMapping?: { input: number[]; output: number[] };
    parallaxClassName?: string;
    scrollerClassName?: string;
    parallaxStyle?: React.CSSProperties;
    scrollerStyle?: React.CSSProperties;
}

function VelocityText({
    children,
    baseVelocity = 25,
    scrollContainerRef,
    className = '',
    damping = 60,
    stiffness = 300,
    numCopies = 8,
    velocityMapping = { input: [0, 1000], output: [0, 1.5] },
    parallaxClassName = '',
    scrollerClassName = '',
    parallaxStyle,
    scrollerStyle,
}: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping,
        stiffness,
    });
    const velocityFactor = useTransform(
        smoothVelocity,
        velocityMapping?.input || [0, 1000],
        velocityMapping?.output || [0, 1.5],
        { clamp: false }
    );

    const shouldReduceMotion = useReducedMotion();

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    const wrap = useCallback((min: number, max: number, v: number) => {
        const range = max - min;
        const mod = (((v - min) % range) + range) % range;
        return mod + min;
    }, []);

    const x = useTransform(baseX, (v) => {
        if (copyWidth === 0) return '0px';
        return `${wrap(-copyWidth, 0, v)}px`;
    });

    useAnimationFrame((_t, delta) => {
        // Respect prefers-reduced-motion by completely pausing animation
        if (shouldReduceMotion) return;

        // Base speed is slow; accelerates smoothly and slightly with scroll velocity
        const vf = velocityFactor.get();
        const speedBoost = 1 + Math.min(Math.abs(vf), 2);
        const moveBy = baseVelocity * speedBoost * (delta / 1000);
        baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < (numCopies ?? 8); i++) {
        spans.push(
            <span className={`flex-shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
                {children}
            </span>
        );
    }

    return (
        <div className={`${parallaxClassName} relative overflow-hidden`} style={parallaxStyle}>
            <motion.div
                className={`${scrollerClassName} flex whitespace-nowrap text-center font-montserrat font-bold uppercase tracking-[0.05em] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.25]`}
                style={{ x, ...scrollerStyle }}
            >
                {spans}
            </motion.div>
        </div>
    );
}

export const ScrollVelocity = ({
    scrollContainerRef,
    texts = [],
    velocity = 25,
    className = '',
    damping = 60,
    stiffness = 300,
    numCopies = 8,
    velocityMapping = { input: [0, 1000], output: [0, 1.5] },
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
}: ScrollVelocityProps) => {
    return (
        <div className="flex flex-col gap-3 md:gap-4 w-full">
            {texts.map((text, index) => {
                const isOutline = index === 1;
                return (
                    <VelocityText
                        key={index}
                        className={isOutline ? 'text-outline-silver' : 'text-white'}
                        baseVelocity={index % 2 !== 0 ? velocity : -velocity}
                        scrollContainerRef={scrollContainerRef}
                        damping={damping}
                        stiffness={stiffness}
                        numCopies={numCopies}
                        velocityMapping={velocityMapping}
                        parallaxClassName={parallaxClassName}
                        scrollerClassName={scrollerClassName}
                        parallaxStyle={parallaxStyle}
                        scrollerStyle={scrollerStyle}
                    >
                        <span className="inline-flex items-center px-6 md:px-10">
                            <span className={isOutline ? 'text-outline-silver' : 'text-white'}>
                                {text}
                            </span>
                            <span
                                className="crimson-star-solid ml-6 md:ml-10 select-none text-[clamp(1.2rem,2.2vw,2rem)] leading-none"
                                aria-hidden="true"
                            >
                                ★
                            </span>
                        </span>
                    </VelocityText>
                );
            })}
        </div>
    );
};

export default ScrollVelocity;
