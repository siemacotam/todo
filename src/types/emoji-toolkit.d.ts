// src/types/emoji-toolkit.d.ts
declare module "emoji-toolkit/lib/js/joypixels" {
  interface CodePoints {
    base: string;
    fully_qualified: string;
    diversity_parent: string | null;
    gender_parent: string | null;
  }

  interface Emoji {
    name: string;
    category: string;
    shortname: string;
    unicode_version: number;
    order: number;
    display: number;
    shortname_alternates: string[];
    ascii: string[];
    humanform: number;
    diversity_base: number;
    diversity: string | string[] | null;
    diversity_children: string[];
    gender: string[];
    gender_children: string[];
    code_points: CodePoints;
    keywords: string[];
  }

  const joypixels: {
    shortnameToImage(shortname: string): string;
  };

  export default joypixels;
}
