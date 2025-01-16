import { useState, useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Emoji } from "@/types/emoji";

export const useEmojiRefs = (filteredEmojis: Emoji[]) => {
  const emojiRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleElements, setVisibleElements] = useState<Set<Element>>(
    new Set()
  );

  useEffect(() => {
    emojiRefs.current = filteredEmojis.map(() => null);
  }, [filteredEmojis]);

  const updatedVisibleElements = useIntersectionObserver(
    emojiRefs.current.filter((ref): ref is HTMLDivElement => ref !== null),
    { rootMargin: "0px", threshold: 0.1 }
  );

  useEffect(() => {
    setVisibleElements(updatedVisibleElements);
  }, [updatedVisibleElements]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    emojiRefs.current[index] = el;
  };

  return { emojiRefs, visibleElements, setRef };
};
