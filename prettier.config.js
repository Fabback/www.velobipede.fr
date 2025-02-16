/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */

const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./src/app/globals.css",
  "tailwindConfig": "./tailwind.config.ts",  "tailwindFunctions": ["tw","clsx"], 
};

module.exports = config;