import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: { "100vh": "100vh" },
      fontFamily: { sans: ["var(--font-roboto)", "sans-serif"] },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "gray-50": "rgba(246, 246, 246, 1)",
        "gray-100": "rgba(231, 231, 231, 1)",
        "custom-gray": "rgba(246, 246, 246, 1)",
        "login-button": "rgba(101, 41, 254, 1)",
        "picked-emoji": "rgba(215, 210, 255, 1)",
        "accent-100": "rgba(234, 231, 255, 1)",
        "accent-400": "rgba(151, 129, 255, 1)",
        "accent-500": "rgba(117, 78, 255, 1)",
        "accent-600": "rgba(101, 41, 254, 1)",
        "accent-700": "rgba(97, 38, 235, 1)",
        "accent-800": "rgba(72, 19, 196, 1)",
        "gray-700": "rgba(79, 79, 79, 1)",
        "gray-900": "rgba(61, 61, 61, 1)",
      },
      blur: { "12px": "12px" },
      boxShadow: {
        "custom-shadow": "0px 0px 30.2px -15px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
