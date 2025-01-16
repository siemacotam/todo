"use client";
import { useEffect, useState } from "react";
export const useIntersectionObserver = (
  elements: Element[],
  options: IntersectionObserverInit
) => {
  const [visibleElements, setVisibleElements] = useState<Set<Element>>(
    new Set()
  );
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = new Set(visibleElements);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.add(entry.target);
        } else {
          visible.delete(entry.target);
        }
      });
      setVisibleElements(visible);
    }, options);
    elements.forEach((element) => observer.observe(element));
    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [elements, options, visibleElements]);
  return visibleElements;
};
