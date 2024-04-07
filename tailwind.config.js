/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#eefbfd',
          '100': '#d4f4f9',
          '200': '#afe7f2',
          '300': '#78d4e8',
          '400': '#2cb4d4',
          '500': '#1e9cbc',
          '600': '#1b7d9f',
          '700': '#1d6681',
          '800': '#20546a',
          '900': '#1f475a',
          '950': '#0f2d3d',
        },
      },
    },
  },
  plugins: [],
}

