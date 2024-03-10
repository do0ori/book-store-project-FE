import { useEffect, useRef } from "react";

type Callback = (entries: IntersectionObserverEntry[]) => void;

interface ObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

export const useIntersectionObserver = (callback: Callback, options?: ObserverOptions) => {
    const targetRef = useRef(null);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(callback, options);

        if (targetRef.current) {
            intersectionObserver.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                intersectionObserver.unobserve(targetRef.current);
            }
        };
    });

    return targetRef;
};