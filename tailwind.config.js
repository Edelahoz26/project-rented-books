/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'custom-dark': 'hsl(220, 35%, 3%)',
        'backgroundCard': 'hsla(220, 35%, 3%, 0.4)',
      },
      backgroundImage: {
        'custom-gradient': 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      },
    },
  },
  plugins: [],
};
