import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms"; // ✅ require 대신 import 사용

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [forms], // ✅ import한 forms 사용
};

export default config;
