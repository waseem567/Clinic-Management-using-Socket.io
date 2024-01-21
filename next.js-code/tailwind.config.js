/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  plugins: [require("tw-elements/dist/plugin.cjs"),require("flowbite/plugin")],
  darkMode: "class"
}
