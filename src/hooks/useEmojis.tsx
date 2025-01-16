// src/hooks/useEmojis.ts
import { useEffect, useMemo, useState } from "react";
import emojiData from "emoji-toolkit/emoji.json";
import { Emoji } from "@/types/emoji";

interface EmojiData {
  [key: string]: Emoji;
}

export const useEmojis = () => {
  const [list, setList] = useState<Emoji[]>([]);

  useEffect(() => {
    const emojiDataObject: EmojiData = emojiData as EmojiData;
    const emojiList: Emoji[] = Object.values(emojiDataObject);
    setList(emojiList);
  }, []);

  const memoizedList = useMemo(() => list, [list]);

  return { list: memoizedList };
};
