/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        normal: '#aaa67f',
        fighting: '#c12239',
        flying: '#a891ec',
        poison: '#a43e9e',
        ground: '#dec16b',
        rock: '#b69e31',
        bug: '#a7b723',
        ghost: '#70559b',
        steel: '#b7b9d0',
        fire: '#f57d31',
        water: '#6493eb',
        grass: '#74cb48',
        electric: '#f9cf30',
        psychic: '#fb5584',
        ice: '#9ad6df',
        dragon: '#7037ff',
        dark: '#75574c',
        fairy: '#e69eac',
      },
    },
  },
  plugins: [],
}
