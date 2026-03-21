import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fade-in' | 'slide-up';
    delay?: number;
    duration?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
    children,
    className = '',
    animation = 'fade-in',
    delay = 0,
    duration = 0.6,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const animationStyle = {
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}s`,
        animationFillMode: 'both',
    };

    return (
        <div
            ref={ref}
            className={`${className} ${isVisible ? `animate-${animation}` : 'opacity-0'}`}
            style={isVisible ? animationStyle : {}}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
