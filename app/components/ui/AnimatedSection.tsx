"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedSection({ children, delay = 0, className = "" }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timerId: any = null;
    // Safety fallback: ensure section becomes visible within 400ms regardless of observer
    const fallbackTimer = setTimeout(() => setIsVisible(true), delay + 400);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerId = setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.05 }
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (node) {
        observer.unobserve(node);
      }
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ pointerEvents: 'auto' }}
    >
      {children}
    </div>
  );
}
