"use client";

import joypixels from "emoji-toolkit/lib/js/joypixels";
import dompurify from "dompurify";
import { memo } from "react";

export const shortcodeToSanitizedHtml = (shortname: string) => {
  const html = joypixels.shortnameToImage(shortname);
  return dompurify.sanitize(html);
};

interface EmojiProps {
  name: string;
  small?: boolean;
}

const Emoji = ({ name, small }: EmojiProps) => {
  return (
    <div
      className={small ? `h-4 w-4` : `h-6 w-6`}
      dangerouslySetInnerHTML={{
        __html: shortcodeToSanitizedHtml(name),
      }}
    />
  );
};

export default memo(Emoji);
