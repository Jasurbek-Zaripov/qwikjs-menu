/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "-10px -10px 30px 0px #ffffff, 10px 10px 30px 0px #1d0dca17",
      },
    },
  },
  plugins: [],
};
