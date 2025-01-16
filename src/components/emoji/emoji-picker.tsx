"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTodoStore } from "@/stores/todo-store";
import EmojiComponent from "./emoji";
import { Emoji } from "@/types/emoji";
import { categories } from "@/lib/categories";
import { useEmojiRefs } from "@/hooks/useEmojiRefs";

interface EmojiPickerProps {
  list: Emoji[];
}

const EmojiPicker = ({ list }: EmojiPickerProps) => {
  const { setPockedEmoji } = useTodoStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[7]
  );
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>(
    list.filter((emoji) => emoji.category === selectedCategory)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedCategory(categories[0]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (list) {
      setFilteredEmojis(
        list.filter((emoji) => emoji.category === selectedCategory)
      );
    }
  }, [selectedCategory, list]);

  const { emojiRefs, visibleElements, setRef } = useEmojiRefs(filteredEmojis);

  const handleSelectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSelectEmoji = useCallback(
    (shortname: string) => {
      setPockedEmoji(shortname);
      setSelectedEmoji(shortname);
    },
    [setPockedEmoji]
  );

  return (
    <div className="h-[300px] flex flex-col">
      <div className="flex mb-2 overflow-x-scroll">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleSelectCategory(category)}
            className={`py-[6px] px-3 text-sm ${
              selectedCategory === category
                ? "bg-accent-600 text-white"
                : "bg-gray-200"
            } ${index === 0 ? "rounded-l-xl" : ""} ${
              index === categories.length - 1 ? "rounded-r-xl" : ""
            }`}
          >
            <p className="capitalize">{category}</p>
          </button>
        ))}
      </div>
      <div
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        className="h-[220px] grid grid-cols-10 gap-3 p-1 pr-2 overflow-y-scroll overflow-x-hidden"
      >
        {filteredEmojis.map((emoji, index) => (
          <div
            key={emoji.shortname}
            ref={(el) => setRef(el, index)}
            className={`text-2xl h-[34px] w-[34px] p-1 ${
              selectedEmoji === emoji.shortname
                ? "bg-picked-emoji rounded-full"
                : ""
            }`}
          >
            {visibleElements.has(emojiRefs.current[index]!) ? (
              <button onClick={() => handleSelectEmoji(emoji.shortname)}>
                <EmojiComponent name={emoji.shortname} />
              </button>
            ) : (
              <div className="w-full h-full bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
