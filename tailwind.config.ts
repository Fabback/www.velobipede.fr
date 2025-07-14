import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       sans: ["var(--font-poppins)", "var(--font-sans)", ...fontFamily.sans],
  //     },
  //     // colors: {
  //     //   background: "var(--background)",
  //     //   foreground: "var(--foreground)",
  //     // },
  //   },
  // },
  plugins: [],
} satisfies Config;
